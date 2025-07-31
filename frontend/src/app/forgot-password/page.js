"use client";

import { useState } from 'react';
import { forgotPassword } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(email);
      setMessage(res.message);
      window.location.href = `/verify-code?email=${email}`;
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0B869F] focus:outline-none focus:ring-2"
          />
          <button
            type="submit"
            className="w-full bg-[#0B869F] hover:bg-[#1d616e] text-white py-2 rounded-md transition"
          >
            Send Code
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-center text-[#0B869F]">{message}</p>}
      </div>
    </div>
  );
}
