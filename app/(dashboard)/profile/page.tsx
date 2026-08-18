import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getProfile } from "@/actions/user/get-profile";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProfileForm } from "@/components/profile/profile-form";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const result = await getProfile();

  if (!result.success || !result.user) {
    return (
      <div className="space-y-8">
        <DashboardHeader
          title="Profile"
          description="Manage your Notefy profile information."
          showNewNoteButton={false}
        />

        <div
          className="
            rounded-2xl
            border
            border-red-200
            bg-red-50
            p-6
            text-sm
            text-red-700
            dark:border-red-900/50
            dark:bg-red-950/20
            dark:text-red-400
          "
        >
          {result.error ?? "Unable to load your profile."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Profile"
        description="Manage your Notefy profile information."
        showNewNoteButton={false}
      />

      <ProfileForm user={result.user} />
    </div>
  );
}