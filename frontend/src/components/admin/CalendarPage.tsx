import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, User, DollarSign, Search, RefreshCw, Filter, Edit, Trash2, Mail, Phone, Calendar as CalendarIcon, Link as LinkIcon, AlertCircle, ChevronDown, MapPin, XCircle } from 'lucide-react';
import { fetchServices } from '../../services/serviceApi';
import { fetchStaff } from '../../services/staffApi';
import { fetchCustomers, CustomerResponse } from '../../services/customerApi';
import { getAppointments, createAppointment, deleteAppointment, updateAppointment } from '../../services/appointmentApi';
import { Staff, Service } from '../../types/types';
import { getToken, getCompanyIdFromToken, getRoleFromToken, getUserIdFromToken } from '../../utils/auth';
import { combineDateTimeToUTC, formatTime, getDateString } from '../../utils/datetime';
import { useTimezone } from '../../context/TimezoneContext';
import { MiniCalendar } from './MiniCalendar';

const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
];

const DURATIONS = ['30 min', '60 min', '90 min', '120 min'];

const LOCATIONS = ['In Person', 'Phone Call', 'Zoom'];
type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly';

type ViewMode = 'month' | 'week' | 'day' | 'list';

// Internal type for UI mapping
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

// Extended Staff type for UI (adds name and color)
interface CalendarStaff extends Staff {
  name: string; // Combined firstName + lastName
  color: string; // UI color
}

interface NewAppointment {
  id?: number; // for edit
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

  // 🔁 Recurrence (UI-only)
  isRecurring: boolean;
  recurrenceType: RecurrenceType;
  repeatEndDate: string;
}

