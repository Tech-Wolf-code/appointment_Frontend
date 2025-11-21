"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Admin from "@/components/dashboard/Admin";
import SuperAdmin from "@/components/dashboard/SuperAdmin";
import User from "@/components/dashboard/User";
import { useSelector } from "react-redux";

export default function DashboardPage() {
  const { role } = useSelector((state) => state.user);

  return (
    <ProtectedRoute>
      {role === "admin" ? (
        <Admin />
      ) : role === "superAdmin" ? (
        <SuperAdmin />
      ) : (
        <User />
      )}
    </ProtectedRoute>
  );
}
