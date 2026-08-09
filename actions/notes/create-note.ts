"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { z } from "zod";

const CreateNoteSchema = z.object({
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

export type CreateNoteInput =
  z.infer<typeof CreateNoteSchema>;

interface ActionResult {
  success?: string;
  error?: string;
}

export async function createNote(
  values: CreateNoteInput
): Promise<ActionResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "Unauthorized.",
      };
    }

    const validated =
      CreateNoteSchema.safeParse(values);

    if (!validated.success) {
      return {
        error: "Invalid note data.",
      };
    }

    const {
      title,
      content,
      remindAt,
    } = validated.data;

    await prisma.note.create({
      data: {
        title,
        content,
        remindAt,
        userId: session.user.id,
      },
    });

    return {
      success:
        "Note created successfully.",
    };
  } catch {
    return {
      error:
        "Something went wrong while creating the note.",
    };
  }
}