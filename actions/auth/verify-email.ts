"use server";

import { prisma } from "@/lib/prisma";

import {
  VerifyEmailSchema,
  type VerifyEmailInput,
} from "@/schemas/verify-email.schema";

import type { ActionResult } from "./types";

export async function verifyEmail(
  values: VerifyEmailInput
): Promise<ActionResult> {

  // Your existing verifyEmail() code

  const validatedFields =
    VerifyEmailSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid verification code.",
    };
  }

  const { email, token } = validatedFields.data;

  const normalizedEmail = email.trim().toLowerCase();

  const existingToken =
    await prisma.verificationToken.findFirst({
      where: {
        email: normalizedEmail,
        token,
      },
    });

  if (!existingToken) {
    return {
      error: "Invalid verification code.",
    };
  }

  if (existingToken.expires < new Date()) {
    return {
      error: "Verification code has expired.",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user) {
    return {
      error: "User not found.",
    };
  }


await prisma.$transaction([
  prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
    },
  }),

  prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  }),
]);
  return {
    success: "Email verified successfully.",
  };


}