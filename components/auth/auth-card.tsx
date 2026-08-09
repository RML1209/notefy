"use client";

import * as React from "react";

import { Card } from "@/components/ui/card";

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
    <Card
      className="
        w-full
        max-w-md
        border-slate-200
        bg-white/90
        p-8
        shadow-xl
        backdrop-blur
        dark:border-[#1E2A31]
        dark:bg-[#111A1F]/90
      "
    >
      <div className="space-y-8">
        <AuthHeader
          title={title}
          description={description}
        />

        <div className="space-y-6">
          {children}
        </div>

        <AuthFooter
          text={footerText}
          linkText={footerLinkText}
          href={footerHref}
        />
      </div>
    </Card>
  );
}