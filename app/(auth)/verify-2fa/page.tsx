import { AuthCard } from "@/components/auth/auth-card";

import { VerifyTwoFactorForm } from "@/components/forms/verify-2fa-form";

export default function VerifyTwoFactorPage() {
  return (
    <AuthCard
      title="Two-Factor Authentication"
      description="Enter the 6-digit verification code sent to your email to complete sign in."
      footerText="Having trouble signing in?"
      footerLinkText="Back to Sign In"
      footerHref="/login"
    >
      <VerifyTwoFactorForm />
    </AuthCard>
  );
}