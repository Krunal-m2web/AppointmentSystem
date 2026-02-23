import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, User, DollarSign, Search, RefreshCw, Filter, Edit, Trash2, Mail, Phone, Calendar as CalendarIcon, Link as LinkIcon, AlertCircle, ChevronDown, MapPin, XCircle, Clock, Loader2 } from 'lucide-react';
import { fetchServices } from '../../services/serviceApi';
import { fetchStaff } from '../../services/staffApi';
import { fetchCustomers, CustomerResponse } from '../../services/customerApi';
import { getAppointments, createAppointment, deleteAppointment, updateAppointment } from '../../services/appointmentApi';
import { Staff, Service } from '../../types/types';
import { getToken, getCompanyIdFromToken, getRoleFromToken, getUserIdFromToken } from '../../utils/auth';
import { combineDateTimeToUTC, formatTime, getDateString, formatDuration } from '../../utils/datetime';
import { useTimezone } from '../../context/TimezoneContext';
import { MiniCalendar } from './MiniCalendar';
import { AppointmentFormModal, NewAppointment } from './AppointmentFormModal';
import { toast } from 'sonner';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { googleCalendarApi } from '../../services/googleCalendarApi';

const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
];

const DURATIONS = ['30 min', '60 min', '90 min', '120 min'];

const LOCATIONS = ['In Person', 'Phone Call', 'Zoom'];
type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly';

type ViewMode = 'month' | 'week' | 'day' | 'list';

interface CalendarAppointment {
  id: number;
  date: string;
  time: string;
  client: string;
  clientEmail?: string;
  clientPhone?: string;
  service: string;
  serviceId: number;
  staff: string;
  staffId: number;
  duration: string;
  location: string;
  price: string;
  status: string;
  startDateTime: string; 
}

interface CalendarStaff extends Staff {
  name: string;
  color: string;
}

