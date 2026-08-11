"use client";

import Link from "next/link";

import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CalendarToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function CalendarToolbar({
  search,
  onSearchChange,
}: CalendarToolbarProps) {
  return (
    <section className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Calendar
        </h1>

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
              onSearchChange(event.target.value)
            }
            placeholder="Search notes or reminders..."
            aria-label="Search calendar notes and reminders"
            className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 dark:border-slate-700 dark:bg-[#0B1215] dark:text-white dark:placeholder:text-slate-500"
          />

          {/* Clear search */}
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear calendar search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-200"
            >
              
            </button>
          )}
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