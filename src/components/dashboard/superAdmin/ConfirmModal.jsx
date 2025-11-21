"use client";

import React from "react";
import { X } from "lucide-react";

export default function ConfirmModal({
  open,
  onClose,
  title,
  description,
  confirmLabel = "Confirm",
  onConfirm,
}) {
  if (!open) return null;

  return (
    // Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative z-10 max-w-lg w-full bg-gray-800 text-white rounded-xl border border-white/10 p-6 shadow-lg">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && <p className="text-sm opacity-70 mt-1">{description}</p>}
          </div>
          <button onClick={onClose} className="opacity-70 hover:opacity-100">
            <X size={20} />
          </button>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
