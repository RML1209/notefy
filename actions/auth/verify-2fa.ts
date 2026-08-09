"use server";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";

import { AuthError } from "next-auth";

import { verifyLoginTicket } from "@/lib/login-ticket";

import {
  VerifyTwoFactorSchema,
  type VerifyTwoFactorInput,
} from "@/schemas/verify-2fa.schema";

import type { ActionResult } from "./types";

export async function verifyTwoFactor(
  values: VerifyTwoFactorInput
): Promise<ActionResult> {
  // Validate form
  const validatedFields =
    VerifyTwoFactorSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid verification code.",
    };
  }

  const { token } = validatedFields.data;

  // Read login ticket cookie
  const cookieStore = await cookies();

  const loginTicket =
    cookieStore.get("login-ticket")?.value;

  if (!loginTicket) {
    return {
      error:
        "Your login session has expired. Please sign in again.",
    };
  }

  // Verify login ticket
  const payload =
    await verifyLoginTicket(loginTicket);

  if (!payload) {
    cookieStore.delete("login-ticket");

    return {
      error:
        "Your login session has expired. Please sign in again.",
    };
  }

  // Find OTP
  const existingToken =
    await prisma.twoFactorToken.findFirst({
      where: {
        email: payload.email,
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

  // Remove OTP
  await prisma.twoFactorToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  try {
    await signIn("credentials", {
      loginTicket,
      redirect: false,
    });

    // Login completed successfully.
    // Remove the temporary login ticket.
    cookieStore.delete("login-ticket");

    return {
      success: "Login successful.",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Unable to sign in.",
      };
    }

    console.error(error);

    return {
      error: "Something went wrong. Please try again.",
    };
  }
}