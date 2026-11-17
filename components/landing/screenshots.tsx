
import Image from "next/image";

export function Screenshots() {
  return (
    <section id="preview" className="bg-slate-50 py-24 dark:bg-[#0F171B]">
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
            A clean, distraction-free workspace that helps you manage notes,
            reminders, and your schedule from one beautiful dashboard.
          </p>
        </div>

        {/* Preview Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* Dashboard */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-[#111A1F]">
            {/* Actual Notefy screenshot */}
            <Image
              src="https://files.catbox.moe/w6ce3t.png"
              alt="Notefy dashboard preview showing the real application interface, notes, and reminders"
              width={100}
              height={100}
              priority
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 95vw, 1152px"
              className="block h-auto w-full object-contain"
            />
          </div>

          {/* Notes */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-[#111A1F]">
            {/* Actual Notefy screenshot */}
            <Image
              src="https://files.catbox.moe/gax2x3.png"
              alt="Notefy dashboard preview showing the real application interface, notes, and reminders"
              width={100}
              height={100}
              priority
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 95vw, 1152px"
              className="block h-auto w-full object-contain"
            />

            {/* <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <div className="font-semibold text-slate-900 dark:text-white">
                Notes
              </div>
            </div> */}

            {/* <div className="space-y-4 p-6">
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
            </div> */}
          </div>

          {/* Calendar */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-[#111A1F]">
            <Image
              src="https://files.catbox.moe/fb2wdz.png"
              alt="Notefy dashboard preview showing the real application interface, notes, and reminders"
              width={100}
              height={100}
              priority
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 95vw, 1152px"
              className="block h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}