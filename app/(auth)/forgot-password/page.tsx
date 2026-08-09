import { AuthCard } from "@/components/auth/auth-card";

import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Forgot Password"
      description="Enter your email address and we'll send you a password reset code."
      footerText="Remember your password?"
      footerLinkText="Back to Sign In"
      footerHref="/login"
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}