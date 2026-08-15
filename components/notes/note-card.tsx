"use client";

import { useState } from "react";
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

  onRemove?: (id: string) => void;

  onPinChange?: (
    id: string,
    isPinned: boolean
  ) => void;
}

export function NoteCard({
  note,
  onRemove,
  onPinChange,
}: NoteCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Local state allows the card to update immediately
  // without refreshing the page.
  const [isPinned, setIsPinned] = useState(
    note.isPinned
  );

  const [isArchived, setIsArchived] = useState(
    note.isArchived
  );

  if (!isVisible) {
    return null;
  }

  function handlePinChange(
    id: string,
    pinned: boolean
  ) {
    setIsPinned(pinned);

    onPinChange?.(id, pinned);
  }

  function handleArchive() {
    // Immediately remove archived note from the
    // normal Notes page.
    setIsArchived(true);
    setIsVisible(false);
  }

  function handleRemove(id: string) {
    setIsVisible(false);
    onRemove?.(id);
  }

  return (
    <Link
      href={`/notes/${note.id}`}
      className="group block"
    >
      <article className="flex h-full flex-col rounded-2xl border border-blue-100 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg dark:border-slate-700 dark:bg-[#111A1F]">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            {isPinned && (
              <Pin className="h-4 w-4 shrink-0 fill-amber-500 text-amber-500" />
            )}

            <h3 className="line-clamp-1 text-lg font-semibold text-slate-900 dark:text-white">
              {note.title}
            </h3>
          </div>

          {/* Actions */}
          <div
            className="relative shrink-0"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <NoteActions
              note={{
                ...note,
                isPinned,
                isArchived,
              }}
              onArchived={handleArchive}
              onRemove={handleRemove}
              onPinChange={handlePinChange}
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

            <span>
              {format(
                note.remindAt,
                "MMM d, yyyy • h:mm a"
              )}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <span>
            Updated{" "}
            {format(
              note.updatedAt,
              "MMM d, yyyy"
            )}
          </span>

          {isArchived && (
            <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-medium dark:bg-slate-700">
              Archived
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}