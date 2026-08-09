import { Archive } from "lucide-react";

export function ArchiveEmpty() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-[#111A1F]">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
        <Archive className="h-7 w-7 text-slate-500" />
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        No archived notes
      </h3>

      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
        Notes that you archive will appear here. You can
        restore them whenever you need them again.
      </p>
    </div>
  );
}