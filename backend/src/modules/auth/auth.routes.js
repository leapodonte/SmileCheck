import express from "express";
import * as auth from "./auth.controller.js";
import { googleOAuthHandler } from "./googleAuth.controller.js";
import { verifyEmail } from "./verifyemail.js";

const authRouter = express.Router();

// Email/password auth
authRouter.post("/signup", auth.signUp);
authRouter.post("/signin", auth.signIn);

// Google OAuth (Next.js frontend POSTs the credential here)
authRouter.post("/google", googleOAuthHandler);

authRouter.get("/verify/email", verifyEmail);

authRouter.post('/forgot-password', auth.requestPasswordReset);
authRouter.post('/verify-code', auth.verifyResetCode);
authRouter.post('/reset-password', auth.resetPassword);

export default authRouter;
