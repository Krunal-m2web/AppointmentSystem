import { useState, useEffect } from 'react';
import { Search, Calendar, Clock, MapPin, X, Filter, Plus, Edit2, Save, XCircle, ChevronDown, Phone, Mail, User, Loader2, Globe } from 'lucide-react';
import { useTimezone } from '../../context/TimezoneContext';
import { formatDate, formatTime, formatDateTime, combineDateTimeToUTC, getTimezoneOffset, getDateString, getTimeString } from '../../utils/datetime';
import type { Appointment } from '../../types/types';
import { getAppointments, AppointmentResponse } from '../../services/appointmentApi';
import { fetchServices } from '../../services/serviceApi';
import { fetchStaff } from '../../services/staffApi';
import { getToken } from '../../utils/auth';

type SortField = 'id' | 'date' | 'staff' | 'customer';
type SortOrder = 'asc' | 'desc';

// Types for staff and services dropdowns
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

export function AppointmentsPage() {
  const { timezone, refreshTimezone } = useTimezone();
    // Get timezone display info
  const timezoneDisplay = timezone.split('/').pop()?.replace('_', ' ');
  const timezoneOffset = getTimezoneOffset(timezone);
  const [editingAppointmentId, setEditingAppointmentId] = useState<number | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Confirmed' | 'Pending' | 'Cancelled'>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Appointment | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStaffFilter, setShowStaffFilter] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<number[]>([]);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  // API state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [staffList, setStaffList] = useState<StaffOption[]>([]);
  const [servicesList, setServicesList] = useState<ServiceOption[]>([]);
  const [timezoneReady, setTimezoneReady] = useState(false);

  // Fetch appointments on mount
  useEffect(() => {
    const loadData = async () => {
      // Wait for timezone to be fetched FIRST before loading appointments
      const fetchedTimezone = await refreshTimezone();
      console.log('AppointmentsPage: Timezone fetched:', fetchedTimezone);
      setTimezoneReady(true); // Mark timezone as ready
      try {
        setIsLoading(true);
        setError(null);
        
        // Get token from auth utility
        const token = getToken();
        if (!token) {
          setError('Authentication required. Please log in.');
          setIsLoading(false);
          return;
        }

        // Fetch appointments
        const response = await getAppointments({}, token);
        
        // Map API response to Appointment type
        const mappedAppointments: Appointment[] = response.appointments.map((apt: AppointmentResponse) => ({
          id: apt.id,
          companyId: apt.companyId,
          customerId: apt.customerId,
          customerName: apt.customerName,
          customerEmail: apt.customerEmail,
          customerPhone: apt.customerPhone,
          staffId: apt.staffId,
          staffName: apt.staffName || 'Unassigned',
          serviceId: apt.serviceId,
          serviceName: apt.serviceName,
          startDateTime: apt.startDateTime,
          endDateTime: apt.endDateTime,
          meetingType: apt.meetingType,
          status: apt.status,
          price: apt.price,
          currencyCode: apt.currencyCode,
          paymentMethod: apt.paymentMethod,
          paymentStatus: apt.paymentStatus,
          createdAt: apt.createdAt,
        }));
        
        setAppointments(mappedAppointments);
        
        // Also fetch staff and services for the add/edit modal
        try {
          const staffData = await fetchStaff();
          setStaffList(staffData.map((s: any) => ({ 
            id: s.id, 
            name: `${s.firstName} ${s.lastName}` 
          })));
        } catch (e) {
          console.error('Failed to load staff:', e);
        }
        
        try {
          const servicesData = await fetchServices();
          setServicesList(servicesData.map((s: any) => ({
            id: s.id,
            name: s.name,
            price: s.price,
            duration: s.serviceDuration || 60
          })));
        } catch (e) {
          console.error('Failed to load services:', e);
        }
        
      } catch (err) {
        console.error('Error loading appointments:', err);
        setError(err instanceof Error ? err.message : 'Failed to load appointments');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [refreshTimezone]);


  type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly';

  interface NewAppointment {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    serviceId: number;
    staffId: number;
    date: string;
    time: string;
    duration: number;
    meetingType: 'InPerson' | 'Phone' | 'Zoom';
    paymentMethod: 'Card' | 'Cash' | 'PayPal';
    status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
    notes: string;

    // 🔁 Recurrence (UI-only)
    isRecurring: boolean;
    recurrenceType: RecurrenceType;
    repeatEndDate: string;
  }

  const [newAppointment, setNewAppointment] = useState<NewAppointment>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceId: 0,
    staffId: 0,
    date: '',
    time: '',
    duration: 60,
    meetingType: 'Zoom',
    paymentMethod: 'Card',
    status: 'Pending',
    notes: '',

    isRecurring: false,
    recurrenceType: 'none',
    repeatEndDate: '',
  });



  const filteredAppointments = appointments
    .filter((apt) => {
      const matchesSearch =
        apt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.serviceName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = filterStatus === 'all' || apt.status === filterStatus;
      const matchesStaff = selectedStaff.length === 0 || (apt.staffId && selectedStaff.includes(apt.staffId));

      return matchesSearch && matchesFilter && matchesStaff;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'id':
          comparison = a.id - b.id;
          break;
        case 'date':
          comparison = new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
          break;
        case 'staff':
          comparison = a.staffName.localeCompare(b.staffName);
          break;
        case 'customer':
          comparison = a.customerName.localeCompare(b.customerName);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };



  const handleSave = () => {
    if (editedData) {
      setAppointments(appointments.map((apt) => (apt.id === editedData.id ? editedData : apt)));
      setEditingId(null);
      setEditedData(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedData(null);
  };

  const handleCancelAppointment = (id: number) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(
        appointments.map((apt) => (apt.id === id ? { ...apt, status: 'Cancelled' as const } : apt))
      );
      setSelectedAppointment(null);
    }
  };

  const toggleStaff = (staffId: number) => {
    setSelectedStaff((prev) =>
      prev.includes(staffId) ? prev.filter((id) => id !== staffId) : [...prev, staffId]
    );
  };

  const handleServiceChange = (serviceId: number) => {
    const service = servicesList.find(s => s.id === serviceId);
    if (service) {
      setNewAppointment({
        ...newAppointment,
        serviceId,
        duration: service.duration,
      });
    }
  };

  const resetNewAppointmentForm = () => {
    setNewAppointment({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      serviceId: 0,
      staffId: 0,
      date: '',
      time: '',
      duration: 60,
      meetingType: 'Zoom',
      paymentMethod: 'Card',
      status: 'Pending',
      notes: '',

      isRecurring: false,
      recurrenceType: 'none',
      repeatEndDate: '',
    });
  };


  const addDays = (date: Date, days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const addMonths = (date: Date, months: number) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  };

  const handleSaveAppointment = () => {
    // Validation
    if (
      !newAppointment.customerName ||
      !newAppointment.customerEmail ||
      !newAppointment.serviceId ||
      !newAppointment.staffId ||
      !newAppointment.date ||
      !newAppointment.time
    ) {
      alert('Please fill in all required fields');
      return;
    }

    if (newAppointment.isRecurring) {
      if (!newAppointment.recurrenceType || newAppointment.recurrenceType === 'none') {
        alert('Please select repeat frequency (daily, weekly, monthly).');
        return;
      }
      if (!newAppointment.repeatEndDate) {
        alert('Please select "Repeat Until" date.');
        return;
      }
    }

    const service = servicesList.find(s => s.id === newAppointment.serviceId);
    const staff = staffList.find(s => s.id === newAppointment.staffId);

    if (!service || !staff) {
      alert('Invalid service or staff selection');
      return;
    }

    // EDIT MODE - Update existing appointment
    if (editingAppointmentId !== null) {
      const existing = appointments.find(a => a.id === editingAppointmentId);
      if (!existing) {
        alert('Appointment not found');
        return;
      }

      const dateTime = combineDateTimeToUTC(
        newAppointment.date,
        newAppointment.time,
        timezone
      );

      const updatedAppointment: Appointment = {
        ...existing,
        customerName: newAppointment.customerName,
        customerEmail: newAppointment.customerEmail,
        customerPhone: newAppointment.customerPhone,
        staffId: newAppointment.staffId,
        staffName: staff.name,
        serviceId: newAppointment.serviceId,
        serviceName: service.name,
        startDateTime: dateTime,
        endDateTime: dateTime, // Will be computed by service duration
        meetingType: newAppointment.meetingType,
        status: newAppointment.status,
        paymentMethod: newAppointment.paymentMethod,
        price: service.price,
        updatedAt: new Date().toISOString(),
      };

      setAppointments(prev =>
        prev.map(a => (a.id === editingAppointmentId ? updatedAppointment : a))
      );

      setShowAddModal(false);
      setEditingAppointmentId(null);
      resetNewAppointmentForm();
      return;
    }

    // ADD MODE - Create new appointment(s)
    const currentMaxId = appointments.length > 0
      ? Math.max(...appointments.map(a => a.id))
      : 0;

    const [y, m, d_part] = newAppointment.date.split('-').map(Number);
    const baseDate = new Date(Date.UTC(y, m - 1, d_part));
    const newAppointments: Appointment[] = [];

    // Helper to push one appointment for a given date
    const pushAppointmentForDate = (occurrenceDate: Date, indexOffset: number) => {
      const datePart = occurrenceDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
      const dateTime = combineDateTimeToUTC(
        datePart,
        newAppointment.time,
        timezone
      );
      const newId = currentMaxId + 1 + indexOffset;

      const appointmentToAdd: Appointment = {
        id: newId,
        customerId: newId, // mock for now
        customerName: newAppointment.customerName,
        customerEmail: newAppointment.customerEmail,
        customerPhone: newAppointment.customerPhone,
        staffId: newAppointment.staffId,
        staffName: staff.name,
        serviceId: newAppointment.serviceId,
        serviceName: service.name,
        startDateTime: dateTime,
        endDateTime: dateTime, // Will be computed by service duration
        meetingType: newAppointment.meetingType,
        status: newAppointment.status,
        price: service.price,
        currencyCode: 'USD',
        paymentMethod: newAppointment.paymentMethod,
        paymentStatus: 'Unpaid' as const,
        createdAt: new Date().toISOString(),
      };

      newAppointments.push(appointmentToAdd);
    };

    if (!newAppointment.isRecurring) {
      // Just one appointment
      pushAppointmentForDate(baseDate, 0);
    } else {
      // Repeat until end date
      const endDate = new Date(`${newAppointment.repeatEndDate}T23:59:59`);

      let occurrenceDate = baseDate;
      let occurrenceIndex = 0;

      // Safety guard to avoid infinite loops
      const MAX_OCCURRENCES = 200;

      while (occurrenceDate <= endDate && occurrenceIndex < MAX_OCCURRENCES) {
        pushAppointmentForDate(occurrenceDate, occurrenceIndex);

        // Move to next occurrence
        switch (newAppointment.recurrenceType) {
          case 'daily':
            occurrenceDate = addDays(occurrenceDate, 1);
            break;
          case 'weekly':
            occurrenceDate = addDays(occurrenceDate, 7);
            break;
          case 'monthly':
            occurrenceDate = addMonths(occurrenceDate, 1);
            break;
          default:
            // Fallback: stop loop
            occurrenceDate = addDays(endDate, 1);
            break;
        }

        occurrenceIndex++;
      }
    }

    setAppointments([...appointments, ...newAppointments]);
    setShowAddModal(false);
    resetNewAppointmentForm();
  };

  // Edit appointment
  const openEditModal = (appointment: Appointment) => {
    const dt = new Date(appointment.startDateTime);
    const date = getDateString(dt, timezone);
    const time = getTimeString(dt, timezone);

    setNewAppointment({
      customerName: appointment.customerName,
      customerEmail: appointment.customerEmail,
      customerPhone: appointment.customerPhone,
      serviceId: appointment.serviceId,
      staffId: appointment.staffId || 0,
      date,
      time,
      duration: appointment.duration || 60,
      meetingType: appointment.meetingType,
      paymentMethod: appointment.paymentMethod,
      status: appointment.status,
      notes: '',

      // recurrence fields – for now, when editing we treat as single appointment
      isRecurring: false,
      recurrenceType: 'none',
      repeatEndDate: '',
    });

    setEditingAppointmentId(appointment.id);
    setShowAddModal(true);
  };



  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  // Show loading state - wait for timezone AND appointments to load
  if (isLoading || !timezoneReady) {
    return (
      <div className="p-4 md:p-8 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-4" />
        <p className="text-gray-600">{!timezoneReady ? 'Loading timezone settings...' : 'Loading appointments...'}</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 font-medium mb-2">Error Loading Appointments</p>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Appointments</h1>
          <p className="text-gray-600 mt-1">View and manage all appointments</p>
          {/* Timezone Indicator */}
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <Globe className="w-4 h-4" />
            <span>Times shown in {timezoneDisplay} ({timezoneOffset})</span>
            <span className="text-xs bg-gray-100 px-1 rounded">Debug: {timezone}</span>
          </div>
        </div>

      </div>

      {/* Filters and Search */}
      <div className='flex justify-between'></div>
      <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-2 ">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${filterStatus === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('Confirmed')}
              className={`px-4 py-2 rounded-lg transition-colors ${filterStatus === 'Confirmed'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setFilterStatus('Pending')}
              className={`px-4 py-2 rounded-lg transition-colors ${filterStatus === 'Pending'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Pending
            </button>

            {/* Staff Filter */}
            <div className="relative">
              <button
                onClick={() => setShowStaffFilter(!showStaffFilter)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Staff {selectedStaff.length > 0 && `(${selectedStaff.length})`}
                <ChevronDown className="w-4 h-4" />
              </button>
              {showStaffFilter && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <div className="p-3 space-y-2">
                    {staffList.map((staff: StaffOption) => (
                      <label
                        key={staff.id}
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStaff.includes(staff.id)}
                          onChange={() => toggleStaff(staff.id)}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                        />
                        <span className="text-sm">{staff.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

              )}

            </div>
            <button style={{ width: "fit-content" }}
              onClick={() => setShowAddModal(true)}
              className="flex  items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors w-full sm:w-auto justify-center"
            >
              <Plus className="w-5 h-5" />
              New Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  onClick={() => handleSort('id')}
                  className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                >
                  ID <SortIcon field="id" />
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-600">Client</th>
                <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-600">Service</th>
                <th
                  onClick={() => handleSort('staff')}
                  className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                >
                  Staff <SortIcon field="staff" />
                </th>
                <th
                  onClick={() => handleSort('date')}
                  className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                >
                  Date & Time <SortIcon field="date" />
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => {
                const isEditing = editingId === appointment.id;
                const data = isEditing && editedData ? editedData : appointment;

                return (
                  <tr key={appointment.id} className={`hover:bg-gray-50 transition-colors ${isEditing ? 'bg-blue-50' : ''}`}>
                    <td className="px-4 md:px-6 py-4">
                      <p className="font-medium">#{data.id}</p>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={data.customerName}
                          onChange={(e) => setEditedData({ ...data, customerName: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <div>
                          <p className="font-medium">{data.customerName}</p>
                          <p className="text-sm text-gray-600">{data.customerEmail}</p>
                          <p className="text-sm text-gray-600">{data.customerPhone}</p>
                        </div>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <p>{data.serviceName}</p>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <p>{data.staffName}</p>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-start gap-2 text-sm">
                        <div>
                          <p className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {/* Debug: Log timezone and raw datetime */}
                            {(() => { console.log(`Formatting apt #${appointment.id}: raw=${appointment.startDateTime}, tz=${timezone}, formatted=${formatTime(appointment.startDateTime, timezone)}`); return null; })()}
                            {formatDate(appointment.startDateTime, timezone)}
                          </p>
                          <p className="flex items-center gap-1 text-gray-600">
                            <Clock className="w-4 h-4" />
                            {formatTime(appointment.startDateTime, timezone)} ({appointment.duration || 60} min)
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${data.status === 'Confirmed'
                          ? 'bg-green-100 text-green-700'
                          : data.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {data.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Save"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(appointment)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedAppointment(appointment)}
                            className="text-indigo-600 hover:text-indigo-700 text-sm"
                          >
                            View
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl md:text-2xl font-bold">Appointment Details</h2>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Customer Name
                  </label>
                  <p className="mt-1 font-medium">{selectedAppointment.customerName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <p className="mt-1 font-medium">{selectedAppointment.customerEmail}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </label>
                  <p className="mt-1 font-medium">{selectedAppointment.customerPhone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Service</label>
                  <p className="mt-1 font-medium">{selectedAppointment.serviceName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Staff</label>
                  <p className="mt-1 font-medium">{selectedAppointment.staffName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Status</label>
                  <p className="mt-1">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${selectedAppointment.status === 'Confirmed'
                        ? 'bg-green-100 text-green-700'
                        : selectedAppointment.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {selectedAppointment.status}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Date & Time
                  </label>
                  <p className="mt-1 font-medium">
                     {formatDate(selectedAppointment.startDateTime, timezone)} at {formatTime(selectedAppointment.startDateTime, timezone)}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Duration</label>
                  <p className="mt-1 font-medium">{selectedAppointment.duration || 60} minutes</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Meeting Type
                  </label>
                  <p className="mt-1 font-medium capitalize">{selectedAppointment.meetingType.replace('-', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Price</label>
                  <p className="mt-1 font-medium">
                    ${selectedAppointment.price} {selectedAppointment.currencyCode}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Payment Method</label>
                  <p className="mt-1 font-medium capitalize">{selectedAppointment.paymentMethod.replace('-', ' ')}</p>
                </div>
              </div>


            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleCancelAppointment(selectedAppointment.id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl 
                  max-h-[90vh] flex flex-col overflow-hidden">

            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className=" text-xl md:text-2xl font-bold">{editingAppointmentId ? 'Edit Appointment' : 'Add New Appointment'}</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-6">
                {/* Customer Information Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-600" />
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Customer Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newAppointment.customerName}
                        onChange={(e) => setNewAppointment({ ...newAppointment, customerName: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={newAppointment.customerEmail}
                        onChange={(e) => setNewAppointment({ ...newAppointment, customerEmail: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={newAppointment.customerPhone}
                        onChange={(e) => setNewAppointment({ ...newAppointment, customerPhone: e.target.value })}
                        placeholder="+1 234-567-8900"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
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
                        value={newAppointment.serviceId}
                        onChange={(e) => handleServiceChange(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value={0}>Select a service</option>
                        {servicesList.map((service: ServiceOption) => (
                          <option key={service.id} value={service.id}>
                            {service.name} (${service.price} - {service.duration} min)
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Staff Member <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={newAppointment.staffId}
                        onChange={(e) => setNewAppointment({ ...newAppointment, staffId: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value={0}>Select staff member</option>
                        {staffList.map((staff: StaffOption) => (
                          <option key={staff.id} value={staff.id}>
                            {staff.name}
                          </option>
                        ))}
                      </select>
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
                      <input
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        value={newAppointment.duration}
                        onChange={(e) => setNewAppointment({ ...newAppointment, duration: Number(e.target.value) })}
                        min="15"
                        step="15"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>


                {/* Repeat / Recurring Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    🔁 Repeat Appointment
                  </h3>

                  {/* Toggle Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setNewAppointment((prev) => ({
                        ...prev,
                        isRecurring: !prev.isRecurring,
                        repeatEndDate: '', // reset end date when toggling
                      }))
                    }
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all
      ${newAppointment.isRecurring
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {newAppointment.isRecurring ? '✅ Repeating Enabled' : 'Repeat this appointment'}
                  </button>

                  {/* Options when recurring is enabled */}
                  {newAppointment.isRecurring && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">

                      {/* Frequency */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Repeat Frequency
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {['daily', 'weekly', 'monthly'].map((freq) => (
                            <button
                              key={freq}
                              type="button"
                              onClick={() =>
                                setNewAppointment((prev) => ({
                                  ...prev,
                                  recurrenceType: freq as any,
                                }))
                              }
                              className={`px-3 py-1 rounded-lg border text-sm capitalize
                ${newAppointment.recurrenceType === freq
                                  ? 'border-indigo-600 bg-indigo-100 text-indigo-700'
                                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                              {freq}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* End Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Repeat Until
                        </label>
                        <input
                          type="date"
                          value={newAppointment.repeatEndDate}
                          onChange={(e) =>
                            setNewAppointment((prev) => ({
                              ...prev,
                              repeatEndDate: e.target.value,
                            }))
                          }
                          min={newAppointment.date || new Date().toISOString().split('T')[0]}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Appointment will repeat {newAppointment.recurrenceType} until this date.
                        </p>
                      </div>

                    </div>
                  )}
                </div>



                {/* Meeting Type Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                    Meeting Type
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: 'zoom', label: 'Zoom', icon: '📹' },
                      { value: 'in-person', label: 'In Person', icon: '🏢' },
                      { value: 'phone', label: 'Phone Call', icon: '📞' },
                    ].map((type) => (
                      <label
                        key={type.value}
                        className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${newAppointment.meetingType === type.value
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:border-gray-400'
                          }`}
                      >
                        <input
                          type="radio"
                          name="meetingType"
                          value={type.value}
                          checked={newAppointment.meetingType === type.value}
                          onChange={(e) => setNewAppointment({ ...newAppointment, meetingType: e.target.value as any })}
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
                        value={newAppointment.paymentMethod}
                        onChange={(e) => setNewAppointment({ ...newAppointment, paymentMethod: e.target.value as any })}
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
                        value={newAppointment.status}
                        onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
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
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                    placeholder="Add any additional notes or requirements..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingAppointmentId(null);
                  resetNewAppointmentForm();
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAppointment}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                {editingAppointmentId ? 'Update Appointment' : 'Save Appointment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
