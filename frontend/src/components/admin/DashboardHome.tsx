import { useState, useEffect } from 'react';
import { Calendar, Clock, User, TrendingUp, DollarSign, Filter, ChevronDown, ExternalLink, Loader2, RefreshCw, ChevronLeft, ChevronRight, CalendarDays, Download, Printer } from 'lucide-react';
import { AnalyticsChart } from './AnalyticsChart';
import { MiniCalendar } from './MiniCalendar';
import { getToken, getCompanyIdFromToken, getRoleFromToken, getUserIdFromToken, getUserNameFromToken } from '../../utils/auth';
import { AppointmentResponse, getAppointments } from '../../services/appointmentApi';
import { fetchStaff } from '../../services/staffApi';
import { fetchServices } from '../../services/serviceApi';
import { getMyCompany } from '../../services/CompanyService';
import { useTimezone } from '../../context/TimezoneContext';
import { formatTime as centralFormatTime, getDateString, combineDateTimeToUTC } from '../../utils/datetime';
import { toast } from 'sonner';

// Types
interface DashboardStats {
  totalAppointments: number;
  pendingAppointments: number;
  todayCount: number;
  revenue: number;
}

// Import Staff type if possible, or define partial
import type { Staff } from '../../types/types';

interface StaffOption {
  id: number;
  name: string;
}

interface ServiceOption {
  id: number;
  name: string;
}

interface TableRowData {
  staffName: string;
  serviceCount: number;
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  cancelled: number;
  customersTotal: number;
  revenue: number;
}

