import { AuthCard } from "@/components/auth/auth-card";

import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to your Notefy account to continue."
      footerText="Don't have an account?"
      footerLinkText="Create Account"
      footerHref="/register"
    >
      <LoginForm />
    </AuthCard>
  );
}