import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { NoteCard } from "@/components/notes/note-card";

export default async function ArchivePage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const notes = await prisma.note.findMany({
    where: {
      userId: session.user.id,
      isArchived: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Archived Notes"
        description="View and restore your archived notes."
      />

      {notes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-[#111A1F]">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            No archived notes
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Notes that you archive will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={{
                id: note.id,
                title: note.title,
                content: note.content,
                isPinned: note.isPinned,
                isArchived: note.isArchived,
                remindAt: note.remindAt,
                createdAt: note.createdAt,
                updatedAt: note.updatedAt,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}