import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowUpRight,
  BellRing,
  CheckCircle2,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NotificationSettings } from "@/components/settings/notification-settings";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      reminderNotifications: true,
      emailNotifications: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-6 space-y-3 pb-10 sm:space-y-6">
      {/* Header */}
      <header className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111A1F] sm:rounded-3xl sm:p-7 lg:p-8">
        <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-[#6A89A7]/10 blur-3xl sm:h-64 sm:w-64" />

        <div className="relative flex items-start gap-4">
          <div className="min-w-0 flex-1 ">
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Settings
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
              Make Notefy work better for you. Manage notifications and your
              account preferences in one place.
            </p>
          </div>
        </div>

        <div className="relative mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800 sm:mt-6 sm:pt-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300 sm:text-sm">
            <CheckCircle2 className="h-4 w-4" />
            Preferences saved to your account
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300 sm:text-sm">
            <ShieldCheck className="h-4 w-4" />
            Account settings
          </span>
        </div>
      </header>

      {/* Responsive content grid */}
      <div className="flex flex-col gap-6">
        {/* Main column */}
        <main className="min-w-0 space-y-3 sm:space-y-6">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6A89A7]/10 text-[#6A89A7]">
                <BellRing className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
                  Notifications
                </h2>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  Choose which emails you want to receive from Notefy. Your
                  preferences are saved automatically.{" "}
                </p>
              </div>
            </div>

            <NotificationSettings
              initialReminderNotifications={user.reminderNotifications}
              initialEmailNotifications={user.emailNotifications}
            />
          </section>

          {/* Profile card */}
          <section className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-[#6A89A7]/50 dark:border-slate-800 dark:bg-[#111A1F] dark:hover:border-[#6A89A7]/50 sm:rounded-3xl sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300">
                <UserRound className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Profile management
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Update your name and profile picture. Your email address
                  remains separate from your editable profile details.
                </p>

                <Link
                  href="/profile"
                  className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#6A89A7] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#587895] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A89A7] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111A1F] sm:w-auto"
                >
                  Manage profile
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Supporting sidebar */}
      </div>
    </div>
  );
}
