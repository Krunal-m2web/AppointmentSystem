import { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Briefcase, 
  Users,
  FileText, 
  MapPin, 
  Calendar,
  CreditCard,
  DollarSign,
  User,
  Globe,
  Video,
  Phone as PhoneIcon,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { EnhancedCalendar } from './EnhancedCalendar';
import { fetchServices, CustomerServiceDto } from '../services/servicesService';
import { fetchStaffByService, StaffMemberDto } from '../services/staffService';
import { getCurrencySymbol } from '../utils/currency';
import { createAppointment, CreateAppointmentRequest } from '../services/appointmentApi';
import { getPaymentSettings, getMeetingLocationSettings } from '../services/settingsService';
import '../styles/globals.css';
import { combineDateTimeToUTC, formatDate, formatTime, getTimezoneOffset } from "../utils/datetime";
import { fetchAvailableSlots, fetchStaffTimeOffs, fetchAnyStaffSlots } from '../services/availabilityService';
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
}
 
const LOCATIONS = [
  { 
    label: 'In Person', 
    value: 'InPerson', 
    icon: MapPin,
    description: 'Meet at our office',
    gradient: 'from-blue-500 to-blue-600'
  },
  { 
    label: 'Phone Call', 
    value: 'Phone', 
    icon: PhoneIcon,
    description: 'Call on your phone',
    gradient: 'from-emerald-500 to-emerald-600'
  },
  { 
    label: 'Zoom', 
    value: 'Zoom', 
    icon: Video,
    description: 'Video conference',
    gradient: 'from-indigo-500 to-indigo-600'
  },
];

const PAYMENT_METHODS = [
  { name: 'Credit Card', icon: '💳', description: 'Visa, Mastercard' },
  { name: 'Debit Card', icon: '💳', description: 'Bank debit' },
  { name: 'PayPal', icon: '🔵', description: 'PayPal account' },
  { name: 'Bank Transfer', icon: '🏦', description: 'Direct transfer' },
];

const STEPS = [
  { number: 1, name: 'Service', icon: Briefcase },
  { number: 2, name: 'Location', icon: MapPin },
  { number: 3, name: 'Schedule', icon: Calendar },
  { number: 4, name: 'Details', icon: User },
  { number: 5, name: 'Payment', icon: CreditCard },
];

interface CustomSelectOption {
  value: number | string;
  label: string;
  subLabel?: string;
}

interface CustomSelectProps {
  id: string;
  options: CustomSelectOption[];
  value: number | string | null;
  onChange: (value: number | string) => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  error?: string | null;
}

