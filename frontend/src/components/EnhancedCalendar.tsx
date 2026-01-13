import { useState } from "react";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EnhancedCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  selectedTime: string;
  onSelectTime: (time: string) => void;
  timezone: string;
  unavailableDates?: Date[];
  timeSlots?: string[];
  isLoadingSlots?: boolean;
}

// Helper to check if a date is unavailable
const isDateUnavailable = (date: Date | null, unavailableDates: Date[] = []) => {
  if (!date) return false;
  return unavailableDates.some(unavailable => 
    unavailable.getDate() === date.getDate() &&
    unavailable.getMonth() === date.getMonth() &&
    unavailable.getFullYear() === date.getFullYear()
  );
};

export function EnhancedCalendar({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  timezone,
  unavailableDates = [],
  timeSlots = [],
  isLoadingSlots = false,
}: EnhancedCalendarProps) {
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

  const isSameDay = (
    date1: Date | null,
    date2: Date | null,
  ) => {
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
    <div className="w-full max-w-3xl mx-auto bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 font-sans">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* LEFT COLUMN: Calendar & Timezone */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Select a Date & Time
          </h2>

          <div className="flex flex-col gap-3">
            {/* Month Navigation */}
            <div className="flex items-center justify-center gap-3 mb-1">
              <button
                onClick={() => changeMonth(-1)}
                className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-full transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.h3
                  key={currentMonth.toISOString()}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-sm font-medium text-gray-700 min-w-[120px] text-center"
                >
                  {currentMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </motion.h3>
              </AnimatePresence>
              <button
                onClick={() => changeMonth(1)}
                className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-full transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
              {[
                "MON",
                "TUE",
                "WED",
                "THU",
                "FRI",
                "SAT",
                "SUN",
              ].map((day) => (
                <div
                  key={day}
                  className="text-[9px] font-medium text-gray-500 py-0.5"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {days.map((date, index) => {
                const isSelected = isSameDay(
                  date,
                  selectedDate,
                );
                const isPast = isPastDate(date);
                const isUnavailable = isDateUnavailable(date, unavailableDates);
                const isDisabled = !date || isPast || isUnavailable;

                return (
                  <div
                    key={index}
                    className="aspect-square flex items-center justify-center relative"
                  >
                    {date && (
                      <button
                        onClick={() =>
                          !isDisabled && onSelectDate(date)
                        }
                        disabled={isDisabled}
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all
                          ${
                            isSelected
                              ? "bg-blue-600 text-white shadow-md"
                              : "text-blue-600 hover:bg-blue-50 bg-blue-50/30"
                          }
                          ${isDisabled ? "text-gray-400 bg-transparent hover:bg-transparent cursor-default" : "cursor-pointer"}
                        `}
                      >
                        {date.getDate()}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Timezone (Bottom Left) */}
            {/* <div className="mt-8 pt-4">
              <label className="text-sm font-semibold text-gray-900 mb-2 block">
                Time zone
              </label>
              <div className="flex items-center gap-2 text-gray-600 p-2 -ml-2 rounded">
                <Globe className="w-4 h-4" />
                <span className="text-sm">{timezone}</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* RIGHT COLUMN: Time Slots */}
        <div className="flex-1 min-w-0 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
          {selectedDate ? (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full w-full"
            >
              <h3 className="text-gray-600 font-medium mb-4 text-sm">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h3>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                {isLoadingSlots ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                  </div>
                ) : timeSlots.length === 0 ? (
                   <div className="text-center text-gray-500 py-6 text-sm">
                     No available slots for this date.
                   </div>
                ) : (
                  timeSlots.map((time, index) => {
                    const isSelected = selectedTime === time;
                    return (
                      <motion.button
                        key={time}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => onSelectTime(time)}
                        className={`
                          w-full py-2 px-3 rounded-md border text-sm font-bold transition-all
                          ${
                            isSelected
                              ? "bg-gray-600 text-white border-gray-600"
                              : "bg-white text-blue-600 border-blue-200 hover:border-blue-600 hover:ring-1 hover:ring-blue-600"
                          }
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
            <div className="h-full flex items-center justify-center text-gray-400 text-xs italic text-center px-4">
              Select a date to view available times
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #d1d5db;
        }
      `}</style>
    </div>
  );
}