"use client";

import { useMemo } from "react";

import { usePathname } from "next/navigation";

import {
  Bell,
  Moon,
  Search,
  Sun,
} from "lucide-react";

import { UserDropdown } from "./user-dropdown";

interface TopNavbarProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function TopNavbar({
  user,
}: TopNavbarProps) {
  const pathname = usePathname();

  const title = useMemo(() => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";

      case "/notes":
        return "My Notes";

      case "/calendar":
        return "Calendar";

      case "/archive":
        return "Archive";

      case "/profile":
        return "Profile";

      case "/settings":
        return "Settings";

      default:
        return "Notefy";
    }
  }, [pathname]);

  return (
    <div className="flex w-full items-center justify-between gap-4">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h1>

        <p className="hidden text-sm text-slate-500 md:block dark:text-slate-400">
          Welcome back, {user.name ?? "User"}.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search notes..."
            className="h-10 w-64 rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[#6A89A7] dark:border-slate-700 dark:bg-[#111A1F] dark:text-white"
          />
        </div>

        {/* Theme Toggle */}
        <button
          className="rounded-xl border border-slate-300 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 dark:hidden" />

          <Moon className="hidden h-5 w-5 dark:block" />
        </button>

        {/* Notifications */}
        <button
          className="relative rounded-xl border border-slate-300 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User Menu */}
        <UserDropdown user={user} />
      </div>
    </div>
  );
}