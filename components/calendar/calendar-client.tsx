"use client";

import { useMemo, useState } from "react";

import { CalendarToolbar } from "./calendar-toolbar";
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

  const [search, setSearch] =
    useState<string>("");

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

  /*
   * Filter reminders based on the search text.
   *
   * This currently filters the reminders displayed
   * on the calendar. Notes for the selected day are
   * filtered separately by SelectedDateNotes.
   */
  const filteredReminders = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return reminders;
    }

    return reminders.filter((reminder) =>
      reminder.title
        .toLowerCase()
        .includes(query)
    );
  }, [reminders, search]);

  return (
    <div className="space-y-6">
      {/* Calendar toolbar + search */}
      <CalendarToolbar
        search={search}
        onSearchChange={setSearch}
      />

      {/* Month navigation */}
      <MonthNavigation
        currentMonth={currentMonth}
        onMonthChange={handleMonthChange}
      />

      {/* Calendar */}
      <div className="grid gap-8 lg:grid-cols-[1.4fr_420px]">
        <CalendarView
          reminders={filteredReminders}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        <SelectedDateNotes
          selectedDate={selectedDate}
          search={search}
        />
      </div>
    </div>
  );
}