"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/ui/theme-toggle";

import { ReminderNotification } from "./reminder-notification";
import { UserDropdown } from "./user-dropdown";

interface Reminder {
  id: string;
  title: string;
  content: string;
  remindAt: Date | null;
  isReminderSent: boolean;
  isPinned: boolean;
  isArchived: boolean;
}

interface TopNavbarProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };

  reminders: Reminder[];
}

export function TopNavbar({
  user,
  reminders,
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

        {/* Reminder Notifications */}
        <ReminderNotification reminders={reminders} />

        {/* User Menu */}
        <UserDropdown user={user} />
      </div>
    </div>
  );
}