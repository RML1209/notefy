"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  Archive,
  CalendarDays,
  Home,
  LogOut,
  NotebookPen,
  Settings,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Notes",
    href: "/notes",
    icon: NotebookPen,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    title: "Archive",
    href: "/archive",
    icon: Archive,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar({
  user,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <Logo />
      </div>

      {/* User */}
      <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6A89A7] text-lg font-semibold text-white">
            {user.name?.charAt(0).toUpperCase() ?? "U"}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-900 dark:text-white">
              {user.name ?? "User"}
            </p>

            <p className="truncate text-sm text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-[#6A89A7] text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              <Icon className="h-5 w-5" />

              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <Button
          variant="outline"
          className="w-full justify-start"
        >
          <LogOut className="mr-2 h-5 w-5" />

          Logout
        </Button>
      </div>
    </div>
  );
}