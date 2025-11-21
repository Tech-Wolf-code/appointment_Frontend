export default function BookingCard({ booking, updateStatus, openBooking }) {
  return (
    <div className="p-4 bg-white/10 border border-white/20 rounded-xl">
      <p className="font-semibold">
        {booking.customer.firstName} {booking.customer.lastName}
      </p>

      <p className="opacity-70 text-sm">
        Device: {booking.device.brand} – {booking.device.deviceType}
      </p>

      <p className="opacity-70 text-sm">
        Issues: {booking.issue.issues.join(", ")}
      </p>

      <p className="text-sm">Date: {booking.appointment.date}</p>

      <div className="flex items-center gap-3 mt-3">
        <select
          value={booking.status}
          onChange={(e) => updateStatus(booking._id, e.target.value)}
          className="bg-black/40 p-2 rounded-lg border"
        >
          <option>pending</option>
          <option>in-progress</option>
          <option>completed</option>
          <option>cancelled</option>
        </select>

        <button
          onClick={openBooking}
          className="px-3 py-1 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          View
        </button>
      </div>
    </div>
  );
}
