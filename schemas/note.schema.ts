import { z } from "zod";

export const NoteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(200, "Title cannot exceed 200 characters."),

  content: z
    .string()
    .trim()
    .max(10000, "Content cannot exceed 10,000 characters.")
    .default(""),

  remindAt: z
    .date()
    .nullable()
    .optional(),

  isPinned: z
    .boolean()
    .default(false),

  isArchived: z
    .boolean()
    .default(false),
});

export type NoteInput = z.infer<typeof NoteSchema>;