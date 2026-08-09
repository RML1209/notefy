"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

import {
  ResetPasswordSchema,
  type ResetPasswordInput,
} from "@/schemas/reset-password.schema";

import type { ActionResult } from "./types";

export async function resetPassword(
  values: ResetPasswordInput
): Promise<ActionResult> {
  // Validate form fields
  const validatedFields =
    ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid reset request.",
    };
  }

  const {
    email,
    token,
    password,
  } = validatedFields.data;

  // Normalize email
  const normalizedEmail =
    email.trim().toLowerCase();

  // Find password reset token
  const passwordResetToken =
    await prisma.passwordResetToken.findFirst({
      where: {
        email: normalizedEmail,
        token,
      },
    });

  if (!passwordResetToken) {
    return {
      error: "Invalid password reset code.",
    };
  }

  // Check expiration
  if (passwordResetToken.expires < new Date()) {
    return {
      error: "Password reset code has expired.",
    };
  }

  // Find user
  const user =
    await prisma.user.findUnique({
      where: {
        id: passwordResetToken.userId,
      },
    });

  if (!user) {
    return {
      error: "User not found.",
    };
  }

  // Prevent resetting to the current password
  const isCurrentPassword =
    await bcrypt.compare(
      password,
      user.passwordHash
    );

  if (isCurrentPassword) {
    return {
      error:
        "Your new password must be different from your current password.",
    };
  }

  // Hash new password
  const passwordHash =
    await bcrypt.hash(password, 12);

  // Update password and invalidate all reset tokens
  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash,
      },
    }),

    prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    }),
  ]);

  return {
    success:
      "Your password has been reset successfully.",
  };
}