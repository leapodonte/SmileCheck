
import { randomBytes } from "crypto";
import sendEmail from "./sendEmail.js";

export const generateEmailVerification = async (user) => {
  const token = randomBytes(32).toString("hex");

  user.emailVerificationToken = token;
  user.emailVerificationTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour
  await user.save();

 const baseUrl = process.env.BACKEND_BASE_URL;
  const link = `${baseUrl}/api/v1/auth/verify/email?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="color: #333;">Welcome to Our App 🎉</h2>
        <p style="font-size: 16px; color: #555;">
          Please verify your email address by clicking the button below:
        </p>
        <a href="${link}" target="_blank" style="display: inline-block; padding: 12px 20px; background-color: #4CAF50; color: white; border-radius: 5px; text-decoration: none; font-weight: bold;">
          Verify Email
        </a>
        <p style="font-size: 14px; color: #777; margin-top: 20px;">
          If you didn’t create this account, you can safely ignore this email.
        </p>
      </div>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject: "Verify your Email",
    text: `Click the link to verify your email: ${link}`,
    html,
  });
};
