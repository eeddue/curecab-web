import { createSlice } from "@reduxjs/toolkit";
import { orders } from "../../../data";

const OrderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [...orders],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    updateOrders: (state, action) => {
      state.orders = [...state.orders, action.payload];
    },
  },
});

export const { setOrders, updateOrders } = OrderSlice.actions;
export default OrderSlice.reducer;
