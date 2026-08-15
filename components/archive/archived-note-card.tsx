"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  ArchiveRestore,
  Bell,
  Pin,
  Trash2,
} from "lucide-react";

import { format } from "date-fns";

import { restoreNote } from "@/actions/notes/restore-note";
import { deleteNote } from "@/actions/notes/delete-note";

import { Button } from "@/components/ui/button";

interface ArchivedNote {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  isArchived: boolean;
  remindAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ArchivedNoteCardProps {
  note: ArchivedNote;
}

export function ArchiveNoteCard({
  note,
}: ArchivedNoteCardProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  function handleRestore() {
    startTransition(async () => {
      const result = await restoreNote({
        id: note.id,
      });

      if (result?.error) {
        console.error(result.error);
        return;
      }

      router.refresh();
    });
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this note?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteNote({
        id: note.id,
      });

      if (result?.error) {
        console.error(result.error);
        return;
      }

      router.refresh();
    });
  }

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-100 dark:bg-[#111A1F]">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {note.isPinned && (
            <Pin className="h-4 w-4 shrink-0 fill-amber-500 text-amber-500" />
          )}

          <h3 className="truncate text-lg font-semibold text-slate-900 dark:text-white">
            {note.title}
          </h3>
        </div>

        <span className="shrink-0 rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
          Archived
        </span>
      </div>

      {/* Content */}
      <Link
        href={`/notes/${note.id}`}
        className="flex-1"
      >
        <p className="line-clamp-5 whitespace-pre-wrap text-sm leading-7 text-slate-600 dark:text-slate-300">
          {note.content}
        </p>
      </Link>

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
      <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
        <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
          Updated{" "}
          {format(note.updatedAt, "MMM d, yyyy")}
        </p>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={handleRestore}
            className="flex-1"
          >
            <ArchiveRestore className="mr-2 h-4 w-4" />

            {isPending
              ? "Restoring..."
              : "Restore"}
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={handleDelete}
            className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}