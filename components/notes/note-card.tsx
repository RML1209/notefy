"use client";

import Link from "next/link";

import { Bell, Pin } from "lucide-react";

import { format } from "date-fns";

import { NoteActions } from "./note-actions";

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    content: string;

    isPinned: boolean;
    isArchived: boolean;

    remindAt: Date | null;

    createdAt: Date;
    updatedAt: Date;
  };
}
export function NoteCard({ note }: NoteCardProps) {
  return (
    <Link href={`/notes/${note.id}`} className="group block">
      <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#6A89A7] hover:shadow-lg dark:border-slate-800 dark:bg-[#111A1F]">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            {note.isPinned && (
              <Pin className="h-4 w-4 fill-amber-500 text-amber-500" />
            )}

            <h3 className="line-clamp-1 text-lg font-semibold text-slate-900 dark:text-white">
              {note.title}
            </h3>
          </div>

          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <NoteActions
              note={note}
            />
          </div>
        </div>

        {/* Content */}
        <p className="line-clamp-5 flex-1 whitespace-pre-wrap text-sm leading-7 text-slate-600 dark:text-slate-300">
          {note.content}
        </p>

        {/* Reminder */}
        {note.remindAt && (
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
            <Bell className="h-4 w-4" />

            <span>{format(note.remindAt, "MMM d, yyyy • h:mm a")}</span>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <span>Updated {format(note.updatedAt, "MMM d, yyyy")}</span>

          {note.isArchived && (
            <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-medium dark:bg-slate-700">
              Archived
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}
