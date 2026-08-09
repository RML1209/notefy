import { ArchiveNoteCard } from "./archived-note-card";

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

interface ArchiveNoteListProps {
  notes: ArchivedNote[];
}

export function ArchiveNoteList({
  notes,
}: ArchiveNoteListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <ArchiveNoteCard
          key={note.id}
          note={note}
        />
      ))}
    </div>
  );
}