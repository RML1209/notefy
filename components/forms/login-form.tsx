"use client";

import { useState, useTransition } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  LoginSchema,
  type LoginInput,
} from "@/schemas/login.schema";

import { login } from "@/actions/auth/login";

import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";

export function LoginForm() {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginInput) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await login(values);

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.success) {
        setSuccess(result.success);

        // Email verification
        if (
          result.success.includes(
            "email is not verified"
          )
        ) {
          router.push(
            `/verify-email?email=${encodeURIComponent(
              values.email
            )}`
          );

          return;
        }

        // Two-Factor Authentication
        if (
          result.success.includes(
            "verification code has been sent"
          )
        ) {
          router.push("/verify-2fa");

          return;
        }

        // Successful login
        router.push("/dashboard");
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        disabled={isPending}
        error={
          form.formState.errors.email?.message
        }
        {...form.register("email")}
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        disabled={isPending}
        error={
          form.formState.errors.password
            ?.message
        }
        {...form.register("password")}
      />

      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          disabled={isPending}
        />

        <Link
          href="/forgot-password"
          className="
            text-sm
            font-medium
            text-[#6A89A7]
            hover:underline
          "
        >
          Forgot Password?
        </Link>
      </div>

      <FormError message={error} />

      <FormSuccess message={success} />

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
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}