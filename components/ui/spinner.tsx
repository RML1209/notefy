"use client";

import * as React from "react";

import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const spinnerSizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const Spinner = React.forwardRef<
  HTMLDivElement,
  SpinnerProps
>(
  (
    {
      className,
      size = "md",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label="Loading"
        className={cn(
          "inline-flex items-center justify-center",
          className
        )}
        {...props}
      >
        <LoaderCircle
          className={cn(
            "animate-spin text-[#6A89A7]",
            spinnerSizes[size]
          )}
        />

        <span className="sr-only">
          Loading...
        </span>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner };