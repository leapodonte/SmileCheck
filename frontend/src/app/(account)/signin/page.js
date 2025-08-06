"use client";

import Link from "next/link";
import { Snackbar, Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isFormValid =
    formData.email.trim() !== "" && formData.password.trim() !== "";
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [step, setStep] = useState(1); // Step 1 = normal sign in, Step 2 = verification
  const [verificationCode, setVerificationCode] = useState("");
  const [userId, setUserId] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [codeExpired, setCodeExpired] = useState(false);

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    if (error) {
      let message = "Something went wrong.";
      if (error.includes("credentials")) {
        message = "This email is registered with credentials. Use email/password to sign in.";
      } else if (error.includes("google")) {
        message = "This email is registered with Google. Please use Google to sign in.";
      }
      showSnackbar(message, "error");
    }
  }, [error]);

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCodeExpired(true);
            showSnackbar("Verification code has expired. Please request a new one.", "warning");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ open: false, message: "", severity: "" });
  };

  const validateForm = () => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!emailValid) {
      showSnackbar("Please enter a valid email address.", "warning");
      return false;
    }

    if (formData.password.trim().length < 1) {
      showSnackbar("Please enter your password.", "warning");
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      // Try to parse the error as JSON (structured error from NextAuth)
      try {
        const errorData = JSON.parse(res?.error || "{}");

        if (errorData.type === "verify") {
          // This is a verification error - move to step 2
          showSnackbar(errorData.message, "info");
          setUserId(errorData.userId);

          // Send verification code
          await sendVerificationCode(errorData.userId);
          setStep(2);
        } else {
          // Other structured errors
          showSnackbar(errorData.message || "Something went wrong", "error");
        }
      } catch (parseError) {
        // Not a JSON error - handle as regular string error
        if (res?.error?.includes("verify your email")) {
          // Show verification message and move to step 2
          showSnackbar(res.error, "info");
          setStep(2);
        } else {
          showSnackbar(res?.error || "Something went wrong", "error");
        }
      }
    }
  };

  // Function to send verification code
  const sendVerificationCode = async () => {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    try {
      // Try the primary endpoint first
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/send-verification-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            code: verificationCode,
          }),
        }
      );

      // If the primary endpoint fails, try without the base URL
      if (!response.ok) {
        response = await fetch(`/api/send-verification-code`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            code: verificationCode,
          }),
        });
      }

      // Check if response is HTML (404 page)
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        throw new Error(
          "API endpoint not found. Please check if /api/send-verification-code exists."
        );
      }

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        throw new Error(
          errorData.message || "Failed to send verification code"
        );
      }

      const data = await response.json();
      showSnackbar("Verification code sent to your email!", "success");
      setCountdown(60); // Start 1-minute countdown
      setCodeExpired(false);
      setVerificationCode(""); // Clear any previous code
    } catch (error) {
      console.error("Error sending verification code:", error);

      if (error.message.includes("API endpoint not found")) {
        showSnackbar(
          "Verification system not configured. Please contact support.",
          "error"
        );
        // Optionally, you can still allow manual step 2 entry
        // setStep(2); // Uncomment if you want to allow manual verification
      } else {
        showSnackbar(
          "Failed to send verification code. Please try again.",
          "error"
        );
      }
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      await sendVerificationCode();
    } catch (error) {
      console.error("Resend error:", error);
      showSnackbar("Failed to resend code. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      showSnackbar("Please enter a valid 6-digit code.", "warning");
      return;
    }

    if (codeExpired) {
      showSnackbar("This code has expired. Please request a new one.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          code: verificationCode,
        }),
      });

      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        throw new Error(errorData.message || "Verification failed");
      }

      const data = await res.json();
      showSnackbar("Email verified successfully!", "success");

      // Auto-login after successful verification
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.ok) {
        router.push("/dashboard");
      } else {
        showSnackbar("Verification successful! Please sign in.", "success");
        setStep(1);
        setVerificationCode("");
        setCountdown(0);
        setCodeExpired(false);
      }
    } catch (error) {
      console.error("Verification error:", error);
      showSnackbar(error.message || "Verification failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <>
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        Welcome Back 👋
      </h1>
      <p className="text-xs sm:text-sm text-gray-600 mb-4">
        Access your personalized dental care anytime, anywhere.
      </p>

      <form className="w-full flex flex-col gap-y-4">
        {["email", "password"].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="text-xs sm:text-sm font-normal text-black capitalize"
            >
              {field}
              <span className="text-red-500">*</span>
            </label>

            {field === "password" ? (
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 pr-10 border text-black border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
                />
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="!absolute top-1/2 right-2 -translate-y-1/2"
                  edge="end"
                  size="small"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </div>
            ) : (
              <input
                type="email"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder="johndoe@email.com"
                required
                disabled={loading}
                className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
              />
            )}
          </div>
        ))}

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-[#0B869F] text-sm hover:underline hover:text-[#08748A] transition duration-200"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          onClick={handleSignIn}
          disabled={loading || !isFormValid}
          className={`w-full rounded-3xl text-white text-sm py-2 transition ${
            !isFormValid
              ? "bg-gray-700 cursor-not-allowed"
              : loading
              ? "bg-[#0B869F] cursor-not-allowed opacity-80"
              : "bg-[#0B869F] hover:bg-[#1d616e] cursor-pointer"
          }`}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="p-4 text-center text-xs sm:text-sm text-gray-500">
        <span className="bg-white px-1">Or</span>
      </div>

      <div className="w-full flex flex-col gap-y-3">
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center bg-white text-gray-600 rounded-3xl text-sm normal-case py-2 px-4 shadow-none hover:shadow-md border border-gray-800"
        >
          <Image
            src="/icons/Google.png"
            alt="Google"
            width={20}
            height={20}
            className="mr-2"
          />
          Continue with Google
        </button>
      </div>

      <span className="text-center text-xs sm:text-sm text-gray-600 mt-2 block">
        Don't have an account?{" "}
        <Link href="/signup" className="text-[#0B869F] font-semibold">
          Sign up
        </Link>
        .
      </span>
    </>
  );

  const renderStep2 = () => (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        Verify Your Email 📧
      </h1>
      <p className="text-sm text-gray-700 mb-4">
        We've sent a verification code to <strong>{formData.email}</strong>.
        Please check your email and enter the 6-digit code below.
      </p>

      {/* Improved Countdown Timer */}
      <div className="mb-6">
        {countdown > 0 ? (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-700 font-medium mb-1">
              Code Active
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-lg font-mono font-bold text-green-800">
                {formatTime(countdown)}
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-xs text-green-600 mt-1">
              Time remaining for this code
            </p>
          </div>
        ) : codeExpired ? (
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <p className="text-sm font-semibold text-red-700">
                Code Expired
              </p>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <p className="text-xs text-red-600">
              Your verification code has expired. Please request a new one to continue.
            </p>
          </div>
        ) : null}
      </div>

      <div className="w-full flex flex-col gap-y-4">
        <div>
          <label
            htmlFor="verificationCode"
            className="text-xs sm:text-sm font-normal text-black"
          >
            Verification Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) =>
              setVerificationCode(e.target.value.replace(/\D/g, ""))
            }
            placeholder="Enter 6-digit code"
            maxLength={6}
            required
            disabled={loading || codeExpired}
            className={`w-full px-4 py-2 border text-black border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base text-center text-lg tracking-widest ${
              codeExpired ? "bg-gray-100" : ""
            }`}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setStep(1);
              setVerificationCode("");
              setCountdown(0);
              setCodeExpired(false);
            }}
            disabled={loading}
            className="flex-1 rounded-3xl border border-[#0B869F] text-[#0B869F] text-sm py-2 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleVerifyEmail}
            disabled={loading || verificationCode.length !== 6 || codeExpired}
            className={`flex-1 rounded-3xl text-white text-sm py-2 ${
              verificationCode.length !== 6 || loading || codeExpired
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0B869F] hover:bg-[#09788e]"
            } transition`}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleResendCode}
          disabled={loading || (countdown > 0 && !codeExpired)}
          className={`text-sm font-semibold transition ${
            loading || (countdown > 0 && !codeExpired)
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#0B869F] hover:underline"
          }`}
        >
          {loading ? "Sending..." : "Resend Code"}
        </button>
        {countdown > 0 && !codeExpired && (
          <p className="text-xs text-gray-500 mt-1">
            Request a new code after expiration
          </p>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-4">
        After verification, you'll be automatically signed in and redirected to
        the dashboard.
      </p>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen bg-center flex items-center justify-center">
      <Image
        src="/images/background.png"
        alt="Background"
        fill
        className="object-cover -z-20"
      />
      <Image
        src="/images/stars.png"
        alt="Stars"
        fill
        className="object-contain object-bottom opacity-70 -z-10"
      />
      <Image
        src="/images/lines.png"
        alt="Lines"
        fill
        className="object-contain object-bottom opacity-70 -z-10"
      />

      <div className="flex flex-col-reverse lg:flex-row items-center justify-center w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-20 2xl:px-24 py-12 gap-y-10 gap-x-10 max-w-[1440px] mx-auto">
        <section className="flex justify-center items-center w-full max-w-[550px]">
          <div
            className="relative 
            w-[300px] sm:w-[360px] md:w-[420px] lg:w-[400px] xl:w-[500px] 
            h-[300px] sm:h-[360px] md:h-[420px] lg:h-[400px] xl:h-[500px] 
            pt-[40px] md:pt-[60px]"
          >
            <Image
              src="/images/tooth.png"
              alt="Tooth with Magnifier"
              fill
              className="object-contain"
              priority
            />
          </div>
        </section>

        <div
          className="w-full max-w-[650px] lg:max-w-[625px] xl:max-w-[600px] 2xl:max-w-[580px] 
          mt-24 mb-2 bg-white opacity-80 rounded-xl shadow-2xl px-10 sm:px-24 py-12 z-10"
        >
          {step === 1 ? renderStep1() : renderStep2()}

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
      </div>
    </div>
  );
};

export default SignInPage;