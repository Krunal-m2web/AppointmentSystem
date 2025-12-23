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
  User
} from 'lucide-react';
import { EnhancedCalendar } from './EnhancedCalendar';
import { fetchServices, CustomerServiceDto } from '../services/servicesService';
import { fetchStaffByService, StaffMemberDto } from '../services/staffService';
import { getCurrencySymbol } from '../utils/currency';
import { createAppointment, CreateAppointmentRequest } from '../services/appointmentApi';
import '../styles/globals.css';
import { combineDateTimeToUTC, formatDate, formatTime, getDateString, getTimeString } from "../utils/datetime";
import { fetchAvailableSlots, fetchStaffTimeOffs, TimeSlotDto, TimeOffResponseDto } from '../services/availabilityService';




interface BookingFormProps {
  onComplete: (details: any) => void;
  onClose: () => void;
}

// Mock data for locations, durations, etc.

const LOCATIONS = [
  { label: 'In Person', value: 'InPerson', icon: '👤' },
  { label: 'Phone Call',value: 'Phone', icon: '📞' },
  { label: 'Zoom', value: 'Zoom', icon: '🎥' },
];

// const DURATIONS = ['60 min', '90 min', 'Custom'];

const SERVICE_PRICES = {
  'Web Design': 150,
  'Software Development': 200,
};

