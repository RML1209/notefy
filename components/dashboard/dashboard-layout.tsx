"use client";

import type { ReactNode } from "react";

import { MobileSidebar } from "./mobile-sidebar";
import { Sidebar } from "./sidebar";
import { TopNavbar } from "./top-navbar";

interface DashboardLayoutProps {
  children: ReactNode;

  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function DashboardLayout({
  children,
  user,
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
      {/* Desktop Sidebar */}
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

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Navigation */}
        <header
          className="
            sticky
            top-0
            z-30
            border-b
            border-slate-200
            backdrop-blur-md
            transition-colors
            bg-background
            dark:border-slate-800
          "
        >
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <MobileSidebar user={user} />

            <TopNavbar user={user} />
          </div>
        </header>

        {/* Page Content */}
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