"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: "Laptop Repair",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (API call)
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", serviceType: "Laptop Repair", message: "" });
    }, 3000);
  };

  return (
    <>
      <style>{`
        :root {
          --color-primary-blue: #60a5fa;
          --color-glass-bg: rgba(15, 23, 42, 0.7);
          --color-border-light: rgba(255, 255, 255, 0.1);
          --color-text-primary: #ffffff;
          --color-text-secondary: #d1d5db;
          --blur-amount: 10px;
          --transition-standard: 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Animated Gradient Background */
        .contact-page::before {
          content: '';
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(135deg, 
              rgba(96, 165, 250, 0.1) 0%, 
              rgba(59, 130, 246, 0.05) 20%,
              rgba(147, 51, 234, 0.08) 40%,
              rgba(59, 130, 246, 0.05) 60%,
              rgba(96, 165, 250, 0.1) 80%,
              rgba(147, 51, 234, 0.08) 100%);
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
          z-index: 0;
          pointer-events: none;
          opacity: 0.8;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }

        /* Background Blobs */
        .blob-blue {
          position: fixed;
          top: -6rem;
          right: -12rem;
          width: 24rem;
          height: 24rem;
          background: #1e40af;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.35;
          animation: pulse 4s ease-in-out infinite;
          z-index: 1;
          pointer-events: none;
        }

        .blob-purple {
          position: fixed;
          bottom: -6rem;
          left: -12rem;
          width: 24rem;
          height: 24rem;
          background: #6d28d9;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.35;
          animation: pulse 4s ease-in-out infinite 3s;
          z-index: 1;
          pointer-events: none;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.5; }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .contact-page {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          padding-top: 5rem;
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          position: relative;
          z-index: 10;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 4rem;
        }

        .hero-section h1 {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #60a5fa 0%, #93d5fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
          }
        }

        .form-card {
          background: var(--color-glass-bg);
          backdrop-filter: blur(var(--blur-amount));
          border: 1px solid var(--color-border-light);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-input,
        .form-textarea,
        .form-select {
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border-light);
          border-radius: 8px;
          color: var(--color-text-primary);
          transition: all var(--transition-standard);
          font-family: inherit;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--color-primary-blue);
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
        }

        .submit-btn {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-text-primary);
          cursor: pointer;
          border-radius: 8px;
          transition: all var(--transition-standard);
          backdrop-filter: blur(10px);
          text-transform: uppercase;
          margin-top: 1rem;
          font-weight: 600;
        }

        .submit-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 24px rgba(96, 165, 250, 0.2);
          transform: translateY(-2px);
        }

        .success-message {
          padding: 1rem;
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 8px;
          color: #86efac;
          text-align: center;
          animation: slideDown 0.3s ease-out;
        }

        .info-card {
          background: var(--color-glass-bg);
          backdrop-filter: blur(var(--blur-amount));
          border: 1px solid var(--color-border-light);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all var(--transition-standard);
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .info-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--color-primary-blue);
          transform: translateY(-4px);
        }

        .info-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(96, 165, 250, 0.15);
          border-radius: 8px;
          color: var(--color-primary-blue);
        }

        .feature-card {
          background: var(--color-glass-bg);
          border: 1px solid var(--color-border-light);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          transition: all var(--transition-standard);
          animation: slideDown 0.5s ease-out;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: var(--color-primary-blue);
        }
      `}</style>

      <div className="contact-page">
        <div className="blob-blue" />
        <div className="blob-purple" />

        <div className="contact-container">
          <div className="hero-section animate-slideDown">
            <h1>Get in Touch</h1>
            <p>Have questions? We're here to help. Response within 24 hours.</p>
          </div>

          <div className="contact-content">
            <div className="animate-slideDown">
              <div className="form-card">
                <h2>Send us a Message</h2>
                
                {submitted && (
                  <div className="success-message">
                    Thank you! We'll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Service Type</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option>Laptop Repair</option>
                      <option>Data Recovery</option>
                      <option>Software Installation</option>
                      <option>General Support</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                      required
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            <div className="animate-slideDown" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="info-card">
                <div className="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>CALL US</h3>
                  <p style={{ color: "var(--color-text-primary)", fontWeight: "500" }}>+91 (555) 123-4567</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>EMAIL US</h3>
                  <p style={{ color: "var(--color-text-primary)", fontWeight: "500" }}>support@techfix.com</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>VISIT US</h3>
                  <p style={{ color: "var(--color-text-primary)", fontWeight: "500" }}>Lucknow, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
