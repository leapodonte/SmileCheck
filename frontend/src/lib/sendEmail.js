import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, code, purpose = 'Verification') => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const appName = 'SmileCheck';

  await transporter.sendMail({
    from: `${appName} <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: `${purpose} Code - ${appName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #0B869F">${appName}</h2>
        <h3>${purpose} Code</h3>
        <p>Hello,</p>
        <p>We received a request to complete a <strong>${purpose.toLowerCase()}</strong> process. Please use the following code to proceed:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; background-color: #f0f0f0; padding: 10px 20px; border-radius: 6px; display: inline-block;">
            ${code}
          </span>
        </div>
        <p>If you didn’t request this, you can safely ignore this email.</p>
        <p>Thank you,<br><strong>The ${appName} Team</strong></p>
      </div>
    `,
  });
};
