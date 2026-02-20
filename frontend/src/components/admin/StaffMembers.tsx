import { useEffect, useState } from 'react';
import { fetchStaff, updateStaff, fetchStaffAvailability, createAvailability, deleteAllAvailabilityForStaff, deleteStaff, createStaff, fetchTimeOff, createTimeOff, deleteTimeOff, TimeOff } from '../../services/staffApi';
import { Search, Plus, X, User, Mail, Briefcase, Clock, Save, Calendar, Trash2 } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from '../ui/PhoneInput';
import { Phone as PhoneIcon } from 'lucide-react';
import type { Staff, TimeSlot, StaffServiceInfo } from '../../types/types';
import { fetchServices, ServiceListItem } from "../../services/serviceApi";
import { getToken, getCompanyIdFromToken, getRoleFromToken, getUserIdFromToken } from '../../utils/auth';
import { toast } from 'sonner';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { InviteStaffModal } from './InviteStaffModal';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

type TabType = 'details' | 'services' | 'schedules' | 'timeoff';

// Custom type for editing state where services are IDs and schedule is guaranteed array
interface EditableStaff extends Omit<Staff, 'services' | 'schedule'> {
    services: number[];
    schedule: TimeSlot[];
    role?: string; 
    password?: string; // Optional, only for creation
}

export function StaffMembers() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [staff, setStaff] = useState<Staff[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [serviceSearchTerm, setServiceSearchTerm] = useState('');
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('details');
    // Use EditableStaff for the form state
    const [editedStaff, setEditedStaff] = useState<EditableStaff | null>(null);
    const [bulkDays, setBulkDays] = useState<number[]>([]);
    const [bulkStartTime, setBulkStartTime] = useState('09:00');
    const [bulkEndTime, setBulkEndTime] = useState('17:00');
    const [services, setServices] = useState<ServiceListItem[]>([]);
    const [timeOffs, setTimeOffs] = useState<TimeOff[]>([]);
    const [newTimeOff, setNewTimeOff] = useState({ start: '', end: '', reason: '' });
    const [deleteStaffId, setDeleteStaffId] = useState<number | null>(null);
    const [deleteTimeOffId, setDeleteTimeOffId] = useState<number | null>(null);


    // Validation State
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [showInviteModal, setShowInviteModal] = useState(false);

    const validateForm = () => {
        if (!editedStaff) return false;
        const errors: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!editedStaff.firstName?.trim()) errors.firstName = "First name is required";
        if (!editedStaff.lastName?.trim()) errors.lastName = "Last name is required";
        if (!editedStaff.email?.trim()) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(editedStaff.email)) {
            errors.email = "Invalid email format";
        }
        if (editedStaff.phone?.trim() && !isValidPhoneNumber(editedStaff.phone)) {
            errors.phone = "Invalid phone format";
        }
        
        // Password validation for new staff
        if (editedStaff.id <= 0 && !editedStaff.password) {
             errors.password = "Password is required";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


  useEffect(() => {
  if (!selectedStaff) return;

  let cancelled = false;

  const loadAvailability = async () => {
    try {
      const availability = await fetchStaffAvailability(selectedStaff.id);

      if (cancelled) return;

      const dayMap: Record<string, number> = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
      };

      const scheduleData: TimeSlot[] = availability.map((a: any) => ({
        id: a.id.toString(),
        dayOfWeek:
          typeof a.dayOfWeek === "string"
            ? dayMap[a.dayOfWeek]
            : a.dayOfWeek,
        startTime: a.startTime.substring(0, 5),
        endTime: a.endTime.substring(0, 5),
      }));

      setEditedStaff(prev =>
        prev
          ? { ...prev, schedule: scheduleData }
          : null
      );
    } catch (e) {
      console.error("Failed to load availability", e);
    }
  };

  loadAvailability();

  return () => {
    cancelled = true;
  };
}, [selectedStaff?.id]);

    useEffect(() => {
        const token = getToken();
        fetchStaff()
        .then(res => {
            const role = token ? getRoleFromToken(token) : undefined;
            const userId = token ? getUserIdFromToken(token) : undefined;
            
            let data = res;
            if (role === 'Staff' && userId) {
                data = res.filter((s: Staff) => s.id === userId);
            }
            setStaff(data);
            
            // Auto-select if there's only one (e.g. for Staff users)
            if (role === 'Staff' && data.length === 1) {
                 handleSelectStaff(data[0]);
            }
        })
        .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        fetchServices() 
        .then((res: any) => {
            const data = Array.isArray(res) ? res : (res.items || []);
            setServices(data);
        })
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
            (`${s.firstName ?? ""} ${s.lastName ?? ""}`.toLowerCase()).includes(searchTerm.toLowerCase()) ||
            (s.email?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()))
    );

