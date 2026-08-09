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
  notes,
}: NoteListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
        />
      ))}
    </div>
  );
}