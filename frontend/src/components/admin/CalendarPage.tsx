import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, User, DollarSign, Search, RefreshCw, Filter, Edit, Trash2, Mail, Phone, Calendar as CalendarIcon, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { fetchServices } from '../../services/serviceApi';
import { fetchStaff } from '../../services/staffApi';
import { fetchCustomers, CustomerResponse } from '../../services/customerApi';
import { getAppointments, createAppointment, deleteAppointment } from '../../services/appointmentApi';
import { Staff, Service } from '../../types/types';
import { getToken, getCompanyIdFromToken } from '../../utils/auth';

const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
];

const DURATIONS = ['30 min', '60 min', '90 min', '120 min'];

const LOCATIONS = ['In Person', 'Phone Call', 'Zoom'];

type ViewMode = 'month' | 'week' | 'day' | 'list' | 'timeline';

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

export function CalendarPage() {
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

  // Popover State
  const [hoveredAppointment, setHoveredAppointment] = useState<CalendarAppointment | null>(null);
  const [popoverPos, setPopoverPos] = useState<{x: number, y: number} | null>(null);
  const popoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Form State
  const [searchClient, setSearchClient] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  
  const [formData, setFormData] = useState({
    id: 0, // For edit mode
    client: '',
    clientEmail: '',
    clientPhone: '',
    currentClientId: 0, 
    service: '',
    currentServiceId: 0,
    staff: '',
    currentStaffId: 0,
    time: '',
    duration: '',
    location: 'In Person',
    price: '',
    notes: ''
  });

  // Helper to assign colors to staff
  const getStaffColor = (index: number) => {
    const colors = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    return colors[index % colors.length];
  };

  // Fetch Metadata (Staff, Services, Customers)
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const [staffData, serviceData, customerData] = await Promise.all([
          fetchStaff(),
          fetchServices(),
          fetchCustomers()
        ]);

        // Map Staff to CalendarStaff
        const mappedStaff: CalendarStaff[] = staffData.map((s, index) => ({
            ...s,
            name: `${s.firstName} ${s.lastName}`,
            color: s.avatar ? '#4f46e5' : getStaffColor(index) // Use avatar color logic or default
        }));

        setStaffList(mappedStaff);
        setServices(serviceData);
        setCustomers(customerData);
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
        serviceId: selectedService !== 'all' ? parseInt(selectedService) : undefined // assumes filter uses ID
      }, token);

      // Map API response to UI format
      const mapped: CalendarAppointment[] = data.appointments.map(apt => {
         // Parse UTC date to local for display
         const localDate = new Date(apt.startDateTime);
         const dateStr = localDate.toISOString().split('T')[0];
         const timeStr = localDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
         // Calculate duration roughly
         const end = new Date(apt.endDateTime);
         const diffMin = Math.round((end.getTime() - localDate.getTime()) / 60000);

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

      setAppointments(mapped);
    } catch (error) {
      console.error("Failed to load appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Appointments when date or filters change
  useEffect(() => {
    loadAppointments();
  }, [currentDate, selectedStaff, selectedService]);

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
    const dateStr = date.toISOString().split('T')[0];
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
    } else if (viewMode === 'week' || viewMode === 'timeline') {
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
    } else if (viewMode === 'week' || viewMode === 'timeline') {
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
    } else if (viewMode === 'week' || viewMode === 'timeline') {
      const weekStart = weekDays[0];
      const weekEnd = weekDays[6];
      return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else if (viewMode === 'day') {
      return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } else if (viewMode === 'list') {
      return 'All Appointments';
    }
    return '';
  };

  const handleCloseForm = () => {
    setShowBookingForm(false);
    setFormData({
      id: 0,
      client: '',
      clientEmail: '',
      clientPhone: '',
      currentClientId: 0,
      service: '',
      currentServiceId: 0,
      staff: '',
      currentStaffId: 0,
      time: '',
      duration: '',
      location: 'In Person',
      price: '',
      notes: ''
    });
    setSearchClient('');
  };

  const handleSubmitAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       const companyId = getCompanyIdFromToken(getToken() || "");
       
       // Parse start time
       const timeParts = formData.time.match(/(\d+):(\d+) (AM|PM)/);
       let hours = 0;
       let minutes = 0;
       if (timeParts) {
           hours = parseInt(timeParts[1]);
           minutes = parseInt(timeParts[2]);
           if (timeParts[3] === 'PM' && hours < 12) hours += 12;
           if (timeParts[3] === 'AM' && hours === 12) hours = 0;
       }
       
       const startDateTime = new Date(selectedDate);
       startDateTime.setHours(hours, minutes, 0, 0);
       
       // Fallback for name splitting if client selected from dropdown or typed
       const nameParts = formData.client.trim().split(' ');
       const firstName = nameParts[0] || 'Customer';
       const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Unknown';

       // TODO: Differentiate Create vs Update based on formData.id
       // Assuming create for now as `createAppointment` was used.
       
       await createAppointment({
           companyId: companyId || 0,
           firstName: firstName,
           lastName: lastName,
           email: formData.clientEmail,
           phone: formData.clientPhone,
           serviceId: formData.currentServiceId,
           staffId: formData.currentStaffId,
           startTime: startDateTime.toISOString(),
           meetingType: formData.location as "InPerson" | "Phone" | "Zoom",
           paymentMethod: "Cash",
           notes: formData.notes
       });
       
       alert("Appointment created successfully!");
       handleCloseForm();
       loadAppointments();

    } catch (error: any) {
        alert(`Failed to save appointment: ${error.message}`);
    }
  };

  const handleClientSelect = (client: CustomerResponse) => {
    setFormData({
      ...formData,
      client: client.name,
      clientEmail: client.email,
      clientPhone: client.phone || '',
      currentClientId: client.id
    });
    setSearchClient(client.name);
    setShowClientDropdown(false);
  };

  const filteredClients = customers.filter(client =>
    client.name.toLowerCase().includes(searchClient.toLowerCase()) ||
    client.email.toLowerCase().includes(searchClient.toLowerCase())
  );

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

  const handleDeleteAppointment = async (id: number) => {
      if (!window.confirm("Are you sure you want to delete this appointment?")) return;
      try {
          const token = getToken();
          if (token) {
              await deleteAppointment(id, token);
              // Optimistic update
              setAppointments(prev => prev.filter(a => a.id !== id));
              setHoveredAppointment(null); // Close popover
          }
      } catch(err) {
          alert("Failed to delete appointment");
      }
  };

  const handleEditAppointment = (apt: CalendarAppointment) => {
      // Pre-fill form
      setSelectedDate(new Date(apt.startDateTime)); // Set date for context
      
      // Parse time/duration if cleaner format needed, but direct state should work
      // Check if service/staff IDs are valid in current lists (reload might be needed if they are stale)
      
      setFormData({
          id: apt.id,
          client: apt.client,
          clientEmail: apt.clientEmail || '',
          clientPhone: apt.clientPhone || '',
          currentClientId: 0, 
          service: apt.service,
          currentServiceId: apt.serviceId,
          staff: apt.staff,
          currentStaffId: apt.staffId,
          time: apt.time,
          duration: apt.duration, 
          location: apt.location,
          price: apt.price.replace('$', ''),
          notes: ''
      });
      setSearchClient(apt.client);
      setShowBookingForm(true);
      setHoveredAppointment(null);
  };

  return (
    <div className="p-6 calendar-container relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1>Calendar</h1>
          <p className="text-gray-600 mt-1">View and manage appointments</p>
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
          
          <button 
            onClick={() => {
              setSelectedStaff(null);
              setSelectedService('all');
            }}
            className="p-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-gray-500"
            title="Reset Filters"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Staff Avatars */}
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
                {staff.name.split(' ')[0]} 
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            {viewMode !== 'list' && (
              <>
                <button
                  onClick={previousPeriod}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setCurrentDate(new Date());
                    setSelectedDate(new Date());
                  }}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={nextPeriod}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <h2 className="ml-4">{getPeriodLabel()}</h2>
          </div>

          <div className="flex items-center gap-2">
            {['Month', 'Week', 'Day', 'Timeline', 'List'].map((mode) => (
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
          onCreateAppointment={() => setShowBookingForm(true)}
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
          onCreateAppointment={() => {
            setSelectedDate(currentDate);
            setShowBookingForm(true);
          }}
          staff={staffList}
          onHoverAppointment={handleAppointmentTitleEnter}
          onLeaveAppointment={handleAppointmentLeave}
        />
      )}

      {viewMode === 'timeline' && (
        <TimelineView
          currentDate={currentDate}
          staff={selectedStaff !== null ? staffList.filter(s => s.id === selectedStaff) : staffList}
          appointments={getFilteredAppointments()}
          onCreateAppointment={(date) => {
            setSelectedDate(date);
            setShowBookingForm(true);
          }}
          onHoverAppointment={handleAppointmentTitleEnter}
          onLeaveAppointment={handleAppointmentLeave}
        />
      )}

      {viewMode === 'list' && (
        <ListView
          appointments={getFilteredAppointments()}
          onEdit={handleEditAppointment}
          onDelete={handleDeleteAppointment}
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
                   <button className="p-1.5 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition" title="Link">
                       <LinkIcon className="w-4 h-4" />
                   </button>
                   <button 
                      onClick={() => handleDeleteAppointment(hoveredAppointment.id)}
                      className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition" 
                      title="Delete"
                   >
                       <Trash2 className="w-4 h-4" />
                   </button>
              </div>
          </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2>{formData.id ? 'Edit Appointment' : 'Create Appointment'}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <button
                onClick={handleCloseForm}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitAppointment} className="p-6 space-y-4">
              {/* Client Selection */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Client <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchClient}
                      onChange={(e) => {
                        setSearchClient(e.target.value);
                        setShowClientDropdown(true);
                      }}
                      onFocus={() => setShowClientDropdown(true)}
                      placeholder="Search or enter client name..."
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  {showClientDropdown && filteredClients.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {filteredClients.map((client) => (
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
              </div>

              {/* Client Contact Info */}
              {formData.client && (
                <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="text-sm text-gray-900">{formData.clientEmail}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className="text-sm text-gray-900">{formData.clientPhone}</p>
                  </div>
                </div>
              )}

              {/* Service Selection */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Service <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.currentServiceId}
                  onChange={(e) => {
                     const selected = services.find(s => s.id === parseInt(e.target.value));
                     setFormData({ 
                         ...formData, 
                         service: selected?.name || '', 
                         currentServiceId: selected?.id || 0 
                     });
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  required
                >
                  <option value={0}>Select a service...</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Staff Selection */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Staff Member <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.currentStaffId}
                  onChange={(e) => {
                      const selected = staffList.find(s => s.id === parseInt(e.target.value));
                      setFormData({ 
                          ...formData, 
                          staff: selected?.name || '', 
                          currentStaffId: selected?.id || 0 
                      });
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  required
                >
                  <option value={0}>Select staff...</option>
                  {staffList.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time and Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                    required
                  >
                    <option value="">Select time...</option>
                    {TIME_SLOTS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                    required
                  >
                    <option value="">Select duration...</option>
                    {DURATIONS.map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setFormData({ ...formData, location: loc })}
                      className={`
                        py-2.5 px-4 rounded-lg border-2 transition-all text-sm
                        ${formData.location === loc
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:border-indigo-300 bg-white text-gray-700'
                        }
                      `}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="150.00"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any additional notes..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {formData.id ? 'Update Appointment' : 'Create Appointment'}
                </button>
              </div>
            </form>
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
  onCreateAppointment: () => void;
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
                      // Or just rely on separate button? User asked "by clicking on date it should open create appointment page"
                      if (appointments.length === 0) {
                          onCreateAppointment();
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
                            onCreateAppointment();
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
  onCreateAppointment: () => void;
  staff: CalendarStaff[];
  onHoverAppointment: (e: React.MouseEvent, apt: CalendarAppointment) => void;
  onLeaveAppointment: () => void;
}) {
  const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="space-y-2">
        {timeSlots.map((time) => {
          const apt = appointments.find(a => a.time === time);
          const staffMember = apt ? staff.find(s => s.id === apt.staffId) : null;
          const color = staffMember?.color || '#3b82f6';

          return (
            <div key={time} className="flex items-center gap-4 border-b border-gray-100 pb-2">
              <div className="w-24 text-sm text-gray-600">{time}</div>
              <div className="flex-1">
                {apt ? (
                  <div
                    className="p-3 rounded-lg border-l-4 hover:shadow-md transition-shadow relative"
                    style={{
                      backgroundColor: color + '20',
                      borderLeftColor: color
                    }}
                    onMouseEnter={(e) => onHoverAppointment(e, apt)}
                    onMouseLeave={onLeaveAppointment}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-900">{apt.client}</p>
                        <p className="text-sm text-gray-600 mt-1">{apt.service}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                          <span>{apt.duration}</span>
                          <span>•</span>
                          <span>{apt.location}</span>
                          <span>•</span>
                          <span>{apt.staff}</span>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={onCreateAppointment}
                    className="w-full py-2 text-sm text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors text-left px-3"
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

// Timeline View Component
function TimelineView({
  currentDate,
  staff,
  appointments,
  onCreateAppointment,
  onHoverAppointment,
  onLeaveAppointment
}: {
  currentDate: Date;
  staff: CalendarStaff[];
  appointments: CalendarAppointment[];
  onCreateAppointment: (date: Date) => void;
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
      <div className="min-w-[1000px] p-6">
        <div className="grid grid-cols-[150px_1fr] gap-4">
          <div className="pt-12">
            {staff.map((s) => (
              <div key={s.id} className="h-20 flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: s.color || '#3b82f6' }}
                >
                  {s.avatar || s.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700">{s.name}</span>
              </div>
            ))}
          </div>
          
          <div>
            <div className="grid grid-cols-7 mb-4">
              {weekDays.map((day, i) => (
                <div key={i} className="text-center">
                  <div className="text-sm text-gray-600">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-lg font-medium text-gray-900">
                    {day.getDate()}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative">
              {staff.map((s) => (
                <div key={s.id} className="h-20 border-t border-gray-100 grid grid-cols-7">
                  {weekDays.map((day, i) => {
                    const dateStr = day.toISOString().split('T')[0];
                    const dayApts = appointments.filter(
                      a => a.staffId === s.id && a.date === dateStr
                    );
                    
                    return (
                      <div
                        key={i}
                        className="border-l border-gray-100 p-1 relative group hover:bg-gray-50 transition-colors"
                        onClick={() => onCreateAppointment(day)}
                      >
                         {/* <div className="absolute inset-0 hover:bg-gray-50 transition-colors cursor-pointer" /> */}
                         {dayApts.map((apt) => (
                           <div
                             key={apt.id}
                             className="relative z-10 text-[10px] p-1 rounded mb-1 truncate cursor-pointer hover:opacity-80"
                             style={{ backgroundColor: (s.color || '#3b82f6') + '40', color: '#1e3a8a' }}
                             title={`${apt.time} - ${apt.client}`}
                             onClick={(e) => e.stopPropagation()}
                             onMouseEnter={(e) => onHoverAppointment(e, apt)}
                             onMouseLeave={onLeaveAppointment}
                           >
                             {apt.time}
                           </div>
                         ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// List View Component
function ListView({
  appointments,
  onEdit,
  onDelete
}: {
  appointments: CalendarAppointment[];
  onEdit: (apt: CalendarAppointment) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date & Time</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Client</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Service</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Staff</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {appointments.length === 0 ? (
             <tr>
               <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                 No appointments found.
               </td>
             </tr>
          ) : (
             appointments.map((apt) => (
               <tr key={apt.id} className="hover:bg-gray-50">
                 <td className="px-6 py-4">
                   <div className="text-sm font-medium text-gray-900">
                     {new Date(apt.date).toLocaleDateString()}
                   </div>
                   <div className="text-sm text-gray-500">{apt.time}</div>
                 </td>
                 <td className="px-6 py-4">
                   <div className="text-sm text-gray-900">{apt.client}</div>
                   {apt.clientEmail && <div className="text-xs text-gray-500">{apt.clientEmail}</div>}
                   <div className="text-xs text-gray-500">{apt.location}</div>
                 </td>
                 <td className="px-6 py-4">
                   <div className="text-sm text-gray-900">{apt.service}</div>
                   <div className="text-xs text-gray-500">{apt.duration} • {apt.price}</div>
                 </td>
                 <td className="px-6 py-4">
                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                     {apt.staff}
                   </span>
                 </td>
                 <td className="px-6 py-4">
                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                     apt.status === 'confirmed' 
                       ? 'bg-green-100 text-green-800'
                       : apt.status === 'pending'
                       ? 'bg-yellow-100 text-yellow-800'
                       : 'bg-gray-100 text-gray-800'
                   }`}>
                     {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                   </span>
                 </td>
                 <td className="px-6 py-4 text-right space-x-2">
                   <button 
                      onClick={() => onEdit(apt)}
                      className="text-gray-400 hover:text-indigo-600 transition-colors"
                   >
                     <Edit className="w-4 h-4" />
                   </button>
                   <button 
                     onClick={() => onDelete(apt.id)}
                     className="text-gray-400 hover:text-red-600 transition-colors"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                 </td>
               </tr>
             ))
          )}
        </tbody>
      </table>
    </div>
  );
}