const CURRENCY_RATES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1, enabled: true },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92, enabled: true },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79, enabled: true },
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
  const [companyTimezone, setCompanyTimezone] = useState("UTC");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Availability state
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const validateStep = () => {
    const errors: Record<string, string> = {};
    
    switch (step) {
      case 4: // Personal Details
        if (!firstName.trim()) {
          errors.firstName = 'First name is required';
        } else if (firstName.trim().length < 2) {
          errors.firstName = 'First name must be at least 2 characters';
        }
        
        if (!lastName.trim()) {
          errors.lastName = 'Last name is required';
        } else if (lastName.trim().length < 2) {
          errors.lastName = 'Last name must be at least 2 characters';
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
  useEffect(() => {
    const loadServices = async () => {
      try {
        setServicesLoading(true);
        setServicesError(null);
        
        // Get companyId from URL query params
        const queryParams = new URLSearchParams(window.location.search);
        const companyIdParam = queryParams.get('companyId');
        
        if (!companyIdParam) {
          setServicesError('No company ID provided. Please use a valid booking link.');
          return;
        }

        const companyId = parseInt(companyIdParam, 10);
        
        // Fetch services with dynamic currency from backend settings
        const data = await fetchServices(companyId);
        setServices(data);

        // Fetch timezone
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5289";
        const tzRes = await fetch(`${API_BASE_URL}/api/settings/timezone?companyId=${companyId}`);
        if(tzRes.ok) {
            const tzData = await tzRes.json();
            if(tzData.timezone) setCompanyTimezone(tzData.timezone);
        }

      } catch (err) {
        console.error('Error loading services:', err);
        setServicesError('Failed to load services. Please refresh the page.');
      } finally {
        setServicesLoading(false);
      }
    };

    loadServices();
  }, []); // Empty dependency array = run once when component mounts

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
        
        // Set "Any Staff" (-1) as default selection when service is first selected
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
  }, [selectedServiceId]); // Run when selected service changes

  // Fetch Time Offs when staff changes
  useEffect(() => {
    const loadTimeOffs = async () => {
      if (!selectedStaffId || selectedStaffId === -1) {
        setUnavailableDates([]);
        return;
      }

      try {
        const timeOffs = await fetchStaffTimeOffs(selectedStaffId);
        // Convert timeOffs to disabled dates
        // Note: This logic disables the entire day if there's any time off. 
        // For partial days, we should rely on slot availability, but visually blocking full days is good.
        // If the backend returns start/end UTC, we ideally check if it covers the whole business day.
        // For simplicity, if a timeOff spans a full day, we disable it.
        const disabledDates: Date[] = [];
        timeOffs.forEach((t) => {
           const start = new Date(t.startDateTimeUtc);
           const end = new Date(t.endDateTimeUtc);
           
           // Simple loop to add all days in range
           for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
              disabledDates.push(new Date(d));
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
  useEffect(() => {
    const loadSlots = async () => {
      if (!selectedDate || !selectedServiceId || !selectedStaffId || selectedStaffId === -1) {
        setAvailableSlots([]);
        return;
      }

      try {
        setSlotsLoading(true);
        // Format date as YYYY-MM-DD
        const dateStr = selectedDate.toISOString().split('T')[0];
        
        const slots = await fetchAvailableSlots(selectedStaffId, selectedServiceId, dateStr);
        
        // Filter only available slots and extract times
        // The backend returns TimeSlotDto { startTime: ISO, endTime: ISO, isAvailable: boolean }
        // We need to display the time in HH:mm format (e.g., "9:00am")
        // Since the backend returns UTC, we should convert to company timezone or local?
        // Usually, the display "9:00am" implies the company's local time.
        // Our formatTime util helps here if we pass the timezone.
        
        const formattedSlots = slots
          .filter(s => s.isAvailable)
          .map(s => {
             // Convert ISO UTC string to formatted time string in company timezone
             const date = new Date(s.startTime);
             // Use our helper or built-in, but we need strictly "h:mm a" format to match existing UI style or similar
             // formatTime(s.startTime, companyTimezone) returns something like "9:00 AM" if configured.
             // Let's use standard JS for cleaner control if needed, or formatTime
             return new Date(s.startTime).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                timeZone: companyTimezone,
                hour12: true
             }).toLowerCase().replace(' ', ''); // "9:00am"
          });
          
        setAvailableSlots(formattedSlots);
      } catch (err) {
        console.error("Error loading slots:", err);
        setAvailableSlots([]);
      } finally {
        setSlotsLoading(false);
      }
    };

    loadSlots();
  }, [selectedDate, selectedServiceId, selectedStaffId, companyTimezone]);

  // Helper function to get the selected service object
  const getSelectedService = (): CustomerServiceDto | null => {
    if (selectedServiceId === null) return null;
    return services.find(s => s.id === selectedServiceId) || null;
  };


  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedServiceId !== null && selectedStaffId !== null;
      case 2:
        return location ;
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
      setFormErrors({}); // Clear errors when moving to next step
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const showPayLater = meetingType === 'InPerson';

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
      // Get companyId from URL
      const queryParams = new URLSearchParams(window.location.search);
      const companyIdParam = queryParams.get('companyId');
      const companyId = companyIdParam ? parseInt(companyIdParam, 10) : 0;
      
      if (!companyId) {
        throw new Error('Invalid company ID');
      }
      
      // Build ISO date-time string in UTC
      if (!selectedDate) {
        throw new Error('Please select a date');
      }
      
      if (!selectedDate || !selectedTime) {
  throw new Error("Please select date and time");
}

// Convert Date → YYYY-MM-DD in company timezone
const dateStr = getDateString(selectedDate, companyTimezone);

// selectedTime already comes from calendar in HH:mm
const startTimeUtc = combineDateTimeToUTC(
  dateStr,
  selectedTime,
  companyTimezone // 🔥 critical
);

      // Map payment method to backend enum
      const mapPaymentMethod = (method: string): 'Card' | 'Cash' | 'PayPal' => {
        if (method === 'Credit Card' || method === 'Debit Card') return 'Card';
        if (method === 'PayPal') return 'PayPal';
        if (paymentTiming === 'later') return 'Cash'; // Pay Later = Cash on arrival
        return 'Card';
      };
      
      // Map meeting type
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
  startTime: startTimeUtc, // ✅ UTC only
  meetingType: mapMeetingType(meetingType),
  paymentMethod: mapPaymentMethod(paymentMethod),
  notes: description || undefined,
};

      
      const response = await createAppointment(request);
      
      // Build details for confirmation screen
      const selectedService = getSelectedService();
      const selectedStaff = selectedStaffId === -1 
        ? { id: -1, fullName: 'Any Staff' } 
        : staffMembers.find(s => s.id === selectedStaffId);
      
     const details = {
  id: response.id,
  serviceId: selectedServiceId,
  serviceName: selectedService?.name || response.serviceName,
  staffId: selectedStaffId,
  staffName:
    response.staffName || selectedStaff?.fullName || "To be assigned",
  description,
  location: meetingType,
  meetingType,

  // ✅ ALWAYS format from UTC using company timezone
  date: formatDate(startTimeUtc, companyTimezone, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  time: formatTime(startTimeUtc, companyTimezone),

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
            <div>
              <h1>Book Your Appointment</h1>
              <p className="text-gray-600 mt-1">Complete the form to schedule your session</p>
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
            {/* Progress Line */}
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
                  ) : services.length === 0 ? (
                    <option value="">No services available</option>
                  ) : (
                    <>
                      <option value="">Choose a service...</option>
                      {services.map((s) => (
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
                  <FileText className="w-4 h-4 text-indigo-600" />
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

              <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  Meeting Location
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {LOCATIONS.map((loc) => (
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
                        p-3 rounded-lg border-2 transition-all text-center
                        ${meetingType === loc.value
                          ? 'border-indigo-600 bg-indigo-50'
                          : formErrors.meetingType
                          ? 'border-red-500 hover:border-red-400'
                          : 'border-gray-300 hover:border-indigo-300 bg-white'
                        }
                      `}
                    >
                      <div className="text-2xl mb-1">{loc.icon}</div>
                      <p className="text-sm text-gray-900">{loc.label}</p>
                    </button>
                  ))}
                </div>
                {formErrors.meetingType && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.meetingType}</p>
                )}
              </div>

              {/* <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700">
                  <Timer className="w-4 h-4 text-indigo-600" />
                  Duration
                </label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {DURATIONS.map((dur) => (
                    <button
                      key={dur}
                      onClick={() => setDuration(dur)}
                      className={`
                        py-2.5 px-4 rounded-lg border-2 transition-all
                        ${duration === dur
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-300 hover:border-indigo-300 bg-white'
                        }
                      `}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
                {duration === 'Custom' && (
                  <input
                    type="number"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(e.target.value)}
                    placeholder="Enter duration in minutes"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    min="15"
                    step="15"
                  />
                )}
              </div> */}
            </div>
          )}

          {step === 3 && (
            <div>
              <EnhancedCalendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
                timezone={companyTimezone}
                unavailableDates={unavailableDates}
                timeSlots={availableSlots}
                isLoadingSlots={slotsLoading}
              />
            </div>
          )}

            {step === 4 && (
            <div className="space-y-6">
              {/* Booking Summary */}
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

              {/* Instructions */}
              <p className="text-gray-600">
                Please provide your details in the form below to proceed with booking.
              </p>

              {/* Personal Details Form */}
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
              </div>
            </div>
          )}


          {step === 5 && (
            <div className="space-y-4">
              {/* Price Display */}
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

              {/* Available Currencies */}
              {/* <div>
                <label className="flex items-center gap-2 mb-2 text-gray-700">
                  <DollarSign className="w-4 h-4 text-indigo-600" />
                  Available Currencies
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {CURRENCY_RATES.filter(c => c.enabled).map((curr) => {
                    const convertedPrice = convertPrice(getServicePriceUSD(), curr.rate);
                    return (
                      <div
                        key={curr.code}
                        className="p-3 bg-gray-50 border border-gray-200 rounded-lg"
                      >
                        <p className="text-xs text-gray-600">{curr.name}</p>
                        <p className="text-lg text-gray-900 mt-1">
                          {curr.symbol}{convertedPrice}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div> */}

              {/* Payment Timing */}
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
                  {showPayLater && (
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
                {!showPayLater && (
                  <p className="text-amber-600 text-sm mt-2 flex items-center gap-2 bg-amber-50 p-2 rounded border border-amber-200">
                    <span>ℹ️</span>
                    <span>Pay Later option is only available for In Person appointments</span>
                  </p>
                )}
              </div>

              {/* Payment Method */}
              {paymentTiming === 'now' && (
                <div>
                  <label className="flex items-center gap-2 mb-2 text-gray-700">
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {PAYMENT_METHODS.map((method) => (
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

              {/* Summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-gray-900 mb-3">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-600">Service:</span>
                    <span className="text-gray-900">{getSelectedService()?.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-gray-600">Staff:</span>
                    <span className="text-gray-900">{selectedStaffId === -1 ? 'Any Staff' : (staffMembers.find(s => s.id === selectedStaffId)?.fullName || 'No staff selected')}</span>
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
