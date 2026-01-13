import { useState, useEffect, useRef } from 'react';
import { MiniCalendar } from './MiniCalendar';
import { AppointmentFormModal, NewAppointment, StaffOption, ServiceOption, CustomerOption } from './AppointmentFormModal';
import { Search, Calendar, Clock, MapPin, X, Filter, Plus, Edit2, Save, XCircle, ChevronDown, Phone as PhoneIcon, Mail, User, Loader2, Globe, DollarSign, CalendarDays, Briefcase, FileText, Video, Download } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { useTimezone } from '../../context/TimezoneContext';
import { formatDate, formatTime, formatDateTime, combineDateTimeToUTC, getTimezoneOffset, getDateString, getTimeString } from '../../utils/datetime';
import type { Appointment } from '../../types/types';
import { getAppointments, AppointmentResponse, createAppointment, updateAppointment } from '../../services/appointmentApi';
import { fetchServices } from '../../services/serviceApi';
import { fetchStaff } from '../../services/staffApi';
import { fetchCustomers, CustomerResponse } from '../../services/customerApi';
import { getToken, getCompanyIdFromToken, getRoleFromToken, getUserIdFromToken } from '../../utils/auth';


type SortField = 'id' | 'date' | 'staff' | 'customer';
type SortOrder = 'asc' | 'desc';



