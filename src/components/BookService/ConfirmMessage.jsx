"use client";

export default function ConfirmMessage({ bookingId }) {
  return (
    <div className="text-center space-y-4 py-12">
      <h2 className="text-3xl font-bold text-green-400">Thank you!</h2>

      <p className="text-white/80 text-lg">
        Our team will contact you soon with details.
      </p>

      <p className="text-xl text-white">
        Booking ID:{" "}
        <span className="text-green-300 font-bold">
          {bookingId || "Not Provided"}
        </span>
      </p>
    </div>
  );
}
