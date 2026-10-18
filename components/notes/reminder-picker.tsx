
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  X,
} from "lucide-react";

interface ReminderPickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const pad = (n: number) => String(n).padStart(2, "0");

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(date: Date | null) {
  if (!date) return "";

  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(date: Date | null) {
  if (!date) return "09:00";

  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function ReminderPicker({
  value,
  onChange,
}: ReminderPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const [monthDate, setMonthDate] = useState(() => {
    const date = value ?? new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });

  useEffect(() => {
    if (value) {
      setMonthDate(
        new Date(value.getFullYear(), value.getMonth(), 1)
      );
    }
  }, [value]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const today = new Date();

  const firstWeekday = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();

  const cells = Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - firstWeekday + 1;

    if (dayNumber < 1) {
      return {
        day: previousMonthDays + dayNumber,
        monthOffset: -1,
      };
    }

    if (dayNumber > totalDays) {
      return {
        day: dayNumber - totalDays,
        monthOffset: 1,
      };
    }

    return { day: dayNumber, monthOffset: 0 };
  });

  function chooseDay(day: number, monthOffset: number) {
    const targetMonth = new Date(year, month + monthOffset, 1);
    const existing = value ?? new Date(year, month, day, 9, 0);

    const selected = new Date(
      targetMonth.getFullYear(),
      targetMonth.getMonth(),
      day,
      existing.getHours(),
      existing.getMinutes(),
      0,
      0
    );

    onChange(selected);
  }

  function updateTime(field: "hours" | "minutes", raw: string) {
    const current = value ?? new Date(year, month, 1, 9, 0);
    const updated = new Date(current);

    if (field === "hours") updated.setHours(Number(raw));
    else updated.setMinutes(Number(raw));

    updated.setSeconds(0, 0);
    onChange(updated);
  }

  function setToday() {
    const now = new Date();
    const current = value ?? now;

    onChange(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        current.getHours(),
        current.getMinutes(),
        0,
        0
      )
    );

    setMonthDate(new Date(now.getFullYear(), now.getMonth(), 1));
  }

  function clear() {
    onChange(null);
    setIsOpen(false);
  }

  return (
    <div ref={popupRef} className="relative w-full min-w-0">
      {/* Compact trigger */}
      <div className="flex w-full min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className="
            flex h-12 min-w-0 flex-1 items-center gap-3
            rounded-xl border border-slate-200 bg-white px-3
            text-left transition
            hover:border-[#6A89A7]
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-[#6A89A7]/30
            dark:border-[#26343D] dark:bg-[#111A1F]
          "
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#6A89A7]/10 text-[#6A89A7]">
            <Bell className="h-4 w-4" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-slate-800 dark:text-white">
              {value ? formatDate(value) : "Add reminder"}
            </span>
            <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
              {value ? formatTime(value) : "Choose date and time"}
            </span>
          </span>

          <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" />
        </button>

        {value && (
          <button
            type="button"
            onClick={clear}
            aria-label="Remove reminder"
            className="
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-xl border border-slate-200 text-slate-500
              hover:bg-red-50 hover:text-red-600
              dark:border-[#26343D] dark:hover:bg-red-950/30
            "
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        Set a date and time for your reminder.
      </p>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Reminder calendar"
          className="
            absolute left-0 top-full z-50 mt-2
            w-full min-w-0 overflow-hidden
            rounded-2xl border border-slate-200
            bg-white shadow-xl shadow-slate-900/10
            dark:border-[#26343D] dark:bg-[#111A1F]
            sm:w-92
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-3 py-3 dark:border-[#26343D] sm:px-4">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {MONTHS[month]} {year}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Pick your reminder date
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() =>
                  setMonthDate(new Date(year, month - 1, 1))
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-[#26343D]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                aria-label="Next month"
                onClick={() =>
                  setMonthDate(new Date(year, month + 1, 1))
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-[#26343D]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Calendar grid */}
          <div className="p-3 sm:p-4">
            <div className="grid grid-cols-7">
              {WEEKDAYS.map((day, index) => (
                <div
                  key={`${day}-${index}`}
                  className="py-2 text-center text-xs font-medium text-slate-400"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1">
              {cells.map(({ day, monthOffset }, index) => {
                const cellMonth = new Date(
                  year,
                  month + monthOffset,
                  1
                );

                const date = new Date(
                  cellMonth.getFullYear(),
                  cellMonth.getMonth(),
                  day
                );

                const selected = value && isSameDay(date, value);
                const isToday = isSameDay(date, today);

                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={date.toLocaleDateString()}
                    aria-pressed={Boolean(selected)}
                    onClick={() => chooseDay(day, monthOffset)}
                    className={`
                      mx-auto flex aspect-square w-full max-w-10
                      items-center justify-center rounded-xl
                      text-xs transition
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-[#6A89A7]
                      ${
                        selected
                          ? "bg-[#6A89A7] font-semibold text-white shadow-sm"
                          : monthOffset !== 0
                            ? "text-slate-300 hover:bg-slate-50 dark:text-slate-600 dark:hover:bg-[#1E2A31]"
                            : "text-slate-700 hover:bg-[#6A89A7]/10 dark:text-slate-200 dark:hover:bg-[#6A89A7]/15"
                      }
                      ${
                        isToday && !selected
                          ? "ring-1 ring-inset ring-[#6A89A7]"
                          : ""
                      }
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time section */}
          <div className="border-t border-slate-100 px-3 py-3 dark:border-[#26343D] sm:px-4">
            <div className="mb-2 flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-[#6A89A7]" />
              <span className="text-sm font-medium text-slate-800 dark:text-white">
                Reminder time
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="min-w-0">
                <span className="mb-1.5 block text-xs text-slate-500 dark:text-slate-400">
                  Hour
                </span>
                <select
                  aria-label="Hour"
                  value={value?.getHours() ?? 9}
                  onChange={(event) =>
                    updateTime("hours", event.target.value)
                  }
                  className="
                    h-10 w-full rounded-lg border
                    border-slate-200 bg-white px-3 text-sm
                    text-slate-800 outline-none
                    focus:border-[#6A89A7]
                    focus:ring-2 focus:ring-[#6A89A7]/20
                    dark:border-[#26343D] dark:bg-[#172229]
                    dark:text-white
                  "
                >
                  {Array.from({ length: 24 }, (_, hour) => (
                    <option key={hour} value={hour}>
                      {pad(hour)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="min-w-0">
                <span className="mb-1.5 block text-xs text-slate-500 dark:text-slate-400">
                  Minute
                </span>
                <select
                  aria-label="Minute"
                  value={value?.getMinutes() ?? 0}
                  onChange={(event) =>
                    updateTime("minutes", event.target.value)
                  }
                  className="
                    h-10 w-full rounded-lg border
                    border-slate-200 bg-white px-3 text-sm
                    text-slate-800 outline-none
                    focus:border-[#6A89A7]
                    focus:ring-2 focus:ring-[#6A89A7]/20
                    dark:border-[#26343D] dark:bg-[#172229]
                    dark:text-white
                  "
                >
                  {Array.from({ length: 60 }, (_, minute) => (
                    <option key={minute} value={minute}>
                      {pad(minute)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between border-t border-slate-100 px-3 py-3 dark:border-[#26343D] sm:px-4">
            <button
              type="button"
              onClick={clear}
              className="rounded-lg px-3 py-2 text-xs font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/30"
            >
              Clear
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={setToday}
                className="rounded-lg px-3 py-2 text-xs font-medium text-[#6A89A7] hover:bg-[#6A89A7]/10"
              >
                Today
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-[#6A89A7] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#587895]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
