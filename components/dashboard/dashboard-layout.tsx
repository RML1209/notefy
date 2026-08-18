"use client";

import type { ReactNode } from "react";

import { MobileSidebar } from "./mobile-sidebar";
import { Sidebar } from "./sidebar";
import { TopNavbar } from "./top-navbar";

interface Reminder {
  id: string;
  title: string;
  content: string;
  remindAt: Date | null;
  isReminderSent: boolean;
  isPinned: boolean;
  isArchived: boolean;
}

interface DashboardLayoutProps {
  children: ReactNode;

  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };

  reminders: Reminder[];
}

export function DashboardLayout({
  children,
  user,
  reminders,
}: DashboardLayoutProps) {
  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        text-slate-900
        transition-colors
        dark:bg-[#0B1215]
        dark:text-white
      "
    >
      {/* =========================================================
          DESKTOP SIDEBAR
      ========================================================= */}
      <aside
        className="
          fixed
          inset-y-0
          left-0
          z-40
          hidden
          w-72
          border-r
          border-slate-200
          bg-white
          transition-colors
          dark:border-slate-800
          dark:bg-[#111A1F]
          lg:block
        "
      >
        <Sidebar user={user} />
      </aside>

      {/* =========================================================
          MAIN AREA
      ========================================================= */}
      <div className="lg:pl-72">
        {/* =======================================================
            TOP NAVIGATION
        ======================================================= */}
        <header
          className="
            sticky
            top-0
            z-30
            border-b
            border-slate-200
            bg-white/90
            backdrop-blur-md
            transition-colors
            dark:border-slate-800
            dark:bg-[#111A1F]/90
          "
        >
          <div
            className="
              flex
              h-16
              items-center
              justify-between
              px-4
              sm:px-6
              lg:px-8
            "
          >
            {/* Mobile Menu */}
            <MobileSidebar user={user} />

            {/* Navbar */}
            <TopNavbar
              user={user}
              reminders={reminders}
            />
          </div>
        </header>

        {/* =======================================================
            PAGE CONTENT
        ======================================================= */}
        <main
          className="
            min-h-[calc(100vh-64px)]
            bg-slate-50
            px-4
            py-6
            transition-colors
            sm:px-6
            lg:px-8
            dark:bg-[#0B1215]
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}