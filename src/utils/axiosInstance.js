import axios from "axios";
import { store } from "@/redux/store";
import { loginSuccess, logout } from "@/redux/userSlice";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().user;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refreshRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshRes.data.accessToken;
        const savedUser = JSON.parse(localStorage.getItem("user"));

        store.dispatch(
          loginSuccess({
            user: savedUser,
            accessToken: newAccessToken,
          })
        );

        original.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(original);

      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
