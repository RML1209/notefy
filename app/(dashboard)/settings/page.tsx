import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6A89A7]/10 text-[#6A89A7]">
            <Settings className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage your Notefy preferences and account settings.
            </p>
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111A1F]">
        <h3 className="font-semibold text-slate-900 dark:text-white">
          Settings
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Your account preferences will appear here.
        </p>
      </section>
    </div>
  );
}