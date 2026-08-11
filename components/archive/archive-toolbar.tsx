"use client";

import { Search } from "lucide-react";

interface ArchiveToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  totalNotes: number;
}

export function ArchiveToolbar({
  search,
  onSearchChange,
  totalNotes,
}: ArchiveToolbarProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111A1F]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Heading */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Archived Notes
          </h2>

          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Search and manage notes you have
            archived.
          </p>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
            {totalNotes}{" "}
            {totalNotes === 1
              ? "archived note"
              : "archived notes"}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange(
                event.target.value
              )
            }
            placeholder="Search archived notes..."
            aria-label="Search archived notes"
            className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 dark:border-slate-700 dark:bg-[#0B1215] dark:text-white dark:placeholder:text-slate-500"
          />

          {/* Clear */}
          {search && (
            <button
              type="button"
              onClick={() =>
                onSearchChange("")
              }
              aria-label="Clear archive search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-lg leading-none text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-200"
            >
        
            </button>
          )}
        </div>
      </div>
    </section>
  );
}