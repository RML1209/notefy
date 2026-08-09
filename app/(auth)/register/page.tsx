import { AuthCard } from "@/components/auth/auth-card";

import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create Account"
      description="Create your Notefy account to get started."
      footerText="Already have an account?"
      footerLinkText="Sign In"
      footerHref="/login"
    >
      <RegisterForm />
    </AuthCard>
  );
}