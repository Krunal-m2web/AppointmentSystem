import { useState, useEffect, useRef } from 'react';
import { X, User, Calendar, DollarSign, Search, MapPin, Briefcase, CreditCard, FileText, Clock, Mail, Phone as PhoneIcon, Video, Loader2, AlertCircle } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from '../ui/PhoneInput';
import { MiniCalendar } from './MiniCalendar';
import { toast } from 'sonner';
import { fetchAvailableSlots, fetchStaffSchedule } from '../../services/availabilityService';
import { getToken } from '../../services/authService';
import { useTimezone } from '../../context/TimezoneContext';
import { formatTime } from '../../utils/datetime';

// ==================== Types ====================

type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly';

export interface NewAppointment {
  id?: number; // for edit mode
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: number;
  staffId: number;
  date: string;
  time: string;
  duration: number;
  meetingType: 'InPerson' | 'Phone' | 'Zoom';
  paymentMethod: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  notes: string;
  price: string;
  timezone?: string;

  // Recurrence (UI-only)
  isRecurring: boolean;
  recurrenceType: RecurrenceType;
  repeatEndDate: string;
  // External event fields
  serviceName?: string;
  staffName?: string;
}

interface StaffOption {
  id: number;
  name: string;
  serviceIds?: number[];
}

interface ServiceOption {
  id: number;
  name: string;
  price: number;
  duration: number;
}

interface CustomerOption {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export type { StaffOption, ServiceOption, CustomerOption };

interface AppointmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointment: NewAppointment) => Promise<void>;
  initialData?: Partial<NewAppointment>;
  editMode?: boolean;
  staffList: StaffOption[];
  servicesList: ServiceOption[];
  customersList: CustomerOption[];
  currentUserRole?: string;
  currentUserId?: number;
}

// ==================== Component ====================

