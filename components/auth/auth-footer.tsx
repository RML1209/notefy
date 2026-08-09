"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

interface AuthFooterProps {
  text: string;
  linkText: string;
  href: string;
  className?: string;
}

export function AuthFooter({
  text,
  linkText,
  href,
  className,
}: AuthFooterProps) {
  return (
    <div
      className={cn(
        "text-center text-sm",
        className
      )}
    >
      <span className="text-slate-600 dark:text-slate-400">
        {text}{" "}
      </span>

      <Link
        href={href}
        className="
          font-semibold
          text-[#6A89A7]
          transition-colors
          hover:text-[#587592]
          dark:hover:text-[#89A9C8]
        "
      >
        {linkText}
      </Link>
    </div>
  );
}