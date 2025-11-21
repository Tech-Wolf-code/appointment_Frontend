"use client";

import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function SuperAdminUserCard({
  user,
  onPromote, // function(id) provided by parent
  toggleBlock, // function(id)
  setSelectedUser,
}) {
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handlePromote = async () => {
    setLoading(true);
    try {
      await onPromote(user._id);
    } catch (err) {
      console.error("promote:", err);
      alert("Failed to promote user.");
    } finally {
      setLoading(false);
      setOpenConfirm(false);
    }
  };

  return (
    <>
      <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center">
        <div>
          <p className="font-semibold">
            {user.firstName} {user.lastName}
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

          <button
            onClick={() => setOpenConfirm(true)}
            disabled={loading}
            className="px-3 py-1 bg-amber-600 hover:bg-amber-700 rounded-lg"
            title="Promote to Admin"
          >
            {loading ? "Promoting..." : "Promote"}
          </button>
        </div>
      </div>

      <ConfirmModal
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        title="Promote user to Admin"
        description={`Are you sure you want to promote ${user.firstName} ${user.lastName} to admin? This will grant admin privileges.`}
        confirmLabel="Yes, Promote"
        onConfirm={handlePromote}
      />
    </>
  );
}
