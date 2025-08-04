// app/api/signup/route.js
import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { sendVerificationEmail } from "@/lib/sendEmail";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { email, password, name, age, country } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create user with proper defaults
    const userData = {
      email,
      password: hashedPassword,
      name: name || "Anonymous User",
      age: age || "Not specified",
      country: country || "Not specified",
      verificationCode,
      emailVerified: false,
    };

    const user = await User.create(userData);

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationCode);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Continue with registration even if email fails
    }

    return NextResponse.json(
      { 
        message: "User created successfully. Verification email sent.", 
        userId: user._id.toString()
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 400 }
      );
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { message: errors.join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}