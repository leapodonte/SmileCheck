import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { generateToken } from "../../utils/jwt.util.js";
import { generateAvatar } from "../../utils/avatar.util.js";
import { generateEmailVerification } from "../../utils/generateEmailVerification.js";
import { User } from "../../../database/models/user.model.js";
import sendEmail from "../../utils/sendEmail.js";

const sanitizeUser = (user) => {
  const { password, __v, ...safeUser } = user.toObject();
  return safeUser;
};

export const signUp = catchAsyncError(async (req, res, next) => {
  const { name, email, password, isGoogleUser, picture, age, country } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    if (isGoogleUser) {
      if (!user.isGoogleUser) {
        return next(
          new AppError("This email is already registered traditionally.", 400)
        );
      }
      const token = generateToken(user);
      return res
        .status(200)
        .json({
          message: "Logged in with Google",
          user: sanitizeUser(user),
          token,
        });
    } else {
      return next(
        new AppError(
          "This email is already registered. Try logging in instead.",
          400
        )
      );
    }
  }

  const avatarUrl = isGoogleUser ? picture : generateAvatar(name || email);

  // Create user data object
  const userData = {
    name: name || "User", // Default name if not provided
    email,
    password,
    isGoogleUser: isGoogleUser || false,
    verified: isGoogleUser || false,
    picture: avatarUrl,
  };

  // Only add optional fields if they are provided
  if (age) {
    userData.age = age; // Store age range directly as string
  }
  
  if (country) {
    userData.country = country;
  }

  user = await User.create(userData);

  // Send email verification for non-Google users
  if (!user.isGoogleUser) {
    await generateEmailVerification(user);
  }

  const token = generateToken(user);
  res
    .status(201)
    .json({
      message: "User created successfully",
      user: sanitizeUser(user),
      token,
    });
});

export const signIn = async (req, res, next) => {
  const { email, password, isGoogleUser } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(new AppError("User not found", 404));

    if (isGoogleUser) {
      if (!user.isGoogleUser)
        return next(
          new AppError("Use traditional login for this account.", 400)
        );
      const token = generateToken(user);
      return res
        .status(200)
        .json({
          message: "Google login successful",
          user: sanitizeUser(user),
          token,
        });
    }

    if (user.isGoogleUser)
      return next(new AppError("Use Google login for this account", 400));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new AppError("Invalid credentials", 401));

    const token = generateToken(user);
    res
      .status(200)
      .json({ message: "Login successful", user: sanitizeUser(user), token });
  } catch (err) {
    next(err);
  }
};

export const protectedRoutes = catchAsyncError(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new AppError("Token not provided", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError("User not found", 404));

  req.user = user;
  next();
});

export const allowedTo = (...roles) => {
  return catchAsyncError(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `You are not authorized to access this route. Your role is ${req.user.role}`,
          403
        )
      );
    }
    next();
  });
};

// Step 1: Request reset code
export const requestPasswordReset = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new AppError("No user found with this email", 404));

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  const hashedCode = crypto.createHash("sha256").update(code).digest("hex");

  user.resetPasswordCode = hashedCode;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 mins
  await user.save();

  await sendEmail({
    to: user.email,
    subject: "Your Password Reset Code",
    text: `Your verification code is: ${code}`,
  });

  res.status(200).json({ message: "Verification code sent to email." });
});

export const verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: "Email and code are required" });
    }

    const hashedCode = crypto.createHash("sha256").update(code).digest("hex");

    const user = await User.findOne({
      email,
      resetPasswordCode: hashedCode,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid or expired verification code" });
    }

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Step 3: Reset password
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { email, code, newPassword } = req.body;
  const hashedCode = crypto.createHash("sha256").update(code).digest("hex");

  const user = await User.findOne({
    email,
    resetPasswordCode: hashedCode,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user)
    return next(new AppError("Invalid or expired verification code", 400));

  user.password = newPassword;
  user.resetPasswordCode = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password has been reset successfully." });
});

export const checkUserVerification = async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ verified: false });

    const token = req.headers.authorization?.split(' ')[1] || '';

    res.json({
      verified: user.verified,
      token: user.verified ? generateToken(user) : null,
      user: user.verified ? sanitizeUser(user) : null,
    });
  } catch (error) {
    next(error);
  }
};

