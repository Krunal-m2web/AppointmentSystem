import { useState, useEffect } from 'react';
import { Calendar, Clock, User, TrendingUp, DollarSign, Filter, ChevronDown, ExternalLink, Loader2 } from 'lucide-react';
import { AnalyticsChart } from './AnalyticsChart';
import { MiniCalendar } from './MiniCalendar';
import { getToken, getCompanyIdFromToken } from '../../utils/auth';
import { AppointmentResponse, getAppointments } from '../../services/appointmentApi';
import { fetchStaff } from '../../services/staffApi';
import { fetchServices } from '../../services/serviceApi';

// Types
interface DashboardStats {
  totalAppointments: number;
  pendingAppointments: number;
  todayCount: number;
  revenue: number;
}

interface StaffOption {
  id: number;
  name: string;
}

interface ServiceOption {
  id: number;
  name: string;
}

export function DashboardHome() {
  const [showStaffFilter, setShowStaffFilter] = useState(false);
  const [showServiceFilter, setShowServiceFilter] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<number[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState('7days');
  
  // Data State
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    pendingAppointments: 0,
    todayCount: 0,
    revenue: 0
  });
  const [todayAppointments, setTodayAppointments] = useState<AppointmentResponse[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentResponse[]>([]);
  const [chartData, setChartData] = useState<{ date: string; appointments: number; revenue: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Dynamic staff and services from API
  const [staffList, setStaffList] = useState<StaffOption[]>([]);
  const [servicesList, setServicesList] = useState<ServiceOption[]>([]);

  const toggleStaff = (staffId: number) => {
    setSelectedStaff(prev =>
      prev.includes(staffId) ? prev.filter(id => id !== staffId) : [...prev, staffId]
    );
  };

  const toggleService = (serviceId: number) => {
    setSelectedServices(prev =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    );
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getDuration = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    const diffMs = e.getTime() - s.getTime();
    const minutes = Math.floor(diffMs / 60000);
    return `${minutes} min`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = getToken();
        if (!token) {
          throw new Error("Not authenticated");
        }

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        // Fetch staff and services in parallel
        const [staffData, servicesData] = await Promise.all([
          fetchStaff().catch(() => []),
          fetchServices().catch(() => [])
        ]);
        
        setStaffList(staffData.map((s: any) => ({
          id: s.id,
          name: `${s.firstName} ${s.lastName}`
        })));
        
        setServicesList(servicesData.map((s: any) => ({
          id: s.id,
          name: s.name
        })));

        // 1. Fetch Today's Appointments
        const todayRes = await getAppointments({
          startDate: todayStart.toISOString(),
          endDate: todayEnd.toISOString(),
          pageSize: 30 
        }, token);

        // 2. Fetch Upcoming Appointments (Tomorrow onwards)
        const tomorrow = new Date(todayEnd);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0,0,0,0);
        
        const upcomingRes = await getAppointments({
          startDate: tomorrow.toISOString(),
          sortBy: 'date',
          sortDirection: 'asc',
          pageSize: 5
        }, token);

        // 3. Fetch specific counts (Total & Pending)
        const totalRes = await getAppointments({ pageSize: 1 }, token);
        const pendingRes = await getAppointments({ status: 'Pending', pageSize: 1 }, token);

        // 4. Fetch Chart Data (Last 7 Days) for Revenue/History
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0,0,0,0);
        
        const historyRes = await getAppointments({
            startDate: sevenDaysAgo.toISOString(),
            endDate: todayEnd.toISOString(),
            pageSize: 30 
        }, token);

        // Process Chart Data & Revenue
        const processedChart = processChartData(historyRes.appointments);
        const totalRevenue = historyRes.appointments.reduce((sum, appt) => {
          // Only count revenue for confirmed/completed appointments
          if (appt.status === 'Confirmed' || appt.status === 'Completed') {
            return sum + appt.price;
          }
          return sum;
        }, 0);

        setTodayAppointments(todayRes.appointments);
        setUpcomingAppointments(upcomingRes.appointments);
        setChartData(processedChart);
        setStats({
          totalAppointments: totalRes.totalCount,
          pendingAppointments: pendingRes.totalCount,
          todayCount: todayRes.totalCount,
          revenue: totalRevenue
        });

      } catch (err: any) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const processChartData = (appointments: AppointmentResponse[]) => {
    const dailyMap = new Map<string, { appointments: number; revenue: number }>();
    
    // Initialize last 7 days with 0
    for(let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        dailyMap.set(dateStr, { appointments: 0, revenue: 0 });
    }

    appointments.forEach(appt => {
        const dateStr = new Date(appt.startDateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (dailyMap.has(dateStr)) {
            const entry = dailyMap.get(dateStr)!;
            entry.appointments += 1;
            // Add revenue for non-cancelled appointments
            if (appt.status !== 'Cancelled') {
                entry.revenue += appt.price;
            }
        }
    });

    return Array.from(dailyMap.entries()).map(([date, data]) => ({
        date,
        appointments: data.appointments,
        revenue: data.revenue
    }));
  };

  if (isLoading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-4" />
        <p className="text-gray-600">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 font-medium mb-2">Error Loading Dashboard</p>
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
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
           <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
           <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
            <a 
              href={`/?companyId=${getCompanyIdFromToken(getToken() || '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Booking Page
            </a>
            <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100">
              <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">Company ID</p>
              <p className="text-xl font-bold text-indigo-700">{getCompanyIdFromToken(getToken() || '')}</p>
            </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Appointments</p>
              <p className="text-2xl font-bold mt-2">{stats.totalAppointments}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold mt-2">{stats.pendingAppointments}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Appointments</p>
              <p className="text-2xl font-bold mt-2">{stats.todayCount}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue (7 Days)</p>
              <p className="text-2xl font-bold mt-2">${stats.revenue.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg md:text-xl font-semibold">Analytics</h2>
          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="7days">Last 7 Days</option>
            </select>

            {/* Staff Filter - Dynamic */}
            {staffList.length > 0 && (
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
                    <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
                      {staffList.map((staff) => (
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

            {/* Service Filter - Dynamic */}
            {servicesList.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowServiceFilter(!showServiceFilter)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Services {selectedServices.length > 0 && `(${selectedServices.length})`}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showServiceFilter && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
                      {servicesList.map((service) => (
                        <label
                          key={service.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(service.id)}
                            onChange={() => toggleService(service.id)}
                            className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                          />
                          <span className="text-sm">{service.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Appointments & Revenue Chart */}
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-4">Appointments & Revenue (Last 7 Days)</h3>
          <AnalyticsChart data={chartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-lg md:text-xl font-semibold">Today's Appointments</h2>
              <p className="text-sm text-gray-600 mt-1">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="p-4 md:p-6 space-y-4">
              {todayAppointments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No appointments scheduled for today.</p>
              ) : (
                todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="bg-indigo-100 p-3 rounded-lg flex-shrink-0">
                    <Clock className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium truncate">{appointment.customerName}</p>
                        <p className="text-sm text-gray-600">{appointment.serviceName}</p>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
                          appointment.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                          appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          appointment.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                          appointment.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                          }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatTime(appointment.startDateTime)} ({getDuration(appointment.startDateTime, appointment.endDateTime)})
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {appointment.meetingType}
                      </span>
                      {appointment.staffName && (
                        <span className="text-indigo-600">• {appointment.staffName}</span>
                      )}
                    </div>
                  </div>
                </div>
              )))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-4">Calendar</h3>
            <MiniCalendar />
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
            </div>
            <div className="p-4 md:p-6 space-y-4">
              {upcomingAppointments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No upcoming appointments.</p>
              ) : (
                upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <p className="font-medium">{appointment.customerName}</p>
                  <p className="text-sm text-gray-600">{appointment.serviceName}</p>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <span>{new Date(appointment.startDateTime).toLocaleDateString()}</span>
                    <span>{formatTime(appointment.startDateTime)}</span>
                  </div>
                </div>
              )))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
