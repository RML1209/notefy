"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  MoreVertical,
  Pin,
  PinOff,
  Archive,
  ArchiveRestore,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { pinNote } from "@/actions/notes/pin-note";
import { archiveNote } from "@/actions/notes/archive-note";
import { restoreNote } from "@/actions/notes/restore-note";
import { deleteNote } from "@/actions/notes/delete-note";

import { NoteDeleteDialog } from "./note-delete-dialog";

interface NoteActionsProps {
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

interface ActionResult {
  success?: string;
  error?: string;
}

export function NoteActions({
  note: { id: noteId, isPinned, isArchived },
}: NoteActionsProps) {
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [isPending, startTransition] = useTransition();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /**
   * Clear notification messages automatically.
   */
  useEffect(() => {
    if (!message && !error) {
      return;
    }

    const timer = setTimeout(() => {
      setMessage("");
      setError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, error]);

  /**
   * Execute a server action and refresh
   * the current Server Component data.
   */
  function execute(
    action: () => Promise<ActionResult>
  ) {
    setMessage("");
    setError("");

    startTransition(async () => {
      try {
        const result = await action();

        if (result.error) {
          setError(result.error);
          return;
        }

        if (result.success) {
          setMessage(result.success);
        }

        setOpenMenu(false);

        /**
         * Refresh Server Components so that:
         *
         * /notes
         *     ↓
         * getNotes()
         *     ↓
         * archived notes are removed
         *
         * /archive
         *     ↓
         * archived notes appear
         */
        router.refresh();
      } catch {
        setError(
          "Something went wrong. Please try again."
        );
      }
    });
  }

  return (
    <>
      <div className="relative">
        {/* More Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isPending}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            setOpenMenu((prev) => !prev);

            setMessage("");
            setError("");
          }}
          aria-label="Note actions"
          aria-expanded={openMenu}
        >
          <MoreVertical className="h-5 w-5" />
        </Button>

        {/* Action Menu */}
        {openMenu && (
          <div
            className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white py-2 shadow-xl dark:border-slate-700 dark:bg-[#111A1F]"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            {/* Pin / Unpin */}
            <button
              type="button"
              className="flex w-full items-center gap-3 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800"
              disabled={isPending}
              onClick={() =>
                execute(() =>
                  pinNote({
                    id: noteId,
                  })
                )
              }
            >
              {isPinned ? (
                <>
                  <PinOff className="h-4 w-4" />
                  Unpin
                </>
              ) : (
                <>
                  <Pin className="h-4 w-4" />
                  Pin
                </>
              )}
            </button>

            {/* Archive / Restore */}
            {isArchived ? (
              <button
                type="button"
                className="flex w-full items-center gap-3 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800"
                disabled={isPending}
                onClick={() =>
                  execute(() =>
                    restoreNote({
                      id: noteId,
                    })
                  )
                }
              >
                <ArchiveRestore className="h-4 w-4" />
                Restore
              </button>
            ) : (
              <button
                type="button"
                className="flex w-full items-center gap-3 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800"
                disabled={isPending}
                onClick={() =>
                  execute(() =>
                    archiveNote({
                      id: noteId,
                    })
                  )
                }
              >
                <Archive className="h-4 w-4" />
                Archive
              </button>
            )}

            {/* Delete */}
            <button
              type="button"
              className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-900/20"
              disabled={isPending}
              onClick={() => {
                setOpenMenu(false);
                setShowDelete(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div
            role="status"
            className="absolute right-0 top-full z-40 mt-3 w-64 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-lg dark:border-green-900 dark:bg-green-900/20 dark:text-green-400"
          >
            <div className="flex items-start gap-2">
              <span className="font-bold">✓</span>
              <span>{message}</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="absolute right-0 top-full z-40 mt-3 w-64 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg dark:border-red-900 dark:bg-red-900/20 dark:text-red-400"
          >
            <div className="flex items-start gap-2">
              <span className="font-bold">✕</span>
              <span>{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Delete Dialog */}
      <NoteDeleteDialog
        open={showDelete}
        loading={isPending}
        onClose={() => setShowDelete(false)}
        onConfirm={() =>
          execute(async () => {
            const result = await deleteNote({
              id: noteId,
            });

            if (!result.error) {
              setShowDelete(false);
            }

            return result;
          })
        }
      />
    </>
  );
}