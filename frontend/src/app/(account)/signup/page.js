"use client";

import Link from "next/link";
import { Snackbar, Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios"
import countries from "@/utils/countries";

const SignupPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    age: "",
    country: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [codeExpired, setCodeExpired] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Age ranges for dropdown
  const ageRanges = [
    { value: "1-10", label: "1-10 years" },
    { value: "10-20", label: "10-20 years" },
    { value: "20-30", label: "20-30 years" },
    { value: "30-40", label: "30-40 years" },
    { value: "40-50", label: "40-50 years" },
    { value: "50-60", label: "50-60 years" },
    { value: "60+", label: "Greater than 60 years" },
  ];

  // Auto-detect country on component mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("https://ipwho.is/", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.country) {
            setDetectedCountry(data.country);
            setFormData((prev) => ({ ...prev, country: data.country }));
          } else {
            throw new Error("Country detection failed");
          }
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error("ipwho.is failed:", error);
        // fallback to default country
        setDetectedCountry("Pakistan");
        setFormData((prev) => ({ ...prev, country: "Pakistan" }));
      }
    };

    if (step === 2) {
      detectCountry();
    }
  }, [step]);

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

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ open: false, message: "", severity: "" });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return {
      isValid: minLength && hasUpperCase && hasSpecialChar,
      minLength,
      hasUpperCase,
      hasSpecialChar,
    };
  };

  const validateName = (name) =>
    /^[a-zA-Z\s]+$/.test(name) && name.trim().length > 0;

  const validateStep1 = () => {
    if (!validateEmail(formData.email)) {
      showSnackbar("Please enter a valid email address.", "warning");
      return false;
    }

    const pwd = validatePassword(formData.password);
    if (!pwd.isValid) {
      let msg = "Password must have: ";
      const reqs = [];
      if (!pwd.minLength) reqs.push("at least 8 characters");
      if (!pwd.hasUpperCase) reqs.push("one uppercase letter");
      if (!pwd.hasSpecialChar) reqs.push("one special character");
      showSnackbar(msg + reqs.join(", "), "warning");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      showSnackbar("Passwords do not match.", "warning");
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    if (!validateName(formData.name)) {
      showSnackbar("Name can only contain letters and spaces.", "warning");
      return false;
    }
    if (!formData.age) {
      showSnackbar("Please select an age range.", "warning");
      return false;
    }
    if (!formData.country) {
      showSnackbar("Please select a country.", "warning");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Fixed function - removed confusing parameter and proper validation
  const handleFinalSubmit = async () => {
    if (!validateStep2()) return;

    setLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/signup`, formData);

      if (res.status === 200 || res.status === 201) {
        setUserId(res.data.userId);
        setGeneratedCode(res.data.verificationCode || ""); // Assuming API returns the code
        setStep(3);
        setCountdown(60); // Start 5-minute countdown for signup
        setCodeExpired(false);
        showSnackbar("Account created! Check your email for verification code.", "success");
      } else {
        showSnackbar(res.data.message || "Registration failed.", "error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Registration failed. Please try again.";
      showSnackbar(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      // Use the same signup endpoint to regenerate and send code
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/signup`, {
        ...formData,
        resend: true // Add flag to indicate this is a resend request
      });

      if (res.status === 200 || res.status === 201) {
        setGeneratedCode(res.data.verificationCode || "");
        setCountdown(60); 
        setCodeExpired(false);
        setVerificationCode(""); // Clear current input
        showSnackbar("New verification code sent to your email!", "success");
      } else {
        showSnackbar(res.data.message || "Failed to resend code.", "error");
      }
    } catch (error) {
      console.error("Resend error:", error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to resend code. Please try again.";
      showSnackbar(errorMessage, "error");
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          code: verificationCode,
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Verification failed");
      }

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
        // If auto-login fails, still redirect to signin
        showSnackbar("Verification successful! Please sign in.", "success");
        setTimeout(() => router.push("/signin"), 2000);
      }
    } catch (error) {
      console.error("Verification error:", error);
      showSnackbar(error.message || "Verification failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fixed skip function - make fields optional for skip
  const handleSkip = async () => {
    const skipData = {
      ...formData,
      name: formData.name || "Anonymous User", // Provide default
      age: formData.age || "Not specified",
      country: formData.country || detectedCountry || "Not specified"
    };

    setLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/signup`, skipData);

      if (res.status === 200 || res.status === 201) {
        setUserId(res.data.userId);
        setGeneratedCode(res.data.verificationCode || "");
        setStep(3);
        setCountdown(60); // Start 5-minute countdown
        setCodeExpired(false);
        showSnackbar("Account created! Check your email for verification code.", "success");
      } else {
        showSnackbar(res.data.message || "Registration failed.", "error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Registration failed. Please try again.";
      showSnackbar(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <>
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        Welcome 👋
      </h1>
      <p className="text-xs sm:text-sm text-gray-600 mb-4">
        Create your account to access personalized dental care.
      </p>

      <div className="w-full flex flex-col gap-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="text-xs sm:text-sm font-normal text-black"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="johndoe@email.com"
            required
            disabled={loading}
            className="w-full px-4 py-2 border text-black border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="text-xs sm:text-sm font-normal text-black"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
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
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="text-xs sm:text-sm font-normal text-black"
          >
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              required
              disabled={loading}
              className="w-full px-4 py-2 pr-10 border text-black border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
            />
            <IconButton
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="!absolute top-1/2 right-2 -translate-y-1/2"
              edge="end"
              size="small"
            >
              {showConfirmPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={loading}
          className={`w-full mt-4 rounded-3xl text-white text-sm py-2 ${
            loading ? "bg-[#1d616e]" : "bg-[#0B869F]"
          } ${
            loading
              ? "cursor-not-allowed opacity-80"
              : "hover:bg-[#09788e] transition"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Complete Profile
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Help us personalize your experience.
          </p>
        </div>
        <button
          onClick={handleSkip}
          className="text-[#0B869F] text-sm font-semibold hover:underline"
          disabled={loading}
        >
          Skip
        </button>
      </div>

      <div className="w-full flex flex-col gap-y-4">
        {/* Full Name Field */}
        <div>
          <label
            htmlFor="name"
            className="text-xs sm:text-sm font-normal text-black"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
            disabled={loading}
            className="w-full px-4 py-2 border text-black border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
          />
        </div>

        {/* Age Range Field */}
        <div>
          <label
            htmlFor="age"
            className="text-xs sm:text-sm font-normal text-black"
          >
            Age Range <span className="text-red-500">*</span>
          </label>
          <select
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
            disabled={loading}
            className="w-full px-4 py-2 border text-black border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
          >
            <option value="">Select age range</option>
            {ageRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Country Field */}
        <div>
          <label
            htmlFor="country"
            className="text-xs sm:text-sm font-normal text-black"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            disabled={loading}
            className="w-full px-4 py-2 border text-black border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {detectedCountry && (
            <p className="text-xs text-gray-500 mt-1">
              Auto-detected: {detectedCountry}
            </p>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            disabled={loading}
            className="flex-1 rounded-3xl border border-[#0B869F] text-[#0B869F] text-sm py-2 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleFinalSubmit}
            disabled={loading}
            className={`flex-1 rounded-3xl text-white text-sm py-2 ${
              loading ? "bg-[#1d616e]" : "bg-[#0B869F]"
            } ${
              loading
                ? "cursor-not-allowed opacity-80"
                : "hover:bg-[#09788e] transition"
            }`}
          >
            {loading ? "Creating Account..." : "Complete Signup"}
          </button>
        </div>
      </div>
    </>
  );

  const renderStep3 = () => (
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
          <div className="bg-gradient-to-r from-green-50 to-indigo-50 border border-green-200 rounded-lg p-3">
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
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))} // Only allow digits
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
              setStep(2);
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
        
      </div>

      <p className="text-xs text-gray-500 mt-4">
        After verification, you'll be automatically signed in and redirected to the dashboard.
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
        {/* Tooth Section */}
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

        {/* Form Section */}
        <div
          className="w-full 
      max-w-[650px] 
      lg:max-w-[625px] 
      xl:max-w-[600px] 
      2xl:max-w-[580px] 
      mt-24 mb-2 bg-white opacity-80 rounded-xl shadow-2xl px-10 sm:px-24  py-12 z-10"
        >
          {step === 1
            ? renderStep1()
            : step === 2
            ? renderStep2()
            : renderStep3()}

          <span className="text-center text-xs sm:text-sm text-gray-600 mt-2 block">
            Already a member?{" "}
            <Link href="/signin" className="text-[#0B869F] font-semibold">
              Sign in
            </Link>
            .
          </span>

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

export default SignupPage;