// "use client";

// import Link from "next/link";
// import { Snackbar, Alert } from "@mui/material";
// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const SignInPage = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const isFormValid =
//     formData.email.trim() !== "" && formData.password.trim() !== "";
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "",
//   });

//   const router = useRouter();

//   const showSnackbar = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleClose = (_, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar({ open: false, message: "", severity: "" });
//   };

//   const validateForm = () => {
//     const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
//     if (!emailValid) {
//       showSnackbar("Please enter a valid email address.", "warning");
//       return false;
//     }

//     if (formData.password.trim().length < 1) {
//       showSnackbar("Please enter your password.", "warning");
//       return false;
//     }

//     return true;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
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
//         {/* Tooth Section */}
//         <section className="flex justify-center items-center w-full max-w-[550px]">
//           <div
//             className="relative 
//         w-[300px] sm:w-[360px] md:w-[420px] lg:w-[400px] xl:w-[500px] 
//         h-[300px] sm:h-[360px] md:h-[420px] lg:h-[400px] xl:h-[500px] 
//         pt-[40px] md:pt-[60px]"
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

//         {/* Form Section */}
//         <div
//           className="w-full 
//         max-w-[650px] 
//         lg:max-w-[625px] 
//         xl:max-w-[600px] 
//         2xl:max-w-[580px] 
//         mt-24 mb-2 bg-white opacity-80 rounded-xl shadow-2xl px-10 sm:px-24  py-12 z-10"
//         >
//           <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
//             Welcome Back 👋
//           </h1>
//           <p className="text-xs sm:text-sm text-gray-600 mb-4">
//             Access your personalized dental care anytime, anywhere.
//           </p>

//           <form
//             className="w-full flex flex-col gap-y-4"
            
//           >
//             {["email", "password"].map((field) => (
//               <div key={field}>
//                 <label
//                   htmlFor={field}
//                   className="text-xs sm:text-sm font-normal text-black capitalize"
//                 >
//                   {field}
//                   <span className="text-red-500">*</span>
//                 </label>

//                 {field === "password" ? (
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name={field}
//                       value={formData[field]}
//                       onChange={handleInputChange}
//                       placeholder="Password"
//                       required
//                       disabled={loading}
//                       className="w-full px-4 py-2 pr-10 border text-black border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
//                     />
//                     <IconButton
//                       onClick={() => setShowPassword((prev) => !prev)}
//                       className="!absolute top-1/2 right-2 -translate-y-1/2"
//                       edge="end"
//                       size="small"
//                     >
//                       {showPassword ? (
//                         <VisibilityOff fontSize="small" />
//                       ) : (
//                         <Visibility fontSize="small" />
//                       )}
//                     </IconButton>
//                   </div>
//                 ) : (
//                   <input
//                     type="email"
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleInputChange}
//                     placeholder="johndoe@email.com"
//                     required
//                     disabled={loading}
//                     className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B869F] disabled:opacity-50 text-sm sm:text-base"
//                   />
//                 )}
//               </div>
//             ))}

//             <button
//               type="submit"
//               disabled={loading || !isFormValid}
//               className={`w-full rounded-3xl text-white text-sm py-2 transition ${
//                 !isFormValid
//                   ? "bg-gray-700 cursor-not-allowed"
//                   : loading
//                   ? "bg-[#0B869F] cursor-not-allowed opacity-80"
//                   : "bg-[#0B869F] hover:bg-[#1d616e] cursor-pointer"
//               }`}
//             >
//               {loading ? "Signing in..." : "Sign In"}
//             </button>
//           </form>

//           {/* Only show Google button if Google OAuth is configured */}

//           <div className="p-4 text-center text-xs sm:text-sm text-gray-500">
//             <span className="bg-white px-1">Or</span>
//           </div>

//           <div className="w-full flex flex-col gap-y-3">
//             <button
              
//               className="w-full flex items-center justify-center bg-white text-gray-600 rounded-3xl text-sm normal-case py-2 px-4 shadow-none hover:shadow-md border border-gray-800"
//             >
//               <Image
//                 src="/icons/Google.png"
//                 alt="Google"
//                 width={20}
//                 height={20}
//                 className="mr-2"
//               />
//               Continue with Google
//             </button>
//           </div>

//           <span className="text-center text-xs sm:text-sm text-gray-600 mt-2 block">
//             Don't have an account?{" "}
//             <Link href="/signup" className="text-[#0B869F] font-semibold">
//               Sign up
//             </Link>
//             .
//           </span>

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

// export default SignInPage;


"use client";

import Link from "next/link";
import { Snackbar, Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignInPage = () => {
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

  const router = useRouter();

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

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

  const handleSignIn = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);

  const res = await signIn("credentials", {
    email: formData.email,
    password: formData.password,
    redirect: false, // we manually redirect below
  });

  setLoading(false);

  if (res?.ok) {
    router.push("/dashboard");
  } else {
    showSnackbar("Invalid email or password", "error");
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
