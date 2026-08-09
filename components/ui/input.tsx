"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;

  error?: string;

  helperText?: string;

  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;

  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      required,
      id,
      ...props
    },
    ref
  ) => {
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
          {leftIcon && (
            <div className="pl-4 text-slate-500">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            className={cn(
              "h-12 w-full bg-transparent px-4 text-sm",
              "text-slate-900 dark:text-white",
              "placeholder:text-slate-400",
              "outline-none",
              leftIcon && "pl-3",
              rightIcon && "pr-3",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="pr-4 text-slate-500">
              {rightIcon}
            </div>
          )}
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

Input.displayName = "Input";

export { Input };