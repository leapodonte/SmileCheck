import express from "express";
import * as auth from "./auth.controller.js";
import { verifyEmail } from "./verifyEmail.js";

const authRouter = express.Router();

// Email/password auth
authRouter.post("/signup", auth.signUp);
authRouter.post("/signin", auth.signIn);

authRouter.get("/verify/email", verifyEmail);

authRouter.post('/forgot-password', auth.requestPasswordReset);
authRouter.post('/verify-code', auth.verifyResetCode);
authRouter.post('/reset-password', auth.resetPassword);

authRouter.get('/is-verified', auth.checkUserVerification);

export default authRouter;
