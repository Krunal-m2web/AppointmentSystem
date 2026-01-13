import { useState, useEffect, useRef } from 'react';
import { X, User, Calendar, DollarSign, Search, MapPin, Briefcase, CreditCard, FileText, Clock, Mail, Phone as PhoneIcon, Video } from 'lucide-react';
import { MiniCalendar } from './MiniCalendar';
import { toast } from 'sonner';

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

  // Recurrence (UI-only)
  isRecurring: boolean;
  recurrenceType: RecurrenceType;
  repeatEndDate: string;
}

interface StaffOption {
  id: number;
  name: string;
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
}: AppointmentFormModalProps) {
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

  // Refs
  const datePickerRef = useRef<HTMLDivElement>(null);
  const repeatDatePickerRef = useRef<HTMLDivElement>(null);

  // ==================== Effects ====================

  // Initialize form with initial data
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
      setSearchClient(initialData.customerName || '');
    }
  }, [initialData]);

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
      staffId: 0,
      date: '',
      time: '',
      duration: 60,
      meetingType: 'InPerson',
      paymentMethod: 'Card',
      status: 'Pending',
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.customerName.trim()) errors.customerName = 'Customer Name is required';
    if (!formData.customerEmail.trim()) {
      errors.customerEmail = 'Email is required';
    } else if (!emailRegex.test(formData.customerEmail)) {
      errors.customerEmail = 'Invalid email format';
    }
    if (!formData.customerPhone.trim()) errors.customerPhone = 'Phone number is required';

    if (formData.serviceId === 0) errors.serviceId = 'Please select a service';
    if (formData.staffId === 0) errors.staffId = 'Please select a staff member';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.time) errors.time = 'Time is required';
    if (!formData.price.trim()) errors.price = 'Price is required';

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
      await onSubmit(formData);
      handleReset();
      onClose();
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast.error(`Failed to save appointment: ${error.message || error}`);
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
                          setSearchClient(e.target.value);
                          setFormData({ ...formData, customerName: e.target.value });
                          setShowClientDropdown(true);
                          if (formErrors.customerName)
                            setFormErrors({ ...formErrors, customerName: '' });
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          value={formData.customerEmail}
                          onChange={(e) => {
                            setFormData({ ...formData, customerEmail: e.target.value });
                            if (formErrors.customerEmail)
                              setFormErrors({ ...formErrors, customerEmail: '' });
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
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <PhoneIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          value={formData.customerPhone}
                          onChange={(e) => {
                            setFormData({ ...formData, customerPhone: e.target.value });
                            if (formErrors.customerPhone)
                              setFormErrors({ ...formErrors, customerPhone: '' });
                          }}
                          placeholder="+1 (555) 123-4567"
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                            formErrors.customerPhone ? 'border-red-300 bg-red-50/50' : 'border-gray-300 bg-white'
                          }`}
                        />
                      </div>
                      {formErrors.customerPhone && (
                        <p className="text-red-600 text-xs mt-1.5">
                          {formErrors.customerPhone}
                        </p>
                      )}
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
                          handleServiceChange(Number(e.target.value));
                          if (formErrors.serviceId)
                            setFormErrors({ ...formErrors, serviceId: '' });
                        }}
                        className={`w-full px-3.5 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white ${
                          formErrors.serviceId ? 'border-red-300 bg-red-50/50' : 'border-gray-300'
                        }`}
                      >
                        <option value={0}>Select a service</option>
                        {servicesList.map((service) => (
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
                      <select
                        value={formData.staffId}
                        onChange={(e) => {
                          setFormData({ ...formData, staffId: Number(e.target.value) });
                          if (formErrors.staffId) setFormErrors({ ...formErrors, staffId: '' });
                        }}
                        className={`w-full px-3.5 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white ${
                          formErrors.staffId ? 'border-red-300 bg-red-50/50' : 'border-gray-300'
                        }`}
                      >
                        <option value={0}>Select staff member</option>
                        {staffList.map((staff) => (
                          <option key={staff.id} value={staff.id}>
                            {staff.name}
                          </option>
                        ))}
                      </select>
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
                              onSelectDate={(date) => {
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                const day = String(date.getDate()).padStart(2, '0');
                                setFormData({ ...formData, date: `${year}-${month}-${day}` });
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
                        <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) => {
                            setFormData({ ...formData, time: e.target.value });
                            if (formErrors.time) setFormErrors({ ...formErrors, time: '' });
                          }}
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                            formErrors.time ? 'border-red-300 bg-red-50/50' : 'border-gray-300 bg-white'
                          }`}
                        />
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
                          value={formData.duration}
                          onChange={(e) =>
                            setFormData({ ...formData, duration: Number(e.target.value) })
                          }
                          min="15"
                          step="15"
                          className="w-full pl-10 pr-16 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white transition-all"
                        />
                        <span className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">min</span>
                      </div>
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
                            setFormData({ ...formData, price: e.target.value });
                            if (formErrors.price) setFormErrors({ ...formErrors, price: '' });
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
