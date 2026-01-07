import { useState, useEffect } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Briefcase, 
  Users,
  FileText, 
  MapPin, 
  Timer,
  Calendar,
  CreditCard,
  DollarSign,
  User,
  Globe
} from 'lucide-react';
import { EnhancedCalendar } from './EnhancedCalendar';
import { fetchServices, CustomerServiceDto } from '../services/servicesService';
import { fetchStaffByService, StaffMemberDto } from '../services/staffService';
import { getCurrencySymbol } from '../utils/currency';
import { createAppointment, CreateAppointmentRequest } from '../services/appointmentApi';
import { getPaymentSettings, getMeetingLocationSettings } from '../services/settingsService';
import '../styles/globals.css';
import { combineDateTimeToUTC, formatDate, formatTime, getDateString, getTimeString, TIMEZONES, getTimezoneOffset } from "../utils/datetime";
import { fetchAvailableSlots, fetchStaffTimeOffs, fetchAnyStaffSlots, TimeSlotDto, TimeOffResponseDto } from '../services/availabilityService';
import { getPublicCompanyProfile, getPublicCompanyProfileBySlug } from '../services/CompanyService';
import { useParams } from 'react-router-dom';
import { TimezoneSelect } from './TimezoneSelect';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";

// Detect browser timezone
function getBrowserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
}

interface BookingFormProps {
  onComplete: (details: any) => void;
  onClose: () => void;
}
 
const LOCATIONS = [
  { label: 'In Person', value: 'InPerson', icon: '👤' },
  { label: 'Phone Call',value: 'Phone', image: 'https://www.bing.com/th/id/OIP.U4eWFInhZ02-FcJ5V5ieewHaIO?w=173&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' },
  { label: 'Zoom', value: 'Zoom', image: 'https://static.vecteezy.com/system/resources/previews/016/716/466/non_2x/zoom-meeting-icon-free-png.png' },
];

const PAYMENT_METHODS = [
  { name: 'Credit Card', icon: '💳' },
  { name: 'Debit Card', icon: '💳' },
  { name: 'PayPal', icon: '🔵' },
  { name: 'Bank Transfer', icon: '🏦' },
];

const STEPS = [
  { number: 1, name: 'Service', icon: Briefcase },
  { number: 2, name: 'Details', icon: FileText },
  { number: 3, name: 'Schedule', icon: Calendar },
  { number: 4, name: 'Personal Details', icon: User },
  { number: 5, name: 'Payment', icon: CreditCard },
];

