import { useState, useEffect } from 'react';
import { Clock, Check, X, Plus, Search, Loader2, Calendar, User, AlertCircle, ChevronDown, Filter, Trash2, AlertTriangle } from 'lucide-react';
import { HolidaysPage } from './HolidaysPage';
import { 
  TimeOff, 
  fetchPendingTimeOffs, 
  fetchAllTimeOffs, 
  fetchTimeOffByStaff,
  approveTimeOff, 
  rejectTimeOff,
  createTimeOff,
  deleteTimeOff,
  checkTimeOffConflicts,
  fetchStaff,
  ConflictInfo,
  fetchBadgeCounts,
  markTimeOffSeen
} from '../../services/staffApi';
import { formatTime, formatDate, combineDateTimeToUTC, getDateString, getTimeString } from '../../utils/datetime';
import { useTimezone } from '../../context/TimezoneContext';
import { getRoleFromToken, getUserIdFromToken } from '../../utils/auth';
import type { Staff } from '../../types/types';
import { toast } from 'sonner';
import { TableSkeleton } from '../ui/TableSkeleton';
import { DateInput } from '../ui/DateInput';
import { getInitials } from '../../utils/stringUtils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Helper to convert YYYY-MM-DD to mm/dd/yyyy
const toDisplayDate = (isoDate: string) => {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  return `${month}/${day}/${year}`;
};

// Helper to convert mm/dd/yyyy to YYYY-MM-DD
const toInternalDate = (displayDate: string) => {
  if (!displayDate) return '';
  const [month, day, year] = displayDate.split('/');
  return `${year}-${month}-${day}`;
};

interface TimeOffPageProps {
  onCountChange: (count: number) => void;
}

type MainTabType = 'staffTimeOff' | 'holidays';
type TabType = 'pending' | 'approved' | 'rejected' | 'all';
type TypeFilter = 'all' | 'fullday' | 'partial';