export function CalendarPage() {
  const { timezone, refreshTimezone } = useTimezone();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string>('all');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [cancelAppointmentId, setCancelAppointmentId] = useState<number | null>(null);
  
  // Real Data State
  const [appointments, setAppointments] = useState<CalendarAppointment[]>([]);
  const [staffList, setStaffList] = useState<CalendarStaff[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [customers, setCustomers] = useState<CustomerResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [timezoneReady, setTimezoneReady] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Auth State
  const token = getToken();
  const currentUserRole = token ? getRoleFromToken(token) : null;
  const currentUserId = token ? getUserIdFromToken(token) : null;

  // Appointment Detail Modal State
  const [selectedAppointment, setSelectedAppointment] = useState<CalendarAppointment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Form State
  const [searchClient, setSearchClient] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRepeatDatePicker, setShowRepeatDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const repeatDatePickerRef = useRef<HTMLDivElement>(null);

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
  
  const [newAppointment, setNewAppointment] = useState<NewAppointment>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceId: 0,
    staffId: 0,
    date: '',
    time: '',
    duration: 60,
    meetingType: 'InPerson',
    paymentMethod: 'credit-card',
    status: 'Confirmed',
    notes: '',
    price: '',
    isRecurring: false,
    recurrenceType: 'none',
    repeatEndDate: '',
  });

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

  const getStaffColor = (index: number) => {
    const colors = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    return colors[index % colors.length];
  };

  useEffect(() => {
    const initTimezone = async () => {
      try {
        await refreshTimezone();
        console.log('CalendarPage: Timezone initialized:', timezone);
      } catch (err) {
        console.error('CalendarPage: Failed to fetch timezone:', err);
      }
      setTimezoneReady(true);
    };
    initTimezone();
  }, []);

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const token = getToken();
        const role = token ? getRoleFromToken(token) : undefined;
        const userId = token ? getUserIdFromToken(token) : undefined;

        const [staffDataRaw, servicesRaw, customersData] = await Promise.all([
          fetchStaff().catch(() => []),
          fetchServices().catch(() => []),
          fetchCustomers({ pageSize: 1000 }).catch(() => [])
        ]);

        let staffData = staffDataRaw;
        if (role === 'Staff' && userId) {
            staffData = staffDataRaw.filter((s: any) => s.id === userId);
            setSelectedStaff(userId);
        }

        const servicesData = Array.isArray(servicesRaw) ? servicesRaw : (servicesRaw.items || []);

        const mappedStaff: CalendarStaff[] = staffData
          .filter((s:any) => s.isActive)
          .map((s:any, index:number) => ({
            ...s,
            name: `${s.firstName} ${s.lastName}`,
            color: s.avatar ? '#4f46e5' : getStaffColor(index),
            serviceIds: s.services?.map((svc: any) => svc.serviceId) || []
        }));

        setStaffList(mappedStaff);
        setServices(servicesData);
        const customersList = 'customers' in customersData ? customersData.customers : [];
        setCustomers(customersList);
      } catch (error) {
        console.error("Failed to load calendar metadata:", error);
      }
    };
    loadMetadata();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) return;

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const startDate = new Date(year, month - 1, 1).toISOString();
      const endDate = new Date(year, month + 2, 0).toISOString();

      const data = await getAppointments({
        startDate: startDate,
        endDate: endDate,
        staffId: selectedStaff || undefined,
        serviceId: selectedService !== 'all' ? parseInt(selectedService) : undefined,
        pageSize: 1000,
        sortBy: 'date',
        sortDirection: 'asc'
      }, token);

      const mapped: CalendarAppointment[] = data.appointments.map(apt => {
         const startDateTime = apt.startDateTime;
         const dateStr = getDateString(new Date(startDateTime), timezone);
         const timeStr = formatTime(startDateTime, timezone);
         
         const start = new Date(apt.startDateTime);
         const end = new Date(apt.endDateTime);
         const diffMin = Math.round((end.getTime() - start.getTime()) / 60000);

         return {
           id: apt.id,
           date: dateStr,
           time: timeStr,
           client: apt.customerName,
           clientEmail: apt.customerEmail,
           clientPhone: apt.customerPhone,
           service: apt.serviceName,
           serviceId: apt.serviceId,
           staff: apt.staffName || 'Unassigned',
           staffId: apt.staffId || 0,
           duration: `${diffMin} min`,
           location: apt.meetingType,
           price: `$${apt.price}`,
           status: apt.status.toLowerCase(),
           startDateTime: apt.startDateTime
         };
      });

      mapped.sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());

      setAppointments(mapped);
    } catch (error) {
      console.error("Failed to load appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!timezoneReady) return;
    loadAppointments();
  }, [currentDate, selectedStaff, selectedService, timezone, timezoneReady]);

  const getFilteredAppointments = () => {
    let filtered = appointments;
    if (selectedStaff) {
        filtered = filtered.filter(a => a.staffId === selectedStaff);
    }
    return filtered;
  };

  const getAppointmentsForDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    return getFilteredAppointments().filter(apt => apt.date === dateStr);
  };

  const getWeekDays = (date: Date) => {
    const week = [];
    const curr = new Date(date);
    const first = curr.getDate() - curr.getDay();
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(curr);
      day.setDate(first + i);
      week.push(day);
    }
    return week;
  };

  const previousPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else if (viewMode === 'week' || viewMode === 'list') {
      newDate.setDate(currentDate.getDate() - 7);
    } else if (viewMode === 'day') {
      newDate.setDate(currentDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const nextPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(currentDate.getMonth() + 1);
    } else if (viewMode === 'week' || viewMode === 'list') {
      newDate.setDate(currentDate.getDate() + 7);
    } else if (viewMode === 'day') {
      newDate.setDate(currentDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const getPeriodLabel = () => {
    const weekDays = getWeekDays(currentDate);
    
    if (viewMode === 'month') {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else if (viewMode === 'week') {
      const weekStart = weekDays[0];
      const weekEnd = weekDays[6];
      return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else if (viewMode === 'day') {
      const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
      const dd = String(currentDate.getDate()).padStart(2, '0');
      const yyyy = currentDate.getFullYear();
      return `${mm}/${dd}/${yyyy}`;
    } else if (viewMode === 'list') {
      const weekDays = getWeekDays(currentDate);
      const startDate = weekDays[0];
      const endDate = weekDays[6];
      const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
      const startDay = startDate.getDate();
      const endDay = endDate.getDate();
      const year = endDate.getFullYear();
      return `${startMonth} ${startDay} – ${endDay}, ${year}`;
    }
    return '';
  };

  const handleServiceChange = (serviceId: number) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setNewAppointment({
        ...newAppointment,
        serviceId,
        duration: service.serviceDuration || 60,
      });
    }
  };

  const handleCloseForm = () => {
    setShowBookingForm(false);
    setNewAppointment({
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
    setSearchClient('');
    setShowClientDropdown(false);
  };

  const handleClientSelect = (client: CustomerResponse) => {
    setNewAppointment({
      ...newAppointment,
      customerName: client.name,
      customerEmail: client.email,
      customerPhone: client.phone || '',
    });
    setSearchClient(client.name);
    setShowClientDropdown(false);
  };

  const filteredClients = customers.filter(client =>
    client.name.toLowerCase().includes(searchClient.toLowerCase()) ||
    client.email.toLowerCase().includes(searchClient.toLowerCase())
  );

  const handleSubmitAppointment = async (formData: NewAppointment) => {
    try {
       let activeTimezone = timezone;
       try {
           const freshTz = await refreshTimezone();
           if (freshTz && freshTz !== "UTC") {
               activeTimezone = freshTz;
           }
       } catch (e) {
           console.warn("Could not refresh timezone before saving, using current:", timezone);
       }

       const companyId = getCompanyIdFromToken(getToken() || "");

       const nameParts = formData.customerName.trim().split(' ');
       const firstName = nameParts[0] || 'Customer';
       const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Unknown';

       let apiPaymentMethod: "Card" | "Cash" | "PayPal" = "Card";
       if (formData.paymentMethod === 'Cash') apiPaymentMethod = 'Cash';
       else if (formData.paymentMethod === 'paypal' || formData.paymentMethod === 'PayPal') apiPaymentMethod = 'PayPal';

       const basePayload = {
           companyId: companyId || 0,
           firstName: firstName,
           lastName: lastName,
           email: formData.customerEmail,
           phone: formData.customerPhone,
           serviceId: formData.serviceId,
           staffId: formData.staffId === 0 ? null : formData.staffId,
           meetingType: formData.meetingType,
           paymentMethod: apiPaymentMethod,
           notes: formData.notes,
       };

       const appointmentDates: string[] = [];
       const baseDateStr = formData.date;
       
       if (!formData.isRecurring) {
           appointmentDates.push(baseDateStr);
       } else {
           if (!formData.repeatEndDate) throw new Error("End date required for recurring appointment");
           
           const [baseY, baseM, baseD] = baseDateStr.split('-').map(Number);
           let curr = new Date(Date.UTC(baseY, baseM - 1, baseD));
           const endDate = new Date(formData.repeatEndDate + 'T23:59:59');
           let count = 0;
           
           while(curr <= endDate && count < 50) {
               const dateStr = curr.toISOString().split('T')[0];
               appointmentDates.push(dateStr);
               
               if (formData.recurrenceType === 'daily') curr = addDays(curr, 1);
               else if (formData.recurrenceType === 'weekly') curr = addDays(curr, 7);
               else if (formData.recurrenceType === 'monthly') curr = addMonths(curr, 1);
               else break;
               
               count++;
           }
       }

       if (formData.id) {
            const startTimeUtc = combineDateTimeToUTC(
                baseDateStr,
                formData.time,
                timezone 
            );
            await updateAppointment(formData.id, {
                ...basePayload,
                startTime: startTimeUtc,
                status: formData.status as any
            }, getToken() || "");
            
            toast.success("Appointment updated successfully!");
       } else {
            for (const datePart of appointmentDates) {
                const startTimeUtc = combineDateTimeToUTC(
                    datePart,
                    formData.time,
                    timezone 
                );
                
                await createAppointment({
                    ...basePayload,
                    startTime: startTimeUtc,
                });
            }
            toast.success("Appointment(s) created successfully!");
       }
       
       if (appointmentDates.length > 0) {
           const [y, m, d] = appointmentDates[0].split('-').map(Number);
           const firstDate = new Date(y, m - 1, d);
           setCurrentDate(firstDate);
           setSelectedDate(firstDate);
           
           const currentY = currentDate.getFullYear();
           const currentM = currentDate.getMonth() + 1;
           if (y === currentY && m === currentM) {
                loadAppointments();
           }
       }
       handleCloseForm();

    } catch (error: any) {
        console.error(error);
        toast.error(`Failed to save appointment: ${error.message || error}`);
    }
  };

  // Appointment click handler - opens detail modal
  const handleSync = async () => {
    try {
      setSyncing(true);
      await googleCalendarApi.sync();
      toast.success('Calendar synced successfully!');
      // Refresh appointments to show new external events
      await loadAppointments();
    } catch (error) {
      console.error('Error syncing:', error);
      toast.error('Failed to sync calendar');
    } finally {
      setSyncing(false);
    }
  };

  /**
   * Triggers a background sync with Google Calendar without blocking the UI.
   * Refresh the appointments list once the sync is complete.
   */
  const triggerBackgroundSync = async () => {
    // Both Staff and Admin can sync their own calendar
    const token = getToken();
    const role = token ? getRoleFromToken(token) : null;
    if (role !== 'Staff' && role !== 'Admin') return;

    try {
      // console.log('[CalendarPage] Starting background sync...');
      await googleCalendarApi.sync();
      // console.log('[CalendarPage] Background sync complete, refreshing appointments...');
      // Refresh appointments to show new external events
      await loadAppointments();
    } catch (error) {
      // Silently fail for background sync to avoid bothering the user
      console.error('Background sync failed:', error);
    }
  };

  // Trigger background sync on mount for Staff
  useEffect(() => {
    if (timezoneReady) {
      triggerBackgroundSync();
    }
  }, [timezoneReady]);

  const handleAppointmentClick = (apt: CalendarAppointment) => {
    setSelectedAppointment(apt);
    setShowDetailModal(true);
  };

  const confirmCancelAppointment = async () => {
    if (!cancelAppointmentId || cancelAppointmentId < 0) return;
    try {
        const token = getToken();
        if (token) {
            await updateAppointment(cancelAppointmentId, { status: "Cancelled" }, token);
            setAppointments(prev => prev.map(a => a.id === cancelAppointmentId ? { ...a, status: 'cancelled' } : a));
            setShowDetailModal(false);
            setSelectedAppointment(null);
            toast.success("Appointment cancelled successfully");
        }
    } catch(err) {
        console.error(err);
        toast.error("Failed to cancel appointment");
    } finally {
        setCancelAppointmentId(null);
    }
  };

  const handleCancelAppointment = (id: number) => {
    setCancelAppointmentId(id);
  };

  const handleEditAppointment = (apt: CalendarAppointment) => {
      const timeParts = apt.time.match(/(\d+):(\d+) (AM|PM)/);
      let time24 = "09:00";
      if (timeParts) {
          let h = parseInt(timeParts[1]);
          const m = parseInt(timeParts[2]);
          const ampm = timeParts[3];
          if (ampm === 'PM' && h < 12) h += 12;
          if (ampm === 'AM' && h === 12) h = 0;
          time24 = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
      }

      setNewAppointment({
          id: apt.id,
          customerName: apt.client,
          customerEmail: apt.clientEmail || '',
          customerPhone: apt.clientPhone || '',
          serviceId: apt.serviceId,
          staffId: apt.staffId,
          date: apt.date,
          time: time24,
          duration: 60,
          meetingType: (apt.location === 'In Person' || apt.location === 'in-person') ? 'InPerson' : 
                       (apt.location === 'Phone' || apt.location === 'Phone Call') ? 'Phone' : 'Zoom',
          paymentMethod: 'Card',
          status: apt.status as any,
          notes: '',
          price: apt.price.replace('$', ''),
          isRecurring: false,
          recurrenceType: 'none',
          repeatEndDate: '',
      });
      setSearchClient(apt.client);
      setShowBookingForm(true);
      setShowDetailModal(false);
  };

  if (!timezoneReady) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-600">Loading timezone settings...</p>
      </div>
    );
  }

  return (
    <div className="p-6 calendar-container relative">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 relative">
            <button
              onClick={previousPeriod}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white shadow-sm"
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="relative" ref={datePickerRef}>
              <button 
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center justify-between gap-2 text-base font-semibold hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors border border-gray-200 bg-white shadow-sm min-w-[220px]"
              >
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-indigo-600" />
                  {getPeriodLabel()}
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDatePicker ? 'rotate-180' : ''}`} />
              </button>

              {showDatePicker && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 w-[300px]">
                  <MiniCalendar 
                    selectedDate={currentDate} 
                    onSelectDate={(date) => {
                      setCurrentDate(date);
                      setSelectedDate(date);
                      setShowDatePicker(false);
                    }} 
                  />
                </div>
              )}
            </div>
            
            <button
              onClick={nextPeriod}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white shadow-sm"
              title="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setCurrentDate(new Date());
                setSelectedDate(new Date());
              }}
              className="ml-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white shadow-sm"
            >
              Today
            </button>
          </div>

          <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

          <div className="flex items-center bg-gray-100 p-1 rounded-xl">
            {['Month', 'Week', 'Day', 'List'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode.toLowerCase() as ViewMode)}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  viewMode === mode.toLowerCase()
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {currentUserRole === 'Staff' && (
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-sm disabled:opacity-50"
            >
              {syncing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Sync Now
            </button>
          )}
          <div className="flex items-center gap-2 bg-white px-3 py-2 border border-gray-200 rounded-lg shadow-sm">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="text-sm bg-transparent border-none focus:outline-none focus:ring-0 text-gray-700 cursor-pointer"
            >
              <option value="all">All services</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {!(getRoleFromToken(getToken() || '') === 'Staff') && (
        <div className="bg-blue-50/50 rounded-lg shadow-sm border border-indigo-200/50 p-4 mb-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
            <button
                onClick={() => setSelectedStaff(null)}
                className={`flex-shrink-0 flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
                selectedStaff === null ? 'bg-indigo-600 text-white' : 'hover:bg-blue-100/50'
                }`}
            >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                selectedStaff === null ? 'border-white bg-white' : 'border-gray-300 bg-gray-100'
                }`}>
                <User className={`w-6 h-6 ${selectedStaff === null ? 'text-indigo-600' : 'text-gray-600'}`} />
                </div>
                <span className={`text-xs ${selectedStaff === null ? 'text-white' : 'text-gray-700'}`}>All staff</span>
            </button>

            {staffList.map((staff) => (
                <button
                key={staff.id}
                onClick={() => setSelectedStaff(staff.id)}
                className={`flex-shrink-0 flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
                    selectedStaff === staff.id ? 'bg-blue-100/80 shadow-sm' : 'hover:bg-blue-100/50'
                }`}
                >
                <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white border-2 ${
                    selectedStaff === staff.id ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: staff.color }}
                >
                    <span className="text-sm">{staff.name.substring(0, 2).toUpperCase()}</span>
                </div>
                <span className={`text-xs text-center max-w-[80px] truncate ${
                    selectedStaff === staff.id ? 'text-indigo-600' : 'text-gray-700'
                }`}>
                    {staff.name} 
                </span>
                </button>
            ))}
            </div>
        </div>
      )}

      {viewMode === 'month' && (
        <MonthView
          currentDate={currentDate}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          getAppointmentsForDate={getAppointmentsForDate}
          onCreateAppointment={(date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            setNewAppointment(prev => ({ ...prev, date: `${year}-${month}-${day}` }));
            setSelectedDate(date);
            setShowBookingForm(true);
          }}
          staff={staffList}
          onAppointmentClick={handleAppointmentClick}
        />
      )}

      {viewMode === 'week' && (
        <WeekView
          currentDate={currentDate}
          getAppointmentsForDate={getAppointmentsForDate}
          onCreateAppointment={(date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            setNewAppointment(prev => ({ ...prev, date: `${year}-${month}-${day}` }));
            setSelectedDate(date);
            setShowBookingForm(true);
          }}
          staff={staffList}
          onAppointmentClick={handleAppointmentClick}
        />
      )}

      {viewMode === 'day' && (
        <DayView
          currentDate={currentDate}
          appointments={getAppointmentsForDate(currentDate)}
          onCreateAppointment={(time) => {
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            
            const timeParts = time.match(/(\d+):(\d+) (AM|PM)/);
            let time24 = "09:00";
            if (timeParts) {
              let h = parseInt(timeParts[1]);
              const m = parseInt(timeParts[2]);
              const ampm = timeParts[3];
              if (ampm === 'PM' && h < 12) h += 12;
              if (ampm === 'AM' && h === 12) h = 0;
              time24 = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
            }
            
            setNewAppointment(prev => ({ ...prev, date: `${year}-${month}-${day}`, time: time24 }));
            setSelectedDate(currentDate);
            setShowBookingForm(true);
          }}
          staff={staffList}
          onAppointmentClick={handleAppointmentClick}
        />
      )}

      {viewMode === 'list' && (
        <ListView
          appointments={getFilteredAppointments()}
          onAppointmentClick={handleAppointmentClick}
          currentDate={currentDate}
        />
      )}
      
      {/* Appointment Detail Modal */}
      {showDetailModal && selectedAppointment && (() => {
        const isExternal = selectedAppointment.id < 0;
        const mappedStaff = staffList.find(s => s.id === selectedAppointment.staffId);
        const displayStaffName = isExternal && mappedStaff 
          ? `${mappedStaff.firstName} ${mappedStaff.lastName}` 
          : selectedAppointment.staff;

        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
              {/* External Event Header */}
              {isExternal ? (
                 <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5 border-b border-blue-700/20">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2 text-white">
                        <CalendarIcon className="w-5 h-5" />
                        <h3 className="text-xl font-bold">External Event</h3>
                     </div>
                     <button
                       onClick={() => {
                         setShowDetailModal(false);
                         setSelectedAppointment(null);
                       }}
                       className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-white hover:rotate-90"
                     >
                       <X className="w-5 h-5" />
                     </button>
                   </div>
                 </div>
              ) : (
                  /* Standard Appointment Header */
                  <div className="relative bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-5 border-b border-indigo-700/20">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">Appointment Details</h3>
                      <button
                        onClick={() => {
                          setShowDetailModal(false);
                          setSelectedAppointment(null);
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-white hover:rotate-90"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
              )}

              <div className="p-6 space-y-5 bg-gray-50/50">
                {/* External Event Body */}
                {isExternal ? (
                  <>
                      <div className="space-y-4">
                          <div>
                              <h4 className="font-semibold text-gray-900 text-lg">Busy</h4>
                              <div className="flex items-center gap-1.5 text-gray-500 mt-1">
                                  <Clock className="w-4 h-4" />
                                  <span className="text-sm">
                                      {selectedAppointment.date} at {selectedAppointment.time} ({formatDuration(parseInt(selectedAppointment.duration.replace(/\D/g,'')) || 0)})
                                  </span>
                              </div>
                          </div>

                          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-start gap-3">
                               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                  <User className="w-5 h-5 text-blue-600" />
                               </div>
                               <div>
                                   <p className="text-sm font-bold text-gray-900">Staff: {displayStaffName}</p>
                                   <p className="text-xs text-gray-500 mt-0.5">Source: Google Calendar</p>
                               </div>
                          </div>

                          <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl space-y-2">
                               <p className="text-xs text-amber-700 font-medium flex items-center gap-2">
                                   <AlertCircle className="w-3.5 h-3.5" /> This event is synced from Google Calendar.
                               </p>
                               <div className="space-y-1 ml-5">
                                 <p className="text-[11px] text-amber-600/80 leading-relaxed">• It is marked as 'Busy' to prevent overbooking.</p>
                                 <p className="text-[11px] text-amber-600/80 leading-relaxed">• Edits and cancellations must be done in Google Calendar.</p>
                               </div>
                          </div>
                      </div>
                       <div className="pt-2">
                          <button
                            onClick={() => {
                              setShowDetailModal(false);
                              setSelectedAppointment(null);
                            }}
                             className="w-full py-3 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm active:scale-[0.98]"
                          >
                            Close
                          </button>
                       </div>
                  </>
                ) : (
                  /* Standard Appointment Body */
                  <>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                      <div>
                        <label className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Service</label>
                        <p className="text-lg font-bold text-gray-900 leading-tight">{selectedAppointment.service}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-500 font-medium flex items-center gap-1.5 mb-1">
                            <User className="w-3.5 h-3.5" /> Client
                          </label>
                          <p className="text-sm font-semibold text-gray-900">{selectedAppointment.client}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 font-medium flex items-center gap-1.5 mb-1 text-right justify-end">
                            Staff <User className="w-3.5 h-3.5" />
                          </label>
                          <p className="text-sm font-semibold text-gray-900 text-right">{displayStaffName}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-100">
                        <label className="text-xs text-gray-500 font-medium flex items-center gap-1.5 mb-1">
                          <Clock className="w-3.5 h-3.5" /> Time & Duration
                        </label>
                        <p className="text-base font-semibold text-gray-900">{selectedAppointment.time} ({formatDuration(parseInt(selectedAppointment.duration.replace(/\D/g,'')) || 60)})</p>
                      </div>

                      <div className="space-y-2">
                        {selectedAppointment.clientEmail && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="w-4 h-4 text-indigo-500" />
                            <p className="text-sm font-medium">{selectedAppointment.clientEmail}</p>
                          </div>
                        )}

                        {selectedAppointment.clientPhone && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-4 h-4 text-indigo-500" />
                            <p className="text-sm font-medium">{selectedAppointment.clientPhone}</p>
                          </div>
                        )}
                      </div>

                      <div className="pt-2">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm ${
                          selectedAppointment.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                          selectedAppointment.status === 'completed' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          selectedAppointment.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            selectedAppointment.status === 'confirmed' ? 'bg-green-500' :
                            selectedAppointment.status === 'completed' ? 'bg-blue-500' :
                            selectedAppointment.status === 'cancelled' ? 'bg-red-500' :
                            'bg-yellow-500'
                          }`} />
                          {selectedAppointment.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => handleEditAppointment(selectedAppointment)}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-bold shadow-md hover:shadow-lg active:scale-[0.98]"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleCancelAppointment(selectedAppointment.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white text-red-600 border-2 border-red-100 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all font-bold active:scale-[0.98]"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })()}


      <AppointmentFormModal 
        isOpen={showBookingForm}
        onClose={handleCloseForm}
        onSubmit={handleSubmitAppointment}
        initialData={newAppointment}
        editMode={!!newAppointment.id}
        staffList={staffList}
        servicesList={services.map(s => ({
            id: s.id,
            name: s.name,
            price: s.price,
            duration: s.serviceDuration || 60
        }))}
        customersList={customers.map(c => ({
            id: c.id,
            name: c.name,
            email: c.email,
            phone: c.phone || undefined
        }))}
        currentUserRole={currentUserRole || 'Staff'}
        currentUserId={currentUserId || 0}
      />

      <ConfirmationModal
        isOpen={!!cancelAppointmentId}
        onClose={() => setCancelAppointmentId(null)}
        onConfirm={confirmCancelAppointment}
        title="Cancel Appointment"
        description="Are you sure you want to cancel this appointment?"
        confirmText="Yes, Cancel"
        variant="destructive"
      />
    </div>
  );
}

// Month View Component
function MonthView({
  currentDate,
  selectedDate,
  onSelectDate,
  getAppointmentsForDate,
  onCreateAppointment,
  staff,
  onAppointmentClick
}: {
  currentDate: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  getAppointmentsForDate: (date: Date) => CalendarAppointment[];
  onCreateAppointment: (date: Date) => void;
  staff: CalendarStaff[];
  onAppointmentClick: (apt: CalendarAppointment) => void;
}) {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSameDate = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <div key={i} className="text-center text-sm text-gray-600 py-2">
            {day}
          </div>
        ))}
        
        {days.map((date, index) => {
          const isSelected = date && isSameDate(date, selectedDate);
          const today = date && isToday(date);
          const appointments = date ? getAppointmentsForDate(date) : [];
          const hasApts = appointments.length > 0;

          return (
            <div
              key={index}
              onClick={() => {
                  if (date) {
                      onSelectDate(date);
                      if (appointments.length === 0) {
                          onCreateAppointment(date);
                      }
                  }
              }}
              className={`
                min-h-[100px] p-2 rounded-lg border-2 transition-all cursor-pointer relative
                ${!date ? 'invisible' : ''}
                ${isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300 bg-white'}
                ${today && !isSelected ? 'border-indigo-400' : ''}
                group
              `}
            >
              {date && (
                <>
                  <div className="flex justify-between items-start">
                    <div className={`text-sm mb-2 ${isSelected ? 'text-indigo-700' : today ? 'text-indigo-600' : 'text-gray-900'}`}>
                      {date.getDate()}
                    </div>
                     <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelectDate(date);
                            onCreateAppointment(date);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-indigo-100 rounded transition-opacity"
                        title="Add Appointment"
                    >
                        <AlertCircle className="w-3 h-3 text-indigo-600" />
                    </button>
                  </div>
                  
                  {hasApts && (
                    <div className="space-y-1">
                      {appointments.slice(0, 2).map((apt) => {
                        const staffMember = staff.find(s => s.id === apt.staffId);
                        const color = staffMember?.color || '#3b82f6';
                        return (
                          <div
                            key={apt.id}
                            className="text-xs p-1 rounded truncate cursor-pointer hover:brightness-95 transition-filter"
                            style={{ backgroundColor: color + '20', color: color }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onAppointmentClick(apt);
                            }}
                          >
                            {apt.time} - {apt.client}
                          </div>
                        );
                      })}
                      {appointments.length > 2 && (
                        <div className="text-xs text-gray-600 text-center">
                          +{appointments.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Week View Component
function WeekView({
  currentDate,
  getAppointmentsForDate,
  onCreateAppointment,
  staff,
  onAppointmentClick
}: {
  currentDate: Date;
  getAppointmentsForDate: (date: Date) => CalendarAppointment[];
  onCreateAppointment: (date: Date) => void;
  staff: CalendarStaff[];
  onAppointmentClick: (apt: CalendarAppointment) => void;
}) {
  const getWeekDays = (date: Date) => {
    const week = [];
    const curr = new Date(date);
    const first = curr.getDate() - curr.getDay();
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(curr);
      day.setDate(first + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = getWeekDays(currentDate);

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, i) => (
          <div key={i} className="text-center border-b border-gray-200 pb-2 mb-2">
            <div className="text-sm text-gray-600">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className={`text-lg mt-1 ${isToday(day) ? 'text-indigo-600' : 'text-gray-900'}`}>
              {day.getDate()}
            </div>
          </div>
        ))}
        
        {weekDays.map((date, index) => {
          const appointments = getAppointmentsForDate(date);

          return (
            <div 
                key={index} 
                className="min-h-[400px] border border-gray-200 rounded-lg p-2 space-y-2 hover:bg-gray-50 transition-colors"
                onClick={() => {
                   onCreateAppointment(date);
                }}
            >
              {appointments.map((apt) => {
                const staffMember = staff.find(s => s.id === apt.staffId);
                const color = staffMember?.color || '#3b82f6';
                return (
                  <div
                    key={apt.id}
                    className="text-xs p-2 rounded border-l-4 cursor-pointer hover:shadow-sm bg-white"
                    style={{ 
                      backgroundColor: color + '10',
                      borderLeftColor: color
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAppointmentClick(apt);
                    }}
                  >
                    <div className="font-semibold text-gray-900">{apt.time} • {new Date(apt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    <div className="text-gray-700 mt-0.5">{apt.client}</div>
                    <div className="text-gray-600 mt-0.5">{apt.service}</div>
                    <div className="text-gray-500 mt-0.5 font-medium">{apt.staff}</div>
                  </div>
                );
              })}
              <button
                onClick={(e) => {
                    e.stopPropagation();
                    onCreateAppointment(date);
                }}
                className="w-full py-1.5 text-xs text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                title="Add Appointment"
              >
                + Add
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Day View Component
function DayView({
  currentDate,
  appointments,
  onCreateAppointment,
  staff,
  onAppointmentClick
}: {
  currentDate: Date;
  appointments: CalendarAppointment[];
  onCreateAppointment: (time: string) => void;
  staff: CalendarStaff[];
  onAppointmentClick: (apt: CalendarAppointment) => void;
}) {
  const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

  const getSlotHour = (timeStr: string) => {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return -1;
    let h = parseInt(match[1]);
    const ampm = match[3].toUpperCase();
    if (ampm === 'PM' && h < 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    return h;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="space-y-2">
        {timeSlots.map((time) => {
          const slotHour = getSlotHour(time);
          const slotAppointments = appointments.filter(a => getSlotHour(a.time) === slotHour);

          return (
            <div key={time} className="flex items-start gap-4 border-b border-gray-100 pb-2 min-h-[70px]">
              <div className="w-24 text-sm text-gray-600 pt-2 font-medium">{time}</div>
              <div className="flex-1 space-y-2">
                {slotAppointments.length > 0 ? (
                  slotAppointments.map(apt => {
                    const staffMember = staff.find(s => s.id === apt.staffId);
                    const color = staffMember?.color || '#3b82f6';
                    return (
                      <div
                        key={apt.id}
                        className="p-3 rounded-lg border-l-4 hover:shadow-md transition-shadow relative cursor-pointer bg-white border border-gray-100"
                        style={{
                          backgroundColor: color + '10',
                          borderLeftColor: color
                        }}
                        onClick={() => onAppointmentClick(apt)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">{apt.client}</span>
                                <span className="text-xs text-gray-500">
                                    ({apt.time} • {new Date(apt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {apt.duration})
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 mt-1">
                               <span>{apt.service}</span>
                               <span>•</span>
                               <span>{apt.staff}</span>
                               <span>•</span>
                               <span>{apt.location}</span>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded capitalize font-medium ${
                             apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                             apt.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                             apt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                             'bg-yellow-100 text-yellow-700'
                          }`}>
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <button
                    onClick={() => onCreateAppointment(time)}
                    className="w-full h-full py-3 text-sm text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors text-left px-3 flex items-center border border-transparent hover:border-indigo-100"
                    title="Available Slot - Click to Create"
                  >
                    Available
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// List View Component - Redesigned for density
function ListView({
  appointments,
  onAppointmentClick,
  currentDate
}: {
  appointments: CalendarAppointment[];
  onAppointmentClick: (apt: CalendarAppointment) => void;
  currentDate: Date;
}) {
  const getWeekDays = (date: Date) => {
    const week = [];
    const curr = new Date(date);
    const first = curr.getDate() - curr.getDay();
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(curr);
      day.setDate(first + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = getWeekDays(currentDate);

  const groupedAppointments: { [key: string]: CalendarAppointment[] } = {};
  weekDays.forEach(day => {
    const dateKey = day.toISOString().split('T')[0];
    groupedAppointments[dateKey] = appointments.filter(apt => {
      const aptDate = new Date(apt.date).toISOString().split('T')[0];
      return aptDate === dateKey;
    }).sort((a, b) => 
      new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
    );
  });

  const formatDayHeader = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="space-y-6">
        {weekDays.map((day) => {
          const dateKey = day.toISOString().split('T')[0];
          const dayAppointments = groupedAppointments[dateKey] || [];
          
          if (dayAppointments.length === 0) return null;

          return (
            <div key={dateKey}>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                {formatDayHeader(day)}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {dayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="border border-gray-200 rounded-lg p-3 hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer bg-white"
                    onClick={() => onAppointmentClick(apt)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-600">{apt.time} • {new Date(apt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        apt.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        apt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {apt.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{apt.client}</p>
                      <p className="text-xs text-gray-600 truncate">{apt.service}</p>
                      <p className="text-xs text-gray-500 truncate">{apt.staff}</p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <span>{apt.duration}</span>
                      {apt.clientPhone && <Phone className="w-3 h-3" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {appointments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No appointments found for this week.
          </div>
        )}
      </div>
    </div>
  );
}