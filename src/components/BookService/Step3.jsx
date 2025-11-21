"use client";

export default function Step3({ data, back, submit }) {
  return (
    <div className="space-y-6 text-white">
      <h2 className="text-2xl font-semibold">Review Your Information</h2>

      {/* Customer */}
      <div className="review-card">
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
        <p><strong>Phone:</strong> {data.code} {data.phone}</p>
        <p><strong>Email:</strong> {data.email}</p>
      </div>

      {/* Device */}
      <div className="review-card">
        <h3>Device Information</h3>
        <p><strong>Brand:</strong> {data.brand}</p>
        <p>
          <strong>Device:</strong> {data.deviceType}{" "}
          {data.otherDevice && `(${data.otherDevice})`}
        </p>
        <p><strong>Model:</strong> {data.model}</p>
      </div>

      {/* Issues */}
      <div className="review-card">
        <h3>Issue Details</h3>
        <p><strong>Issues:</strong> {data.issues.join(", ")}</p>
        {data.otherIssue && (
          <p><strong>Other Issue:</strong> {data.otherIssue}</p>
        )}
        <p>
          <strong>Description:</strong>{" "}
          {data.issueDescription || "No description added"}
        </p>
      </div>

      {/* Appointment */}
      <div className="review-card">
        <h3>Appointment Details</h3>
        <p><strong>Date:</strong> {data.date}</p>
        <p>
          <strong>Time:</strong>{" "}
          {data.timeSlot === "Manual" ? data.manualTime : data.timeSlot}
        </p>
        <p><strong>Address:</strong> {data.address}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button type="button" onClick={back} className="btn-ghost">
          Back
        </button>
        <button type="button" onClick={submit} className="btn-confirm">
          Confirm & Submit
        </button>
      </div>
    </div>
  );
}
