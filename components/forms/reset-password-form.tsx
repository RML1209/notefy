"use client";

import { useState, useTransition } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ResetPasswordSchema,
  type ResetPasswordInput,
} from "@/schemas/reset-password.schema";

import { resetPassword } from "@/actions/auth/reset-password";

import { PasswordInput } from "@/components/ui/password-input";
import { OTPInput } from "@/components/ui/otp-input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";

export function ResetPasswordForm() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const email =
    searchParams.get("email") ?? "";

  const [isPending, startTransition] =
    useTransition();

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const form =
    useForm<ResetPasswordInput>({
      resolver: zodResolver(
        ResetPasswordSchema
      ),

      defaultValues: {
        email,
        token: "",
        password: "",
        confirmPassword: "",
      },
    });

  function onSubmit(
    values: ResetPasswordInput
  ) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result =
        await resetPassword(values);

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.success) {
        setSuccess(result.success);

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(
        onSubmit
      )}
      className="space-y-5"
    >
      <input
        type="hidden"
        {...form.register("email")}
      />

     <OTPInput
  label="Reset Code"
  value={form.watch("token") ?? ""}
  onChange={(value) =>
    form.setValue("token", value, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }
  length={6}
  disabled={isPending}
  error={form.formState.errors.token?.message}
/>
      <PasswordInput
        label="New Password"
        placeholder="Enter your new password"
        disabled={isPending}
        error={
          form.formState.errors.password
            ?.message
        }
        {...form.register("password")}
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your new password"
        disabled={isPending}
        error={
          form.formState.errors
            .confirmPassword?.message
        }
        {...form.register(
          "confirmPassword"
        )}
      />

      <FormError
        message={error}
      />

      <FormSuccess
        message={success}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Spinner
              size={18}
              className="mr-2"
            />
            Resetting Password...
          </>
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}