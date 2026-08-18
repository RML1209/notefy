"use server";

import { prisma } from "@/lib/prisma";
import { sendReminderEmail } from "@/lib/email/send-reminder-email";

interface ProcessRemindersResult {
  success: boolean;
  processed: number;
  sent: number;
  failed: number;
  errors: string[];
}

export async function processReminders(): Promise<ProcessRemindersResult> {
  const result: ProcessRemindersResult = {
    success: true,
    processed: 0,
    sent: 0,
    failed: 0,
    errors: [],
  };

  try {
    const now = new Date();

    /*
     * Find all reminders that are due
     * and have not been sent yet.
     */
    const reminders = await prisma.note.findMany({
      where: {
        remindAt: {
          lte: now,
        },
        isReminderSent: false,
      },
      orderBy: {
        remindAt: "asc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        remindAt: true,
        userId: true,
      },
    });

    result.processed = reminders.length;

    /*
     * Process each reminder individually.
     */
    for (const note of reminders) {
      try {
        /*
         * Safety check.
         */
        if (!note.remindAt) {
          continue;
        }

        /*
         * Get the owner of the note.
         */
        const user = await prisma.user.findUnique({
          where: {
            id: note.userId,
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

        /*
         * User no longer exists.
         */
        if (!user) {
          result.failed++;

          result.errors.push(
            `User for note "${note.id}" was not found.`
          );

          continue;
        }

        /*
         * Make sure the user has an email address.
         */
        if (!user.email) {
          result.failed++;

          result.errors.push(
            `User for note "${note.id}" has no email address.`
          );

          continue;
        }

        /*
         * Send the reminder email.
         */
        const emailResult = await sendReminderEmail({
          to: user.email,
          userName: user.name ?? "Notefy User",
          noteId: note.id,
          noteTitle: note.title,
          noteContent: note.content,
          remindAt: note.remindAt,
        });

        /*
         * Email failed.
         *
         * Keep isReminderSent = false
         * so the next cron execution can retry.
         */
        if (!emailResult.success) {
          result.failed++;

          result.errors.push(
            `Failed to send reminder for note "${note.id}": ${
              emailResult.error ??
              "Unknown email error."
            }`
          );

          continue;
        }

        /*
         * Email was successfully sent.
         *
         * Mark the reminder as sent so it
         * won't be sent again.
         */
        await prisma.note.update({
          where: {
            id: note.id,
          },
          data: {
            isReminderSent: true,
          },
        });

        result.sent++;
      } catch (error) {
        result.failed++;

        result.errors.push(
          `Error processing note "${note.id}": ${
            error instanceof Error
              ? error.message
              : "Unknown error."
          }`
        );
      }
    }

    return result;
  } catch (error) {
    console.error(
      "Failed to process reminders:",
      error
    );

    return {
      ...result,
      success: false,
      errors: [
        ...result.errors,
        error instanceof Error
          ? error.message
          : "Failed to process reminders.",
      ],
    };
  }
}