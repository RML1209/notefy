"use client";

import { useEffect, useState, useTransition } from "react";

import { getNotes } from "@/actions/notes/get-notes";

import { NoteToolbar } from "./note-toolbar";
import { NoteList } from "./note-list";
import { NoteEmpty } from "./note-empty";

interface NoteItem {
  id: string;
  title: string;
  content: string;

  isPinned: boolean;
  isArchived: boolean;

  remindAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

interface NotesClientProps {
  initialNotes: NoteItem[];
}

export function NotesClient({
  initialNotes,
}: NotesClientProps) {
  const [notes, setNotes] =
    useState<NoteItem[]>(initialNotes);

  const [search, setSearch] =
    useState("");

  const [isPending, startTransition] =
    useTransition();

  useEffect(() => {
    const timeout = setTimeout(() => {
      startTransition(async () => {
        const result = await getNotes({
          search,
          filter: "all",
        });

        if (result.notes) {
          setNotes(result.notes);
        }
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="space-y-6">
      <NoteToolbar
        totalNotes={notes.length}
        search={search}
        onSearchChange={setSearch}
      />

      {isPending ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-slate-500">
            Searching notes...
          </p>
        </div>
      ) : notes.length === 0 ? (
        <NoteEmpty />
      ) : (
        <NoteList notes={notes} />
      )}
    </div>
  );
}