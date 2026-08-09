import Link from "next/link";

import { ArrowRight, CalendarDays, NotebookPen } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#6A89A7]/10 via-transparent to-transparent" />

      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col-reverse items-center gap-16 px-6 py-20 lg:flex-row lg:px-8">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-flex items-center rounded-full border border-[#6A89A7]/30 bg-[#6A89A7]/10 px-4 py-1 text-sm font-medium text-[#6A89A7]">
            Smarter note taking starts here
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900 dark:text-white md:text-6xl">
            Organize your
            <span className="block text-[#6A89A7]">
              ideas, notes,
            </span>
            and reminders.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Notefy helps you capture thoughts, organize notes,
            schedule reminders, and stay productive from anywhere
            with a clean and modern workspace.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link href="/register">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
              >
                Sign In
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start">
            <div className="flex items-center gap-3">
              <NotebookPen className="h-6 w-6 text-[#6A89A7]" />

              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Smart Notes
                </p>

                <p className="text-sm text-slate-500">
                  Organize everything
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="h-6 w-6 text-[#6A89A7]" />

              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Calendar
                </p>

                <p className="text-sm text-slate-500">
                  Never miss reminders
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview */}
        <div className="flex flex-1 justify-center">
          <div className="relative w-full max-w-xl">
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-[#6A89A7]/20 blur-3xl" />

            {/* Mock Dashboard */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#111A1F]">
              {/* Window Bar */}
              <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              {/* Dashboard Preview */}
              <div className="space-y-6 p-6">
                <div className="h-10 w-2/3 rounded-lg bg-[#6A89A7]/20" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 rounded-xl bg-[#6A89A7]/15" />
                  <div className="h-24 rounded-xl bg-[#6A89A7]/10" />
                </div>

                <div className="space-y-3">
                  <div className="h-5 w-full rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-5 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-5 w-4/6 rounded bg-slate-200 dark:bg-slate-700" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="h-20 rounded-xl bg-[#6A89A7]/10" />
                  <div className="h-20 rounded-xl bg-[#6A89A7]/15" />
                  <div className="h-20 rounded-xl bg-[#6A89A7]/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}