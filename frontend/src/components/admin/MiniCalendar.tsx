import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Globe } from 'lucide-react';

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

const AVAILABLE_TIMES = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM'
];

const TIMEZONES = [
  'America/New_York (EST)',
  'America/Chicago (CST)',
  'America/Los_Angeles (PST)',
  'Europe/London (GMT)',
  'Asia/Tokyo (JST)',
];

export function Calendar({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');
  const [timezone, setTimezone] = useState(TIMEZONES[0]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(startOfWeek);
      weekDay.setDate(startOfWeek.getDate() + i);
      days.push(weekDay);
    }
    return days;
  };

  const days = view === 'month' ? getDaysInMonth(currentMonth) : getWeekDays(currentMonth);

  const previousPeriod = () => {
    const newDate = new Date(currentMonth);
    if (view === 'month') {
      newDate.setMonth(currentMonth.getMonth() - 1);
    } else {
      newDate.setDate(currentMonth.getDate() - 7);
    }
    setCurrentMonth(newDate);
  };

  const nextPeriod = () => {
    const newDate = new Date(currentMonth);
    if (view === 'month') {
      newDate.setMonth(currentMonth.getMonth() + 1);
    } else {
      newDate.setDate(currentMonth.getDate() + 7);
    }
    setCurrentMonth(newDate);
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
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

  return (
    <div className="space-y-6">
      {/* Timezone Selector */}
      <div>
        <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Timezone
        </label>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {TIMEZONES.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setView('month')}
          className={`flex-1 py-2 px-4 rounded-lg transition-colors ${view === 'month'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          Month View
        </button>
        <button
          onClick={() => setView('week')}
          className={`flex-1 py-2 px-4 rounded-lg transition-colors ${view === 'week'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          Week View
        </button>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3>
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={previousPeriod}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextPeriod}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => (
            <button
              key={index}
              onClick={() => date && !isPastDate(date) && onSelectDate(date)}
              disabled={!date || isPastDate(date)}
              className={`aspect-square p-2 rounded-lg transition-all ${!date
                ? 'invisible'
                : isPastDate(date)
                  ? 'text-gray-300 cursor-not-allowed'
                  : isSameDay(date, selectedDate)
                    ? 'bg-indigo-600 text-white'
                    : isToday(date)
                      ? 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                      : 'hover:bg-gray-100'
                }`}
            >
              {date?.getDate()}
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <label className="block text-sm text-gray-700 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Select Time
          </label>
          <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-lg">
            {AVAILABLE_TIMES.map((time) => (
              <button
                key={time}
                onClick={() => onSelectTime(time)}
                className={`py-2 px-3 rounded-lg border-2 transition-all text-sm ${selectedTime === time
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                  : 'border-gray-300 hover:border-gray-400'
                  }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Simple MiniCalendar for Dashboard (no time selection)
export function MiniCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  const previousMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h4>
        <div className="flex gap-1">
          <button
            onClick={previousMonth}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center text-xs text-gray-600 py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center text-sm rounded ${!date
                  ? 'invisible'
                  : isToday(date)
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'hover:bg-gray-100'
                }`}
            >
              {date?.getDate()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
