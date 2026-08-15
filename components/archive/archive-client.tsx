"use client";

import { useMemo, useState } from "react";

import { ArchiveToolbar } from "./archive-toolbar";
import { NoteCard } from "@/components/notes/note-card";

interface ArchiveNote {
  id: string;
  title: string;
  content: string;

  isPinned: boolean;
  isArchived: boolean;

  remindAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

interface ArchiveClientProps {
  notes: ArchiveNote[];
}

export function ArchiveClient({
  notes,
}: ArchiveClientProps) {
  const [search, setSearch] = useState("");

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return notes;
    }

    return notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      );
    });
  }, [notes, search]);

  return (
    <div className="space-y-8">
      {/* Archive Header + Search */}
      <ArchiveToolbar
        search={search}
        onSearchChange={setSearch}
        totalNotes={notes.length}
      />

      {/* Results */}
      {filteredNotes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-300 dark:bg-[#111A1F]">
          {search.trim() ? (
            <>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                No matching notes
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                No archived notes match &quot;
                {search}
                &quot;.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-4 text-sm font-medium text-[#6A89A7] hover:underline"
              >
                Clear search
              </button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                No archived notes
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Notes that you archive will appear here.
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Search result count */}
          {search.trim() && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing{" "}
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {filteredNotes.length}
              </span>{" "}
              matching{" "}
              {filteredNotes.length === 1
                ? "note"
                : "notes"}
            </p>
          )}

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}