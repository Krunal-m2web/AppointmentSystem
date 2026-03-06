import { useEffect, useState } from 'react';
import { fetchStaff, updateStaff, fetchStaffAvailability, updateStaffAvailabilityBulk, deleteStaff, createStaff, fetchTimeOff, createTimeOff, deleteTimeOff, TimeOff } from '../../services/staffApi';
import { Search, Plus, X, User, Mail, Briefcase, Clock, Save, Calendar, Trash2 } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from '../ui/PhoneInput';
import { Phone as PhoneIcon } from 'lucide-react';
import type { Staff, TimeSlot, StaffServiceInfo } from '../../types/types';
import { fetchServices, ServiceListItem } from "../../services/serviceApi";
import { getToken, getCompanyIdFromToken, getRoleFromToken, getUserIdFromToken } from '../../utils/auth';
import { getDefaultCurrency } from '../../services/settingsService';
import { getCurrencySymbol } from '../../utils/currency';
import { toast } from 'sonner';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { InviteStaffModal } from './InviteStaffModal';
import { forgotPassword } from '../../services/authService';
import { PASSWORD_REQUIREMENTS, validatePassword } from '../../utils/passwordValidation';
import { EyeOff, Eye } from 'lucide-react';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

type TabType = 'details' | 'services' | 'schedules' | 'timeoff';

// Custom type for editing state where services are IDs and schedule is guaranteed array
interface EditableStaff extends Omit<Staff, 'services' | 'schedule'> {
    services: { serviceId: number; customPrice?: number }[];
    schedule: TimeSlot[];
    role?: string; 
    password?: string; // Optional, only for creation
    currency?: string;
}

