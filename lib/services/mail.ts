import { Resend } from "resend";
import "dotenv/config";
import { getAppUrl } from "@/lib/config/app-url";

interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
}

export const sendTransactionalEmail = async ({
  to,
  subject,
  html,
}: SendEmailInput) => {
  const apiKey = process.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  const from =
    process.env.EMAIL_FROM ??
    (process.env.NODE_ENV === "development"
      ? "NAB Coffee <onboarding@resend.dev>"
      : undefined);

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  if (!from) {
    throw new Error("EMAIL_FROM is not configured");
  }

  const { data, error } = await new Resend(apiKey).emails.send({
    from,
    to,
    subject,
    html,
  });

  if (error) {
    console.error("Resend email error:", error);
    throw new Error(error.message);
  }

  return data;
};

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string,
) => {
  await sendTransactionalEmail({
    to: email,
    subject: "Your NAB Coffee verification code",
    html: `<p>Your 2FA code: <strong>${token}</strong>.</p>`,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${getAppUrl()}/auth/new-password?token=${token}`;

  await sendTransactionalEmail({
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};

export const sendVerificaitonEmail = async (
  email: string,
  token: string,
) => {
  const confirmLink = `${getAppUrl()}/auth/new-verification?token=${token}`;

  try {
    await sendTransactionalEmail({
      to: email,
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
    });

    return { success: true };
  } catch (error) {
    console.error("SEND VERIFICATION EMAIL ERROR:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
};
