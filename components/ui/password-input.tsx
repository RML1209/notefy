"use client";

import * as React from "react";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";

import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      className,
      label,
      error,
      helperText,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] =
      React.useState(false);

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-slate-800 dark:text-slate-200"
          >
            {label}

            {required && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </label>
        )}

        <div
          className={cn(
            "flex items-center rounded-xl border bg-white transition-all duration-200",
            "dark:bg-[#111A1F]",
            error
              ? "border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
              : "border-slate-300 dark:border-slate-700 focus-within:border-[#6A89A7] focus-within:ring-2 focus-within:ring-[#6A89A7]/20",
            props.disabled &&
              "cursor-not-allowed opacity-60"
          )}
        >
          <div className="pl-4 text-slate-500">
            <LockKeyhole size={18} />
          </div>

          <input
            ref={ref}
            id={id}
            type={showPassword ? "text" : "password"}
            className={cn(
              "h-12 w-full bg-transparent px-3 text-sm",
              "text-slate-900 dark:text-white",
              "placeholder:text-slate-400",
              "outline-none",
              className
            )}
            {...props}
          />

          <button
            type="button"
            tabIndex={-1}
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            className="pr-4 text-slate-500 transition-colors hover:text-[#6A89A7]"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {error ? (
          <p className="text-sm text-red-500">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-sm text-slate-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };