import { redirect } from "next/navigation";

import type { ReactNode } from "react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

  const reminders = await prisma.note.findMany({
    where: {
      userId: session.user.id,
      remindAt: {
        not: null,
      },
    },
    orderBy: {
      remindAt: "asc",
    },
    select: {
      id: true,
      title: true,
      content: true,
      remindAt: true,
      isReminderSent: true,
      isPinned: true,
      isArchived: true,
    },
  });

  return (
    <DashboardLayout
      user={session.user}
      reminders={reminders}
    >
      {children}
    </DashboardLayout>
  );
}