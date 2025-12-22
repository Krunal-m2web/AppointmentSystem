import { useState } from 'react';
import { Calendar, Clock, User, TrendingUp, DollarSign, Filter, ChevronDown, ExternalLink } from 'lucide-react';
import { HeikinAshiChart } from './HeikinAshiChart';
import { MiniCalendar } from './MiniCalendar';
import { formatDate } from '../../utils/datetime';
import { getToken, getCompanyIdFromToken } from '../../utils/auth';

// Mock data
const todayAppointments = [
  {
    id: 1,
    clientName: 'John Doe',
    service: 'Web Design',
    time: '09:00 AM',
    duration: '60 min',
    location: 'Zoom',
    status: 'confirmed',
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    service: 'Software Development',
    time: '11:30 AM',
    duration: '90 min',
    location: 'In Person',
    status: 'confirmed',
  },
  {
    id: 3,
    clientName: 'Mike Johnson',
    service: 'Web Design',
    time: '02:00 PM',
    duration: '60 min',
    location: 'Phone Call',
    status: 'pending',
  },
];

const upcomingAppointments = [
  {
    id: 4,
    clientName: 'Sarah Williams',
    service: 'Software Development',
    date: 'Tomorrow',
    time: '10:00 AM',
    duration: '90 min',
    location: 'Zoom',
  },
  {
    id: 5,
    clientName: 'David Brown',
    service: 'Web Design',
    date: 'Dec 28, 2024',
    time: '01:00 PM',
    duration: '60 min',
    location: 'In Person',
  },
];

// Mock chart data - combined
const appointmentsChartData = [
  { date: 'Nov 21', appointments: 5, revenue: 750 },
  { date: 'Nov 22', appointments: 8, revenue: 1200 },
  { date: 'Nov 23', appointments: 6, revenue: 900 },
  { date: 'Nov 24', appointments: 10, revenue: 1500 },
  { date: 'Nov 25', appointments: 4, revenue: 600 },
  { date: 'Nov 26', appointments: 3, revenue: 450 },
  { date: 'Nov 27', appointments: 7, revenue: 1050 },
  { date: 'Nov 28', appointments: 9, revenue: 1350 },
];

const mockStaff = [
  { id: 1, name: 'Sarah Johnson' },
  { id: 2, name: 'Mike Wilson' },
  { id: 3, name: 'Emily Davis' },
];

const mockServices = [
  { id: 1, name: 'Web Design' },
  { id: 2, name: 'Software Development' },
  { id: 3, name: 'UI/UX Design' },
];

export function DashboardHome() {
  const [showStaffFilter, setShowStaffFilter] = useState(false);
  const [showServiceFilter, setShowServiceFilter] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<number[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState('7days');

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

  // Multi-currency revenue
  const revenueByCurrency = [
    { currency: 'USD', amount: 8500, symbol: '$' },
    // { currency: 'EUR', amount: 2300, symbol: '€' },
    // { currency: 'GBP', amount: 1200, symbol: '£' },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8 flex justify-between items-start">
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
      {/* Stats Cards */}
      <div className="flex gap-4 md:gap-6 mb-6 md:mb-8 w-full">
        <div className="flex-1 bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Appointments</p>
              <p className="text-2xl font-bold mt-2">156</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold mt-2">12</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Appointments</p>
              <p className="text-2xl font-bold mt-2">
                {todayAppointments.length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <div className="mt-2 space-y-1">
                {revenueByCurrency.map((rev) => (
                  <p key={rev.currency} className="text-lg font-bold">
                    {rev.symbol}{rev.amount.toLocaleString()} {rev.currency}
                  </p>
                ))}
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>


      {/* Analytics Filters */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h2 className="text-lg md:text-xl font-semibold">Analytics</h2>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Date Range */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
            </select>

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
                  <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
                    {mockStaff.map((staff) => (
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

            {/* Service Filter */}
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
                    {mockServices.map((service) => (
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
          </div>
        </div>
      </div>

      {/* Heikin Ashi Chart */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Appointments & Revenue Over Time (Heikin Ashi)</h3>
        <HeikinAshiChart data={appointmentsChartData} />
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
              {todayAppointments.map((appointment) => (
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
                        <p className="font-medium truncate">{appointment.clientName}</p>
                        <p className="text-sm text-gray-600">{appointment.service}</p>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${appointment.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                          }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {appointment.time} ({appointment.duration})
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {appointment.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <p className="font-medium">{appointment.clientName}</p>
                  <p className="text-sm text-gray-600">{appointment.service}</p>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <span>{appointment.date}</span>
                    <span>{appointment.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
