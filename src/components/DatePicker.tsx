import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DatePickerProps {
  value: string; // Format: "YYYY-MM-DD"
  onChange: (date: string) => void;
  minDate?: string; // Format: "YYYY-MM-DD"
}

export default function DatePicker({ value, onChange, minDate }: DatePickerProps) {
  // Parse initial selected date or default to today's date if empty
  const today = new Date();
  const todayStr = formatDate(today);
  const effectiveMinDate = minDate || todayStr;

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed
  const [isOpen, setIsOpen] = useState(false);

  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Helper: Format Date to YYYY-MM-DD
  function formatDate(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Get days in a month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get starting day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  // Generate grid days
  const calendarDays = [];
  
  // Empty spaces for previous month's padding
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push({ day: null, dateStr: "" });
  }

  // Days of the month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    calendarDays.push({ day: d, dateStr });
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const selectDate = (dateStr: string) => {
    onChange(dateStr);
    setIsOpen(false);
  };

  // Parse currently selected date for humans
  const getSelectedLabel = () => {
    if (!value) return "SELECT TARGET DATE";
    const [y, m, d] = value.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="relative w-full">
      {/* Target button to open dropdown or trigger interactive picker */}
      <button
        type="button"
        id="datepicker-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-sm border border-white/10 bg-black/40 p-3 font-sans text-xs text-white transition-all hover:border-gold/30 focus:border-gold/40 focus:outline-hidden"
      >
        <div className="flex items-center space-x-2 text-left">
          <CalendarIcon className="h-4 w-4 text-gold select-none" />
          <span className={value ? "text-white" : "text-gray-500 font-mono"}>
            {getSelectedLabel().toUpperCase()}
          </span>
        </div>
        <span className="font-mono text-[9px] text-gold tracking-widest uppercase">
          {isOpen ? "CLOSE" : "PICK"}
        </span>
      </button>

      {/* Inline interactive or flyout calendar panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            id="datepicker-calendar-panel"
            className="absolute left-0 right-0 z-50 mt-2 rounded-md border border-white/10 bg-charcoal p-4 shadow-2xl gold-glow"
          >
            {/* Header controls */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="rounded-full p-1.5 text-gray-400 hover:bg-white/5 hover:text-white transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="text-center">
                <span className="font-display text-xs font-bold tracking-widest text-white block">
                  {monthNames[currentMonth]}
                </span>
                <span className="font-mono text-[9px] text-gold tracking-wider block">
                  {currentYear}
                </span>
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                className="rounded-full p-1.5 text-gray-400 hover:bg-white/5 hover:text-white transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 pt-3 text-center text-[10px] font-mono font-bold tracking-wider text-gray-500">
              {daysOfWeek.map((day) => (
                <div key={day} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 pt-2">
              {calendarDays.map((cell, index) => {
                const isSelected = value === cell.dateStr;
                const isTodayStr = cell.dateStr === todayStr;
                const isPast = cell.dateStr && cell.dateStr < effectiveMinDate;

                if (!cell.day) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                return (
                  <button
                    key={`day-${cell.day}-${index}`}
                    type="button"
                    disabled={isPast || false}
                    onClick={() => selectDate(cell.dateStr)}
                    className={`aspect-square flex flex-col items-center justify-center rounded-sm font-mono text-xs transition-all relative ${
                      isPast
                        ? "text-gray-750 opacity-20 cursor-not-allowed line-through"
                        : isSelected
                        ? "bg-gold text-black font-bold scale-105"
                        : "text-gray-200 hover:bg-crimson/30 hover:text-white cursor-pointer"
                    }`}
                  >
                    <span>{cell.day}</span>
                    {isTodayStr && !isSelected && (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-crimson" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Fast Quick Select Presets */}
            <div className="mt-4 border-t border-white/5 pt-3 flex justify-between items-center text-[10px] font-mono text-gray-400">
              <span className="uppercase text-[9px] tracking-wider text-gray-500">PRESETS:</span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => selectDate(todayStr)}
                  className="px-2 py-1 rounded bg-white/5 border border-white/5 hover:border-gold/30 text-[9px] text-white"
                >
                  TODAY
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    selectDate(formatDate(tomorrow));
                  }}
                  className="px-2 py-1 rounded bg-white/5 border border-white/5 hover:border-gold/30 text-[9px] text-white"
                >
                  TOMORROW
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
