import {
  CalendarDays,
  Clock3,
  NotebookPen,
  Pin,
} from "lucide-react";

export function Screenshots() {
  return (
    <section
      id="preview"
      className="bg-slate-50 py-24 dark:bg-[#0F171B]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-[#6A89A7]/10 px-4 py-1 text-sm font-semibold text-[#6A89A7]">
            App Preview
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 dark:text-white">
            Designed for productivity
          </h2>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
            A clean, distraction-free workspace that helps
            you manage notes, reminders, and your schedule
            from one beautiful dashboard.
          </p>
        </div>

        {/* Preview Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* Dashboard */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-[#111A1F]">
            <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div className="h-8 w-1/2 rounded-lg bg-[#6A89A7]/20" />

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#6A89A7]/10 p-4">
                  <NotebookPen className="mb-3 h-6 w-6 text-[#6A89A7]" />

                  <div className="h-3 w-14 rounded bg-slate-200 dark:bg-slate-700" />

                  <div className="mt-3 h-8 w-10 rounded bg-slate-300 dark:bg-slate-600" />
                </div>

                <div className="rounded-xl bg-[#6A89A7]/10 p-4">
                  <CalendarDays className="mb-3 h-6 w-6 text-[#6A89A7]" />

                  <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-700" />

                  <div className="mt-3 h-8 w-10 rounded bg-slate-300 dark:bg-slate-600" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-4 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-4/6 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-[#111A1F]">
            <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <div className="font-semibold text-slate-900 dark:text-white">
                Notes
              </div>
            </div>

            <div className="space-y-4 p-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-32 rounded bg-slate-300 dark:bg-slate-600" />

                    <Pin className="h-4 w-4 text-[#6A89A7]" />
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="h-3 rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="h-3 w-4/5 rounded bg-slate-200 dark:bg-slate-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-[#111A1F]">
            <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                <CalendarDays className="h-5 w-5 text-[#6A89A7]" />

                Calendar
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, index) => (
                  <div
                    key={index}
                    className={`flex aspect-square items-center justify-center rounded-lg text-xs ${
                      index === 16
                        ? "bg-[#6A89A7] text-white"
                        : "bg-slate-100 dark:bg-slate-800"
                    }`}
                  >
                    {index + 1 <= 31 ? index + 1 : ""}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-[#6A89A7]/10 p-4">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-[#6A89A7]" />

                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      Project Deadline
                    </p>

                    <p className="text-sm text-slate-500">
                      Tomorrow • 09:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Preview illustrations will automatically be
            replaced with real Notefy screenshots as the
            application is developed.
          </p>
        </div>
      </div>
    </section>
  );
}