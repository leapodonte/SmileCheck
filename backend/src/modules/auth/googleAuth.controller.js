import { OAuth2Client } from "google-auth-library";
import { userModel } from "../../../Database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, name: user.name, id: user._id, role: user.role },
    process.env.JWT_SECRET || "JR",
    { expiresIn: "7d" }
  );
};

// Google OAuth Controller
const googleOAuthHandler = catchAsyncError(async (req, res, next) => {
  const { credential } = req.body;

  if (!credential) {
    return next(new AppError("Google token is missing", 400));
  }

  // 1. Verify token
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { email, name, picture, sub: googleId } = payload;

  if (!email || !googleId) {
    return next(new AppError("Invalid Google account information", 400));
  }

  // 2. Check if user already exists
  let user = await userModel.findOne({ email });

  if (!user) {
    // 3. Create new Google user
    user = await userModel.create({
      email,
      name,
      isGoogleUser: true,
      verified: true,
      googleId,
      picture: picture || `https://www.gravatar.com/avatar/${googleId}?d=identicon`,
    });
  } else if (!user.isGoogleUser) {
    // Email exists but was registered via password
    return next(
      new AppError(
        "This email is registered using password. Please sign in with email/password.",
        409
      )
    );
  }

  // 4. Generate token
  const token = generateToken(user);

  res.status(200).json({ message: "Google Auth successful", user, token });
});

export { googleOAuthHandler };
