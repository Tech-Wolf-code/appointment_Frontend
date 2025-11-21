"use client";

import { useState } from "react";
import { validateStep2 } from "./useValidation";

export default function Step2({ data, setData, next, back }) {
  const brands = ["HP", "Dell", "Lenovo", "Asus", "Acer", "Apple", "Other"];
  const deviceTypes = ["Laptop", "PC", "Mobile", "Tablet", "Other"];
  const issuesList = [
    "Screen Damage",
    "Display Flickering",
    "Keyboard Issue",
    "Battery Issue",
    "Charging Issue",
    "Overheating",
    "Motherboard",
    "Slow Performance",
    "Wi-Fi/Bluetooth",
    "Speaker/Camera",
  ];

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const validation = validateStep2(data);
    setErrors(validation);
    if (Object.keys(validation).length === 0) next();
  };

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-2xl font-semibold">Appointment Details</h2>

      {/* Brand + Device Type */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Brand */}
        <div>
          <label>Brand <span className="text-red-400">*</span></label>
          <select
            className={`select-glass ${errors.brand && "border-red-400"}`}
            value={data.brand}
            onChange={(e) => setData({ ...data, brand: e.target.value })}
          >
            <option value="" className="text-black">Select brand</option>
            {brands.map((b) => (
              <option key={b} className="text-black">{b}</option>
            ))}
          </select>
          {errors.brand && <p className="error">{errors.brand}</p>}

          {data.brand === "Other" && (
            <input
              className="input-glass mt-2"
              placeholder="Specify brand"
              onChange={(e) => setData({ ...data, brand: e.target.value })}
            />
          )}
        </div>

        {/* Device Type */}
        <div>
          <label>Device Type <span className="text-red-400">*</span></label>

          <div className="grid grid-cols-3 gap-2">
            {deviceTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setData({ ...data, deviceType: type })}
                className={`p-3 rounded-xl border 
                  ${
                    data.deviceType === type
                      ? "bg-blue-600 border-blue-400"
                      : "bg-white/10 border-white/20"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>

          {data.deviceType === "Other" && (
            <>
              <input
                placeholder="Specify device"
                className={`input-glass mt-2 ${
                  errors.otherDevice && "border-red-400"
                }`}
                value={data.otherDevice}
                onChange={(e) =>
                  setData({ ...data, otherDevice: e.target.value })
                }
              />
              {errors.otherDevice && (
                <p className="error">{errors.otherDevice}</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Model */}
      <div>
        <label>Model Name</label>
        <input
          className="input-glass"
          value={data.model}
          onChange={(e) => setData({ ...data, model: e.target.value })}
        />
      </div>

      {/* Issue Type */}
      <div>
        <label>Issue Type <span className="text-red-400">*</span></label>

        <div className="grid md:grid-cols-2 gap-3">
          {issuesList.map((issue) => (
            <button
              key={issue}
              type="button"
              onClick={() => {
                const updated = data.issues.includes(issue)
                  ? data.issues.filter((i) => i !== issue)
                  : [...data.issues, issue];

                setData({ ...data, issues: updated });
              }}
              className={`p-3 rounded-xl border ${
                data.issues.includes(issue)
                  ? "bg-blue-600 border-blue-400"
                  : "bg-white/10 border-white/20"
              }`}
            >
              {issue}
            </button>
          ))}
        </div>

        {errors.issues && <p className="error">{errors.issues}</p>}

        {/* Other Issue */}
        <button
          type="button"
          className="text-blue-300 underline mt-2"
          onClick={() => {
            if (!data.issues.includes("Other"))
              setData({ ...data, issues: [...data.issues, "Other"] });
          }}
        >
          + Other Issue
        </button>

        {data.issues.includes("Other") && (
          <input
            placeholder="Describe issue"
            className="input-glass mt-2"
            value={data.otherIssue}
            onChange={(e) => setData({ ...data, otherIssue: e.target.value })}
          />
        )}
      </div>

      {/* Issue Description */}
      <div>
        <label>Issue Description</label>
        <textarea
          rows={3}
          className="textarea-glass"
          value={data.issueDescription}
          onChange={(e) =>
            setData({ ...data, issueDescription: e.target.value })
          }
        />
      </div>

      {/* Address */}
      <div>
        <label>Service Address <span className="text-red-400">*</span></label>
        <textarea
          className={`textarea-glass ${errors.address && "border-red-400"}`}
          rows={3}
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
        {errors.address && <p className="error">{errors.address}</p>}
      </div>

      {/* Date + Time */}
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label>Appointment Date <span className="text-red-400">*</span></label>
          <input
            type="date"
            className={`input-glass ${errors.date && "border-red-400"}`}
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
          {errors.date && <p className="error">{errors.date}</p>}
        </div>

        <div>
          <label>Preferred Time <span className="text-red-400">*</span></label>

          <div className="flex gap-2">
            {["Morning", "Afternoon", "Evening"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() =>
                  setData({ ...data, timeSlot: t, manualTime: "" })
                }
                className={`flex-1 p-3 rounded-xl border ${
                  data.timeSlot === t
                    ? "bg-blue-600 border-blue-400"
                    : "bg-white/10 border-white/20"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="text-blue-300 underline mt-2"
            onClick={() => setData({ ...data, timeSlot: "Manual" })}
          >
            Enter Manual Time
          </button>

          {data.timeSlot === "Manual" && (
            <input
              type="time"
              className={`input-glass mt-2 ${
                errors.manualTime && "border-red-400"
              }`}
              value={data.manualTime}
              onChange={(e) =>
                setData({ ...data, manualTime: e.target.value })
              }
            />
          )}

          {errors.timeSlot && (
            <p className="error">{errors.timeSlot}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button type="button" onClick={back} className="btn-ghost">
          Back
        </button>
        <button type="button" onClick={handleNext} className="btn-primary">
          Next
        </button>
      </div>
    </div>
  );
}
