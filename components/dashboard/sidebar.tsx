"use client";

import Image from "next/image";
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

import { signOut } from "next-auth/react";

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

  // --------------------------------------------------
  // User display values
  // --------------------------------------------------

  const displayName =
    user.name?.trim() || "User";

  const avatarLetter =
    displayName.charAt(0).toUpperCase();

  const profileImage =
    user.image?.trim() || null;

    
      // Logout.
      async function handleLogout() {
        await signOut({
          callbackUrl: "/login",
        });
      }
    

  return (
    <div className="flex h-full flex-col ">
      {/* ==================================================
          LOGO
          ================================================== */}

      <div
        className="
      p-5
          ml-auto mr-auto
        "
      >
        <Logo />
      </div>

      {/* ==================================================
          USER PROFILE
          ================================================== */}

      <div
        className="
          border-b
          border-slate-200
          px-6
          py-5
          dark:border-slate-800
        "
      >
        <div className="flex items-center gap-3">
          {/* Profile Avatar */}

          {profileImage ? (
            <Image
              src={profileImage}
              alt={`${displayName}'s profile picture`}
              width={44}
              height={44}
              className="
                h-11
                w-11
                shrink-0
                rounded-full
                border
                border-slate-200
                object-cover
                shadow-sm
                dark:border-slate-700
              "
            />
          ) : (
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#6A89A7]
                text-lg
                font-semibold
                text-white
                shadow-sm
              "
            >
              {avatarLetter}
            </div>
          )}

          {/* User Information */}

          <div className="min-w-0 flex-1">
            <p
              className="
                truncate
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {displayName}
            </p>

            <p
              className="
                truncate
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              {user.email ?? ""}
            </p>
          </div>
        </div>
      </div>

      {/* ==================================================
          NAVIGATION
          ================================================== */}

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                `
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                `,
                active
                  ? `
                      bg-[#6A89A7]
                      text-white
                      shadow-md
                    `
                  : `
                      text-slate-700
                      hover:bg-slate-100
                      dark:text-slate-300
                      dark:hover:bg-slate-800
                    `,
              )}
            >
              <Icon className="h-5 w-5" />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* ==================================================
          LOGOUT
          ================================================== */}

      <div
        className="
          border-t
          border-slate-200
          p-4
          dark:border-slate-800
        "
      >
        <Button
          type="button"
          variant="outline"
          onClick={handleLogout}
          className="
            w-full
            justify-start
            border-slate-200
            text-black
            hover:bg-red-400
            dark:border-slate-700
            dark:text-slate-300
            dark:hover:bg-red-500
          "
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}