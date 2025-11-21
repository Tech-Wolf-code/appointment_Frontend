"use client";

import { useState } from "react";
import { validateStep1 } from "./useValidation";

export default function Step1({ data, setData, next, cancel }) {
  const [errors, setErrors] = useState({});
  const codes = ["+91", "+1", "+44", "+61", "+971", "Other"];

  const handleNext = () => {
    const validation = validateStep1(data);
    setErrors(validation);
    if (Object.keys(validation).length === 0) next();
  };

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-2xl font-semibold">Basic Details</h2>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label>First Name *</label>
          <input
            className={`input-glass ${errors.firstName && "border-red-400"}`}
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
          {errors.firstName && (
            <p className="error">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label>Last Name *</label>
          <input
            className={`input-glass ${errors.lastName && "border-red-400"}`}
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
          {errors.lastName && (
            <p className="error">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label>Mobile Code *</label>
          <select
            className={`select-glass ${errors.code && "border-red-400"}`}
            value={data.code}
            onChange={(e) => setData({ ...data, code: e.target.value })}
          >
            {codes.map((c) => (
              <option key={c} className="text-black">
                {c}
              </option>
            ))}
          </select>
          {errors.code && <p className="error">{errors.code}</p>}

          {data.code === "Other" && (
            <input
              className="input-glass mt-2"
              placeholder="Enter code"
              onChange={(e) => setData({ ...data, code: e.target.value })}
            />
          )}
        </div>

        <div>
          <label>Contact Number *</label>
          <input
            className={`input-glass ${errors.phone && "border-red-400"}`}
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label>Email *</label>
        <input
          className={`input-glass ${errors.email && "border-red-400"}`}
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        {errors.email && (
          <p className="error">{errors.email}</p>
        )}
      </div>

      <div className="flex justify-between">
        <button onClick={cancel} className="btn-ghost">
          Cancel
        </button>
        <button onClick={handleNext} className="btn-primary">
          Next
        </button>
      </div>
    </div>
  );
}
