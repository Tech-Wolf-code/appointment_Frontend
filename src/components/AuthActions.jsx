"use client";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import {
  LogIn,
  LogOut,
  UserPlus,
  LayoutDashboard,
} from "lucide-react";

export default function AuthActions() {
  const { isLogged, role } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const go = (path) => router.push("/" + path);

  return (
    <>
      <style>{`
        /* Frosted Glass Button Styling */
        .frosted-auth-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          text-decoration: none;
        }

        .frosted-auth-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 24px rgba(96, 165, 250, 0.2);
          transform: translateY(-2px);
        }

        .frosted-auth-btn:active {
          transform: translateY(0);
        }

        /* Container for auth buttons */
        .auth-actions-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        @media (max-width: 767px) {
          .auth-actions-container {
            flex-direction: column;
            width: 100%;
            gap: 0.5rem;
          }

          .frosted-auth-btn {
            width: 100%;
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
          }
        }

        @media (min-width: 768px) {
          .frosted-auth-btn {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
        }

        /* Icon styling */
        .frosted-auth-btn svg {
          width: 16px;
          height: 16px;
        }
      `}</style>

      <div className="auth-actions-container">
        {!isLogged ? (
          <>
            {/* LOGIN BUTTON */}
            <button
              onClick={() => go("auth/login")}
              className="frosted-auth-btn"
              title="Login to your account"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>

            {/* SIGN UP BUTTON */}
            <button
              onClick={() => go("auth/register")}
              className="frosted-auth-btn"
              title="Create a new account"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </button>
          </>
        ) : (
          <>
            {/* DASHBOARD BUTTON */}
            <button
              onClick={() => go("dashboard")}
              className="frosted-auth-btn"
              title="Go to dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>

            {/* LOGOUT BUTTON */}
            <button
              onClick={() => dispatch(logout())}
              className="frosted-auth-btn"
              title="Logout from your account"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
}
