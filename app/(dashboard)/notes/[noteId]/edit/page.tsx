import { notFound } from "next/navigation";

import { getNote } from "@/actions/notes/get-note";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { NoteEditor } from "@/components/notes/note-editor";

interface EditNotePageProps {
  params: Promise<{
    noteId: string;
  }>;
}

export default async function EditNotePage({
  params,
}: EditNotePageProps) {
  const { noteId } = await params;

  const result = await getNote({
    id: noteId,
  });

  if (!result.note) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Edit Note"
        description="Update your note and save your changes."
      />

      <NoteEditor
        mode="edit"
        note={result.note}
      />
    </div>
  );
}