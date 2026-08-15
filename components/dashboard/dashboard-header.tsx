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

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
  <section
  className="
    flex
    flex-col
    gap-6
    rounded-2xl
    border
    border-blue-100
    dark:border-slate-600
    border-border
    bg-surface
    p-6
    text-foreground
    shadow-sm
    transition-colors
    duration-200
    md:flex-row
    md:items-center
    md:justify-between
  "
>
      {/* Header content */}
      <div className="min-w-0">
      <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {title ?? `${greeting} 👋`}
        </h2>

        {description && (
      <p className="mt-2 text-muted">
            {description}
          </p>
        )}

       <p className="mt-1 text-sm text-muted">
          {today}
        </p>
      </div>

      {/* New Note button */}
      {showNewNoteButton && (
        <Link
          href="/notes/new"
          className="w-full md:w-auto"
        >
          <Button
            size="lg"
            className="
              w-full
              gap-2
              bg-[#6A89A7]
              text-white
              shadow-sm
              transition-all
              hover:bg-[#587690]
              hover:shadow-md

              md:w-auto
            "
          >
            <Plus className="h-5 w-5" />
            New Note
          </Button>
        </Link>
      )}
    </section>
  );
}