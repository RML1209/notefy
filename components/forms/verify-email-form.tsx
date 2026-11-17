"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  VerifyEmailSchema,
  type VerifyEmailInput,
} from "@/schemas/verify-email.schema";

import { verifyEmail } from "@/actions/auth/verify-email";

import { Button } from "@/components/ui/button";
import { OTPInput } from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<VerifyEmailInput>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      email,
      token: "",
    },
  });

  // Subscribe to the token field without using form.watch().
  const token = useWatch({
    control: form.control,
    name: "token",
  });

  function onSubmit(values: VerifyEmailInput) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await verifyEmail(values);

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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <input type="hidden" {...form.register("email")} />

      <OTPInput
        label="Verification Code"
        value={token ?? ""}
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

      <FormError message={error} />

      <FormSuccess message={success} />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Spinner size="sm" className="mr-2" />
            Verifying...
          </>
        ) : (
          "Verify Email"
        )}
      </Button>

      <Button
        type="button"
        variant="ghost"
        className="w-full"
        onClick={() => router.push("/register")}
        disabled={isPending}
      >
        Resend Verification Code
      </Button>
    </form>
  );
}
