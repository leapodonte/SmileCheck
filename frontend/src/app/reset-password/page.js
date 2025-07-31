"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { resetPassword } from '@/lib/api';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const code = searchParams.get('code');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setMessage("Passwords do not match");

    try {
      const res = await resetPassword(email, code, password);
      setMessage(res.message);
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
    } catch (err) {
      setMessage("Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0B869F] focus:outline-none focus:ring-2"
          />
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm password"
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0B869F] focus:outline-none focus:ring-2"
          />
          <button
            type="submit"
            className="w-full bg-[#0B869F] hover:bg-[#1d616e] text-white py-2 rounded-md transition"
          >
            Reset
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
}
