"use client";

import Link from "next/link";

import { Search, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CalendarToolbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
}

export function CalendarToolbar({
  search = "",
  onSearchChange,
}: CalendarToolbarProps) {
  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111A1F] md:p-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Calendar
        </h2>

        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          View your reminders and scheduled notes.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange?.(event.target.value)
            }
            placeholder="Search notes or reminders..."
            aria-label="Search calendar notes and reminders"
            className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 dark:border-slate-700 dark:bg-[#0B1215] dark:text-white dark:placeholder:text-slate-500"
          />
        </div>

        {/* New Note */}
        <Link
          href="/notes/new"
          className="w-full sm:w-auto"
        >
          <Button
            size="lg"
            className="w-full gap-2 bg-[#6A89A7] hover:bg-[#587690] sm:w-auto"
          >
            <Plus className="h-5 w-5" />
            New Note
          </Button>
        </Link>
      </div>
    </section>
  );
}