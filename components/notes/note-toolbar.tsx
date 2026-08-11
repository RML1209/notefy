"use client";

import Link from "next/link";
import { Search, Plus,} from "lucide-react";

import { Button } from "@/components/ui/button";

interface NoteToolbarProps {
  totalNotes?: number;
  search?: string;
  onSearchChange?: (value: string) => void;
}

export function NoteToolbar({
  totalNotes = 0,
  search = "",
  onSearchChange,
}: NoteToolbarProps) {
  function clearSearch() {
    onSearchChange?.("");
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111A1F]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            My Notes
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Organize your ideas, tasks, and reminders in one place.
          </p>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
            {totalNotes}{" "}
            {totalNotes === 1 ? "note" : "notes"} available
          </p>
        </div>

        {/* Right */}
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          {/* Search */}
          <div className="relative w-full sm:min-w-[280px] lg:w-[320px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                onSearchChange?.(event.target.value)
              }
              placeholder="Search notes..."
              aria-label="Search notes"
              className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 dark:border-slate-700 dark:bg-[#0B1215] dark:text-white dark:placeholder:text-slate-500"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                
              </button>
            )}
          </div>

          {/* New Note */}
          <Link href="/notes/new" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="h-11 w-full gap-2 bg-[#6A89A7] hover:bg-[#587690] sm:w-auto"
            >
              <Plus className="h-5 w-5" />
              New Note
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}