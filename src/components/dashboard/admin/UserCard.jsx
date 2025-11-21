export default function UserCard({ user, toggleBlock, setSelectedUser }) {
  return (
    <div className="p-4 bg-white/10 border border-white/20 rounded-xl flex justify-between items-center">
      <div>
        <p className="font-semibold">
          {user.firstName} {user.lastName}
        </p>
        <p className="opacity-70 text-sm">{user.email}</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setSelectedUser(user)}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          View
        </button>

        <button
          onClick={() => toggleBlock(user._id)}
          className={`px-3 py-1 rounded-lg ${
            user.isBlocked
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {user.isBlocked ? "Unblock" : "Block"}
        </button>
      </div>
    </div>
  );
}

