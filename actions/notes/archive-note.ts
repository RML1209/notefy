"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ArchiveNoteSchema = z.object({
  id: z.string().cuid(),
});

export type ArchiveNoteInput =
  z.infer<typeof ArchiveNoteSchema>;

interface ActionResult {
  success?: string;
  error?: string;
}

export async function archiveNote(
  values: ArchiveNoteInput
): Promise<ActionResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "Unauthorized.",
      };
    }

    const validated =
      ArchiveNoteSchema.safeParse(values);

    if (!validated.success) {
      return {
        error: "Invalid note ID.",
      };
    }

    const { id } = validated.data;

    const note = await prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (!note) {
      return {
        error: "Note not found.",
      };
    }

    if (note.userId !== session.user.id) {
      return {
        error: "Unauthorized.",
      };
    }

    if (note.isArchived) {
      return {
        error: "Note is already archived.",
      };
    }

    await prisma.note.update({
      where: {
        id,
      },
      data: {
        isArchived: true,
      },
    });

    return {
      success: "Note archived successfully.",
    };
  } catch {
    return {
      error:
        "Something went wrong while archiving the note.",
    };
  }
}