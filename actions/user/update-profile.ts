"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface UpdateProfileInput {
  name: string;
  image?: string | null;
}

interface UpdateProfileResult {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export async function updateProfile(
  input: UpdateProfileInput
): Promise<UpdateProfileResult> {
  try {
    // Make sure the user is authenticated.
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to update your profile.",
      };
    }

    // Validate name.
    const name = input.name.trim();

    if (!name) {
      return {
        success: false,
        message: "Name is required.",
      };
    }

    if (name.length < 2) {
      return {
        success: false,
        message: "Name must contain at least 2 characters.",
      };
    }

    if (name.length > 100) {
      return {
        success: false,
        message: "Name must not exceed 100 characters.",
      };
    }

    // Update only fields that the user is allowed to change.
    //
    // Email is intentionally NOT included here.
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        ...(input.image !== undefined
          ? {
              image: input.image,
            }
          : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    return {
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    };
  } catch (error) {
    console.error("Failed to update profile:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update profile.",
    };
  }
}