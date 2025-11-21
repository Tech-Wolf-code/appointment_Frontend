"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import { useSelector } from "react-redux";
import { use } from "react";
import { useRouter } from "next/navigation";

/* ---------------- ICONS (with padding fix) ---------------- */
const IconWrapper = ({ children }) => (
  <div className="p-2 bg-white/10 rounded-lg flex items-center justify-center">
    {children}
  </div>
);

const ArrowLeft = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="flex-shrink-0">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const UserIcon = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="flex-shrink-0">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const CalendarIcon = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="flex-shrink-0">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const Smartphone = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="flex-shrink-0">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12" y2="18"/>
  </svg>
);

const Clipboard = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="flex-shrink-0">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
  </svg>
);

/* ---------------- STATUS PILL ---------------- */
const StatusPill = ({ status }) => {
  const base =
    "px-3 py-1 text-xs font-medium rounded-full capitalize shadow-sm tracking-wide";

  const map = {
    completed: "bg-green-500/20 text-green-300 border border-green-500/30",
    "in-progress": "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    cancelled: "bg-red-500/20 text-red-300 border border-red-500/30",
    pending: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  };

  return <span className={`${base} ${map[status]}`}>{status}</span>;
};

/* ---------------- DETAIL SECTION ---------------- */
const DetailSection = ({ title, icon, children }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
    <div className="flex items-center gap-3 mb-4">
      <IconWrapper>{icon}</IconWrapper>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

const InfoPair = ({ label, value }) => (
  <p className="text-sm leading-relaxed">
    <span className="opacity-70 pr-1">{label}:</span>
    <span className="font-medium">{value}</span>
  </p>
);

/* ---------------- MAIN COMPONENT ---------------- */
export default function BookingDetails({ params }) {
  const { id } = use(params); 
  const { role } = useSelector((state) => state.user);
  const router = useRouter();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const endpoint =
        role === "admin" || role === "superAdmin"
          ? `/bookings/admin/${id}`
          : `/bookings/${id}`;

      const res = await api.get(endpoint);
      setBooking(res.data.booking);
    } catch (err) {
      console.error("Error fetching booking:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <p className="text-center p-10 text-white">Loading booking...</p>;

  if (!booking)
    return (
      <p className="text-center text-red-400 p-10">Booking not found</p>
    );

  return (
    <div className="p-6 md:p-10 text-white">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-3 px-5 py-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 active:scale-95 transition-all mb-8"
      >
        <ArrowLeft size={20} /> <span>Back</span>
      </button>

      <h2 className="text-3xl font-bold mb-8 tracking-wide">Booking Details</h2>

      {/* MAIN CARD */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5 mb-10 pb-6 border-b border-white/15">
          <div>
            <p className="text-sm opacity-60">Booking ID</p>
            <p className="text-lg font-mono font-medium mt-1">{booking._id}</p>
          </div>

          <div className="flex flex-col sm:items-end">
            <p className="text-sm opacity-60">Status</p>
            <StatusPill status={booking.status} />
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="space-y-8">
            <DetailSection title="Customer Details" icon={<UserIcon />}>
              <InfoPair
                label="Name"
                value={`${booking.customer.firstName} ${booking.customer.lastName}`}
              />
              <InfoPair label="Email" value={booking.customer.email} />
              <InfoPair
                label="Phone"
                value={`${booking.customer.countryCode} ${booking.customer.phone}`}
              />
            </DetailSection>

            <DetailSection title="Appointment" icon={<CalendarIcon />}>
              <InfoPair label="Date" value={booking.appointment.date} />
              <InfoPair label="Time Slot" value={booking.appointment.timeSlot} />
              <InfoPair label="Address" value={booking.appointment.address} />
            </DetailSection>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            <DetailSection title="Device" icon={<Smartphone />}>
              <InfoPair label="Brand" value={booking.device.brand} />
              <InfoPair label="Device Type" value={booking.device.deviceType} />
              <InfoPair label="Model" value={booking.device.model} />
            </DetailSection>

            <DetailSection title="Issue Reported" icon={<Clipboard />}>
              <InfoPair
                label="Issues"
                value={booking.issue.issues?.join(", ") || "N/A"}
              />
              <InfoPair label="Description" value={booking.issue.description} />
            </DetailSection>
          </div>
        </div>
      </div>
    </div>
  );
}
