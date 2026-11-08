import { Resend } from "resend";
import "dotenv/config";
import { getAppUrl } from "@/lib/config/app-url";

const resend = new Resend(process.env.RESENT_API_KEY);

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string,
) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html:  `<p>Your 2FA code: "${token}".</p>`
    })
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `${getAppUrl()}/auth/new-password?token=${token}`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html:  `<p> Click <a href="${resetLink}">here</a> to reset password.</p>`
    })
}

export const sendVerificaitonEmail = async (
    email: string,
    token: string
) => {
    const confirmLink =
        `${getAppUrl()}/auth/new-verification?token=${token}`;

    try {
        const result = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Confirm your email",
            html: `
                <p>Click 
                    <a href="${confirmLink}">
                        here
                    </a> 
                    to confirm your email.
                </p>
            `,
        });

        console.log("RESEND RESULT:", result);

        if (result.error) {
            console.error("RESEND ERROR:", result.error);
            return { error: result.error.message };
        }

        return { success: true };
    } catch (error) {
        console.error("SEND EMAIL ERROR:", error);
        return { error: "Failed to send email" };
    }
}; 

 
