"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface GetNotesByDateInput {
  date: Date;
}

export async function getNotesByDate({
  date,
}: GetNotesByDateInput) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      notes: [],
    };
  }

  const startOfDay = new Date(date);

  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);

  endOfDay.setHours(23, 59, 59, 999);

  const notes = await prisma.note.findMany({
    where: {
      userId: session.user.id,

      isArchived: false,

      remindAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },

    select: {
      id: true,
      title: true,
      content: true,
      remindAt: true,
      isPinned: true,
      updatedAt: true,
    },

    orderBy: [
      {
        isPinned: "desc",
      },
      {
        remindAt: "asc",
      },
    ],
  });

  return {
    notes,
  };
}