const CustomSelect = ({ 
  id, 
  options, 
  value, 
  onChange, 
  isLoading = false,
  placeholder = "Select an option...", 
  disabled = false,
  error = null
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedOption = options.find(opt => opt.value === value);

  // Filter options based on search term
  const filteredOptions = options.filter(opt => 
    !searchTerm || 
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (opt.subLabel && opt.subLabel.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm(""); // Reset search on close
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keystrokes for invisible search
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Clear search and close on Escape
      if (e.key === 'Escape') {
        setSearchTerm("");
        setIsOpen(false);
        return;
      }

      // Backspace removes last character
      if (e.key === 'Backspace') {
        setSearchTerm(prev => prev.slice(0, -1));
        return;
      }

      // Capture alphanumeric keys and spaces
      if (e.key.length === 1 && /^[\w\s]$/i.test(e.key)) {
        // Don't prevent default for Tab/Enter, but maybe for Space if it scrolls
        if (e.key === ' ') e.preventDefault(); 
        
        setSearchTerm(prev => prev + e.key);

        // Clear search buffer after inactivity
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => {
          setSearchTerm("");
        }, 2000); // 2 seconds to clear
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        id={id}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-4 py-3 border-2 rounded-lg text-left flex items-center justify-between transition-all duration-200 bg-white ${
          disabled ? 'bg-slate-100 cursor-not-allowed border-slate-200 text-slate-400' :
          error ? 'border-rose-300 hover:border-rose-400' :
          isOpen ? 'border-indigo-500 ring-4 ring-indigo-500/10' :
          'border-slate-300 hover:border-slate-400'
        }`}
      >
        <span className={`block truncate ${!selectedOption?.label ? 'text-slate-500' : 'text-slate-900'}`}>
          {isLoading ? "Loading..." : selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && !disabled && !isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-[500px] overflow-y-auto custom-scrollbar">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-500 italic">No options available</div>
          ) : filteredOptions.length === 0 ? (
             <div className="px-4 py-3 text-sm text-slate-500 italic">No matches for "{searchTerm}"</div>
          ) : (
            <>
              <ul className="py-1 group/list">
                {/* Optional: Show search indicator if typing */}
                {searchTerm && (
                  <li className="px-4 py-1 text-xs text-indigo-500 font-medium bg-indigo-50 border-b border-indigo-100">
                    Filtering: "{searchTerm}"
                  </li>
                )}
                {filteredOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                      className={`
                        w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 group/item
                        ${option.value === value 
                          ? 'bg-indigo-600 text-white group-hover/list:bg-white group-hover/list:text-slate-700 hover:!bg-indigo-600 hover:!text-white' 
                          : 'text-slate-700 hover:bg-indigo-600 hover:text-white'
                        }
                      `}
                    >
                      <span className="font-medium block">{option.label}</span>
                      {option.subLabel && (
                        <span className={`text-xs block mt-0.5 ${
                          option.value === value 
                            ? 'text-indigo-200 group-hover/list:text-slate-500 hover:!text-indigo-200' 
                            : 'text-slate-500 group-hover/item:text-indigo-200'
                        }`}>
                          {option.subLabel}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 sticky bottom-0">
                 Showing {filteredOptions.length} option{filteredOptions.length !== 1 ? 's' : ''}
              </div>
            </>
          )}
        </div>
      )}
      
      {error && (
        <p className="text-rose-600 text-sm mt-2 font-medium animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
};

export function BookingForm({ onComplete }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<number | null>(null);

  // Services state
  const [services, setServices] = useState<CustomerServiceDto[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  
  // Staff state
  const [staffMembers, setStaffMembers] = useState<StaffMemberDto[]>([]);
  const [staffLoading, setStaffLoading] = useState(false);
  const [staffError, setStaffError] = useState<string | null>(null);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  
  const [meetingType, setMeetingType] = useState<string | null>('InPerson');
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

  // Customer timezone
  const [customerTimezone, setCustomerTimezone] = useState<string>(getBrowserTimezone());

  // Dynamic settings
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
          errors.firstName = 'Must be at least 3 characters';
        }
        
        if (!lastName.trim()) {
          errors.lastName = 'Last name is required';
        } else if (lastName.trim().length < 3) {
          errors.lastName = 'Must be at least 3 characters';
        }
        
        if (!email.trim()) {
          errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          errors.email = 'Please enter a valid email';
        }
        
        if (!phone.trim()) {
          errors.phone = 'Phone number is required';
        } else if (!/^[\d\s\-()+]{7,20}$/.test(phone.trim())) {
          errors.phone = 'Please enter a valid phone number';
        }
        break;
      
      case 2: // Location
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

  // Fetch services
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
          const queryParams = new URLSearchParams(window.location.search);
          const companyIdParam = queryParams.get('companyId');
          if (companyIdParam) {
            cid = parseInt(companyIdParam, 10);
            setCompanyId(cid); 
            
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

        // Fetch services (limit to 100 to show "all" for now, or implement infinite scroll later)
        const data = await fetchServices(cid, undefined, 1, 100);
        setServices(data.items);

      } catch (err) {
        console.error('Error loading services:', err);
        setServicesError('Failed to load services. Please refresh the page.');
      } finally {
        setServicesLoading(false);
      }
    };

    loadServices();
  }, [slug]);

  // Fetch settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        if (companyId) {
          try {
            const paymentSettings = await getPaymentSettings();
            const filteredMethods = PAYMENT_METHODS.filter(method => 
              paymentSettings.enabledPaymentMethods.includes(method.name)
            );
            setAvailablePaymentMethods(filteredMethods);
            setShowPayNow(paymentSettings.showPayNow);
            setShowPayLater(paymentSettings.showPayLater);
          } catch (err) {
            console.log('Using default payment settings');
          }

          const locationSettings = await getMeetingLocationSettings(companyId);
          const filteredLocations = LOCATIONS.filter(loc => 
            locationSettings.enabledMeetingLocations.includes(loc.value)
          );
          setAvailableLocations(filteredLocations);
        }
      } catch (err) {
        console.error('Error loading settings:', err);
      }
    };

    loadSettings();
  }, [companyId]);

  // Fetch staff
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

  // Fetch time offs
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

  // Fetch available slots
  useEffect(() => {
    const loadSlots = async () => {
      if (!selectedDate || !selectedServiceId || selectedStaffId === null) {
        setAvailableSlots([]);
        return;
      }

      try {
        setSlotsLoading(true);
        
        const toDateStr = (d: Date) => {
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };

        const currDateStr = toDateStr(selectedDate);
        
        const prevDate = new Date(selectedDate);
        prevDate.setDate(selectedDate.getDate() - 1);
        const prevDateStr = toDateStr(prevDate);

        const nextDate = new Date(selectedDate);
        nextDate.setDate(selectedDate.getDate() + 1);
        const nextDateStr = toDateStr(nextDate);

        const safeFetch = async (dateStr: string) => {
          try {
            if (selectedStaffId === -1) {
              return await fetchAnyStaffSlots(selectedServiceId, dateStr);
            } else {
              return await fetchAvailableSlots(selectedStaffId, selectedServiceId, dateStr);
            }
          } catch (e) {
            return [];
          }
        };

        const [prevSlots, currSlots, nextSlots] = await Promise.all([
          safeFetch(prevDateStr),
          safeFetch(currDateStr),
          safeFetch(nextDateStr)
        ]);

        const allSlots = [...prevSlots, ...currSlots, ...nextSlots];

        const targetDateStr = currDateStr;

        const formattedSlots = allSlots
          .filter(s => s.isAvailable)
          .filter(s => {
            const dateInTz = new Date(s.startTime).toLocaleDateString('en-CA', {
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
      
      if (!selectedDate || !selectedTime) {
        throw new Error("Please select date and time");
      }

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-6 mb-4 sm:mb-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {companyLogo && (
              <img 
                src={companyLogo} 
                alt="Company Logo" 
                className="w-14 h-14 sm:w-20 sm:h-20 object-contain rounded-lg flex-shrink-0" 
              />
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Book Your Appointment</h1>
              <p className="text-slate-600 text-xs sm:text-sm">Complete the form to schedule your session</p>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Steps */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-4 sm:top-6 left-0 right-0 h-0.5 sm:h-1 bg-slate-200 -z-10">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500 ease-out"
                style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
              />
            </div>

            {/* Steps */}
            <div className="flex items-center justify-between">
              {STEPS.map((s) => {
                const isActive = step === s.number;
                const isCompleted = step > s.number;
                const Icon = s.icon;

                return (
                  <div 
                    key={s.number} 
                    className="flex flex-col items-center relative z-10"
                    role="progressbar"
                    aria-valuenow={step}
                    aria-valuemin={1}
                    aria-valuemax={STEPS.length}
                    aria-label={`Step ${s.number}: ${s.name}`}
                  >
                    <div
                      className={`
                        w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center mb-1.5 sm:mb-3 transition-all duration-300 border-2
                        ${isCompleted 
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105 sm:scale-110' 
                          : isActive
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105 sm:scale-110'
                          : 'bg-white border-slate-300 text-slate-400'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" aria-hidden="true" />
                      ) : (
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" aria-hidden="true" />
                      )}
                    </div>
                    <span 
                      className={`
                        text-[10px] sm:text-xs lg:text-sm font-medium transition-colors duration-300 text-center
                        ${isActive ? 'text-indigo-700' : isCompleted ? 'text-emerald-700' : 'text-slate-500'}
                      `}
                    >
                      {s.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div 
          className="bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6"
          role="main"
          aria-live="polite"
        >
          {/* Step 1 - Service Selection */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label 
                  htmlFor="service-select"
                  className="flex items-center gap-2 mb-3 text-slate-900 font-semibold text-lg"
                >
                  <Briefcase className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                  Select Service
                </label>
                <CustomSelect
                  id="service-select"
                  value={selectedServiceId}
                  onChange={(val) => setSelectedServiceId(Number(val))}
                  options={Array.isArray(services) ? services.map(s => ({
                    value: s.id,
                    label: s.name,
                    subLabel: `${getCurrencySymbol(s.currency)}${s.price} (${s.serviceDuration} min)`
                  })) : []}
                  isLoading={servicesLoading}
                  placeholder="Choose a service..."
                  error={servicesError}
                />
              </div>

              <div>
                <label 
                  htmlFor="staff-select"
                  className="flex items-center gap-2 mb-3 text-slate-900 font-semibold text-lg"
                >
                  <Users className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                  Select Staff Member
                </label>
                <CustomSelect
                  id="staff-select"
                  value={selectedStaffId}
                  onChange={(val) => setSelectedStaffId(Number(val))}
                  options={[
                    ...(staffMembers.length > 0 ? [{ value: -1, label: "Any Available Staff", subLabel: "Maximum availability" }] : []),
                    ...staffMembers.map(s => ({
                      value: s.id,
                      label: s.fullName,
                      subLabel: s.position || undefined
                    }))
                  ]}
                  isLoading={staffLoading}
                  disabled={!selectedServiceId}
                  placeholder={!selectedServiceId ? "Please select a service first..." : "Choose a staff member..."}
                  error={staffError}
                />
              </div>
            </div>
          )}

          {/* Step 2 - Meeting Location */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label className="flex items-center gap-2 mb-4 text-slate-900 font-semibold text-lg">
                  <MapPin className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                  Meeting Location
                </label>
                <div 
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  role="radiogroup"
                  aria-label="Meeting location options"
                >
                  {availableLocations.map((loc) => {
                    const Icon = loc.icon;
                    return (
                      <button
                        key={loc.value}
                        type="button"
                        onClick={() => {
                          setMeetingType(loc.value);
                          if (formErrors.meetingType) {
                            const newErrors = { ...formErrors };
                            delete newErrors.meetingType;
                            setFormErrors(newErrors);
                          }
                        }}
                        role="radio"
                        aria-checked={meetingType === loc.value}
                        aria-label={`${loc.label}: ${loc.description}`}
                        className={`
                          relative p-6 rounded-xl border-2 transition-all duration-300 text-center flex flex-col items-center justify-center gap-3 min-h-[140px]
                          focus:outline-none focus:ring-4 focus:ring-indigo-300
                          ${meetingType === loc.value
                            ? `border-indigo-600 bg-gradient-to-br ${loc.gradient} text-white shadow-lg scale-105`
                            : formErrors.meetingType
                            ? 'border-rose-500 hover:border-rose-400 bg-white'
                            : 'border-slate-200 hover:border-indigo-300 bg-white hover:shadow-md'
                          }
                        `}
                      >
                        {meetingType === loc.value && (
                          <div className="absolute top-3 right-3">
                            <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                          </div>
                        )}
                        
                        <div className={`
                          p-4 rounded-lg transition-all duration-300
                          ${meetingType === loc.value
                            ? 'bg-white/20 backdrop-blur-sm'
                            : 'bg-slate-50'
                          }
                        `}>
                          <Icon className={`w-8 h-8 ${meetingType === loc.value ? 'text-white' : 'text-indigo-600'}`} aria-hidden="true" />
                        </div>
                        
                        <div>
                          <p className={`font-bold text-base mb-1 ${meetingType === loc.value ? 'text-white' : 'text-slate-900'}`}>
                            {loc.label}
                          </p>
                          <p className={`text-sm ${meetingType === loc.value ? 'text-white/90' : 'text-slate-600'}`}>
                            {loc.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {formErrors.meetingType && (
                  <p className="text-rose-600 text-sm mt-2" role="alert">
                    {formErrors.meetingType}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3 - Schedule */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <div className="mb-6 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <label 
                  htmlFor="timezone-select"
                  className="flex items-center gap-2 mb-3 text-slate-900 font-semibold"
                >
                  <Globe className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                  Your Timezone
                </label>
                <div className="flex items-center gap-3">
                  <TimezoneSelect
                    value={customerTimezone}
                    onChange={setCustomerTimezone}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-slate-600 mt-2">
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

          {/* Step 4 - Personal Details */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-5">
                <h3 className="text-indigo-900 font-semibold mb-3 text-lg">You are booking:</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-900">
                    <span className="text-slate-700 font-medium">Date:</span> {selectedDate?.toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                  <p className="text-slate-900">
                    <span className="text-slate-700 font-medium">Time:</span> {selectedTime}
                  </p>
                  <p className="text-slate-900">
                    <span className="text-slate-700 font-medium">Price:</span> {getCurrencySymbolForService()}{getServicePrice()}
                  </p>
                </div>
              </div>

              <p className="text-slate-700 font-medium">
                Please provide your details in the form below to proceed with booking.
              </p>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="first-name" className="block mb-2 text-slate-900 font-medium">
                      First Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="first-name"
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
                      aria-invalid={!!formErrors.firstName}
                      aria-describedby={formErrors.firstName ? "first-name-error" : undefined}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 transition-all duration-200 ${
                        formErrors.firstName 
                          ? 'border-rose-500 focus:ring-rose-300 focus:border-rose-500' 
                          : 'border-slate-300 focus:ring-indigo-300 focus:border-indigo-500'
                      }`}
                    />
                    {formErrors.firstName && (
                      <p id="first-name-error" className="text-rose-600 text-sm mt-1" role="alert">
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block mb-2 text-slate-900 font-medium">
                      Last Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="last-name"
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
                      aria-invalid={!!formErrors.lastName}
                      aria-describedby={formErrors.lastName ? "last-name-error" : undefined}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 transition-all duration-200 ${
                        formErrors.lastName 
                          ? 'border-rose-500 focus:ring-rose-300 focus:border-rose-500' 
                          : 'border-slate-300 focus:ring-indigo-300 focus:border-indigo-500'
                      }`}
                    />
                    {formErrors.lastName && (
                      <p id="last-name-error" className="text-rose-600 text-sm mt-1" role="alert">
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-2 text-slate-900 font-medium">
                    Phone <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="phone"
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
                    aria-invalid={!!formErrors.phone}
                    aria-describedby={formErrors.phone ? "phone-error" : undefined}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 transition-all duration-200 ${
                      formErrors.phone 
                        ? 'border-rose-500 focus:ring-rose-300 focus:border-rose-500' 
                        : 'border-slate-300 focus:ring-indigo-300 focus:border-indigo-500'
                    }`}
                  />
                  {formErrors.phone && (
                    <p id="phone-error" className="text-rose-600 text-sm mt-1" role="alert">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-slate-900 font-medium">
                    Email <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="email"
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
                    aria-invalid={!!formErrors.email}
                    aria-describedby={formErrors.email ? "email-error" : undefined}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 transition-all duration-200 ${
                      formErrors.email 
                        ? 'border-rose-500 focus:ring-rose-300 focus:border-rose-500' 
                        : 'border-slate-300 focus:ring-indigo-300 focus:border-indigo-500'
                    }`}
                  />
                  {formErrors.email && (
                    <p id="email-error" className="text-rose-600 text-sm mt-1" role="alert">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="flex items-center gap-2 mb-2 text-slate-900 font-medium">
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
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
                    aria-invalid={!!formErrors.description}
                    aria-describedby="description-counter"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 transition-all duration-200 resize-none ${
                      formErrors.description 
                        ? 'border-rose-500 focus:ring-rose-300 focus:border-rose-500' 
                        : 'border-slate-300 focus:ring-indigo-300 focus:border-indigo-500'
                    }`}
                  />
                  {formErrors.description && (
                    <p className="text-rose-600 text-sm mt-1" role="alert">
                      {formErrors.description}
                    </p>
                  )}
                  <p id="description-counter" className="text-slate-500 text-xs mt-1">
                    {description.length}/500 characters
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5 - Payment */}
          {step === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-700 font-medium mb-1">Service Price</p>
                    <p className="text-3xl font-bold text-indigo-700">{getCurrencySymbolForService()}{getServicePrice()}</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow-sm">
                    <DollarSign className="w-8 h-8 text-indigo-600" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 mb-4 text-slate-900 font-semibold text-lg">
                  <CreditCard className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                  When would you like to pay?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentTiming('now');
                      setPaymentMethod('');
                    }}
                    className={`
                      py-4 px-6 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300
                      ${paymentTiming === 'now'
                        ? 'border-indigo-600 bg-indigo-50 shadow-md'
                        : 'border-slate-300 hover:border-indigo-300 bg-white hover:shadow-sm'
                      }
                    `}
                  >
                    <CreditCard className={`w-6 h-6 mx-auto mb-2 ${paymentTiming === 'now' ? 'text-indigo-600' : 'text-slate-600'}`} aria-hidden="true" />
                    <span className={`font-semibold ${paymentTiming === 'now' ? 'text-indigo-900' : 'text-slate-900'}`}>Pay Now</span>
                  </button>
                  {canShowPayLater && (
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentTiming('later');
                        setPaymentMethod('');
                      }}
                      className={`
                        py-4 px-6 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300
                        ${paymentTiming === 'later'
                          ? 'border-indigo-600 bg-indigo-50 shadow-md'
                          : 'border-slate-300 hover:border-indigo-300 bg-white hover:shadow-sm'
                        }
                      `}
                    >
                      <DollarSign className={`w-6 h-6 mx-auto mb-2 ${paymentTiming === 'later' ? 'text-indigo-600' : 'text-slate-600'}`} aria-hidden="true" />
                      <span className={`font-semibold ${paymentTiming === 'later' ? 'text-indigo-900' : 'text-slate-900'}`}>Pay Later</span>
                    </button>
                  )}
                </div>
                {!canShowPayLater && (
                  <p className="text-amber-700 text-sm mt-3 flex items-center gap-2 bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <span>Pay Later option is only available for In Person appointments</span>
                  </p>
                )}
              </div>

              {paymentTiming === 'now' && (
                <div>
                  <label className="flex items-center gap-2 mb-4 text-slate-900 font-semibold text-lg">
                    <CreditCard className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {availablePaymentMethods.map((method) => (
                      <button
                        key={method.name}
                        type="button"
                        onClick={() => setPaymentMethod(method.name)}
                        className={`
                          py-4 px-3 rounded-xl border-2 transition-all duration-300 text-center focus:outline-none focus:ring-4 focus:ring-indigo-300
                          ${paymentMethod === method.name
                            ? 'border-indigo-600 bg-indigo-50 shadow-md scale-105'
                            : 'border-slate-300 hover:border-indigo-300 bg-white hover:shadow-sm'
                          }
                        `}
                      >
                        <div className="text-2xl mb-2">{method.icon}</div>
                        <p className={`text-sm font-semibold mb-1 ${paymentMethod === method.name ? 'text-indigo-900' : 'text-slate-900'}`}>
                          {method.name}
                        </p>
                        <p className="text-xs text-slate-600">{method.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6">
                <h3 className="text-slate-900 font-bold mb-4 text-lg">Booking Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="text-slate-700 font-medium">Service:</span>
                    <span className="text-slate-900 font-semibold">{getSelectedService()?.name || "Service not found"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="text-slate-700 font-medium">Duration:</span>
                    <span className="text-slate-900 font-semibold">{getSelectedService()?.serviceDuration || 60} mins</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="text-slate-700 font-medium">Staff:</span>
                    <span className="text-slate-900 font-semibold">
                      {selectedStaffId === -1 
                        ? 'Any Staff' 
                        : (staffMembers.find(s => s.id === selectedStaffId)?.fullName || 'No staff selected')}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="text-slate-700 font-medium">Location:</span>
                    <span className="text-slate-900 font-semibold">{meetingType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="text-slate-700 font-medium">Date:</span>
                    <span className="text-slate-900 font-semibold">
                      {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="text-slate-700 font-medium">Time:</span>
                    <span className="text-slate-900 font-semibold">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between py-3 mt-3 bg-white rounded-lg px-3">
                    <span className="text-slate-900 font-bold text-base">Total:</span>
                    <span className="text-indigo-600 font-bold text-xl">{getCurrencySymbolForService()}{getServicePrice()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-6 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200 border-2 border-slate-300 font-medium focus:outline-none focus:ring-4 focus:ring-slate-300 min-h-[44px] sm:min-h-[48px] text-sm sm:text-base"
              aria-label="Go back to previous step"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              aria-label="Continue to next step"
              className={`
                flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 font-semibold min-h-[44px] sm:min-h-[48px] text-sm sm:text-base focus:outline-none focus:ring-4
                ${canProceed()
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg focus:ring-indigo-300 transform hover:scale-105'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-60'
                }
              `}
            >
              Next
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </button>
          ) : (
            <div className="flex flex-col items-end gap-2">
              {submitError && (
                <p className="text-rose-600 text-sm" role="alert">
                  {submitError}
                </p>
              )}
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!canProceed() || isSubmitting}
                aria-label={isSubmitting ? "Processing booking..." : "Confirm booking"}
                className={`
                  flex items-center gap-2 px-8 py-3 rounded-lg transition-all duration-300 font-semibold min-h-[48px] focus:outline-none focus:ring-4
                  ${canProceed() && !isSubmitting
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg focus:ring-emerald-300 transform hover:scale-105'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-60'
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" aria-hidden="true" />
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