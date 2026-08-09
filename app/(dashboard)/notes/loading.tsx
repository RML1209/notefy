import { Skeleton } from "@/components/ui/skeleton";

export default function NotesLoading() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111A1F]">
        <Skeleton className="h-8 w-64" />

        <Skeleton className="mt-3 h-4 w-96" />

        <Skeleton className="mt-2 h-4 w-40" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-10 w-full md:w-80" />

        <div className="flex gap-3">
          <Skeleton className="h-10 w-28" />

          <Skeleton className="h-10 w-36" />
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#111A1F]"
          >
            <Skeleton className="h-6 w-3/4" />

            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
            <Skeleton className="mt-2 h-4 w-2/3" />

            <div className="mt-6 flex items-center justify-between">
              <Skeleton className="h-4 w-24" />

              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}