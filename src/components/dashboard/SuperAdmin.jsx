"use client";

import { useEffect, useState, useMemo } from "react";
import api from "@/utils/axiosInstance";
import { Users, ShieldCheck, ClipboardList, Search } from "lucide-react";
import { useRouter } from "next/navigation";

// Reuse admin components
import FilterSidebar from "@/components/dashboard/admin/FilterSidebar";
import BookingCard from "@/components/dashboard/admin/BookingCard";
import UserDetailsPanel from "@/components/dashboard/admin/UserDetailsPanel";

// New super-admin components
import SuperAdminUserCard from "@/components/dashboard/superAdmin/SuperAdminUserCard";
import SuperAdminAdminCard from "@/components/dashboard/superAdmin/SuperAdminAdminCard";

export default function SuperAdmin() {
  const [tab, setTab] = useState("users");

  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Filters
  const [searchUser, setSearchUser] = useState("");
  const [searchAdmin, setSearchAdmin] = useState("");
  const [searchBooking, setSearchBooking] = useState("");
  const [searchBookingId, setSearchBookingId] = useState("");

  const [bookingStatus, setBookingStatus] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [dateSort, setDateSort] = useState("newest");
  const [blockedFilter, setBlockedFilter] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const router = useRouter();

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    await Promise.all([fetchUsers(), fetchAdmins(), fetchBookings()]);
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/super-admin/users");
      setUsers(res.data.users.filter((u) => u.role === "user"));
    } catch (err) {
      console.error("super admin fetch users:", err);
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await api.get("/super-admin/admins");
      setAdmins(res.data.admins || []);
    } catch (err) {
      console.error("super admin fetch admins:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get("/admin/bookings");
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("super admin fetch bookings:", err);
    }
  };

  /* ---------------- ROLE ACTIONS ---------------- */
  const promote = async (id) => {
    try {
      await api.patch(`/super-admin/promote/${id}`);
      fetchAll();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to promote user.");
    }
  };

  const demote = async (id) => {
    try {
      await api.patch(`/super-admin/demote/${id}`);
      fetchAll();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to demote admin.");
    }
  };

  const toggleBlock = async (id) => {
    try {
      await api.patch(`/admin/users/${id}/toggle-block`);
      fetchAll();
    } catch (err) {
      console.error("toggleBlock:", err);
    }
  };

  /* ---------------- UPDATE BOOKING STATUS (FIX) ---------------- */
  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/bookings/admin/${id}/status`, { status });
      fetchBookings();
    } catch (err) {
      console.error("status update error:", err);
      alert("Failed to update booking status");
    }
  };

  /* ---------------- FILTERS ---------------- */
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const match = `${u.firstName} ${u.lastName} ${u.email}`
        .toLowerCase()
        .includes(searchUser.toLowerCase());

      if (blockedFilter === "blocked" && !u.isBlocked) return false;
      if (blockedFilter === "active" && u.isBlocked) return false;

      return match;
    });
  }, [users, searchUser, blockedFilter]);

  const filteredAdmins = useMemo(() => {
    return admins.filter((u) =>
      `${u.firstName} ${u.lastName} ${u.email}`
        .toLowerCase()
        .includes(searchAdmin.toLowerCase())
    );
  }, [admins, searchAdmin]);

  const filteredBookings = useMemo(() => {
    let out = bookings.filter((b) => {
      const s = searchBooking.toLowerCase();

      const match =
        b.customer.firstName.toLowerCase().includes(s) ||
        b.customer.lastName.toLowerCase().includes(s) ||
        b._id.toLowerCase().includes(searchBookingId.toLowerCase());

      const statusMatch = bookingStatus ? b.status === bookingStatus : true;

      const brandMatch = brandFilter
        ? b.device.brand.toLowerCase().includes(brandFilter.toLowerCase())
        : true;

      return match && statusMatch && brandMatch;
    });

    if (dateSort === "newest")
      out.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else out.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return out;
  }, [
    bookings,
    searchBooking,
    searchBookingId,
    bookingStatus,
    brandFilter,
    dateSort,
  ]);

  /* ---------------- UI ---------------- */
  return (
    <div className="relative text-white p-6 space-y-6 min-h-screen">
      <h2 className="text-3xl font-bold">Super Admin Dashboard</h2>

      {/* TABS */}
      <div className="flex gap-3 border-b border-white/20 pb-2">
        <TabBtn tab="users" activeTab={tab} setTab={setTab} icon={<Users />} label="Manage Users" />
        <TabBtn tab="admins" activeTab={tab} setTab={setTab} icon={<ShieldCheck />} label="Manage Admins" />
        <TabBtn tab="bookings" activeTab={tab} setTab={setTab} icon={<ClipboardList />} label="Manage Bookings" />
      </div>

      {/* USERS TAB */}
      {tab === "users" && (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <div className="h-full">
            <FilterSidebar
              activeTab="users"
              searchUser={searchUser}
              setSearchUser={setSearchUser}
              blockedFilter={blockedFilter}
              setBlockedFilter={setBlockedFilter}
            />
          </div>

          <div className="glass-card p-5 rounded-xl space-y-6">
            <h3 className="text-xl font-semibold">All Users</h3>

            {filteredUsers.length === 0 ? (
              <p className="opacity-50">No users found</p>
            ) : (
              filteredUsers.map((u) => (
                <SuperAdminUserCard
                  key={u._id}
                  user={u}
                  onPromote={promote}
                  toggleBlock={toggleBlock}
                  setSelectedUser={setSelectedUser}
                />
              ))
            )}

            <h3 className="text-xl font-semibold mt-6 pt-4 border-t border-white/10">
              Admins
            </h3>

            {admins.length === 0 ? (
              <p className="opacity-50">No admins found</p>
            ) : (
              admins.map((u) => (
                <SuperAdminAdminCard
                  key={u._id}
                  user={u}
                  onDemote={demote}
                  toggleBlock={toggleBlock}
                  setSelectedUser={setSelectedUser}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* ADMINS TAB */}
      {tab === "admins" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/20 w-full md:w-1/2">
            <Search size={18} className="opacity-60" />
            <input
              placeholder="Search admins..."
              className="bg-transparent w-full outline-none"
              value={searchAdmin}
              onChange={(e) => setSearchAdmin(e.target.value)}
            />
          </div>

          <div className="glass-card p-5 rounded-xl space-y-4">
            {filteredAdmins.length === 0 ? (
              <p className="opacity-50">No admins found</p>
            ) : (
              filteredAdmins.map((u) => (
                <SuperAdminAdminCard
                  key={u._id}
                  user={u}
                  onDemote={demote}
                  toggleBlock={toggleBlock}
                  setSelectedUser={setSelectedUser}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* BOOKINGS TAB */}
      {tab === "bookings" && (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <div className="h-full">
            <FilterSidebar
              activeTab="bookings"
              searchBooking={searchBooking}
              setSearchBooking={setSearchBooking}
              searchBookingId={searchBookingId}
              setSearchBookingId={setSearchBookingId}
              statusFilter={bookingStatus}
              setStatusFilter={setBookingStatus}
              brandFilter={brandFilter}
              setBrandFilter={setBrandFilter}
              dateSort={dateSort}
              setDateSort={setDateSort}
            />
          </div>

          <div className="glass-card p-5 rounded-xl space-y-4">
            {filteredBookings.length === 0 ? (
              <p className="opacity-50">No bookings found</p>
            ) : (
              filteredBookings.map((b) => (
                <BookingCard
                  key={b._id}
                  booking={b}
                  updateStatus={updateStatus}
                  openBooking={() => router.push(`/dashboard/booking/${b._id}`)}
                />
              ))
            )}
          </div>
        </div>
      )}

      <UserDetailsPanel
        user={selectedUser}
        close={() => setSelectedUser(null)}
      />
    </div>
  );
}

/* ---------------- Helper ---------------- */
const TabBtn = ({ tab, activeTab, setTab, icon, label }) => (
  <button
    onClick={() => setTab(tab)}
    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
      activeTab === tab ? "bg-blue-600" : "bg-white/10 hover:bg-white/20"
    }`}
  >
    {icon} {label}
  </button>
);
