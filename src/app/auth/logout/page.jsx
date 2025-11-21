"use client"
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { loginSuccess } from "@/redux/userSlice";
import { useState } from "react";
import { logout } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import api from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleLogout() {
    await api.post("/auth/logout");
    dispatch(logout());
    router.push("/");
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