export function DashboardHome() {
  const { timezone, refreshTimezone } = useTimezone();
  const [showStaffFilter, setShowStaffFilter] = useState(false);
  const [showServiceFilter, setShowServiceFilter] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<number[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  // Date & Pagination State
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [listPage, setListPage] = useState(1);
  const [listPageSize, setListPageSize] = useState(7);
  const [listTotalCount, setListTotalCount] = useState(0);

  const [dateRange, setDateRange] = useState('this_week');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [companySlug, setCompanySlug] = useState<string | null>(null);
  
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
  const [tableData, setTableData] = useState<TableRowData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingList, setIsLoadingList] = useState(false); // Specific loader for the list
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Dynamic staff and services from API
  const [staffList, setStaffList] = useState<StaffOption[]>([]);
  const [fullStaffList, setFullStaffList] = useState<Staff[]>([]);
  const [servicesList, setServicesList] = useState<ServiceOption[]>([]);
  const userName = getToken() ? getUserNameFromToken(getToken()!) : 'Admin';

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
    return centralFormatTime(isoString, timezone);
  };

  const getDuration = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    const diffMs = e.getTime() - s.getTime();
    const minutes = Math.floor(diffMs / 60000);
    return `${minutes} min`;
  };

  const getRangeDates = (range: string, now: Date) => {
    const start = new Date(now);
    const end = new Date(now);
    
    // Normalize to start of day for calculations to avoid offsets
    start.setHours(0,0,0,0);
    end.setHours(23,59,59,999);

    if (range === 'this_week') {
      const day = start.getDay(); // 0 is Sunday
      const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday start
      start.setDate(diff);
      end.setDate(diff + 6); 
    } else if (range === 'this_month') {
      start.setDate(1);
      end.setMonth(end.getMonth() + 1, 0); // Last day of month
    } else if (range === 'this_year') {
      start.setMonth(0, 1);
      end.setMonth(11, 31);
    } else if (range === 'custom' && customStartDate && customEndDate) {
      const customStart = new Date(customStartDate);
      const customEnd = new Date(customEndDate);
      customStart.setHours(0,0,0,0);
      customEnd.setHours(23,59,59,999);
      return { start: customStart, end: customEnd };
    }
    
    return { start, end };
  };

  // Helper for client-side filtering
  const filterAppointments = (apts: AppointmentResponse[]) => {
    return apts.filter(a => {
        const staffMatch = selectedStaff.length === 0 || (a.staffId && selectedStaff.includes(a.staffId));
        const serviceMatch = selectedServices.length === 0 || selectedServices.includes(a.serviceId);
        return staffMatch && serviceMatch;
    });
  };

  // Separated Fetch for List to handle pagination & selection independently if needed
  // Merged into verify logic to ensure updates sync
  
  // FIX: Helper function defined BEFORE usage
  const processChartData = (appointments: AppointmentResponse[], start: Date, end: Date) => {
    const dailyMap = new Map<string, { appointments: number; revenue: number }>();
    
    // Fill all dates in range
    const curr = new Date(start);
    const endCalc = new Date(end);
    
    while (curr <= endCalc) {
        const dateStr = curr.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: timezone === 'UTC' ? 'UTC' : undefined });
        
        if (dateRange === 'this_year') {
             // Group by Month for Year view
             const monthStr = curr.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: timezone === 'UTC' ? 'UTC' : undefined });
             if (!dailyMap.has(monthStr)) {
                 dailyMap.set(monthStr, { appointments: 0, revenue: 0 });
             }
             // Increment day
             curr.setDate(curr.getDate() + 1);
        } else {
             // Daily grouping
             dailyMap.set(dateStr, { appointments: 0, revenue: 0 });
             curr.setDate(curr.getDate() + 1);
        }
    }

    appointments.forEach(appt => {
        const apptDate = new Date(appt.startDateTime);
        let key = '';
        
        if (dateRange === 'this_year') {
            key = apptDate.toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric',
                timeZone: timezone === 'UTC' ? 'UTC' : undefined 
            });
        } else {
            key = apptDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                timeZone: timezone === 'UTC' ? 'UTC' : undefined 
            });
        }

        if (dailyMap.has(key)) {
            const entry = dailyMap.get(key)!;
            entry.appointments += 1;
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

  const processTableData = (appointments: AppointmentResponse[], start: Date, end: Date): TableRowData[] => {
      // Map key: StaffId (number) or StaffName (string for Unassigned)
      const map = new Map<number | string, TableRowData>();
      const serviceCountMap = new Map<number, number>();
      
      // 1. Initialize from fullStaffList
      fullStaffList.forEach(staff => {
          let serviceCount = 0;
          if (staff.services) {
              serviceCount = staff.services.filter(s => s.isActive !== false).length;
              serviceCountMap.set(staff.id, serviceCount);
          }

          const staffName = `${staff.firstName} ${staff.lastName}`;
          map.set(staff.id, {
              staffName: staffName,
              serviceCount: serviceCount,
              total: 0,
              approved: 0,
              pending: 0,
              rejected: 0,
              cancelled: 0,
              customersTotal: 0,
              revenue: 0,
          });
      });

      // 2. Aggregate from appointments
      appointments.forEach(appt => {
          const sid = appt.staffId ? Number(appt.staffId) : null;
          const sname = appt.staffName || 'Unassigned';
          
          // Use ID if possible, otherwise Name (for Unassigned or orphans)
          let key: number | string = sid !== null ? sid : sname;
          
          if (!map.has(key)) {
              // Fallback: Check if name matches any existing staff by name (case-insensitive)
              let foundKey: number | string | null = null;
              const normalizedApptName = sname.trim().toLowerCase();
              
              for (const [existingKey, existingData] of map.entries()) {
                  if (existingData.staffName.trim().toLowerCase() === normalizedApptName) {
                      foundKey = existingKey;
                      break;
                  }
              }

              if (foundKey !== null) {
                  key = foundKey;
              } else {
                  // Truly a new entry (e.g. Unassigned or deleted staff)
                  map.set(key, {
                      staffName: sname,
                      serviceCount: sid ? (serviceCountMap.get(sid) || 0) : 0,
                      total: 0,
                      approved: 0,
                      pending: 0,
                      rejected: 0,
                      cancelled: 0,
                      customersTotal: 0,
                      revenue: 0,
                  });
              }
          }

          const entry = map.get(key)!;
          entry.total += 1;
          
          if (appt.status === 'Confirmed' || appt.status === 'Completed') {
              entry.approved += 1;
              entry.revenue += appt.price;
          } else if (appt.status === 'Pending') {
              entry.pending += 1;
          } else if (appt.status === 'Cancelled') {
              entry.cancelled += 1;
          }
      });

      // 3. Calculate distinct customers per staff row
      const distinctCustomersMap = new Map<number | string, Set<number>>();
      appointments.forEach(appt => {
          const sid = appt.staffId ? Number(appt.staffId) : null;
          const sname = appt.staffName || 'Unassigned';
          
          let key: number | string = sid !== null ? sid : sname;
          // Re-apply matching logic to ensure same key
          if (sid === null) {
              const normalizedName = sname.trim().toLowerCase();
              for (const [k, v] of map.entries()) {
                  if (v.staffName.trim().toLowerCase() === normalizedName) {
                      key = k;
                      break;
                  }
              }
          }

          if (!distinctCustomersMap.has(key)) distinctCustomersMap.set(key, new Set());
          if (appt.customerId) distinctCustomersMap.get(key)!.add(appt.customerId);
      });

      return Array.from(map.values())
        .filter(row => row.total > 0 || row.serviceCount > 0) // Hide rows with no services AND no appointments
        .map(item => {
          // Find the key for this item to get customer count
          let key: number | string = item.staffName;
          for (const [k, v] of map.entries()) {
              if (v === item) { key = k; break; }
          }

          return {
              ...item,
              customersTotal: distinctCustomersMap.get(key)?.size || 0
          };
      });
  };

  // Helper to get API params
  const getApiParams = () => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");
      const role = getRoleFromToken(token);
      const userId = getUserIdFromToken(token);
      let staffIds: number[] | undefined = undefined;
      
      if (role === 'Staff' && userId) {
          staffIds = [userId];
      } else if (selectedStaff.length > 0) {
          staffIds = selectedStaff;
      }
      return { token, staffIds };
  };

  const fetchMetadata = async () => {
      if (staffList.length > 0) return;
      try {
        const [staffData, servicesRaw, companyData] = await Promise.all([
            fetchStaff().catch(() => []),
            fetchServices().catch(() => []),
            getMyCompany().catch(() => null)
        ]);
        const servicesData = Array.isArray(servicesRaw) ? servicesRaw : (servicesRaw.items || []);
        if (companyData?.slug) setCompanySlug(companyData.slug);
        setFullStaffList(staffData); // Store full data
        setStaffList(staffData.map((s: any) => ({ id: s.id, name: `${s.firstName} ${s.lastName}` })));
        setServicesList(servicesData.map((s: any) => ({ id: s.id, name: s.name })));
      } catch (e) { console.error("Metadata fetch error", e); }
  };

  const fetchDailyData = async () => {
    if (isInitialLoad) setIsLoading(true);
    else setIsLoadingList(true);
    
    try {
      const { token, staffIds } = getApiParams();

      // 1. Fetch Selected Date Appointments with BUFFER
      const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
      
      const prevDate = new Date(selectedDate);
      prevDate.setDate(prevDate.getDate() - 1);
      const prevDateStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(prevDate.getDate()).padStart(2, '0')}`;

      const nextDate = new Date(selectedDate);
      nextDate.setDate(nextDate.getDate() + 1);
      const nextDateStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(nextDate.getDate()).padStart(2, '0')}`;

      const bufferStartUtc = combineDateTimeToUTC(prevDateStr, "00:00", timezone);
      const bufferEndUtc = combineDateTimeToUTC(nextDateStr, "23:59", timezone);

      const dailyRes = await getAppointments({
        startDate: bufferStartUtc,
        endDate: bufferEndUtc,
        pageSize: 100,
        sortBy: 'date',
        sortDirection: 'asc',
        staffIds: staffIds
      }, token);

      const filteredDaily = filterAppointments(dailyRes.appointments)
        .filter(apt => {
            const aptDateStr = getDateString(new Date(apt.startDateTime), timezone);
            return aptDateStr === selectedDateStr;
        })
        .sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());

      const totalFiltered = filteredDaily.length;
      const startIndex = (listPage - 1) * listPageSize;
      const paginatedDaily = filteredDaily.slice(startIndex, startIndex + listPageSize);

      setTodayAppointments(paginatedDaily);
      setListTotalCount(totalFiltered);
      setStats(prev => ({ ...prev, todayCount: totalFiltered }));

    } catch (err: any) {
      console.error("Daily fetch error:", err);
      setError(err.message || "Failed to load daily data");
    } finally {
      setIsLoading(false);
      setIsLoadingList(false);
      setIsInitialLoad(false);
    }
  };

  const fetchAnalyticsData = async () => {
      setIsLoadingChart(true);
      try {
        const { token, staffIds } = getApiParams();
        const nowInCompanyTz = new Date();
        const { start: rangeStart, end: rangeEnd } = getRangeDates(dateRange, nowInCompanyTz);
        
        const startStr = getDateString(rangeStart, timezone);
        const endStr = getDateString(rangeEnd, timezone); 
        
        const historyStartUtc = combineDateTimeToUTC(startStr, "00:00", timezone);
        const historyEndUtc = combineDateTimeToUTC(endStr, "23:59", timezone);

        const historyRes = await getAppointments({
            startDate: historyStartUtc,
            endDate: historyEndUtc,
            pageSize: 1000,
            staffIds: staffIds
        }, token);

        const filteredHistory = filterAppointments(historyRes.appointments);
        const processedChart = processChartData(filteredHistory, rangeStart, rangeEnd);
        const processedTable = processTableData(filteredHistory, rangeStart, rangeEnd);
        
        const totalRevenue = filteredHistory.reduce((sum, appt) => {
          if (appt.status === 'Confirmed' || appt.status === 'Completed') {
            return sum + appt.price;
          }
          return sum;
        }, 0);


        setChartData(processedChart);
        setTableData(processedTable);
        setStats(prev => ({ ...prev, revenue: totalRevenue }));
      } catch (err) {
          console.error("Analytics fetch error:", err);
      } finally {
          setIsLoadingChart(false);
      }
  };

  const handleExportCSV = () => {
    if (tableData.length === 0) return;

    const headers = [
      'Employee',
      'Total Services',
      'Total Appointments',
      'Approved Appointments',
      'Pending Appointments',
      'Rejected Appointments',
      'Cancelled Appointments',
      'Total Customers',
      'Revenue'
    ];

    const rows = tableData.map(row => [
      `"${row.staffName}"`,
      row.serviceCount,
      row.total,
      row.approved,
      row.pending,
      row.rejected,
      row.cancelled,
      row.customersTotal,
      row.revenue.toFixed(2)
    ]);

    // Totals row
    const totalsResponse = [
        "TOTALS",
        "",
        tableData.reduce((s, r) => s + r.total, 0),
        tableData.reduce((s, r) => s + r.approved, 0),
        tableData.reduce((s, r) => s + r.pending, 0),
        tableData.reduce((s, r) => s + r.rejected, 0),
        tableData.reduce((s, r) => s + r.cancelled, 0),
        tableData.reduce((s, r) => s + r.customersTotal, 0),
        tableData.reduce((s, r) => s + r.revenue, 0).toFixed(2)
    ]
    rows.push(totalsResponse);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `dashboard_stats_${getDateString(new Date(), timezone)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('dashboard-stats-table');
    if (!printContent) return;

    // Calculate actual date range for the header
    const { start, end } = getRangeDates(dateRange, new Date());
    const formatDateLabel = (d: Date) => d.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        timeZone: timezone === 'UTC' ? 'UTC' : undefined 
    });

    const rangeTitle = dateRange === 'custom' 
        ? `${customStartDate} to ${customEndDate}`
        : `${formatDateLabel(start)} - ${formatDateLabel(end)}`;

    const windowUrl = 'about:blank';
    const windowName = 'PrintWindow';
    const printWindow = window.open(windowUrl, windowName);

    if (printWindow) {
      printWindow.document.write('<html><head><title>Dashboard Stats</title>');
      printWindow.document.write('<style>');
      printWindow.document.write(`
        body { font-family: sans-serif; padding: 20px; color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f8f9fa; font-weight: 600; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        h2 { margin-bottom: 5px; color: #1a1a1a; }
        .subtitle { margin-bottom: 25px; color: #666; font-size: 0.9rem; }
      `);
      printWindow.document.write('</style></head><body>');
      printWindow.document.write(`<h2>Dashboard Statistics</h2>`);
      printWindow.document.write(`<p class="subtitle">Range: ${rangeTitle} (${dateRange.replace('_', ' ')})</p>`);
      printWindow.document.write(printContent.outerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  const fetchGlobalStats = async () => {
      try {
          const { token, staffIds } = getApiParams();
          const totalRes = await getAppointments({ pageSize: 1, staffIds: staffIds }, token);
          const pendingRes = await getAppointments({ status: 'Pending', pageSize: 1, staffIds: staffIds }, token);
          
          setStats(prev => ({ 
              ...prev, 
              totalAppointments: totalRes.totalCount,
              pendingAppointments: pendingRes.totalCount
          }));

          // Upcoming fetch (global tomorrow+)
          const nowInCompanyTz = new Date();
          const tomorrowDate = new Date(nowInCompanyTz);
          tomorrowDate.setDate(tomorrowDate.getDate() + 1);
          const tomorrowStr = getDateString(tomorrowDate, timezone);
          const tomorrowStartUtc = combineDateTimeToUTC(tomorrowStr, "00:00", timezone);
          
          const upcomingRes = await getAppointments({
            startDate: tomorrowStartUtc,
            sortBy: 'date',
            sortDirection: 'asc',
            pageSize: 50,
            staffIds: staffIds
          }, token);

          const filteredUpcoming = filterAppointments(upcomingRes.appointments).slice(0, 5);
          setUpcomingAppointments(filteredUpcoming);

      } catch (err) {
          console.error("Global stats fetch error:", err);
      }
  };

  // Reset page when date changes
  useEffect(() => {
     setListPage(1);
  }, [selectedDate]);

  useEffect(() => {
    fetchMetadata();
    refreshTimezone();
  }, []);

  useEffect(() => {
     fetchDailyData();
  }, [selectedDate, listPage, selectedStaff, selectedServices, timezone]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange, customStartDate, customEndDate, selectedServices, selectedStaff, fullStaffList, timezone]); 

  useEffect(() => {
     fetchGlobalStats();
  }, [selectedStaff, selectedServices, timezone]);

  const handleRefresh = () => {
    fetchDailyData();
    fetchAnalyticsData();
    fetchGlobalStats();
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
          
           <p className="text-gray-600 mt-1">Welcome {userName}! See Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="p-2 bg-white text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              title="Refresh Dashboard"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <a 
              href={companySlug ? `/book/${companySlug}` : `/?companyId=${getCompanyIdFromToken(getToken() || '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Booking Page
            </a>
            {/* <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100">
              <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">Company ID</p>
              <p className="text-xl font-bold text-indigo-700">{getCompanyIdFromToken(getToken() || '')}</p>
            </div> */}
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
              <p className="text-sm text-gray-600">Revenue ({dateRange === 'this_week' ? 'Week' : dateRange === 'this_month' ? 'Month' : dateRange === 'this_year' ? 'Year' : 'Custom'})</p>
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
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => {
                  const val = e.target.value;
                  setDateRange(val);
                  if (val === 'custom') {
                    setShowCustomDatePicker(true);
                  } else {
                    setShowCustomDatePicker(false);
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
                <option value="this_year">This Year</option>
                <option value="custom">Custom</option>
              </select>
              
              {/* Custom Date Range Picker */}
              {showCustomDatePicker && dateRange === 'custom' && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-20 p-4 min-w-[300px]">
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarDays className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium text-gray-700">Custom Date Range</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">End Date</label>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setShowCustomDatePicker(false)}
                        className="flex-1 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (customStartDate && customEndDate) {
                            setShowCustomDatePicker(false);
                            // Trigger refetch by changing state
                          } else {
                            toast.error('Please select both start and end dates');
                          }
                        }}
                        className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Staff Filter - Dynamic */}
            {staffList.length > 0 && !(getRoleFromToken(getToken() || '') === 'Staff') && (
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
          <h3 className="text-md font-medium text-gray-700 mb-4">
            Appointments & Revenue 
            <span className="text-gray-400 font-normal ml-2 text-sm">
                ({dateRange === 'this_week' ? 'This Week' : dateRange === 'this_month' ? 'This Month' : dateRange === 'this_year' ? 'This Year' : `${customStartDate} to ${customEndDate}`})
            </span>
          </h3>
          {isLoadingChart ? (
             <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
                 <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
             </div>
          ) : (
            <AnalyticsChart data={chartData} />
          )}
        </div>
      </div>
      
      {/* Stats Breakdown Table - Hidden for Staff */}
      {getRoleFromToken(getToken() || '') !== 'Staff' && (
        <div className="bg-white rounded-lg shadow mb-6 md:mb-8 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-md font-medium text-gray-700">Detailed Breakdown</h3>
              <div className="flex gap-2">
                  <button 
                      onClick={handleExportCSV}
                      disabled={tableData.length === 0}
                      className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      <Download className="w-4 h-4" /> Export to CSV
                  </button>
                  <button 
                      onClick={handlePrint}
                      disabled={tableData.length === 0}
                      className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      <Printer className="w-4 h-4" /> Print
                  </button>
              </div>
          </div>
          <div className="overflow-x-auto">
              <table id="dashboard-stats-table" className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                      <tr>
                          <th className="px-4 py-3 border-r border-gray-200" rowSpan={2}>Employee</th>
                          <th className="px-4 py-3 border-r border-gray-200" rowSpan={2}>Total Services</th>
                          <th className="px-4 py-2 border-r border-gray-200 text-center border-b" colSpan={5}>Appointments</th>
                          <th className="px-4 py-2 border-r border-gray-200 text-center border-b" colSpan={1}>Customers</th>
                          <th className="px-4 py-3" rowSpan={2}>Revenue</th>
                      </tr>
                      <tr>
                          <th className="px-4 py-2 border-r border-gray-200 text-center">Total</th>
                          <th className="px-4 py-2 border-r border-gray-200 text-center">Approved</th>
                          <th className="px-4 py-2 border-r border-gray-200 text-center">Pending</th>
                          <th className="px-4 py-2 border-r border-gray-200 text-center">Rejected</th>
                          <th className="px-4 py-2 border-r border-gray-200 text-center">Cancelled</th>
                          <th className="px-4 py-2 border-r border-gray-200 text-center">Total</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {tableData.length === 0 ? (
                          <tr>
                              <td colSpan={10} className="px-4 py-8 text-center text-gray-500 bg-gray-50">
                                  No data available in table
                              </td>
                          </tr>
                      ) : (
                          <>
                              {tableData.map((row, idx) => (
                                  <tr key={idx} className="hover:bg-gray-50">
                                      <td className="px-4 py-3 font-medium text-gray-900 border-r border-gray-100">{row.staffName}</td>
                                      <td className="px-4 py-3 text-center border-r border-gray-100">{row.serviceCount}</td>
                                      <td className="px-4 py-3 text-center border-r border-gray-100">{row.total}</td>
                                      <td className="px-4 py-3 text-center border-r border-gray-100 text-green-600 font-medium">{row.approved}</td>
                                      <td className="px-4 py-3 text-center border-r border-gray-100 text-yellow-600">{row.pending}</td>
                                      <td className="px-4 py-3 text-center border-r border-gray-100 text-gray-400">{row.rejected}</td>
                                      <td className="px-4 py-3 text-center border-r border-gray-100 text-red-600">{row.cancelled}</td>
                                      <td className="px-4 py-3 text-center border-r border-gray-100">{row.customersTotal}</td>
                                      <td className="px-4 py-3 font-medium text-gray-900 text-right">${row.revenue.toFixed(2)}</td>
                                  </tr>
                              ))}
                              {/* Total Row */}
                              <tr className="bg-gray-50 font-bold text-gray-900 border-t border-gray-200">
                                  <td className="px-4 py-3 border-r border-gray-200" colSpan={2}>Total:</td>
                                  <td className="px-4 py-3 text-center border-r border-gray-200">{tableData.reduce((s, r) => s + r.total, 0)}</td>
                                  <td className="px-4 py-3 text-center border-r border-gray-200">{tableData.reduce((s, r) => s + r.approved, 0)}</td>
                                  <td className="px-4 py-3 text-center border-r border-gray-200">{tableData.reduce((s, r) => s + r.pending, 0)}</td>
                                  <td className="px-4 py-3 text-center border-r border-gray-200">{tableData.reduce((s, r) => s + r.rejected, 0)}</td>
                                  <td className="px-4 py-3 text-center border-r border-gray-200">{tableData.reduce((s, r) => s + r.cancelled, 0)}</td>
                                  <td className="px-4 py-3 text-center border-r border-gray-200">{tableData.reduce((s, r) => s + r.customersTotal, 0)}</td>
                                  <td className="px-4 py-3 text-right">${tableData.reduce((s, r) => s + r.revenue, 0).toFixed(2)}</td>
                              </tr>
                          </>
                      )}
                  </tbody>
              </table>
          </div>
        </div>
      )}

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Today's Appointments */}
        <div  style={{height: '888px'}}  className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                  <h2 className="text-lg md:text-xl font-semibold">
                    Appointments for {String(selectedDate.getMonth() + 1).padStart(2, '0')}/{String(selectedDate.getDate()).padStart(2, '0')}/{selectedDate.getFullYear()}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                      {listTotalCount} appointment{listTotalCount !== 1 ? 's' : ''} found
                  </p>
              </div>
              
              {/* Pagination Controls */}
              {listTotalCount > listPageSize && (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setListPage(p => Math.max(1, p - 1))}
                        disabled={listPage === 1 || isLoadingList}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-600">
                        {listPage} / {Math.ceil(listTotalCount / listPageSize)}
                    </span>
                    <button
                        onClick={() => setListPage(p => Math.min(Math.ceil(listTotalCount / listPageSize), p + 1))}
                        disabled={listPage >= Math.ceil(listTotalCount / listPageSize) || isLoadingList}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
              )}
            </div>
            
            <div className="p-4 md:p-6 space-y-4">
              {isLoadingList ? (
                 <div className="flex justify-center py-8">
                     <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                 </div>
              ) : todayAppointments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No appointments scheduled for this date.</p>
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
            <MiniCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          </div>

          {/* Upcoming Appointments */}
          {/* <div className="bg-white rounded-lg shadow">
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
