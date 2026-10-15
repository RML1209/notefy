"use client";

import { useState, useTransition } from "react";
import { Bell, Mail } from "lucide-react";
import { toast } from "sonner";

import { updateSettings } from "@/actions/user/update-settings";

interface NotificationSettingsProps {
  initialReminderNotifications: boolean;
  initialEmailNotifications: boolean;
}

export function NotificationSettings({
  initialReminderNotifications,
  initialEmailNotifications,
}: NotificationSettingsProps) {
  const [reminderNotifications, setReminderNotifications] = useState(
    initialReminderNotifications
  );

  const [emailNotifications, setEmailNotifications] = useState(
    initialEmailNotifications
  );

  const [isPending, startTransition] = useTransition();

  function handleReminderChange() {
    const newValue = !reminderNotifications;

    setReminderNotifications(newValue);

    startTransition(async () => {
      const result = await updateSettings({
        reminderNotifications: newValue,
      });

      if (!result.success) {
        setReminderNotifications(!newValue);
        toast.error(result.message);
        return;
      }

      toast.success("Reminder preference updated.");
    });
  }

  function handleEmailChange() {
    const newValue = !emailNotifications;

    setEmailNotifications(newValue);

    startTransition(async () => {
      const result = await updateSettings({
        emailNotifications: newValue,
      });

      if (!result.success) {
        setEmailNotifications(!newValue);
        toast.error(result.message);
        return;
      }

      toast.success("Email preference updated.");
    });
  }

  return (
    <div className="space-y-4">
      {/* Reminder notifications */}
      <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#6A89A7]/10 text-[#6A89A7]">
            <Bell className="h-4 w-4" />
          </div>

          <div>
            <h3 className="font-medium text-slate-900 dark:text-white">
              Reminder notifications
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Receive notifications when your notes reach their reminder time.
            </p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={reminderNotifications}
          disabled={isPending}
          onClick={handleReminderChange}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
            reminderNotifications
              ? "bg-[#6A89A7]"
              : "bg-slate-300 dark:bg-slate-700"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
              reminderNotifications
                ? "translate-x-6"
                : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Email notifications */}
      <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#6A89A7]/10 text-[#6A89A7]">
            <Mail className="h-4 w-4" />
          </div>

          <div>
            <h3 className="font-medium text-slate-900 dark:text-white">
              Email notifications
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Allow Notefy to send important notifications to your email.
            </p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={emailNotifications}
          disabled={isPending}
          onClick={handleEmailChange}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
            emailNotifications
              ? "bg-[#6A89A7]"
              : "bg-slate-300 dark:bg-slate-700"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
              emailNotifications
                ? "translate-x-6"
                : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}