export function CalendarPage() {
  const { timezone, refreshTimezone } = useTimezone();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string>('all');
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  // Real Data State
  const [appointments, setAppointments] = useState<CalendarAppointment[]>([]);
  const [staffList, setStaffList] = useState<CalendarStaff[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [customers, setCustomers] = useState<CustomerResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [timezoneReady, setTimezoneReady] = useState(false);

  // Popover State
  const [hoveredAppointment, setHoveredAppointment] = useState<CalendarAppointment | null>(null);
  const [popoverPos, setPopoverPos] = useState<{x: number, y: number} | null>(null);
  const popoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Form State
  const [searchClient, setSearchClient] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRepeatDatePicker, setShowRepeatDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const repeatDatePickerRef = useRef<HTMLDivElement>(null);

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
    status: 'Pending',
    notes: '',
    price: '',
    isRecurring: false,
    recurrenceType: 'none',
    repeatEndDate: '',
  });

  // Validation State
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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
        meetingType: 'InPerson',
        paymentMethod: 'credit-card',
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

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!newAppointment.customerName.trim()) errors.customerName = "Customer Name is required";
    if (!newAppointment.customerEmail.trim()) {
        errors.customerEmail = "Email is required";
    } else if (!emailRegex.test(newAppointment.customerEmail)) {
        errors.customerEmail = "Invalid email format";
    }
   if (!newAppointment.customerPhone.trim()) errors.customerPhone = "Phone number is required";

    if (newAppointment.serviceId === 0) errors.serviceId = "Please select a service";
    if (newAppointment.staffId === 0) errors.staffId = "Please select a staff member";
    if (!newAppointment.date) errors.date = "Date is required";
    if (!newAppointment.time) errors.time = "Time is required";
    if (!newAppointment.price) errors.price = "Price is required";
    
    if (newAppointment.isRecurring) {
        if (!newAppointment.recurrenceType || newAppointment.recurrenceType === 'none') {
            errors.recurrenceType = "Frequency is required";
        }
        if (!newAppointment.repeatEndDate) {
            errors.repeatEndDate = "End date is required";
        }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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

  // Helper to assign colors to staff
  const getStaffColor = (index: number) => {
    const colors = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    return colors[index % colors.length];
  };

  // Initialize timezone before loading appointments
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

  // Fetch Metadata (Staff, Services, Customers)
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
        // RBAC: If Staff, only show themselves
        if (role === 'Staff' && userId) {
            staffData = staffDataRaw.filter((s: any) => s.id === userId);
            setSelectedStaff(userId);
        }

        const servicesData = Array.isArray(servicesRaw) ? servicesRaw : (servicesRaw.items || []);

        // Map Staff to CalendarStaff
        const mappedStaff: CalendarStaff[] = staffData
          .filter((s:any) => s.isActive)
          .map((s:any, index:number) => ({
            ...s,
            name: `${s.firstName} ${s.lastName}`,
            color: s.avatar ? '#4f46e5' : getStaffColor(index) // Use avatar color logic or default
        }));

        setStaffList(mappedStaff);
        setServices(servicesData);
        // Handle potential error case where catch returns []
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

      // Calculate date range based on viewMode
      // defaulting to month range for now as safe bet
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const startDate = new Date(year, month - 1, 1).toISOString(); // Fetch extra buffer
      const endDate = new Date(year, month + 2, 0).toISOString();

      const data = await getAppointments({
        startDate: startDate,
        endDate: endDate,
        staffId: selectedStaff || undefined,
        serviceId: selectedService !== 'all' ? parseInt(selectedService) : undefined, // assumes filter uses ID
        pageSize: 1000, // Ensure we fetch enough appointments for the calendar view
        sortBy: 'date',
        sortDirection: 'asc'
      }, token);

      // Map API response to UI format
      const mapped: CalendarAppointment[] = data.appointments.map(apt => {
         // DEBUG: Log timezone used for display formatting
         // console.log('🗓️ CalendarPage loadAppointments - Formatting with timezone:', timezone, 'for apt:', apt.startDateTime);
         
         // Use timezone-aware formatting
         const startDateTime = apt.startDateTime;
         const dateStr = getDateString(new Date(startDateTime), timezone);
         const timeStr = formatTime(startDateTime, timezone);
         
         // console.log('🗓️ CalendarPage - Formatted:', { raw: apt.startDateTime, dateStr, timeStr, timezone });
         
         // Calculate duration
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

      // Client-side safety sort
      mapped.sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());

      setAppointments(mapped);
    } catch (error) {
      console.error("Failed to load appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Appointments when date, filters, or timezone change
  useEffect(() => {
    if (!timezoneReady) return; // Don't load until timezone is ready
    loadAppointments();
  }, [currentDate, selectedStaff, selectedService, timezone, timezoneReady]);

  const getFilteredAppointments = () => {
    // API already filters by staff/service if we pass params
    // But we might want local filtering if we fetched a larger range to avoid flickers
    let filtered = appointments;
    if (selectedStaff) {
        filtered = filtered.filter(a => a.staffId === selectedStaff);
    }
    // Service filter logic if needed locally...
    return filtered;
  };

  const getAppointmentsForDate = (date: Date) => {
    // Use local date components to match the visual calendar cell
    // This avoids timezone shifting (e.g. Local Midnight -> Previous Day in UTC)
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
    } else if (viewMode === 'week') {
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
    } else if (viewMode === 'week') {
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
        duration: service.serviceDuration || 60, // Assuming service object has duration or serviceDuration
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
      status: 'Pending',
      notes: '',
      price: '',

      isRecurring: false,
      recurrenceType: 'none',
      repeatEndDate: '',
    });
    setSearchClient('');
    setShowClientDropdown(false);
    setFormErrors({}); // Clear errors on close
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

  const handleSubmitAppointment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    try {
       // 🛡️ Ensure we have the latest timezone before computing times
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

       const nameParts = newAppointment.customerName.trim().split(' ');
       const firstName = nameParts[0] || 'Customer';
       const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Unknown';

       // Map frontend payment method to backend enum
       let apiPaymentMethod: "Card" | "Cash" | "PayPal" = "Card";
       if (newAppointment.paymentMethod === 'Cash') apiPaymentMethod = 'Cash';
       else if (newAppointment.paymentMethod === 'paypal' || newAppointment.paymentMethod === 'PayPal') apiPaymentMethod = 'PayPal';
       // 'credit-card', 'debit-card', 'pay-later' default to 'Card'

       // Common Payload Data
       const basePayload = {
           companyId: companyId || 0,
           firstName: firstName,
           lastName: lastName,
           email: newAppointment.customerEmail,
           phone: newAppointment.customerPhone,
           serviceId: newAppointment.serviceId,
           staffId: newAppointment.staffId === 0 ? null : newAppointment.staffId,
           meetingType: newAppointment.meetingType,
           paymentMethod: apiPaymentMethod,
           notes: newAppointment.notes,
       };

       // Use date strings to avoid timezone issues with Date objects
       const appointmentDates: string[] = [];
       const baseDateStr = newAppointment.date; // Already YYYY-MM-DD format
       
       if (!newAppointment.isRecurring) {
           appointmentDates.push(baseDateStr);
       } else {
           if (!newAppointment.repeatEndDate) throw new Error("End date required for recurring appointment");
           
           // For recurrence, we need Date objects to calculate next occurrence
           const [baseY, baseM, baseD] = baseDateStr.split('-').map(Number);
           let curr = new Date(Date.UTC(baseY, baseM - 1, baseD));
           const endDate = new Date(newAppointment.repeatEndDate + 'T23:59:59');
           let count = 0;
           
           while(curr <= endDate && count < 50) { // Safety limit
               // Extract date string in YYYY-MM-DD format
               const dateStr = curr.toISOString().split('T')[0];
               appointmentDates.push(dateStr);
               
               if (newAppointment.recurrenceType === 'daily') curr = addDays(curr, 1);
               else if (newAppointment.recurrenceType === 'weekly') curr = addDays(curr, 7);
               else if (newAppointment.recurrenceType === 'monthly') curr = addMonths(curr, 1);
               else break;
               
               count++;
           }
       }

       // Execute Creation Loop
       for (const datePart of appointmentDates) {
           // DEBUG: Log all timezone-related values
           console.log('📅 CalendarPage - Creating appointment:', {
               inputDate: datePart,
               inputTime: newAppointment.time,
               companyTimezone: timezone,
               browserTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone
           });
           
           // Use combineDateTimeToUTC with company timezone for correct conversion
           // This ensures 15:30 in company timezone (e.g., Asia/Kolkata) is correctly converted to UTC
           const startTimeUtc = combineDateTimeToUTC(
               datePart,
               newAppointment.time,
               timezone  // Use company timezone, not local browser time
           );
           
           console.log('📅 CalendarPage - Converted to UTC:', startTimeUtc);

           await createAppointment({
               ...basePayload,
               startTime: startTimeUtc,
           });
       }
       
       alert("Appointment(s) created successfully!");
       
       // Auto-navigate to the date of the appointment/first occurrence
       if (appointmentDates.length > 0) {
           const [y, m, d] = appointmentDates[0].split('-').map(Number);
           const firstDate = new Date(y, m - 1, d);
           setCurrentDate(firstDate);
           setSelectedDate(firstDate);
           
           // If we are already viewing that month, manually reload. Otherwise currentDate change handles it.
           const currentY = currentDate.getFullYear();
           const currentM = currentDate.getMonth() + 1;
           if (y === currentY && m === currentM) {
                loadAppointments();
           }
       }
       handleCloseForm();

    } catch (error: any) {
        console.error(error);
        alert(`Failed to save appointment: ${error.message || error}`);
    }
  };





  // ---------- POPOVER & ACTIONS ----------
  
  const handleAppointmentTitleEnter = (e: React.MouseEvent, apt: CalendarAppointment) => {
      // Clear any pending close timer
      if (popoverTimeout.current) {
          clearTimeout(popoverTimeout.current);
          popoverTimeout.current = null;
      }
      
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      // Simple absolute positioning relative to viewport
      // Add scroll offset if container scrolls, but fixed position is easier for modal-like behavior within viewport
      setPopoverPos({ x: rect.right + 10, y: rect.top });
      setHoveredAppointment(apt);
  };

  const handleAppointmentLeave = () => {
      // Delay closing to allow moving mouse to the popover
      popoverTimeout.current = setTimeout(() => {
          setHoveredAppointment(null);
          setPopoverPos(null);
      }, 300);
  };

  const handlePopoverEnter = () => {
      if (popoverTimeout.current) {
          clearTimeout(popoverTimeout.current);
          popoverTimeout.current = null;
      }
  };

  const handlePopoverLeave = () => {
       popoverTimeout.current = setTimeout(() => {
          setHoveredAppointment(null);
          setPopoverPos(null);
      }, 300);
  };

  const handleCancelAppointment = async (id: number) => {
      if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
      try {
          const token = getToken();
          if (token) {
              await updateAppointment(id, { status: "Cancelled" }, token);
              // Optimistic update
              setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a));
              setHoveredAppointment(null); // Close popover
          }
      } catch(err) {
          console.error(err);
          alert("Failed to cancel appointment");
      }
  };

  const handleEditAppointment = (apt: CalendarAppointment) => {
      // Pre-fill form
      // Convert apt.date (YYYY-MM-DD input) and apt.time (HH:MM AM/PM display) to input friendly formats
      // input type="date" expects YYYY-MM-DD (apt.date is likely already this or needs check)
      // input type="time" expects HH:MM (24h)
      
      // Parse time "8:00 AM" -> "08:00"
      const timeParts = apt.time.match(/(\d+):(\d+) (AM|PM)/);
      let time24 = "09:00"; // default
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
          duration: 60, // approximate, or parse apt.duration string
          meetingType: (apt.location === 'In Person' || apt.location === 'in-person') ? 'InPerson' : 
                       (apt.location === 'Phone' || apt.location === 'Phone Call') ? 'Phone' : 'Zoom',
          paymentMethod: 'Card', // default or fetch if available
          status: apt.status as any,
          notes: '',
          price: apt.price.replace('$', ''),

          isRecurring: false,
          recurrenceType: 'none',
          repeatEndDate: '',
      });
      setSearchClient(apt.client);
      setShowBookingForm(true);
      setHoveredAppointment(null);
  };

  // Show loading while timezone is being fetched
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
      <div className="flex items-center justify-between mb-6">
        <div>
          {viewMode === 'list' ? (
            <>
              <h1>
                {(() => {
                  // Calculate week range for List view
                  const curr = new Date(currentDate);
                  const first = curr.getDate() - curr.getDay(); // Sunday of the week
                  const startDate = new Date(curr);
                  startDate.setDate(first);
                  const endDate = new Date(curr);
                  endDate.setDate(first + 6);
                  
                  const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
                  const startDay = startDate.getDate();
                  const endDay = endDate.getDate();
                  const year = endDate.getFullYear();
                  
                  return `${startMonth} ${startDay} – ${endDay}, ${year}`;
                })()}
              </h1>
              <p className="text-gray-600 mt-1">Weekly appointment list</p>
            </>
          ) : (
            <>
              <h1>Calendar</h1>
              <p className="text-gray-600 mt-1">View and manage appointments</p>
            </>
          )}
          {/* <p className="text-xs text-gray-500 mt-1">Timezone: {timezone}</p> */}
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-3">
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
          
          {/* <button 
            onClick={() => {
              setSelectedStaff(null);
              setSelectedService('all');
            }}
            className="p-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-gray-500"
            title="Reset Filters"
          >
            <RefreshCw className="w-4 h-4" />
          </button> */}
        </div>
      </div>

      {/* Staff Avatars */}
      {!(getRoleFromToken(getToken() || '') === 'Staff') && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <button
                onClick={() => setSelectedStaff(null)}
                className={`flex-shrink-0 flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
                selectedStaff === null ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'
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
                    selectedStaff === staff.id ? 'bg-indigo-50' : 'hover:bg-gray-50'
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
                    {/* Use full name, truncation happens if overly long */}
                    {staff.name} 
                </span>
                </button>
            ))}
            </div>
        </div>
      )}


      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 relative">
            {/* Navigation arrows */}
            <button
              onClick={previousPeriod}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Today button */}
            <button
              onClick={() => {
                setCurrentDate(new Date());
                setSelectedDate(new Date());
              }}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
               
            </button>
            
            {/* Next arrow */}
            <button
              onClick={nextPeriod}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Date Picker Trigger */}
            <div className="relative ml-2" ref={datePickerRef}>
                <button 
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="flex items-center gap-2 text-base font-medium hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                    {getPeriodLabel()}
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showDatePicker ? 'rotate-180' : ''}`} />
                </button>

                {/* Mini Calendar Popover */}
                {showDatePicker && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 w-[300px]">
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

          </div>

          <div className="flex items-center gap-2">
            {['Month', 'Week', 'Day', 'List'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode.toLowerCase() as ViewMode)}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  viewMode === mode.toLowerCase()
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Views */}
      {viewMode === 'month' && (
        <MonthView
          currentDate={currentDate}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          getAppointmentsForDate={getAppointmentsForDate}
          onCreateAppointment={(date) => {
            // Auto-fill date with clicked date
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            setNewAppointment(prev => ({ ...prev, date: `${year}-${month}-${day}` }));
            setSelectedDate(date);
            setShowBookingForm(true);
          }}
          staff={staffList}
          onHoverAppointment={handleAppointmentTitleEnter}
          onLeaveAppointment={handleAppointmentLeave}
        />
      )}

      {viewMode === 'week' && (
        <WeekView
          currentDate={currentDate}
          getAppointmentsForDate={getAppointmentsForDate}
          onCreateAppointment={(date) => {
            // Auto-fill date with clicked date
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            setNewAppointment(prev => ({ ...prev, date: `${year}-${month}-${day}` }));
            setSelectedDate(date);
            setShowBookingForm(true);
          }}
          staff={staffList}
          onHoverAppointment={handleAppointmentTitleEnter}
          onLeaveAppointment={handleAppointmentLeave}
        />
      )}

      {viewMode === 'day' && (
        <DayView
          currentDate={currentDate}
          appointments={getAppointmentsForDate(currentDate)}
          onCreateAppointment={(time) => {
            // Auto-fill date and time
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            
            // Convert time from "8:00 AM" to "08:00" 24h format
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
          onHoverAppointment={handleAppointmentTitleEnter}
          onLeaveAppointment={handleAppointmentLeave}
        />
      )}



      {viewMode === 'list' && (
        <ListView
          appointments={getFilteredAppointments()}
          onEdit={handleEditAppointment}
          onDelete={handleCancelAppointment}
          currentDate={currentDate}
        />
      )}
      
      {/* Popover */}
      {hoveredAppointment && popoverPos && (
          <div 
             className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-80 p-4 text-sm"
             style={{ 
                 left: Math.min(popoverPos.x, window.innerWidth - 340), // prevent overflow right
                 top: popoverPos.y 
             }}
             onMouseEnter={handlePopoverEnter}
             onMouseLeave={handlePopoverLeave}
          >
              <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                      <span className="font-semibold text-gray-900">{hoveredAppointment.client} - {hoveredAppointment.service}</span>
                  </div>
              </div>
              
              <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{hoveredAppointment.staff}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{hoveredAppointment.time} ({hoveredAppointment.duration})</span>
                  </div>
                   {hoveredAppointment.clientEmail && (
                      <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{hoveredAppointment.clientEmail}</span>
                      </div>
                  )}
                  {hoveredAppointment.clientPhone && (
                      <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{hoveredAppointment.clientPhone}</span>
                      </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold 
                          ${hoveredAppointment.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {hoveredAppointment.status}
                      </span>
                  </div>
              </div>
              
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                   <button 
                      onClick={() => handleEditAppointment(hoveredAppointment)}
                      className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition" 
                      title="Edit"
                   >
                       <Edit className="w-4 h-4" />
                   </button>
                   <button 
                      onClick={() => handleCancelAppointment(hoveredAppointment.id)}
                      className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition" 
                      title="Cancel Appointment"
                   >
                       <XCircle className="w-4 h-4" />
                   </button>
              </div>
          </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl 
                  max-h-[90vh] flex flex-col overflow-hidden">

            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className=" text-xl md:text-2xl font-bold">{newAppointment.id ? 'Edit Appointment' : 'Add New Appointment'}</h2>
              <button
                onClick={handleCloseForm}
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
                            setNewAppointment({ ...newAppointment, customerName: e.target.value });
                            setShowClientDropdown(true);
                            if (formErrors.customerName) setFormErrors({ ...formErrors, customerName: '' });
                          }}
                          onFocus={() => setShowClientDropdown(true)}
                          placeholder="Search existing clients or type new name..."
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.customerName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                      </div>
                      {showClientDropdown && filteredClients.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {filteredClients.slice(0, 10).map((client) => (
                            <button
                              key={client.id}
                              type="button"
                              onClick={() => {
                                handleClientSelect(client);
                                if (formErrors.customerName) setFormErrors({ ...formErrors, customerName: '' });
                                if (formErrors.customerEmail) setFormErrors({ ...formErrors, customerEmail: '' });
                              }}
                              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                            >
                              <p className="text-sm text-gray-900">{client.name}</p>
                              <p className="text-xs text-gray-600">{client.email}</p>
                            </button>
                          ))}
                        </div>
                      )}
                      {formErrors.customerName && <p className="text-red-500 text-xs mt-1">{formErrors.customerName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={newAppointment.customerEmail}
                        onChange={(e) => {
                            setNewAppointment({ ...newAppointment, customerEmail: e.target.value });
                            if (formErrors.customerEmail) setFormErrors({ ...formErrors, customerEmail: '' });
                        }}
                        placeholder="john@example.com"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.customerEmail ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formErrors.customerEmail && <p className="text-red-500 text-xs mt-1">{formErrors.customerEmail}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={newAppointment.customerPhone}
                        onChange={(e) => {
                            setNewAppointment({ ...newAppointment, customerPhone: e.target.value });
                            if (formErrors.customerPhone) setFormErrors({ ...formErrors, customerPhone: '' });
                        }}
                        placeholder="+1 234-567-8900"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.customerPhone ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formErrors.customerPhone && <p className="text-red-500 text-xs mt-1">{formErrors.customerPhone}</p>}
                    </div>
                  </div>
                </div>

                {/* Service & Staff Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Service & Staff</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={newAppointment.serviceId}
                        onChange={(e) => {
                            handleServiceChange(Number(e.target.value));
                            if (formErrors.serviceId) setFormErrors({ ...formErrors, serviceId: '' });
                        }}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.serviceId ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value={0}>Select a service</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name} (${service.price} - {service.serviceDuration || 60} min)
                          </option>
                        ))}
                      </select>
                      {formErrors.serviceId && <p className="text-red-500 text-xs mt-1">{formErrors.serviceId}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Staff Member <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={newAppointment.staffId}
                        onChange={(e) => {
                            setNewAppointment({ ...newAppointment, staffId: Number(e.target.value) });
                            if (formErrors.staffId) setFormErrors({ ...formErrors, staffId: '' });
                        }}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.staffId ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value={0}>Select staff member</option>
                        {staffList.map((staff) => (
                          <option key={staff.id} value={staff.id}>
                            {staff.name}
                          </option>
                        ))}
                      </select>
                      {formErrors.staffId && <p className="text-red-500 text-xs mt-1">{formErrors.staffId}</p>}
                    </div>
                  </div>
                </div>

                {/* Date & Time Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-indigo-600" />
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
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left flex items-center justify-between bg-white ${formErrors.date ? 'border-red-500' : 'border-gray-300'}`}
                          >
                            <span className={newAppointment.date ? 'text-gray-900' : 'text-gray-500'}>
                              {newAppointment.date 
                                ? (() => {
                                    const [y, m, d] = newAppointment.date.split('-');
                                    return `${m}/${d}/${y}`;
                                  })()
                                : 'mm/dd/yyyy'}
                            </span>
                            <CalendarIcon className="w-4 h-4 text-gray-400" />
                          </button>
                          
                          {showDatePicker && (
                            <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-3 w-72">
                              <MiniCalendar
                                selectedDate={newAppointment.date ? new Date(newAppointment.date) : new Date()}
                                onSelectDate={(date) => {
                                  const year = date.getFullYear();
                                  const month = String(date.getMonth() + 1).padStart(2, '0');
                                  const day = String(date.getDate()).padStart(2, '0');
                                  setNewAppointment({ ...newAppointment, date: `${year}-${month}-${day}` });
                                  setShowDatePicker(false);
                                  if (formErrors.date) setFormErrors({ ...formErrors, date: '' });
                                }}
                              />
                            </div>
                          )}
                        </div>
                        {formErrors.date && <p className="text-red-500 text-xs mt-1">{formErrors.date}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => {
                            setNewAppointment({ ...newAppointment, time: e.target.value });
                            if (formErrors.time) setFormErrors({ ...formErrors, time: '' });
                        }}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.time ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formErrors.time && <p className="text-red-500 text-xs mt-1">{formErrors.time}</p>}
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            value={newAppointment.price}
                            onChange={(e) => {
                                setNewAppointment({ ...newAppointment, price: e.target.value });
                                if (formErrors.price) setFormErrors({ ...formErrors, price: '' });
                            }}
                            placeholder="150.00"
                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.price ? 'border-red-500' : 'border-gray-300'}`}
                        />
                      </div>
                      {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}
                    </div>
                  </div>
                </div>

                {/* Repeat / Recurring Section */}
       

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
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                    placeholder="Add any additional notes or requirements..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex gap-3 bg-gray-50">
               <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitAppointment}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {newAppointment.id ? 'Save Changes' : 'Create Appointment'}
                </button>
            </div>

          </div>
        </div>
      )}
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
  onHoverAppointment,
  onLeaveAppointment
}: {
  currentDate: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  getAppointmentsForDate: (date: Date) => CalendarAppointment[];
  onCreateAppointment: (date: Date) => void;
  staff: CalendarStaff[];
  onHoverAppointment: (e: React.MouseEvent, apt: CalendarAppointment) => void;
  onLeaveAppointment: () => void;
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
        {/* Day Headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <div key={i} className="text-center text-sm text-gray-600 py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
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
                      // If empty, open Create Modal immediately
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
                    {/* Add Button on Hover for empty or populated days */}
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
                            className="text-xs p-1 rounded truncate hover:brightness-95 transition-filter"
                            style={{ backgroundColor: color + '20', color: color }}
                            onMouseEnter={(e) => onHoverAppointment(e, apt)}
                            onMouseLeave={onLeaveAppointment}
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
  onHoverAppointment,
  onLeaveAppointment
}: {
  currentDate: Date;
  getAppointmentsForDate: (date: Date) => CalendarAppointment[];
  onCreateAppointment: (date: Date) => void;
  staff: CalendarStaff[];
  onHoverAppointment: (e: React.MouseEvent, apt: CalendarAppointment) => void;
  onLeaveAppointment: () => void;
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
        {/* Day Headers */}
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
        
        {/* Calendar Days */}
        {weekDays.map((date, index) => {
          const appointments = getAppointmentsForDate(date);

          return (
            <div 
                key={index} 
                className="min-h-[400px] border border-gray-200 rounded-lg p-2 space-y-2 hover:bg-gray-50 transition-colors"
                onClick={() => {
                   // Click empty space -> Create
                   onCreateAppointment(date);
                }}
            >
              {appointments.map((apt) => {
                const staffMember = staff.find(s => s.id === apt.staffId);
                const color = staffMember?.color || '#3b82f6';
                return (
                  <div
                    key={apt.id}
                    className="text-xs p-2 rounded border-l-4 cursor-pointer hover:shadow-sm"
                    style={{ 
                      backgroundColor: color + '20',
                      borderLeftColor: color
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent triggering create on empty space click
                    onMouseEnter={(e) => onHoverAppointment(e, apt)}
                    onMouseLeave={onLeaveAppointment}
                  >
                    <div className="text-gray-900">{apt.time}</div>
                    <div className="text-gray-700 mt-1">{apt.client}</div>
                    <div className="text-gray-600">{apt.service}</div>
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
  onHoverAppointment,
  onLeaveAppointment
}: {
  currentDate: Date;
  appointments: CalendarAppointment[];
  onCreateAppointment: (time: string) => void;
  staff: CalendarStaff[];
  onHoverAppointment: (e: React.MouseEvent, apt: CalendarAppointment) => void;
  onLeaveAppointment: () => void;
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
          // Find all appointments that start in this hour
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
                          backgroundColor: color + '10', // Very light background
                          borderLeftColor: color
                        }}
                        onMouseEnter={(e) => onHoverAppointment(e, apt)}
                        onMouseLeave={onLeaveAppointment}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">{apt.client}</span>
                                <span className="text-xs text-gray-500">
                                    ({apt.time} - {apt.duration})
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



// List View Component
function ListView({
  appointments,
  onEdit,
  onDelete,
  currentDate
}: {
  appointments: CalendarAppointment[];
  onEdit: (apt: CalendarAppointment) => void;
  onDelete: (id: number) => void;
  currentDate: Date;
}) {
  // Get the week days starting from the current date
  const getWeekDays = (date: Date) => {
    const week = [];
    const curr = new Date(date);
    const first = curr.getDate() - curr.getDay(); // Sunday of the week
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(curr);
      day.setDate(first + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = getWeekDays(currentDate);
  const startDate = weekDays[0];
  const endDate = weekDays[6];

  // Group appointments by day
  const groupedAppointments: { [key: string]: CalendarAppointment[] } = {};
  weekDays.forEach(day => {
    const dateKey = day.toISOString().split('T')[0];
    groupedAppointments[dateKey] = appointments.filter(apt => {
      const aptDate = new Date(apt.date).toISOString().split('T')[0];
      return aptDate === dateKey;
    });
  });

  // Format day header (e.g., "Wednesday")
  const formatDayHeader = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // Format full date (e.g., "January 7, 2026")
  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Appointments list grouped by day */}
      <div className="p-6">
        {weekDays.map((day) => {
          const dateKey = day.toISOString().split('T')[0];
          // Sort appointments by time (AM to PM)
          const dayAppointments = (groupedAppointments[dateKey] || []).sort((a, b) => 
            new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
          );
          
          // Only show days that have appointments
          if (dayAppointments.length === 0) return null;

          return (
            <div key={dateKey} className="mb-8 last:mb-0">
              {/* Day header */}
              <div className="flex items-baseline gap-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {formatDayHeader(day)}
                </h3>
                <span className="text-sm text-gray-500">
                  {formatFullDate(day)}
                </span>
              </div>

              {/* Appointments for this day */}
              <div className="space-y-3 pl-4 border-l-4 border-indigo-100">
                {dayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    {/* Time and Service */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {apt.time}
                        </div>
                        <div className="text-base font-medium text-gray-900 mt-1">
                          {apt.service}
                        </div>
                      </div>
                      
                      {/* Status badge */}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        apt.status.toLowerCase() === 'confirmed' || apt.status.toLowerCase() === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : apt.status.toLowerCase() === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        Status: {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                    </div>

                    {/* Customer details */}
                    <div className="text-sm text-gray-700 space-y-0.5">
                      <div>{apt.client}</div>
                      {apt.clientPhone && <div>{apt.clientPhone}</div>}
                      {apt.clientEmail && <div>{apt.clientEmail}</div>}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => onEdit(apt)}
                        className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(apt.id)}
                        className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        title="Cancel Appointment"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Show message if no appointments in the week */}
        {appointments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No appointments found for this week.
          </div>
        )}
      </div>
    </div>
  );
}