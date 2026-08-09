"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface ActionResult {
  notes?: {
    id: string;
    title: string;
    content: string;
    isPinned: boolean;
    isArchived: boolean;
    remindAt: Date | null;
    updatedAt: Date;
  }[];
  error?: string;
}

export async function getRecentNotes(): Promise<ActionResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "Unauthorized.",
      };
    }

    const notes = await prisma.note.findMany({
      where: {
        userId: session.user.id,
        isArchived: false,
      },

      select: {
        id: true,
        title: true,
        content: true,
        isPinned: true,
        isArchived: true,
        remindAt: true,
        updatedAt: true,
      },

      orderBy: {
        updatedAt: "desc",
      },

      take: 5,
    });

    return {
      notes,
    };
  } catch {
    return {
      error: "Unable to retrieve recent notes.",
    };
  }
}