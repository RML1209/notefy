"use server";

import { cookies } from "next/headers";

import { createLoginTicket } from "@/lib/login-ticket";

import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";
import bcrypt from "bcryptjs";

import { AuthError } from "next-auth";

import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";

import {
  sendVerificationEmail,
  sendTwoFactorEmail,
} from "@/lib/mail";

import {
  LoginSchema,
  type LoginInput,
} from "@/schemas/login.schema";

import type { ActionResult } from "./types";

export async function login(
  values: LoginInput
): Promise<ActionResult> {

  // Validate form fields
  const validatedFields =
    LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid credentials.",
    };
  }

  const { email, password } =
    validatedFields.data;

  // Normalize email
  const normalizedEmail =
    email.trim().toLowerCase();

  // Check user exists
  const user =
    await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

  if (!user) {
    return {
      error: "Invalid credentials.",
    };
  }

/**
 * --------------------------------------------------
 * Verify password
 * --------------------------------------------------
 */
const passwordsMatch = await bcrypt.compare(
  password,
  user.passwordHash
);

if (!passwordsMatch) {
  return {
    error: "Invalid email or password.",
  };
}

  /**
   * --------------------------------------------------
   * Email Verification
   * --------------------------------------------------
   */
  if (!user.emailVerified) {
    const verificationToken =
      await generateVerificationToken(user);

    const mailResult =
      await sendVerificationEmail(
        user.email,
        verificationToken.token
      );

    if (!mailResult.success) {
      return {
        error: mailResult.error,
      };
    }

    return {
      success:
        "Your email is not verified. A new verification code has been sent.",
    };
  }


  /**
   * --------------------------------------------------
   * Two-Factor Authentication
   * --------------------------------------------------
   */
  if (user.isTwoFactorEnabled) {
    const twoFactorToken =
      await generateTwoFactorToken(user);

    const mailResult =
      await sendTwoFactorEmail(
        user.email,
        twoFactorToken.token
      );

    if (!mailResult.success) {
      return {
        error: mailResult.error,
      };
    }

    const loginTicket =
      await createLoginTicket(
        user.id,
        user.email
      );

    const cookieStore =
      await cookies();

    cookieStore.set(
      "login-ticket",
      loginTicket,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "strict",
        maxAge: 60 * 10,
        path: "/",
      }
    );

    return {
      success:
        "A verification code has been sent to your email.",
    };
  }

try {
  await signIn("credentials", {
    email: normalizedEmail,
    password,
    redirect: false,
  });

  return {
    success: "Login successful.",
  };
} catch (error) {
  if (error instanceof AuthError) {
    return {
      error: "Unable to create session.",
    };
  }

  return {
    error: "Something went wrong.",
    };
}
}