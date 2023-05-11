import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    signOut: (state) => {
      localStorage.clear();
      state.user = null;
    },
    setUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    getUser: (state) => {
      state.user = JSON.parse(localStorage.getItem("user"));
    },
  },
});

export const { signOut, setUser, getUser } = AuthSlice.actions;
export default AuthSlice.reducer;
