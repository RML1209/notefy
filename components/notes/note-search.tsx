"use client";

import { useState } from "react";

import { Search, X } from "lucide-react";

interface NoteSearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export function NoteSearch({
  placeholder = "Search notes...",
  onSearch,
}: NoteSearchProps) {
  const [search, setSearch] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = event.target.value;

    setSearch(value);

    onSearch?.(value);
  }

  function clearSearch() {
    setSearch("");

    onSearch?.("");
  }

  return (
    <div className="relative w-full max-w-xl">
      {/* Search Icon */}
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

      {/* Input */}
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-12 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20 dark:border-slate-700 dark:bg-[#111A1F] dark:text-white dark:placeholder:text-slate-500"
      />

      {/* Clear Button */}
      {search && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-slate-500" />
        </button>
      )}
    </div>
  );
}