import { Resend } from "resend";
import { render } from "@react-email/render";

import { VerificationEmail } from "@/emails/verification-email";
import { PasswordResetEmail } from "@/emails/password-reset-email";
import { TwoFactorEmail } from "@/emails/two-factor-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const APP_NAME = "Notefy";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ??
  "Notefy <onboarding@resend.dev>";

  type MailResult = {
  success: boolean;
  error?: string;
};

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<MailResult> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend Error:", error);

      return {
        success: false,
        error: "Failed to send email.",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Mail Service Error:", error);

    return {
      success: false,
      error: "Unexpected mail service error.",
    };
  }
}

export async function sendVerificationEmail(
  email: string,
  token: string
) {
  const html = await render(

     <VerificationEmail
    appName={APP_NAME}
    token={token}
  />
  );

  return sendEmail({
    to: email,
    subject: "Verify your email address",
    html,
  });
}

export async function sendPasswordResetEmail(
  email: string,
  token: string
) {
  const html = await render(
   <PasswordResetEmail
    appName={APP_NAME}
    token={token}
   />
  );

  return sendEmail({
    to: email,
    subject: "Reset your password",
    html,
  });
}

export async function sendTwoFactorEmail(
  email: string,
  token: string
) {
  const html = await render(
    <TwoFactorEmail
      appName={APP_NAME}
      token={token}
    />
  );

  return sendEmail({
    to: email,
    subject: "Your Two-Factor Authentication Code",
    html,
  });
}