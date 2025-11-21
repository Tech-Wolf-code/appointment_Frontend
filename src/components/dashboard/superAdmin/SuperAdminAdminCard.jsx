"use client";

import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function SuperAdminAdminCard({
  user,
  onDemote, // function(id)
  toggleBlock, // function(id)
  setSelectedUser,
}) {
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDemote = async () => {
    setLoading(true);
    try {
      await onDemote(user._id);
    } catch (err) {
      console.error("demote:", err);
      alert(err?.response?.data?.message || "Failed to demote admin.");
    } finally {
      setLoading(false);
      setOpenConfirm(false);
    }
  };

  const isSuperAdmin = user.role === "superAdmin";

  return (
    <>
      <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center">
        <div>
          <p className="font-semibold">
            {user.firstName} {user.lastName}{" "}
            {isSuperAdmin && <span className="text-xs opacity-70 ml-2">• superAdmin</span>}
          </p>
          <p className="opacity-70 text-sm">{user.email}</p>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setSelectedUser(user)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            View
          </button>

          <button
            onClick={() => toggleBlock(user._id)}
            className={`px-3 py-1 rounded-lg ${
              user.isBlocked ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {user.isBlocked ? "Unblock" : "Block"}
          </button>

          {/* Demote button should not appear for a superAdmin */}
          {!isSuperAdmin && (
            <button
              onClick={() => setOpenConfirm(true)}
              disabled={loading}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-700 rounded-lg"
              title="Demote to User"
            >
              {loading ? "Demoting..." : "Demote"}
            </button>
          )}
        </div>
      </div>

      <ConfirmModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title="Demote admin to User"
        description={`Are you sure you want to demote ${user.firstName} ${user.lastName} from admin to regular user?`}
        confirmLabel="Yes, Demote"
        onConfirm={handleDemote}
      />
    </>
  );
}
