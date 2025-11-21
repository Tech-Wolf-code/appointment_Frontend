import { logout } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import api from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleLogout() {
    await api.post("/auth/logout");
    dispatch(logout());
    router.push("/");
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