export function TimeOffPage({ onCountChange }: TimeOffPageProps) {
  const { timezone } = useTimezone();
  const [mainTab, setMainTab] = useState<MainTabType>('staffTimeOff');
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [timeOffs, setTimeOffs] = useState<TimeOff[]>([]);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<TimeOff | null>(null);
  
  // Filters
  const [staffFilter, setStaffFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [dateRangeFilter, setDateRangeFilter] = useState<{start: string; end: string}>({
    start: '',
    end: ''
  });
  
  const token = localStorage.getItem('auth_token');
  const role = token ? getRoleFromToken(token) : 'Staff';
  const userIdStr = token ? getUserIdFromToken(token) : null;
  const userId = userIdStr ? parseInt(userIdStr.toString()) : null;
  const isAdmin = role === 'Admin';

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      if (isAdmin) {
        // Always fetch pending count in the background for the badge if not on pending tab
        if (activeTab !== 'pending') {
          fetchPendingTimeOffs().then(pendingData => setPendingCount(pendingData.length)).catch(console.error);
        }

        if (activeTab === 'pending') {
          const data = await fetchPendingTimeOffs();
          setTimeOffs(data);
          setPendingCount(data.length);
          refreshBadgeCount();
        } else {
          const data = await fetchAllTimeOffs();
          let filtered = data;
          if (activeTab === 'approved') {
            filtered = data.filter(t => t.status === 'Approved');
          } else if (activeTab === 'rejected') {
            filtered = data.filter(t => t.status === 'Rejected');
          }
          setTimeOffs(filtered);
        }
      } else if (userId) {
        // Staff view: only their own
        const data = await fetchTimeOffByStaff(userId);
        setTimeOffs(data);
      }
    } catch (err) {
      console.error('Failed to fetch time-offs:', err);
      toast.error('Failed to load time off data');
    } finally {
      setLoading(false);
    }
  };

  const refreshBadgeCount = async () => {
    try {
      const counts = await fetchBadgeCounts();
      onCountChange(isAdmin ? counts.adminBadgeCount + counts.staffBadgeCount : counts.staffBadgeCount);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        await markTimeOffSeen();
        refreshBadgeCount();
      } catch (e) {
        console.error(e);
      }
    };
    init();
  }, []);

  useEffect(() => {
    fetchData();
  }, [activeTab, isAdmin, userId]);

  // Load staff list for add modal (only if admin)
  useEffect(() => {
    if (!isAdmin) return;
    const loadStaff = async () => {
      try {
        const staff = await fetchStaff();
        setStaffList(staff.filter(s => s.isActive));
      } catch (err) {
        console.error('Failed to fetch staff:', err);
      }
    };
    loadStaff();
  }, [isAdmin]);

  const handleApprove = async (id: number) => {
    try {
      await approveTimeOff(id);
      toast.success('Time off approved successfully');
      fetchData();
      refreshBadgeCount();
    } catch (err) {
      toast.error('Failed to approve time-off');
      console.error(err);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectTimeOff(id);
      toast.success('Time off rejected');
      fetchData();
      refreshBadgeCount();
    } catch (err) {
      toast.error('Failed to reject time-off');
      console.error(err);
    }
  };

  const handleDelete = async (timeOff: TimeOff) => {
    if (role === 'Staff' && timeOff.status !== 'Pending') {
      toast.error('You can only delete pending requests.');
      return;
    }
    setDeleteConfirm(timeOff);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await deleteTimeOff(deleteConfirm.id);
      toast.success('Time off deleted successfully');
      fetchData();
      refreshBadgeCount();
    } catch (err) {
      toast.error('Failed to delete time-off');
      console.error(err);
    } finally {
      setDeleteConfirm(null);
    }
  };



  // Calculate duration
  const getDuration = (start: string, end: string, isFullDay: boolean) => {
    if (isFullDay) {
      const sStr = getDateString(new Date(start), timezone);
      const eStr = getDateString(new Date(end), timezone);
      const sDate = new Date(sStr); // Treated as UTC
      const eDate = new Date(eStr); // Treated as UTC
      const diffMs = eDate.getTime() - sDate.getTime();
      const days = Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1;
      return `${days} day${days !== 1 ? 's' : ''}`;
    } else {
      const s = new Date(start);
      const e = new Date(end);
      const diffMs = e.getTime() - s.getTime();
      const hours = Math.round(diffMs / (1000 * 60 * 60) * 10) / 10;
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    }
  };

  // Apply filters
  const filteredTimeOffs = timeOffs.filter(t => {
    // Search filter
    if (searchQuery && !t.staffName?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Staff filter
    if (staffFilter !== 'all') {
      if (staffFilter === 'me' && t.staffId !== userId) return false;
      if (staffFilter !== 'me' && t.staffId !== parseInt(staffFilter)) return false;
    }
    // Type filter
    if (typeFilter === 'fullday' && !t.isFullDay) return false;
    if (typeFilter === 'partial' && t.isFullDay) return false;
    // Date range filter
    const tStartLocal = getDateString(new Date(t.startDateTimeUtc), timezone);
    const tEndLocal = getDateString(new Date(t.endDateTimeUtc), timezone);

    if (dateRangeFilter.start) {
        const filterStart = dateRangeFilter.start;
        const filterEnd = dateRangeFilter.end || filterStart; // Default to single day
        
        // Overlap condition: (RecordStart <= RangeEnd) AND (RecordEnd >= RangeStart)
        if (tStartLocal > filterEnd || tEndLocal < filterStart) return false;
    }
    
    return true;
  });

  // Status badge
  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Approved: 'bg-green-100 text-green-800 border-green-200',
      Rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  // Type badge
  const TypeBadge = ({ isFullDay }: { isFullDay: boolean }) => (
    <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${
      isFullDay ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
    }`}>
      {isFullDay ? 'Full Day' : 'Partial'}
    </span>
  );

  return (
    <div className="p-4 md:px-8 md:pt-4 md:pb-8">


      {/* Main Tabs: Staff Time Off / Holidays */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-1">
          <button
            onClick={() => setMainTab('staffTimeOff')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
              mainTab === 'staffTimeOff'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
            }`}
          >
            <Clock className="w-4 h-4" />
            Staff Time Off
          </button>
          <button
            onClick={() => setMainTab('holidays')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
              mainTab === 'holidays'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Holidays
          </button>
        </div>
      </div>

      {/* Holidays tab content */}
      {mainTab === 'holidays' && (
        <div className="-mx-4 md:-mx-8 -mb-4 md:-mb-8">
          <HolidaysPage role={role || 'Staff'} />
        </div>
      )}

      {/* Staff Time Off tab content */}
      {mainTab === 'staffTimeOff' && (<>
      
      {/* Page Header for Staff / Admin Sub-Tabs */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {!isAdmin ? (
          <div>
            <h2 className="text-xl font-bold text-gray-900">My Time Off Requests</h2>
            <p className="text-sm text-gray-500">Manage your personal time off and leave requests</p>
          </div>
        ) : (
          /* Pill-style sub-tabs for Admin */
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 w-fit">
            {[
              { id: 'pending' as TabType, label: 'Pending', count: pendingCount },
              { id: 'approved' as TabType, label: 'Approved' },
              { id: 'rejected' as TabType, label: 'Rejected' },
              { id: 'all' as TabType, label: 'All' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={(e) => {
                  e.preventDefault();
                  setLoading(true);
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full leading-none">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Add Time Off button - Visible for both Admin and Staff */}
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 font-semibold text-sm whitespace-nowrap cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          {isAdmin ? "Add Time Off" : "New Request"}
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search - Only for Admins */}
          {isAdmin && (
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by staff name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm"
              />
            </div>
          )}

          {/* Staff Filter */}
          {isAdmin && (
            <Select value={staffFilter} onValueChange={setStaffFilter}>
              <SelectTrigger className="w-[150px] bg-white border-gray-200">
                <SelectValue placeholder="Staff Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Staff</SelectItem>
                {staffList.map(staff => (
                  <SelectItem key={staff.id} value={staff.id.toString()}>
                    {staff.firstName} {staff.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Type Filter */}
          <Select 
            value={typeFilter} 
            onValueChange={(val) => setTypeFilter(val as TypeFilter)}
          >
            <SelectTrigger className="w-[140px] bg-white border-gray-200">
              <SelectValue placeholder="Type Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="fullday">Full Day</SelectItem>
              <SelectItem value="partial">Partial Day</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <DateInput
              value={toDisplayDate(dateRangeFilter.start)}
              onChange={(val) => setDateRangeFilter(prev => ({ ...prev, start: toInternalDate(val) }))}
              placeholder="Start date"
              className="w-40"
            />
            <span className="text-gray-400">to</span>
            <DateInput
              value={toDisplayDate(dateRangeFilter.end)}
              onChange={(val) => setDateRangeFilter(prev => ({ ...prev, end: toInternalDate(val) }))}
              placeholder="End date"
              className="w-40"
            />
          </div>

          {/* Clear Filters */}
          {(searchQuery || staffFilter !== 'all' || typeFilter !== 'all' || dateRangeFilter.start || dateRangeFilter.end) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setStaffFilter('all');
                setTypeFilter('all');
                setDateRangeFilter({ start: '', end: '' });
              }}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-4">
            <TableSkeleton rows={5} columns={isAdmin ? 7 : 6} />
          </div>
        ) : filteredTimeOffs.length === 0 ? (
          <div className="text-center py-12 px-4 shadow-sm border-t border-gray-100">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 max-w-xs mx-auto">
              {isAdmin 
                ? (activeTab === 'pending' ? 'No pending requests from staff members at the moment.' : 'No time-off records found matching your criteria.')
                : "You haven't requested any time off yet. Click the button above to start."
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {isAdmin && (
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Staff
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Date / Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Reason
                  </th>
                  {(!isAdmin || activeTab === 'all') && (
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                  )}
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTimeOffs.map((timeOff) => (
                  <tr key={timeOff.id} className="hover:bg-gray-50/50 transition-colors">
                    {isAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold border border-indigo-100">
                            {getInitials(timeOff.staffName || 'Staff')}
                          </div>
                          <span className="font-medium text-gray-900">{timeOff.staffName}</span>
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-2 items-start">
                        <TypeBadge isFullDay={timeOff.isFullDay} />
                        {isAdmin && timeOff.hasConflicts && (
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-xs font-medium" title="This time off overlaps with one or more appointments">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Conflict</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800">
                          {formatDate(timeOff.startDateTimeUtc, timezone)}
                        </span>
                        {!timeOff.isFullDay && (
                          <span className="text-xs text-gray-500">
                            {formatTime(timeOff.startDateTimeUtc, timezone)} - {formatTime(timeOff.endDateTimeUtc, timezone)}
                          </span>
                        )}
                        {timeOff.isFullDay && formatDate(timeOff.startDateTimeUtc, timezone) !== formatDate(timeOff.endDateTimeUtc, timezone) && (
                          <span className="text-xs text-gray-500">
                            to {formatDate(timeOff.endDateTimeUtc, timezone)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                        {getDuration(timeOff.startDateTimeUtc, timeOff.endDateTimeUtc, timeOff.isFullDay)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate" title={timeOff.reason || ''}>
                      {timeOff.reason || <span className="text-gray-400 italic">No reason provided</span>}
                    </td>
                    {(!isAdmin || activeTab === 'all') && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={timeOff.status} />
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1">
                        {isAdmin && timeOff.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(timeOff.id)}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                              title="Approve"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleReject(timeOff.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Reject"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        {(isAdmin || timeOff.status === 'Pending') && (
                          <>
                            <button
                              onClick={() => handleDelete(timeOff)}
                              className="p-1.5 text-indigo-600 hover:text-white hover:bg-indigo-600 hover:shadow-md active:scale-95 rounded-lg transition-all duration-200 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Time Off Modal */}
      {showAddModal && (
        <AddTimeOffModal
          staffList={staffList}
          isAdmin={isAdmin}
          currentUserId={userId}
          onClose={() => {
            setShowAddModal(false);
          }}
          onSuccess={() => {
            setShowAddModal(false);
            fetchData();
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <DeleteConfirmModal
          timeOff={deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          onConfirm={confirmDelete}
        />
      )}
      </>)}
    </div>
  );
}

// Add/Edit Time Off Modal Component
function AddTimeOffModal({
  staffList,
  isAdmin,
  currentUserId,
  onClose,
  onSuccess
}: {
  staffList: Staff[];
  isAdmin: boolean;
  currentUserId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { timezone } = useTimezone();
  const [isFullDay, setIsFullDay] = useState(true);
  const [formData, setFormData] = useState({
    staffId: isAdmin ? '' : (currentUserId?.toString() || ''),
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '17:00',
    reason: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [conflictInfo, setConflictInfo] = useState<ConflictInfo | null>(null);
  const [showConflictWarning, setShowConflictWarning] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormErrors({});
  }, [isFullDay]);

  const validateField = (name: string, value: any) => {
    let error = '';
    switch (name) {
      case 'staffId':
        if (isAdmin && !value) error = 'Please select a staff member';
        break;
      case 'startDate':
        if (!value) error = 'Start date is required';
        break;
      case 'endDate':
        if (isFullDay && value && new Date(value) < new Date(formData.startDate)) {
          error = 'End date cannot be before start date';
        }
        break;
      case 'startTime':
        if (!isFullDay && !value) error = 'Start time is required';
        break;
      case 'endTime':
        if (!isFullDay) {
          if (!value) error = 'End time is required';
          else if (value <= formData.startTime) error = 'End time must be after start time';
        }
        break;
    }
    setFormErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (isAdmin && !formData.staffId) errors.staffId = 'Please select a staff member';
    if (!formData.startDate) errors.startDate = 'Start date is required';
    if (isFullDay && formData.endDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      errors.endDate = 'End date cannot be before start date';
    }
    if (!isFullDay) {
      if (!formData.startTime) errors.startTime = 'Start time is required';
      if (!formData.endTime) errors.endTime = 'End time is required';
      else if (formData.endTime <= formData.startTime) errors.endTime = 'End time must be after start time';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const checkConflicts = async () => {
    if (!formData.staffId || !formData.startDate) return;
    
    let startDateTimeUtc: string;
    let endDateTimeUtc: string;
    
    if (isFullDay) {
      startDateTimeUtc = combineDateTimeToUTC(formData.startDate, "00:00", timezone);
      endDateTimeUtc = combineDateTimeToUTC(formData.endDate || formData.startDate, "23:59", timezone);
    } else {
      startDateTimeUtc = combineDateTimeToUTC(formData.startDate, formData.startTime, timezone);
      endDateTimeUtc = combineDateTimeToUTC(formData.startDate, formData.endTime, timezone);
    }

    try {
      const conflicts = await checkTimeOffConflicts(
        parseInt(formData.staffId),
        startDateTimeUtc,
        endDateTimeUtc
      );
      setConflictInfo(conflicts);
      return conflicts;
    } catch (err) {
      console.error('Failed to check conflicts:', err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent, forceSubmit = false) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }



    // Check for conflicts before submitting
    if (!forceSubmit) {
      const conflicts = await checkConflicts();
      if (conflicts?.hasConflicts) {
        setShowConflictWarning(true);
        return;
      }
    }

    setSubmitting(true);
    try {
      let startDateTimeUtc: string;
      let endDateTimeUtc: string;
      
      if (isFullDay) {
        startDateTimeUtc = combineDateTimeToUTC(formData.startDate, "00:00", timezone);
        endDateTimeUtc = combineDateTimeToUTC(formData.endDate || formData.startDate, "23:59", timezone);
      } else {
        startDateTimeUtc = combineDateTimeToUTC(formData.startDate, formData.startTime, timezone);
        endDateTimeUtc = combineDateTimeToUTC(formData.startDate, formData.endTime, timezone);
      }

      const payload = {
        staffId: parseInt(formData.staffId),
        startDateTimeUtc,
        endDateTimeUtc,
        reason: formData.reason || undefined,
        isFullDay
      };

      await createTimeOff(payload);
      toast.success('Time off added. Customers won\'t be able to book during this time.', {
        icon: '✅'
      });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to save time-off');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 animate-in fade-in duration-300" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                Add Time Off
              </h2>
              <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Conflict Warning */}
            {showConflictWarning && conflictInfo && (
              <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-amber-800">
                      This time off overlaps with {conflictInfo.conflictCount} existing appointment{conflictInfo.conflictCount !== 1 ? 's' : ''}
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-amber-700">
                      {conflictInfo.conflicts.slice(0, 3).map((c, i) => (
                        <li key={i}>• {c.customerName} - {c.serviceName}</li>
                      ))}
                      {conflictInfo.conflicts.length > 3 && (
                        <li>• and {conflictInfo.conflicts.length - 3} more...</li>
                      )}
                    </ul>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => setShowConflictWarning(false)}
                        className="px-3 py-1.5 text-sm font-medium text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                      >
                        Go Back
                      </button>
                      <button
                        onClick={(e) => {
                          setShowConflictWarning(false);
                          handleSubmit(e, true);
                        }}
                        className="px-3 py-1.5 text-sm font-medium bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        Continue Anyway
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={(e) => handleSubmit(e)} className="space-y-5">
              {/* Step 1: Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  1. Type
                </label>
                <div className="flex gap-4">
                  <label className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isFullDay ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      checked={isFullDay}
                      onChange={() => setIsFullDay(true)}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <div>
                      <span className="font-medium text-gray-900">Full Day</span>
                      <p className="text-xs text-gray-500">Block entire day(s)</p>
                    </div>
                  </label>
                  <label className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    !isFullDay ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      checked={!isFullDay}
                      onChange={() => setIsFullDay(false)}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <div>
                      <span className="font-medium text-gray-900">Specific Hours</span>
                      <p className="text-xs text-gray-500">Block a time range</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 2: Date / Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  2. Date {!isFullDay && '& Time'}
                </label>
                {isFullDay ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Start Date <span className="text-red-500">*</span></label>
                      <DateInput
                        value={toDisplayDate(formData.startDate)}
                        onChange={(val) => {
                          const internalDate = toInternalDate(val);
                          setFormData({ ...formData, startDate: internalDate });
                          validateField('startDate', internalDate);
                        }}
                        className={`w-full ${formErrors.startDate ? 'border-red-500' : ''}`}
                      />
                      {formErrors.startDate && <p className="mt-1 text-[10px] text-red-500 font-medium">{formErrors.startDate}</p>}
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">End Date</label>
                      <DateInput
                        value={toDisplayDate(formData.endDate)}
                        onChange={(val) => {
                          const internalDate = toInternalDate(val);
                          setFormData({ ...formData, endDate: internalDate });
                          validateField('endDate', internalDate);
                        }}
                        className={`w-full ${formErrors.endDate ? 'border-red-500' : ''}`}
                      />
                      {formErrors.endDate && <p className="mt-1 text-[10px] text-red-500 font-medium">{formErrors.endDate}</p>}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Date <span className="text-red-500">*</span></label>
                      <DateInput
                        value={toDisplayDate(formData.startDate)}
                        onChange={(val) => {
                          const internalDate = toInternalDate(val);
                          setFormData({ ...formData, startDate: internalDate });
                          validateField('startDate', internalDate);
                        }}
                        className={`w-full ${formErrors.startDate ? 'border-red-500' : ''}`}
                      />
                      {formErrors.startDate && <p className="mt-1 text-[10px] text-red-500 font-medium">{formErrors.startDate}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Start Time <span className="text-red-500">*</span></label>
                        <input
                          type="time"
                          value={formData.startTime}
                          onChange={(e) => {
                            setFormData({ ...formData, startTime: e.target.value });
                            validateField('startTime', e.target.value);
                          }}
                          className={`w-full px-4 py-2.5 bg-gray-50 border ${formErrors.startTime ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent outline-none transition-all`}
                        />
                        {formErrors.startTime && <p className="mt-1 text-[10px] text-red-500 font-medium">{formErrors.startTime}</p>}
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">End Time <span className="text-red-500">*</span></label>
                        <input
                          type="time"
                          value={formData.endTime}
                          onChange={(e) => {
                            setFormData({ ...formData, endTime: e.target.value });
                            validateField('endTime', e.target.value);
                          }}
                          className={`w-full px-4 py-2.5 bg-gray-50 border ${formErrors.endTime ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent outline-none transition-all`}
                        />
                        {formErrors.endTime && <p className="mt-1 text-[10px] text-red-500 font-medium">{formErrors.endTime}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Applies To */}
              {isAdmin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    3. Applies To
                  </label>
                  <Select 
                    value={formData.staffId} 
                    onValueChange={(val) => {
                      setFormData({ ...formData, staffId: val });
                      validateField('staffId', val);
                    }}
                  >
                    <SelectTrigger className={`w-full bg-gray-50 border ${formErrors.staffId ? 'border-red-500' : 'border-gray-200'} rounded-xl h-[44px]`}>
                      <SelectValue placeholder="Select staff member..." />
                    </SelectTrigger>
                    <SelectContent>
                      {staffList.map(staff => (
                        <SelectItem key={staff.id} value={staff.id.toString()}>
                          {staff.firstName} {staff.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.staffId && <p className="mt-1 text-[10px] text-red-500 font-medium">{formErrors.staffId}</p>}
                </div>
              )}

              {/* Step 4: Reason */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {isAdmin ? '4.' : '3.'} Reason <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Internal note only (e.g., Vacation, Doctor's appointment)"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
                  {submitting ? 'Saving...' : 'Save Time Off'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// Delete Confirmation Modal
function DeleteConfirmModal({
  timeOff,
  onClose,
  onConfirm
}: {
  timeOff: TimeOff;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40" onClick={onClose}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in duration-200">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Delete Time Off</h3>
                <p className="mt-2 text-gray-600">
                  Removing this time off will allow customers to book during this time. Are you sure you want to continue?
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
