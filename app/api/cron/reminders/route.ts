import { NextResponse } from "next/server";

import { processReminders } from "@/actions/reminders/process-reminders";

export async function GET(request: Request) {
  /*
   * Protect the cron endpoint.
   *
   * Vercel Cron sends the CRON_SECRET
   * through the Authorization header.
   */
  const authHeader =
    request.headers.get("authorization");

  const cronSecret =
    process.env.CRON_SECRET;

  /*
   * Make sure CRON_SECRET exists.
   */
  if (!cronSecret) {
    console.error(
      "CRON_SECRET is not configured."
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Cron secret is not configured.",
      },
      {
        status: 500,
      }
    );
  }

  /*
   * Verify the request.
   */
  if (
    authHeader !==
    `Bearer ${cronSecret}`
  ) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    /*
     * Process all due reminders.
     */
    const result =
      await processReminders();

    /*
     * Return the processing result.
     */
    return NextResponse.json(
      result,
      {
        status: result.success
          ? 200
          : 500,
      }
    );
  } catch (error) {
    console.error(
      "Reminder cron failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to process reminders.",
      },
      {
        status: 500,
      }
    );
  }
}