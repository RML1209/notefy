"use client";

import * as React from "react";

import { AuthBackground } from "@/components/auth/auth-background";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({
  children,
}: AuthWrapperProps) {
  return (
    <main
      className="
        min-h-screen
        grid
        bg-[#F8F8FF]
        dark:bg-[#0B1215]
        lg:grid-cols-5
      "
    >
      {/* Left Branding */}
      <section className="lg:col-span-2">
        <AuthBackground />
      </section>

      {/* Right Authentication */}
      <section
        className="
          flex
          items-center
          justify-center
          px-6
          py-12
          sm:px-8
          lg:col-span-3
          lg:px-12
        "
      >
        <div className="w-full max-w-md">
          {children}
        </div>
      </section>
    </main>
  );
}