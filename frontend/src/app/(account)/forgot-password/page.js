// // File: app/forgot-password/page.jsx

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { Snackbar, Alert } from "@mui/material";
// import { useRouter } from "next/navigation";


// const ForgotPasswordPage = () => {
//   const router = useRouter();

//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [code, setCode] = useState("");
//   const [generatedCode, setGeneratedCode] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });

//   const showSnackbar = (message, severity = "info") => {
//     setSnackbar({ open: true, message, severity });
//   };
//   const handleClose = () => setSnackbar({ ...snackbar, open: false });

//   const handleSendCode = async () => {
//     setLoading(true);
//     const verificationCode = Math.floor(
//       100000 + Math.random() * 900000
//     ).toString();
//     setGeneratedCode(verificationCode);
//     try {
//       const res = await fetch("/api/send-verification-code", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, code: verificationCode }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to send code");
//       showSnackbar("Verification code sent to your email!", "success");
//       setStep(2);
//     } catch (err) {
//       showSnackbar(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyCode = () => {
//     if (code === generatedCode) {
//       showSnackbar("Code verified!", "success");
//       setStep(3);
//     } else {
//       showSnackbar("Invalid verification code", "error");
//     }
//   };
//   const handleResetPassword = async () => {
//     if (newPassword !== confirmPassword) {
//       return showSnackbar("Passwords do not match.", "warning");
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/verify-code", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, code, newPassword }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Password reset failed");
//       showSnackbar("Password has been reset successfully!", "success");
//       router.push("/signin");

//       // Reset state
//       setStep(1);
//       setEmail("");
//       setCode("");
//       setNewPassword("");
//       setConfirmPassword("");
//       setGeneratedCode("");
//     } catch (err) {
//       showSnackbar(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div className="space-y-4 text-center">
//             <h1 className="text-xl font-semibold">Reset Your Password</h1>
//             <input
//               type="email"
//               className="w-full px-4 py-2 border border-black rounded-md text-sm"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <button
//               className="w-full bg-[#0B869F] text-white py-2 rounded-xl hover:bg-[#09788e]"
//               onClick={handleSendCode}
//               disabled={loading || !email}
//             >
//               {loading ? "Sending Code..." : "Send Verification Code"}
//             </button>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-4 text-center">
//             <h1 className="text-xl font-semibold">Enter Verification Code</h1>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border border-black rounded-md text-sm tracking-widest text-center"
//               maxLength={6}
//               placeholder="6-digit code"
//               value={code}
//               onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
//             />
//             <button
//               className="w-full bg-[#0B869F] text-white py-2 rounded-xl hover:bg-[#09788e]"
//               onClick={handleVerifyCode}
//               disabled={loading || code.length !== 6}
//             >
//               {loading ? "Verifying..." : "Verify Code"}
//             </button>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-4 text-center">
//             <h1 className="text-xl font-semibold">Set New Password</h1>
//             <input
//               type="password"
//               className="w-full px-4 py-2 border border-black rounded-md text-sm"
//               placeholder="New password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//             />
//             <input
//               type="password"
//               className="w-full px-4 py-2 border border-black rounded-md text-sm"
//               placeholder="Confirm password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//             <button
//               className="w-full bg-[#0B869F] text-white py-2 rounded-xl hover:bg-[#09788e]"
//               onClick={handleResetPassword}
//               disabled={loading || !newPassword || !confirmPassword}
//             >
//               {loading ? "Resetting..." : "Change Password"}
//             </button>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="relative w-full min-h-screen flex items-center justify-center">
//       <Image
//         src="/images/background.png"
//         alt="bg"
//         fill
//         className="object-cover -z-20"
//       />
//       <div className="w-full max-w-md bg-white opacity-90 p-8 rounded-xl shadow-lg z-10">
//         {renderStep()}
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={4000}
//           onClose={handleClose}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         >
//           <Alert
//             onClose={handleClose}
//             severity={snackbar.severity}
//             sx={{ width: "100%" }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordPage;


