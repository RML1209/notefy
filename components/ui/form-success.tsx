"use client";

import * as React from "react";

import { Alert } from "@/components/ui/alert";

interface FormSuccessProps {
  message?: string;
}

export function FormSuccess({
  message,
}: FormSuccessProps) {
  if (!message) {
    return null;
  }

  return (
    <Alert
      variant="success"
      title="Success"
    >
      {message}
    </Alert>
  );
}