"use client";

import { Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NoteDeleteDialogProps {
  open: boolean;
  loading?: boolean;
  noteTitle?: string;

  onClose: () => void;
  onConfirm: () => void;
}

export function NoteDeleteDialog({
  open,
  loading = false,
  noteTitle,
  onClose,
  onConfirm,
}: NoteDeleteDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#111A1F]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Delete Note
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 transition hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            Are you sure you want to permanently delete
            {noteTitle ? (
              <>
                {" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  {noteTitle}
                </span>
              </>
            ) : (
              " this note"
            )}
            ?
          </p>

          <p className="mt-3 text-sm text-red-500">
            Deleted notes cannot be recovered.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4 dark:border-slate-800">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading
              ? "Deleting..."
              : "Delete Note"}
          </Button>
        </div>
      </div>
    </div>
  );
}