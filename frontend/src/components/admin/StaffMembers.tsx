import { useEffect, useState } from 'react';
import { fetchStaff, updateStaff, fetchStaffAvailability, createAvailability, deleteAvailability, deleteStaff, createStaff } from '../../services/staffApi';
import { Search, Plus, X, User, Mail, Phone, Briefcase, Clock, Save } from 'lucide-react';
import type { Staff, TimeSlot, StaffServiceInfo } from '../../types/types';
import { fetchServices, ServiceListItem } from "../../services/serviceApi";
import { getToken, getCompanyIdFromToken } from '../../utils/auth';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

type TabType = 'details' | 'services' | 'schedules';

// Custom type for editing state where services are IDs and schedule is guaranteed array
interface EditableStaff extends Omit<Staff, 'services' | 'schedule'> {
    services: number[];
    schedule: TimeSlot[];
    role?: string; 
    password?: string; // Optional, only for creation
}

export function StaffMembers() {
    const [staff, setStaff] = useState<Staff[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('details');
    // Use EditableStaff for the form state
    const [editedStaff, setEditedStaff] = useState<EditableStaff | null>(null);
    const [bulkDays, setBulkDays] = useState<number[]>([]);
    const [bulkStartTime, setBulkStartTime] = useState('09:00');
    const [bulkEndTime, setBulkEndTime] = useState('17:00');
    const [services, setServices] = useState<ServiceListItem[]>([]);


    useEffect(() => {
        fetchStaff()
        .then(setStaff)
        .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        fetchServices() // This returns Service[] now but compatible enough
        .then((res: any) => setServices(res))
        .catch(err => console.error(err))
    }, [])


  const toggleBulkDay = (day: number) => {
  setBulkDays(prev =>
    prev.includes(day)
      ? prev.filter(d => d !== day)
      : [...prev, day]
  );
};

const applyBulkSchedule = () => {
  if (!editedStaff) return;
  if (bulkDays.length === 0) return;

  const updatedSchedule = editedStaff.schedule.filter(
    slot => !bulkDays.includes(slot.dayOfWeek)
  );

  const newSlots: TimeSlot[] = bulkDays.map(day => ({
    id: `${day}-${Date.now()}`,
    dayOfWeek: day,
    startTime: bulkStartTime,
    endTime: bulkEndTime,
  }));

  setEditedStaff({
    ...editedStaff,
    schedule: [...updatedSchedule, ...newSlots],
  });
};




    const filteredStaff = staff.filter(
        (s) =>
            s.isActive !== false && 
            ((s.firstName?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
            (s.lastName?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
            (s.email?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()))
    );

    const handleSelectStaff = async (staffMember: Staff) => {
        setSelectedStaff(staffMember);

        try {
            // If it's a new staff (id=0), skip availability fetch
            let availability = [];
            if (staffMember.id > 0) {
                 availability = await fetchStaffAvailability(staffMember.id);
            }

            // Access services as any because runtime it is objects
            const currentServices = staffMember.services as any[];
            const serviceIds = Array.isArray(currentServices)
                ? currentServices.map((s: any) => (typeof s === 'object' ? s.serviceId : s))
                : [];

            setEditedStaff({
                ...staffMember,
                services: serviceIds,
                schedule: availability.map((a: any) => ({
                    id: a.id.toString(),
                    dayOfWeek: a.dayOfWeek,
                    startTime: a.startTime.substring(0, 5),
                    endTime: a.endTime.substring(0, 5),
                })),
                role: '' // Default if missing
            });
        } catch (error) {
            console.error("Error fetching staff details:", error);
            // Fallback
            setEditedStaff({
                ...staffMember,
                services: [],
                schedule: [],
                role: ''
            });
        }

        setActiveTab("details");
    };

    const handleAddNewStaff = () => {
        const newStaff: Staff = {
            id: 0,
            companyId: 0, // Will be filled on save
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            isActive: true,
            // Initialize with empty arrays for UI handling
            // Initialize with empty arrays for UI handling
            services: [], 
            // These properties are not in the Staff interface but might be returned by API details
            // For new staff, we just need the basics to start editing
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const editableNewStaff: EditableStaff = {
             ...newStaff,
             services: [],
             schedule: [],
             password: '' // Initialize basic password field
        };
        setSelectedStaff(newStaff);
        setEditedStaff(editableNewStaff);
        setActiveTab("details");
    };


    const handleSave = async () => {
        if (!editedStaff) return;

        try {
            const companyId = getCompanyIdFromToken(getToken() || "");
            if (!companyId) {
                alert("Error: Missing Company ID. Please log in again.");
                return;
            }

            let staffId = editedStaff.id;

            // CREATE or UPDATE Staff
            if (editedStaff.id <= 0) { // Assuming new staff has ID 0 or negative
                const newStaff = await createStaff({
                    companyId,
                    firstName: editedStaff.firstName || "",
                    lastName: editedStaff.lastName || "",
                    email: editedStaff.email || "",
                    phone: editedStaff.phone,
                    serviceIds: editedStaff.services,
                    // Use entered password or fallback to default if empty (though UI should enforce it)
                    password: editedStaff.password || "Password123!" 
                });
                staffId = newStaff.id;
                alert(`Staff member created successfully!\n\nIMPORTANT: Their temporary password is "${editedStaff.password || "Password123!"}".\nPlease share this with them so they can log in.`);
            } else {
                // Update staff basic info
                await updateStaff(editedStaff as any);
                // Services are updated within updateStaff if passed correctly, 
                // but checking backend implementation, updateStaff handles serviceIds mapping.
                // We ensure 'services' in editedStaff are IDs which matches our update payload requirement.
            }
            
            // Availability Handling
            // 1. Remove existing availability
            try {
                const existing = await fetchStaffAvailability(staffId);
                for (const slot of existing) {
                    await deleteAvailability(slot.id);
                }
            } catch (e) {
                // Ignore if creating new or no availability exists
            }

            // 2. Save new schedule
            for (const slot of editedStaff.schedule) {
                await createAvailability({
                    staffId: staffId,
                    dayOfWeek: slot.dayOfWeek,
                    startTime: slot.startTime + ":00",
                    endTime: slot.endTime + ":00",
                    isAvailable: true,
                });
            }
            alert("Staff and schedule saved successfully!")

            // Refresh staff list
            const refreshed = await fetchStaff();
            setStaff(refreshed);

            // Reselect to update view
            const updated = refreshed.find(s => s.id === staffId);
            if (updated) {
               // Reload full details
               const currentTab = activeTab; 
               await handleSelectStaff(updated);
               setActiveTab(currentTab); 
            }
        } catch (err: any) {
            console.error(err);
            alert(`Failed to save staff: ${err.message}`);
        }
    };

    const handleDeleteStaff = async () => {
        if (!editedStaff || !confirm("Are you sure you want to remove this staff member? They will be marked as inactive.")) return;

        try {
            await deleteStaff(editedStaff.id);
            alert("Staff member removed successfully.");
            
            // Refresh list
            const refreshed = await fetchStaff();
            setStaff(refreshed);
            setSelectedStaff(null);
            setEditedStaff(null);
        } catch (err: any) {
            console.error("Delete error:", err);
            // Show specific error from backend if available
            // err.message will contain "Failed to delete staff: <Backend Message>"
            const errorMessage = err.message || "Failed to remove staff member.";
            alert(errorMessage);
        }
    };

    const toggleService = (serviceId: number) => {
        if (!editedStaff) return;
        const services = editedStaff.services.includes(serviceId)
            ? editedStaff.services.filter((id) => id !== serviceId)
            : [...editedStaff.services, serviceId];
        setEditedStaff({ ...editedStaff, services });
    };

    const addTimeSlot = (dayOfWeek: number) => {
        if (!editedStaff) return;
        const newSlot: TimeSlot = {
            id: Date.now().toString(),
            dayOfWeek,
            startTime: '09:00',
            endTime: '17:00',
        };
        setEditedStaff({
            ...editedStaff,
            schedule: [...editedStaff.schedule, newSlot],
        });
    };

    const updateTimeSlot = (slotId: string, field: 'startTime' | 'endTime', value: string) => {
        if (!editedStaff) return;
        setEditedStaff({
            ...editedStaff,
            schedule: editedStaff.schedule.map((slot) =>
                slot.id === slotId ? { ...slot, [field]: value } : slot
            ),
        });
    };

    const deleteTimeSlot = (slotId: string) => {
        if (!editedStaff) return;
        setEditedStaff({
            ...editedStaff,
            schedule: editedStaff.schedule.filter((slot) => slot.id !== slotId),
        });
    };

    return (
        <div className="p-4 md:p-8">
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold">Staff Members</h1>
                <p className="text-gray-600 mt-1">Manage staff members and their schedules</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Staff List */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b border-gray-200">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search staff..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                            {filteredStaff.map((staffMember) => (
                                <div
                                    key={staffMember.id}
                                    onClick={() => handleSelectStaff(staffMember)}
                                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedStaff?.id === staffMember.id ? 'bg-indigo-50' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{staffMember.firstName} {staffMember.lastName}</p>
                                            <p className="text-sm text-gray-600 truncate">{staffMember.email}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-gray-200">
                            <button 
                                onClick={handleAddNewStaff}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Add Staff Member
                            </button>
                        </div>
                    </div>
                </div>

                {/* Staff Details */}
                <div className="lg:col-span-2">
                    {selectedStaff && editedStaff ? (
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl md:text-2xl font-bold">{selectedStaff.firstName} {selectedStaff.lastName}</h2>
                                    <button
                                        onClick={() => {
                                            setSelectedStaff(null);
                                            setEditedStaff(null);
                                        }}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="border-b border-gray-200">
                                <div className="flex overflow-x-auto">
                                    <button
                                        onClick={() => setActiveTab('details')}
                                        className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'details'
                                                ? 'border-b-2 border-indigo-600 text-indigo-600'
                                                : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('services')}
                                        className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'services'
                                                ? 'border-b-2 border-indigo-600 text-indigo-600'
                                                : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                    >
                                        Services
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('schedules')}
                                        className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'schedules'
                                                ? 'border-b-2 border-indigo-600 text-indigo-600'
                                                : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                    >
                                        Schedules
                                    </button>
                                </div>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6">
                                {activeTab === 'details' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    <User className="w-4 h-4 inline mr-2" />
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editedStaff.firstName ?? ''}
                                                    onChange={(e) => setEditedStaff({ ...editedStaff, firstName: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editedStaff.lastName ?? ''}
                                                    onChange={(e) => setEditedStaff({ ...editedStaff, lastName: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Mail className="w-4 h-4 inline mr-2" />
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={editedStaff.email ?? ''}
                                                onChange={(e) => setEditedStaff({ ...editedStaff, email: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Phone className="w-4 h-4 inline mr-2" />
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                value={editedStaff.phone ?? ''}
                                                onChange={(e) => setEditedStaff({ ...editedStaff, phone: e.target.value.replace(/[^\d+]/g, '') })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>

                                        {editedStaff.id <= 0 && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    <Briefcase className="w-4 h-4 inline mr-2" />
                                                    Initial Password
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editedStaff.password || ''}
                                                    onChange={(e) => setEditedStaff({ ...editedStaff, password: e.target.value })}
                                                    placeholder="Enter initial password"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">This will be the password the staff member uses to log in for the first time.</p>
                                            </div>
                                        )}

                                        {/* <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Briefcase className="w-4 h-4 inline mr-2" />
                                                Role
                                            </label>
                                            <input
                                                type="text"
                                                value={editedStaff.role ?? ''}
                                                onChange={(e) => setEditedStaff({ ...editedStaff, role: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div> */}
                                    </div>
                                )}

                                {activeTab === 'services' && (
  <div className="space-y-4">

    <p className="text-sm text-gray-600">
      Select which services this staff member can provide
    </p>

    {/* Search input */}
    <input
      type="text"
      placeholder="Search services..."
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    {/* Scrollable service list */}
    <div className="border border-gray-200 rounded-lg max-h-[300px] overflow-y-auto divide-y">
      {services
        .filter(s =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(service => (
          <label
            key={service.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={editedStaff.services.includes(service.id)}
              onChange={() => toggleService(service.id)}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <span className="text-sm text-gray-800">
              {service.name}
            </span>
          </label>
        ))}
    </div>

    {/* Selected count */}
    <p className="text-xs text-gray-500">
      {editedStaff.services.length} service(s) selected
    </p>
  </div>
)}


                                {activeTab === 'schedules' && (
                                    <div className="space-y-6">
                                        
                                        {/* <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Clock className="w-4 h-4 inline mr-2" />
                                                Timezone
                                            </label>
                                            <select
                                                value={editedStaff.timezone}
                                                onChange={(e) => setEditedStaff({ ...editedStaff, timezone: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                {TIMEZONES.map((tz) => (
                                                    <option key={tz.value} value={tz.value}>
                                                        {tz.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div> */}

                                        <div>
                                            <div className="mb-5 border border-gray-200 rounded-lg p-4 space-y-4">
                                                <h3 className="font-semibold text-gray-800">Apply to multiple days</h3>

                                                {/* Days selection */}
                                                <div className="flex flex-wrap gap-2">
                                                    {DAYS_OF_WEEK.map((day, index) => (
                                                        <button
                                                            key={day}
                                                            onClick={() => toggleBulkDay(index)}
                                                            className={`px-3 py-1 rounded-full text-sm border transition
                                                            ${bulkDays.includes(index)
                                                                ? 'bg-indigo-600 text-white border-indigo-600'
                                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
                                                            `}
                                                        >
                                                            {day.slice(0, 3)}
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Time selection */}
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <label className="block text-sm text-gray-600 mb-1">Start</label>
                                                        <input
                                                            type="time"
                                                            value={bulkStartTime}
                                                            onChange={e => setBulkStartTime(e.target.value)}
                                                            className="px-3 py-2 border border-gray-300 rounded-lg"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm text-gray-600 mb-1">End</label>
                                                        <input
                                                            type="time"
                                                            value={bulkEndTime}
                                                            onChange={e => setBulkEndTime(e.target.value)}
                                                            className="px-3 py-2 border border-gray-300 rounded-lg"
                                                        />
                                                    </div>

                                                    <button
                                                        onClick={applyBulkSchedule}
                                                        className="mt-5 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                                    >
                                                        Apply
                                                    </button>
                                                </div>
                                            </div>

                                            <h3 className="font-semibold mb-4">Weekly Schedule</h3>
                                            <div className="space-y-4">
                                                {DAYS_OF_WEEK.map((day, index) => {
                                                    const daySlots = editedStaff.schedule.filter((slot) => slot.dayOfWeek === index);
                                                    return (
                                                        <div key={day} className="border border-gray-200 rounded-lg p-4">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <h4 className="font-medium">{day}</h4>
                                                                <button
                                                                    onClick={() => addTimeSlot(index)}
                                                                    className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                                                                >
                                                                    <Plus className="w-4 h-4" />
                                                                    Add Time
                                                                </button>
                                                            </div>
                                                            {daySlots.length > 0 ? (
                                                                <div className="space-y-2">
                                                                    {daySlots.map((slot) => (
                                                                        <div key={slot.id} className="flex items-center gap-2">
                                                                            <input
                                                                                type="time"
                                                                                value={slot.startTime}
                                                                                onChange={(e) => updateTimeSlot(slot.id, 'startTime', e.target.value)}
                                                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                                            />
                                                                            <span className="text-gray-600">to</span>
                                                                            <input
                                                                                type="time"
                                                                                value={slot.endTime}
                                                                                onChange={(e) => updateTimeSlot(slot.id, 'endTime', e.target.value)}
                                                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                                            />
                                                                            <button
                                                                                onClick={() => deleteTimeSlot(slot.id)}
                                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                            >
                                                                                <X className="w-4 h-4" />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <p className="text-sm text-gray-500">No availability set</p>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t border-gray-200 flex justify-between">
                                <button
                                    onClick={handleDeleteStaff}
                                    className="px-6 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                                >
                                    Remove Staff
                                </button>

                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow p-12 text-center">
                            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Staff Selected</h3>
                            <p className="text-gray-600">Select a staff member from the list to view and edit their details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
