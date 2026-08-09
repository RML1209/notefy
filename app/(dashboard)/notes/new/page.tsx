import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { NoteEditor } from "@/components/notes/note-editor";

export default function NewNotePage() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Create Note"
        description="Write down your ideas, reminders, and important information."
      />

      <NoteEditor mode="create" />
    </div>
  );
}