"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getReminders() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      reminders: [],
    };
  }

  const reminders = await prisma.note.findMany({
    where: {
      userId: session.user.id,
      isArchived: false,
      remindAt: {
        not: null,
      },
    },

    select: {
      id: true,
      title: true,
      remindAt: true,
      isPinned: true,
    },

    orderBy: {
      remindAt: "asc",
    },
  });

  return {
    reminders,
  };
}