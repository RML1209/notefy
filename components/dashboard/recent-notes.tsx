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
    <section
      className="
        rounded-2xl
        border
        border-blue-200
        dark:border-slate-700
        border-border
        bg-surface
        p-6
        text-foreground
        shadow-sm
        transition-colors
        duration-200
      "
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Recent Notes
          </h2>

          <p className="mt-1 text-sm text-muted">
            Your recently updated notes.
          </p>
        </div>

        <Link
          href="/notes"
          className="
            text-sm
            font-medium
            text-primary
            transition-opacity
            hover:opacity-80
            hover:underline
          "
        >
          View all
        </Link>
      </div>

      {/* Empty State */}
      {notes.length === 0 ? (
        <div
          className="
            rounded-xl
            border
            border-dashed
            border-border
            bg-surface-secondary
            p-8
            text-center
            transition-colors
            duration-200
          "
        >
          <p className="text-sm text-muted">
            You dont have any notes yet.
          </p>

          <Link
            href="/notes/new"
            className="
              mt-3
              inline-block
              text-sm
              font-medium
              text-primary
              hover:underline
            "
          >
            Create your first note
          </Link>
        </div>
      ) : (
        /* Notes */
        <div className="space-y-3">
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              className="
                block
                rounded-xl
                border
                border-blue-200
                dark:border-slate-700
                bg-surface-secondary
                p-4
                transition-all
                duration-200
                hover:border-primary
                hover:shadow-sm
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  {/* Title */}
                  <div className="flex items-center gap-2">
                    {note.isPinned && (
                      <Pin
                        className="
                          h-4
                          w-4
                          shrink-0
                          fill-amber-500
                          text-amber-500
                        "
                      />
                    )}

                    <h3
                      className="
                        truncate
                        font-semibold
                        text-foreground
                      "
                    >
                      {note.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <p
                    className="
                      mt-1
                      line-clamp-2
                      text-sm
                      text-muted
                    "
                  >
                    {note.content}
                  </p>
                </div>

                {/* Updated date */}
                <span
                  className="
                    shrink-0
                    text-xs
                    text-muted
                  "
                >
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