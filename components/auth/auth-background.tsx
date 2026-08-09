"use client";

import { Logo } from "@/components/ui/logo";

export function AuthBackground() {
  return (
    <div
      className="
      h-full
        relative
        hidden
        lg:flex
        min-h-screen
        flex-col
        justify-between
        overflow-hidden
        bg-[#0B1215]
        text-[#F8F8FF]
        px-6
        sm:px-8
        lg:px-10
        xl:px-12
        py-8
        lg:py-10
        xl:py-12
      "
    >
      {/* Decorative Blur */}
      <div
        className="
          absolute
          -top-40
          -left-40
          h-72
          w-72
          lg:h-96
          lg:w-96
          rounded-full
          bg-[#6A89A7]/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          -bottom-48
          -right-48
          h-80
          w-80
          lg:h-[28rem]
          lg:w-[28rem]
          rounded-full
          bg-[#6A89A7]/10
          blur-3xl
        "
      />

      {/* Logo */}
      <div className="relative z-10">
        <Logo />
      </div>

      {/* Center Content */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          justify-center
          gap-5
          max-w-lg
          my-auto
        "
      >
        <h1
          className="
            font-bold
            leading-tight
            tracking-tight

            text-3xl
            sm:text-4xl
            lg:text-4xl
            xl:text-5xl
          "
        >
          Organize your ideas.
          <br />
          Remember everything.
        </h1>

        <p
          className="
            text-sm
            sm:text-base
            lg:text-lg
            leading-relaxed
            text-slate-300
            max-w-md
          "
        >
          Capture notes, manage tasks, secure your information, and stay
          productive with a modern workspace built for students, professionals,
          and teams.
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <p
          className="
            text-xs
            sm:text-sm
            text-slate-400
          "
        >
          © {new Date().getFullYear()} Notefy. All rights reserved.
        </p>
      </div>
    </div>
  );
}
