"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

// Disable SSR for AuthActions (required)
const AuthActions = dynamic(() => import("./AuthActions"), { ssr: false });

export default function TechFixNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => setMobileOpen(!mobileOpen);
  const closeMenu = () => setMobileOpen(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Book Service", href: "/book-service" },
    { label: "Contact Us", href: "/contact" },
    { label: "About Us", href: "/about" }
  ];

  return (
    <>
      <style>{`
        :root {
          --color-primary-blue: #60a5fa;
          --color-glass-bg: rgba(15, 23, 42, 0.7);
          --color-border-light: rgba(255, 255, 255, 0.1);
          --color-text-primary: #ffffff;
          --color-text-secondary: #d1d5db;
          --blur-amount: 20px;
          --transition-standard: 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: var(--color-glass-bg);
          backdrop-filter: blur(var(--blur-amount));
          border-bottom: 1px solid var(--color-border-light);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .header-container {
          max-width: rem;
          margin: 0 auto;
          padding: 1.5rem;
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-text-primary);
        }
        .logo-highlight {
          color: var(--color-primary-blue);
        }

        /* Desktop nav */
        .nav-links-desktop {
          display: none;
          align-items: center;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .nav-links-desktop {
            display: flex;
          }
        }

        .nav-link {
          color: var(--color-text-secondary);
          font-size: 1rem;
          font-weight: 500;
          position: relative;
        }
        .nav-link:hover {
          color: var(--color-text-primary);
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0%;
          height: 2px;
          background: var(--color-primary-blue);
          transition: width var(--transition-standard);
        }
        .nav-link:hover::after {
          width: 100%;
        }

        .desktop-auth {
          display: none;
        }
        @media (min-width: 768px) {
          .desktop-auth {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
        }

        .mobile-btn {
          padding: 0.5rem;
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.15);
          color: var(--color-text-primary);
        }
        @media (min-width: 768px) {
          .mobile-btn {
            display: none;
          }
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 70%;
          max-width: 300px;
          background: var(--color-glass-bg);
          backdrop-filter: blur(var(--blur-amount));
          border-left: 1px solid var(--color-border-light);
          padding: 1.5rem 0;
          z-index: 1001;
          animation: slideInRight 0.35s ease-out;
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .menu-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .mobile-menu-item {
          padding: 0.875rem 1.5rem;
          font-size: 1rem;
          color: var(--color-text-secondary);
        }
        .mobile-menu-item:hover {
          background: rgba(255, 255, 255, 0.1);
          padding-left: 2rem;
        }

        .mobile-auth-section {
          margin-top: auto;
          padding: 1.5rem;
        }
      `}</style>

      <header className="header ">
        <div className="header-container">
          <nav className="nav">
            <Link href="/" className="logo">
              Tech<span className="logo-highlight">Fix</span>
            </Link>

            {/* Desktop Nav */}
            <div className="nav-links-desktop">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="desktop-auth">
              <AuthActions />
            </div>

            {/* Mobile Button */}
            <button className="mobile-btn" onClick={toggleMenu}>
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </nav>
        </div>
      </header>

      {/* Overlay */}
      {mobileOpen && (
        <div className="menu-overlay" onClick={closeMenu} />
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          <button
            onClick={closeMenu}
            className="text-white px-4 py-2"
          >
            <X size={24} />
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-menu-item"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}

          <div className="mobile-auth-section">
            <AuthActions />
          </div>
        </div>
      )}
    </>
  );
}
