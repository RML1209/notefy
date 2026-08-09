import type { ReactNode } from "react";

import { AuthWrapper } from "@/components/auth/auth-wrapper";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <AuthWrapper>
      {children}
    </AuthWrapper>
  );
}