// File: app/forgot-password/page.jsx

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Snackbar, Alert } from "@mui/material";
// import { useRouter } from "next/navigation";

// const ForgotPasswordPage = () => {
//   const router = useRouter();

//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [code, setCode] = useState("");
//   const [generatedCode, setGeneratedCode] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });

//   const showSnackbar = (message, severity = "info") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleClose = (_, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar({ open: false, message: "", severity: "" });
//   };

//   const validateEmail = () => {
//     const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     if (!emailValid) {
//       showSnackbar("Please enter a valid email address.", "warning");
//       return false;
//     }
//     return true;
//   };

//   const handleSendCode = async () => {
//     if (!validateEmail()) return;

//     setLoading(true);
//     const verificationCode = Math.floor(
//       100000 + Math.random() * 900000
//     ).toString();
//     setGeneratedCode(verificationCode);
    
//     try {
//       const res = await fetch("/api/send-verification-code", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, code: verificationCode }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to send code");
//       showSnackbar("Verification code sent to your email!", "success");
//       setStep(2);
//     } catch (err) {
//       showSnackbar(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyCode = () => {
//     if (code.length !== 6) {
//       showSnackbar("Please enter a valid 6-digit code.", "warning");
//       return;
//     }

//     if (code === generatedCode) {
//       showSnackbar("Code verified!", "success");
//       setStep(3);
//     } else {
//       showSnackbar("Invalid verification code", "error");
//     }
//   };

//   const handleResetPassword = async () => {
//     if (newPassword.trim().length < 6) {
//       showSnackbar("Password must be at least 6 characters long.", "warning");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       return showSnackbar("Passwords do not match.", "warning");
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/verify-code", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, code, newPassword }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Password reset failed");
//       showSnackbar("Password has been reset successfully!", "success");
      
//       setTimeout(() => {
//         router.push("/signin");
//       }, 1500);

//       // Reset state
//       setStep(1);
//       setEmail("");
//       setCode("");
//       setNewPassword("");
//       setConfirmPassword("");
//       setGeneratedCode("");
//     } catch (err) {
//       showSnackbar(err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderStep1 = () => (
//     <>
//       <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
//         Forgot Password? 🔐
//       </h1>
//       <p className="text-xs sm:text-sm text-gray-600 mb-4">
//         Enter your email address and we'll send you a verification code to reset your password.
//       </p>

//       <form className="w-full flex flex-col gap-y-4">
//         <div>
//           <label
//             htmlFor="email"
//             className="text-xs sm:text-sm font-normal text-black"
//           >
//             Email Address
//             <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="johndoe@email.com"
//             required
//             disabled={loading}
//             className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
//           />
//         </div>

//         <button
//           type="button"
//           onClick={handleSendCode}
//           disabled={loading || !email.trim()}
//           className={`w-full rounded-3xl text-white text-sm py-2 transition ${
//             !email.trim()
//               ? "bg-gray-700 cursor-not-allowed"
//               : loading
//               ? "bg-[#0B869F] cursor-not-allowed opacity-80"
//               : "bg-[#0B869F] hover:bg-[#1d616e] cursor-pointer"
//           }`}
//         >
//           {loading ? "Sending Code..." : "Send Verification Code"}
//         </button>
//       </form>

//       <span className="text-center text-xs sm:text-sm text-gray-600 mt-2 block">
//         Remember your password?{" "}
//         <Link href="/signin" className="text-[#0B869F] font-semibold">
//           Sign in
//         </Link>
//         .
//       </span>
//     </>
//   );

//   const renderStep2 = () => (
//     <div className="text-center">
//       <h1 className="text-2xl font-semibold text-gray-900 mb-2">
//         Check Your Email 📧
//       </h1>
//       <p className="text-sm text-gray-700 mb-4">
//         We've sent a verification code to <strong>{email}</strong>.
//         Please check your email and enter the 6-digit code below.
//       </p>

