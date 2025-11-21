import { createSlice } from "@reduxjs/toolkit";

let stored = null;

if (typeof window !== "undefined") {
  const savedUser = localStorage.getItem("user");
  const savedToken = localStorage.getItem("accessToken");

  if (savedUser && savedToken) {
    stored = {
      user: JSON.parse(savedUser),
      accessToken: savedToken,
      isLogged: true,
      role: JSON.parse(savedUser).role,
    };
  }
}

const initialState =
  stored || {
    user: null,
    accessToken: null,
    isLogged: false,
    role: "user",
  };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.role = user.role;
      state.isLogged = true;

      // persist
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
    },

    loadUserFromStorage(state) {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("accessToken");

      if (savedUser && savedToken) {
        const user = JSON.parse(savedUser);

        state.user = user;
        state.accessToken = savedToken;
        state.role = user.role;
        state.isLogged = true;
      }
    },

    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.role = "user";
      state.isLogged = false;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
});

export const { loginSuccess, loadUserFromStorage, logout } =
  userSlice.actions;

export default userSlice.reducer;
