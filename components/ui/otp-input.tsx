"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface OTPInputProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  error?: string;
}

export function OTPInput({
  label,
  value,
  onChange,
  length = 6,
  disabled = false,
  error,
}: OTPInputProps) {
  const inputsRef = React.useRef<
    Array<HTMLInputElement | null>
  >([]);

  const safeValue = value ?? "";
  const values = Array.from(
    { length },
    (_, index) => safeValue[index] ?? ""
  );

  function updateValue(
    index: number,
    digit: string
  ) {
    const otp = [...values];

    otp[index] = digit;

    onChange(otp.join(""));
  }

  function handleChange(
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const digit = e.target.value
      .replace(/\D/g, "")
      .slice(0, 1);

    updateValue(index, digit);

    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (
      e.key === "Backspace" &&
      !values[index] &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }

    if (
      e.key === "ArrowLeft" &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }

    if (
      e.key === "ArrowRight" &&
      index < length - 1
    ) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handlePaste(
    e: React.ClipboardEvent<HTMLInputElement>
  ) {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasted) return;

    onChange(pasted);

    const lastIndex = Math.min(
      pasted.length,
      length
    );

    inputsRef.current[lastIndex - 1]?.focus();
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <div className="flex justify-center gap-3">
        {values.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digit}
            disabled={disabled}
            onPaste={handlePaste}
            onChange={(e) =>
              handleChange(index, e)
            }
            onKeyDown={(e) =>
              handleKeyDown(index, e)
            }
            className={cn(
              "h-14 w-14 rounded-xl border bg-white dark:bg-[#111A1F]",
              "text-center text-xl font-semibold",
              "text-slate-900 dark:text-white",
              "transition-all duration-200 outline-none",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-slate-300 dark:border-slate-700 focus:border-[#6A89A7] focus:ring-2 focus:ring-[#6A89A7]/20",
              disabled &&
                "cursor-not-allowed opacity-50"
            )}
          />
        ))}
      </div>

      {error && (
        <p className="text-sm text-center text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}