export function AppointmentsPage() {
  const { timezone, refreshTimezone } = useTimezone();
    // Get timezone display info
  const timezoneDisplay = timezone.split('/').pop()?.replace('_', ' ');
  const timezoneOffset = getTimezoneOffset(timezone);
  const [editingAppointmentId, setEditingAppointmentId] = useState<number | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [cancelAppointmentId, setCancelAppointmentId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Confirmed' | 'Pending' | 'Cancelled'>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Appointment | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStaffFilter, setShowStaffFilter] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<number[]>([]);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  // Date Range Filter State
  const [dateRangeFilter, setDateRangeFilter] = useState<string>('any_time');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);

  // Server-side Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  
  // API state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [staffList, setStaffList] = useState<StaffOption[]>([]);
  const [servicesList, setServicesList] = useState<ServiceOption[]>([]);
  const [customersList, setCustomersList] = useState<CustomerResponse[]>([]);
  const [timezoneReady, setTimezoneReady] = useState(false);

  // Client search state
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

  // Fetch appointments on mount

  // Calculate date range for filtering
  const getDateRangeParams = () => {
    const now = new Date();
    let startDate: string | undefined;
    let endDate: string | undefined;
    
    switch (dateRangeFilter) {
      case 'yesterday': {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);
        const yesterdayEnd = new Date(yesterday);
        yesterdayEnd.setHours(23, 59, 59, 999);
        startDate = yesterday.toISOString();
        endDate = yesterdayEnd.toISOString();
        break;
      }
      case 'today': {
        const todayStart = new Date(now);
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date(now);
        todayEnd.setHours(23, 59, 59, 999);
        startDate = todayStart.toISOString();
        endDate = todayEnd.toISOString();
        break;
      }
      case 'this_week': {
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        const weekStart = new Date(now);
        weekStart.setDate(diff);
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        startDate = weekStart.toISOString();
        endDate = weekEnd.toISOString();
        break;
      }
      case 'this_month': {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        startDate = monthStart.toISOString();
        endDate = monthEnd.toISOString();
        break;
      }
      case 'this_year': {
        const yearStart = new Date(now.getFullYear(), 0, 1);
        const yearEnd = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
        startDate = yearStart.toISOString();
        endDate = yearEnd.toISOString();
        break;
      }
      case 'custom': {
        if (customStartDate && customEndDate) {
          const customStart = new Date(customStartDate);
          customStart.setHours(0, 0, 0, 0);
          const customEnd = new Date(customEndDate);
          customEnd.setHours(23, 59, 59, 999);
          startDate = customStart.toISOString();
          endDate = customEnd.toISOString();
        } else {
          startDate = new Date('2020-01-01').toISOString();
        }
        break;
      }
      case 'any_time':
      default: {
        startDate = new Date('2020-01-01').toISOString();
        break;
      }
    }
    
    return { startDate, endDate };
  };

  const handleExportCSV = async () => {
    try {
        const token = getToken();
        if (!token) {
            toast.error('Authentication required');
            return;
        }

        const toastId = toast.loading('Generating CSV...');
        
        const { startDate, endDate } = getDateRangeParams();
        const role = getRoleFromToken(token);
        const userId = getUserIdFromToken(token);
        
        let apiStaffIds: number[] | undefined = undefined;
        if (role === 'Staff' && userId) {
            apiStaffIds = [userId];
        } else if (selectedStaff.length > 0) {
            apiStaffIds = selectedStaff;
        }

        // Fetch all matching appointments for export (large pageSize)
        const response = await getAppointments({
            startDate,
            endDate,
            page: 1,
            pageSize: 10000, 
            sortBy: sortField,
            sortDirection: sortOrder,
            searchTerm: searchTerm,
            status: filterStatus === 'all' ? undefined : filterStatus,
            staffIds: apiStaffIds,
        }, token);

        if (!response.appointments || response.appointments.length === 0) {
            toast.dismiss(toastId);
            toast.info('No appointments to export');
            return;
        }

        // Generate CSV content
        const headers = ['ID', 'Customer Name', 'Email', 'Phone', 'Service', 'Staff', 'Date', 'Time', 'Duration', 'Type', 'Status', 'Price', 'Payment Method'];
        const csvRows = response.appointments.map(apt => {
            const dateObj = new Date(apt.startDateTime);
            const dateStr = getDateString(dateObj, timezone);
            const timeStr = getTimeString(dateObj, timezone);
            
            // Escape quotes in strings
            const escape = (str: string | undefined | null) => `"${(str || '').toString().replace(/"/g, '""')}"`;
            
            return [
                apt.id,
                escape(apt.customerName),
                escape(apt.customerEmail),
                escape(apt.customerPhone),
                escape(apt.serviceName),
                escape(apt.staffName || 'Unassigned'),
                escape(dateStr),
                escape(timeStr),
                apt.endDateTime ? Math.round((new Date(apt.endDateTime).getTime() - new Date(apt.startDateTime).getTime()) / 60000) + ' min' : '',
                escape(apt.meetingType),
                escape(apt.status),
                escape(apt.price?.toString()),
                escape(apt.paymentMethod)
            ].join(',');
        });

        const csvContent = [headers.join(','), ...csvRows].join('\n');
        
        // Trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `appointments_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.dismiss(toastId);
        toast.success(`Exported ${response.appointments.length} appointments`);
        
    } catch (err) {
        console.error('Export failed:', err);
        toast.error('Failed to export CSV');
    }
  };

  // Fetch appointments on mount
  const loadData = async () => {
    // Wait for timezone to be fetched FIRST before loading appointments (only on first load if not ready)
    if (!timezoneReady) {
        try {
            await refreshTimezone();
        } catch (tzError) {
            console.error('AppointmentsPage: Failed to fetch timezone:', tzError);
        }
        setTimezoneReady(true);
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const token = getToken();
      if (!token) {
        setError('Authentication required. Please log in.');
        setIsLoading(false);
        return;
      }

      const { startDate: rangeStart, endDate: rangeEnd } = getDateRangeParams();

      const role = getRoleFromToken(token);
      const userId = getUserIdFromToken(token);
      
      let apiStaffIds: number[] | undefined = undefined;
      if (role === 'Staff' && userId) {
          apiStaffIds = [userId];
      } else if (selectedStaff.length > 0) {
          apiStaffIds = selectedStaff;
      }

      // Fetch appointments with server-side pagination, sorting, and filtering
      const response = await getAppointments({
          startDate: rangeStart,
          endDate: rangeEnd,
          page: currentPage,
          pageSize: itemsPerPage,
          sortBy: sortField,
          sortDirection: sortOrder,
          searchTerm: searchTerm,
          status: filterStatus === 'all' ? undefined : filterStatus,
          staffIds: apiStaffIds,
      }, token);
      
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
        notes: apt.notes,
      }));
      
      setAppointments(mappedAppointments);
      setTotalItems(response.totalCount);
      
    } catch (err) {
      console.error('Error loading appointments:', err);
      setError(err instanceof Error ? err.message : 'Failed to load appointments');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load for aux data (staff, services, customers)
  useEffect(() => {
    const fetchAuxData = async () => {
         try {
          const staffData = await fetchStaff();
          const activeStaff = staffData.filter((s: any) => s.isActive !== false);
          setStaffList(activeStaff.map((s: any) => ({ 
            id: s.id, 
            name: `${s.firstName} ${s.lastName}` 
          })));
        } catch (e) {
             console.error('Failed to load staff:', e);
        }
        
        try {
          const servicesRaw = await fetchServices();
          const servicesData = Array.isArray(servicesRaw) ? servicesRaw : (servicesRaw.items || []);
          setServicesList(servicesData.map((s: any) => ({
            id: s.id,
            name: s.name,
            price: s.price,
            duration: s.serviceDuration || 60
          })));
        } catch (e) {
          console.error('Failed to load services:', e);
        }

        try {
          // Fetch customers for dropdown (fetching a larger page to ensure we get most for now, ideally would be searchable)
          const customersData = await fetchCustomers({ pageSize: 1000 });
          setCustomersList(customersData.customers);
        } catch (e) {
          console.error('Failed to load customers:', e);
        }
    };
    fetchAuxData();
    // refreshTimezone is called in loadData
  }, []);

  // Reload appointments when filter/sort/pagination changes
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, sortField, sortOrder, filterStatus, selectedStaff, dateRangeFilter, customStartDate, customEndDate]); 

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
        setCurrentPage(1); // Reset to page 1 on search
        loadData();
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);





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
    paymentMethod: 'Card',
    status: 'Pending',
    notes: '',

    isRecurring: false,
    recurrenceType: 'none',
    repeatEndDate: '',
    price: '',
  });

  // Validation State
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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
    if (!newAppointment.price.trim()) errors.price = "Price is required";

    if (newAppointment.isRecurring) {
        if (!newAppointment.recurrenceType || newAppointment.recurrenceType === 'none') {
            errors.recurrenceType = 'Frequency is required';
        }
        if (!newAppointment.repeatEndDate) {
            errors.repeatEndDate = 'End date is required';
        }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };



  // REMOVED filteredAppointments - using server data directly
  // But we might need totalPages for UI
  const totalPages = Math.ceil(totalItems / itemsPerPage);


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

  const handleStatusUpdate = async (id: number, newStatus: Appointment['status']) => {
    try {
      const token = getToken() || '';
      // Fetch the existing appointment to get name parts if needed, 
      // but since UpdateAppointmentRequest handles optional fields, we try partial update first.
      await updateAppointment(id, { status: newStatus }, token);
      loadData(); // Refresh the list
      setSelectedAppointment(null);
    } catch (err: any) {
      console.error('Failed to update status:', err);
      toast.error(`Failed to update status: ${err.message}`);
    }
  };

  const confirmCancelAppointment = () => {
    if (cancelAppointmentId) {
      handleStatusUpdate(cancelAppointmentId, 'Cancelled');
      setCancelAppointmentId(null);
    }
  };

  const handleCancelAppointment = (id: number) => {
     setCancelAppointmentId(id);
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
      meetingType: 'InPerson',
      paymentMethod: 'Card',
      status: 'Pending',
      notes: '',

      isRecurring: false,
      recurrenceType: 'none',
      repeatEndDate: '',
      price: '',
    });
    setSearchClient('');
    setShowClientDropdown(false);
    setFormErrors({});
  };

  // Handle selecting a client from the dropdown
  const handleClientSelect = (client: CustomerResponse) => {
    setNewAppointment({
      ...newAppointment,
      customerName: client.name,
      customerEmail: client.email,
      customerPhone: client.phone || '',
    });
    setSearchClient(client.name);
    setShowClientDropdown(false);
    setFormErrors(prev => ({ ...prev, customerName: '', customerEmail: '' }));
  };

  // Filter clients based on search term
  const filteredClients = customersList.filter(client =>
    client.name.toLowerCase().includes(searchClient.toLowerCase()) ||
    client.email.toLowerCase().includes(searchClient.toLowerCase())
  );

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

  const handleModalSubmit = async (data: NewAppointment) => {
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

    const service = servicesList.find(s => s.id === data.serviceId);
    const staff = staffList.find(s => s.id === data.staffId); // data.staffId is number, find by id

    if (!service || (data.staffId && !staff)) {
        // Note: staff might be 0/null if unassigned allowed? data.staffId is number.
        // If data.staffId is required and > 0 check:
         if (data.staffId > 0 && !staff) {
             toast.error('Invalid staff selection');
             return;
         }
    }
   
    // EDIT MODE - Update existing appointment
    if (editingAppointmentId !== null && data.id) {
       // ... existing update logic adapted ...
      try {
            const dateTime = combineDateTimeToUTC(
            data.date,
            data.time,
            activeTimezone
        );
        
        const nameParts = data.customerName.trim().split(/\s+/);
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || '.';
        
        await updateAppointment(data.id, {
            firstName,
            lastName,
            email: data.customerEmail,
            phone: data.customerPhone,
            serviceId: data.serviceId,
            staffId: data.staffId || null,
            startTime: dateTime,
            meetingType: data.meetingType,
            paymentMethod: data.paymentMethod,
            status: data.status,
            notes: data.notes
        }, getToken() || '');

        // Refresh list
        loadData(); // Re-use loadData or the existing logic
        setShowAddModal(false);
        setEditingAppointmentId(null);
        resetNewAppointmentForm();
      } catch (err: any) {
        toast.error(`Failed to update appointment: ${err.message}`);
      }
      return;
    }

    // ADD MODE - Create new appointment(s)
    try {
        const [y, m, d_part] = data.date.split('-').map(Number);
        const baseDate = new Date(Date.UTC(y, m - 1, d_part));
        
        const createSingleAppointment = async (occurrenceDate: Date) => {
          const datePart = occurrenceDate.toISOString().split('T')[0];
          const dateTime = combineDateTimeToUTC(
            datePart,
            data.time,
            activeTimezone
          );
          
          const companyId = getCompanyIdFromToken(getToken() || '') || 0;

          const nameParts = data.customerName.trim().split(/\s+/);
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(' ') || '.';

          await createAppointment({
             companyId,
             firstName,
             lastName,
             email: data.customerEmail,
             phone: data.customerPhone,
             serviceId: data.serviceId,
             staffId: data.staffId || null,
             startTime: dateTime, // Use generated UTC string
             meetingType: data.meetingType,
             paymentMethod: data.paymentMethod as any,
             notes: data.notes
          });
        };

        if (!data.isRecurring) {
          // Just one appointment
          await createSingleAppointment(baseDate);
        } else {
          // Repeat until end date
          if (!data.repeatEndDate) throw new Error("Repeat end date required");
          const endDate = new Date(`${data.repeatEndDate}T23:59:59`);
          let occurrenceDate = baseDate;
          let occurrenceIndex = 0;
          const MAX_OCCURRENCES = 50; 

          while (occurrenceDate <= endDate && occurrenceIndex < MAX_OCCURRENCES) {
             await createSingleAppointment(occurrenceDate);

             // Move to next occurrence
             switch (data.recurrenceType) {
               case 'daily': occurrenceDate = addDays(occurrenceDate, 1); break;
               case 'weekly': occurrenceDate = addDays(occurrenceDate, 7); break;
               case 'monthly': occurrenceDate = addMonths(occurrenceDate, 1); break;
               default: occurrenceDate = addDays(endDate, 1); break;
             }
             occurrenceIndex++;
          }
        }

        loadData(); // Reload
        setShowAddModal(false);
        resetNewAppointmentForm();
        toast.success('Appointment(s) created successfully');

    } catch (err: any) {
        console.error(err);
        toast.error(`Failed to create appointment: ${err.message}`);
    }
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
      price: appointment.price ? String(appointment.price) : '',
    });

    setEditingAppointmentId(appointment.id);
    setShowAddModal(true);
  };



  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  // Show loading state - wait for timezone AND appointments to load
  // Only show full page loader if timezone is not ready or if it's the very first load
  if (!timezoneReady || (isLoading && appointments.length === 0 && !searchTerm)) {
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
    <div className="px-8 md:px-8">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
           
          {/* Timezone Indicator */}
          {/* <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <Globe className="w-4 h-4" />
            <span>Times shown in {timezoneDisplay} ({timezoneOffset})</span>
            <span className="text-xs bg-gray-100 px-1 rounded">Debug: {timezone}</span>
          </div> */}
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
            {/* Date Range Filter */}
            <div className="relative">
              <button
                onClick={() => setShowCustomDatePicker(!showCustomDatePicker)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CalendarDays className="w-4 h-4" />
                {dateRangeFilter === 'any_time' ? 'Any Time' :
                 dateRangeFilter === 'yesterday' ? 'Yesterday' :
                 dateRangeFilter === 'today' ? 'Today' :
                 dateRangeFilter === 'this_week' ? 'This Week' :
                 dateRangeFilter === 'this_month' ? 'This Month' :
                 dateRangeFilter === 'this_year' ? 'This Year' :
                 dateRangeFilter === 'custom' ? 'Custom' : 'Any Time'}
                <ChevronDown className="w-4 h-4" />
              </button>
              {showCustomDatePicker && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                  <div className="p-3 space-y-1">
                    {/* Show preset options only when NOT in custom mode */}
                    {dateRangeFilter !== 'custom' ? (
                      <>
                        {/* Preset Options */}
                        {[
                          { value: 'any_time', label: 'Any Time' },
                          { value: 'yesterday', label: 'Yesterday' },
                          { value: 'today', label: 'Today' },
                          { value: 'this_week', label: 'This Week' },
                          { value: 'this_month', label: 'This Month' },
                          { value: 'this_year', label: 'This Year' },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setDateRangeFilter(option.value);
                              setShowCustomDatePicker(false);
                              setCurrentPage(1);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                              dateRangeFilter === option.value 
                                ? 'bg-indigo-100 text-indigo-700' 
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                        
                        {/* Custom Option */}
                        <div className="border-t border-gray-200 pt-2 mt-2">
                          <button
                            onClick={() => setDateRangeFilter('custom')}
                            className="w-full text-left px-3 py-2 rounded-lg transition-colors hover:bg-gray-50"
                          >
                            Custom Range
                          </button>
                        </div>
                      </>
                    ) : (
                      /* Custom Date Range Picker */
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <CalendarDays className="w-5 h-5 text-indigo-600" />
                          <span className="font-medium text-gray-700">Custom Date Range</span>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                          <input
                            type="date"
                            value={customStartDate}
                            onChange={(e) => setCustomStartDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">End Date</label>
                          <input
                            type="date"
                            value={customEndDate}
                            onChange={(e) => setCustomEndDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => {
                              setDateRangeFilter('any_time');
                            }}
                            className="flex-1 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              if (customStartDate && customEndDate) {
                                setShowCustomDatePicker(false);
                                setCurrentPage(1);
                              }
                            }}
                            disabled={!customStartDate || !customEndDate}
                            className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Staff Filter */}
            {!(getRoleFromToken(getToken() || '') === 'Staff') && (
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
            )}
            {/* Export CSV Button */}
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              title="Export filtered appointments to CSV"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>

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
              {/* Show loading spinner in table when refreshing data */}
              {isLoading && (
                  <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                          <div className="flex justify-center items-center gap-2">
                              <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                              <span>Loading...</span>
                          </div>
                      </td>
                  </tr>
              )}
              {!isLoading && appointments.map((appointment) => {
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
        
        {/* Pagination Controls */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">
              Showing <span className="font-medium">{totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="font-medium">{totalItems}</span> results
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="ml-4 text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || isLoading}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0 || isLoading}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-5 border-b border-emerald-600/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl md:text-2xl font-semibold text-white">
                      Appointment Details
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                        selectedAppointment.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : selectedAppointment.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {selectedAppointment.status}
                    </span>
                  </div>
                  <p className="text-emerald-50 text-sm mt-0.5">
                    View complete information about this scheduled appointment
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-white hover:rotate-90"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50/50">
              <div className="space-y-6">
                {/* Customer Information Section */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden text-sm">
                  <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <div className="p-1.5 bg-emerald-100 rounded-lg">
                        <User className="w-4 h-4 text-emerald-600" />
                      </div>
                      Customer Information
                    </h3>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</p>
                        <p className="text-base font-semibold text-gray-900">{selectedAppointment.customerName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</p>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <p className="text-base font-semibold text-gray-900">{selectedAppointment.customerEmail}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</p>
                        <div className="flex items-center gap-2 text-gray-700">
                          <PhoneIcon className="w-4 h-4 text-gray-400" />
                          <p className="text-base font-semibold text-gray-900">{selectedAppointment.customerPhone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appointment Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Service & Staff */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden text-sm">
                    <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <div className="p-1.5 bg-blue-100 rounded-lg">
                          <Briefcase className="w-4 h-4 text-blue-600" />
                        </div>
                        Service Details
                      </h3>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-gray-500">Service</span>
                        <span className="font-semibold text-gray-900">{selectedAppointment.serviceName}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-gray-500">Staff Member</span>
                        <div className="flex items-center gap-2">
                         
                          <span className="font-semibold text-gray-900">{selectedAppointment.staffName}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-500">Meeting Type</span>
                        <div className="flex items-center gap-2">
                          {selectedAppointment.meetingType === 'Zoom' && <div className="p-1.5 bg-indigo-100 rounded-lg"><Video className="w-4 h-4 text-indigo-600" /></div>}
                          {selectedAppointment.meetingType === 'InPerson' && <div className="p-1.5 bg-blue-100 rounded-lg"><MapPin className="w-4 h-4 text-blue-600" /></div>}
                          {selectedAppointment.meetingType === 'Phone' && <div className="p-1.5 bg-green-100 rounded-lg"><PhoneIcon className="w-4 h-4 text-green-600" /></div>}
                          <span className="font-semibold text-gray-900 capitalize">{selectedAppointment.meetingType}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Schedule & Payment */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden text-sm">
                    <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <div className="p-1.5 bg-amber-100 rounded-lg">
                          <DollarSign className="w-4 h-4 text-amber-600" />
                        </div>
                        Schedule & Payment
                      </h3>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-gray-500">Date & Time</span>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatDate(selectedAppointment.startDateTime, timezone)}</p>
                          <p className="text-xs text-gray-500">{formatTime(selectedAppointment.startDateTime, timezone)} ({selectedAppointment.duration || 60} min)</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-gray-500">Price</span>
                        <span className="font-bold text-emerald-600 text-lg">
                          ${selectedAppointment.price} <span className="text-xs text-gray-400 font-normal underline decoration-dotted">{selectedAppointment.currencyCode}</span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-500">Payment</span>
                        <div className="flex flex-col items-end">
                          <span className="font-semibold text-gray-900 capitalize">{selectedAppointment.paymentMethod.replace('-', ' ')}</span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-md font-bold uppercase mt-1">
                            {selectedAppointment.paymentStatus || 'Awaiting'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Details Section if needed */}
                {selectedAppointment.notes && (
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden text-sm">
                    <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-100 rounded-lg">
                          <FileText className="w-4 h-4 text-indigo-600" />
                        </div>
                        Additional Notes
                      </h3>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-700 leading-relaxed italic">
                        "{selectedAppointment.notes || 'No additional notes provided for this appointment.'}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-white flex gap-3">
              <button
                onClick={() => handleStatusUpdate(selectedAppointment.id, 'Confirmed')}
                className="flex-1 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium uppercase tracking-wide text-xs shadow-sm hover:shadow-md"
              >
                Confirm Appointment
              </button>
              <button
                onClick={() => handleCancelAppointment(selectedAppointment.id)}
                className="flex-1 px-5 py-2.5 bg-red-50 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all font-medium uppercase tracking-wide text-xs"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      <AppointmentFormModal 
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingAppointmentId(null);
          resetNewAppointmentForm();
        }}
        onSubmit={handleModalSubmit}
        initialData={
          editingAppointmentId 
            ? { ...newAppointment, id: editingAppointmentId } 
            : undefined
        }
        editMode={!!editingAppointmentId}
        staffList={staffList}
        servicesList={servicesList}
        customersList={customersList.map(c => ({
          id: c.id,
          name: c.name,
          email: c.email,
          phone: c.phone || undefined
        }))}
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
