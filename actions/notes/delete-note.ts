"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { z } from "zod";

const DeleteNoteSchema = z.object({
  id: z.string().cuid(),
});

export type DeleteNoteInput =
  z.infer<typeof DeleteNoteSchema>;

interface ActionResult {
  success?: string;
  error?: string;
}

export async function deleteNote(
  values: DeleteNoteInput
): Promise<ActionResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "Unauthorized.",
      };
    }

    const validated =
      DeleteNoteSchema.safeParse(values);

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

    await prisma.note.delete({
      where: {
        id,
      },
    });

    return {
      success:
        "Note deleted successfully.",
    };
  } catch {
    return {
      error:
        "Something went wrong while deleting the note.",
    };
  }
}