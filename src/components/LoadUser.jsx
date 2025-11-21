"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "@/redux/userSlice";

export default function LoadUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, []);

  return null;
}
