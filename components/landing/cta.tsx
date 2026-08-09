import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            bg-[#6A89A7]
            px-8
            py-20
            text-center
            shadow-2xl
            lg:px-20
          "
        >
          {/* Decorative Background */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

          {/* Content */}
          <div className="relative mx-auto max-w-3xl">
            <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white">
              Get Started Today
            </span>

            <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
              Start organizing your life with Notefy.
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/90">
              Capture ideas, organize notes, manage reminders,
              and stay productive with one beautiful workspace.
              Create your free account and experience a smarter
              way to manage your daily life.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button
                  size="lg"
                  className="
                    bg-white
                    text-[#0B1215]
                    hover:bg-slate-100
                  "
                >
                  Create Free Account

                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="
                    border-white
                    bg-transparent
                    text-white
                    hover:bg-white
                    hover:text-[#0B1215]
                  "
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Small Text */}
            <p className="mt-8 text-sm text-white/80">
              No credit card required • Secure authentication •
              Free to get started
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}