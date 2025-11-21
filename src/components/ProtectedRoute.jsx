"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadUserFromStorage } from "@/redux/userSlice";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isLogged, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  // Load saved user on first mount
  useEffect(() => {
    dispatch(loadUserFromStorage());
    setHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;

    if (!isLogged) {
      router.replace("/auth/login");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      router.replace("/");
    }
  }, [hydrated, isLogged, role, allowedRoles, router]);

  if (!hydrated || !isLogged) return null;

  return children;
}
