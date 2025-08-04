// app/api/verify-code/route.js
import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    const { userId, code } = await request.json();

    // Validate input
    if (!userId || !code) {
      return NextResponse.json(
        { message: "User ID and verification code are required" },
        { status: 400 }
      );
    }

    // Validate code format (should be 6 digits)
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { message: "Invalid verification code format" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid user ID" },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email already verified" },
        { status: 400 }
      );
    }

    // Check if verification code exists
    if (!user.verificationCode) {
      return NextResponse.json(
        { message: "No verification code found. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify code
    if (user.verificationCode !== code) {
      return NextResponse.json(
        { message: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Update user
    user.emailVerified = true;
    user.verificationCode = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully" },
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