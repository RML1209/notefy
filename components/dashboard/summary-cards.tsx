"use client";

import {
  Archive,
  Bell,
  FileText,
  Pin,
} from "lucide-react";

interface DashboardStats {
  totalNotes: number;
  pinnedNotes: number;
  archivedNotes: number;
  todayReminders: number;
}

interface SummaryCardsProps {
  stats: DashboardStats;
}

export function SummaryCards({
  stats,
}: SummaryCardsProps) {
  const cards = [
    {
      title: "Total Notes",
      value: stats.totalNotes,
      icon: FileText,
    },
    {
      title: "Pinned Notes",
      value: stats.pinnedNotes,
      icon: Pin,
    },
    {
      title: "Archived",
      value: stats.archivedNotes,
      icon: Archive,
    },
    {
      title: "Today's Reminders",
      value: stats.todayReminders,
      icon: Bell,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              transition-colors
              dark:border-slate-800
              dark:bg-[#111A1F]
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="
                    text-sm
                    font-medium
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {card.title}
                </p>

                <p
                  className="
                    mt-2
                    text-3xl
                    font-bold
                    text-slate-900
                    dark:text-white
                  "
                >
                  {card.value}
                </p>
              </div>

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#6A89A7]/10
                  dark:bg-[#6A89A7]/15
                "
              >
                <Icon className="h-5 w-5 text-[#6A89A7]" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}