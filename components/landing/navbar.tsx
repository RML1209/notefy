"use client";

import Link from "next/link";
import { useState } from "react";

import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const navigation = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "FAQ",
    href: "#faq",
  },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800/70 dark:bg-[#0B1215]/80">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
       <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#6A89A7] dark:text-slate-300 dark:hover:text-[#6A89A7]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost">
              Sign In
            </Button>
          </Link>

          <Link href="/register">
            <Button>
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setMobileMenuOpen(
              !mobileMenuOpen
            )
          }
          className="rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
        >
          {mobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-6 dark:border-slate-800 dark:bg-[#0B1215] md:hidden">
          <nav className="flex flex-col gap-5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
                className="text-sm font-medium text-slate-700 transition-colors hover:text-[#6A89A7] dark:text-slate-300"
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              >
                <Button
                  variant="ghost"
                  className="w-full"
                >
                  Sign In
                </Button>
              </Link>

              <Link
                href="/register"
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              >
                <Button className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}