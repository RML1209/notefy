"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

import { FaGoogle, FaGithub, FaMicrosoft } from "react-icons/fa";

import { Button } from "@/components/ui/button";

import { Spinner } from "@/components/ui/spinner";

type Provider = "google" | "github" | "microsoft";

interface SocialLoginProps {
  providers?: Provider[];
}

const providerIcons = {
  google: FaGoogle,
  github: FaGithub,
  microsoft: FaMicrosoft,
};

const providerLabels = {
  google: "Google",
  github: "GitHub",
  microsoft: "Microsoft",
};

export function SocialLogin({
  providers = ["google"],
}: SocialLoginProps) {
  const [loading, setLoading] =
    useState<Provider | null>(null);

  async function handleSignIn(
    provider: Provider
  ) {
    try {
      setLoading(provider);

      await signIn(provider, {
        callbackUrl: "/dashboard",
      });
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="grid gap-3">
      {providers.map((provider) => {
        const Icon = providerIcons[provider];

        return (
          <Button
            key={provider}
            type="button"
            variant="outline"
            disabled={loading !== null}
            onClick={() =>
              handleSignIn(provider)
            }
            className="h-12 justify-center gap-3"
          >
            {loading === provider ? (
              <Spinner size="sm" />
            ) : (
              <Icon className="h-5 w-5" />
            )}

            Continue with{" "}
            {providerLabels[provider]}
          </Button>
        );
      })}
    </div>
  );
}