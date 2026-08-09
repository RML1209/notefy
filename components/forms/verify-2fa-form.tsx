"use client";

import { useState, useTransition } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  VerifyTwoFactorSchema,
  type VerifyTwoFactorInput,
} from "@/schemas/verify-2fa.schema";

import { verifyTwoFactor } from "@/actions/auth/verify-2fa";

import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/ui/otp-input";
import { Spinner } from "@/components/ui/spinner";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";

export function VerifyTwoFactorForm() {
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
    useForm<VerifyTwoFactorInput>({
      resolver: zodResolver(
        VerifyTwoFactorSchema
      ),

      defaultValues: {
        email,
        token: "",
      },
    });

  function onSubmit(
    values: VerifyTwoFactorInput
  ) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result =
        await verifyTwoFactor(values);

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.success) {
        setSuccess(result.success);

        router.push("/dashboard");
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

      <OtpInput
        label="Authentication Code"
        length={6}
        disabled={isPending}
        error={
          form.formState.errors.token
            ?.message
        }
        {...form.register("token")}
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
            Verifying...
          </>
        ) : (
          "Verify Code"
        )}
      </Button>

      <Button
        type="button"
        variant="ghost"
        className="w-full"
        onClick={() =>
          router.push("/login")
        }
        disabled={isPending}
      >
        Back to Login
      </Button>
    </form>
  );
}