// "use client";

// import Link from "next/link";
// import { Button, Snackbar, Alert } from "@mui/material";
// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useState } from "react";
// import Image from "next/image";
// import { signUpUser } from "@/lib/api";

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "",
//   });

//   const showSnackbar = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleClose = (_, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar({ open: false, message: "", severity: "" });
//   };

//   const validateName = (name) =>
//     /^[a-zA-Z\s]+$/.test(name) && name.trim().length > 0;
//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validatePassword = (password) => {
//     const minLength = password.length >= 8;
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
//     return {
//       isValid: minLength && hasUpperCase && hasSpecialChar,
//       minLength,
//       hasUpperCase,
//       hasSpecialChar,
//     };
//   };

//   const validateForm = () => {
//     if (!validateName(formData.first_name)) {
//       showSnackbar(
//         "First name can only contain letters and spaces.",
//         "warning"
//       );
//       return false;
//     }
//     if (!validateName(formData.last_name)) {
//       showSnackbar("Last name can only contain letters and spaces.", "warning");
//       return false;
//     }
//     if (!validateEmail(formData.email)) {
//       showSnackbar("Please enter a valid email address.", "warning");
//       return false;
//     }
//     const pwd = validatePassword(formData.password);
//     if (!pwd.isValid) {
//       let msg = "Password must have: ";
//       const reqs = [];
//       if (!pwd.minLength) reqs.push("at least 8 characters");
//       if (!pwd.hasUpperCase) reqs.push("one uppercase letter");
//       if (!pwd.hasSpecialChar) reqs.push("one special character");
//       showSnackbar(msg + reqs.join(", "), "warning");
//       return false;
//     }
//     return true;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setLoading(true);
//     try {
//       const userData = {
//         name: `${formData.first_name} ${formData.last_name}`.trim(),
//         email: formData.email,
//         password: formData.password,
//         isGoogleUser: false,
//       };
//       const response = await signUpUser(userData);
//       showSnackbar(
//         response.message || "Account created successfully!",
//         "success"
//       );
//       if (response.token) {
//         localStorage.setItem("token", response.token);
//         localStorage.setItem("user", JSON.stringify(response.user));
//       }
//     } catch (err) {
//       const errorMessage =
//         err.response?.data?.message ||
//         "Something went wrong. Please try again.";
//       showSnackbar(errorMessage, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (

//     <div className="relative w-full min-h-screen bg-center flex items-center justify-center">
//   {/* Background Layers */}
//   <Image
//     src="/images/background.png"
//     alt="Background"
//     fill
//     className="object-cover -z-20"
//   />
//   <Image
//     src="/images/stars.png"
//     alt="Stars"
//     fill
//     className="object-contain object-bottom opacity-70 -z-10"
//   />
//   <Image
//     src="/images/lines.png"
//     alt="Lines"
//     fill
//     className="object-contain object-bottom opacity-70 -z-10"
//   />

//   {/* Content Layout Container */}
//   <div className="flex flex-col-reverse lg:flex-row items-center justify-center w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-20 2xl:px-24 py-12 gap-8 max-w-screen-2xl mx-auto">

//     {/* Left Section: Tooth Visual */}
//     <section className="flex justify-center items-center w-full max-w-[500px]">
//       <div className="relative w-[240px] sm:w-[320px] md:w-[380px] lg:w-[420px] h-[240px] sm:h-[320px] md:h-[380px] lg:h-[420px] pt-[40px] md:pt-[60px]">
//         <Image
//           src="/images/tooth.png"
//           alt="Tooth with Magnifier"
//           fill
//           className="object-contain"
//           priority
//         />
//       </div>
//     </section>

//     {/* Right Section: Form */}
//     <div className="w-full max-w-[750px] mt-24 mb-2 bg-white opacity-90 rounded-xl shadow-2xl px-6 sm:px-10 py-8 z-10">
//       <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Welcome 👋</h1>
//       <p className="text-xs sm:text-sm text-gray-600 mb-4">
//         Access your personalized dental care anytime, anywhere.
//       </p>

//       <form className="w-full flex flex-col gap-y-4" onSubmit={handleSubmit}>
//         {["first_name", "last_name", "email", "password"].map((field) => (
//           <div key={field}>
//             <label
//               htmlFor={field}
//               className="text-xs sm:text-sm font-normal text-black capitalize"
//             >
//               {field.replace("_", " ")}
//               <span className="text-red-500">*</span>
//             </label>
//             {field === "password" ? (
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleInputChange}
//                   placeholder="Password"
//                   required
//                   disabled={loading}
//                   className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
//                 />
//                 <IconButton
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="!absolute top-1/2 right-2 -translate-y-1/2"
//                   edge="end"
//                   size="small"
//                 >
//                   {showPassword ? (
//                     <VisibilityOff fontSize="small" />
//                   ) : (
//                     <Visibility fontSize="small" />
//                   )}
//                 </IconButton>
//               </div>
//             ) : (
//               <input
//                 type={field === "email" ? "email" : "text"}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleInputChange}
//                 placeholder={
//                   field === "first_name"
//                     ? "John"
//                     : field === "last_name"
//                     ? "Doe"
//                     : "johndoe@email.com"
//                 }
//                 required
//                 disabled={loading}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
//               />
//             )}
//           </div>
//         ))}

