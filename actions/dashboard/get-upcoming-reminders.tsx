"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface ActionResult {
  reminders?: {
    id: string;
    title: string;
    content: string;
    remindAt: Date;
    isPinned: boolean;
  }[];
  error?: string;
}

export async function getUpcomingReminders(): Promise<ActionResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "Unauthorized.",
      };
    }

    const now = new Date();

    const reminders = await prisma.note.findMany({
      where: {
        userId: session.user.id,
        isArchived: false,
        remindAt: {
          not: null,
          gte: now,
        },
      },

      select: {
        id: true,
        title: true,
        content: true,
        remindAt: true,
        isPinned: true,
      },

      orderBy: {
        remindAt: "asc",
      },

      take: 5,
    });

    return {
      reminders: reminders.filter(
        (
          reminder
        ): reminder is typeof reminder & {
          remindAt: Date;
        } => reminder.remindAt !== null
      ),
    };
  } catch {
    return {
      error: "Unable to retrieve upcoming reminders.",
    };
  }
}