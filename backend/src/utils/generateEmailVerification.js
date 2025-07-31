import { randomBytes } from 'crypto';
import sendEmail from './sendEmail.js';

export const generateEmailVerification = async (user) => {
  const token = randomBytes(32).toString('hex');
  user.emailVerificationToken = token;

  user.emailVerificationTokenExpiry = Date.now() + 1000 * 60 * 60;
  await user.save();

  const link = `http://localhost:4000/api/v1/auth/verify/email?token=${token}`;
  console.log("Verification link:", link);
  await sendEmail(user.email, 'Verify your Email', `Click to verify your email: ${link}`);
};