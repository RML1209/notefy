"use client";

import { useState, useTransition } from "react";
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

  function execute(
    action: () => Promise<ActionResult>
  ) {
    setMessage("");
    setError("");

    startTransition(async () => {
      const result = await action();

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.success) {
        setMessage(result.success);
      }

      setOpenMenu(false);

      router.refresh();

      // Remove the message after a few seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    });
  }

  return (
    <>
      <div className="relative">
        {/* More button */}
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          onClick={() => {
            setOpenMenu((prev) => !prev);
            setError("");
          }}
        >
          <MoreVertical className="h-5 w-5" />
        </Button>

        {/* Action menu */}
        {openMenu && (
          <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white py-2 shadow-xl dark:border-slate-700 dark:bg-[#111A1F]">
            {/* Pin / Unpin */}
            <button
              type="button"
              className="flex w-full items-center gap-3 px-4 py-2 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
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
                className="flex w-full items-center gap-3 px-4 py-2 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
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
                className="flex w-full items-center gap-3 px-4 py-2 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
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
              className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
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

        {/* Success message */}
        {message && (
          <div className="absolute right-0 top-full z-40 mt-3 w-64 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-lg dark:border-green-900 dark:bg-green-900/20 dark:text-green-400">
            ✓ {message}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="absolute right-0 top-full z-40 mt-3 w-64 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg dark:border-red-900 dark:bg-red-900/20 dark:text-red-400">
            ✕ {error}
          </div>
        )}
      </div>

      {/* Delete dialog */}
      <NoteDeleteDialog
        open={showDelete}
        loading={isPending}
        onClose={() => setShowDelete(false)}
        onConfirm={() =>
          execute(async () => {
            const result = await deleteNote({
              id: noteId,
            });

            setShowDelete(false);

            return result;
          })
        }
      />
    </>
  );
}