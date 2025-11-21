"use client";

import React, { useState } from "react";
import api from "@/utils/axiosInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/userSlice";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      // Extract user + token
      const payload = {
        user: res.data.user,
        accessToken: res.data.accessToken,
      };

      // Save to redux & localStorage
      dispatch(loginSuccess(payload));

      // Redirect based on role
      const role = res.data.user.role;

      if (role === "superAdmin") {
        router.push("/dashboard/");
      } else if (role === "admin") {
        router.push("/dashboard/");
      } else {
        router.push("/dashboard/");
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-6 rounded-xl mt-10 text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none"
          onChange={handleChange}
          required
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>
    </div>
  );
}
