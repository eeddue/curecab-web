import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Loader from "./Loader";
import { Modal } from "@mui/material";
import ConfirmDelivery from "./ConfirmDelivery";
import { setOrders, setSelectedOrder } from "../redux/features/OrderSlice";
import { toast } from "react-hot-toast";
import axios from "axios";

function Orders() {
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { orders, selectedOrder } = useSelector((store) => store.orders);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/orders/patient/" + user.phone
        );
        dispatch(setOrders(data.orders));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        return toast.error(error.response.data.msg);
      }
    })();
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
    <section className="flex flex-col max-w-[800px] mx-auto p-5">
      <h1 className="text-xl">Order history</h1>
      {orders.length > 0 ? (
        <section className="overflow-x-scroll scroll scroll-smooth nobar ">
          <table className="w-full border-collapse min-w-[600px]">
            <thead className="bg-[#C8F7DF]">
              <tr className="w-full">
                <th>order ID</th>
                <th>Order Date</th>
                <th>Delivery fee</th>
                <th>Courier</th>
                <th>Status</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.orderId} className="h-[45px] text-lblack">
                  <td className="md:text-md text-[14px] text-blue">
                    {order.orderId}
                  </td>
                  <td className="md:text-md text-[14px]">
                    {moment(order.orderDate).format("LL")}
                  </td>
                  <td className="text-black md:text-md text-[14px]">
                    <b>
                      {order.delivery_fee > 0
                        ? `Ksh ${order.delivery_fee}`
                        : "-"}
                    </b>
                  </td>
                  <td className="md:text-md text-[14px]">{order.courier}</td>
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
      <Modal open={selectedOrder !== null}>
        <ConfirmDelivery
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      </Modal>
    </section>
  );
}

export default Orders;
