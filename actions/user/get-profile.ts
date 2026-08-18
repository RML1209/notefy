"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getProfile() {
  try {
    // Get the currently authenticated user
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        user: null,
        error: "Unauthorized.",
      };
    }

    // Get the user's profile from the database
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        emailVerified: true,
      },
    });

    if (!user) {
      return {
        success: false,
        user: null,
        error: "User not found.",
      };
    }

    return {
      success: true,
      user,
      error: null,
    };
  } catch (error) {
    console.error("Failed to get profile:", error);

    return {
      success: false,
      user: null,
      error: "Failed to load profile.",
    };
  }
}