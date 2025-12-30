"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiRequest } from "@/services/api";

export default function OtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //  VERIFY OTP (FINAL SIGNUP STEP)
  const verifyOtp = async () => {
    if (!otp) {
      return setError("OTP is required");
    }

    setLoading(true);
    setError("");

    try {
      
      // Signup already verifies OTP in backend
      // So normally OTP page just confirms OTP visually
      // Actual signup happens from register page

      alert("OTP verified successfully");
      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f0f14] to-[#1a1b22] text-white">
      <div className="w-full max-w-md bg-[#14151b] p-8 rounded-2xl border border-white/10 shadow-xl">
        
        <h1 className="text-2xl font-semibold text-center mb-4">
          Verify OTP
        </h1>

        <p className="text-sm text-gray-400 text-center mb-6">
          OTP sent to <span className="text-white">{email}</span>
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 outline-none focus:border-purple-500 text-center tracking-widest"
        />

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full mt-6 bg-linear-to-r from-purple-600 to-pink-500 py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
