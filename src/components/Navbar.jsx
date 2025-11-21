"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

// Your actual AuthActions (Redux-based)
const AuthActions = dynamic(() => import("./AuthActions"), { ssr: false });

export default function TechFixNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMobileOpen(!mobileOpen);
  const closeMenu = () => setMobileOpen(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Book Service", href: "/book-service" },
    { label: "Contact Us", href: "/contact" },
    { label: "About Us", href: "/about" },
  ];

  return (
    <>
      <style>{`
        :root {
          --color-primary-blue: #60a5fa;
          --color-glass-bg: rgba(15, 23, 42, 0.95);
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
        }

        .header-container {
          max-width: 1280px;
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

        /* NORMAL LINK */
        .nav-link {
          color: var(--color-text-secondary);
          font-size: 1rem;
          font-weight: 500;
          position: relative;
          transition: color var(--transition-standard);
        }

        /* ACTIVE LINK */
        .nav-link.active {
          color: var(--color-primary-blue);
        }
        .nav-link.active::after {
          width: 100%;
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

        .menu-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        /* FULL SCREEN SIDEBAR */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          height: 100vh;
          background: var(--color-glass-bg);
          backdrop-filter: blur(var(--blur-amount));
          padding: 1rem 0;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          animation: slideInRight 0.35s ease-out;
          overflow-y: auto;
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1.5rem 1rem;
        }

        /* MOBILE LINKS */
        .mobile-menu-item {
          padding: 1rem 1.5rem;
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--color-text-primary);
          transition: all var(--transition-standard);
        }

        .mobile-menu-item.active {
          color: var(--color-primary-blue);
          background: rgba(255, 255, 255, 0.1);
        }

        .mobile-menu-item:hover {
          background: rgba(255, 255, 255, 0.12);
          padding-left: 2.2rem;
        }

        .mobile-auth-section {
          margin-top: auto;
          padding: 1.5rem;
          border-top: 1px solid var(--color-border-light);
        }
      `}</style>

      {/* NAVBAR */}
      <header className="header">
        <div className="header-container">
          <nav className="nav">
            <Link href="/" className="logo">
              Tech<span className="logo-highlight">Fix</span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="nav-links-desktop">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="desktop-auth">
                <AuthActions />
              </div>
            </div>

            {/* MOBILE BUTTON */}
            <button className="mobile-btn" onClick={toggleMenu}>
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </nav>
        </div>
      </header>

      {/* OVERLAY */}
      {mobileOpen && <div className="menu-overlay" onClick={closeMenu} />}

      {/* FULL MOBILE SIDEBAR */}
      {mobileOpen && (
        <div className="mobile-menu">
          <div className="menu-header">
            <Link href="/" className="logo text-xl" onClick={closeMenu}>
              Tech<span className="logo-highlight">Fix</span>
            </Link>

            <button className="mobile-btn" onClick={closeMenu}>
              <X size={26} />
            </button>
          </div>

          {/* MOBILE NAV ITEMS */}
          <nav className="flex flex-col space-y-2 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`mobile-menu-item ${
                  pathname === link.href ? "active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mobile-auth-section">
            <AuthActions />
          </div>
        </div>
      )}
    </>
  );
}
