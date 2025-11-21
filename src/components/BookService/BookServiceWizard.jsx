"use client";

import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import ProgressBar from "./ProgressBar";
import ConfirmMessage from "./ConfirmMessage";
import api from "@/utils/axiosInstance";

export default function BookServiceWizard() {
  const [step, setStep] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    code: "+91",
    phone: "",
    email: "",
    brand: "",
    deviceType: "",
    otherDevice: "",
    model: "",
    issues: [],
    otherIssue: "",
    issueDescription: "",
    address: "",
    date: "",
    timeSlot: "",
    manualTime: "",
    bookingId: null, // <-- store backend booking ID
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);
  const goTo = (n) => setStep(n);

  const cancel = () => {
    setStep(1);
    setData({
      firstName: "",
      lastName: "",
      code: "+91",
      phone: "",
      email: "",
      brand: "",
      deviceType: "",
      otherDevice: "",
      model: "",
      issues: [],
      otherIssue: "",
      issueDescription: "",
      address: "",
      date: "",
      timeSlot: "",
      manualTime: "",
      bookingId: null,
    });
  };

  /** 🔥 UPDATED SUBMIT FUNCTION */
const submit = async () => {
  try {
    const finalTime =
      data.timeSlot === "Manual" ? data.manualTime : data.timeSlot;

    const payload = {
      customer: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        countryCode: data.code,
      },
      device: {
        brand: data.brand,
        deviceType:
          data.deviceType === "Other" ? data.otherDevice : data.deviceType,
        model: data.model,
        otherDevice: data.otherDevice,
      },
      issue: {
        issues: data.issues,
        otherIssue: data.otherIssue,
        description: data.issueDescription,
      },
      appointment: {
        date: data.date,
        timeSlot: finalTime,
        address: data.address,
      },
    };

    const res = await api.post("/bookings", payload); // MUST BE AUTHENTICATED

    // store booking id
    setData((prev) => ({
      ...prev,
      bookingId: res.data.bookingId,
    }));

    setShowConfirm(true); // only after success
  } catch (err) {
    console.error("BOOKING ERROR:", err);

    const msg = err.response?.data?.message || "Booking failed";
    alert("❌ " + msg);

    return; // VERY IMPORTANT → stops redirect
  }
};


  return (
    <div className="relative w-full">
      {!showConfirm && (
        <ProgressBar
          step={step}
          labels={["Basic Details", "Appointment Details", "Review"]}
        />
      )}

      <div className="glass-card p-6 mt-6">
        {showConfirm ? (
          <ConfirmMessage bookingId={data.bookingId} />
        ) : step === 1 ? (
          <Step1 data={data} setData={setData} next={next} cancel={cancel} />
        ) : step === 2 ? (
          <Step2 data={data} setData={setData} next={next} back={back} />
        ) : (
          <Step3 data={data} back={back} submit={submit} goTo={goTo} />
        )}
      </div>
    </div>
  );
}
