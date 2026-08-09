"use client";

interface ReminderBadgeProps {
  count?: number;
}

export function ReminderBadge({
  count = 1,
}: ReminderBadgeProps) {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
      {count === 1 ? (
        <div
          className="h-2 w-2 rounded-full bg-[#6A89A7]"
          title="1 reminder"
        />
      ) : (
        <div
          className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#6A89A7] px-1 text-[10px] font-semibold text-white"
          title={`${count} reminders`}
        >
          {count}
        </div>
      )}
    </div>
  );
}