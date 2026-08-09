"use client";

import * as React from "react";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type"
  > {
  label?: string;
  description?: string;
  error?: string;
}

const Checkbox = React.forwardRef<
  HTMLInputElement,
  CheckboxProps
>(
  (
    {
      id,
      label,
      description,
      error,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();

    const inputId = id ?? generatedId;

    return (
      <div className="space-y-1">
        <label
          htmlFor={inputId}
          className={cn(
            "flex cursor-pointer items-start gap-3",
            disabled &&
              "cursor-not-allowed opacity-60"
          )}
        >
          <div className="relative mt-0.5">
            <input
              ref={ref}
              id={inputId}
              type="checkbox"
              disabled={disabled}
              className="peer sr-only"
              {...props}
            />

            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-md border transition-all",
                error
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-600",
                "bg-white dark:bg-[#111A1F]",
                "peer-focus:ring-2 peer-focus:ring-[#6A89A7]/30",
                "peer-checked:border-[#6A89A7]",
                "peer-checked:bg-[#6A89A7]"
              )}
            >
              <Check className="h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
            </div>
          </div>

          <div className="space-y-0.5">
            {label && (
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {label}
              </p>
            )}

            {description && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
        </label>

        {error && (
          <p className="ml-8 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };