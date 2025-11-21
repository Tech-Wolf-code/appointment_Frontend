"use client";

import { useState, useEffect, useMemo } from "react";
import api from "@/utils/axiosInstance";
import { Search, Users, ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";

import FilterSidebar from "./admin/FilterSidebar";
import UserCard from "./admin/UserCard";
import BookingCard from "./admin/BookingCard";
import UserDetailsPanel from "./admin/UserDetailsPanel";

export default function Admin() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("users");

  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  /* -----------------------------------
     FILTER STATES (Shared for sidebar)
  ----------------------------------- */
  const [searchUser, setSearchUser] = useState("");
  const [searchBooking, setSearchBooking] = useState("");
  const [searchBookingId, setSearchBookingId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [blockedFilter, setBlockedFilter] = useState("");
  const [dateSort, setDateSort] = useState("newest");

  /* -----------------------------------
     FETCH DATA
  ----------------------------------- */
  useEffect(() => {
    fetchUsers();
    fetchBookings();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.users);
    } catch (err) {
      console.error("User Fetch Error:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get("/admin/bookings");
      setBookings(res.data.bookings);
    } catch (err) {
      console.error("Booking Fetch Error:", err);
    }
  };

  const toggleBlock = async (id) => {
    try {
      await api.patch(`/admin/users/${id}/toggle-block`);
      fetchUsers();
    } catch (err) {
      console.error("Block Error:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/bookings/admin/${id}/status`, { status });
      fetchBookings();
    } catch (err) {
      console.error("Status Update Error:", err);
    }
  };

  /* -----------------------------------
        FILTER LOGIC
  ----------------------------------- */

  /** USERS FILTERED */
  const filteredUsers = useMemo(() => {
    let out = [...users];

    if (searchUser) {
      const s = searchUser.toLowerCase();
      out = out.filter(
        (u) =>
          u.firstName.toLowerCase().includes(s) ||
          u.lastName.toLowerCase().includes(s) ||
          u.email.toLowerCase().includes(s)
      );
    }

    if (blockedFilter === "blocked") out = out.filter((u) => u.isBlocked);
    if (blockedFilter === "active") out = out.filter((u) => !u.isBlocked);

    return out;
  }, [users, searchUser, blockedFilter]);

  /** BOOKINGS FILTERED */
  const filteredBookings = useMemo(() => {
    let out = [...bookings];

    if (searchBooking) {
      const s = searchBooking.toLowerCase();
      out = out.filter(
        (b) =>
          b.customer.firstName.toLowerCase().includes(s) ||
          b.customer.lastName.toLowerCase().includes(s)
      );
    }

    if (searchBookingId) {
      out = out.filter((b) =>
        b._id.toLowerCase().includes(searchBookingId.toLowerCase())
      );
    }

    if (statusFilter) {
      out = out.filter((b) => b.status === statusFilter);
    }

    if (brandFilter) {
      out = out.filter((b) =>
        b.device.brand.toLowerCase().includes(brandFilter.toLowerCase())
      );
    }

    if (dateSort === "oldest") {
      out = out.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      out = out.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return out;
  }, [
    bookings,
    searchBooking,
    searchBookingId,
    statusFilter,
    brandFilter,
    dateSort,
  ]);

  /* -----------------------------------
        RENDER
  ----------------------------------- */
  return (
    <div className="flex w-full min-h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* LEFT SIDEBAR FILTERS */}
      <FilterSidebar
        activeTab={activeTab}
        searchUser={searchUser}
        setSearchUser={setSearchUser}
        blockedFilter={blockedFilter}
        setBlockedFilter={setBlockedFilter}
        searchBooking={searchBooking}
        setSearchBooking={setSearchBooking}
        searchBookingId={searchBookingId}
        setSearchBookingId={setSearchBookingId}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        brandFilter={brandFilter}
        setBrandFilter={setBrandFilter}
        dateSort={dateSort}
        setDateSort={setDateSort}
      />

      {/* MAIN AREA */}
      <main className="flex-1 p-8">

        {/* TABS */}
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeTab === "users"
                ? "bg-blue-600"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <Users size={18} /> Manage Users
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              activeTab === "bookings"
                ? "bg-blue-600"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <ClipboardList size={18} /> Manage Bookings
          </button>
        </div>

        {/* USERS LIST */}
        {activeTab === "users" && (
          <div className="space-y-4">
            {filteredUsers.map((u) => (
              <UserCard
                key={u._id}
                user={u}
                toggleBlock={toggleBlock}
                setSelectedUser={setSelectedUser}
              />
            ))}
          </div>
        )}

        {/* BOOKINGS LIST */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            {filteredBookings.map((b) => (
              <BookingCard
                key={b._id}
                booking={b}
                updateStatus={updateStatus}
                openBooking={() =>
                  router.push(`/dashboard/booking/${b._id}`)
                }
              />
            ))}
          </div>
        )}
      </main>

      {/* USER DETAILS SLIDE-IN PANEL */}
      <UserDetailsPanel
        user={selectedUser}
        close={() => setSelectedUser(null)}
      />
    </div>
  );
}
