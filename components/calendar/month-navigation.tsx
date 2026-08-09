"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface MonthNavigationProps {
  currentMonth: Date;

  onMonthChange: (date: Date) => void;
}

export function MonthNavigation({
  currentMonth,
  onMonthChange,
}: MonthNavigationProps) {
  function previousMonth() {
    onMonthChange(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  }

  function nextMonth() {
    onMonthChange(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  }

  function goToToday() {
    onMonthChange(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      )
    );
  }

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#111A1F]">
      <Button
        variant="outline"
        size="icon"
        onClick={previousMonth}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="text-center">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {currentMonth.toLocaleDateString(
            "en-US",
            {
              month: "long",
              year: "numeric",
            }
          )}
        </h2>

        <button
          onClick={goToToday}
          className="text-sm text-[#6A89A7] hover:underline"
        >
          Today
        </button>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={nextMonth}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}