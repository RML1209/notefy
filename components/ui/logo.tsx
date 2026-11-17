"use client";

import Image from "next/image";

interface LogoProps {
  href?: string;

  showText?: boolean;

  title?: string;

  subtitle?: string;

  size?: number;

  className?: string;
}

export function Logo({
  size = 100,
}: LogoProps) {
  return (
    <div className="flex justify-center">
      <Image
        src="https://cdn.corenexis.com/f/DtFfe65W.png"
        alt="Notefy logo"
        width={size}
        height={size}
        priority
        unoptimized
        className="object-contain"
      />
    </div>
  );
}