export function StaffMembers() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isBulkDeleting, setIsBulkDeleting] = useState(false);
    const [defaultCurrency, setDefaultCurrency] = useState('');
    const [isSavingTimeOff, setIsSavingTimeOff] = useState(false);
    const [staff, setStaff] = useState<Staff[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [serviceSearchTerm, setServiceSearchTerm] = useState('');
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('details');
    const [isEditing, setIsEditing] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    // Use EditableStaff for the form state
    const [editedStaff, setEditedStaff] = useState<EditableStaff | null>(null);
    const [bulkDays, setBulkDays] = useState<number[]>([]);
    
    useEffect(() => {
        const loadCurrency = async () => {
            const currency = await getDefaultCurrency();
            setDefaultCurrency(currency);
        };
        loadCurrency();
        // fetchStaff(); // This call is already handled by another useEffect
    }, []);
    const [bulkStartTime, setBulkStartTime] = useState('09:00');
    const [bulkEndTime, setBulkEndTime] = useState('17:00');
    const [services, setServices] = useState<ServiceListItem[]>([]);
    const [timeOffs, setTimeOffs] = useState<TimeOff[]>([]);
    const [newTimeOff, setNewTimeOff] = useState({ start: '', end: '', reason: '' });
    const [deleteStaffId, setDeleteStaffId] = useState<number | null>(null);
    const [deleteTimeOffId, setDeleteTimeOffId] = useState<number | null>(null);
    // Track initial state to detect changes
    const [initialStaffState, setInitialStaffState] = useState<EditableStaff | null>(null);


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
        if (editedStaff.id <= 0) {
            if (!editedStaff.password) {
                errors.password = "Password is required";
            } else {
                const passValid = validatePassword(editedStaff.password, editedStaff.email);
                if (!passValid.isValid) {
                    errors.password = "Does not meet requirements";
                }
            }
        } else if (editedStaff.password) {
            // Validate if trying to update password
            const passValid = validatePassword(editedStaff.password, editedStaff.email);
            if (!passValid.isValid) {
                errors.password = "Does not meet requirements";
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


  useEffect(() => {
  if (!selectedStaff) return;

  let cancelled = false;

  const loadStaffData = async () => {

    try {
      const [availability, timeOffData] = await Promise.all([
        fetchStaffAvailability(selectedStaff.id),
        fetchTimeOff(selectedStaff.id)
      ]);

      setTimeOffs(timeOffData);

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

      setEditedStaff(prev => {
        const newState = prev ? { ...prev, schedule: scheduleData } : null;
        if (newState) setInitialStaffState(newState); // Set baseline after schedule is loaded
        return newState;
      });
    } catch (e) {
      console.error("Failed to load availability", e);
    }
  };

  loadStaffData();


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
        .finally(() => setIsInitialLoading(false));
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

const timeToMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

const isValidSlot = (startTime: string, endTime: string) => {
  return timeToMinutes(startTime) < timeToMinutes(endTime);
};

const isOverlapping = (s1: {startTime: string, endTime: string}, s2: {startTime: string, endTime: string}) => {
  const start1 = timeToMinutes(s1.startTime);
  const end1 = timeToMinutes(s1.endTime);
  const start2 = timeToMinutes(s2.startTime);
  const end2 = timeToMinutes(s2.endTime);
  return start1 < end2 && end1 > start2;
};

const applyBulkSchedule = () => {
  if (!editedStaff) return;
  if (bulkDays.length === 0) return;

  if (!isValidSlot(bulkStartTime, bulkEndTime)) {
    toast.error("Start time must be before end time.");
    return;
  }

  const newSlots: TimeSlot[] = [];
  let overlapFound = false;
  
  bulkDays.forEach(day => {
    const bulkSlot = { startTime: bulkStartTime, endTime: bulkEndTime };
    
    // Check if THIS slot overlaps with ANY existing slot for THIS day
    const overlap = editedStaff.schedule.some(s => 
      s.dayOfWeek === day && isOverlapping(s, bulkSlot)
    );
    
    if (!overlap) {
      newSlots.push({
        id: `${day}-${Date.now()}-${Math.random()}`,
        dayOfWeek: day,
        startTime: bulkStartTime,
        endTime: bulkEndTime,
      });
    } else {
        overlapFound = true;
    }
  });

  if (newSlots.length === 0) {
    toast.error("Selected slots overlap with existing ones for these days.");
    return;
  }
  
  if (overlapFound) {
      toast.warning("Some slots were skipped due to overlaps.");
  }

  setEditedStaff({
    ...editedStaff,
    schedule: [...editedStaff.schedule, ...newSlots],
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
  const serviceAssignments =
    staffMember.services?.map((s: any) => ({
      serviceId: typeof s === "object" ? s.serviceId : s,
      customPrice: typeof s === "object" ? s.customPrice : undefined,
    })) ?? [];

  const editable: EditableStaff = {
    ...staffMember,
    services: serviceAssignments,
    schedule: [], // will be filled by useEffect
    role: "",
  };

  setSelectedStaff(staffMember);
  setEditedStaff(editable);
  setInitialStaffState(editable); // Temporary baseline
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
        setInitialStaffState(editableNewStaff); // Absolute baseline for new staff
        setFormErrors({}); // Clear errors for new staff
        setActiveTab("details");
    };


    const checkOverlap = (schedule: TimeSlot[]) => {
        for (let i = 0; i < schedule.length; i++) {
            const s1 = schedule[i];
            
            // Check for reverse/invalid slots
            if (!isValidSlot(s1.startTime, s1.endTime)) {
                return { error: `Invalid time slot found: ${s1.startTime} - ${s1.endTime}. Start time must be before end time.` };
            }

            for (let j = i + 1; j < schedule.length; j++) {
                const s2 = schedule[j];
                
                if (s1.dayOfWeek === s2.dayOfWeek) {
                    if (isOverlapping(s1, s2)) {
                        return { error: `Overlapping slots found on ${DAYS_OF_WEEK[s1.dayOfWeek]}: ${s1.startTime}-${s1.endTime} and ${s2.startTime}-${s2.endTime}` };
                    }
                }
            }
        }
        return null; // No errors
    };

// Optimized handleSave function:
const handleSave = async () => {
    if (!editedStaff || isSaving) return;
    
    // Client-side validation
    if (!validateForm()) {
        setActiveTab('details'); // Automatically switch to details tab to show errors
        toast.error("Please fix the errors in the Details tab before saving.");
        return;
    }
    
    // validate overlaps and reverse slots locally
    const validationError = checkOverlap(editedStaff.schedule);
    if (validationError) {
        toast.error(validationError.error);
        return;
    }

    setIsSaving(true);

    try {
        const companyId = getCompanyIdFromToken(getToken() || "");
        if (!companyId) {
            toast.error("Error: Missing Company ID. Please log in again.");
            setIsSaving(false);
            return;
        }

        let staffId = editedStaff.id;

        // 1. CREATE or UPDATE Staff details and services
        if (editedStaff.id <= 0) {
            const newStaff = await createStaff({
                companyId,
                firstName: editedStaff.firstName || "",
                lastName: editedStaff.lastName || "",
                email: editedStaff.email || "",
                phone: editedStaff.phone,
                services: editedStaff.services,
                password: editedStaff.password   
            });
            staffId = newStaff.id;
        } else {
            await updateStaff(editedStaff as any);
        }
        
        // 2. BULK Availability Update
        if (staffId > 0) {
            const slots = editedStaff.schedule.map(slot => ({
                dayOfWeek: slot.dayOfWeek,
                startTime: slot.startTime.length === 5 ? slot.startTime + ":00" : slot.startTime,
                endTime: slot.endTime.length === 5 ? slot.endTime + ":00" : slot.endTime,
                isAvailable: true
            }));

            await updateStaffAvailabilityBulk({
                staffId: staffId,
                slots: slots
            });
        }

        // 3. Refresh staff list and current selection in parallel
        const [refreshedStaffList, availability, timeOffList] = await Promise.all([
            fetchStaff(),
            fetchStaffAvailability(staffId),
            fetchTimeOff(staffId)
        ]);

        setStaff(refreshedStaffList);

        // Post-save selection/reset logic
        if (editedStaff.id <= 0) {
            // If it was a new staff, reset to "Add Manually" form
            handleAddNewStaff();
            toast.success("Staff and schedule saved successfully!");
        } else {
            // Reload the current staff member with fresh data
            const updated = refreshedStaffList.find(s => s.id === staffId);
            if (updated) {
                const currentTab = activeTab;
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

                const finalState: EditableStaff = {
                    ...updated,
                    services: serviceIds,
                    schedule: scheduleData,
                    role: ''
                };
                setEditedStaff(finalState);
                setInitialStaffState(finalState);
                setActiveTab(currentTab);
            }
            toast.success("Staff and schedule updated successfully!");
        }

    } catch (err: any) {
        console.error("Save error:", err);
        toast.error(`Failed to save staff: ${err.message}`);
    } finally {
        setIsSaving(false);
    }
};

const handleReset = () => {
    if (initialStaffState) {
        setEditedStaff(initialStaffState);
        setFormErrors({});
        toast.info("Changes discarded");
    }
};

const hasUnsavedChanges = () => {
    if (!editedStaff || !initialStaffState) return false;
    
    // Check if it's a new staff member
    if (initialStaffState.id === 0) {
        // For new staff, count as changed if any basic field is non-empty
        return (
            (editedStaff.firstName?.trim() ?? '') !== '' ||
            (editedStaff.lastName?.trim() ?? '') !== '' ||
            (editedStaff.email?.trim() ?? '') !== '' ||
            (editedStaff.phone?.trim() ?? '') !== '' ||
            editedStaff.services.length > 0 ||
            editedStaff.schedule.length > 0 ||
            (editedStaff.password?.length ?? 0) > 0
        );
    }

    // Comparison logic for existing staff
    const basicChanged = 
        editedStaff.firstName !== initialStaffState.firstName ||
        editedStaff.lastName !== initialStaffState.lastName ||
        editedStaff.email !== initialStaffState.email ||
        editedStaff.phone !== initialStaffState.phone ||
        (editedStaff.password !== undefined && editedStaff.password !== '');

    const servicesChanged = 
        editedStaff.services.length !== initialStaffState.services.length ||
        !editedStaff.services.every(id => initialStaffState.services.includes(id));

    const scheduleChanged = 
        editedStaff.schedule.length !== initialStaffState.schedule.length ||
        JSON.stringify(editedStaff.schedule) !== JSON.stringify(initialStaffState.schedule);

    return basicChanged || servicesChanged || scheduleChanged;
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
        const exists = editedStaff.services.find(s => s.serviceId === serviceId);
        const services = exists
            ? editedStaff.services.filter(s => s.serviceId !== serviceId)
            : [...editedStaff.services, { serviceId }];
        setEditedStaff({ ...editedStaff, services });
    };

    const updateServicePrice = (serviceId: number, price: string) => {
        if (!editedStaff) return;
        const numPrice = price.trim() === '' ? undefined : parseFloat(price);
        const services = editedStaff.services.map(s => 
            s.serviceId === serviceId ? { ...s, customPrice: numPrice } : s
        );
        setEditedStaff({ ...editedStaff, services });
    };

    const filteredServices = services.filter(s =>
        s.name.toLowerCase().includes(serviceSearchTerm.toLowerCase())
    );

    const isAllFilteredSelected = filteredServices.length > 0 && 
        filteredServices.every(s => editedStaff?.services.some(as => as.serviceId === s.id));

    const handleToggleAllServices = () => {
        if (!editedStaff) return;
        
        let newServices;
        if (isAllFilteredSelected) {
            // Unselect all in current filter
            const filteredIds = filteredServices.map(s => s.id);
            newServices = editedStaff.services.filter(s => !filteredIds.includes(s.serviceId));
        } else {
            // Select all in current filter
            const currentSelectedIds = new Set(editedStaff.services.map(s => s.serviceId));
            const toAdd = filteredServices.filter(s => !currentSelectedIds.has(s.id)).map(s => ({ serviceId: s.id }));
            newServices = [...editedStaff.services, ...toAdd];
        }
        
        setEditedStaff({ ...editedStaff, services: newServices });
    };

    const addTimeSlot = (dayOfWeek: number) => {
        if (!editedStaff) return;
        
        const daySlots = editedStaff.schedule.filter(s => s.dayOfWeek === dayOfWeek);
        
        let startTime = '09:00';
        let endTime = '17:00';
        
        if (daySlots.length > 0) {
            // Find the latest end time
            const lastSlot = [...daySlots].sort((a, b) => b.endTime.localeCompare(a.endTime))[0];
            
            // Default to 1 hour after the last slot
            const [hours, minutes] = lastSlot.endTime.split(':').map(Number);
            const startHour = Math.min(hours + 1, 23);
            const endHour = Math.min(startHour + 1, 23);
            
            startTime = `${String(startHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            endTime = `${String(endHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        }
        
        const newSlot: TimeSlot = {
            id: Date.now().toString(),
            dayOfWeek,
            startTime,
            endTime,
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
        
        setIsSavingTimeOff(true);
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
        } finally {
            setIsSavingTimeOff(false);
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
                {isInitialLoading ? (
                    <div className="col-span-full bg-white rounded-lg shadow p-8 animate-pulse">
                        <div className="flex gap-6">
                            {/* Fake Sidebar for admins */}
                            {getRoleFromToken(getToken() || '') !== 'Staff' && (
                                <div className="w-1/3 space-y-4 border-r pr-6 border-gray-100 h-96">
                                    <div className="h-10 bg-gray-100 rounded-lg w-full mb-6"></div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                                            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                                            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Fake Forms Area */}
                            <div className="flex-1 space-y-6">
                                <div className="h-8 bg-gray-100 rounded w-1/4 mb-8"></div>
                                <div className="flex gap-4 border-b border-gray-100 pb-4">
                                    <div className="h-6 bg-gray-100 rounded w-20"></div>
                                    <div className="h-6 bg-gray-100 rounded w-20"></div>
                                    <div className="h-6 bg-gray-100 rounded w-20"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-6 mt-6">
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-100 rounded w-16"></div>
                                        <div className="h-10 bg-gray-100 rounded w-full"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-100 rounded w-16"></div>
                                        <div className="h-10 bg-gray-100 rounded w-full"></div>
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <div className="h-4 bg-gray-100 rounded w-16"></div>
                                        <div className="h-10 bg-gray-100 rounded w-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                <>
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
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
                            >
                                <Mail className="w-5 h-5" />
                                Invite Staff
                            </button>
                            <button 
                                onClick={handleAddNewStaff}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm cursor-pointer"
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
                                        className={`px-6 py-3 font-medium whitespace-nowrap flex items-center gap-2 cursor-pointer ${activeTab === 'details'
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
                                        className={`px-6 py-3 font-medium whitespace-nowrap cursor-pointer ${activeTab === 'services'
                                                ? 'border-b-2 border-indigo-600 text-indigo-600'
                                                : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                    >
                                        Services
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('schedules')}
                                        className={`px-6 py-3 font-medium whitespace-nowrap cursor-pointer ${activeTab === 'schedules'
                                                ? 'border-b-2 border-indigo-600 text-indigo-600'
                                                : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                    >
                                        Schedules
                                    </button>
                                    {/* <button
                                        onClick={() => setActiveTab('timeoff')}
                                        className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'timeoff'
                                                ? 'border-b-2 border-indigo-600 text-indigo-600'
                                                : 'text-gray-600 hover:text-gray-800'
                                            }`}
                                    >
                                        Time Off
                                    </button> */}
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
                                                        const val = e.target.value;
                                                        setEditedStaff({ ...editedStaff, password: val });
                                                        
                                                        // Real-time validation
                                                        const passValid = validatePassword(val, editedStaff.email);
                                                        if (val.length > 0 && !passValid.isValid) {
                                                            setFormErrors(prev => ({ ...prev, password: 'Does not meet requirements' }));
                                                        } else {
                                                            if (formErrors.password) setFormErrors(prev => ({ ...prev, password: '' }));
                                                        }
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

                                                {/* Eye icon */}
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>

                                            {/* Password Requirements Checklist */}
                                            <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Password Requirements</p>
                                                <div className="grid grid-cols-1 gap-1.5">
                                                    {PASSWORD_REQUIREMENTS.map((req) => {
                                                        const isMet = req.test(editedStaff.password || '');
                                                        return (
                                                            <div key={req.id} className="flex items-center gap-2">
                                                                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${isMet ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                                                                    {isMet && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                                                </div>
                                                                <span className={`text-[11px] ${isMet ? 'text-emerald-600 font-medium' : 'text-gray-500'}`}>
                                                                    {req.label}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                    {/* Email match check */}
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${editedStaff.password && editedStaff.email && editedStaff.password.toLowerCase() !== editedStaff.email.toLowerCase() ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                                                            {editedStaff.password && editedStaff.email && editedStaff.password.toLowerCase() !== editedStaff.email.toLowerCase() && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                                        </div>
                                                        <span className={`text-[11px] ${editedStaff.password && editedStaff.email && editedStaff.password.toLowerCase() !== editedStaff.email.toLowerCase() ? 'text-emerald-600 font-medium' : 'text-gray-500'}`}>
                                                            Must not match email
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}

                                            {/* Helper text / reset link */}
                                            {editedStaff.id <= 0 ? (
                                                <p className="text-[10px] text-gray-400 mt-2 italic">
                                                    Staff members can change their password after their first login.
                                                </p>
                                            ) : (
                                                <div className="mt-2">
                                                    {!(getRoleFromToken(getToken() || '') === 'Staff') && (
                                                        <button
                                                            type="button"
                                                            onClick={async () => {
                                                                if (editedStaff?.email) {
                                                                    try {
                                                                        await forgotPassword(editedStaff.email);
                                                                        toast.success(`Password reset link sent to ${editedStaff.email}`);
                                                                    } catch (err: any) {
                                                                        toast.error(err.message || "Failed to send reset link");
                                                                    }
                                                                }
                                                            }}
                                                            className="text-sm text-indigo-600 hover:text-indigo-700 underline cursor-pointer"
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
      Select which services this staff member can provide and set custom prices if needed
    </p>

    {/* Search input */}
    <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search services..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 mb-2"
          onChange={(e) => setServiceSearchTerm(e.target.value)}
          value={serviceSearchTerm}
        />
    </div>

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
      <div className="max-h-[400px] overflow-y-auto divide-y bg-white custom-scrollbar">
        {filteredServices.length > 0 ? (
          filteredServices.map(service => {
            const assignment = editedStaff.services.find(as => as.serviceId === service.id);
            const isSelected = !!assignment;
            
            return (
              <div
                key={service.id}
                className={`flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 hover:bg-indigo-50/30 transition-colors group ${isSelected ? 'bg-indigo-50/10' : ''}`}
              >
                <label className="flex items-center gap-3 flex-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleService(service.id)}
                    className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition-all cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800 select-none group-hover:text-gray-900">
                      {service.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      Default: {getCurrencySymbol(defaultCurrency)}{service.price} • {service.serviceDuration} min
                    </span>
                  </div>
                </label>

                {isSelected && (
                  <div className="flex items-center gap-2 sm:ml-auto">
                    <span className="text-xs text-gray-400">Custom Price ({getCurrencySymbol(editedStaff?.currency || defaultCurrency)}):</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={assignment.customPrice ?? service.price}
                      onChange={(e) => updateServicePrice(service.id, e.target.value)}
                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none font-medium text-gray-900"
                    />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-gray-500">
            No services found matching "{serviceSearchTerm}"
          </div>
        )}
      </div>
    </div>

    {/* Selected count */}
    <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500">
          {editedStaff.services.length} service(s) selected
        </p>
        {editedStaff.services.length > 0 && (
            <button 
                onClick={() => setEditedStaff({...editedStaff, services: []})}
                className="text-xs text-red-500 hover:text-red-700"
            >
                Clear all
            </button>
        )}
    </div>
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
                                                            className={`px-3 py-1 rounded-full text-sm border transition cursor-pointer
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
                                                        className="mt-5 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
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
                                                                    className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
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
                                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
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

                            
                                {/* {activeTab === 'timeoff' && (
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
                                                disabled={isSavingTimeOff}
                                                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                                            >
                                                {isSavingTimeOff ? (
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Plus className="w-4 h-4" />
                                                )}
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
                                )} */}
                            </div>

                            <div className="p-6 border-t border-gray-200 flex justify-between">
            {editedStaff.id > 0 && !(getRoleFromToken(getToken() || '') === 'Staff') && (
  <button
    onClick={handleDeleteStaff}
    className="px-6 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 cursor-pointer"
  >
    Remove Staff
  </button>
)}
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
                </>
                )}
            </div>

            {/* Global Sticky Save Bar */}
            {hasUnsavedChanges() && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-gray-900 text-white p-4 rounded-2xl shadow-2xl z-[100] flex items-center justify-between border border-gray-700 animate-in slide-in-from-bottom-8 duration-300">
                    <div className="flex items-center gap-3 ml-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                        <span className="font-semibold tracking-tight text-gray-100">You have unsaved changes</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleReset}
                            disabled={isSaving}
                            className="px-4 py-2 text-gray-400 hover:text-white font-bold text-sm transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isSaving ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            <span className="font-bold text-sm">Save Changes</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
