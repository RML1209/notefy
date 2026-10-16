"use client";

import * as React from "react";
import { Logo } from "@/components/ui/logo";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthFooter } from "@/components/auth/auth-footer";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerHref: string;
}

export function AuthCard({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerHref,
}: AuthCardProps) {
  return (
    <div
      className="
        w-full
        max-w-md
        p-6
      "
    >
      <div className="space-y-8">
        {/* Website Logo */}
    <Logo/>

        {/* Authentication Title and Description */}
        <AuthHeader title={title} description={description} />

        {/* Authentication Form */}
        <div className="space-y-6">{children}</div>

        {/* Authentication Footer */}
        <AuthFooter
          text={footerText}
          linkText={footerLinkText}
          href={footerHref}
        />
      </div>
    </div>
  );
}
