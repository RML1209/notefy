import { redirect } from "next/navigation";

import type { ReactNode } from "react";

import { auth } from "@/lib/auth";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function Layout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <DashboardLayout user={session.user}>
      {children}
    </DashboardLayout>
  );
}