"use client";
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { verifyCode } from '@/lib/api';

export default function VerifyCodePage() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyCode(email, code);
      window.location.href = `/reset-password?email=${email}&code=${code}`;
    } catch (err) {
      setMessage("Invalid code.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Verify Code</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter the verification code"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0B869F] focus:outline-none focus:ring-2"
          />
          <button
            type="submit"
            className="w-full bg-[#0B869F] hover:bg-[#1d616e] text-white py-2 rounded-md transition"
          >
            Verify
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}
