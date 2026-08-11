"use client";

import {
  useEffect,
  useState,
  useTransition,
} from "react";

import Link from "next/link";

import {
  CalendarDays,
  Pin,
  SearchX,
} from "lucide-react";

import { getNotesByDate } from "@/actions/calendar/get-notes-by-date";

import { Skeleton } from "@/components/ui/skeleton";

interface NoteItem {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  remindAt: Date | null;
  updatedAt: Date;
}

interface SelectedDateNotesProps {
  selectedDate: Date;
  search: string;
}

export function SelectedDateNotes({
  selectedDate,
  search,
}: SelectedDateNotesProps) {
  const [notes, setNotes] = useState<NoteItem[]>([]);

  const [isPending, startTransition] =
    useTransition();

  /*
   * Fetch notes whenever the selected
   * calendar date changes.
   */
  useEffect(() => {
    let cancelled = false;

    startTransition(async () => {
      try {
        const result = await getNotesByDate({
          date: selectedDate,
        });

        if (!cancelled) {
          setNotes(result.notes ?? []);
        }
      } catch (error) {
        console.error(
          "Failed to load notes for selected date:",
          error
        );

        if (!cancelled) {
          setNotes([]);
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  /*
   * Filter notes locally based on the
   * calendar search input.
   *
   * Searching checks both title and content.
   */
  const normalizedSearch =
    search.trim().toLowerCase();

  const filteredNotes =
    normalizedSearch === ""
      ? notes
      : notes.filter((note) => {
          const title =
            note.title.toLowerCase();

          const content =
            note.content.toLowerCase();

          return (
            title.includes(normalizedSearch) ||
            content.includes(normalizedSearch)
          );
        });

  const formattedDate =
    selectedDate.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111A1F]">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <CalendarDays className="h-5 w-5 shrink-0 text-[#6A89A7]" />

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {formattedDate}
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isPending
              ? "Loading notes..."
              : search.trim()
                ? `${filteredNotes.length} ${
                    filteredNotes.length === 1
                      ? "note"
                      : "notes"
                  } found`
                : `${notes.length} ${
                    notes.length === 1
                      ? "note"
                      : "notes"
                  } scheduled`}
          </p>
        </div>
      </div>

      {/* Loading */}
      {isPending ? (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <Skeleton
              key={item}
              className="h-24 rounded-xl"
            />
          ))}
        </div>
      ) : filteredNotes.length === 0 ? (
        /*
         * Empty / Search empty state
         */
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
          {normalizedSearch ? (
            <>
              <SearchX className="mx-auto mb-3 h-8 w-8 text-slate-400" />

              <p className="font-medium text-slate-700 dark:text-slate-300">
                No matching notes
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                No notes match &quot;{search}&quot;
                for this date.
              </p>
            </>
          ) : (
            <>
              <CalendarDays className="mx-auto mb-3 h-8 w-8 text-slate-400" />

              <p className="font-medium text-slate-700 dark:text-slate-300">
                No notes scheduled
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                There are no notes or reminders
                for this day.
              </p>
            </>
          )}
        </div>
      ) : (
        /*
         * Notes list
         */
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <Link
              key={note.id}
              href={`/notes/${note.id}`}
              className="block rounded-xl border border-slate-200 p-4 transition hover:border-[#6A89A7] hover:shadow-md dark:border-slate-700 dark:hover:border-[#6A89A7]"
            >
              {/* Note header */}
              <div className="mb-2 flex items-center justify-between gap-3">
                <h4 className="line-clamp-1 font-semibold text-slate-900 dark:text-white">
                  {note.title}
                </h4>

                {note.isPinned && (
                  <Pin className="h-4 w-4 shrink-0 fill-amber-500 text-amber-500" />
                )}
              </div>

              {/* Content */}
              <p className="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {note.content}
              </p>

              {/* Reminder */}
              {note.remindAt && (
                <p className="mt-3 text-xs font-medium text-[#6A89A7]">
                  Reminder:{" "}
                  {note.remindAt.toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}