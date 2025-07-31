// pages/verify-email.jsx or verify-email.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // or use `next/navigation` in App Router
import axios from "axios";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/auth/verify-email?token=${token}`);
        setStatus("Verified!");
        // Redirect to dashboard after short delay
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } catch (err) {
        setStatus("Verification failed. Invalid or expired token.");
      }
    };

    verify();
  }, [token]);

  return <div className="text-center p-8">{status}</div>;
}
