"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { Bell } from "lucide-react";

import { ThemeToggle } from "@/components/ui/theme-toggle";
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
        <h1
          className="
            text-xl
            font-bold
            text-slate-900
            transition-colors
            dark:text-white
          "
        >
          {title}
        </h1>

        <p
          className="
            hidden
            text-sm
            text-slate-600
            transition-colors
            md:block
            dark:text-slate-400
          "
        >
          Welcome back, {user.name ?? "User"}.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button
          type="button"
          className="
            relative
            rounded-xl
            p-2
            text-slate-700
            transition-colors
            hover:bg-black/10
            dark:text-slate-200
            dark:hover:bg-white/10
          "
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />

          {/* Notification indicator */}
          <span
            className="
              absolute
              right-1
              top-1
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />
        </button>

        {/* User Menu */}
        <UserDropdown user={user} />
      </div>
    </div>
  );
}