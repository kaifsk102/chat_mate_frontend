"use client";
import { useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //  LOGIN HANDLER
  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      return setError("Email and password are required");
    }

    setLoading(true);
    try {
      console.log("LOGIN REQUEST:", { email, password });
      const res = await apiRequest("/api/auth/login", "POST", {
        email,
        password,
      });
      console.log("LOGIN RESPONSE:", res);

      // Save JWT + user
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      console.log("TOKEN SAVED:", localStorage.getItem("token"));
      console.log("USER SAVED:", localStorage.getItem("user"));

      // Redirect to chat/dashboard
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
          Sign In
        </h1>

        {error && (
          <p className="mb-3 text-sm text-red-500 text-center">{error}</p>
        )}

        {/* Form */}
        <div className="space-y-4">
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

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-4 bg-linear-to-r from-purple-600 to-pink-500 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-400 space-y-2">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-white hover:underline">
              Create an account
            </Link>
          </p>

          <p className="cursor-pointer hover:underline">
            Forgot password?
          </p>
        </div>
      </div>
    </div>
  );
}
