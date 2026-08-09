import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .email("Please enter a valid email address.")
    .trim()
    .transform((email) => email.toLowerCase()),
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;