"use client";

import React, { useState } from "react";
import api from "@/utils/axiosInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/userSlice";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/register", form); // backend returns user + accessToken
      const payload = {
        user: res.data.user,
        accessToken: res.data.accessToken,
      };

      dispatch(loginSuccess(payload));
      router.push("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-6 rounded-xl mt-10 text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>

      <form className="space-y-4" onSubmit={handleRegister}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none"
            onChange={handleChange}
            required
          />

          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none"
            onChange={handleChange}
            required
          />
        </div>

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
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Register"}
        </button>
      </form>
    </div>
  );
}
