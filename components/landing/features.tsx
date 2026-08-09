import {
  BellRing,
  CalendarDays,
  LockKeyhole,
  MoonStar,
  NotebookPen,
  Pin,
} from "lucide-react";

const features = [
  {
    title: "Smart Notes",
    description:
      "Create, edit, organize, archive, and pin your notes with an intuitive writing experience.",
    icon: NotebookPen,
  },
  {
    title: "Calendar Integration",
    description:
      "Manage your reminders from a monthly calendar and quickly view notes by date.",
    icon: CalendarDays,
  },
  {
    title: "Reminders",
    description:
      "Never miss important tasks with scheduled reminders and notification support.",
    icon: BellRing,
  },
  {
    title: "Pin Important Notes",
    description:
      "Keep your most important notes at the top for quick access whenever you need them.",
    icon: Pin,
  },
  {
    title: "Secure Authentication",
    description:
      "Email verification, password recovery, protected routes, and secure user sessions.",
    icon: LockKeyhole,
  },
  {
    title: "Dark & Light Mode",
    description:
      "Enjoy a beautiful interface that adapts perfectly to both light and dark themes.",
    icon: MoonStar,
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-[#6A89A7]/10 px-4 py-1 text-sm font-semibold text-[#6A89A7]">
            Features
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 dark:text-white">
            Everything you need to stay organized
          </h2>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
            Notefy combines note management, reminders,
            calendar planning, and a modern interface into
            one productivity platform.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-8
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
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#6A89A7]/10
                    transition-colors
                    group-hover:bg-[#6A89A7]
                  "
                >
                  <Icon
                    className="
                      h-7
                      w-7
                      text-[#6A89A7]
                      transition-colors
                      group-hover:text-white
                    "
                  />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}