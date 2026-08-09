"use client";

import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ForgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/schemas/forgot-password.schema";

import { forgotPassword } from "@/actions/auth/forgot-password";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";

export function ForgotPasswordForm() {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const form =
    useForm<ForgotPasswordInput>({
      resolver: zodResolver(
        ForgotPasswordSchema
      ),

      defaultValues: {
        email: "",
      },
    });

  function onSubmit(
    values: ForgotPasswordInput
  ) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result =
        await forgotPassword(values);

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.success) {
        setSuccess(result.success);

        router.push(
          `/reset-password?email=${encodeURIComponent(
            values.email
          )}`
        );
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
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        disabled={isPending}
        error={
          form.formState.errors.email
            ?.message
        }
        {...form.register("email")}
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
            Sending Code...
          </>
        ) : (
          "Send Reset Code"
        )}
      </Button>
    </form>
  );
}