"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import {
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { signOut } from "next-auth/react";

interface UserDropdownProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function UserDropdown({
  user,
}: UserDropdownProps) {
  const [open, setOpen] = useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  async function handleLogout() {
    await signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* Trigger */}
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="flex items-center gap-3  bg-white px-3 py-2 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-[#111A1F] dark:hover:bg-slate-800"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6A89A7] font-semibold text-white">
          {user.name
            ?.charAt(0)
            .toUpperCase() ?? "U"}
        </div>

        <div className="hidden text-left lg:block">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {user.name ?? "User"}
          </p>

          <p className="max-w-[180px] truncate text-xs text-slate-500 dark:text-slate-400">
            {user.email}
          </p>
        </div>

        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            open
              ? "rotate-180"
              : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-[#111A1F]">
          {/* User Info */}
          <div className="border-b border-slate-200 p-4 dark:border-slate-700">
            <p className="font-semibold text-slate-900 dark:text-white">
              {user.name ?? "User"}
            </p>

            <p className="truncate text-sm text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>

          {/* Menu */}
          <div className="p-2">
            <Link
              href="/profile"
              onClick={() =>
                setOpen(false)
              }
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <User className="h-5 w-5" />

              Profile
            </Link>

            <Link
              href="/settings"
              onClick={() =>
                setOpen(false)
              }
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Settings className="h-5 w-5" />

              Settings
            </Link>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <LogOut className="h-5 w-5" />

              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}