export function AppointmentFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  editMode = false,
  staffList,
  servicesList,
  customersList,
  currentUserRole = 'Staff',
  currentUserId = 0,
}: AppointmentFormModalProps) {
  // Check if this is an external Google Calendar event (negative ID)
  const isExternalEvent = initialData?.id && initialData.id < 0;
  
  // Logic for external event view
  if (isOpen && isExternalEvent) {
    const isOwner = initialData?.staffId === currentUserId;
    // const title = initialData?.serviceName || 'Google Calendar Event'; // Actual title is in serviceName
    const serviceName = initialData?.serviceName || '';
    const eventTitle = serviceName.startsWith("Google Calendar: ") 
        ? serviceName.substring(17) 
        : serviceName || "Busy";

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 border-b border-indigo-500/20">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                             <Calendar className="w-5 h-5" />
                             External Event
                        </h2>
                        <button onClick={onClose} className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                    
                    {/* Event Details */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{eventTitle}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {initialData?.date} at {initialData?.time}
                            {initialData?.duration ? ` (${initialData.duration} min)` : ''}
                        </p>
                    </div>

                    {/* Role-Specific Info */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-3">
                        
                        {/* Staff View: Own Event */}
                        {currentUserRole === 'Staff' && isOwner && (
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Source: Your Google Calendar</p>
                                        <p className="text-xs text-gray-500">Synced from your personal calendar.</p>
                                    </div>
                                </div>
                                <a 
                                    href="https://calendar.google.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block w-full text-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Open in Google Calendar ↗
                                </a>
                            </div>
                        )}

                        {/* Admin View or Staff viewing other */}
                        {(currentUserRole === 'Admin' || (currentUserRole === 'Staff' && !isOwner)) && (
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            Staff: {staffList.find(s => s.id === initialData?.staffId)?.name || 'Unknown Staff'}
                                        </p>
                                        <p className="text-xs text-gray-500">Source: Google Calendar</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Restrictions Info */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <X className="w-4 h-4 text-gray-400" />
                            <span>Cannot edit details in SaaS</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <X className="w-4 h-4 text-gray-400" />
                            <span>Cannot cancel from here</span>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
  }

  // Form State
  const [formData, setFormData] = useState<NewAppointment>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceId: 0,
    staffId: 0,
    date: '',
    time: '',
    duration: 60,
    meetingType: 'InPerson',
    paymentMethod: 'Card',
    status: 'Confirmed',
    notes: '',
    price: '',
    isRecurring: false,
    recurrenceType: 'none',
    repeatEndDate: '',
  });

  // UI State
  const [searchClient, setSearchClient] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRepeatDatePicker, setShowRepeatDatePicker] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Availability State
  const [staffSchedule, setStaffSchedule] = useState<any[]>([]);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const { timezone } = useTimezone();

  // Fetch staff schedule when staff changes
  useEffect(() => {
    const loadStaffSchedule = async () => {
      if (formData.staffId > 0) {
        try {
          const schedule = await fetchStaffSchedule(formData.staffId, getToken() || '');
          setStaffSchedule(schedule);
        } catch (error) {
          console.error('Failed to fetch staff schedule:', error);
          setStaffSchedule([]);
        }
      } else {
        setStaffSchedule([]);
      }
    };
    loadStaffSchedule();
  }, [formData.staffId]);

  // Fetch slots when staff, service, date, or duration changes
  useEffect(() => {
    const loadSlots = async () => {
      const effectiveStaffId = currentUserRole === 'Staff' && currentUserId > 0 ? currentUserId : formData.staffId;
      
      if (effectiveStaffId > 0 && formData.serviceId > 0 && formData.date) {
        setIsLoadingSlots(true);
        try {
          const slots = await fetchAvailableSlots(
            effectiveStaffId, 
            formData.serviceId, 
            formData.date,
            formData.duration
          );
          setAvailableSlots(slots);
        } catch (error) {
          console.error('Failed to fetch slots:', error);
          setAvailableSlots([]);
        } finally {
          setIsLoadingSlots(false);
        }
      } else {
        setAvailableSlots([]);
      }
    };
    loadSlots();
  }, [formData.staffId, formData.serviceId, formData.date, formData.duration]);

  // Helper to check if a date is unavailable
  const isDateUnavailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;

    if (staffSchedule.length > 0) {
      const dayOfWeek = date.getDay();
      
      // Backend sends DayOfWeek as strings due to JsonStringEnumConverter
      const dayMap: Record<string, number> = {
        'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3,
        'Thursday': 4, 'Friday': 5, 'Saturday': 6
      };

      const dayConfig = staffSchedule.find(s => {
        const sDay = typeof s.dayOfWeek === 'string' ? dayMap[s.dayOfWeek] : s.dayOfWeek;
        return sDay === dayOfWeek;
      });
      return !dayConfig || !dayConfig.isAvailable;
    }
    return false;
  };

  // Refs
  const datePickerRef = useRef<HTMLDivElement>(null);
  const repeatDatePickerRef = useRef<HTMLDivElement>(null);

  // ==================== Effects ====================

  // Initialize form with initial data
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => {
        const updated = { ...prev, ...initialData };
        // If creating a new appointment as Staff, ensure staffId is set even if initialData has 0
        if (currentUserRole === 'Staff' && currentUserId > 0 && !editMode && updated.staffId === 0) {
          updated.staffId = currentUserId;
        }
        return updated;
      });
      setSearchClient(initialData.customerName || '');
    } else if (currentUserRole === 'Staff' && currentUserId > 0 && !editMode) {
      // Pre-select current staff member if creating new appointment as Staff
      setFormData(prev => ({ ...prev, staffId: currentUserId }));
    }
  }, [initialData, currentUserRole, currentUserId, editMode]);

  // Close date pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
      if (repeatDatePickerRef.current && !repeatDatePickerRef.current.contains(event.target as Node)) {
        setShowRepeatDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ==================== Handlers ====================

  const handleReset = () => {
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      serviceId: 0,
      staffId: currentUserRole === 'Staff' ? currentUserId : 0,
      date: '',
      time: '',
      duration: 30, // Default duration
      meetingType: 'InPerson',
      paymentMethod: 'Card',
      status: 'Confirmed',
      notes: '',
      price: '',
      isRecurring: false,
      recurrenceType: 'none',
      repeatEndDate: '',
    });
    setSearchClient('');
    setShowClientDropdown(false);
    setFormErrors({});
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleServiceChange = (serviceId: number) => {
    const service = servicesList.find((s) => s.id === serviceId);
    if (service) {
      setFormData({
        ...formData,
        serviceId,
        duration: service.duration,
        price: service.price.toString(),
      });
    }
  };

  const handleClientSelect = (client: CustomerOption) => {
    setFormData({
      ...formData,
      customerName: client.name,
      customerEmail: client.email,
      customerPhone: client.phone || '',
    });
    setSearchClient(client.name);
    setShowClientDropdown(false);
    setFormErrors((prev) => ({ ...prev, customerName: '', customerEmail: '' }));
  };

  const filteredClients = customersList.filter(
    (client) =>
      client.name.toLowerCase().includes(searchClient.toLowerCase()) ||
      client.email.toLowerCase().includes(searchClient.toLowerCase())
  );

  // ==================== Validation ====================

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.customerName.trim()) {
      errors.customerName = 'Customer Name is required';
    } else if (formData.customerName.length > 25) {
      errors.customerName = 'Customer Name must be 25 characters or less';
    }
    
    const hasEmail = formData.customerEmail.trim().length > 0;
    const hasPhone = formData.customerPhone.trim().length > 0;

    if (!hasEmail && !hasPhone) {
      errors.customerEmail = 'Email or Phone is required';
      errors.customerPhone = 'Email or Phone is required';
    } else {
      if (hasEmail && !emailRegex.test(formData.customerEmail)) {
        errors.customerEmail = 'Invalid email format';
      }
      if (hasPhone && !isValidPhoneNumber(formData.customerPhone)) {
        errors.customerPhone = 'Invalid phone format';
      }
    }

    if (formData.serviceId === 0) errors.serviceId = 'Please select a service';
    if (formData.staffId === 0) errors.staffId = 'Please select a staff member';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.time) errors.time = 'Time is required';
    if (formData.price === undefined || formData.price === null || formData.price.trim() === '') {
      errors.price = 'Price is required';
    } else if (isNaN(Number(formData.price))) {
      errors.price = 'Price must be a number';
    } else if (formData.price.length > 10) {
      errors.price = 'Price must be 10 characters or less';
    }

    if (formData.duration < 1) {
      errors.duration = 'Duration must be at least 1 minute';
    }

    if (formData.isRecurring) {
      if (!formData.recurrenceType || formData.recurrenceType === 'none') {
        errors.recurrenceType = 'Frequency is required';
      }
      if (!formData.repeatEndDate) {
        errors.repeatEndDate = 'End date is required';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ==================== Submit ====================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Re-verify slot availability before submission to prevent race conditions
      // Skip this check in edit mode if the user is keeping the same time (it's already booked by this appointment)
      const isKeepingSameTime = editMode && initialData?.time === formData.time;
      const effectiveStaffId = currentUserRole === 'Staff' && currentUserId > 0 ? currentUserId : formData.staffId;
      
      if (!isKeepingSameTime && effectiveStaffId > 0 && formData.serviceId > 0 && formData.date && formData.time) {
        const freshSlots = await fetchAvailableSlots(
          effectiveStaffId,
          formData.serviceId,
          formData.date,
          formData.duration
        );
        
        // Check if the selected time is still available
        const selectedTimeStillAvailable = freshSlots.some(slot => {
          const slotTimeStr = formatTime(slot.startTime, timezone);
          return slotTimeStr === formData.time;
        });
        
        if (!selectedTimeStillAvailable) {
          // Slot is no longer available - refresh the slots and inform user
          setAvailableSlots(freshSlots);
          setFormData(prev => ({ ...prev, time: '' })); // Clear the invalid time selection
          toast.warning('The selected time slot is no longer available. Please choose another time.');
          setIsSubmitting(false);
          return;
        }
      }

      await onSubmit(formData);
      handleReset();
      onClose();
    } catch (error: any) {
      console.error('Form submission error:', error);
      
      // Handle 409 conflict specifically by refreshing slots
      if (error.message?.includes('no longer available') || error.message?.includes('409')) {
        const effectiveStaffId = currentUserRole === 'Staff' && currentUserId > 0 ? currentUserId : formData.staffId;
        if (effectiveStaffId > 0 && formData.serviceId > 0 && formData.date) {
          try {
            const freshSlots = await fetchAvailableSlots(
              effectiveStaffId,
              formData.serviceId,
              formData.date,
              formData.duration
            );
            setAvailableSlots(freshSlots);
            setFormData(prev => ({ ...prev, time: '' }));
          } catch {
            // Ignore refresh errors
          }
        }
        toast.warning('The selected time slot is no longer available. Please choose another time.');
      } else {
        toast.error(`Failed to save appointment: ${error.message || error}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==================== Render ====================

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-400 to-indigo-500 px-6 py-5 border-b border-indigo-600/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                {editMode ? 'Edit Appointment' : 'New Appointment'}
              </h2>
              <p className="text-indigo-100 text-sm mt-0.5">
                {editMode ? 'Update appointment details' : 'Schedule a new appointment for your customer'}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-white hover:rotate-90"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50/50">
            <div className="space-y-6">
              {/* Customer Information Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-100 rounded-lg">
                      <User className="w-4 h-4 text-indigo-600" />
                    </div>
                    Customer Information
                  </h3>
                </div>
                <div className="p-5 space-y-4">
                  {/* Searchable Client Input */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={searchClient}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSearchClient(val);
                          setFormData({ ...formData, customerName: val });
                          setShowClientDropdown(true);
                          
                          // Real-time validation
                          let error = '';
                          if (!val.trim()) {
                            error = 'Customer Name is required';
                          } else if (val.length > 25) {
                            error = 'Customer Name must be 25 characters or less';
                          }
                          setFormErrors(prev => ({ ...prev, customerName: error }));
                        }}
                        onFocus={() => setShowClientDropdown(true)}
                        placeholder="Search existing customers or enter new name"
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                          formErrors.customerName ? 'border-red-300 bg-red-50/50' : 'border-gray-300 bg-white'
                        }`}
                      />
                    </div>
                    {formErrors.customerName && (
                      <p className="text-red-600 text-xs mt-1.5">
                        {formErrors.customerName}
                      </p>
                    )}
                    {showClientDropdown && filteredClients.length > 0 && (
                      <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-56 overflow-y-auto">
                        {filteredClients.slice(0, 10).map((client) => (
                          <button
                            key={client.id}
                            type="button"
                            onClick={() => handleClientSelect(client)}
                            className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors border-b border-gray-100 last:border-0 group"
                          >
                            <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">{client.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{client.email}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 pt-2">
                    <label className="block text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">
                      Contact Information <span className="text-gray-400 font-normal text-xs ml-1">(Provide either Email or Phone)</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                          <input
                            type="email"
                            value={formData.customerEmail}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData({ ...formData, customerEmail: val });
                              
                              // Real-time validation
                              let error = '';
                              const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                              if (val.trim()) {
                                if (!emailRegex.test(val)) {
                                  error = 'Invalid email format';
                                }
                              } else if (!formData.customerPhone.trim()) {
                                error = 'Email or Phone is required';
                              }
                              setFormErrors(prev => ({ ...prev, customerEmail: error }));
                              
                              // Clear phone error if email is being typed and phone was the one showing "required"
                              if (error !== 'Email or Phone is required' && formErrors.customerPhone === 'Email or Phone is required') {
                                setFormErrors(prev => ({ ...prev, customerPhone: '' }));
                              }
                            }}
                            placeholder="john.doe@example.com"
                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                              formErrors.customerEmail ? 'border-red-300 bg-red-50/50' : 'border-gray-300 bg-white'
                            }`}
                          />
                        </div>
                        {formErrors.customerEmail && (
                          <p className="text-red-600 text-xs mt-1.5">
                            {formErrors.customerEmail}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <PhoneInput
                          value={formData.customerPhone}
                          onChange={(val) => {
                            setFormData({ ...formData, customerPhone: val });
                            if (formErrors.customerPhone)
                              setFormErrors({ ...formErrors, customerPhone: '' });
                          }}
                          placeholder="Enter phone number"
                          error={formErrors.customerPhone}
                          prefixIcon={<PhoneIcon className="w-4 h-4 text-gray-400" />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service & Staff Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <div className="p-1.5 bg-purple-100 rounded-lg">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                    </div>
                    Service & Staff
                  </h3>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.serviceId}
                        onChange={(e) => {
                          const newServiceId = Number(e.target.value);
                          handleServiceChange(newServiceId);
                          
                          // If current staff doesn't provide this service, reset staff (unless they are Staff role)
                          if (newServiceId !== 0 && formData.staffId !== 0 && currentUserRole !== 'Staff') {
                            const staff = staffList.find(s => s.id === formData.staffId);
                            if (staff && !staff.serviceIds?.includes(newServiceId)) {
                              setFormData(prev => ({ ...prev, staffId: 0 }));
                            }
                          }

                          if (formErrors.serviceId)
                            setFormErrors({ ...formErrors, serviceId: '' });
                        }}
                        className={`w-full px-3.5 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white ${
                          formErrors.serviceId ? 'border-red-300 bg-red-50/50' : 'border-gray-300'
                        }`}
                      >
                        <option value={0}>Select a service</option>
                        {servicesList
                          .filter(service => {
                            if (formData.staffId === 0) return true;
                            const staff = staffList.find(s => s.id === formData.staffId);
                            return staff?.serviceIds?.includes(service.id);
                          })
                          .map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name} (${service.price} - {service.duration} min)
                          </option>
                        ))}
                      </select>
                      {formErrors.serviceId && (
                        <p className="text-red-600 text-xs mt-1.5">
                          {formErrors.serviceId}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Staff Member <span className="text-red-500">*</span>
                      </label>
                      {currentUserRole === 'Staff' && currentUserId > 0 ? (
                        <div className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-medium select-none cursor-default">
                          {staffList.find(s => s.id === currentUserId)?.name || 'Your Profile'}
                        </div>
                      ) : (
                        <select
                          value={formData.staffId}
                          onChange={(e) => {
                            const newStaffId = Number(e.target.value);
                            setFormData({ ...formData, staffId: newStaffId });
                            
                            // If current service isn't provided by this staff, reset service
                            if (newStaffId !== 0 && formData.serviceId !== 0) {
                              const staff = staffList.find(s => s.id === newStaffId);
                              if (staff && !staff.serviceIds?.includes(formData.serviceId)) {
                                setFormData(prev => ({ ...prev, serviceId: 0, price: '', duration: 30 }));
                              }
                            }

                            if (formErrors.staffId) setFormErrors({ ...formErrors, staffId: '' });
                          }}
                          className={`w-full px-3.5 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white ${
                            formErrors.staffId ? 'border-red-300 bg-red-50/50' : 'border-gray-300'
                          }`}
                        >
                          <option value={0}>Select staff member</option>
                          {staffList
                            .filter(staff => {
                              if (formData.serviceId === 0) return true;
                              return staff.serviceIds?.includes(formData.serviceId);
                            })
                            .map((staff) => (
                            <option key={staff.id} value={staff.id}>
                              {staff.name}
                            </option>
                          ))}
                        </select>
                      )}
                      {formErrors.staffId && (
                        <p className="text-red-600 text-xs mt-1.5">
                          {formErrors.staffId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Date & Time Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    Date & Time
                  </h3>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative" ref={datePickerRef}>
                        <button
                          type="button"
                          onClick={() => setShowDatePicker(!showDatePicker)}
                          className={`w-full px-3.5 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-left flex items-center justify-between bg-white transition-all ${
                            formErrors.date ? 'border-red-300 bg-red-50/50' : 'border-gray-300'
                          }`}
                        >
                          <span className={formData.date ? 'text-gray-900' : 'text-gray-400'}>
                            {formData.date
                              ? (() => {
                                  const [y, m, d] = formData.date.split('-');
                                  return `${m}/${d}/${y}`;
                                })()
                              : 'Select date'}
                          </span>
                          <Calendar className="w-4 h-4 text-gray-400" />
                        </button>

                        {showDatePicker && (
                          <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-3 w-80">
                            <MiniCalendar
                              selectedDate={formData.date ? new Date(formData.date) : new Date()}
                              isUnavailable={isDateUnavailable}
                              onSelectDate={(date) => {
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                const day = String(date.getDate()).padStart(2, '0');
                                setFormData({ ...formData, date: `${year}-${month}-${day}`, time: '' });
                                setShowDatePicker(false);
                                if (formErrors.date) setFormErrors({ ...formErrors, date: '' });
                              }}
                            />
                          </div>
                        )}
                      </div>
                      {formErrors.date && (
                        <p className="text-red-600 text-xs mt-1.5">
                          {formErrors.date}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        {isLoadingSlots ? (
                          <div className="flex items-center gap-2 text-sm text-gray-500 py-2.5">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading slots...
                          </div>
                        ) : (formData.staffId > 0 || (currentUserRole === 'Staff' && currentUserId > 0)) && formData.serviceId > 0 && formData.date ? (
                          availableSlots.length > 0 ? (
                            <div className="relative">
                              <select
                                value={formData.time}
                                onChange={(e) => {
                                  setFormData({ ...formData, time: e.target.value });
                                  if (formErrors.time) setFormErrors({ ...formErrors, time: '' });
                                }}
                                className={`w-full px-3.5 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white appearance-none pr-10 ${
                                  formErrors.time ? 'border-red-300 bg-red-50/50' : 'border-gray-300'
                                }`}
                              >
                                <option value="">Select a time slot</option>
                                {/* In edit mode, include the existing time as an option if not in available slots */}
                                {editMode && formData.time && !availableSlots.some(slot => formatTime(slot.startTime, timezone) === formData.time) && (
                                  <option value={formData.time}>{formData.time} (current)</option>
                                )}
                                {availableSlots.map((slot) => {
                                  const timeStr = formatTime(slot.startTime, timezone);
                                  return (
                                    <option key={slot.startTime} value={timeStr}>
                                      {timeStr}
                                    </option>
                                  );
                                })}
                              </select>
                              <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <Clock className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-amber-600 py-2.5 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              No slots available for this date.
                            </div>
                          )
                        ) : (
                          <div className="text-sm text-gray-400 py-2.5 italic">
                            Select staff, service, and date first.
                          </div>
                        )}
                      </div>
                      {formErrors.time && (
                        <p className="text-red-600 text-xs mt-1.5">
                          {formErrors.time}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        <input
                          type="number"
                          min="1"
                          value={formData.duration}
                          onChange={(e) => {
                            const val = Math.max(1, Number(e.target.value));
                            setFormData({ ...formData, duration: val });
                            if (val >= 1 && formErrors.duration) {
                              setFormErrors({ ...formErrors, duration: '' });
                            }
                          }}
                          className={`w-full pl-10 pr-16 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white transition-all ${
                            formErrors.duration ? 'border-red-300 bg-red-50/50' : 'border-gray-300'
                          }`}
                        />
                        <span className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">min</span>
                      </div>
                      {formErrors.duration && (
                        <p className="text-red-600 text-xs mt-1.5 font-medium flex items-center gap-1">
                          {formErrors.duration}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <DollarSign className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.price}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData({ ...formData, price: val });
                            
                            // Real-time validation
                            let error = '';
                            if (!val.trim()) {
                              error = 'Price is required';
                            } else if (isNaN(Number(val))) {
                              error = 'Price must be a number';
                            } else if (val.length > 10) {
                              error = 'Price must be 10 characters or less';
                            }
                            setFormErrors(prev => ({ ...prev, price: error }));
                          }}
                          placeholder="150.00"
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                            formErrors.price ? 'border-red-300 bg-red-50/50' : 'border-gray-300 bg-white'
                          }`}
                        />
                      </div>
                      {formErrors.price && (
                        <p className="text-red-600 text-xs mt-1.5">
                          {formErrors.price}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Meeting Type Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <div className="p-1.5 bg-green-100 rounded-lg">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    Meeting Type
                  </h3>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: 'Zoom', label: 'Zoom', icon: <Video className="w-5 h-5" />, color: 'indigo' },
                      { value: 'InPerson', label: 'In Person', icon: <MapPin className="w-5 h-5" />, color: 'blue' },
                      { value: 'Phone', label: 'Phone Call', icon: <PhoneIcon className="w-5 h-5" />, color: 'green' },
                    ].map((type) => (
                      <label
                        key={type.value}
                        className={`relative flex flex-col items-center justify-center gap-3 px-4 py-5 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.meetingType === type.value
                            ? `border-${type.color}-600 bg-${type.color}-50/50 shadow-md ring-2 ring-${type.color}-500/20`
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="meetingType"
                          value={type.value}
                          checked={formData.meetingType === type.value}
                          onChange={(e) =>
                            setFormData({ ...formData, meetingType: e.target.value as any })
                          }
                          className="sr-only"
                        />
                        
                        {/* Status indicator dot */}
                        {formData.meetingType === type.value && (
                          <div className={`absolute top-2 right-2 w-2 h-2 bg-${type.color}-600 rounded-full animate-pulse`} />
                        )}

                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                          formData.meetingType === type.value
                            ? `bg-${type.color}-600 text-white shadow-lg transform scale-110`
                            : `bg-${type.color}-100 text-${type.color}-600 group-hover:scale-110`
                        }`}>
                          {type.icon}
                        </div>

                        <div className="text-center">
                          <span className={`block font-bold text-sm ${
                            formData.meetingType === type.value ? `text-${type.color}-900` : 'text-gray-700'
                          }`}>{type.label}</span>
                          
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment & Status Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <div className="p-1.5 bg-emerald-100 rounded-lg">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                    </div>
                    Payment & Appointment Status
                  </h3>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                      </label>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) =>
                          setFormData({ ...formData, paymentMethod: e.target.value as any })
                        }
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white transition-all"
                      >
                        <option value="credit-card">Credit Card</option>
                        <option value="debit-card">Debit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="pay-later">Pay Later</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Appointment Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value as any })
                        }
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white transition-all"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <div className="p-1.5 bg-amber-100 rounded-lg">
                      <FileText className="w-4 h-4 text-amber-600" />
                    </div>
                    Additional Notes
                  </h3>
                </div>
                <div className="p-5">
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Add any special requirements, preferences, or notes about this appointment..."
                    rows={3}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none bg-white transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2">Optional: Add context that will help prepare for the appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-white flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                editMode ? 'Update Appointment' : 'Create Appointment'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
