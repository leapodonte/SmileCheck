import { User } from "../../../database/models/user.model.js";

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).send("Token is required");

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).send("Invalid or expired token");

    user.verified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;
    await user.save();

    // 🔁 Redirect to dashboard after successful verification
    console.log("Frontend URL:", process.env.FRONTEND_BASE_URL);
    return res.redirect(`${process.env.FRONTEND_BASE_URL}/dashboard`);
  } catch (err) {
    console.error("Error verifying email:", err);
    return res.status(500).send("Verification failed");
  }
};

export { verifyEmail };
