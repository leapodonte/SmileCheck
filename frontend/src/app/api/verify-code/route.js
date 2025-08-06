// app/api/verify-code/route.js

import { NextResponse } from 'next/server';
import User from "@/models/User";
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { email, code, newPassword } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { message: "Email and verification code are required" },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { message: "Invalid verification code format" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.verificationCode) {
      return NextResponse.json({
        message: "No verification code found. Please request a new one.",
      }, { status: 400 });
    }

    if (user.verificationCode !== code) {
      return NextResponse.json(
        { message: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Clear the code and mark email verified
    user.emailVerified = true;
    user.verificationCode = undefined;

    // If password change is requested
    if (newPassword) {
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    return NextResponse.json(
      { message: newPassword ? "Password reset successful" : "Verification successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
