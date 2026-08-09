"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { z } from "zod";

const GetNotesSchema = z.object({
  search: z.string().optional().default(""),

  filter: z
    .enum([
      "all",
      "pinned",
      "archived",
    ])
    .optional()
    .default("all"),
});

export type GetNotesInput =
  z.infer<typeof GetNotesSchema>;

interface NoteItem {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  isArchived: boolean;
  remindAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ActionResult {
  notes?: NoteItem[];
  error?: string;
}

export async function getNotes(
  values?: Partial<GetNotesInput>
): Promise<ActionResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "Unauthorized.",
      };
    }

    const validated =
      GetNotesSchema.safeParse(values ?? {});

    if (!validated.success) {
      return {
        error: "Invalid filters.",
      };
    }

    const {
      search,
      filter,
    } = validated.data;

    const where = {
      userId: session.user.id,

      ...(filter === "pinned"
        ? {
            isPinned: true,
            isArchived: false,
          }
        : {}),

      ...(filter === "archived"
        ? {
            isArchived: true,
          }
        : {}),

      ...(filter === "all"
        ? {
            isArchived: false,
          }
        : {}),

      ...(search.trim()
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                content: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
    };

    const notes =
      await prisma.note.findMany({
        where,

        orderBy: [
          {
            isPinned: "desc",
          },
          {
            updatedAt: "desc",
          },
        ],
      });

    return {
      notes: notes.map((note) => ({
        id: note.id,
        title: note.title,
        content: note.content,
        isPinned: note.isPinned,
        isArchived: note.isArchived,
        remindAt: note.remindAt,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      })),
    };
  } catch {
    return {
      error:
        "Something went wrong while retrieving notes.",
    };
  }
}