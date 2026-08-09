"use client";

import { useState } from "react";

import { CalendarView } from "./calendar-view";
import { MonthNavigation } from "./month-navigation";
import { SelectedDateNotes } from "./selected-date-notes";

interface Reminder {
  id: string;
  title: string;
  remindAt: Date | null;
  isPinned: boolean;
}

interface CalendarClientProps {
  reminders: Reminder[];
}

export function CalendarClient({
  reminders,
}: CalendarClientProps) {
  const today = new Date();

  const [selectedDate, setSelectedDate] =
    useState<Date>(today);

  const [currentMonth, setCurrentMonth] =
    useState<Date>(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );

  function handleMonthChange(month: Date) {
    setCurrentMonth(month);

    setSelectedDate(
      new Date(
        month.getFullYear(),
        month.getMonth(),
        1
      )
    );
  }

  return (
    <div className="space-y-6">
      <MonthNavigation
        currentMonth={currentMonth}
        onMonthChange={handleMonthChange}
      />

      <div className="grid gap-8 lg:grid-cols-[1.4fr_420px]">
        <CalendarView
          reminders={reminders}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        <SelectedDateNotes
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}