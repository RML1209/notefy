"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { z } from "zod";

const UpdateNoteSchema = z.object({
  id: z.string().cuid(),

  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200),

  content: z
    .string()
    .trim()
    .min(1, "Content is required"),

  remindAt: z
    .date()
    .nullable()
    .optional(),
});

export type UpdateNoteInput =
  z.infer<typeof UpdateNoteSchema>;

interface ActionResult {
  success?: string;
  error?: string;
}

export async function updateNote(
  values: UpdateNoteInput
): Promise<ActionResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "Unauthorized.",
      };
    }

    const validated =
      UpdateNoteSchema.safeParse(values);

    if (!validated.success) {
      return {
        error: "Invalid note data.",
      };
    }

    const {
      id,
      title,
      content,
      remindAt,
    } = validated.data;

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

    await prisma.note.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        remindAt,
      },
    });

    return {
      success:
        "Note updated successfully.",
    };
  } catch {
    return {
      error:
        "Something went wrong while updating the note.",
    };
  }
}