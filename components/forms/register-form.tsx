"use client";

import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  RegisterSchema,
  type RegisterInput,
} from "@/schemas/register.schema";

import { register } from "@/actions/auth/register";

import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";

export function RegisterForm() {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [error, setError] = useState("");

  const [success, setSuccess] =
    useState("");

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: RegisterInput) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await register(values);

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.success) {
        setSuccess(result.success);

        router.push(
          `/verify-email?email=${encodeURIComponent(
            values.email
          )}`
        );
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        disabled={isPending}
        error={
          form.formState.errors.name?.message
        }
        {...form.register("name")}
      />

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
        placeholder="Create a password"
        disabled={isPending}
        error={
          form.formState.errors.password
            ?.message
        }
        {...form.register("password")}
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        disabled={isPending}
        error={
          form.formState.errors
            .confirmPassword?.message
        }
        {...form.register(
          "confirmPassword"
        )}
      />

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
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}