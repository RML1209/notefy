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

export function RecentNotes({ notes }: RecentNotesProps) {
  return (
    <section
      className="
        w-full
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-blue-200
        bg-surface
        text-foreground
        shadow-sm
        transition-colors
        duration-200
        dark:border-slate-700

        p-3
        xs:p-4
        sm:p-5
        lg:p-6
        xl:p-7
      "
    >
      {/* ============================================
          HEADER
      ============================================ */}
      <header
        className="
          mb-4
          flex
          min-w-0
          flex-wrap
          items-center
          justify-between
          gap-x-3
          gap-y-2

          sm:mb-5
          lg:mb-6
        "
      >
        {/* Heading */}
        <div className="min-w-0 flex-1">
          <h2
            className="
              truncate
              text-base
              font-semibold
              leading-tight
              text-foreground

              sm:text-lg
              lg:text-xl
            "
          >
            Recent Notes
          </h2>

          <p
            className="
              mt-1
              truncate
              text-xs
              leading-relaxed
              text-muted

              sm:text-sm
            "
          >
            Your recently updated notes.
          </p>
        </div>

        {/* View All */}
        <Link
          href="/notes"
          className="
            inline-flex
            min-h-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            px-2
            py-1
            text-xs
            font-medium
            text-primary
            transition-all
            duration-200

            hover:bg-surface-secondary
            hover:underline
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            focus-visible:ring-offset-2

            sm:min-h-9
            sm:px-3
            sm:text-sm
          "
        >
          View all
        </Link>
      </header>

      {/* ============================================
          EMPTY STATE
      ============================================ */}
      {notes.length === 0 ? (
        <div
          className="
            w-full
            rounded-xl
            border
            border-dashed
            border-border
            bg-surface-secondary
            px-4
            py-8
            text-center
            transition-colors
            duration-200

            sm:px-6
            sm:py-10
          "
        >
          <p
            className="
              text-xs
              leading-relaxed
              text-muted

              sm:text-sm
            "
          >
            You dont have any notes yet.
          </p>

          <Link
            href="/notes/new"
            className="
              mt-3
              inline-flex
              min-h-9
              items-center
              justify-center
              rounded-lg
              px-3
              py-2
              text-xs
              font-medium
              text-primary
              transition-all
              duration-200
              hover:bg-surface
              hover:underline
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary

              sm:text-sm
            "
          >
            Create your first note
          </Link>
        </div>
      ) : (
        /* ============================================
            NOTES LIST
        ============================================ */
        <div
          className="
            grid
            w-full
            min-w-0
            grid-cols-1
            gap-2.5

            sm:gap-3
          "
        >
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              className="
                group
                relative
                block
                w-full
                min-w-0
                overflow-hidden
                rounded-xl
                border
                border-blue-200
                bg-surface-secondary
                transition-all
                duration-200

                hover:border-primary
                hover:shadow-sm

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2

                dark:border-slate-700

                p-3
                sm:p-4
                lg:p-5
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  flex-col
                  gap-2

                  sm:flex-row
                  sm:items-start
                  sm:justify-between
                  sm:gap-4
                "
              >
                {/* ========================================
                    NOTE INFORMATION
                ======================================== */}
                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  {/* Title Row */}
                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-2
                    "
                  >
                    {/* Pin */}
                    {note.isPinned && (
                      <Pin
                        className="
                          h-3.5
                          w-3.5
                          shrink-0
                          fill-amber-500
                          text-amber-500

                          sm:h-4
                          sm:w-4
                        "
                        aria-label="Pinned note"
                      />
                    )}

                    {/* Title */}
                    <h3
                      className="
                        min-w-0
                        flex-1
                        truncate
                        text-sm
                        font-semibold
                        leading-5
                        text-foreground
                        transition-colors
                        duration-200
                        group-hover:text-primary

                        sm:text-base
                      "
                    >
                      {note.title}
                    </h3>
                  </div>

                  {/* Note Content */}
                  <p
                    className="
                      mt-1.5
                      line-clamp-2
                      text-xs
                      leading-relaxed
                      text-muted

                      sm:mt-2
                      sm:text-sm
                    "
                  >
                    {note.content}
                  </p>
                </div>

                {/* ========================================
                    UPDATED DATE
                ======================================== */}
                <time
                  dateTime={note.updatedAt.toISOString()}
                  className="
                    shrink-0
                    self-start
                    whitespace-nowrap
                    text-[10px]
                    font-medium
                    text-muted

                    sm:pt-0.5
                    sm:text-xs
                  "
                >
                  {format(note.updatedAt, "MMM d")}
                </time>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

