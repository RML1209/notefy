"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const PinNoteSchema = z.object({
  id: z.string().cuid(),
});

export type PinNoteInput = z.infer<typeof PinNoteSchema>;

interface ActionResult {
  success?: string;
  error?: string;
}

export async function pinNote(
  values: PinNoteInput
): Promise<ActionResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "Unauthorized.",
      };
    }

    const validated =
      PinNoteSchema.safeParse(values);

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

    // Make sure the note belongs to the logged-in user
    if (note.userId !== session.user.id) {
      return {
        error: "Unauthorized.",
      };
    }

    // Toggle pin status
    await prisma.note.update({
      where: {
        id,
      },
      data: {
        isPinned: !note.isPinned,
      },
    });

    return {
      success: note.isPinned
        ? "Note unpinned successfully."
        : "Note pinned successfully.",
    };
  } catch {
    return {
      error:
        "Something went wrong while updating the note.",
    };
  }
}