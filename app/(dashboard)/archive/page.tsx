import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ArchiveClient } from "@/components/archive/archive-client";

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
    select: {
      id: true,
      title: true,
      content: true,
      isPinned: true,
      isArchived: true,
      remindAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Archive"
        description="View and manage your archived notes."
      />

      <ArchiveClient notes={notes} />
    </div>
  );
}