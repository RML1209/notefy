"use client";

import { useMemo } from "react";

import { cn } from "@/lib/utils";

interface Reminder {
  id: string;
  title: string;
  remindAt: Date | null;
  isPinned: boolean;
}

interface CalendarViewProps {
  reminders: Reminder[];

  currentMonth: Date;

  selectedDate: Date;

  onDateSelect: (date: Date) => void;
}

export function CalendarView({
  reminders,
  currentMonth,
  selectedDate,
  onDateSelect,
}: CalendarViewProps) {
  const currentMonthIndex =
    currentMonth.getMonth();

  const currentYear =
    currentMonth.getFullYear();

  const firstDay = new Date(
    currentYear,
    currentMonthIndex,
    1
  );

  const lastDay = new Date(
    currentYear,
    currentMonthIndex + 1,
    0
  );

  const daysInMonth = lastDay.getDate();

  const startingDay = firstDay.getDay();

  const calendarDays = useMemo(() => {
    const days: (Date | null)[] = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        new Date(
          currentYear,
          currentMonthIndex,
          day
        )
      );
    }

    return days;
  }, [
    currentMonthIndex,
    currentYear,
    daysInMonth,
    startingDay,
  ]);

  function hasReminder(date: Date) {
    return reminders.some(
      (reminder) =>
        reminder.remindAt &&
        reminder.remindAt.toDateString() ===
          date.toDateString()
    );
  }

  function isSelected(date: Date) {
    return (
      date.toDateString() ===
      selectedDate.toDateString()
    );
  }

  function isToday(date: Date) {
    return (
      date.toDateString() ===
      new Date().toDateString()
    );
  }

  const weekdays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111A1F]">
      {/* Weekdays */}
      <div className="mb-6 grid grid-cols-7 gap-2">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-slate-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((date, index) =>
          date ? (
            <button
              key={index}
              type="button"
              onClick={() =>
                onDateSelect(date)
              }
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-xl text-sm font-medium transition-all",

                isSelected(date)
                  ? "bg-[#6A89A7] text-white shadow-md"
                  : isToday(date)
                  ? "border-2 border-[#6A89A7] text-[#6A89A7]"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {date.getDate()}

              {hasReminder(date) && (
                <span
                  className={cn(
                    "absolute bottom-2 h-2 w-2 rounded-full",

                    isSelected(date)
                      ? "bg-white"
                      : "bg-red-500"
                  )}
                />
              )}
            </button>
          ) : (
            <div
              key={index}
              className="aspect-square"
            />
          )
        )}
      </div>
    </div>
  );
}