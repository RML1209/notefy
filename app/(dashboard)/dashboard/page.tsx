import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { RecentNotes } from "@/components/dashboard/recent-notes";
import { UpcomingReminders } from "@/components/dashboard/upcoming-reminders";

import { getDashboardStats } from "@/actions/dashboard/get-dashboard-stats";
import { getRecentNotes } from "@/actions/dashboard/get-recent-notes";
import { getUpcomingReminders } from "@/actions/dashboard/get-upcoming-reminders";

export default async function DashboardPage() {
  const [statsResult, recentNotesResult, remindersResult] =
    await Promise.all([
      getDashboardStats(),
      getRecentNotes(),
      getUpcomingReminders(),
    ]);

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <SummaryCards
        stats={statsResult.stats ?? {
          totalNotes: 0,
          pinnedNotes: 0,
          archivedNotes: 0,
          todayReminders: 0,
        }}
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentNotes
            notes={recentNotesResult.notes ?? []}
          />
        </div>

        <div>
          <UpcomingReminders
            reminders={remindersResult.reminders ?? []}
          />
        </div>
      </div>
    </div>
  );
}