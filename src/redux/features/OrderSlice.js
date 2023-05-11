import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    updateOrders: (state, action) => {
      state.orders = [...state.orders, action.payload];
      state.orders.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    },
  },
});

export const { setOrders, updateOrders } = OrderSlice.actions;
export default OrderSlice.reducer;
