
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, CalendarX, CalendarClock, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea";
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAvailableSlots, fetchStaffTimeOffs, fetchAnyStaffSlots } from '../services/availabilityService';
import { rescheduleByToken } from '../services/appointmentApi';
import { combineDateTimeToUTC, formatDate, formatTime, getTimezoneOffset } from "../utils/datetime";
import { 
    CheckCircle2, 
    Globe, 
    ArrowLeft, 
    ChevronLeft, 
    ChevronRight,
    MapPin,
    CreditCard,
    DollarSign,
    Lock
} from 'lucide-react';

interface RescheduleCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  selectedTime: string;
  onSelectTime: (time: string) => void;
  timezone: string;
  unavailableDates?: Date[];
  timeSlots?: string[];
  isLoadingSlots?: boolean;
}

const RescheduleCalendar: React.FC<RescheduleCalendarProps> = ({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  timezone,
  unavailableDates = [],
  timeSlots = [],
  isLoadingSlots = false,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [direction, setDirection] = useState(0);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const changeMonth = (val: number) => {
    setDirection(val);
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + val);
    setCurrentMonth(newDate);
  };

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
  };

  const isPastDate = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateUnavailable = (date: Date | null, unavailableDates: Date[] = []) => {
    if (!date) return false;
    return unavailableDates.some(unavailable => 
        unavailable.getDate() === date.getDate() &&
        unavailable.getMonth() === date.getMonth() &&
        unavailable.getFullYear() === date.getFullYear()
    );
  };

  const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 20 : -20,
        opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
        x: direction < 0 ? 20 : -20,
        opacity: 0,
    }),
  };

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 font-sans">
        <div className="flex flex-col gap-6">
            {/* Calendar Section */}
            <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-800">
                      Select Date
                  </h3>
                  <div className="flex items-center gap-2">
                    <button onClick={() => changeMonth(-1)} className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-full transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.span
                            key={currentMonth.toISOString()}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="text-sm font-bold text-gray-700 min-w-[100px] text-center"
                        >
                            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        </motion.span>
                    </AnimatePresence>
                    <button onClick={() => changeMonth(1)} className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-full transition-colors">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center mb-1">
                    {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                        <div key={day} className="text-[10px] font-bold text-gray-400 py-1">{day}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {days.map((date, index) => {
                        const isSelected = isSameDay(date, selectedDate);
                        const isPast = isPastDate(date);
                        const isUnavailable = isDateUnavailable(date, unavailableDates);
                        const isDisabled = !date || isPast || isUnavailable;

                        return (
                            <div key={index} className="aspect-square flex items-center justify-center relative">
                                {date && (
                                    <button
                                        onClick={() => !isDisabled && onSelectDate(date)}
                                        disabled={isDisabled}
                                        className={`
                                            w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all
                                            ${isSelected ? "bg-indigo-600 text-white shadow-md scale-110" : "text-gray-700 hover:bg-indigo-50"}
                                            ${isDisabled ? "text-gray-300 cursor-not-allowed opacity-50" : "cursor-pointer"}
                                        `}
                                    >
                                        {date.getDate()}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Time Slot Section - BELOW */}
            <div className="w-full pt-4 border-t border-gray-100">
                {selectedDate ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex items-center justify-between mb-4">
                             <h3 className="text-sm font-bold text-gray-800">
                                Available Time Slots
                             </h3>
                             <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
                                 {selectedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                             </span>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar p-1">
                            {isLoadingSlots ? (
                                <div className="col-span-full flex justify-center py-8">
                                    <Loader2 className="animate-spin h-6 w-6 text-indigo-600" />
                                </div>
                            ) : timeSlots.length === 0 ? (
                                <div className="col-span-full text-center text-gray-500 py-6 text-xs italic">
                                    No available slots for this date.
                                </div>
                            ) : (
                                timeSlots.map((time, index) => {
                                    const isSelected = selectedTime === time;
                                    return (
                                        <motion.button
                                            key={time}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.02 }}
                                            onClick={() => onSelectTime(time)}
                                            className={`
                                                py-2.5 px-2 rounded-lg border text-[11px] font-bold transition-all
                                                ${isSelected 
                                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm scale-[1.05]" 
                                                    : "bg-white text-indigo-700 border-indigo-100 hover:border-indigo-600 hover:bg-indigo-50"}
                                            `}
                                        >
                                            {time}
                                        </motion.button>
                                    );
                                })
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-center py-8 text-gray-400 text-xs italic">
                        Please select a date above to see available times.
                    </div>
                )}
            </div>
        </div>
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e2e8f0; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #cbd5e1; }
        `}</style>
    </div>
  );
};

interface SimpleAppointment {
  id: number;
  serviceName: string;
  startDateTime: string;
  status: string;
  paymentStatus: string;
  price: number;
  currencyCode: string;
}

interface AppointmentDetails {
  id: number;
  serviceName: string;
  staffName: string;
  startDateTime: string; 
  endDateTime: string;
  status: string;
  customerName: string;
  customerPhone: string;
  price: number;
  currencyCode: string;
  serviceId: number;
  staffId?: number | null;
  companyPhone?: string;
  companySlug?: string;
  meetingType: 'InPerson' | 'Phone' | 'Zoom';
  paymentMethod: 'Card' | 'Cash' | 'PayPal';
  paymentStatus: 'Unpaid' | 'Paid' | 'Refunded';
  allowCustomerRescheduling: boolean;
  reschedulingMinLeadTime: number;
  allowCustomerCanceling: boolean;
  cancelingMinLeadTime: number;
  customerTotalAppointments: number;
  customerTotalUnpaidAmount: number;
  customerOtherAppointments: SimpleAppointment[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5289';

export const ManageBookingPage: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState<AppointmentDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [cancelReason, setCancelReason] = useState("");
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    // Rescheduling state
    const [isRescheduling, setIsRescheduling] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [slotsLoading, setSlotsLoading] = useState(false);
    const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
    const [customerTimezone, setCustomerTimezone] = useState<string>(() => {
        try {
            return Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch {
            return 'UTC';
        }
    });

    useEffect(() => {
        if (!token) return;
        fetchAppointment();
    }, [token]);

    // Handle auto-reschedule via query parameter only AFTER appointment is loaded and rules are checked
    useEffect(() => {
        if (!appointment) return;

        const params = new URLSearchParams(window.location.search);
        if (params.get('reschedule') === 'true') {
            const startDate = new Date(appointment.startDateTime);
            const isToday = new Date().toDateString() === startDate.toDateString();
            const isPast = new Date() > startDate;
            const rescheduleDeadline = new Date(startDate.getTime() - (appointment.reschedulingMinLeadTime * 60 * 60 * 1000));
            const canRescheduleVal = appointment.allowCustomerRescheduling && 
                                  new Date() < rescheduleDeadline && 
                                  appointment.status !== 'Cancelled' && 
                                  !isPast;

            if (canRescheduleVal) {
                setIsRescheduling(true);
                // Clear the param from URL to prevent re-opening on manual refresh after reschedule
                const newUrl = window.location.pathname;
                window.history.replaceState({}, '', newUrl);
            } else {
                toast.error("Rescheduling is not allowed for this appointment at this time.");
            }
        }
    }, [appointment]);

    const fetchAppointment = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/appointments/by-token/${token}`);
            if (!res.ok) throw new Error("Failed to load appointment");
            const data = await res.json();
            setAppointment(data);
        } catch (error) {
            toast.error("Invalid link or appointment not found.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!token) return;
        setActionLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/appointments/cancel-by-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, reason: cancelReason })
            });

            if (!res.ok) {
                const err = await res.text(); // or json
                throw new Error(err || "Failed to cancel");
            }

            toast.success("Appointment cancelled successfully.");
            setCancelModalOpen(false);
            fetchAppointment(); // Refresh status
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setActionLoading(false);
        }
    };

    // Load available slots when rescheduling
    useEffect(() => {
        const loadSlots = async () => {
            if (!isRescheduling || !selectedDate || !appointment) {
                setAvailableSlots([]);
                return;
            }

            try {
                setSlotsLoading(true);
                // Use local date components instead of toISOString to avoid timezone shifts
                const year = selectedDate.getFullYear();
                const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                const day = String(selectedDate.getDate()).padStart(2, '0');
                const dateStr = `${year}-${month}-${day}`;
                
                let slots = [];
                if (appointment.staffId && appointment.staffId > 0) {
                    slots = await fetchAvailableSlots(appointment.staffId, appointment.serviceId, dateStr);
                } else {
                    slots = await fetchAnyStaffSlots(appointment.serviceId, dateStr);
                }

                const formattedSlots = slots
                    .filter(s => s.isAvailable)
                    .map(s => new Date(s.startTime).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        timeZone: customerTimezone,
                        hour12: true
                    }).toLowerCase().replace(' ', ''));
                
                setAvailableSlots(Array.from(new Set(formattedSlots)));
            } catch (err) {
                console.error("Error loading slots:", err);
                toast.error("Failed to load available slots.");
            } finally {
                setSlotsLoading(false);
            }
        };

        loadSlots();
    }, [isRescheduling, selectedDate, appointment, customerTimezone]);

    // Load time offs when rescheduling sets up
    useEffect(() => {
        const loadTimeOffs = async () => {
            if (!isRescheduling || !appointment || !appointment.staffId || appointment.staffId <= 0) {
                setUnavailableDates([]);
                return;
            }

            try {
                const timeOffs = await fetchStaffTimeOffs(appointment.staffId);
                const disabledDates: Date[] = [];
                timeOffs.forEach((t) => {
                    const start = new Date(t.startDateTimeUtc);
                    const end = new Date(t.endDateTimeUtc);
                    let d = new Date(start);
                    while (d <= end) {
                        disabledDates.push(new Date(d));
                        d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
                    }
                });
                setUnavailableDates(disabledDates);
            } catch (err) {
                console.error("Error loading time offs:", err);
            }
        };

        loadTimeOffs();
    }, [isRescheduling, appointment]);

    const handleConfirmReschedule = async () => {
        if (!token || !selectedDate || !selectedTime) {
            toast.error("Please select a new date and time.");
            return;
        }

        setActionLoading(true);
        try {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;
            const startTimeUtc = combineDateTimeToUTC(dateStr, selectedTime, customerTimezone);

            await rescheduleByToken(token, startTimeUtc);
            
            toast.success("Appointment rescheduled successfully!");
            setIsRescheduling(false);
            fetchAppointment();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleReschedule = () => {
        setIsRescheduling(true);
        setSelectedDate(null);
        setSelectedTime("");
    };

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
    }

    if (!appointment) {
        return <div className="flex h-screen items-center justify-center">Appointment not found.</div>;
    }

    const startDate = new Date(appointment.startDateTime);
    const isToday = new Date().toDateString() === startDate.toDateString();
    const isPast = new Date() > startDate;
    const cancelDeadline = new Date(startDate.getTime() - (appointment.cancelingMinLeadTime * 60 * 60 * 1000));
    const canCancel = appointment.allowCustomerCanceling && 
                      new Date() < cancelDeadline && 
                      appointment.status !== 'Cancelled' && 
                      !isPast;

    const rescheduleDeadline = new Date(startDate.getTime() - (appointment.reschedulingMinLeadTime * 60 * 60 * 1000));
    const canReschedule = appointment.allowCustomerRescheduling && 
                          new Date() < rescheduleDeadline && 
                          appointment.status !== 'Cancelled' && 
                          !isPast;
    
    const params = new URLSearchParams(window.location.search);
    const isRescheduleLink = params.get('reschedule') === 'true';
    
    // Determine if we should show the "Cannot modify online" info box
    // If in rescheduling flow, only show if rescheduling is blocked.
    // Otherwise show if either action is blocked.
    const showInfoBox = appointment.status !== 'Cancelled' && (
        (isRescheduleLink && !canReschedule) ||
        (isRescheduling && !canReschedule) ||
        (!isRescheduleLink && !isRescheduling && (!canCancel || !canReschedule))
    );

    const infoBoxTitle = !canCancel && !canReschedule ? "Cannot reschedule and cancel online" : 
                         (isRescheduleLink || isRescheduling) ? "Cannot reschedule" : 
                         !canCancel ? "Cannot cancel online" : "Cannot reschedule";

    const getMeetingTypeLabel = (type: string) => {
        if (type === 'InPerson') return 'In Person';
        if (type === 'Phone') return 'Phone Call';
        return type;
    };

    const getPaymentMethodLabel = (method: string) => {
        if (method === 'Card') return 'Credit/Debit Card';
        return method;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">Manage Appointment</h1>
                    <p className="text-gray-500">
                        {appointment.serviceName} with {appointment.staffName}
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Date</span>
                        <span className="font-medium">
                            {startDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Time</span>
                        <span className="font-medium">
                            {startDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Status</span>
                        <span className={`font-medium px-2 py-0.5 rounded-full text-sm ${
                            appointment.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                            appointment.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                        }`}>
                            {appointment.status}
                        </span>
                    </div>

                    <div className="pt-2 border-t border-gray-100 space-y-2">
                         <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-gray-500 gap-1.5">
                                <MapPin className="w-4 h-4" />
                                <span>Location</span>
                            </div>
                            <span className="font-medium text-gray-900">{getMeetingTypeLabel(appointment.meetingType)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-gray-500 gap-1.5">
                                <DollarSign className="w-4 h-4" />
                                <span>Price</span>
                            </div>
                            <span className="font-medium text-gray-900">
                                {appointment.price} {appointment.currencyCode}
                                {appointment.paymentStatus === 'Paid' ? 
                                    <span className="ml-1.5 text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full uppercase font-bold">Paid</span> : 
                                    <span className="ml-1.5 text-[10px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full uppercase font-bold">Unpaid</span>
                                }
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-gray-500 gap-1.5">
                                <CreditCard className="w-4 h-4" />
                                <span>Payment</span>
                            </div>
                            <span className="font-medium text-gray-900">{getPaymentMethodLabel(appointment.paymentMethod)}</span>
                        </div>
                        {appointment.customerTotalAppointments !== undefined && (
                            <div className="pt-2 border-t border-gray-200">
                                <p className="text-xs text-gray-500 text-center">
                                    Total bookings: <span className="font-semibold text-gray-700">{appointment.customerTotalAppointments}</span> • Unpaid balance: <span className="font-semibold text-amber-600">{appointment.customerTotalUnpaidAmount || 0} {appointment.currencyCode}</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>



                {/* Show "Cannot cancel/reschedule online" if rules are violated */}
                {showInfoBox && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 bg-blue-50/80 border border-blue-100 rounded-2xl flex gap-4 mb-6"
                    >
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-blue-50 shrink-0">
                            <Phone className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-bold text-blue-900 text-sm">
                                {infoBoxTitle}
                            </h4>
                            <p className="text-sm text-blue-700 leading-relaxed font-medium">
                               Please call us directly at <a href={`tel:${appointment?.companyPhone}`} className="font-bold hover:underline">{appointment?.companyPhone || '+919898424995'}</a> to {
                                   !canCancel && !canReschedule ? "reschedule and cancel" : 
                                   !canReschedule ? "reschedule" : "cancel"
                               }.
                            </p>
                        </div>
                    </motion.div>
                )}

                {appointment.status !== 'Cancelled' && (
                    <div className="space-y-4">
                        {isRescheduling ? (
                            <div className="space-y-6 animate-fadeIn">
                                {/* Option 2: Preview Card of Previous Info */}
                                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl p-4 relative overflow-hidden">
                                     <div className="absolute top-0 right-0 p-2 opacity-10">
                                         <CalendarClock className="w-16 h-16" />
                                     </div>
                                     <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-2">Previous Appointment</p>
                                     <h3 className="font-bold text-slate-900">{appointment.serviceName}</h3>
                                     <p className="text-sm text-slate-600 mb-3">with {appointment.staffName}</p>
                                     <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-700">
                                         <span className="flex items-center gap-1">
                                             <CalendarClock className="w-3 h-3" /> {new Date(appointment.startDateTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                         </span>
                                         <span className="flex items-center gap-1">
                                             <Loader2 className="w-3 h-3 animate-none" /> {new Date(appointment.startDateTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                         </span>
                                     </div>
                                </div>

                                <div className="space-y-4">
                                     <div className="flex items-center justify-between mb-2">
                                         <h2 className="text-lg font-bold text-slate-900">Select New Date & Time</h2>
                                         <Button variant="ghost" size="sm" onClick={() => setIsRescheduling(false)} className="text-slate-500 hover:text-slate-700">
                                             <ArrowLeft className="w-4 h-4 mr-1" /> Back
                                         </Button>
                                     </div>
                                     
                                     <div className="bg-slate-50 p-4 rounded-xl mb-4 border border-slate-200">
                                        <div className="flex items-center gap-2 mb-2 text-slate-900 font-semibold text-sm">
                                            <Globe className="w-4 h-4 text-indigo-600" />
                                            Your Timezone: <span className="text-slate-600 font-normal">{customerTimezone}</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500">Current offset: {getTimezoneOffset(customerTimezone)}</p>
                                     </div>

                                     <RescheduleCalendar
                                         selectedDate={selectedDate}
                                         onSelectDate={setSelectedDate}
                                         selectedTime={selectedTime}
                                         onSelectTime={setSelectedTime}
                                         timezone={customerTimezone}
                                         unavailableDates={unavailableDates}
                                         timeSlots={availableSlots}
                                         isLoadingSlots={slotsLoading}
                                     />

                                     <div className="pt-4 border-t border-slate-100 flex gap-3 mt-6">
                                         <Button 
                                             variant="outline" 
                                             className="flex-1" 
                                             onClick={() => setIsRescheduling(false)}
                                         >
                                             Cancel
                                         </Button>
                                         <Button 
                                             className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
                                             disabled={!selectedDate || !selectedTime || actionLoading}
                                             onClick={handleConfirmReschedule}
                                         >
                                             {actionLoading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                                             Confirm Reschedule
                                         </Button>
                                     </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                    <>
                                        <Dialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive" className="w-full h-11 rounded-xl font-semibold" disabled={!canCancel}>
                                                    <CalendarX className="mr-2 h-4 w-4" /> Cancel Appointment
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Cancel Appointment</DialogTitle>
                                                    <DialogDescription>
                                                        Are you sure you want to cancel? This action cannot be undone.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <Textarea 
                                                    placeholder="Reason for cancellation (optional)"
                                                    value={cancelReason}
                                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCancelReason(e.target.value)}
                                                />
                                                <DialogFooter>
                                                    <Button variant="outline" onClick={() => setCancelModalOpen(false)}>Keep Appointment</Button>
                                                    <Button variant="destructive" onClick={handleCancel} disabled={actionLoading}>
                                                        {actionLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "Confirm Cancellation"}
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

                                        <Button 
                                            variant="outline" 
                                            className="w-full h-11 rounded-xl font-semibold mt-3" 
                                            onClick={handleReschedule} 
                                            disabled={!canReschedule}
                                        >
                                            <CalendarClock className="mr-2 h-4 w-4" /> Reschedule Appointment
                                        </Button>
                                    </>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
