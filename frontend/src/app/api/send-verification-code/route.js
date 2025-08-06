import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/sendEmail"; // Server-only
import dbConnect from "@/lib/dbConnect"; // Ensure this connects to MongoDB
import User from "@/models/User"; // Your User model

export async function POST(req) {
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
  }

  try {
    // Connect to DB
    await dbConnect();

    // Find the user by email and update their verificationCode
    const user = await User.findOneAndUpdate(
      { email },
      { verificationCode: code },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Send email with verification code
    await sendVerificationEmail(email, code);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
