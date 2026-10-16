
"use client";

import { useState, useTransition } from "react";
import {
  BellRing,
  Mail,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

import { updateSettings } from "@/actions/user/update-settings";

interface NotificationSettingsProps {
  initialReminderNotifications: boolean;
  initialEmailNotifications: boolean;
}

type SettingKey = "reminderNotifications" | "emailNotifications";

export function NotificationSettings({
  initialReminderNotifications,
  initialEmailNotifications,
}: NotificationSettingsProps) {
  const [reminderNotifications, setReminderNotifications] = useState(
    initialReminderNotifications,
  );

  const [emailNotifications, setEmailNotifications] = useState(
    initialEmailNotifications,
  );

  const [isPending, startTransition] = useTransition();

  function handleToggle(setting: SettingKey, nextValue: boolean) {
    if (isPending) return;

    const previousValue =
      setting === "reminderNotifications"
        ? reminderNotifications
        : emailNotifications;

    if (setting === "reminderNotifications") {
      setReminderNotifications(nextValue);
    } else {
      setEmailNotifications(nextValue);
    }

    startTransition(async () => {
      try {
        const result = await updateSettings({ [setting]: nextValue });

        if (!result.success) {
          if (setting === "reminderNotifications") {
            setReminderNotifications(previousValue);
          } else {
            setEmailNotifications(previousValue);
          }

          toast.error(result.message);
          return;
        }

        toast.success(result.message);
      } catch {
        if (setting === "reminderNotifications") {
          setReminderNotifications(previousValue);
        } else {
          setEmailNotifications(previousValue);
        }

        toast.error("Unable to save your preferences. Please try again.");
      }
    });
  }

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#111A1F] sm:rounded-3xl">
      {/* Card header */}
      <div className="border-b border-slate-100 p-4 dark:border-slate-800 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
        </div>
      </div>

      {/* Preference rows */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        <PreferenceRow
          icon={<BellRing className="h-5 w-5" />}
          title="Reminder notifications"
          description="Get an email when a note reaches its scheduled reminder time."
          checked={reminderNotifications}
          disabled={isPending}
          onChange={(value) => handleToggle("reminderNotifications", value)}
        />

        <PreferenceRow
          icon={<Mail className="h-5 w-5" />}
          title="Email notifications"
          description="Receive general Notefy emails when the relevant feature supports this preference."
          checked={emailNotifications}
          disabled={isPending}
          onChange={(value) => handleToggle("emailNotifications", value)}
        />
      </div>

      {/* Save status */}
      <div
        aria-live="polite"
        className="flex min-h-12 flex-wrap items-center gap-2 border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-[#0B1215] dark:text-slate-400 sm:px-6"
      >
        {isPending ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin text-[#6A89A7]" />
            <span>Saving your preferences...</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Your preferences are up to date.</span>
          </>
        )}
      </div>
    </section>
  );
}

interface PreferenceRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  disabled: boolean;
  onChange: (checked: boolean) => void;
}

function PreferenceRow({
  icon,
  title,
  description,
  checked,
  disabled,
  onChange,
}: PreferenceRowProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 p-4 transition-colors hover:bg-slate-50/70 dark:hover:bg-white/2 sm:gap-4 sm:p-6">
      {/* Icon */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-11 sm:w-11 ${
          checked
            ? "bg-[#6A89A7]/10 text-[#6A89A7]"
            : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400"
        }`}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-slate-900 dark:text-white sm:text-base">
            {title}
          </p>

          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium sm:text-xs ${
              checked
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400"
            }`}
          >
            {checked ? "Enabled" : "Disabled"}
          </span>
        </div>

        <p className="mt-1 max-w-lg text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm sm:leading-6">
          {description}
        </p>
      </div>

      {/* Accessible toggle */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A89A7] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-[#111A1F] ${
          checked ? "bg-[#6A89A7]" : "bg-slate-300 dark:bg-slate-700"
        }`}
      >
        <span
          className={`absolute h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}