"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export interface UpdateSettingsInput {
  reminderNotifications?: boolean;
  emailNotifications?: boolean;
}

export interface UpdateSettingsResult {
  success: boolean;
  message: string;
}

export async function updateSettings(
  input: UpdateSettingsInput,
): Promise<UpdateSettingsResult> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to update settings.",
      };
    }

    const data: UpdateSettingsInput = {};

    if (input.reminderNotifications !== undefined) {
      if (typeof input.reminderNotifications !== "boolean") {
        return { success: false, message: "Invalid reminder preference." };
      }

      data.reminderNotifications = input.reminderNotifications;
    }

    if (input.emailNotifications !== undefined) {
      if (typeof input.emailNotifications !== "boolean") {
        return { success: false, message: "Invalid email preference." };
      }

      data.emailNotifications = input.emailNotifications;
    }

    if (Object.keys(data).length === 0) {
      return {
        success: false,
        message: "No settings were provided to update.",
      };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data,
    });

    return {
      success: true,
      message: "Settings saved successfully.",
    };
  } catch (error) {
    console.error("Failed to update settings:", error);

    return {
      success: false,
      message: "Could not save your settings. Please try again.",
    };
  }
}
