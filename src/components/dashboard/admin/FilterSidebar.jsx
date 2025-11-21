export default function FilterSidebar({
  activeTab,
  searchUser,
  setSearchUser,
  blockedFilter,
  setBlockedFilter,
  searchBooking,
  setSearchBooking,
  searchBookingId,
  setSearchBookingId,
  statusFilter,
  setStatusFilter,
  brandFilter,
  setBrandFilter,
  dateSort,
  setDateSort,
}) {
  return (
    <aside className="w-72 bg-gray-800 border-r border-white/10 p-6 space-y-6 hidden md:block">
      <h3 className="text-xl font-semibold mb-4">Filters</h3>

      {/* USERS FILTERS */}
      {activeTab === "users" && (
        <div className="space-y-4">
          <input
            placeholder="Search user name/email"
            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />

          <select
            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg"
            value={blockedFilter}
            onChange={(e) => setBlockedFilter(e.target.value)}
          >
            <option value="">All Users</option>
            <option value="active">Active Only</option>
            <option value="blocked">Blocked Only</option>
          </select>
        </div>
      )}

      {/* BOOKINGS FILTERS */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          <input
            placeholder="Search user name"
            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg"
            value={searchBooking}
            onChange={(e) => setSearchBooking(e.target.value)}
          />

          <input
            placeholder="Search Booking ID"
            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg"
            value={searchBookingId}
            onChange={(e) => setSearchBookingId(e.target.value)}
          />

          <select
            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            placeholder="Filter by brand"
            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg"
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          />

          <select
            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg"
            value={dateSort}
            onChange={(e) => setDateSort(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      )}
    </aside>
  );
}
