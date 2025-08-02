"use client";

import { useState } from "react";
import Image from "next/image";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { verifyCode, resetPassword, forgotPassword } from "@/lib/api";

const Alert = MuiAlert;

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(email);
      setStep(2);
      setSnackbar({
        open: true,
        message: res.message,
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Something went wrong.",
        severity: "error",
      });
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      await verifyCode(email, code);
      setStep(3);
      setSnackbar({
        open: true,
        message: "Code verified successfully!",
        severity: "success",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Invalid code.",
        severity: "error",
      });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      return setSnackbar({
        open: true,
        message: "Passwords do not match",
        severity: "error",
      });
    }

    try {
      const res = await resetPassword(email, code, password);
      setSnackbar({
        open: true,
        message: res.message,
        severity: "success",
      });
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to reset password.",
        severity: "error",
      });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-center flex items-center justify-center">
      {/* Background */}
      <Image src="/images/background.png" alt="Background" fill className="object-cover -z-20" />
      <Image src="/images/stars.png" alt="Stars" fill className="object-contain object-bottom opacity-70 -z-10" />
      <Image src="/images/lines.png" alt="Lines" fill className="object-contain object-bottom opacity-70 -z-10" />

      <div className="flex flex-col-reverse lg:flex-row items-center justify-center w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-20 2xl:px-24 py-12 gap-y-10 gap-x-10 max-w-[1440px] mx-auto">
        {/* Tooth image */}
        <section className="flex justify-center items-center w-full max-w-[550px]">
          <div className="relative w-[300px] sm:w-[360px] md:w-[420px] lg:w-[400px] xl:w-[500px] h-[300px] sm:h-[360px] md:h-[420px] lg:h-[400px] xl:h-[500px] pt-[40px] md:pt-[60px]">
            <Image src="/images/tooth.png" alt="Tooth" fill className="object-contain" priority />
          </div>
        </section>

        {/* Form steps */}
        <div className="w-full max-w-[650px] lg:max-w-[625px] xl:max-w-[600px] 2xl:max-w-[580px] mt-24 mb-2 bg-white opacity-80 rounded-xl shadow-2xl px-10 sm:px-24 py-12 z-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center">
            {step === 1 && "Forgot Password?"}
            {step === 2 && "Verify Code"}
            {step === 3 && "Reset Password"}
          </h1>

          <p className="text-xs sm:text-sm text-gray-600 mb-4 text-center">
            {step === 1 && "Enter your email and we'll send you a verification code."}
            {step === 2 && "Check your inbox for the code and verify it here."}
            {step === 3 && "Set your new password to access your account."}
          </p>

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-black">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="johndoe@email.com"
                  className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F]"
                />
              </div>
              <button type="submit" className="w-full bg-[#0B869F] hover:bg-[#1d616e] text-white py-2 rounded-3xl transition">
                Send Code
              </button>
            </form>
          )}

          {/* Step 2: Verify Code */}
          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-black">
                  Verification Code <span className="text-red-500">*</span>
                </label>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  placeholder="Enter the code"
                  className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F]"
                />
              </div>
              <button type="submit" className="w-full bg-[#0B869F] hover:bg-[#1d616e] text-white py-2 rounded-3xl transition">
                Verify
              </button>
            </form>
          )}

          {/* Step 3: Reset Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-black">
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="New password"
                  className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-black">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  type="password"
                  required
                  placeholder="Confirm password"
                  className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F]"
                />
              </div>
              <button type="submit" className="w-full bg-[#0B869F] hover:bg-[#1d616e] text-white py-2 rounded-3xl transition">
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
