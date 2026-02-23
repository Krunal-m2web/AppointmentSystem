import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { 
    X, 
    CalendarClock, 
    ChevronLeft, 
    ChevronRight, 
    Globe, 
    Loader2, 
    CheckCircle2, 
    Calendar,
    Clock,
    DollarSign,
    ChevronDown
} from 'lucide-react';
import { fetchAvailableSlots, fetchStaffTimeOffs, fetchAnyStaffSlots } from '../../services/availabilityService';
import { createAppointment, updateAppointment } from '../../services/appointmentApi';
import { combineDateTimeToUTC, formatDate, formatTime, getTimezoneOffset } from "../../utils/datetime";
import { getToken, getCompanyIdFromToken } from '../../utils/auth';
import { Button } from '../ui/button';
import type { Appointment } from '../../types/types';

interface MiniCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  unavailableDates?: Date[];
}

const RescheduleMiniCalendar: React.FC<MiniCalendarProps> = ({
  selectedDate,
  onSelectDate,
  unavailableDates = [],
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate || new Date()));
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + val);
    setCurrentMonth(newDate);
  };

  const changeYear = (year: number) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
    setShowYearDropdown(false);
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

  const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() + i - 5);

  return (
    <div className="w-full bg-white font-sans">
        <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-1">
                <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <span className="text-sm font-bold text-gray-800 w-24 text-center">
                    {currentMonth.toLocaleDateString("en-US", { month: "long" })}
                </span>
                <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
            </div>
            
            <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowYearDropdown(!showYearDropdown)}
                  className="flex items-center gap-1 text-sm font-bold text-gray-700 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                >
                    {currentMonth.getFullYear()}
                    <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {showYearDropdown && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-[70] max-h-48 overflow-y-auto w-24">
                      {years.map(y => (
                        <button
                          key={y}
                          onClick={() => changeYear(y)}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-indigo-50 transition-colors ${y === currentMonth.getFullYear() ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-700'}`}
                        >
                            {y}
                        </button>
                      ))}
                  </div>
                )}
            </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={i} className="text-[10px] font-bold text-gray-400 py-1">{day}</div>
            ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
                const isSelected = isSameDay(date, selectedDate);
                const isPast = isPastDate(date);
                const isUnavailable = isDateUnavailable(date, unavailableDates);
                const isDisabled = !date || isPast || isUnavailable;

                return (
                    <div key={index} className="aspect-square flex items-center justify-center">
                        {date && (
                            <button
                                onClick={() => !isDisabled && onSelectDate(date)}
                                disabled={isDisabled}
                                className={`
                                    w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold transition-all
                                    ${isSelected ? "bg-indigo-600 text-white shadow-sm" : "text-gray-700 hover:bg-indigo-50"}
                                    ${isDisabled ? "text-gray-300 cursor-not-allowed opacity-40" : "cursor-pointer"}
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
  );
};

interface AdminRescheduleFlowProps {
    appointment: Appointment;
    timezone: string;
    onClose: () => void;
    onSuccess: () => void;
}

export const AdminRescheduleFlow: React.FC<AdminRescheduleFlowProps> = ({
    appointment,
    timezone,
    onClose,
    onSuccess
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(appointment.startDateTime));
    const [selectedTime, setSelectedTime] = useState('');
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [slotsLoading, setSlotsLoading] = useState(false);
    const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
    const [actionLoading, setActionLoading] = useState(false);
    const [price, setPrice] = useState(String(appointment.price || ''));

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    
    const datePickerRef = useRef<HTMLDivElement>(null);
    const timePickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
                setShowDatePicker(false);
            }
            if (timePickerRef.current && !timePickerRef.current.contains(e.target as Node)) {
                setShowTimePicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const loadSlots = async () => {
            if (!selectedDate) {
                setAvailableSlots([]);
                return;
            }

            try {
                setSlotsLoading(true);
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
                    .map(s => {
                        try {
                            return new Date(s.startTime).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                timeZone: timezone || 'UTC',
                                hour12: true
                            }).toLowerCase().replace(/\s+/g, '');
                        } catch (e) {
                            console.error("Timezone error:", e);
                            return new Date(s.startTime).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                            }).toLowerCase().replace(/\s+/g, '');
                        }
                    });
                
                setAvailableSlots(Array.from(new Set(formattedSlots)));
            } catch (err) {
                console.error("Error loading slots:", err);
                toast.error("Failed to load available slots.");
            } finally {
                setSlotsLoading(false);
            }
        };

        loadSlots();
    }, [selectedDate, appointment, timezone]);

    useEffect(() => {
        const loadTimeOffs = async () => {
            if (!appointment.staffId || appointment.staffId <= 0) return;

            try {
                const token = getToken() || '';
                const timeOffs = await fetchStaffTimeOffs(appointment.staffId, token);
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
    }, [appointment]);

    const handleConfirmReschedule = async () => {
        if (!selectedDate || !selectedTime) {
            toast.error("Please select a new date and time.");
            return;
        }

        setActionLoading(true);
        try {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;
            const startTimeUtc = combineDateTimeToUTC(dateStr, selectedTime, timezone);

            const companyId = getCompanyIdFromToken(getToken() || '') || 0;
            const nameParts = appointment.customerName.trim().split(/\s+/);
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ') || '.';

            await createAppointment({
                companyId,
                firstName,
                lastName,
                email: appointment.customerEmail,
                phone: appointment.customerPhone,
                serviceId: appointment.serviceId,
                staffId: appointment.staffId || null,
                startTime: startTimeUtc,
                meetingType: appointment.meetingType,
                paymentMethod: appointment.paymentMethod as any,
                notes: appointment.notes || '',
                status: 'Confirmed',
                price: price ? parseFloat(price) : undefined
            });

            toast.success("Appointment rescheduled successfully!");
            onSuccess();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-5 border-b border-indigo-600/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-white">Reschedule Appointment</h2>
                            <p className="text-indigo-100 text-sm mt-0.5">Select a new date and time</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 text-white hover:rotate-90">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50/30">
                    <div className="space-y-6">
                        
                        {/* Section Header: Date & Time */}
                        <div className="flex items-center gap-2 text-gray-900 border-b border-gray-100 pb-2 mb-2">
                             <div className="p-1 px-1.5 bg-indigo-100 rounded text-indigo-600">
                                <CalendarClock className="w-4 h-4" />
                             </div>
                             <h3 className="font-bold text-sm">Date & Time</h3>
                        </div>

                        {/* Input Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Date Field */}
                            <div className="relative" ref={datePickerRef}>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Date <span className="text-red-500">*</span></label>
                                <button
                                    onClick={() => setShowDatePicker(!showDatePicker)}
                                    className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm group"
                                >
                                    <span className={selectedDate ? "text-gray-900" : "text-gray-400"}>
                                        {selectedDate ? selectedDate.toLocaleDateString("en-US", { month: '2-digit', day: '2-digit', year: 'numeric' }) : 'Select Date'}
                                    </span>
                                    <Calendar className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                                </button>
                                
                                <AnimatePresence>
                                    {showDatePicker && (
                                        <motion.div 
                                          initial={{ opacity: 0, y: 5 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: 5 }}
                                          className="absolute top-full left-0 mt-2 p-4 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 w-72"
                                        >
                                            <RescheduleMiniCalendar 
                                                selectedDate={selectedDate}
                                                onSelectDate={(date) => {
                                                    setSelectedDate(date);
                                                    setShowDatePicker(false);
                                                }}
                                                unavailableDates={unavailableDates}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Time Field */}
                            <div className="relative" ref={timePickerRef}>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Time <span className="text-red-500">*</span></label>
                                <button
                                    onClick={() => setShowTimePicker(!showTimePicker)}
                                    className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm group"
                                >
                                    <span className={selectedTime ? "text-gray-900" : "text-gray-400"}>
                                        {selectedTime || 'Select Time'}
                                    </span>
                                    <Clock className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                                </button>

                                <AnimatePresence>
                                    {showTimePicker && (
                                        <motion.div 
                                          initial={{ opacity: 0, y: 5 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: 5 }}
                                          className="absolute top-full right-0 mt-2 p-3 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 min-w-[340px]"
                                        >
                                            <div className="max-h-[200px] overflow-y-auto grid grid-cols-3 gap-2 p-1 custom-scrollbar">
                                                {slotsLoading ? (
                                                    <div className="col-span-full py-8 flex flex-col items-center justify-center gap-2">
                                                        <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                                                        <span className="text-[10px] text-gray-500 font-medium">Loading slots...</span>
                                                    </div>
                                                ) : availableSlots.length === 0 ? (
                                                    <div className="col-span-full py-6 text-center">
                                                        <p className="text-xs text-gray-500 font-medium italic">No slots available</p>
                                                        <p className="text-[10px] text-gray-400 mt-1">Try selecting a different date</p>
                                                    </div>
                                                ) : (
                                                    availableSlots.map(time => (
                                                        <button
                                                          key={time}
                                                          onClick={() => {
                                                              setSelectedTime(time);
                                                              setShowTimePicker(false);
                                                          }}
                                                          className={`py-2 px-1 text-[11px] font-bold rounded-md border transition-all ${selectedTime === time ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-100 hover:border-indigo-600'}`}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Price Field */}
                        <div className="w-1/2">
                             <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Price <span className="text-red-500">*</span></label>
                             <div className="relative group">
                                <DollarSign className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 group-hover:text-indigo-500 transition-colors" />
                                <input
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                />
                             </div>
                        </div>

                        {/* Summary / Previous Info */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                             <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Reschedule Task</span>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{appointment.serviceName}</h4>
                                        <p className="text-xs text-gray-500">with {appointment.staffName}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] text-gray-400 font-medium">ORIGINAL APPOINTMENT</div>
                                        <div className="text-xs font-bold text-gray-700">{formatDate(appointment.startDateTime, timezone)}</div>
                                        <div className="text-[10px] font-bold text-gray-500">{formatTime(appointment.startDateTime, timezone)}</div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-5 bg-white border-t border-gray-100 flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 rounded-xl h-11 border-gray-200 text-gray-600 font-bold" 
                      onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button 
                        className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all rounded-xl h-11 font-bold"
                        disabled={!selectedDate || !selectedTime || actionLoading}
                        onClick={handleConfirmReschedule}
                    >
                        {actionLoading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                        Reschedule
                    </Button>
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
