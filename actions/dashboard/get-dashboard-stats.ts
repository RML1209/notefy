"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface DashboardStats {
  totalNotes: number;
  pinnedNotes: number;
  archivedNotes: number;
  todayReminders: number;
}

interface ActionResult {
  stats?: DashboardStats;
  error?: string;
}

export async function getDashboardStats(): Promise<ActionResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "Unauthorized.",
      };
    }

    const userId = session.user.id;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const [
      totalNotes,
      pinnedNotes,
      archivedNotes,
      todayReminders,
    ] = await Promise.all([
      prisma.note.count({
        where: {
          userId,
          isArchived: false,
        },
      }),

      prisma.note.count({
        where: {
          userId,
          isPinned: true,
          isArchived: false,
        },
      }),

      prisma.note.count({
        where: {
          userId,
          isArchived: true,
        },
      }),

      prisma.note.count({
        where: {
          userId,
          isArchived: false,
          remindAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
      }),
    ]);

    return {
      stats: {
        totalNotes,
        pinnedNotes,
        archivedNotes,
        todayReminders,
      },
    };
  } catch {
    return {
      error: "Unable to retrieve dashboard statistics.",
    };
  }
}