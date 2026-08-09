"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

import { generateVerificationToken } from "@/lib/tokens";

import { sendVerificationEmail } from "@/lib/mail";

import {
  RegisterSchema,
  type RegisterInput,
} from "@/schemas/register.schema";

import type { ActionResult } from "./types";

export async function register(
  values: RegisterInput
): Promise<ActionResult> {
  // Validate form fields
  const validatedFields =
    RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields.",
    };
  }

  const { name, email, password } =
    validatedFields.data;

  // Normalize email
  const normalizedEmail =
    email.trim().toLowerCase();

  // Check if user already exists
  const existingUser =
    await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

  if (existingUser) {
    return {
      error: "Email is already in use.",
    };
  }

  // Hash password
  const passwordHash =
    await bcrypt.hash(password, 12);

  // Create user
  const user =
    await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        passwordHash,
      },
    });

  // Generate verification token
  const verificationToken =
    await generateVerificationToken(user);

  // Send verification email
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
      "Account created successfully. Please check your email to verify your account.",
  };
}