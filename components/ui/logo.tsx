"use client";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;

  showText?: boolean;

  title?: string;

  subtitle?: string;

  size?: number;

  className?: string;
}

export function Logo({
  href = "/",
  size = 120,
  className,
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-3",
        className
      )}
    >
      <Image
        src="/notefy-logo.png"
        alt="Notefy Logo"
        width={size}
        height={size}
        priority
        unoptimized
    
        className="rounded-xl object-contain "
      />

    </Link>
  );
}