export function BookingForm({ onComplete, onClose }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<number | null>(null);

  
  // Services state - fetched from API
  const [services, setServices] = useState<CustomerServiceDto[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  
  // Staff state - fetched based on selected service
  const [staffMembers, setStaffMembers] = useState<StaffMemberDto[]>([]);
  const [staffLoading, setStaffLoading] = useState(false);
  const [staffError, setStaffError] = useState<string | null>(null);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  
  const [meetingType, setMeetingType] = useState<string | null>(null);
  const [customDuration, setCustomDuration] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentTiming, setPaymentTiming] = useState<'now' | 'later'>('now');
  
  // Booking submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Availability state
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // Customer timezone - detected from browser, editable
  const [customerTimezone, setCustomerTimezone] = useState<string>(getBrowserTimezone());

  // Dynamic payment and meeting location settings
  const [availableLocations, setAvailableLocations] = useState(LOCATIONS);
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState(PAYMENT_METHODS);
  const [showPayNow, setShowPayNow] = useState(true);
  const [showPayLater, setShowPayLater] = useState(true);

  const validateStep = () => {
    const errors: Record<string, string> = {};
    
    switch (step) {
      case 4: // Personal Details
        if (!firstName.trim()) {
          errors.firstName = 'First name is required';
        } else if (firstName.trim().length < 3) {
          errors.firstName = 'First name must be at least 3 characters';
        }
        
        if (!lastName.trim()) {
          errors.lastName = 'Last name is required';
        } else if (lastName.trim().length < 3) {
          errors.lastName = 'Last name must be at least 3 characters';
        }
        
        if (!email.trim()) {
          errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          errors.email = 'Invalid email format';
        }
        
        if (!phone.trim()) {
          errors.phone = 'Phone number is required';
        } else if (!/^[\d\s\-()+]{7,20}$/.test(phone.trim())) {
          errors.phone = 'Invalid phone format';
        }
        break;
      
      case 2: // Details
        if (!meetingType) {
          errors.meetingType = 'Please select a meeting location';
        }
        
        if (description && description.length > 500) {
          errors.description = 'Description cannot exceed 500 characters';
        }
        break;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Fetch services when component loads
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const loadServices = async () => {
      try {
        setServicesLoading(true);
        setServicesError(null);
        
        let cid: number | null = null;

  if (slug) {
    const company = await getPublicCompanyProfileBySlug(slug);
    setCompanyId(company.id);        
    cid = company.id;

    if (company.logoUrl) {
      setCompanyLogo(`${API_BASE_URL}${company.logoUrl}`);
    }
  } else {
    // Fallback to query param
    const queryParams = new URLSearchParams(window.location.search);
    const companyIdParam = queryParams.get('companyId');
    if (companyIdParam) {
       cid = parseInt(companyIdParam, 10);
       setCompanyId(cid); 
       
       // Also load profile for logo
       const profile = await getPublicCompanyProfile(cid);
       if (profile.logoUrl) {
          setCompanyLogo(`${API_BASE_URL}${profile.logoUrl}`);
       }
    }
  }

        if (!cid) {
          setServicesError('No company specified. Please use a valid booking link.');
          return;
        }

        const response = await fetchServices(cid);
        setServices(response.items || []);

        // If using query param, we still need to fetch profile for logo if not done yet
        if (!slug && cid) {
           const profile = await getPublicCompanyProfile(cid);
           setCompanyLogo(profile.logoUrl ? `${API_BASE_URL}${profile.logoUrl}` : null);
        }

      } catch (err) {
        console.error('Error loading services:', err);
        setServicesError('Failed to load services. Please refresh the page.');
      } finally {
        setServicesLoading(false);
      }
    };

    loadServices();

    // Removed separate loadCompanyProfile as it is merged above to handle slug dependency
  }, [slug]);

  // Fetch payment and meeting location settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        if (companyId) {
          // Load payment settings - requires auth, so we'll use defaults if it fails
          try {
            const paymentSettings = await getPaymentSettings();
            const filteredMethods = PAYMENT_METHODS.filter(method => 
              paymentSettings.enabledPaymentMethods.includes(method.name)
            );
            setAvailablePaymentMethods(filteredMethods);
            setShowPayNow(paymentSettings.showPayNow);
            setShowPayLater(paymentSettings.showPayLater);
          } catch (err) {
            // Not authenticated, use defaults
            console.log('Using default payment settings (not authenticated)');
          }

          // Load meeting location settings - public endpoint
          const locationSettings = await getMeetingLocationSettings(companyId);
          const filteredLocations = LOCATIONS.filter(loc => 
            locationSettings.enabledMeetingLocations.includes(loc.value)
          );
          setAvailableLocations(filteredLocations);
        }
      } catch (err) {
        console.error('Error loading settings:', err);
        // Keep defaults on error
      }
    };

    loadSettings();
  }, [companyId]);

  // Fetch staff when service changes
  useEffect(() => {
    const loadStaff = async () => {
      if (!selectedServiceId) {
        setStaffMembers([]);
        setSelectedStaffId(null);
        return;
      }

      try {
        setStaffLoading(true);
        setStaffError(null);
        
        const data = await fetchStaffByService(selectedServiceId);
        setStaffMembers(data);
        setSelectedStaffId(-1);
      } catch (err) {
        console.error('Error loading staff:', err);
        setStaffError('Failed to load staff members.');
        setStaffMembers([]);
        setSelectedStaffId(null);
      } finally {
        setStaffLoading(false);
      }
    };

    loadStaff();
  }, [selectedServiceId]);

  // Fetch Time Offs when staff changes
  useEffect(() => {
    const loadTimeOffs = async () => {
      if (!selectedStaffId || selectedStaffId === -1) {
        setUnavailableDates([]);
        return;
      }

      try {
        const timeOffs = await fetchStaffTimeOffs(selectedStaffId);
        const disabledDates: Date[] = [];
        timeOffs.forEach((t) => {
           const start = new Date(t.startDateTimeUtc);
           const end = new Date(t.endDateTimeUtc);
           
           let d = new Date(start);
           while (d <= end) {
             disabledDates.push(new Date(d));
             d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
           }
        });
        setUnavailableDates(disabledDates);
      } catch (err) {
        console.error("Error loading time offs:", err);
      }
    };

    loadTimeOffs();
  }, [selectedStaffId]);

  // Fetch Available Slots when date changes
  // Fetch Available Slots when date changes
  useEffect(() => {
    const loadSlots = async () => {
      if (!selectedDate || !selectedServiceId || selectedStaffId === null) {
        setAvailableSlots([]);
        return;
      }

      try {
        setSlotsLoading(true);
        
        // Helper to formatting date YYYY-MM-DD
        const toDateStr = (d: Date) => {
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const currDateStr = toDateStr(selectedDate);
        
        // Calculate Prev and Next days
        const prevDate = new Date(selectedDate);
        prevDate.setDate(selectedDate.getDate() - 1);
        const prevDateStr = toDateStr(prevDate);

        const nextDate = new Date(selectedDate);
        nextDate.setDate(selectedDate.getDate() + 1);
        const nextDateStr = toDateStr(nextDate);

        // Define fetch wrapper that ignores 400 errors (past dates)
        const safeFetch = async (dateStr: string) => {
            try {
                if (selectedStaffId === -1) {
                    return await fetchAnyStaffSlots(selectedServiceId, dateStr);
                } else {
                    return await fetchAvailableSlots(selectedStaffId, selectedServiceId, dateStr);
                }
            } catch (e) {
                // Ignore errors (likely "past date" validation from backend)
                return [];
            }
        };

        // Fetch all 3 days in parallel
        const [prevSlots, currSlots, nextSlots] = await Promise.all([
            safeFetch(prevDateStr),
            safeFetch(currDateStr),
            safeFetch(nextDateStr)
        ]);

        const allSlots = [...prevSlots, ...currSlots, ...nextSlots];

        // Filter and Format
        // We only want to show slots that, when converted to Customer Timezone, 
        // fall on the 'selectedDate' (User's YYYY-MM-DD).
        
        // User's selected YYYY-MM-DD (matches currDateStr)
        const targetDateStr = currDateStr;

        const formattedSlots = allSlots
          .filter(s => s.isAvailable)
          .filter(s => {
             // Convert UTC start time to Customer Timezone Date String
             const dateInTz = new Date(s.startTime).toLocaleDateString('en-CA', { // en-CA gives YYYY-MM-DD
                 timeZone: customerTimezone
             });
             return dateInTz === targetDateStr;
          })
          .map(s => {
             return new Date(s.startTime).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                timeZone: customerTimezone,
                hour12: true
             }).toLowerCase().replace(' ', '');
          });
          
        // Remove duplicates (possible between days overlap if logic weird, or just safety)
        const uniqueSlots = Array.from(new Set(formattedSlots));

        setAvailableSlots(uniqueSlots);
      } catch (err) {
        console.error("Error loading slots:", err);
        setAvailableSlots([]);
      } finally {
        setSlotsLoading(false);
      }
    };

    loadSlots();
  }, [selectedDate, selectedServiceId, selectedStaffId, customerTimezone]);

  const getSelectedService = (): CustomerServiceDto | null => {
    if (selectedServiceId === null || !Array.isArray(services)) return null;
    return services.find(s => s.id === selectedServiceId) || null;
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedServiceId !== null && selectedStaffId !== null;
      case 2:
        return meetingType !== null;
      case 3:
        return selectedDate && selectedTime;
      case 4:
        return firstName && lastName && phone && email;
      case 5:
        return paymentTiming === 'later' || paymentMethod;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && validateStep()) {
      setStep(step + 1);
      setFormErrors({});
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  // Dynamic showPayLater based on meeting type and settings
  const canShowPayLater = meetingType === 'InPerson' && showPayLater;

  const getServicePrice = (): number => {
    const selectedService = getSelectedService();
    return selectedService?.price || 0;
  };

  const getServiceCurrency = (): string => {
    const selectedService = getSelectedService();
    return selectedService?.currency || 'USD';
  };

  const getCurrencySymbolForService = (): string => {
    return getCurrencySymbol(getServiceCurrency());
  };

  const handleConfirm = async () => {
    if (!canProceed() || !validateStep()) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      if (!companyId) {
        throw new Error('Company not resolved');
      }
      
      if (!companyId) {
        throw new Error('Invalid company ID');
      }
      
      if (!selectedDate || !selectedTime) {
        throw new Error("Please select date and time");
      }

      // Extract date components directly from the Date object to avoid timezone shifts
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      const startTimeUtc = combineDateTimeToUTC(
        dateStr,
        selectedTime,
        customerTimezone
      );

      const mapPaymentMethod = (method: string): 'Card' | 'Cash' | 'PayPal' => {
        if (method === 'Credit Card' || method === 'Debit Card') return 'Card';
        if (method === 'PayPal') return 'PayPal';
        if (paymentTiming === 'later') return 'Cash';
        return 'Card';
      };
      
      const mapMeetingType = (type: string | null): 'InPerson' | 'Phone' | 'Zoom' => {
        if (type === 'InPerson') return 'InPerson';
        if (type === 'Phone') return 'Phone';
        if (type === 'Zoom') return 'Zoom';
        return 'InPerson';
      };
      
      const request: CreateAppointmentRequest = {
        companyId,
        firstName,
        lastName,
        email,
        phone,
        serviceId: selectedServiceId!,
        staffId: selectedStaffId === -1 ? null : selectedStaffId,
        startTime: startTimeUtc,
        meetingType: mapMeetingType(meetingType),
        paymentMethod: mapPaymentMethod(paymentMethod),
        notes: description || undefined,
      };
      
      const response = await createAppointment(request);
      
      const selectedService = getSelectedService();
      const selectedStaff = selectedStaffId === -1 
        ? { id: -1, fullName: 'Any Staff' } 
        : staffMembers.find(s => s.id === selectedStaffId);
      
      const details = {
        id: response.id,
        serviceId: selectedServiceId,
        serviceName: selectedService?.name || response.serviceName,
        staffId: selectedStaffId,
        staffName: response.staffName || selectedStaff?.fullName || "To be assigned",
        description,
        location: meetingType,
        meetingType,
        date: formatDate(startTimeUtc, customerTimezone, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: formatTime(startTimeUtc, customerTimezone),
        duration: `${getSelectedService()?.serviceDuration || 60} min`,
        price: `${getCurrencySymbolForService()}${response.price}`,
        paymentMethod: paymentTiming === "later" ? "Pay Later" : paymentMethod,
        paymentTiming,
        status: response.status,
      };
      
      onComplete(details);
    } catch (error) {
      console.error('Booking error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              {companyLogo && (
                <img src={companyLogo} alt="Company Logo" className="w-32 h-32 object-contain rounded-md" />
              )}
              <div>
                <h1>Book Your Appointment</h1>
                <p className="text-gray-600 mt-1">Complete the form to schedule your session</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
              />
            </div>

            {STEPS.map((s) => {
              const isActive = step === s.number;
              const isCompleted = step > s.number;
              const Icon = s.icon;

              return (
                <div key={s.number} className="flex flex-col items-center relative z-10">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all border-2
                      ${isCompleted 
                        ? 'bg-green-600 border-green-600 text-white' 
                        : isActive
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-sm ${isActive ? 'text-indigo-600' : 'text-gray-600'}`}>
                    {s.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  Select Service
                </label>
                <select
                  value={selectedServiceId || ''}
                  onChange={(e) => setSelectedServiceId(e.target.value ? Number(e.target.value) : null)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  disabled={servicesLoading}
                >
                  {servicesLoading ? (
                    <option value="">Loading services...</option>
                  ) : servicesError ? (
                    <option value="">{servicesError}</option>
                  ) : (!Array.isArray(services) || services.length === 0) ? (
                    <option value="">No services available</option>
                  ) : (
                    <>
                      <option value="">Choose a service...</option>
                      {Array.isArray(services) && services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700">
                  <Users className="w-4 h-4 text-indigo-600" />
                  Select Staff Member
                </label>
                <select
                  value={selectedStaffId || ''}
                  onChange={(e) => setSelectedStaffId(e.target.value ? Number(e.target.value) : null)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  disabled={!selectedServiceId || staffLoading}
                >
                  {!selectedServiceId ? (
                    <option value="">Please select a service first...</option>
                  ) : staffLoading ? (
                    <option value="">Loading staff...</option>
                  ) : staffError ? (
                    <option value="">{staffError}</option>
                  ) : staffMembers.length === 0 ? (
                    <option value="">No staff available for this service</option>
                  ) : (
                    <>
                      <option value="-1">Any Staff</option>
                      {staffMembers.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.fullName}{s.position ? ` - ${s.position}` : ''}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
             

              <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  Meeting Location
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {availableLocations.map((loc) => (
                    <button
                      key={loc.value}
                      onClick={() => {
                        setMeetingType(loc.value);
                        if (formErrors.meetingType) {
                          const newErrors = { ...formErrors };
                          delete newErrors.meetingType;
                          setFormErrors(newErrors);
                        }
                      }}
                      className={`
                        p-3 rounded-lg border-2 transition-all text-center flex flex-col items-center justify-center gap-1
                        ${meetingType === loc.value
                          ? 'border-indigo-600 bg-indigo-50'
                          : formErrors.meetingType
                          ? 'border-red-500 hover:border-red-400'
                          : 'border-gray-300 hover:border-indigo-300 bg-white'
                        }
                      `}
                    >
                      {loc.image ? (
                        <img src={loc.image} alt={loc.label} className="w-8 h-8 object-contain mb-1" />
                      ) : (
                        <div className="text-2xl mb-1">{loc.icon}</div>
                      )}
                      <p className="text-sm text-gray-900">{loc.label}</p>
                    </button>
                  ))}
                </div>
                {formErrors.meetingType && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.meetingType}</p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="flex items-center gap-2 mb-2 text-gray-700 font-medium">
                  <Globe className="w-4 h-4 text-indigo-600" />
                  Your Timezone
                </label>
                <div className="flex items-center gap-3">
                  <TimezoneSelect
                    value={customerTimezone}
                    onChange={setCustomerTimezone}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Times shown below are in your selected timezone. Current offset: {getTimezoneOffset(customerTimezone)}
                </p>
              </div>

              <EnhancedCalendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
                timezone={customerTimezone}
                unavailableDates={unavailableDates}
                timeSlots={availableSlots}
                isLoadingSlots={slotsLoading}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h3 className="text-indigo-900 mb-3">You are booking:</h3>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-900">
                    <span className="text-gray-700">Date:</span> {selectedDate?.toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                  <p className="text-gray-900">
                    <span className="text-gray-700">Time:</span> {selectedTime}
                  </p>
                  <p className="text-gray-900">
                    <span className="text-gray-700">Price:</span> {getCurrencySymbolForService()}{getServicePrice()}
                  </p>
                </div>
              </div>

              <p className="text-gray-600">
                Please provide your details in the form below to proceed with booking.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-gray-700">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (formErrors.firstName) {
                          const newErrors = { ...formErrors };
                          delete newErrors.firstName;
                          setFormErrors(newErrors);
                        }
                      }}
                      placeholder="John"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        if (formErrors.lastName) {
                          const newErrors = { ...formErrors };
                          delete newErrors.lastName;
                          setFormErrors(newErrors);
                        }
                      }}
                      placeholder="Doe"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/[^\d+\s\-()]/g, ''));
                      if (formErrors.phone) {
                        const newErrors = { ...formErrors };
                        delete newErrors.phone;
                        setFormErrors(newErrors);
                      }
                    }}
                    placeholder="+1 (555) 123-4567"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (formErrors.email) {
                        const newErrors = { ...formErrors };
                        delete newErrors.email;
                        setFormErrors(newErrors);
                      }
                    }}
                    placeholder="john.doe@example.com"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>

                 <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700">
                  {/* <FileText className="w-4 h-4 text-indigo-600" /> */}
                  Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (formErrors.description) {
                      const newErrors = { ...formErrors };
                      delete newErrors.description;
                      setFormErrors(newErrors);
                    }
                  }}
                  placeholder="Tell us more about your requirements..."
                  rows={3}
                  maxLength={500}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${
                    formErrors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.description && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">{description.length}/500 characters</p>
              </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Service Price</p>
                    <p className="text-2xl mt-1 text-indigo-700">{getCurrencySymbolForService()}{getServicePrice()}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <DollarSign className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700">
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  When would you like to pay?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setPaymentTiming('now');
                      setPaymentMethod('');
                    }}
                    className={`
                      py-3 px-4 rounded-lg border-2 transition-all
                      ${paymentTiming === 'now'
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-300 hover:border-indigo-300 bg-white'
                      }
                    `}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                    Pay Now
                  </button>
                  {canShowPayLater && (
                    <button
                      onClick={() => {
                        setPaymentTiming('later');
                        setPaymentMethod('');
                      }}
                      className={`
                        py-3 px-4 rounded-lg border-2 transition-all
                        ${paymentTiming === 'later'
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-300 hover:border-indigo-300 bg-white'
                        }
                      `}
                    >
                      <DollarSign className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                      Pay Later
                    </button>
                  )}
                </div>
                {!canShowPayLater && (
                  <p className="text-amber-600 text-sm mt-2 flex items-center gap-2 bg-amber-50 p-2 rounded border border-amber-200">
                    <span>ℹ️</span>
                    <span>Pay Later option is only available for In Person appointments</span>
                  </p>
                )}
              </div>

              {paymentTiming === 'now' && (
                <div>
                  <label className="flex items-center gap-2 mb-2 text-gray-700">
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {availablePaymentMethods.map((method) => (
                      <button
                        key={method.name}
                        onClick={() => setPaymentMethod(method.name)}
                        className={`
                          py-3 px-2 rounded-lg border-2 transition-all text-center
                          ${paymentMethod === method.name
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-300 hover:border-indigo-300 bg-white'
                          }
                        `}
                      >
                        <div className="text-xl mb-1">{method.icon}</div>
                        <p className="text-xs text-gray-900">{method.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-gray-900 mb-3">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span className="text-gray-600">Service:</span>
                      <span className="text-gray-900">{getSelectedService()?.name || "Service not found"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span className="text-gray-600">Duration:</span>
                      <span className="text-gray-900">{getSelectedService()?.serviceDuration || 60} mins</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span className="text-gray-600">Staff:</span>
                      <span className="text-gray-900">
                        {selectedStaffId === -1 
                          ? 'Any Staff' 
                          : (staffMembers.find(s => s.id === selectedStaffId)?.fullName || 'No staff selected')}
                      </span>
                    </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-600">Location:</span>
                    <span className="text-gray-900">{meetingType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-900">
                      {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-600">Time:</span>
                    <span className="text-gray-900">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between py-2 mt-2 bg-white rounded px-2">
                    <span className="text-gray-700">Total:</span>
                    <span className="text-indigo-600">{getCurrencySymbolForService()}{getServicePrice()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`
                flex items-center gap-2 px-6 py-2 rounded-lg transition-all
                ${canProceed()
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex flex-col items-end gap-2">
              {submitError && (
                <p className="text-red-600 text-sm">{submitError}</p>
              )}
              <button
                onClick={handleConfirm}
                disabled={!canProceed() || isSubmitting}
                className={`
                  flex items-center gap-2 px-6 py-2 rounded-lg transition-all
                  ${canProceed() && !isSubmitting
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Booking...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    {paymentTiming === 'now' ? 'Proceed to Payment' : 'Confirm Booking'}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}