"use client";

import { useEffect, useState, useMemo } from "react";
import { X } from "lucide-react";
import api from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

export default function UserDetailsPanel({ user, close }) {
  const router = useRouter();

  const [bookings, setBookings] = useState([]);
  const [searchBookingId, setSearchBookingId] = useState("");

  useEffect(() => {
    if (user) fetchUserBookings();
  }, [user]);

const fetchUserBookings = async () => {
  try {
    if (!user) return;

    const res = await api.get(`/admin/users/${user._id}/bookings`);
    setBookings(res.data.bookings);
  } catch (err) {
    console.error("User bookings error:", err);
  }
};

  const filtered = useMemo(() => {
    if (!searchBookingId) return bookings;
    return bookings.filter((b) =>
      b._id.toLowerCase().includes(searchBookingId.toLowerCase())
    );
  }, [bookings, searchBookingId]);

  return (
    <aside
      className={`fixed top-0 right-0 bg-gray-800 w-full md:w-[380px] h-full z-50 p-6 border-l border-white/10 transition-transform duration-300 ${
        user ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">User Details</h3>
        <button onClick={close}>
          <X size={22} />
        </button>
      </div>

      {!user ? (
        <p className="text-center opacity-70">No user selected</p>
      ) : (
        <>
          {/* USER INFO */}
          <div className="mb-6">
            <p className="font-semibold text-lg">
              {user.firstName} {user.lastName}
            </p>
            <p className="opacity-70">{user.email}</p>
            <p className="opacity-70">{user.phone}</p>
          </div>

          {/* SEARCH BOOKINGS */}
          <input
            placeholder="Search booking ID..."
            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg mb-4"
            value={searchBookingId}
            onChange={(e) => setSearchBookingId(e.target.value)}
          />

          {/* USER BOOKING LIST */}
          <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-2">
            {filtered.map((b) => (
              <div
                key={b._id}
                className="p-3 bg-white/10 border border-white/20 rounded-lg cursor-pointer hover:bg-white/20"
                onClick={() => router.push(`/dashboard/booking/${b._id}`)}
              >
                <p className="font-semibold">{b.device.brand}</p>
                <p className="opacity-70 text-sm">{b.issue.issues.join(", ")}</p>
                <p className="opacity-70 text-sm">ID: {b._id}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
