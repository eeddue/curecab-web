import { createSlice } from "@reduxjs/toolkit";
import { orders } from "../../../data";

const OrderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [
      ...orders.sort((a, b) => {
        return b.orderDate - a.orderDate;
      }),
    ],
    selectedOrder: null,
    orderModalOpen: false,
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    updateOrders: (state, action) => {
      state.orders = [...state.orders, action.payload];
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    toggleOrder: (state) => {
      state.orderModalOpen = !state.orderModalOpen;
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
