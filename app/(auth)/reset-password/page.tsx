import { AuthCard } from "@/components/auth/auth-card";

import { ResetPasswordForm } from "@/components/forms/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Reset Password"
      description="Enter the 6-digit reset code sent to your email and choose a new password."
      footerText="Remember your password?"
      footerLinkText="Back to Sign In"
      footerHref="/login"
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}