//       <div className="w-full flex flex-col gap-y-4">
//         <div>
//           <label
//             htmlFor="verificationCode"
//             className="text-xs sm:text-sm font-normal text-black"
//           >
//             Verification Code <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             value={code}
//             onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
//             placeholder="Enter 6-digit code"
//             maxLength={6}
//             required
//             disabled={loading}
//             className="w-full px-4 py-2 border text-black border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base text-center text-lg tracking-widest"
//           />
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={() => {
//               setStep(1);
//               setCode("");
//             }}
//             disabled={loading}
//             className="flex-1 rounded-3xl border border-[#0B869F] text-[#0B869F] text-sm py-2 hover:bg-gray-50 transition disabled:opacity-50"
//           >
//             Back
//           </button>
//           <button
//             onClick={handleVerifyCode}
//             disabled={loading || code.length !== 6}
//             className={`flex-1 rounded-3xl text-white text-sm py-2 ${
//               code.length !== 6 || loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-[#0B869F] hover:bg-[#09788e]"
//             } transition`}
//           >
//             {loading ? "Verifying..." : "Verify Code"}
//           </button>
//         </div>
//       </div>

//       <div className="mt-4">
//         <button
//           onClick={() => {
//             const verificationCode = Math.floor(
//               100000 + Math.random() * 900000
//             ).toString();
//             setGeneratedCode(verificationCode);
//             // You can implement resend functionality here
//             showSnackbar("New code sent to your email!", "success");
//           }}
//           disabled={loading}
//           className="text-[#0B869F] text-sm font-semibold hover:underline disabled:opacity-50"
//         >
//           Resend Code
//         </button>
//       </div>
//     </div>
//   );

//   const renderStep3 = () => (
//     <>
//       <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
//         Set New Password 🔑
//       </h1>
//       <p className="text-xs sm:text-sm text-gray-600 mb-4">
//         Create a new password for your account. Make sure it's strong and secure.
//       </p>

//       <form className="w-full flex flex-col gap-y-4">
//         <div>
//           <label
//             htmlFor="newPassword"
//             className="text-xs sm:text-sm font-normal text-black"
//           >
//             New Password
//             <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="password"
//             name="newPassword"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             placeholder="Enter new password"
//             required
//             disabled={loading}
//             className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="confirmPassword"
//             className="text-xs sm:text-sm font-normal text-black"
//           >
//             Confirm Password
//             <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             placeholder="Confirm new password"
//             required
//             disabled={loading}
//             className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
//           />
//         </div>

//         <div className="flex gap-3">
//           <button
//             type="button"
//             onClick={() => {
//               setStep(2);
//               setNewPassword("");
//               setConfirmPassword("");
//             }}
//             disabled={loading}
//             className="flex-1 rounded-3xl border border-[#0B869F] text-[#0B869F] text-sm py-2 hover:bg-gray-50 transition disabled:opacity-50"
//           >
//             Back
//           </button>
//           <button
//             type="button"
//             onClick={handleResetPassword}
//             disabled={loading || !newPassword.trim() || !confirmPassword.trim()}
//             className={`flex-1 rounded-3xl text-white text-sm py-2 transition ${
//               !newPassword.trim() || !confirmPassword.trim()
//                 ? "bg-gray-700 cursor-not-allowed"
//                 : loading
//                 ? "bg-[#0B869F] cursor-not-allowed opacity-80"
//                 : "bg-[#0B869F] hover:bg-[#1d616e] cursor-pointer"
//             }`}
//           >
//             {loading ? "Resetting..." : "Reset Password"}
//           </button>
//         </div>
//       </form>
//     </>
//   );

//   const renderCurrentStep = () => {
//     switch (step) {
//       case 1:
//         return renderStep1();
//       case 2:
//         return renderStep2();
//       case 3:
//         return renderStep3();
//       default:
//         return renderStep1();
//     }
//   };

//   return (
//     <div className="relative w-full min-h-screen bg-center flex items-center justify-center">
//       <Image
//         src="/images/background.png"
//         alt="Background"
//         fill
//         className="object-cover -z-20"
//       />
//       <Image
//         src="/images/stars.png"
//         alt="Stars"
//         fill
//         className="object-contain object-bottom opacity-70 -z-10"
//       />
//       <Image
//         src="/images/lines.png"
//         alt="Lines"
//         fill
//         className="object-contain object-bottom opacity-70 -z-10"
//       />

//       <div className="flex flex-col-reverse lg:flex-row items-center justify-center w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-20 2xl:px-24 py-12 gap-y-10 gap-x-10 max-w-[1440px] mx-auto">
//         <section className="flex justify-center items-center w-full max-w-[550px]">
//           <div
//             className="relative 
//             w-[300px] sm:w-[360px] md:w-[420px] lg:w-[400px] xl:w-[500px] 
//             h-[300px] sm:h-[360px] md:h-[420px] lg:h-[400px] xl:h-[500px] 
//             pt-[40px] md:pt-[60px]"
//           >
//             <Image
//               src="/images/tooth.png"
//               alt="Tooth with Magnifier"
//               fill
//               className="object-contain"
//               priority
//             />
//           </div>
//         </section>

//         <div
//           className="w-full max-w-[650px] lg:max-w-[625px] xl:max-w-[600px] 2xl:max-w-[580px] 
//           mt-24 mb-2 bg-white opacity-80 rounded-xl shadow-2xl px-10 sm:px-24 py-12 z-10"
//         >
//           {renderCurrentStep()}

//           <Snackbar
//             open={snackbar.open}
//             autoHideDuration={4000}
//             onClose={handleClose}
//             anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//           >
//             <Alert
//               onClose={handleClose}
//               severity={snackbar.severity}
//               sx={{ width: "100%" }}
//             >
//               {snackbar.message}
//             </Alert>
//           </Snackbar>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordPage;

// File: app/forgot-password/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [codeExpired, setCodeExpired] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ open: false, message: "", severity: "" });
  };

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

  const validateEmail = () => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      showSnackbar("Please enter a valid email address.", "warning");
      return false;
    }
    return true;
  };

  const sendCodeToAPI = async (verificationCode) => {
    try {
      const res = await fetch("/api/send-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send code");
      return true;
    } catch (error) {
      throw error;
    }
  };

  const handleSendCode = async () => {
    if (!validateEmail()) return;

    setLoading(true);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    setGeneratedCode(verificationCode);
    
    try {
      await sendCodeToAPI(verificationCode);
      showSnackbar("Verification code sent to your email!", "success");
      setStep(2);
      setCountdown(60); // Start 1-minute countdown
      setCodeExpired(false);
      setCode(""); // Clear any previous code
    } catch (err) {
      showSnackbar(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) return;

    setLoading(true);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    setGeneratedCode(verificationCode);
    
    try {
      await sendCodeToAPI(verificationCode);
      showSnackbar("New verification code sent to your email!", "success");
      setCountdown(60); // Reset countdown
      setCodeExpired(false);
      setCode(""); // Clear current code input
    } catch (err) {
      showSnackbar(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = () => {
    if (code.length !== 6) {
      showSnackbar("Please enter a valid 6-digit code.", "warning");
      return;
    }

    if (codeExpired) {
      showSnackbar("This code has expired. Please request a new one.", "error");
      return;
    }

    if (code === generatedCode) {
      showSnackbar("Code verified!", "success");
      setStep(3);
    } else {
      showSnackbar("Invalid verification code", "error");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.trim().length < 6) {
      showSnackbar("Password must be at least 6 characters long.", "warning");
      return;
    }

    if (newPassword !== confirmPassword) {
      return showSnackbar("Passwords do not match.", "warning");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Password reset failed");
      showSnackbar("Password has been reset successfully!", "success");
      
      
    router.push("/signin");
      

      // Reset state
      setStep(1);
      setEmail("");
      setCode("");
      setNewPassword("");
      setConfirmPassword("");
      setGeneratedCode("");
      setCountdown(0);
      setCodeExpired(false);
    } catch (err) {
      showSnackbar(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderStep1 = () => (
    <>
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        Forgot Password? 🔐
      </h1>
      <p className="text-xs sm:text-sm text-gray-600 mb-4">
        Enter your email address and we'll send you a verification code to reset your password.
      </p>

      <form className="w-full flex flex-col gap-y-4">
        <div>
          <label
            htmlFor="email"
            className="text-xs sm:text-sm font-normal text-black"
          >
            Email Address
            <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@email.com"
            required
            disabled={loading}
            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
          />
        </div>

        <button
          type="button"
          onClick={handleSendCode}
          disabled={loading || !email.trim()}
          className={`w-full rounded-3xl text-white text-sm py-2 transition ${
            !email.trim()
              ? "bg-gray-700 cursor-not-allowed"
              : loading
              ? "bg-[#0B869F] cursor-not-allowed opacity-80"
              : "bg-[#0B869F] hover:bg-[#1d616e] cursor-pointer"
          }`}
        >
          {loading ? "Sending Code..." : "Send Verification Code"}
        </button>
      </form>

      <span className="text-center text-xs sm:text-sm text-gray-600 mt-2 block">
        Remember your password?{" "}
        <Link href="/signin" className="text-[#0B869F] font-semibold">
          Sign in
        </Link>
        .
      </span>
    </>
  );

  const renderStep2 = () => (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        Check Your Email 📧
      </h1>
      <p className="text-sm text-gray-700 mb-4">
        We've sent a verification code to <strong>{email}</strong>.
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
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
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
              setCode("");
              setCountdown(0);
              setCodeExpired(false);
            }}
            disabled={loading}
            className="flex-1 rounded-3xl border border-[#0B869F] text-[#0B869F] text-sm py-2 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleVerifyCode}
            disabled={loading || code.length !== 6 || codeExpired}
            className={`flex-1 rounded-3xl text-white text-sm py-2 ${
              code.length !== 6 || loading || codeExpired
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0B869F] hover:bg-[#09788e]"
            } transition`}
          >
            {loading ? "Verifying..." : "Verify Code"}
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
    </div>
  );

  const renderStep3 = () => (
    <>
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        Set New Password 🔑
      </h1>
      <p className="text-xs sm:text-sm text-gray-600 mb-4">
        Create a new password for your account. Make sure it's strong and secure.
      </p>

      <form className="w-full flex flex-col gap-y-4">
        <div>
          <label
            htmlFor="newPassword"
            className="text-xs sm:text-sm font-normal text-black"
          >
            New Password
            <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
            disabled={loading}
            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="text-xs sm:text-sm font-normal text-black"
          >
            Confirm Password
            <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
            disabled={loading}
            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setStep(2);
              setNewPassword("");
              setConfirmPassword("");
            }}
            disabled={loading}
            className="flex-1 rounded-3xl border border-[#0B869F] text-[#0B869F] text-sm py-2 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleResetPassword}
            disabled={loading || !newPassword.trim() || !confirmPassword.trim()}
            className={`flex-1 rounded-3xl text-white text-sm py-2 transition ${
              !newPassword.trim() || !confirmPassword.trim()
                ? "bg-gray-700 cursor-not-allowed"
                : loading
                ? "bg-[#0B869F] cursor-not-allowed opacity-80"
                : "bg-[#0B869F] hover:bg-[#1d616e] cursor-pointer"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </form>
    </>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

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
          {renderCurrentStep()}

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

export default ForgotPasswordPage;