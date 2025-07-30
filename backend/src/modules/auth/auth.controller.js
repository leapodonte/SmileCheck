import bcrypt from "bcryptjs";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { userModel as User } from "../../../Database/models/user.model.js";
import { generateToken } from "../../utils/jwt.util.js";
import { generateAvatar } from "../../utils/avatar.util.js";

const sanitizeUser = (user) => {
  const { password, __v, ...safeUser } = user.toObject();
  return safeUser;
};

export const signUp = catchAsyncError(async (req, res, next) => {
  const { name, email, password, isGoogleUser, picture, age } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    if (isGoogleUser) {
      if (!user.isGoogleUser) {
        return next(new AppError("This email is already registered traditionally.", 400));
      }
      const token = generateToken(user);
      return res.status(200).json({ message: "Logged in with Google", user: sanitizeUser(user), token });
    } else {
      return next(new AppError("This email is already registered. Try logging in instead.", 400));
    }
  }

  const avatarUrl = isGoogleUser ? picture : generateAvatar(name || email);

  user = await User.create({
    name,
    email,
    password,
    age,
    isGoogleUser: isGoogleUser || false,
    verified: isGoogleUser || false,
    picture: avatarUrl,
  });

  const token = generateToken(user);
  res.status(201).json({ message: "User created successfully", user: sanitizeUser(user), token });
});


export const signIn = async (req, res, next) => {
  const { email, password, isGoogleUser } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new AppError("User not found", 404));

  if (isGoogleUser) {
    if (!user.isGoogleUser) return next(new AppError("Use traditional login for this account.", 400));
    const token = generateToken(user);
    return res.status(200).json({ message: "Google login successful", user: sanitizeUser(user), token });
  }

  if (user.isGoogleUser) return next(new AppError("Use Google login for this account", 400));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError("Invalid credentials", 401));

  const token = generateToken(user);
  res.status(200).json({ message: "Login successful", user: sanitizeUser(user), token });
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
      return next(new AppError(`You are not authorized to access this route. Your role is ${req.user.role}`, 403));
    }
    next();
  });
};
