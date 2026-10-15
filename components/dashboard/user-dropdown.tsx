"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

import { ChevronDown, LogOut, Settings, User } from "lucide-react";

interface UserDropdownProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

type AvatarProps = {
  displayName: string;
  profileImage: string | null;
  size?: "small" | "medium" | "large";
};

// Avatar is now declared outside UserDropdown.
function Avatar({ displayName, profileImage, size = "medium" }: AvatarProps) {
  const sizeClasses = {
    small: "h-8 w-8",
    medium: "h-10 w-10",
    large: "h-12 w-12",
  };

  const imageSize = {
    small: 32,
    medium: 40,
    large: 48,
  };

  const avatarLetter = displayName.charAt(0).toUpperCase();

  if (profileImage) {
    return (
      <Image
        src={profileImage}
        alt={`${displayName}'s profile picture`}
        width={imageSize[size]}
        height={imageSize[size]}
        className={`
          ${sizeClasses[size]}
          shrink-0
          rounded-full
          border
          border-slate-200
          object-cover
          dark:border-slate-700
        `}
      />
    );
  }

  return (
    <div
      className={`
        ${sizeClasses[size]}
        flex
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-[#6A89A7]
        font-semibold
        text-white
      `}
      aria-label={`${displayName}'s avatar`}
    >
      {avatarLetter}
    </div>
  );
}

export function UserDropdown({ user }: UserDropdownProps) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout.
  async function handleLogout() {
    await signOut({
      callbackUrl: "/login",
    });
  }

  // User display values.
  const displayName = user.name?.trim() || "User";
  const profileImage = user.image?.trim() || null;

  return (
    <div ref={dropdownRef} className="relative">
      {/* Dropdown trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="
          flex
          items-center
          gap-3
          rounded-xl
          bg-white
          px-3
          py-2
          transition
          hover:bg-slate-100
          dark:bg-[#111A1F]
          dark:hover:bg-slate-800
        "
      >
        <Avatar
          displayName={displayName}
          profileImage={profileImage}
          size="medium"
        />

        {/* User information */}
        <div className="hidden text-left lg:block">
          <p
            className="
              max-w-45
              truncate
              text-sm
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            {displayName}
          </p>

          <p
            className="
              max-w-45
              truncate
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            {user.email ?? ""}
          </p>
        </div>

        {/* Arrow */}
        <ChevronDown
          className={`
            h-4
            w-4
            text-slate-500
            transition-transform
            dark:text-slate-400
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          className="
            absolute
            right-0
            z-50
            mt-3
            w-72
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-xl
            dark:border-slate-700
            dark:bg-[#111A1F]
          "
          role="menu"
        >
          {/* User information */}
          <div
            className="
              border-b
              border-slate-200
              p-4
              dark:border-slate-700
            "
          >
            <div className="flex items-center gap-3">
              <Avatar
                displayName={displayName}
                profileImage={profileImage}
                size="large"
              />

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

          {/* Menu items */}
          <div className="p-2">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              role="menuitem"
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-sm
                text-slate-700
                transition
                hover:bg-slate-100
                dark:text-slate-200
                dark:hover:bg-slate-800
              "
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>

            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              role="menuitem"
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-sm
                text-slate-700
                transition
                hover:bg-slate-100
                dark:text-slate-200
                dark:hover:bg-slate-800
              "
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              role="menuitem"
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-left
                text-sm
                text-red-600
                transition
                hover:bg-red-50
                dark:hover:bg-red-950/30
              "
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
