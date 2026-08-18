import * as React from "react";

import { resend } from "./resend";

import { ReminderEmail } from "@/components/email/reminder-email";

interface SendReminderEmailInput {
  to: string;
  userName: string;
  noteId: string;
  noteTitle: string;
  noteContent: string;
  remindAt: Date;
}

interface SendReminderEmailResult {
  success: boolean;
  error?: string;
}

export async function sendReminderEmail({
  to,
  userName,
  noteId,
  noteTitle,
  noteContent,
  remindAt,
}: SendReminderEmailInput): Promise<SendReminderEmailResult> {
  try {
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      "http://localhost:3000";

    const noteUrl = `${appUrl}/notes/${noteId}`;

    const from =
      process.env.RESEND_FROM_EMAIL ??
      "Notefy <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: `🔔 Reminder: ${noteTitle}`,
      react: React.createElement(
        ReminderEmail,
        {
          userName,
          noteTitle,
          noteContent,
          remindAt,
          noteUrl,
        }
      ),
    });

    if (error) {
      console.error(
        "Resend reminder email error:",
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Failed to send reminder email:",
      error
    );

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to send reminder email.",
    };
  }
}