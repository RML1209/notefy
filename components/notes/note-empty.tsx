"use client";

import Link from "next/link";

import {
  FilePlus2,
  NotebookPen,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function NoteEmpty() {
  return (
    <section className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-[#111A1F]">
      {/* Icon */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#6A89A7]/10">
        <NotebookPen className="h-12 w-12 text-[#6A89A7]" />
      </div>

      {/* Title */}
      <h2 className="mt-8 text-2xl font-bold text-slate-900 dark:text-white">
        No notes yet
      </h2>

      {/* Description */}
      <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
        Your notes will appear here once you create them.
        Start capturing ideas, meeting notes, reminders,
        and everything important in one organized place.
      </p>

      {/* Action */}
      <Link
        href="/notes/new"
        className="mt-8"
      >
        <Button
          size="lg"
          className="gap-2 bg-[#6A89A7] hover:bg-[#587690]"
        >
          <FilePlus2 className="h-5 w-5" />

          Create Your First Note
        </Button>
      </Link>
    </section>
  );
}