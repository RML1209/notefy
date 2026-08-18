"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export interface ReminderItem {
  id: string;
  title: string;
  content: string;
  remindAt: string;
  isReminderSent: boolean;
}

interface GetRemindersResult {
  success: boolean;
  reminders: ReminderItem[];
  error?: string;
}

export async function getReminders(): Promise<GetRemindersResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        reminders: [],
        error: "Unauthorized.",
      };
    }

    const reminders = await prisma.note.findMany({
      where: {
        userId: session.user.id,
        remindAt: {
          not: null,
        },
      },
      orderBy: {
        remindAt: "desc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        remindAt: true,
        isReminderSent: true,
      },
    });

    return {
      success: true,
      reminders: reminders
        .filter(
          (
            reminder
          ): reminder is typeof reminder & {
            remindAt: Date;
          } => reminder.remindAt !== null
        )
        .map((reminder) => ({
          id: reminder.id,
          title: reminder.title,
          content: reminder.content,
          remindAt: reminder.remindAt.toISOString(),
          isReminderSent: reminder.isReminderSent,
        })),
    };
  } catch (error) {
    console.error(
      "Failed to get reminders:",
      error
    );

    return {
      success: false,
      reminders: [],
      error:
        error instanceof Error
          ? error.message
          : "Failed to load reminders.",
    };
  }
}