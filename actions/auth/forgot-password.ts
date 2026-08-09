"use server";

import { prisma } from "@/lib/prisma";

import {
  generatePasswordResetToken,
} from "@/lib/tokens";

import {
  sendPasswordResetEmail,
} from "@/lib/mail";

import {
  ForgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/schemas/forgot-password.schema";

import type { ActionResult } from "./types";

export async function forgotPassword(
  values: ForgotPasswordInput
): Promise<ActionResult> {
  // Validate form fields
  const validatedFields =
    ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid email address.",
    };
  }

  const { email } = validatedFields.data;

  // Normalize email
  const normalizedEmail =
    email.trim().toLowerCase();

  // Find user
  const user =
    await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

  /**
   * Do not reveal whether the email exists.
   */
  if (!user) {
    return {
      success:
        "If an account with that email exists, a password reset code has been sent.",
    };
  }

  // Generate password reset token
  const passwordResetToken =
    await generatePasswordResetToken(user);

  // Send password reset email
  const mailResult =
    await sendPasswordResetEmail(
      user.email,
      passwordResetToken.token
    );

  if (!mailResult.success) {
    return {
      error: mailResult.error,
    };
  }

  return {
    success:
      "If an account with that email exists, a password reset code has been sent.",
  };
}