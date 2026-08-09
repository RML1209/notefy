import { z } from "zod";

export const VerifyTwoFactorSchema = z.object({
  token: z
    .string()
    .trim()
    .length(6, "Two-factor authentication code must be exactly 6 characters.")
    .regex(
      /^[A-Z0-9]{6}$/,
      "Two-factor authentication code is invalid."
    ),
});

export type VerifyTwoFactorInput = z.infer<typeof VerifyTwoFactorSchema>;