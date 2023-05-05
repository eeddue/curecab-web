import { configureStore } from "@reduxjs/toolkit";
import ModalSlice from "./features/ModalSlice";

const store = configureStore({
  reducer: {
    modals: ModalSlice,
  },
});

export default store;
