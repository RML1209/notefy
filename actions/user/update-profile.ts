"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface UpdateProfileInput {
  name?: string;
  image?: string | null;
}

interface UpdateProfileResult {
  success: boolean;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  } | null;
  error: string | null;
}

export async function updateProfile(
  input: UpdateProfileInput
): Promise<UpdateProfileResult> {
  try {
    // Get the authenticated user
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        user: null,
        error: "Unauthorized.",
      };
    }

    /*
     * Clean the name.
     */
    const name =
      typeof input.name === "string"
        ? input.name.trim()
        : undefined;

    /*
     * Validate the name if it was provided.
     */
    if (name !== undefined) {
      if (name.length === 0) {
        return {
          success: false,
          user: null,
          error: "Name cannot be empty.",
        };
      }

      if (name.length > 100) {
        return {
          success: false,
          user: null,
          error: "Name cannot exceed 100 characters.",
        };
      }
    }

    /*
     * Update only profile fields.
     *
     * IMPORTANT:
     * Email is intentionally NOT included here.
     */
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        ...(name !== undefined && {
          name,
        }),

        ...(input.image !== undefined && {
          image: input.image,
        }),
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
      user,
      error: null,
    };
  } catch (error) {
    console.error("Failed to update profile:", error);

    return {
      success: false,
      user: null,
      error: "Failed to update profile.",
    };
  }
}