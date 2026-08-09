"use client";

import Link from "next/link";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  title?: string;
  description?: string;
  showNewNoteButton?: boolean;
}

export function DashboardHeader({
  title,
  description,
  showNewNoteButton = true,
}: DashboardHeaderProps) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const today = new Intl.DateTimeFormat(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  ).format(new Date());

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111A1F] md:flex-row md:items-center md:justify-between">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {title ?? `${greeting} 👋`}
        </h2>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {description ??
            "Stay organized and keep your ideas flowing."}
        </p>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
          {today}
        </p>
      </div>

      {/* Action */}
      {showNewNoteButton && (
        <Link href="/notes/new">
          <Button
            size="lg"
            className="gap-2 bg-[#6A89A7] hover:bg-[#587690]"
          >
            <Plus className="h-5 w-5" />
            New Note
          </Button>
        </Link>
      )}
    </section>
  );
}