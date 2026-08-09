import { AuthCard } from "@/components/auth/auth-card";

import { VerifyEmailForm } from "@/components/forms/verify-email-form";

export default function VerifyEmailPage() {
  return (
    <AuthCard
      title="Verify Your Email"
      description="Enter the 6-digit verification code we sent to your email address."
      footerText="Didn't receive the code?"
      footerLinkText="Back to Sign In"
      footerHref="/login"
    >
      <VerifyEmailForm />
    </AuthCard>
  );
}