"use client";

import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/signin" });
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