//         <div className="w-full text-right text-xs sm:text-sm mb-4">
//           <Link href="/account/forgot-password" className="text-[#0B869F]">
//             Forgot Password?
//           </Link>
//         </div>

//         <Button
//           type="submit"
//           variant="contained"
//           fullWidth
//           disabled={loading}
//           style={{
//             backgroundColor: loading ? "#9CA3AF" : "#162D3A",
//             textTransform: "none",
//             padding: "0.5rem",
//             fontSize: "0.875rem",
//           }}
//         >
//           {loading ? "Creating Account..." : "Sign Up"}
//         </Button>
//       </form>

//       <div className="p-6 text-center text-xs sm:text-sm text-gray-500">
//         <span className="bg-white px-3">Or</span>
//       </div>

//       <div className="w-full flex flex-col gap-y-3">
//         <Button
//           variant="outlined"
//           fullWidth
//           disabled={loading}
//           startIcon={
//             <img src="/icons/google.png" alt="Google" className="w-5 h-5" />
//           }
//           style={{
//             fontSize: "0.875rem",
//           }}
//         >
//           Sign up with Google
//         </Button>
//       </div>

//       <span className="text-center text-xs sm:text-sm text-gray-600 mt-8 block">
//         Already a member?{" "}
//         <Link href="/signin" className="text-[#0B869F] font-semibold">
//           Sign in
//         </Link>
//         .
//       </span>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert
//           onClose={handleClose}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   </div>
// </div>

//   );
// };

// export default SignupPage;

"use client";

import Link from "next/link";
import { Button, Snackbar, Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Image from "next/image";
import { signUpUser } from "@/lib/api";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "", // ✅ Added age field
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ open: false, message: "", severity: "" });
  };

  const validateName = (name) =>
    /^[a-zA-Z\s]+$/.test(name) && name.trim().length > 0;
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

  const validateForm = () => {
    if (!validateName(formData.first_name)) {
      showSnackbar(
        "First name can only contain letters and spaces.",
        "warning"
      );
      return false;
    }
    if (!validateName(formData.last_name)) {
      showSnackbar("Last name can only contain letters and spaces.", "warning");
      return false;
    }
    if (!validateEmail(formData.email)) {
      showSnackbar("Please enter a valid email address.", "warning");
      return false;
    }
    if (!formData.age || isNaN(formData.age) || formData.age < 1) {
      showSnackbar("Please enter a valid age.", "warning");
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
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const userData = {
        name: `${formData.first_name} ${formData.last_name}`.trim(),
        email: formData.email,
        password: formData.password,
        age: parseInt(formData.age),
        isGoogleUser: false,
      };
      const response = await signUpUser(userData);
      showSnackbar(
        response.message || "Account created successfully!",
        "success"
      );
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Something went wrong. Please try again.";
      showSnackbar(errorMessage, "error");
    } finally {
      setLoading(false);
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
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Welcome 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mb-4">
            Access your personalized dental care anytime, anywhere.
          </p>

          <form
            className="w-full flex flex-col gap-y-4"
            onSubmit={handleSubmit}
          >
            {["first_name", "last_name", "age", "email", "password"].map(
              (field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="text-xs sm:text-sm font-normal text-black capitalize"
                  >
                    {field.replace("_", " ")}
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
                      type={
                        field === "email"
                          ? "email"
                          : field === "age"
                          ? "number"
                          : "text"
                      }
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={
                        field === "first_name"
                          ? "John"
                          : field === "last_name"
                          ? "Doe"
                          : field === "email"
                          ? "johndoe@email.com"
                          : field === "age"
                          ? "21"
                          : ""
                      }
                      required
                      disabled={loading}
                      min={field === "age" ? 1 : undefined}
                      max={field === "age" ? 120 : undefined}
                      className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
                    />
                  )}
                </div>
              )
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-4 rounded-3xl text-white text-sm py-2 ${
                loading ? "bg-[#1d616e]" : "bg-[#0B869F]"
              } ${
                loading
                  ? "cursor-not-allowed opacity-80"
                  : "hover:bg-[#09788e] transition"
              }`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

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
