import { z } from "zod";

export const SettingsSchema = z
  .object({
    // Profile Information
    name: z
      .string()
      .trim()
      .min(1, "Name is required.")
      .max(100, "Name is too long."),

    email: z
      .email("Please enter a valid email address.")
      .trim()
      .transform((email) => email.toLowerCase()),

    image: z
      .string()
      .url("Please enter a valid image URL.")
      .nullable()
      .optional(),

    // Security
    isTwoFactorEnabled: z.boolean(),

    currentPassword: z.string().optional(),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(100, "Password is too long.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number."
      )
      .optional(),

    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const isChangingPassword =
      data.currentPassword ||
      data.newPassword ||
      data.confirmPassword;

    if (isChangingPassword) {
      if (!data.currentPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["currentPassword"],
          message: "Current password is required.",
        });
      }

      if (!data.newPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newPassword"],
          message: "New password is required.",
        });
      }

      if (!data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["confirmPassword"],
          message: "Please confirm your new password.",
        });
      }

      if (
        data.newPassword &&
        data.confirmPassword &&
        data.newPassword !== data.confirmPassword
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["confirmPassword"],
          message: "Passwords do not match.",
        });
      }

      if (
        data.currentPassword &&
        data.newPassword &&
        data.currentPassword === data.newPassword
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newPassword"],
          message: "New password must be different from the current password.",
        });
      }
    }
  });

export type SettingsInput = z.infer<typeof SettingsSchema>;