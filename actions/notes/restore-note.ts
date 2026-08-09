"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { z } from "zod";

const RestoreNoteSchema = z.object({
  id: z.string().cuid(),
});

export type RestoreNoteInput =
  z.infer<typeof RestoreNoteSchema>;

interface ActionResult {
  success?: string;
  error?: string;
}

export async function restoreNote(
  values: RestoreNoteInput
): Promise<ActionResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "Unauthorized.",
      };
    }

    const validated =
      RestoreNoteSchema.safeParse(values);

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

    if (!note.isArchived) {
      return {
        error: "Note is not archived.",
      };
    }

    await prisma.note.update({
      where: {
        id,
      },
      data: {
        isArchived: false,
      },
    });

    return {
      success:
        "Note restored successfully.",
    };
  } catch {
    return {
      error:
        "Something went wrong while restoring the note.",
    };
  }
}