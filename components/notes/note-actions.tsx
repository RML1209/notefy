"use client";

import { useState, useTransition } from "react";

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

interface ActionResult {
  success?: string;
  error?: string;
}

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

  onArchived?: () => void;

  onRemove?: (id: string) => void;

  onPinChange?: (
    id: string,
    isPinned: boolean
  ) => void;
}

export function NoteActions({
  note,
  onArchived,
  onRemove,
  onPinChange,
}: NoteActionsProps) {
  const {
    id: noteId,
    isPinned,
    isArchived,
  } = note;

  const [openMenu, setOpenMenu] =
    useState(false);

  const [showDelete, setShowDelete] =
    useState(false);

  const [isPending, startTransition] =
    useTransition();

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  /**
   * Execute a server action and then
   * update the local UI through callbacks.
   */
  function execute(
    action: () => Promise<ActionResult>,
    onSuccess?: () => void
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

        // Update the parent/card immediately.
        onSuccess?.();

        // Automatically remove the message
        // after 3 seconds.
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } catch {
        setError(
          "Something went wrong. Please try again."
        );
      }
    });
  }

  /**
   * Pin / Unpin
   */
  function handlePin() {
    execute(
      () =>
        pinNote({
          id: noteId,
        }),
      () => {
        onPinChange?.(
          noteId,
          !isPinned
        );
      }
    );
  }

  /**
   * Archive
   */
  function handleArchive() {
    execute(
      () =>
        archiveNote({
          id: noteId,
        }),
      () => {
        onArchived?.();
      }
    );
  }

  /**
   * Restore
   */
  function handleRestore() {
    execute(() =>
      restoreNote({
        id: noteId,
      })
    );
  }

  /**
   * Delete
   */
  function handleDelete() {
    execute(
      () =>
        deleteNote({
          id: noteId,
        }),
      () => {
        setShowDelete(false);

        onRemove?.(noteId);
      }
    );
  }

  return (
    <>
      {/* Action container */}
      <div className="relative">
        {/* More button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isPending}
          aria-label="Note actions"
          aria-expanded={openMenu}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            setOpenMenu((prev) => !prev);

            setMessage("");
            setError("");
          }}
        >
          <MoreVertical className="h-5 w-5" />
        </Button>

        {/* Action menu */}
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
              disabled={isPending}
              onClick={handlePin}
              className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {isPinned ? (
                <>
                  <PinOff className="h-4 w-4" />
                  <span>Unpin</span>
                </>
              ) : (
                <>
                  <Pin className="h-4 w-4" />
                  <span>Pin</span>
                </>
              )}
            </button>

            {/* Archive / Restore */}
            {isArchived ? (
              <button
                type="button"
                disabled={isPending}
                onClick={handleRestore}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <ArchiveRestore className="h-4 w-4" />
                <span>Restore</span>
              </button>
            ) : (
              <button
                type="button"
                disabled={isPending}
                onClick={handleArchive}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Archive className="h-4 w-4" />
                <span>Archive</span>
              </button>
            )}

            {/* Delete */}
            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                setOpenMenu(false);
                setShowDelete(true);
              }}
              className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        )}

        {/* Success message */}
        {message && (
          <div
            role="status"
            className="absolute right-0 top-full z-40 mt-3 w-64 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 shadow-lg dark:border-green-900 dark:bg-green-900/20 dark:text-green-400"
          >
            <div className="flex items-start gap-2">
              <span className="font-bold">
                ✓
              </span>

              <span>{message}</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="absolute right-0 top-full z-40 mt-3 w-64 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 shadow-lg dark:border-red-900 dark:bg-red-900/20 dark:text-red-400"
          >
            <div className="flex items-start gap-2">
              <span className="font-bold">
                ✕
              </span>

              <span>{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <NoteDeleteDialog
        open={showDelete}
        loading={isPending}
        onClose={() => {
          if (!isPending) {
            setShowDelete(false);
          }
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}