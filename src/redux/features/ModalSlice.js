import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
  name: "modals",
  initialState: {
    loginOpen: false,
    orderOpen: false,
  },
  reducers: {
    toggleLoginModal: (state) => {
      state.loginOpen = !state.loginOpen;
    },
    toggleOrderModal: (state) => {
      state.orderOpen = !state.orderOpen;
    },
  },
});

export const { toggleLoginModal, toggleOrderModal } = ModalSlice.actions;
export default ModalSlice.reducer;
