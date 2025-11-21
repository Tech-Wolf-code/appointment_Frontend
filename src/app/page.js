"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Laptop,
  Smartphone,
  BatteryCharging,
  HardDrive,
  Cpu,
  ShieldCheck,
  UserCheck,
  Clock,
  Tag,
} from "lucide-react";
import Link from "next/link";

import Footer from "@/components/Footer";

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-gray-900 text-white  selection:bg-blue-500 selection:text-white">
      {/* ============================== */}
      {/*           HERO SECTION         */}
      {/* ============================== */}

      <div className="relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 bg-blue-800 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 -ml-48 -mb-48 w-96 h-96 bg-purple-800 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Hero Section */}
        <main className="relative z-0 max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-48 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6">
            <span className="block">Fast, Reliable</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              PC & Laptop Repair
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10">
            From broken screens to performance upgrades, our expert technicians
            get your device running like new. Fast turnaround, transparent pricing.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              className="w-full sm:w-auto px-8 pb-3 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg text-lg transition"
              href="/book-service">
              Book a Repair Now
              </Link>
            {/* <a className="w-full sm:w-auto px-8 pb-3 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg text-lg transition">
              Book a Repair Now
            </a> */}
            <Link
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-lg transition"
             href="/dashboard">
              Go to Dashboard
            </Link >
            {/* <a className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-lg transition">
              Go to Dashboard
            </a> */}
          </div>
        </main>
      </div>

      {/* ============================== */}
      {/*         WHAT WE FIX           */}
      {/* ============================== */}

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What We Fix
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <UnifiedCard
              icon={<Laptop className="w-8 h-8 text-blue-400" />}
              title="Laptop Repair"
              desc="Motherboard issues, liquid spills, keyboard problems, and more."
            />

            <UnifiedCard
              icon={<Smartphone className="w-8 h-8 text-green-400" />}
              title="Screen Replacement"
              desc="Cracked or dead screens for laptops, all-in-ones, and tablets."
            />

            <UnifiedCard
              icon={<BatteryCharging className="w-8 h-8 text-yellow-400" />}
              title="Battery Replacement"
              desc="Replace worn-out batteries & restore portability."
            />

          </div>
        </div>
      </section>

      {/* ============================== */}
      {/*     UPGRADES & MAINTENANCE    */}
      {/* ============================== */}

      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Upgrades & Maintenance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <UnifiedCard
              icon={<HardDrive className="w-8 h-8 text-purple-400" />}
              title="SSD Upgrades"
              desc="Upgrade to SSD for massively improved speed."
            />

            <UnifiedCard
              icon={<Cpu className="w-8 h-8 text-red-400" />}
              title="RAM Upgrades"
              desc="Boost multitasking performance by adding more RAM."
            />

            <UnifiedCard
              icon={<ShieldCheck className="w-8 h-8 text-cyan-400" />}
              title="Virus Removal"
              desc="Remove malware, secure your device, restore speed."
            />

          </div>
        </div>
      </section>

      {/* ============================== */}
      {/*       WHY CHOOSE US           */}
      {/* ============================== */}

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose TechFix?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <UnifiedCard
              icon={<UserCheck className="w-10 h-10 text-blue-400 mx-auto mb-4" />}
              title="Expert Technicians"
              desc="Certified pros with years of experience."
              center
            />

            <UnifiedCard
              icon={<Clock className="w-10 h-10 text-blue-400 mx-auto mb-4" />}
              title="Fast Turnaround"
              desc="Same-day or 24-hour servicing."
              center
            />

            <UnifiedCard
              icon={<Tag className="w-10 h-10 text-blue-400 mx-auto mb-4" />}
              title="Transparent Pricing"
              desc="Clear, upfront pricing with no hidden fees."
              center
            />

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

/* ========================================= */
/*        UNIFIED CARD COMPONENT            */
/* ========================================= */

function UnifiedCard({ icon, title, desc, center = false }) {
  return (
    <div
      className={`
        bg-gray-800 p-8 rounded-2xl border border-white/10 
        hover:border-white/20 transition duration-300 
        ${center ? "text-center" : ""}
      `}
    >
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
