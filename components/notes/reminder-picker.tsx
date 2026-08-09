"use client";

import { Bell, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ReminderPickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

function formatDateTimeLocal(
  date: Date | null
) {
  if (!date) return "";

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  const hours = String(
    date.getHours()
  ).padStart(2, "0");

  const minutes = String(
    date.getMinutes()
  ).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function ReminderPicker({
  value,
  onChange,
}: ReminderPickerProps) {
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected =
      event.target.value;

    if (!selected) {
      onChange(null);
      return;
    }

    onChange(new Date(selected));
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <Bell className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type="datetime-local"
          value={formatDateTimeLocal(
            value
          )}
          onChange={handleChange}
          className="h-10 rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 dark:border-slate-700 dark:bg-[#111A1F] dark:text-white"
        />
      </div>

      {value && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() =>
            onChange(null)
          }
          title="Remove reminder"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}