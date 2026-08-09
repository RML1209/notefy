"use client";

import Link from "next/link";

import { Bell, Clock } from "lucide-react";

import { format } from "date-fns";

interface Reminder {
  id: string;
  title: string;
  content: string;
  remindAt: Date;
  isPinned: boolean;
}

interface UpcomingRemindersProps {
  reminders: Reminder[];
}

export function UpcomingReminders({
  reminders,
}: UpcomingRemindersProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111A1F]">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-[#6A89A7]" />

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Upcoming Reminders
          </h2>
        </div>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Your next scheduled reminders.
        </p>
      </div>

      {reminders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
          <Bell className="mx-auto h-8 w-8 text-slate-400" />

          <p className="mt-3 text-sm text-slate-500">
            No upcoming reminders.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reminders.map((reminder) => (
            <Link
              key={reminder.id}
              href={`/notes/${reminder.id}`}
              className="block rounded-xl border border-slate-200 p-4 transition hover:border-[#6A89A7] hover:shadow-sm dark:border-slate-700"
            >
              <h3 className="line-clamp-1 font-semibold text-slate-900 dark:text-white">
                {reminder.title}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-xs text-[#6A89A7]">
                <Clock className="h-4 w-4" />

                <span>
                  {format(
                    reminder.remindAt,
                    "MMM d, yyyy • h:mm a"
                  )}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Link
        href="/calendar"
        className="mt-5 block text-center text-sm font-medium text-[#6A89A7] hover:underline"
      >
        View calendar
      </Link>
    </section>
  );
}