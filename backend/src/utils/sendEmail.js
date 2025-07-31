import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, text }) => {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

console.log(to,subject,text)

    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use "Mailtrap", "Outlook", "SendGrid" etc. as needed
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (err) {
    console.error("Failed to send email:", err);
    throw new Error("Email sending failed");
  }
};

export default sendEmail;


// import dotenv from 'dotenv';
// dotenv.config();
// import sgMail from "@sendgrid/mail";

// console.log("SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY);
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const sendEmail = async (to, subject, text) => {
//   try {
//     const msg = {
//       to,
//       from: process.env.EMAIL_USER,
//       subject,
//       text,
//     };

//     await sgMail.send(msg);
//     console.log("Email sent");
//   } catch (err) {
//     console.error("SendGrid error details:", err.response?.body || err.message);
//     throw new Error("Email sending failed");
//   }
// };

// export default sendEmail;