"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { z } from "zod";

const PinNoteSchema = z.object({
  id: z.string().cuid(),
});

interface ActionResult {
  success?: string;
  error?: string;
}

export type PinNoteInput = z.infer<
  typeof PinNoteSchema
>;

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

    if (note.userId !== session.user.id) {
      return {
        error: "Unauthorized.",
      };
    }

    const updatedNote =
      await prisma.note.update({
        where: {
          id,
        },
        data: {
          isPinned: !note.isPinned,
        },
      });

    revalidatePath("/notes");
    revalidatePath("/archive");
    revalidatePath("/dashboard");
    revalidatePath("/calendar");

    return {
      success: updatedNote.isPinned
        ? "Note pinned successfully."
        : "Note unpinned successfully.",
    };
  } catch (error) {
    console.error("pinNote error:", error);

    return {
      error:
        "Something went wrong while updating the note.",
    };
  }
}