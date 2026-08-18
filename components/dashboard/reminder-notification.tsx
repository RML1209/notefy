"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Bell,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react";

import { format } from "date-fns";

export interface ReminderNotification {
  id: string;
  title: string;
  content: string;
  remindAt: Date | null;
  isReminderSent: boolean;
  isPinned: boolean;
  isArchived: boolean;
}

interface ReminderNotificationProps {
  reminders: ReminderNotification[];
}

export function ReminderNotification({
  reminders,
}: ReminderNotificationProps) {
  const [open, setOpen] = useState(false);

  const upcomingReminders = reminders.filter(
    (reminder) =>
      reminder.remindAt &&
      !reminder.isReminderSent &&
      !reminder.isArchived
  );

  const sentReminders = reminders.filter(
    (reminder) =>
      reminder.isReminderSent &&
      !reminder.isArchived
  );

  const notificationCount = upcomingReminders.length;

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="
          relative
          rounded-xl
          p-2
          text-slate-700
          transition-colors
          hover:bg-black/10
          dark:text-slate-200
          dark:hover:bg-white/10
        "
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell className="h-5 w-5" />

        {notificationCount > 0 && (
          <span
            className="
              absolute
              right-1
              top-1
              flex
              h-4
              min-w-4
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-[10px]
              font-bold
              text-white
            "
          >
            {notificationCount > 9
              ? "9+"
              : notificationCount}
          </span>
        )}
      </button>

      {/* Overlay */}
      {open && (
        <>
          {/* Mobile backdrop */}
          <div
            className="
              fixed
              inset-0
              z-40
              bg-black/20
              backdrop-blur-[2px]
              sm:hidden
            "
            onClick={() => setOpen(false)}
          />

          {/* Notification Panel */}
          <div
            className="
              fixed
              left-4
              right-4
              top-20
              z-50
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-2xl
              dark:border-slate-700
              dark:bg-[#111A1F]
              sm:absolute
              sm:left-auto
              sm:right-0
              sm:top-12
              sm:w-[380px]
            "
          >
            {/* Header */}
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-200
                px-5
                py-4
                dark:border-slate-700
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#6A89A7]/10
                  "
                >
                  <Bell className="h-5 w-5 text-[#6A89A7]" />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">
                    Notifications
                  </h2>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Your reminders
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="
                  rounded-lg
                  p-2
                  text-slate-500
                  hover:bg-slate-100
                  dark:text-slate-400
                  dark:hover:bg-slate-800
                "
                aria-label="Close notifications"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[500px] overflow-y-auto">
              {/* Upcoming */}
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Upcoming
                  </h3>

                  {upcomingReminders.length > 0 && (
                    <span className="rounded-full bg-[#6A89A7]/10 px-2 py-1 text-xs font-medium text-[#6A89A7]">
                      {upcomingReminders.length}
                    </span>
                  )}
                </div>

                {upcomingReminders.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-300 p-5 text-center dark:border-slate-700">
                    <CheckCircle2 className="mx-auto h-7 w-7 text-slate-400" />

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      No upcoming reminders.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {upcomingReminders.map((reminder) => (
                      <Link
                        key={reminder.id}
                        href={`/notes/${reminder.id}/edit`}
                        onClick={() => setOpen(false)}
                        className="
                          block
                          rounded-xl
                          border
                          border-slate-200
                          p-3
                          transition-colors
                          hover:border-[#6A89A7]
                          hover:bg-slate-50
                          dark:border-slate-700
                          dark:hover:bg-slate-800
                        "
                      >
                        <div className="flex items-start gap-3">
                          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#6A89A7]" />

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                              {reminder.title}
                            </p>

                            {reminder.remindAt && (
                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                {format(
                                  reminder.remindAt,
                                  "MMM d, yyyy • h:mm a"
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Sent */}
              <div className="border-t border-slate-200 p-4 dark:border-slate-700">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Already Sent
                  </h3>

                  {sentReminders.length > 0 && (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      {sentReminders.length}
                    </span>
                  )}
                </div>

                {sentReminders.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No sent reminders yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {sentReminders.slice(0, 5).map((reminder) => (
                      <Link
                        key={reminder.id}
                        href={`/notes/${reminder.id}/edit`}
                        onClick={() => setOpen(false)}
                        className="
                          block
                          rounded-xl
                          border
                          border-slate-200
                          p-3
                          transition-colors
                          hover:border-[#6A89A7]
                          hover:bg-slate-50
                          dark:border-slate-700
                          dark:hover:bg-slate-800
                        "
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                              {reminder.title}
                            </p>

                            {reminder.remindAt && (
                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                {format(
                                  reminder.remindAt,
                                  "MMM d, yyyy • h:mm a"
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div
              className="
                border-t
                border-slate-200
                p-3
                dark:border-slate-700
              "
            >
              <Link
                href="/calendar"
                onClick={() => setOpen(false)}
                className="
                  block
                  rounded-xl
                  py-2
                  text-center
                  text-sm
                  font-medium
                  text-[#6A89A7]
                  transition-colors
                  hover:bg-[#6A89A7]/10
                "
              >
                View calendar
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}