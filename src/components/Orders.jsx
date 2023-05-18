import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Loader from "./Loader";
import { Modal } from "@mui/material";
import ConfirmDelivery from "./ConfirmDelivery";
import { setSelectedOrder, toggleOrder } from "../redux/features/OrderSlice";

function Orders() {
  const [loading, setLoading] = useState(true);
  const { orders, selectedOrder, orderModalOpen } = useSelector(
    (store) => store.orders
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getStyles = (status) => {
    if (status === "pending") return "bg-[#FCF4C7] text-[#854E23]";
    if (status === "cancelled") return "bg-[#F8EAE9] text-[#752E32]";
    if (status === "on-transit") return "bg-[#1593EE] text-white";
    return "bg-[#C8F7DF] text-[#559982]";
  };

  const getText = (delivered, status) => {
    if (status === "cancelled") return "NO";
    if (delivered) return "YES";
    if (status === "on-transit") return "CONFIRM";
    return "-";
  };

  const getTextStyles = (delivered, status) => {
    if (delivered) return "text-green";
    if (status === "on-transit") return "text-white bg-red";
  };

  if (loading) return <Loader />;

  return (
    <section className="max-w-[800px] mx-auto p-5">
      <h1 className="text-xl">Order history</h1>
      {orders.length > 0 ? (
        <section className="overflow-x-scroll scroll scroll-smooth nobar ">
          <table className="w-full border-collapse mt-3 w-full min-w-[600px]">
            <thead className="bg-[#C8F7DF]">
              <tr className="w-full">
                <th>Date</th>
                <th>order ID</th>
                <th>Delivery fee</th>
                <th>Status</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.orderId} className="h-[45px] text-lblack">
                  <td className="md:text-md text-[14px]">
                    {moment(order.orderDate).format("L") +
                      " - " +
                      moment(order.orderDate).format("LT")}
                  </td>
                  <td className="md:text-md text-[14px]">{order.orderId}</td>
                  <td className="text-black md:text-md text-[14px]">
                    {order.deliveryFee > 0 ? `Ksh ${order.deliveryFee}` : "-"}
                  </td>
                  <td className="md:text-md text-[14px]">
                    <span
                      className={`px-4 py-1 rounded-md ${getStyles(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="md:text-md text-[14px] w-[150px]">
                    <button
                      disabled={
                        order.delivered ||
                        order.status === "cancelled" ||
                        order.status === "pending"
                      }
                      className={`w-full py-2 rounded-sm px-2 font-bold text-black ${getTextStyles(
                        order.delivered,
                        order.status
                      )}`}
                      onClick={() => {
                        dispatch(toggleOrder());
                        dispatch(setSelectedOrder(order));
                      }}
                    >
                      {getText(order.delivered, order.status)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <div>You haven't made any orders yet.</div>
      )}
      <Modal open={orderModalOpen}>
        <ConfirmDelivery
          selectedOrder={selectedOrder}
          toggleOrder={toggleOrder}
        />
      </Modal>
    </section>
  );
}

export default Orders;
