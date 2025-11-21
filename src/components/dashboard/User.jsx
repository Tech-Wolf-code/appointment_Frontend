"use client";

import { useEffect, useState, useMemo } from "react";
import api from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

// lucide icons
import { Search, User as UserIcon, X, Filter, ChevronRight } from "lucide-react";

const StatusPill = ({ status }) => {
  const base = "px-3 py-1 text-xs font-medium rounded-full capitalize";
  const color =
    status === "completed"
      ? "bg-green-500/20 text-green-300"
      : status === "in-progress"
      ? "bg-blue-500/20 text-blue-300"
      : status === "cancelled"
      ? "bg-red-500/20 text-red-300"
      : "bg-yellow-500/20 text-yellow-300";

  return <span className={`${base} ${color}`}>{status}</span>;
};

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");

  const router = useRouter();
  const STATUS_FILTERS = ["all", "pending", "in-progress", "completed", "cancelled"];

  useEffect(() => {
    fetchProfile();
    fetchBookings();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      setProfile(res.data.user);
    } catch (err) {
      alert("Failed to load profile. please try again or contact support.");
      console.error("PROFILE ERROR:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/me");
      setBookings(res.data.bookings);
    } catch (err) {
      console.error("BOOKING ERROR:", err);
    }
  };

  const filteredBookings = useMemo(() => {
    let out = [...bookings];

    if (activeStatus !== "all") {
      out = out.filter((b) => b.status === activeStatus);
    }

    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      out = out.filter((b) =>
        b.device.brand.toLowerCase().includes(s) ||
        b.device.deviceType.toLowerCase().includes(s) ||
        b.issue.issues.join(", ").toLowerCase().includes(s)
      );
    }

    return out;
  }, [bookings, searchTerm, activeStatus]);

  return (
    <div className="flex w-full min-h-screen bg-gray-900 text-white relative overflow-hidden font-sans">
      
      {/* Profile Toggle */}
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="fixed top-20 right-5 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20"
      >
        {isProfileOpen ? <X size={20} /> : <UserIcon size={20} />}
      </button>

      {/* Main */}
      <main
        className={`flex-grow p-6 md:p-10 transition-all ${
          isProfileOpen ? "md:mr-[320px]" : ""
        }`}
      >
        <h2 className="text-3xl font-bold mb-8">User Dashboard</h2>

        {/* Search + Filters */}
        <div className="mb-6 space-y-4">

          {/* Search */}
          <div className="relative">
            <input
              placeholder="Search by brand, device, issue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          {/* Status Filter */}
          <div className="flex items-center flex-wrap gap-2">
            <Filter size={16} className="text-gray-400" />
            <span className="text-sm">Filter by status:</span>

            {STATUS_FILTERS.map((st) => (
              <button
                key={st}
                onClick={() => setActiveStatus(st)}
                className={`px-4 py-1.5 rounded-full text-sm ${
                  activeStatus === st
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <div className="glass-card p-5 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-xl font-semibold mb-4">My Bookings</h3>

          {filteredBookings.length === 0 ? (
            <p className="text-white/60 py-4 text-center">
              {bookings.length > 0 ? "No matching bookings" : "No bookings yet"}
            </p>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((b) => (
                <div
                  key={b._id}
                  className="p-4 bg-white/10 border border-white/20 rounded-xl flex flex-col md:flex-row justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold text-lg">
                      {b.device.brand} – {b.device.deviceType}
                    </p>
                    <p className="text-sm mt-1 opacity-80">
                      <b>Issues:</b> {b.issue.issues.join(", ")}
                    </p>
                    <p className="text-sm opacity-80">
                      <b>Date:</b> {b.appointment.date}
                    </p>
                  </div>

                  <div className="flex flex-col md:items-end gap-3">
                    <StatusPill status={b.status} />

                    <button
                      onClick={() => router.push(`/dashboard/booking/${b._id}`)}
                      className="px-4 py-2 bg-blue-600 text-sm rounded-lg flex items-center gap-2 hover:bg-blue-700"
                    >
                      View Details <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Profile Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-40 w-full md:w-80 h-full bg-gray-800 shadow-lg transition-transform duration-300 ${
          isProfileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 pt-20">
          <h3 className="text-xl font-semibold text-center mb-6">Profile</h3>

          {profile ? (
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                {profile.firstName[0]}
                {profile.lastName[0]}
              </div>

              <p className="text-2xl font-semibold mt-4">
                {profile.firstName} {profile.lastName}
              </p>

              <p className="opacity-80">{profile.email}</p>

              <button className="mt-6 w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg">
                Log Out
              </button>
            </div>
          ) : (
            <p className="text-center text-white/60">Loading...</p>
          )}
        </div>
      </aside>
    </div>
  );
}
