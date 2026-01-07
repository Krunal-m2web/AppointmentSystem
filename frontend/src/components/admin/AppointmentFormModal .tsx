import { useState, useEffect, useRef } from 'react';
import { X, User, Calendar, DollarSign, Search, MapPin } from 'lucide-react';
import { MiniCalendar } from './MiniCalendar';
import { useTimezone } from '../../context/TimezoneContext';
import { combineDateTimeToUTC } from '../../utils/datetime';

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
  const { timezone, refreshTimezone } = useTimezone();

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
    status: 'Pending',
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
      alert(`Failed to save appointment: ${error.message || error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==================== Render ====================

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold">
            {editMode ? 'Edit Appointment' : 'Add New Appointment'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-6">
              {/* Customer Information Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Searchable Client Input */}
                  <div className="md:col-span-2 relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Search or Enter Customer <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
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
                        placeholder="Search existing clients or type new name..."
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          formErrors.customerName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {formErrors.customerName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.customerName}</p>
                    )}
                    {showClientDropdown && filteredClients.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {filteredClients.slice(0, 10).map((client) => (
                          <button
                            key={client.id}
                            type="button"
                            onClick={() => handleClientSelect(client)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                          >
                            <p className="text-sm text-gray-900">{client.name}</p>
                            <p className="text-xs text-gray-600">{client.email}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => {
                        setFormData({ ...formData, customerEmail: e.target.value });
                        if (formErrors.customerEmail)
                          setFormErrors({ ...formErrors, customerEmail: '' });
                      }}
                      placeholder="john@example.com"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        formErrors.customerEmail ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.customerEmail && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.customerEmail}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) => {
                        setFormData({ ...formData, customerPhone: e.target.value });
                        if (formErrors.customerPhone)
                          setFormErrors({ ...formErrors, customerPhone: '' });
                      }}
                      placeholder="+1 234-567-8900"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        formErrors.customerPhone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.customerPhone && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.customerPhone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Service & Staff Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Service & Staff</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.serviceId}
                      onChange={(e) => {
                        handleServiceChange(Number(e.target.value));
                        if (formErrors.serviceId)
                          setFormErrors({ ...formErrors, serviceId: '' });
                      }}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        formErrors.serviceId ? 'border-red-500' : 'border-gray-300'
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
                      <p className="text-red-500 text-xs mt-1">{formErrors.serviceId}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Staff Member <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.staffId}
                      onChange={(e) => {
                        setFormData({ ...formData, staffId: Number(e.target.value) });
                        if (formErrors.staffId) setFormErrors({ ...formErrors, staffId: '' });
                      }}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        formErrors.staffId ? 'border-red-500' : 'border-gray-300'
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
                      <p className="text-red-500 text-xs mt-1">{formErrors.staffId}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Date & Time Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Date & Time
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative" ref={datePickerRef}>
                      <button
                        type="button"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left flex items-center justify-between bg-white ${
                          formErrors.date ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <span className={formData.date ? 'text-gray-900' : 'text-gray-500'}>
                          {formData.date
                            ? (() => {
                                const [y, m, d] = formData.date.split('-');
                                return `${m}/${d}/${y}`;
                              })()
                            : 'mm/dd/yyyy'}
                        </span>
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </button>

                      {showDatePicker && (
                        <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-3 w-72">
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
                      <p className="text-red-500 text-xs mt-1">{formErrors.date}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => {
                        setFormData({ ...formData, time: e.target.value });
                        if (formErrors.time) setFormErrors({ ...formErrors, time: '' });
                      }}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        formErrors.time ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.time && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.time}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: Number(e.target.value) })
                      }
                      min="15"
                      step="15"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.price}
                        onChange={(e) => {
                          setFormData({ ...formData, price: e.target.value });
                          if (formErrors.price) setFormErrors({ ...formErrors, price: '' });
                        }}
                        placeholder="150.00"
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          formErrors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {formErrors.price && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Meeting Type Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  Meeting Type
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: 'Zoom', label: 'Zoom', icon: '📹' },
                    { value: 'InPerson', label: 'In Person', icon: '🏢' },
                    { value: 'Phone', label: 'Phone Call', icon: '📞' },
                  ].map((type) => (
                    <label
                      key={type.value}
                      className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.meetingType === type.value
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:border-gray-400'
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
                      <span className="text-xl">{type.icon}</span>
                      <span className="font-medium">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment & Status Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Payment & Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) =>
                        setFormData({ ...formData, paymentMethod: e.target.value as any })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="credit-card">Credit Card</option>
                      <option value="debit-card">Debit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="pay-later">Pay Later</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as any })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description / Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any additional notes or requirements..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : editMode ? 'Update Appointment' : 'Save Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}