import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface DateInputProps {
  value: string; // Expected format: mm/dd/yyyy
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function DateInput({ value, onChange, placeholder = 'mm/dd/yyyy', className = '' }: DateInputProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [viewDate, setViewDate] = useState(new Date());
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync inputValue with external value
  useEffect(() => {
    setInputValue(value);
    if (value) {
      const parsed = parseDate(value);
      if (parsed) {
        setViewDate(parsed);
      }
    }
  }, [value]);

  // Parse mm/dd/yyyy to Date
  const parseDate = (str: string): Date | null => {
    const parts = str.split('/');
    if (parts.length !== 3) return null;
    const [month, day, year] = parts.map(Number);
    if (!month || !day || !year) return null;
    if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > 2100) return null;
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return null;
    return date;
  };

  // Format Date to mm/dd/yyyy
  const formatDate = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    // Auto-format: add slashes after mm and dd
    const digits = val.replace(/\D/g, '');
    if (digits.length >= 2 && !val.includes('/')) {
      val = digits.slice(0, 2) + '/' + digits.slice(2);
    }
    if (digits.length >= 4 && val.split('/').length < 3) {
      const parts = val.split('/');
      if (parts.length === 2) {
        val = parts[0] + '/' + parts[1].slice(0, 2) + '/' + parts[1].slice(2);
      }
    }
    
    setInputValue(val);
    
    // If valid date, update parent
    const parsed = parseDate(val);
    if (parsed) {
      onChange(val);
      setViewDate(parsed);
    }
  };

  const handleInputBlur = () => {
    // On blur, try to parse and format properly
    const parsed = parseDate(inputValue);
    if (parsed) {
      const formatted = formatDate(parsed);
      setInputValue(formatted);
      onChange(formatted);
    } else if (inputValue && inputValue !== value) {
      // Invalid input, revert to previous valid value
      setInputValue(value);
    }
  };

  const handleDateSelect = (date: Date) => {
    const formatted = formatDate(date);
    setInputValue(formatted);
    onChange(formatted);
    setOpen(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  const selectedDate = parseDate(inputValue);
  const days = getDaysInMonth(viewDate);

  const previousMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() - 1);
    setViewDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() + 1);
    setViewDate(newDate);
  };

  const years = Array.from({ length: 101 }, (_, i) => new Date().getFullYear() - 50 + i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={`relative ${className}`}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          />
          <CalendarIcon 
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" 
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="space-y-3">
          {/* Month/Year Navigation */}
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={previousMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-1">
              <Select
                value={viewDate.getMonth().toString()}
                onValueChange={(val) => {
                  const newDate = new Date(viewDate);
                  newDate.setMonth(Number(val));
                  setViewDate(newDate);
                }}
              >
                <SelectTrigger className="h-8 w-[110px] text-sm font-medium border-none bg-transparent hover:bg-gray-50 rounded focus:ring-0 focus:outline-none px-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, i) => (
                    <SelectItem key={month} value={i.toString()}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={viewDate.getFullYear().toString()}
                onValueChange={(val) => {
                  const newDate = new Date(viewDate);
                  newDate.setFullYear(Number(val));
                  setViewDate(newDate);
                }}
              >
                <SelectTrigger className="h-8 w-[80px] text-sm font-medium border-none bg-transparent hover:bg-gray-50 rounded focus:ring-0 focus:outline-none px-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <button
              type="button"
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days Grid */}
          <div>
            <div className="grid grid-cols-7 gap-1 mb-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
                <div key={i} className="text-center text-xs text-gray-500 py-1 font-medium">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={!date}
                  onClick={() => date && handleDateSelect(date)}
                  className={`aspect-square flex items-center justify-center text-sm rounded transition-colors cursor-pointer ${
                    !date
                      ? 'invisible'
                      : selectedDate && isSameDay(date, selectedDate)
                        ? 'bg-indigo-600 text-white font-semibold'
                        : isToday(date)
                          ? 'bg-indigo-100 text-indigo-700 font-medium'
                          : 'hover:bg-gray-100'
                  }`}
                >
                  {date?.getDate()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
