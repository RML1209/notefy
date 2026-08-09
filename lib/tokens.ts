import crypto from "crypto";

import type { User } from "@prisma/client";

import { prisma } from "@/lib/prisma";

const TOKEN_EXPIRATION = 15 * 60 * 1000; // 15 minutes

function generateToken(): string {
  return crypto
    .randomInt(100000, 999999)
    .toString();
}

/**
 * -----------------------------------------------------
 * Email Verification Token
 * -----------------------------------------------------
 */
export async function generateVerificationToken(
  user: User
) {
  const token = generateToken();

  const expires = new Date(
    Date.now() + TOKEN_EXPIRATION
  );

  await prisma.verificationToken.deleteMany({
    where: {
      userId: user.id,
    },
  });

  return prisma.verificationToken.create({
    data: {
      email: user.email,
      userId: user.id,
      token,
      expires,
    },
  });
}

/**
 * -----------------------------------------------------
 * Password Reset Token
 * -----------------------------------------------------
 */
export async function generatePasswordResetToken(
  user: User
) {
  const token = generateToken();

  const expires = new Date(
    Date.now() + TOKEN_EXPIRATION
  );

  await prisma.passwordResetToken.deleteMany({
    where: {
      userId: user.id,
    },
  });

  return prisma.passwordResetToken.create({
    data: {
      email: user.email,
      userId: user.id,
      token,
      expires,
    },
  });
}

/**
 * -----------------------------------------------------
 * Two-Factor Authentication Token
 * -----------------------------------------------------
 */
export async function generateTwoFactorToken(
  user: User
) {
  const token = generateToken();

  const expires = new Date(
    Date.now() + TOKEN_EXPIRATION
  );

  await prisma.twoFactorToken.deleteMany({
    where: {
      userId: user.id,
    },
  });

  return prisma.twoFactorToken.create({
    data: {
      email: user.email,
      userId: user.id,
      token,
      expires,
    },
  });
}