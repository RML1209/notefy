"use client";

import * as React from "react";

import { AuthBackground } from "@/components/auth/auth-background";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
        <div className="absolute right-4 top-4 lg:right-12 lg:top-8">

          <ThemeToggle  />
          
        </div>
        

        <div className="w-full max-w-md">
          {children}
        </div>
      </section>
    </main>
  );
}