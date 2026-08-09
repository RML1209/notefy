"use client";

import { useState } from "react";

import {
  Archive,
  NotebookPen,
  Pin,
} from "lucide-react";

type FilterType =
  | "all"
  | "pinned"
  | "archived";

interface NoteFiltersProps {
  value?: FilterType;
  onChange?: (
    value: FilterType
  ) => void;
}

const filters = [
  {
    value: "all" as const,
    label: "All",
    icon: NotebookPen,
  },
  {
    value: "pinned" as const,
    label: "Pinned",
    icon: Pin,
  },
  {
    value: "archived" as const,
    label: "Archived",
    icon: Archive,
  },
];

export function NoteFilters({
  value = "all",
  onChange,
}: NoteFiltersProps) {
  const [selected, setSelected] =
    useState<FilterType>(value);

  function selectFilter(
    filter: FilterType
  ) {
    setSelected(filter);

    onChange?.(filter);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon;

        const active =
          selected === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() =>
              selectFilter(filter.value)
            }
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
              active
                ? "border-[#6A89A7] bg-[#6A89A7] text-white shadow-sm"
                : "border-slate-300 bg-white text-slate-600 hover:border-[#6A89A7] hover:text-[#6A89A7] dark:border-slate-700 dark:bg-[#111A1F] dark:text-slate-300 dark:hover:border-[#6A89A7] dark:hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4" />

            {filter.label}
          </button>
        );
      })}
    </div>
  );
}