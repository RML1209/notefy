"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Archive,
  CalendarDays,
  Home,
  Menu,
  NotebookPen,
  Settings,
  User,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

interface MobileSidebarProps {
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

export function MobileSidebar({
  user,
}: MobileSidebarProps) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  // --------------------------------------------------
  // User display values
  // --------------------------------------------------

  const displayName =
    user.name?.trim() || "User";

  const avatarLetter =
    displayName.charAt(0).toUpperCase();

  const profileImage =
    user.image?.trim() || null;

  return (
    <>
      {/* ==================================================
          MENU BUTTON
          ================================================== */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        className="
          rounded-lg
          p-2
          transition
          hover:bg-slate-100
          dark:hover:bg-slate-800
          lg:hidden
        "
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* ==================================================
          OVERLAY
          ================================================== */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/50
            lg:hidden
          "
        />
      )}

      {/* ==================================================
          MOBILE DRAWER
          ================================================== */}

      <aside
        className={cn(
          `
            fixed
            inset-y-0
            left-0
            z-50
            w-72
            bg-white
            shadow-xl
            transition-transform
            duration-300
            dark:bg-[#111A1F]
            lg:hidden
          `,
          open
            ? "translate-x-0"
            : "-translate-x-full"
        )}
      >
        {/* ==================================================
            HEADER
            ================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            p-5
            dark:border-slate-800
          "
        >
          <Logo />

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
            className="
              rounded-lg
              p-2
              transition
              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ==================================================
            USER PROFILE
            ================================================== */}

        <div
          className="
            border-b
            border-slate-200
            px-5
            py-4
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

        <nav className="flex flex-col gap-2 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() =>
                  setOpen(false)
                }
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
                        shadow-sm
                      `
                    : `
                        text-slate-700
                        hover:bg-slate-100
                        dark:text-slate-300
                        dark:hover:bg-slate-800
                      `
                )}
              >
                <Icon className="h-5 w-5" />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}