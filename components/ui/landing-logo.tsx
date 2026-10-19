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
      <Image
        src="https://files.catbox.moe/txzbgn.png"
        alt="Notefy Logo"
        width={size}
        height={size}
        priority
        unoptimized

    
        className="rounded-xl ml-auto mr-auto  object-contain "
      />

    
  );
}