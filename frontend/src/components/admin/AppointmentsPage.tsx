import { useState, useEffect, useRef } from 'react';
import { MiniCalendar } from './MiniCalendar';
import { AppointmentFormModal, NewAppointment, StaffOption, ServiceOption, CustomerOption } from './AppointmentFormModal';
import { AdminRescheduleFlow } from './AdminRescheduleFlow';
import { Search, Calendar, Clock, MapPin, X, Filter, Plus, Pencil, Edit2, Eye, Save, XCircle, ChevronDown, Phone as PhoneIcon, Mail, User, Loader2, Globe, DollarSign, CalendarDays, Briefcase, FileText, Video, Download, CalendarX, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from '../ui/button';
import { useTimezone } from '../../context/TimezoneContext';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../ui/hover-card';
import { formatDate, formatTime, formatDateTime, combineDateTimeToUTC, getTimezoneOffset, getDateString, getTimeString } from '../../utils/datetime';
import type { Appointment } from '../../types/types';
import { getAppointments, AppointmentResponse, createAppointment, updateAppointment } from '../../services/appointmentApi';
import { fetchServices } from '../../services/serviceApi';
import { fetchStaff } from '../../services/staffApi';
import { fetchCustomers, CustomerResponse } from '../../services/customerApi';
import { getToken, getCompanyIdFromToken, getRoleFromToken, getUserIdFromToken } from '../../utils/auth';
import { Skeleton } from '../ui/skeleton';
import { TableSkeleton } from '../ui/TableSkeleton';
import { DateInput } from '../ui/DateInput';


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
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Appointment | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStaffFilter, setShowStaffFilter] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<number[]>([]);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Helper to get current user info
  const token = getToken();
  const currentUserRole = token ? getRoleFromToken(token) : null;
  const currentUserId = token ? getUserIdFromToken(token) : null;
  
  // Date Range Filter State
  const [dateRangeFilter, setDateRangeFilter] = useState<string>('upcoming');
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
  const [showRescheduleFlow, setShowRescheduleFlow] = useState(false);
  const [rescheduleTarget, setRescheduleTarget] = useState<Appointment | null>(null);
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
      case 'upcoming': {
        const todayStart = new Date(now);
        todayStart.setHours(0, 0, 0, 0);
        
        const thirtyDaysLater = new Date(now);
        thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
        thirtyDaysLater.setHours(23, 59, 59, 999);
        
        startDate = todayStart.toISOString();
        endDate = thirtyDaysLater.toISOString();
        break;
      }
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
        if (customStartDate || customEndDate) {
          if (customStartDate) {
            // Parse mm/dd/yyyy format
            const [startMonth, startDay, startYear] = customStartDate.split('/').map(Number);
            if (startMonth && startDay && startYear) {
              const customStart = new Date(startYear, startMonth - 1, startDay, 0, 0, 0, 0);
              startDate = customStart.toISOString();
            }
          } else {
            startDate = new Date('2020-01-01').toISOString();
          }
          
          if (customEndDate) {
            // Parse mm/dd/yyyy format
            const [endMonth, endDay, endYear] = customEndDate.split('/').map(Number);
            if (endMonth && endDay && endYear) {
              const customEnd = new Date(endYear, endMonth - 1, endDay, 23, 59, 59, 999);
              endDate = customEnd.toISOString();
            }
          }
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
      
      setError(null);
      
      if (!token) {
        setError('Authentication required. Please log in.');
        setIsLoading(false);
        return;
      }

      const { startDate: rangeStart, endDate: rangeEnd } = getDateRangeParams();

      // Use the component-level vars or re-fetch for safety inside async
      const role = currentUserRole; 
      const userId = currentUserId;
      
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
            name: `${s.firstName} ${s.lastName}`,
            serviceIds: s.services?.map((svc: any) => svc.serviceId) || []
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
    status: 'Confirmed',
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

  const handleStatusUpdate = async (id: number, newStatus: Appointment['status'], notes?: string) => {
    try {
      const token = getToken() || '';
      // Fetch the existing appointment to get name parts if needed, 
      // but since UpdateAppointmentRequest handles optional fields, we try partial update first.
      await updateAppointment(id, { status: newStatus, notes: notes }, token);
      loadData(); // Refresh the list
      setSelectedAppointment(null);
    } catch (err: any) {
      console.error('Failed to update status:', err);
      toast.error(`Failed to update status: ${err.message}`);
    }
  };

  const confirmCancelAppointment = async () => {
    if (cancelAppointmentId) {
      setIsCancelling(true);
      try {
        await handleStatusUpdate(cancelAppointmentId, 'Cancelled', cancelReason);
        setCancelAppointmentId(null);
        setCancelReason('');
        toast.success("Appointment cancelled successfully");
      } finally {
        setIsCancelling(false);
      }
    }
  };

  const handleCancelAppointment = (id: number) => {
     setCancelReason('');
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
      status: 'Confirmed',
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
            notes: data.notes,
            price: data.price ? parseFloat(data.price) : undefined,
            duration: data.duration
        }, getToken() || '');

        toast.success('Appointment updated successfully');
        
        // Refresh list and close modal
        await loadData();
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
             notes: data.notes,
             status: data.status,
             duration: data.duration
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
        
        // Clear filters to ensure the new appointment is visible
        setSearchTerm('');
        setFilterStatus('all');
        
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

  // Reschedule appointment (Dedicated Flow)
  const handleReschedule = (appointment: Appointment) => {
    setRescheduleTarget(appointment);
    setSelectedAppointment(null); // Close the detail modal
    setShowRescheduleFlow(true);
  };



  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  // Show loading state - wait for timezone AND appointments to load
  // Only show full page loader if timezone is not ready or if it's the very first load
  if (!timezoneReady || (isLoading && appointments.length === 0 && !searchTerm)) {
    return (
      <div className="px-8 md:px-8">
        {/* Filter skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <Skeleton className="h-10 w-full md:max-w-md bg-gray-200" />
            <Skeleton className="h-10 w-40 bg-gray-200" />
          </div>
        </div>
        {/* Table skeleton */}
        <TableSkeleton rows={8} columns={6} />
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5 mb-8">
        <div className="flex flex-col space-y-4">
          
          {/* Top Row: Search and New Appointment */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              />
            </div>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md w-full md:w-auto justify-center font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>New Appointment</span>
            </button>
          </div>

          {/* Bottom Row: Status and Action Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between pt-2 border-t border-gray-50">
            
            {/* Status Tabs/Pills */}
            <div className="flex p-1 bg-gray-100 rounded-xl w-full lg:w-auto">
              {[
                { id: 'all', label: 'All' },
                { id: 'Confirmed', label: 'Confirmed' },
                { id: 'Pending', label: 'Pending' }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setFilterStatus(pill.id as any)}
                  className={`flex-1 lg:flex-none px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === pill.id
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Action Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {/* Date Range Filter */}
              <div className="relative flex-1 lg:flex-none">
                <button
                  onClick={() => setShowCustomDatePicker(!showCustomDatePicker)}
                  className="flex items-center justify-between gap-2 w-full px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-indigo-500" />
                    <span>
                      {dateRangeFilter === 'upcoming' ? 'Upcoming (30 Days)' :
                       dateRangeFilter === 'any_time' ? 'Any Time' :
                       dateRangeFilter === 'yesterday' ? 'Yesterday' :
                       dateRangeFilter === 'today' ? 'Today' :
                       dateRangeFilter === 'this_week' ? 'This Week' :
                       dateRangeFilter === 'this_month' ? 'This Month' :
                       dateRangeFilter === 'this_year' ? 'This Year' :
                       dateRangeFilter === 'custom' ? 'Custom Range' : 'Any Time'}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {showCustomDatePicker && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-30 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-3 space-y-1">
                      {dateRangeFilter !== 'custom' ? (
                        <>
                          {[
                            { value: 'upcoming', label: 'Upcoming (30 Days)' },
                            { value: 'today', label: 'Today' },
                            { value: 'this_week', label: 'This Week' },
                            { value: 'this_month', label: 'This Month' },
                            { value: 'any_time', label: 'Any Time' },
                            { value: 'yesterday', label: 'Yesterday' },
                            { value: 'this_year', label: 'This Year' },
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setDateRangeFilter(option.value);
                                setShowCustomDatePicker(false);
                                setCurrentPage(1);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                                dateRangeFilter === option.value 
                                  ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                          <div className="border-t border-gray-100 pt-2 mt-2">
                            <button
                              onClick={() => setDateRangeFilter('custom')}
                              className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                            >
                              <span>Custom Range</span>
                              <ChevronDown className="w-4 h-4 -rotate-90 opacity-40" />
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-3 p-1">
                          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-50">
                            <button onClick={() => setDateRangeFilter('upcoming')} className="p-1 hover:bg-gray-100 rounded-full">
                               <ChevronDown className="w-4 h-4 rotate-90" />
                            </button>
                            <span className="font-semibold text-gray-800 text-sm">Select Range</span>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
                            <DateInput
                              value={customStartDate}
                              onChange={setCustomStartDate}
                              placeholder="mm/dd/yyyy"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">End Date</label>
                            <DateInput
                              value={customEndDate}
                              onChange={setCustomEndDate}
                              placeholder="mm/dd/yyyy"
                            />
                          </div>
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => setDateRangeFilter('upcoming')}
                              className="flex-1 px-3 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 text-xs font-semibold"
                            >
                              Back
                            </button>
                            <button
                              onClick={() => {
                                if (customStartDate || customEndDate) {
                                  setShowCustomDatePicker(false);
                                  setCurrentPage(1);
                                }
                              }}
                              disabled={!customStartDate && !customEndDate}
                              className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold shadow-sm"
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
                <div className="relative flex-1 lg:flex-none">
                  <button
                    onClick={() => setShowStaffFilter(!showStaffFilter)}
                    className="flex items-center justify-between gap-2 w-full px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-indigo-500" />
                      <span>Staff {selectedStaff.length > 0 ? `(${selectedStaff.length})` : ''}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  {showStaffFilter && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-30 animate-in fade-in zoom-in-95 duration-150 p-2">
                      <div className="max-h-60 overflow-y-auto space-y-1">
                        {staffList.map((staff: StaffOption) => (
                          <label
                            key={staff.id}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={selectedStaff.includes(staff.id)}
                              onChange={() => toggleStaff(staff.id)}
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition-all"
                            />
                            <span className="text-sm font-medium text-gray-700">{staff.name}</span>
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
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium flex-1 lg:flex-none"
                title="Export filtered appointments to CSV"
              >
                <Download className="w-4 h-4 text-gray-400" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
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
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          <div className="flex justify-center items-center gap-2">
                              <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                              <span>Loading...</span>
                          </div>
                      </td>
                  </tr>
              )}
              {!isLoading && appointments.map((appointment) => {
                const isEditingRow = editingId === appointment.id;
                const rowData = isEditingRow && editedData ? editedData : appointment;

                return (
                  <tr key={appointment.id} className={`hover:bg-gray-50 transition-colors ${isEditingRow ? 'bg-blue-50' : ''}`}>
                    <td className="px-4 md:px-6 py-4">
                      {isEditingRow ? (
                        <input
                          type="text"
                          value={rowData.customerName}
                          onChange={(e) => setEditedData({ ...rowData, customerName: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <div>
                          <p className="font-medium">{rowData.customerName}</p>
                          <p className="text-sm text-gray-600">{rowData.customerEmail}</p>
                          <p className="text-sm text-gray-600">{rowData.customerPhone}</p>
                        </div>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <p>{rowData.serviceName}</p>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <p>{rowData.staffName}</p>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-gray-900 font-semibold">
                          <Calendar className="w-4 h-4 text-indigo-500" />
                          <span className="text-sm">{formatDate(appointment.startDateTime, timezone)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div className="flex items-center gap-1.5 text-xs">
                            <span>{formatTime(appointment.startDateTime, timezone)}</span>
                            <span className="text-gray-400 px-1.5 py-0.5 bg-gray-50 rounded border border-gray-100 font-medium">
                              {appointment.duration || 60} min
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${rowData.status === 'Confirmed'
                          ? 'bg-green-100 text-green-700'
                          : rowData.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {rowData.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      {isEditingRow ? (
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
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEditModal(appointment)}
                            className="p-2 text-indigo-600 hover:text-white hover:bg-indigo-600 hover:shadow-md active:scale-95 rounded-md transition-all duration-200"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                           <button
                            onClick={() => setSelectedAppointment(appointment)}
                            className="p-2 text-indigo-600 hover:text-white hover:bg-indigo-600 hover:shadow-md active:scale-95 rounded-md transition-all duration-200"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
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
             <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0 || isLoading}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
             <ChevronRight className="w-4 h-4" />
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-6">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</p>
                        <div className="flex items-center gap-2 text-gray-700">
                          <User className="w-4 h-4 text-indigo-500" />
                          <p className="text-base font-semibold text-gray-900">{selectedAppointment.customerName}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</p>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail className="w-4 h-4 text-indigo-500" />
                          <HoverCard openDelay={0} closeDelay={100}>
                            <HoverCardTrigger asChild>
                              <p className="text-base font-semibold text-gray-900 cursor-help">
                                {selectedAppointment.customerEmail.split('@')[0]}@...
                              </p>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-fit p-3 bg-gray-900 border-gray-800 text-white shadow-xl">
                              <p className="text-sm font-medium select-text">
                                {selectedAppointment.customerEmail}
                              </p>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</p>
                        <div className="flex items-center gap-2 text-gray-700">
                          <PhoneIcon className="w-4 h-4 text-indigo-500" />
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
            {selectedAppointment.status !== 'Cancelled' && (
              <div className="px-6 py-4 border-t border-gray-200 bg-white flex gap-3">
                {selectedAppointment.status === 'Pending' && (
                  <button
                    onClick={() => handleStatusUpdate(selectedAppointment.id, 'Confirmed')}
                    className="flex-1 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium uppercase tracking-wide text-xs shadow-sm hover:shadow-md"
                  >
                    Confirm Appointment
                  </button>
                )}
                {selectedAppointment.status === 'Confirmed' && (
                  <button
                    onClick={() => handleReschedule(selectedAppointment)}
                    className="flex-1 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium uppercase tracking-wide text-xs shadow-sm hover:shadow-md"
                  >
                    Reschedule
                  </button>
                )}
                <button
                  onClick={() => handleCancelAppointment(selectedAppointment.id)}
                  className="flex-1 px-5 py-2.5 bg-red-50 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all font-medium uppercase tracking-wide text-xs"
                >
                  Cancel Appointment
                </button>
              </div>
            )}
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
        currentUserRole={currentUserRole || 'Staff'}
        currentUserId={currentUserId || 0}
      />
      
       <Dialog open={!!cancelAppointmentId} onOpenChange={(open) => !open && setCancelAppointmentId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <CalendarX className="w-5 h-5" />
              Cancel Appointment
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea 
              placeholder="Reason for cancellation (optional)"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="min-h-[100px] border-gray-200 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setCancelAppointmentId(null)} className="flex-1">
              Keep Appointment
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmCancelAppointment} 
              disabled={isCancelling}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isCancelling ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showRescheduleFlow && rescheduleTarget && (
        <AdminRescheduleFlow
          appointment={rescheduleTarget}
          timezone={timezone}
          onClose={() => setShowRescheduleFlow(false)}
          onSuccess={() => {
            setShowRescheduleFlow(false);
            loadData(); // Refresh the list
          }}
        />
      )}
    </div>
  );
}
