import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Dental App" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Your Verification Code",
    text: `Your code is ${code}`,
    html: `<h1>Verify your Email</h1><p>Your code is <b>${code}</b></p>`,
  });
};
