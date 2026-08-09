"use client";

import * as React from "react";

import { Alert } from "@/components/ui/alert";

interface FormErrorProps {
  message?: string;
}

export function FormError({
  message,
}: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <Alert
      variant="error"
      title="Something went wrong"
    >
      {message}
    </Alert>
  );
}