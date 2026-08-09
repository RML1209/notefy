import { z } from "zod";

export const VerifyEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  token: z
    .string()
    .trim()
    .length(6, "Verification code must be 6 digits."),
});

export type VerifyEmailInput = z.infer<
  typeof VerifyEmailSchema
>;