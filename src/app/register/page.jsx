"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiRequest } from "@/services/api";


export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //  SEND OTP
   const sendOtp = async () => {
  console.log("SEND OTP BUTTON CLICKED");
  console.log("EMAIL", email);

  try {
await apiRequest("/auth/sendotp", "POST", { email });
  } catch (err) {
    console.error("FRONTEND ERROR:", err);
    setError(err.message);
  }
};

  //  SIGNUP
  const handleSignup = async () => {
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      await apiRequest("/auth/signup", "POST", {
        name,
        email,
        phone_number: `${countryCode}${phone}`,
        password,
        confirm_password: confirmPassword,
        otp,
      });

      alert("Account created successfully");
      window.location.href = "/chat";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f0f14] to-[#1a1b22] text-white overflow-hidden">
      
      {/* Decorative Blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-purple-600 opacity-80 blur-2xl" />
      <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-gray-700 opacity-80 blur-2xl" />

      <button
             className="absolute top-8 right-8 px-1 py-1  bg-linear-to-r from-purple-600 to-pink-500 border-2  rounded-full">
            <Link href="/" >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#FFFFFF"/>
               </svg>
            </Link>
        </button>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-[#14151b] rounded-2xl p-8 shadow-xl border border-white/10">
        
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h1>

        {error && (
          <p className="mb-3 text-sm text-red-500 text-center">{error}</p>
        )}

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 outline-none focus:border-purple-500"
          />

          {/* Phone */}
          <div className="flex gap-3">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="bg-[#14151b] border border-white/20 rounded-lg px-3 py-2 text-white outline-none focus:border-purple-500"
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+61">🇦🇺 +61</option>
              <option value="+81">🇯🇵 +81</option>
            </select>

            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 bg-transparent border border-white/20 rounded-lg px-4 py-2 outline-none focus:border-purple-500"
            />
          </div>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 outline-none focus:border-purple-500"
          />

          

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 outline-none focus:border-purple-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 outline-none focus:border-purple-500"
          />
          {/* OTP */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="flex-1 bg-transparent border border-white/20 rounded-lg px-4 py-2 outline-none focus:border-purple-500"
            />
            <button
              onClick={sendOtp}
              className="px-4 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              Send OTP
            </button>
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full mt-4 bg-linear-to-r from-purple-600 to-pink-500 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
