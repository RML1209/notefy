"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { z } from "zod";

const GetNoteSchema = z.object({
  id: z.string().cuid(),
});

export type GetNoteInput =
  z.infer<typeof GetNoteSchema>;

interface ActionResult {
  note?: {
    id: string;
    title: string;
    content: string;
    isPinned: boolean;
    isArchived: boolean;
    remindAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };

  error?: string;
}

export async function getNote(
  values: GetNoteInput
): Promise<ActionResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "Unauthorized.",
      };
    }

    const validated =
      GetNoteSchema.safeParse(values);

    if (!validated.success) {
      return {
        error: "Invalid note ID.",
      };
    }

    const { id } = validated.data;

    const note =
      await prisma.note.findUnique({
        where: {
          id,
        },
      });

    if (!note) {
      return {
        error: "Note not found.",
      };
    }

    if (
      note.userId !==
      session.user.id
    ) {
      return {
        error: "Unauthorized.",
      };
    }

    return {
      note: {
        id: note.id,
        title: note.title,
        content: note.content,
        isPinned: note.isPinned,
        isArchived: note.isArchived,
        remindAt: note.remindAt,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      },
    };
  } catch {
    return {
      error:
        "Something went wrong while retrieving the note.",
    };
  }
}