import {
  CalendarClock,
  CheckCircle2,
  Cloud,
  ShieldCheck,
} from "lucide-react";

const reasons = [
  {
    icon: CheckCircle2,
    title: "Simple & Focused",
    description:
      "A clean workspace designed to help you focus on your ideas without unnecessary distractions.",
  },
  {
    icon: CalendarClock,
    title: "Stay Organized",
    description:
      "Manage notes, reminders, and your calendar in one place to keep your work and personal life organized.",
  },
  {
    icon: Cloud,
    title: "Access Anywhere",
    description:
      "Your notes stay synchronized with your account so you can continue your work from any device.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Security",
    description:
      "Your account is protected using email verification, encrypted passwords, secure sessions, and modern authentication.",
  },
];

export function WhyNotefy() {
  return (
    <section
      id="about"
      className="py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="rounded-full bg-[#6A89A7]/10 px-4 py-1 text-sm font-semibold text-[#6A89A7]">
              Why Notefy?
            </span>

            <h2 className="mt-6 text-4xl font-bold text-slate-900 dark:text-white">
              More than just a
              <span className="block text-[#6A89A7]">
                note-taking app.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Notefy is designed for students,
              professionals, creators, and anyone who
              wants a smarter way to organize ideas,
              reminders, and daily tasks.
            </p>

            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
              Instead of switching between multiple
              applications, Notefy brings note
              management, reminders, calendars, and
              secure cloud synchronization together in
              one modern workspace.
            </p>
          </div>

          {/* Right Cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <div
                  key={reason.title}
                  className="
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-7
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-[#6A89A7]
                    hover:shadow-xl
                    dark:border-slate-800
                    dark:bg-[#111A1F]
                  "
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6A89A7]/10">
                    <Icon className="h-7 w-7 text-[#6A89A7]" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                    {reason.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}