const handleSelectStaff = (staffMember: Staff) => {
  const serviceIds =
    staffMember.services?.map((s: any) =>
      typeof s === "object" ? s.serviceId : s
    ) ?? [];

  setSelectedStaff(staffMember);

  setEditedStaff({
    ...staffMember,
    services: serviceIds,
    schedule: [], // will be filled by useEffect
    role: "",
  });
  setFormErrors({}); // Clear errors when selecting new staff

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
        setFormErrors({}); // Clear errors for new staff
        setActiveTab("details");
    };


    const checkOverlap = (schedule: TimeSlot[]) => {
        for (let i = 0; i < schedule.length; i++) {
            for (let j = i + 1; j < schedule.length; j++) {
                const s1 = schedule[i];
                const s2 = schedule[j];
                
                if (s1.dayOfWeek === s2.dayOfWeek) {
                    const start1 = parseInt(s1.startTime.replace(':', ''));
                    const end1 = parseInt(s1.endTime.replace(':', ''));
                    const start2 = parseInt(s2.startTime.replace(':', ''));
                    const end2 = parseInt(s2.endTime.replace(':', ''));
                    
                    // Simple overlap check logic
                    // (Start1 < End2) and (End1 > Start2)
                    if (start1 < end2 && end1 > start2) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

// Replace the handleSave function with this version:
const handleSave = async () => {
    if (!editedStaff || isSaving) return;
    
    // Client-side validation
    if (!validateForm()) {
        setActiveTab('details'); // Automatically switch to details tab to show errors
        toast.error("Please fix the errors in the Details tab before saving.");
        return;
    }
    
    // validate overlaps locally
    if (checkOverlap(editedStaff.schedule)) {
        toast.error("Error: The schedule contains overlapping time slots. Please correct them before saving.");
        return;
    }

    setIsSaving(true); // Prevent multiple saves and show loading state

    try {
        const companyId = getCompanyIdFromToken(getToken() || "");
        if (!companyId) {
            toast.error("Error: Missing Company ID. Please log in again.");
            setIsSaving(false);
            return;
        }

        let staffId = editedStaff.id;

        // CREATE or UPDATE Staff
        if (editedStaff.id <= 0) {
            const newStaff = await createStaff({
                companyId,
                firstName: editedStaff.firstName || "",
                lastName: editedStaff.lastName || "",
                email: editedStaff.email || "",
                phone: editedStaff.phone,
                serviceIds: editedStaff.services,
                password: editedStaff.password   
            });
            staffId = newStaff.id;
        } else {
            await updateStaff(editedStaff as any);
        }
        
        // Availability Handling - Clear existing before creating new
        if (staffId > 0 && editedStaff.schedule.length > 0) {
            await deleteAllAvailabilityForStaff(staffId);
            await new Promise(resolve => setTimeout(resolve, 200));

            // Save new schedule
            for (const slot of editedStaff.schedule) {
                await createAvailability({
                    staffId: staffId,
                    dayOfWeek: slot.dayOfWeek,
                    startTime: slot.startTime + ":00",
                    endTime: slot.endTime + ":00",
                    isAvailable: true,
                });
            }
        } else if (staffId > 0 && editedStaff.schedule.length === 0) {
            await deleteAllAvailabilityForStaff(staffId);
        }

        const debugAvailability = await fetchStaffAvailability(staffId);
console.log("DEBUG after save:", debugAvailability);

        // Wait for data to settle
        await new Promise(resolve => setTimeout(resolve, 500));

        // Refresh staff list
        const refreshed = await fetchStaff();
        setStaff(refreshed);

        // Reload the current staff member with fresh data
        const updated = refreshed.find(s => s.id === staffId);
        if (updated) {
            const currentTab = activeTab;
            
            const availability = await fetchStaffAvailability(staffId);
            const timeOffList = await fetchTimeOff(staffId);
            
            console.log("Reloaded availability:", availability);
            
            setTimeOffs(timeOffList);
            setSelectedStaff(updated);
            
            const currentServices = updated.services as any[];
            const serviceIds = Array.isArray(currentServices)
                ? currentServices.map((s: any) => (typeof s === 'object' ? s.serviceId : s))
                : [];

            const dayMap: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const scheduleData = availability.map((a: any) => ({
  id: a.id.toString(),
  dayOfWeek: typeof a.dayOfWeek === "string"
    ? dayMap[a.dayOfWeek]
    : a.dayOfWeek,
  startTime: a.startTime.substring(0, 5),
  endTime: a.endTime.substring(0, 5),
}));


            setEditedStaff({
                ...updated,
                services: serviceIds,
                schedule: scheduleData,
                role: ''
            });
            
            setActiveTab(currentTab);
        }

        if (editedStaff.id <= 0) {
            toast.success("Staff and schedule saved successfully!");
        } else {
             toast.success("Staff and schedule updated successfully!");
        }

    } catch (err: any) {
        console.error("Save error:", err);
        toast.error(`Failed to save staff: ${err.message}`);
    } finally {
        setIsSaving(false);
    }
};

// Update the Save button to show loading state:
// In the JSX, replace the save button with:
<button
    onClick={handleSave}
    disabled={isSaving}
    className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
        isSaving 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700'
    } text-white`}
>
    <Save className="w-5 h-5" />
    {isSaving ? 'Saving...' : 'Save Changes'}
</button>

    const confirmDeleteStaff = async () => {
        if (!editedStaff) return;

        try {
            await deleteStaff(editedStaff.id);
            toast.success("Staff member removed successfully.");
            
            // Refresh list
            const refreshed = await fetchStaff();
            setStaff(refreshed);
            setSelectedStaff(null);
            setEditedStaff(null);
            setDeleteStaffId(null);
        } catch (err: any) {
            console.error("Delete error:", err);
            // Show specific error from backend if available
            const errorMessage = err.message || "Failed to remove staff member.";
            toast.error(errorMessage);
        }
    };

    const handleDeleteStaff = () => {
         if (editedStaff) setDeleteStaffId(editedStaff.id);
    };

    const toggleService = (serviceId: number) => {
        if (!editedStaff) return;
        const services = editedStaff.services.includes(serviceId)
            ? editedStaff.services.filter((id) => id !== serviceId)
            : [...editedStaff.services, serviceId];
        setEditedStaff({ ...editedStaff, services });
    };

    const filteredServices = services.filter(s =>
        s.name.toLowerCase().includes(serviceSearchTerm.toLowerCase())
    );

    const isAllFilteredSelected = filteredServices.length > 0 && 
        filteredServices.every(s => editedStaff?.services.includes(s.id));

    const handleToggleAllServices = () => {
        if (!editedStaff) return;
        
        let newServices;
        if (isAllFilteredSelected) {
            // Unselect all in current filter
            const filteredIds = filteredServices.map(s => s.id);
            newServices = editedStaff.services.filter(id => !filteredIds.includes(id));
        } else {
            // Select all in current filter
            const currentSelected = new Set(editedStaff.services);
            filteredServices.forEach(s => currentSelected.add(s.id));
            newServices = Array.from(currentSelected);
        }
        
        setEditedStaff({ ...editedStaff, services: newServices });
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

    const handleSaveTimeOff = async () => {
        if (!editedStaff || !newTimeOff.start || !newTimeOff.end) {
            toast.error("Please select start and end dates.");
            return;
        }
        
        try {
            await createTimeOff({
                staffId: editedStaff.id,
                startDateTimeUtc: new Date(newTimeOff.start).toISOString(),
                endDateTimeUtc: new Date(newTimeOff.end).toISOString(),
                reason: newTimeOff.reason
            });
            
            // Refresh
            const updated = await fetchTimeOff(editedStaff.id);
            setTimeOffs(updated);
            setNewTimeOff({ start: '', end: '', reason: '' });
            toast.success("Time Off added successfully");
        } catch (e: any) {
             toast.error(e.message);
        }
    };

    const confirmDeleteTimeOff = async () => {
        if (!deleteTimeOffId) return;
        try {
            await deleteTimeOff(deleteTimeOffId);
             // Refresh
             if (editedStaff) {
                 const updated = await fetchTimeOff(editedStaff.id);
                 setTimeOffs(updated);
             }
             toast.success("Time Off removed successfully");
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setDeleteTimeOffId(null);
        }
    }

    const handleDeleteTimeOff = (id: number) => {
        setDeleteTimeOffId(id);
    }

    return (
        <div className="p-4 md:p-8">
            <InviteStaffModal isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} />
            {/* <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold">
                    {getRoleFromToken(getToken() || '') === 'Staff' ? 'My Profile' : 'Manage Staff Members'}
                </h1>
                <p className="text-gray-600 mt-1">
                    {getRoleFromToken(getToken() || '') === 'Staff' ? 'My profile and schedules' : 'Manage staff members and their schedules'}
                </p>
            </div> */}

            <div className={`grid grid-cols-1 ${getRoleFromToken(getToken() || '') === 'Staff' ? '' : 'lg:grid-cols-3'} gap-6`}>
                {/* Staff List */}
                {getRoleFromToken(getToken() || '') !== 'Staff' && (
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow">
                        {!(getRoleFromToken(getToken() || '') === 'Staff') && (
                            <div className="p-4 border-b border-gray-200">
                                <div className="relative">
                                     <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Search staff..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="divide-y divide-gray-200 max-h-[360px] overflow-y-auto custom-scrollbar">
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

                         <div className="p-4 border-t border-gray-200 space-y-2">
                           {!(getRoleFromToken(getToken() || '') === 'Staff') && (
                            <>
                            <button 
                                onClick={() => setShowInviteModal(true)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                            >
                                <Mail className="w-5 h-5" />
                                Invite Staff
                            </button>
                            <button 
                                onClick={handleAddNewStaff}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Add Manually
                            </button>
                            </>
                           )}
                        </div>
                    </div>
                </div>
                )}

                {/* Staff Details */}
                <div className={getRoleFromToken(getToken() || '') === 'Staff' ? 'lg:col-span-3' : 'lg:col-span-2'}>
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
                                        className={`px-6 py-3 font-medium whitespace-nowrap flex items-center gap-2 ${activeTab === 'details'
                                                ? 'border-b-2 border-indigo-600 text-indigo-600'
                                                : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                    >
                                        Details
                                        {(formErrors.firstName || formErrors.lastName || formErrors.email || formErrors.phone || formErrors.password) && (
                                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" title="Validation errors in this tab" />
                                        )}
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
                                    <button
                                        onClick={() => setActiveTab('timeoff')}
                                        className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'timeoff'
                                                ? 'border-b-2 border-indigo-600 text-indigo-600'
                                                : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                    >
                                        Time Off
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
                                                    First Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editedStaff.firstName ?? ''}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        setEditedStaff({ ...editedStaff, firstName: val });
                                                        
                                                        // Real-time validation
                                                        let error = '';
                                                        if (!val.trim()) error = "First name is required";
                                                        setFormErrors(prev => ({ ...prev, firstName: error }));
                                                    }}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                                {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                     <User className="w-4 h-4 inline mr-2" />
                                                    Last Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editedStaff.lastName ?? ''}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        setEditedStaff({ ...editedStaff, lastName: val });
                                                        
                                                        // Real-time validation
                                                        let error = '';
                                                        if (!val.trim()) error = "Last name is required";
                                                        setFormErrors(prev => ({ ...prev, lastName: error }));
                                                    }}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                                {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Mail className="w-4 h-4 inline mr-2" />
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={editedStaff.email ?? ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setEditedStaff({ ...editedStaff, email: val });
                                                    
                                                    // Real-time validation
                                                    let error = '';
                                                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                                    if (!val.trim()) {
                                                        error = "Email is required";
                                                    } else if (!emailRegex.test(val)) {
                                                        error = "Invalid email format";
                                                    }
                                                    setFormErrors(prev => ({ ...prev, email: error }));
                                                }}
                                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <PhoneIcon className="w-4 h-4 inline mr-2" />
                                                Phone
                                            </label>
                                            <PhoneInput
                                                value={editedStaff.phone ?? ''}
                                                onChange={(val) => {
                                                    setEditedStaff({ ...editedStaff, phone: val });
                                                    
                                                    // Real-time validation
                                                    let error = '';
                                                    if (val?.trim() && !isValidPhoneNumber(val)) {
                                                        error = "Invalid phone format";
                                                    }
                                                    setFormErrors(prev => ({ ...prev, phone: error }));
                                                }}
                                                placeholder="Enter phone number"
                                                error={formErrors.phone}
                                                prefixIcon={<PhoneIcon className="w-4 h-4 text-gray-400" />}
                                            />
                                        </div>

                                        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    <Briefcase className="w-4 h-4 inline mr-2" />
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      value={editedStaff.password ?? ""}
      onChange={(e) => {
          setEditedStaff({ ...editedStaff, password: e.target.value });
          if (formErrors.password) setFormErrors({ ...formErrors, password: '' });
      }}
      placeholder={
        editedStaff.id <= 0
          ? "Enter password for new staff"
          : "New password (leave blank to keep current)"
      }
      autoComplete="new-password"
      name="staff-password"
      className={`w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white ${formErrors.password ? 'border-red-500' : 'border-gray-300'}`}
    />

    {/* Eye icon — for both new and existing staff */}
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
    >
      {showPassword ? (
        // eye-off
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 3l18 18M10.73 5.08A9.97 9.97 0 0112 5
               c4.478 0 8.268 2.943 9.542 7
               a9.98 9.98 0 01-4.132 5.411M6.18 6.18
               A9.98 9.98 0 002.458 12
               c1.274 4.057 5.064 7 9.542 7
               a9.97 9.97 0 003.27-.53" />
        </svg>
      ) : (
        // eye
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5
               c4.478 0 8.268 2.943 9.542 7
               -1.274 4.057-5.064 7-9.542 7
               -4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  </div>

  {/* Helper text / reset link */}
  {editedStaff.id <= 0 ? (
    <p className={`text-xs mt-1 ${formErrors.password ? 'text-red-500' : 'text-gray-500'}`}>
      Required: Set a password for the new staff member
    </p>
  ) : (
    <div className="mt-2">
      {!(getRoleFromToken(getToken() || '') === 'Staff') && (
        <button
          type="button"
          onClick={() => toast.info("Reset password link functionality coming soon")}
          className="text-sm text-indigo-600 hover:text-indigo-700 underline"
        >
          Send a Reset Password Link to staff
        </button>
      )}
    </div>
  )}
</div>

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
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 mb-2"
      onChange={(e) => setServiceSearchTerm(e.target.value)}
      value={serviceSearchTerm}
    />

    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Select All Header */}
      {filteredServices.length > 0 && (
        <div className="bg-gray-50/80 px-4 py-2.5 border-b border-gray-200">
          <label className="flex items-center gap-3 cursor-pointer w-fit group">
            <input
              type="checkbox"
              checked={isAllFilteredSelected}
              onChange={handleToggleAllServices}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition-all cursor-pointer"
            />
            <span className="text-sm font-semibold text-gray-700 select-none group-hover:text-indigo-600 transition-colors">
              Select All Services
            </span>
          </label>
        </div>
      )}

      {/* Scrollable service list */}
      <div className="max-h-[300px] overflow-y-auto divide-y bg-white custom-scrollbar">
        {filteredServices.length > 0 ? (
          filteredServices.map(service => (
            <label
              key={service.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/30 cursor-pointer transition-colors group"
            >
              <input
                type="checkbox"
                checked={editedStaff.services.includes(service.id)}
                onChange={() => toggleService(service.id)}
                className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition-all cursor-pointer"
              />
              <span className="text-sm text-gray-800 select-none group-hover:text-gray-900">
                {service.name}
              </span>
            </label>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            No services found matching "{serviceSearchTerm}"
          </div>
        )}
      </div>
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

                            
                                {activeTab === 'timeoff' && (
                                    <div className="space-y-6">
                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <h3 className="font-semibold mb-3">Add Time Off</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                                <div>
                                                    <label className="block text-sm text-gray-700 mb-1">Start Date & Time</label>
                                                    <input 
                                                        type="datetime-local" 
                                                        className="w-full px-3 py-2 border rounded-lg"
                                                        value={newTimeOff.start}
                                                        onChange={e => setNewTimeOff({...newTimeOff, start: e.target.value})}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-700 mb-1">End Date & Time</label>
                                                    <input 
                                                        type="datetime-local" 
                                                        className="w-full px-3 py-2 border rounded-lg"
                                                        value={newTimeOff.end}
                                                        onChange={e => setNewTimeOff({...newTimeOff, end: e.target.value})}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                 <label className="block text-sm text-gray-700 mb-1">Reason</label>
                                                 <input 
                                                    type="text" 
                                                    className="w-full px-3 py-2 border rounded-lg"
                                                    placeholder="Vacation, Sick leave, etc."
                                                    value={newTimeOff.reason}
                                                    onChange={e => setNewTimeOff({...newTimeOff, reason: e.target.value})}
                                                 />
                                            </div>
                                            <button 
                                                onClick={handleSaveTimeOff}
                                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                                            >
                                                Add Time Off
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="font-semibold">History</h3>
                                            {timeOffs.length === 0 && <p className="text-gray-500 text-sm">No time off records.</p>}
                                            {timeOffs.map(t => (
                                                <div key={t.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                    <div>
                                                        <div className="font-medium">
                                                            {new Date(t.startDateTimeUtc).toLocaleString()} — {new Date(t.endDateTimeUtc).toLocaleString()}
                                                        </div>
                                                        <div className="text-sm text-gray-600">{t.reason || "No reason provided"}</div>
                                                        <div className="text-xs text-gray-500 capitalize">Status: {t.status}</div>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleDeleteTimeOff(t.id)}
                                                        className="text-red-600 hover:text-red-800 p-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t border-gray-200 flex justify-between">
            {editedStaff.id > 0 && !(getRoleFromToken(getToken() || '') === 'Staff') && (
  <button
    onClick={handleDeleteStaff}
    className="px-6 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
  >
    Remove Staff
  </button>
)}


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
                <ConfirmationModal
                    isOpen={!!deleteStaffId}
                    onClose={() => setDeleteStaffId(null)}
                    onConfirm={confirmDeleteStaff}
                    title="Remove Staff Member"
                    description="Are you sure you want to remove this staff member? They will be marked as inactive."
                    confirmText="Remove"
                    variant="destructive"
                />

                <ConfirmationModal
                    isOpen={!!deleteTimeOffId}
                    onClose={() => setDeleteTimeOffId(null)}
                    onConfirm={confirmDeleteTimeOff}
                    title="Remove Time Off"
                    description="Are you sure you want to remove this time off entry?"
                    confirmText="Remove"
                    variant="destructive"
                />
            </div>
        </div>
    );
}
