import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    selectedOrder: null,
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload.sort((a, b) => {
        return (
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
      });
    },
    updateOrders: (state, action) => {
      state.orders = [...state.orders, action.payload];
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    updateOrdersData: (state, action) => {
      const orderToChange = state.orders.find(
        (o) => o.orderId === action.payload
      );
      orderToChange.status = "delivered";
      orderToChange.delivered = true;
    },
  },
});

export const {
  setOrders,
  updateOrders,
  setSelectedOrder,
  toggleOrder,
  updateOrdersData,
} = OrderSlice.actions;
export default OrderSlice.reducer;
