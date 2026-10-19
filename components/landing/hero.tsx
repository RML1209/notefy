import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  NotebookPen,
} from "lucide-react";
import { Jersey_25 } from "next/font/google";

import { Button } from "@/components/ui/button";

const jersey = Jersey_25({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-[#6A89A7]/10 via-transparent to-[#6A89A7]/5" />

      <div className="pointer-events-none absolute -right-32 top-20 -z-10 h-72 w-72 rounded-full bg-[#6A89A7]/10 blur-3xl sm:h-96 sm:w-96" />

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8">
        {/* Left Content */}
        <div className="relative z-10 text-center lg:text-left">
          {/* Eyebrow */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#6A89A7]/25 bg-[#6A89A7]/10 px-3.5 py-1.5 text-sm font-medium text-[#557796] dark:text-[#A9C4DC] lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6A89A7] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6A89A7]" />
            </span>
            Your thoughts, beautifully organized
          </div>

          <h1
            className={`${jersey.className} mt-6 text-5xl leading-[1.05] font-bold tracking-tight text-slate-900 sm:text-6xl md:text-7xl dark:text-white`}
          >
            Organize your
            <span className="block text-[#6A89A7]">ideas, notes,</span>
            and reminders.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0 dark:text-slate-300">
            Notefy helps you capture thoughts, organize notes, schedule
            reminders, and stay productive from anywhere with a clean and modern
            workspace.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl px-6 shadow-lg shadow-[#6A89A7]/20"
            >
              <Link href="/register">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-slate-300 bg-white/70 px-6 dark:border-slate-700 dark:bg-slate-900/50"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-4 lg:justify-start">
            <div className="flex items-center gap-2.5">
              <NotebookPen className="h-5 w-5 text-[#6A89A7]" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Smart Notes
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <CalendarDays className="h-5 w-5 text-[#6A89A7]" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Reminders & Calendar
              </span>
            </div>
          </div>
        </div>

        {/* Right: Real App Preview */}
        <div className="relative mx-auto w-full min-w-0 max-w-2xl lg:max-w-none">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -inset-5 rounded-4xl bg-[#6A89A7]/15 blur-2xl sm:-inset-8 sm:blur-3xl" />

          {/* Main Preview Frame */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10 sm:rounded-3xl dark:border-slate-700/80 dark:bg-[#111A1F] dark:shadow-black/30">
            {/* Browser-style Header */}
            <div className="flex h-11 items-center justify-between border-b border-slate-200/80 bg-white/95 px-3 sm:px-4 dark:border-slate-700/80 dark:bg-[#111A1F]/95">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>

              <div className="max-w-[55%] truncate rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] text-slate-500 sm:text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                notefy.online
              </div>

              <div className="w-8" />
            </div>

            {/* Light Theme Image */}
            <Image
              src="https://files.catbox.moe/bm56s3.png"
              alt="Preview of the Notefy application in light mode"
              width={1440}
              height={1000}
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="block h-auto w-full object-contain dark:hidden"
            />

            {/* Dark Theme Image */}
            <Image
              src="https://files.catbox.moe/s0jbza.png"
              alt="Preview of the Notefy application in dark mode"
              width={1440}
              height={1000}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="hidden h-auto w-full object-contain dark:block"
            />
          </div>

          {/* Floating Feature Card */}
          <div className="absolute -bottom-5 left-3 flex max-w-[calc(100%-24px)] items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-xl shadow-slate-900/10 backdrop-blur-xl sm:-bottom-6 sm:left-6 sm:p-4 dark:border-slate-700 dark:bg-[#17232B]/95 dark:shadow-black/20">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6A89A7]/15">
              <CheckCircle2 className="h-5 w-5 text-[#6A89A7]" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Stay organized
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Notes and reminders in one place
              </p>
            </div>
          </div>

          {/* Decorative Accent */}
          <div className="pointer-events-none absolute -right-3 -top-3 -z-10 h-20 w-20 rounded-2xl border border-[#6A89A7]/20 sm:-right-5 sm:-top-5 sm:h-28 sm:w-28" />
        </div>
      </div>
    </section>
  );
}
