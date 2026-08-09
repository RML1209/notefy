"use client";

import * as React from "react";

import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative flex w-full items-start gap-3 rounded-xl border p-4 text-sm transition-all",
  {
    variants: {
      variant: {
        success:
          "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300",

        error:
          "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300",

        warning:
          "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300",

        info:
          "border-[#6A89A7]/30 bg-[#6A89A7]/10 text-[#45627C] dark:border-[#6A89A7]/40 dark:bg-[#6A89A7]/10 dark:text-[#9BB7D3]",
      },
    },

    defaultVariants: {
      variant: "info",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: TriangleAlert,
  info: Info,
};

const Alert = React.forwardRef<
  HTMLDivElement,
  AlertProps
>(
  (
    {
      className,
      variant = "info",
      title,
      children,
      dismissible,
      onDismiss,
      ...props
    },
    ref
  ) => {
    const Icon = icons[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          alertVariants({ variant }),
          className
        )}
        {...props}
      >
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />

        <div className="flex-1 space-y-1">
          {title && (
            <h5 className="font-semibold">
              {title}
            </h5>
          )}

          {children && (
            <div className="leading-relaxed">
              {children}
            </div>
          )}
        </div>

        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-md p-1 transition hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Close alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert };