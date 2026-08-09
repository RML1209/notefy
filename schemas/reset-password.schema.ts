import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address."),

    token: z
      .string()
      .trim()
      .length(6, "Reset code must be 6 digits."),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters."
      )
      .max(
        100,
        "Password is too long."
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number."
      ),

    confirmPassword: z.string(),
  })
  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }
  );

export type ResetPasswordInput =
  z.infer<typeof ResetPasswordSchema>;