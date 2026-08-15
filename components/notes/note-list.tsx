"use client";

import { useState } from "react";

import { NoteCard } from "./note-card";

export interface NoteItem {
  id: string;
  title: string;
  content: string;

  isPinned: boolean;
  isArchived: boolean;

  remindAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

interface NoteListProps {
  notes: NoteItem[];
}

export function NoteList({
  notes: initialNotes,
}: NoteListProps) {
  const [notes, setNotes] =
    useState<NoteItem[]>(initialNotes);

  /**
   * Remove a note from the UI.
   *
   * Used after:
   * - Archive
   * - Delete
   *
   * The database has already been updated by
   * the server action. We only update the
   * local UI here.
   */
  function handleRemove(noteId: string) {
    setNotes((currentNotes) =>
      currentNotes.filter(
        (note) => note.id !== noteId
      )
    );
  }

  /**
   * Update the pinned state locally.
   *
   * Used after:
   * - Pin
   * - Unpin
   */
  function handlePinChange(
    noteId: string,
    isPinned: boolean
  ) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              isPinned,
            }
          : note
      )
    );
  }

  /*
   * If all notes have been removed, show
   * an empty state.
   */
  if (notes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-[#111A1F]">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          No notes
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Your notes will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onRemove={handleRemove}
          onPinChange={handlePinChange}
        />
      ))}
    </div>
  );
}