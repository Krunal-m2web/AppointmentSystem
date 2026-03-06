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
import { getCurrencySymbol, formatPrice } from '../utils/currency';
import { createAppointment, CreateAppointmentRequest } from '../services/appointmentApi';
import { getPaymentSettings, getMeetingLocationSettings, getDefaultCurrency } from '../services/settingsService';

import '../styles/globals.css';
import { combineDateTimeToUTC, formatDate, formatTime, getTimezoneOffset } from "../utils/datetime";
import { fetchAvailableSlots, fetchStaffTimeOffs, fetchAnyStaffSlots } from '../services/availabilityService';
import { fetchPublicHolidays } from '../services/holidayApi';
import { getPublicCompanyProfile, getPublicCompanyProfileBySlug } from '../services/CompanyService';
import { useParams } from 'react-router-dom';
import { TimezoneSelect } from './TimezoneSelect';
import PhoneInput, { isValidPhoneNumber, getCountryFromTimezone } from './ui/PhoneInput';

// Use widget API URL if available, otherwise fall back to env/default
const API_BASE_URL = (window as any).__BOOKING_WIDGET_API_URL__ || import.meta.env.VITE_API_BASE_URL || "http://localhost:5289";

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
  companySlug?: string;
}
 
const LOCATIONS = [
  { 
    label: 'In Person', 
    value: 'InPerson', 
    icon: MapPin,
    description: 'Meet at our office',
    gradient: 'from-blue-500 to-blue-600',
    isComingSoon: false
  },
  { 
    label: 'Phone Call', 
    value: 'Phone', 
    icon: PhoneIcon,
    description: 'Call on your phone',
    gradient: 'from-emerald-500 to-emerald-600',
    isComingSoon: false
  },
  /*
  { 
    label: 'Zoom', 
    value: 'Zoom', 
    icon: Video,
    description: 'Video conference',
    gradient: 'from-indigo-500 to-indigo-600',
    isComingSoon: true
  },
  */
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
  primaryColor?: string;
}

