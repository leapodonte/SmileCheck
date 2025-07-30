import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "JR";

export const generateToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      name: user.name,
      id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
