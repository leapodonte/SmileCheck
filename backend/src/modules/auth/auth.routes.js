import express from "express";
import * as auth from "./auth.controller.js";
import { googleOAuthHandler } from "./googleAuth.controller.js";

const authRouter = express.Router();

// Email/password auth
authRouter.post("/signup", auth.signUp);
authRouter.post("/signin", auth.signIn);

// Google OAuth (Next.js frontend POSTs the credential here)
authRouter.post("/google", googleOAuthHandler);

export default authRouter;