const CustomSelect = ({ 
  id, 
  options, 
  value, 
  onChange, 
  isLoading = false,
  placeholder = "Select an option...", 
  disabled = false,
  error = null,
  primaryColor = '#6366f1' // Default indigo
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
        className={`w-full px-4 py-3.5 border-2 rounded-xl text-left flex items-center justify-between transition-all duration-200 bg-white cursor-pointer ${
          disabled ? 'bg-slate-50 cursor-not-allowed border-slate-200 text-slate-400' :
          error ? 'border-rose-300 hover:border-rose-400' :
          isOpen ? 'shadow-lg' :
          'border-slate-200 hover:border-slate-300 shadow-sm'
        }`}
        style={isOpen && !error ? { 
          borderColor: primaryColor, 
          boxShadow: `0 0 0 3px ${primaryColor}1a, 0 10px 15px -3px rgba(0,0,0,0.05)` 
        } : undefined}
      >
        <div className="flex items-center gap-3 min-w-0">
          {selectedOption ? (
            <div className="min-w-0">
              <span className="block truncate font-semibold text-slate-900 text-[15px]">{selectedOption.label}</span>
              {selectedOption.subLabel && (
                <span className="block truncate text-xs mt-0.5" style={{ color: primaryColor }}>{selectedOption.subLabel}</span>
              )}
            </div>
          ) : (
            <span className="text-slate-400 font-medium">{isLoading ? "Loading..." : placeholder}</span>
          )}
        </div>
        <div className={`flex-shrink-0 p-1 rounded-lg transition-all duration-200 ${isOpen ? 'rotate-180' : ''}`} style={isOpen ? { backgroundColor: `${primaryColor}14` } : undefined}>
          <ChevronDown className="w-4 h-4" style={{ color: isOpen ? primaryColor : '#94a3b8' }} />
        </div>
      </button>
      
      {isOpen && !disabled && !isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200/80 rounded-xl shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] max-h-[340px] overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-1 duration-150">
          {options.length === 0 ? (
            <div className="px-4 py-8 text-sm text-slate-400 italic text-center">No options available</div>
          ) : filteredOptions.length === 0 ? (
             <div className="px-4 py-8 text-sm text-slate-400 italic text-center">No matches for "{searchTerm}"</div>
          ) : (
            <div className="p-1.5">
              {/* Search indicator */}
              {searchTerm && (
                <div 
                  className="px-3 py-1.5 mb-1 text-xs font-semibold rounded-lg"
                  style={{
                    color: primaryColor,
                    backgroundColor: `${primaryColor}0d`,
                  }}
                >
                  🔍 Filtering: "{searchTerm}"
                </div>
              )}
              {filteredOptions.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    className={`
                      w-full px-3.5 py-3 text-left text-sm rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 group/item
                      ${isSelected 
                        ? 'font-semibold' 
                        : 'hover:bg-slate-50'
                      }
                    `}
                    style={isSelected ? {
                      backgroundColor: `${primaryColor}0d`,
                      color: primaryColor,
                    } : undefined}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-medium text-slate-800'}`}>
                        {option.label}
                      </span>
                      {option.subLabel && (
                        <span className={`text-xs block mt-0.5 truncate ${
                          isSelected 
                            ? '' 
                            : 'text-slate-400'
                        }`}
                          style={isSelected ? { color: primaryColor, opacity: 0.7 } : undefined}
                        >
                          {option.subLabel}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <div 
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
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

export function BookingForm({ onComplete, companySlug }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [companyCurrency, setCompanyCurrency] = useState<string>('USD');

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
  const [holidays, setHolidays] = useState<Date[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // Customer timezone
  const [customerTimezone, setCustomerTimezone] = useState<string>(getBrowserTimezone());
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState<string>(getCountryFromTimezone(getBrowserTimezone()));

  // Dynamic settings
  const [availableLocations, setAvailableLocations] = useState(LOCATIONS);
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState(PAYMENT_METHODS);
  const [showPayNow, setShowPayNow] = useState(true);
  const [showPayLater, setShowPayLater] = useState(true);

  // Custom labels from company settings
  const [customLabels, setCustomLabels] = useState({
    serviceLabel: 'Service',
    staffLabel: 'Staff Member',
  });

  // Custom colors from company settings
  const [customColors, setCustomColors] = useState({
    primaryColor: '#6366f1',
    secondaryColor: '#10b981',
  });

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
        
        const hasPhone = phone.trim().length > 0;
        
        if (meetingType === 'Phone' && !hasPhone) {
          errors.phone = 'Phone number is required for phone call meetings';
        }
        
        if (!email.trim()) {
          errors.email = 'Email address is required';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            errors.email = 'Please enter a valid email address';
          }
        }
    
        // Validate phone if provided
        if (hasPhone) {
          const isValid = isValidPhoneNumber(phone);
          if (!isValid) {
            const countryNameMap: Record<string, string> = {
              'IN': 'Indian',
              'DE': 'German',
              'US': 'US',
              'GB': 'UK',
              'CA': 'Canadian',
              'AU': 'Australian'
            };
            const countryName = countryNameMap[selectedPhoneCountry] || '';
            errors.phone = `Invalid ${countryName} phone number format`.replace('  ', ' ');
          } else if (selectedPhoneCountry === 'IN' && phone.replace(/\D/g, '').length > 12) {
             errors.phone = 'phone numbers must be 10 digits';
          }
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

  // Real-time phone validation
  useEffect(() => {
    if (phone && phone.trim().length > 0) {
      const isValid = isValidPhoneNumber(phone);
      const newErrors = { ...formErrors };
      
      const countryNameMap: Record<string, string> = {
        'IN': 'Indian',
        'DE': 'German',
        'US': 'US',
        'GB': 'UK',
        'CA': 'Canadian',
        'AU': 'Australian'
      };
      const countryName = countryNameMap[selectedPhoneCountry] || '';
      const formatError = `Invalid ${countryName} phone number format`.replace('  ', ' ');

      if (!isValid) {
        newErrors.phone = formatError;
      } else if (selectedPhoneCountry === 'IN' && phone.replace(/\D/g, '').length > 12) {
        newErrors.phone = 'phone numbers must be 10 digits';
      } else {
        delete newErrors.phone;
      }
      
      if (JSON.stringify(newErrors) !== JSON.stringify(formErrors)) {
        setFormErrors(newErrors);
      }
    }
  }, [phone, selectedPhoneCountry]);

  // Fetch services
  const params = useParams<{ slug: string }>();
  const slug = companySlug || params.slug;

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
          
          // Load custom labels
          if (company.bookingFormLabels) {
            try {
              const parsedLabels = JSON.parse(company.bookingFormLabels);
              setCustomLabels(prev => ({ ...prev, ...parsedLabels }));
            } catch { /* Keep defaults */ }
          }
          
          // Load custom colors
          if (company.bookingFormPrimaryColor) {
            setCustomColors(prev => ({ ...prev, primaryColor: company.bookingFormPrimaryColor }));
          }
          if (company.bookingFormSecondaryColor) {
            setCustomColors(prev => ({ ...prev, secondaryColor: company.bookingFormSecondaryColor }));
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
            
            // Load custom labels
            if (profile.bookingFormLabels) {
              try {
                const parsedLabels = JSON.parse(profile.bookingFormLabels);
                setCustomLabels(prev => ({ ...prev, ...parsedLabels }));
              } catch { /* Keep defaults */ }
            }
            
            // Load custom colors
            if (profile.bookingFormPrimaryColor) {
              setCustomColors(prev => ({ ...prev, primaryColor: profile.bookingFormPrimaryColor }));
            }
            if (profile.bookingFormSecondaryColor) {
              setCustomColors(prev => ({ ...prev, secondaryColor: profile.bookingFormSecondaryColor }));
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
            const paymentSettings = await getPaymentSettings(companyId);
            const filteredMethods = PAYMENT_METHODS.filter(method => 
              paymentSettings.enabledPaymentMethods.includes(method.name)
            );
            setAvailablePaymentMethods(filteredMethods);
            setShowPayNow(paymentSettings.showPayNow);
            setShowPayLater(paymentSettings.showPayLater);

            // Initialize paymentTiming based on available options
            if (!paymentSettings.showPayNow && paymentSettings.showPayLater) {
              setPaymentTiming('later');
            } else {
              setPaymentTiming('now');
            }
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

  // Load company default currency when companyId resolves
  useEffect(() => {
    if (!companyId) return;
    getDefaultCurrency(companyId).then(setCompanyCurrency).catch(() => {/* keep USD fallback */});
  }, [companyId]);

  // Fetch company holidays
  useEffect(() => {
    const loadHolidays = async () => {
      if (!companyId) return;
      try {
        const year = new Date().getFullYear();
        // Fetch current and next year to handle future bookings
        const [currHolidays, nextHolidays] = await Promise.all([
          fetchPublicHolidays(companyId, year),
          fetchPublicHolidays(companyId, year + 1)
        ]);
        
        const holidayDates = [...currHolidays, ...nextHolidays].map(h => new Date(h.date));
        setHolidays(holidayDates);
      } catch (err) {
        console.error("Error loading company holidays:", err);
      }
    };
    loadHolidays();
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
          if (t.status === 'Rejected') return; // Ignore rejected time-offs
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
        // Require first name, last name, and email
        if (meetingType === 'Phone' && (!phone || phone.trim() === '')) return false;
        return firstName && lastName && email;
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
    return selectedService?.currency || companyCurrency;
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
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        serviceId: selectedServiceId!,
        staffId: selectedStaffId === -1 ? null : selectedStaffId,
        startTime: startTimeUtc,
        meetingType: mapMeetingType(meetingType),
        paymentMethod: mapPaymentMethod(paymentMethod),
        timezone: customerTimezone,
        notes: description.trim() || undefined,
        price: getServicePrice(),
        currencyCode: getServiceCurrency(),
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
        price: formatPrice(response.price, response.currencyCode || getServiceCurrency()),
        paymentMethod: paymentTiming === "later" ? "Pay Later" : paymentMethod,
        paymentTiming,
        status: response.status,
        colors: customColors, // Pass colors to success screen
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
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8"
      style={{
        '--brand-primary': customColors.primaryColor,
        '--brand-secondary': customColors.secondaryColor,
        '--brand-primary-ring': `${customColors.primaryColor}1a`, // 10% opacity
      } as React.CSSProperties}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header - Centered Logo */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200  mb-4 sm:mb-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col items-center text-center gap-3">
            {companyLogo && (
              <img 
                src={companyLogo} 
                alt="Company Logo" 
                className="w-14 h-14 sm:w-20 sm:h-20 object-contain rounded-lg" 
              />
            )}
            {/* <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Book Your Appointment</h1>
              <p className="text-slate-600 text-xs sm:text-sm">Complete the form to schedule your session</p>
            </div> */}
          </div>
        </div>

        {/* Main Container with Side Steps and Content */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Side Menu Steps */}
          <div className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 lg:sticky lg:top-4">
              <div className="flex lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-visible">
                {STEPS.map((s) => {
                  const isActive = step === s.number;
                  const isCompleted = step > s.number;
                  const Icon = s.icon;

                  return (
                    <div 
                      key={s.number} 
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 min-w-max lg:min-w-0 ${
                        isActive
                          ? 'bg-[var(--brand-primary-ring)] border-l-4 border-[var(--brand-primary)]'
                          : isCompleted
                          ? 'bg-emerald-50'
                          : 'hover:bg-slate-50'
                      }`}
                      role="progressbar"
                      aria-valuenow={step}
                      aria-valuemin={1}
                      aria-valuemax={STEPS.length}
                      aria-label={`Step ${s.number}: ${s.name}`}
                    >
                      <div
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0
                          ${isCompleted 
                            ? 'bg-emerald-600 text-white' 
                            : isActive
                            ? 'text-white'
                            : 'bg-slate-200 text-slate-500'
                          }
                        `}
                        style={isActive && !isCompleted ? { backgroundColor: customColors.primaryColor } : undefined}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4" aria-hidden="true" />
                        ) : (
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        )}
                      </div>
                      <span 
                        className={`
                          text-sm font-medium transition-colors duration-300 whitespace-nowrap
                          ${isCompleted ? 'text-emerald-700' : 'text-slate-600'}
                        `}
                        style={isActive && !isCompleted ? { color: customColors.primaryColor } : undefined}
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
          <div className="flex-1">
            <div 
              className="bg-white rounded-xl shadow-md border border-slate-200 p-4 sm:p-6 lg:p-8"
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
                  <Briefcase className="w-5 h-5" style={{ color: customColors.primaryColor }} aria-hidden="true" />
                  Select {customLabels.serviceLabel}
                </label>
                <CustomSelect
                  id="service-select"
                  value={selectedServiceId}
                  onChange={(val) => setSelectedServiceId(Number(val))}
                  options={Array.isArray(services) ? services.map(s => ({
                    value: s.id,
                    label: s.name,
                    subLabel: `${formatPrice(s.price || 0, s.currency || companyCurrency)} (${s.serviceDuration} min)`
                  })) : []}
                  isLoading={servicesLoading}
                  placeholder={`Choose a ${customLabels.serviceLabel.toLowerCase()}...`}
                  error={servicesError}
                  primaryColor={customColors.primaryColor}
                />
              </div>

              <div>
                <label 
                  htmlFor="staff-select"
                  className="flex items-center gap-2 mb-3 text-slate-900 font-semibold text-lg"
                >
                  <Users className="w-5 h-5" style={{ color: customColors.primaryColor }} aria-hidden="true" />
                  Select {customLabels.staffLabel}
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
                  placeholder={!selectedServiceId ? `Please select a ${customLabels.serviceLabel.toLowerCase()} first...` : `Choose a ${customLabels.staffLabel.toLowerCase()}...`}
                  error={staffError}
                  primaryColor={customColors.primaryColor}
                />
              </div>
            </div>
          )}

          {/* Step 2 - Meeting Location */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label className="flex items-center gap-2 mb-5 text-slate-900 font-semibold text-lg">
                  <MapPin className="w-5 h-5" style={{ color: customColors.primaryColor }} aria-hidden="true" />
                  Meeting Location
                </label>
                <div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  role="radiogroup"
                  aria-label="Meeting location options"
                >
                  {availableLocations.map((loc) => {
                    const Icon = loc.icon;
                    const isSelected = meetingType === loc.value;
                    return (
                      <button
                        key={loc.value}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={`${loc.label}: ${loc.description}`}
                        className={`
                          relative rounded-2xl border-2 transition-all duration-300 text-left cursor-pointer group
                          focus:outline-none focus:ring-4
                          ${loc.isComingSoon
                            ? 'border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed'
                            : isSelected
                            ? 'shadow-lg scale-[1.02]'
                            : formErrors.meetingType
                            ? 'border-rose-400 bg-white hover:border-rose-300'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                          }
                        `}
                        style={isSelected ? {
                          borderColor: customColors.primaryColor,
                          backgroundColor: `${customColors.primaryColor}08`,
                          boxShadow: `0 0 0 3px ${customColors.primaryColor}1a, 0 8px 25px -5px ${customColors.primaryColor}20`,
                        } : undefined}
                        onClick={() => {
                          if (loc.isComingSoon) return;
                          setMeetingType(loc.value);
                          if (formErrors.meetingType) {
                            const newErrors = { ...formErrors };
                            delete newErrors.meetingType;
                            setFormErrors(newErrors);
                          }
                        }}
                      >
                        {loc.isComingSoon && (
                          <div className="absolute top-3 right-3 bg-amber-100 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                            Coming Soon
                          </div>
                        )}

                        <div className="flex items-center gap-4 p-5">
                          {/* Icon */}
                          <div 
                            className={`
                              flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300
                              ${isSelected 
                                ? 'shadow-md' 
                                : 'group-hover:scale-105'
                              }
                            `}
                            style={isSelected 
                              ? { 
                                  background: `linear-gradient(135deg, ${customColors.primaryColor}, ${customColors.primaryColor}dd)`,
                                  boxShadow: `0 4px 14px ${customColors.primaryColor}40` 
                                } 
                              : { backgroundColor: '#f1f5f9' }
                            }
                          >
                            <Icon 
                              className={`w-6 h-6 transition-colors duration-300 ${isSelected ? 'text-white' : ''}`} 
                              style={!isSelected ? { color: customColors.primaryColor } : undefined}
                              aria-hidden="true" 
                            />
                          </div>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <p className={`font-bold text-[15px] mb-0.5 transition-colors duration-200 ${isSelected ? '' : 'text-slate-900'}`}
                              style={isSelected ? { color: customColors.primaryColor } : undefined}
                            >
                              {loc.label}
                            </p>
                            <p className={`text-sm transition-colors duration-200 ${isSelected ? '' : 'text-slate-500'}`}
                              style={isSelected ? { color: `${customColors.primaryColor}99` } : undefined}
                            >
                              {loc.description}
                            </p>
                          </div>

                          {/* Radio indicator */}
                          <div 
                            className={`
                              flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                              ${isSelected 
                                ? '' 
                                : 'border-slate-300 group-hover:border-slate-400'
                              }
                            `}
                            style={isSelected ? { borderColor: customColors.primaryColor, backgroundColor: customColors.primaryColor } : undefined}
                          >
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                            )}
                          </div>
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
                  <Globe className="w-5 h-5" style={{ color: customColors.primaryColor }} aria-hidden="true" />
                  Your Timezone
                </label>
                <div className="flex items-center gap-3">
                  <TimezoneSelect
                    value={customerTimezone}
                    onChange={(val) => {
                      setCustomerTimezone(val);
                      if (!phone) {
                        setSelectedPhoneCountry(getCountryFromTimezone(val));
                      }
                    }}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Times shown below are in your selected timezone. Current offset: {getTimezoneOffset(customerTimezone)}
                </p>
              </div>

              <EnhancedCalendar
                selectedDate={selectedDate}
                onSelectDate={(date) => {
                  setSelectedDate(date);
                  setSelectedTime(''); // Reset time when date changes
                }}
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
                timezone={customerTimezone}
                unavailableDates={[...unavailableDates, ...holidays]}
                timeSlots={availableSlots}
                isLoadingSlots={slotsLoading}
              />
            </div>
          )}

          {/* Step 4 - Personal Details */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              {/* Compact Booking Summary */}
              <div 
                className="border-2 rounded-xl p-4 flex flex-wrap items-center gap-x-6 gap-y-2"
                style={{ 
                  backgroundColor: `${customColors.primaryColor}0d`, // 5% opacity
                  borderColor: `${customColors.primaryColor}33`, // 20% opacity
                }}
              >
                <h3 className="font-semibold" style={{ color: customColors.primaryColor }}>You are booking:</h3>
                <span className="text-sm text-slate-900">
                  <span className="text-slate-600 font-medium">Date:</span> {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-sm text-slate-900">
                  <span className="text-slate-600 font-medium">Time:</span> {selectedTime}
                </span>
                <span className="text-sm text-slate-900">
                  <span className="text-slate-600 font-medium">Price:</span> {formatPrice(getServicePrice(), getServiceCurrency())}
                </span>
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
                          : 'border-slate-300 focus:ring-[var(--brand-primary-ring)] focus:border-[var(--brand-primary)]'
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
                          : 'border-slate-300 focus:ring-[var(--brand-primary-ring)] focus:border-[var(--brand-primary)]'
                      }`}
                    />
                    {formErrors.lastName && (
                      <p id="last-name-error" className="text-rose-600 text-sm mt-1" role="alert">
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <label className="block mb-4 text-slate-900 font-semibold text-base">
                    Contact Information
                  </label>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-slate-700 text-sm font-medium">
                        Phone Number {meetingType === 'Phone' && <span className="text-rose-600">*</span>}
                      </label>
                        <PhoneInput
                          id="phone"
                          value={phone}
                          timezone={customerTimezone}
                          onCountryChange={(c) => setSelectedPhoneCountry(c)}
                          onChange={(val) => {
                            setPhone(val);
                            if (formErrors.phone) {
                              const newErrors = { ...formErrors };
                              delete newErrors.phone;
                              setFormErrors(newErrors);
                            }
                          }}
                          placeholder="Enter phone number"
                          error={formErrors.phone}
                        />
                    </div>

                    <div>
                      <label htmlFor="email" className="block mb-2 text-slate-700 text-sm font-medium">
                        Email Address <span className="text-rose-600">*</span>
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
                            : 'border-slate-300 focus:ring-[var(--brand-primary-ring)] focus:border-[var(--brand-primary)]'
                        }`}
                      />
                      {formErrors.email && (
                        <p id="email-error" className="text-rose-600 text-sm mt-1" role="alert">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>
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
                        : 'border-slate-300 focus:ring-[var(--brand-primary-ring)] focus:border-[var(--brand-primary)]'
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
              {/* Service Price Header - Commented out temporarily */}
              {/*
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
              */}

              <div>
                <label className="flex items-center gap-2 mb-4 text-slate-900 font-semibold text-lg">
                  <CreditCard className="w-5 h-5" style={{ color: customColors.primaryColor }} aria-hidden="true" />
                  When would you like to pay?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {showPayNow && (
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentTiming('now');
                        setPaymentMethod('');
                      }}
                      className={`
                        py-4 px-6 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--brand-primary-ring)] cursor-pointer
                        ${paymentTiming === 'now'
                          ? 'shadow-md'
                          : 'border-slate-300 hover:shadow-sm'
                        }
                      `}
                      style={paymentTiming === 'now' ? {
                        borderColor: customColors.primaryColor,
                        backgroundColor: `${customColors.primaryColor}0d` // 5% opacity
                      } : undefined}
                    >
                      <CreditCard className={`w-6 h-6 mx-auto mb-2 ${paymentTiming !== 'now' ? 'text-slate-600' : ''}`} style={paymentTiming === 'now' ? { color: customColors.primaryColor } : undefined} aria-hidden="true" />
                      <span className={`font-semibold ${paymentTiming !== 'now' ? 'text-slate-900' : ''}`} style={paymentTiming === 'now' ? { color: customColors.primaryColor } : undefined}>Pay Now</span>
                    </button>
                  )}
                  {canShowPayLater && (
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentTiming('later');
                        setPaymentMethod('');
                      }}
                      className={`
                        py-4 px-6 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--brand-primary-ring)] cursor-pointer
                        ${paymentTiming === 'later'
                          ? 'shadow-md'
                          : 'border-slate-300 hover:shadow-sm'
                        }
                      `}
                      style={paymentTiming === 'later' ? {
                        borderColor: customColors.primaryColor,
                        backgroundColor: `${customColors.primaryColor}0d`
                      } : undefined}
                    >
                      <DollarSign className={`w-6 h-6 mx-auto mb-2 ${paymentTiming !== 'later' ? 'text-slate-600' : ''}`} style={paymentTiming === 'later' ? { color: customColors.primaryColor } : undefined} aria-hidden="true" />
                      <span className={`font-semibold ${paymentTiming !== 'later' ? 'text-slate-900' : ''}`} style={paymentTiming === 'later' ? { color: customColors.primaryColor } : undefined}>Pay Later</span>
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
                          py-4 px-3 rounded-xl border-2 transition-all duration-300 text-center focus:outline-none focus:ring-4 focus:ring-[var(--brand-primary-ring)] cursor-pointer
                          ${paymentMethod === method.name
                            ? 'shadow-md scale-[1.02]'
                            : 'border-slate-300 bg-white hover:shadow-sm'
                          }
                        `}
                        style={paymentMethod === method.name ? {
                          borderColor: customColors.primaryColor,
                          backgroundColor: `${customColors.primaryColor}0d`
                        } : undefined}
                      >
                        <div className="text-2xl mb-2">{method.icon}</div>
                        <div className={`font-semibold text-sm ${paymentMethod !== method.name ? 'text-slate-900' : ''}`} style={paymentMethod === method.name ? { color: customColors.primaryColor } : undefined}>{method.name}</div>
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
                    <span className="text-slate-700 font-medium">Meeting Type:</span>
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
                    <span className="font-bold text-xl" style={{ color: customColors.primaryColor }}>{formatPrice(getServicePrice(), getServiceCurrency())}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

              {/* Navigation - Now inside content container */}
              <div className="mt-6 pt-6 border-t border-slate-200 flex items-center justify-between gap-3">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200 border-2 border-slate-300 font-medium focus:outline-none focus:ring-4 focus:ring-slate-300 min-h-[44px] sm:min-h-[48px] text-sm sm:text-base cursor-pointer"
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
                    style={canProceed() ? { backgroundColor: customColors.primaryColor } : undefined}
                    className={`
                      flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 font-semibold min-h-[44px] sm:min-h-[48px] text-sm sm:text-base focus:outline-none focus:ring-4
                      ${canProceed()
                        ? 'text-white shadow-md hover:shadow-lg hover:brightness-110 focus:ring-indigo-300 transform hover:scale-105 cursor-pointer'
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
                      style={canProceed() && !isSubmitting ? { backgroundColor: customColors.secondaryColor } : undefined}
                      className={`
                        flex items-center gap-2 px-8 py-3 rounded-lg transition-all duration-300 font-semibold min-h-[48px] focus:outline-none focus:ring-4
                        ${canProceed() && !isSubmitting
                          ? 'text-white shadow-md hover:shadow-lg hover:brightness-110 focus:ring-emerald-300 transform hover:scale-105 cursor-pointer'
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
        </div>
      </div>
    </div>
  );
}
