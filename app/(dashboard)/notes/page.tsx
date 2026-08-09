import { getNotes } from "@/actions/notes/get-notes";

import { NotesClient } from "@/components/notes/notes-client";

export default async function NotesPage() {
  const result = await getNotes({
    search: "",
    filter: "all",
  });

  const notes = result.notes ?? [];

  return (
    <div className="space-y-6">
      <NotesClient initialNotes={notes} />
    </div>
  );
}