"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface UpdateSettingsInput {
  reminderNotifications?: boolean;
  emailNotifications?: boolean;
}

interface UpdateSettingsResult {
  success: boolean;
  message: string;
}

export async function updateSettings(
  input: UpdateSettingsInput
): Promise<UpdateSettingsResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in.",
      };
    }

    const data: UpdateSettingsInput = {};

    if (input.reminderNotifications !== undefined) {
      data.reminderNotifications = input.reminderNotifications;
    }

    if (input.emailNotifications !== undefined) {
      data.emailNotifications = input.emailNotifications;
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data,
    });

    return {
      success: true,
      message: "Settings updated successfully.",
    };
  } catch (error) {
    console.error("Failed to update settings:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update settings.",
    };
  }
}