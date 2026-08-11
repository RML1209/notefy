import { getReminders } from "@/actions/calendar/get-reminders";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { CalendarClient } from "@/components/calendar/calendar-client";

export default async function CalendarPage() {
  const result = await getReminders();

  const reminders = result.reminders ?? [];

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Calendar"
        description="View your reminders and scheduled notes."
      />

      <CalendarClient
        reminders={reminders}
      />
    </div>
  );
}