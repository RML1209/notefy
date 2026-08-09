import Link from "next/link";

import { notFound } from "next/navigation";

import { Edit } from "lucide-react";

import { getNote } from "@/actions/notes/get-note";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { NoteActions } from "@/components/notes/note-actions";

import { Button } from "@/components/ui/button";

interface NoteDetailsPageProps {
  params: Promise<{
    noteId: string;
  }>;
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { noteId } = await params;

  const result = await getNote({
    id: noteId,
  });

  if (!result.note) {
    notFound();
  }

  const note = result.note;

  return (
    <div className="space-y-8">
      <DashboardHeader
        title={note.title}
        description="View your note details."
        showNewNoteButton={false}
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111A1F]">
        <div className="flex flex-col gap-6">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3">
            {note.isPinned && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                📌 Pinned
              </span>
            )}

            {note.isArchived && (
              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                Archived
              </span>
            )}

            {note.remindAt && (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                Reminder:{" "}
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(note.remindAt)}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="prose max-w-none whitespace-pre-wrap text-slate-700 dark:prose-invert dark:text-slate-300">
            {note.content}
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 dark:border-slate-700 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Last updated{" "}
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(note.updatedAt)}
            </div>

            <div className="flex items-center gap-3">
              <Link href={`/notes/${note.id}/edit`}>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>

              <NoteActions note={note} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}