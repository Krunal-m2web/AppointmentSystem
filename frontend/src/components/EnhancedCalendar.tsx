import { useState } from "react";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EnhancedCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

const AVAILABLE_TIMES = [
  "9:00am",
  "9:30am",
  "10:00am",
  "10:30am",
  "11:00am",
  "11:30am",
  "12:00pm",
  "12:30pm",
  "1:00pm",
  "1:30pm",
  "2:00pm",
  "2:30pm",
  "3:00pm",
  "3:30pm",
  "4:00pm",
  "4:30pm",
];

const TIMEZONES = [
  "India Standard Time",
  "Eastern Standard Time",
  "Pacific Standard Time",
  "Greenwich Mean Time",
];

// Mock availability
const getAvailabilityForDate = (date: Date) => {
  const day = date.getDay();
  if (day === 0 || day === 6)
    return AVAILABLE_TIMES.slice(0, 5); // Weekends
  return AVAILABLE_TIMES;
};

export function EnhancedCalendar({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
}: EnhancedCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timezone, setTimezone] = useState(TIMEZONES[0]);
  const [direction, setDirection] = useState(0);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

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

  const availableTimes = selectedDate
    ? getAvailabilityForDate(selectedDate)
    : [];

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
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100 font-sans">
      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT COLUMN: Calendar & Timezone */}
        <div className="w-full md:w-[400px] flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Select a Date & Time
          </h2>

          <div className="flex flex-col gap-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-center gap-4 mb-2">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-blue-50 text-blue-600 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.h3
                  key={currentMonth.toISOString()}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-base font-medium text-gray-700 min-w-[140px] text-center"
                >
                  {currentMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </motion.h3>
              </AnimatePresence>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-blue-50 text-blue-600 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
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
                  className="text-[11px] font-medium text-gray-500 py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => {
                const isSelected = isSameDay(
                  date,
                  selectedDate,
                );
                const isPast = isPastDate(date);
                const isDisabled = !date || isPast;

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
                          w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
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

            {/* Timezone Selector (Bottom Left) */}
            <div className="mt-8 pt-4">
              <label className="text-sm font-semibold text-gray-900 mb-2 block">
                Time zone
              </label>
              <div className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 p-2 -ml-2 rounded cursor-pointer group">
                <Globe className="w-4 h-4" />
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="text-sm bg-transparent border border-gray-300 focus:ring-0 cursor-pointer w-full text-gray-600 group-hover:text-gray-900"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Time Slots */}
        <div className="flex-1 min-w-[250px] border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
          {selectedDate ? (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full"
              style={{width: "min-content"}}
            >
              <h3 className="text-gray-600 font-medium mb-6">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h3>

              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                {availableTimes.map((time, index) => {
                  const isSelected = selectedTime === time;
                  return (
                    <motion.button
                      key={time}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => onSelectTime(time)}
                      className={`
                        w-full py-3 px-4 rounded-md border text-base font-bold transition-all
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
                })}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm italic"
            style={{paddingRight:"47px", marginLeft:"-10px"}}>
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