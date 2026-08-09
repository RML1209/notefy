"use client";

import Link from "next/link";

import { Pin } from "lucide-react";

import { format } from "date-fns";

interface RecentNote {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  isArchived: boolean;
  remindAt: Date | null;
  updatedAt: Date;
}

interface RecentNotesProps {
  notes: RecentNote[];
}

export function RecentNotes({
  notes,
}: RecentNotesProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111A1F]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Recent Notes
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your recently updated notes.
          </p>
        </div>

        <Link
          href="/notes"
          className="text-sm font-medium text-[#6A89A7] hover:underline"
        >
          View all
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
          <p className="text-sm text-slate-500">
            You dont have any notes yet.
          </p>

          <Link
            href="/notes/new"
            className="mt-3 inline-block text-sm font-medium text-[#6A89A7]"
          >
            Create your first note
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              className="block rounded-xl border border-slate-200 p-4 transition hover:border-[#6A89A7] hover:shadow-sm dark:border-slate-700"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {note.isPinned && (
                      <Pin className="h-4 w-4 shrink-0 fill-amber-500 text-amber-500" />
                    )}

                    <h3 className="truncate font-semibold text-slate-900 dark:text-white">
                      {note.title}
                    </h3>
                  </div>

                  <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                    {note.content}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-slate-400">
                  {format(note.updatedAt, "MMM d")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}