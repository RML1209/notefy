"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface AuthHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export function AuthHeader({
  title,
  description,
  className,
}: AuthHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-2 text-center",
        className
      )}
    >
      <h1
        className="
          text-3xl
          font-bold
          tracking-tight
          text-[#0B1215]
          dark:text-[#F8F8FF]
        "
      >
        {title}
      </h1>

      <p
        className="
          text-sm
          leading-6
          text-slate-600
          dark:text-slate-400
        "
      >
        {description}
      </p>
    </div>
  );
}