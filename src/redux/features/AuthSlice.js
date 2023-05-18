import { createSlice } from "@reduxjs/toolkit";
import { getUserNextOrderDate } from "../../../data";

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
    setUserNextOrder: (state, action) => {
      state.user = {
        ...state.user,
        next_order: getUserNextOrderDate(action.payload),
      };
    },
  },
});

export const { signOut, setUser, getUser, setUserNextOrder } =
  AuthSlice.actions;
export default AuthSlice.reducer;
