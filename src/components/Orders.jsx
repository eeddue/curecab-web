import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Loader from "./Loader";
import { setOrders } from "../redux/features/OrderSlice";

function Orders() {
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((store) => store.auth);
  const { orders } = useSelector((store) => store.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/orders/clients/${user.phone}`
        );

        dispatch(setOrders(data.orders));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return toast.error(error.response.data.msg);
      }
    };
    fetchOrders();
  }, [user.phone]);

  const getStyles = (status) => {
    if (status === "approaving") return "bg-[#FCF4C7] text-[#854E23]";
    if (status === "rejected") return "bg-[#F8EAE9] text-[#752E32]";
    return "bg-[#C8F7DF] text-[#559982] px-4";
  };

  if (loading) return <Loader />;

  return (
    <section className="max-w-[700px] mx-auto p-5">
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
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.orderId} className="h-[45px] text-lblack">
                  <td className="md:text-md text-[14px]">
                    {moment(order.createdAt).format("L") +
                      " - " +
                      moment(order.createdAt).format("LT")}
                  </td>
                  <td className="md:text-md text-[14px]">{order.orderId}</td>
                  <td className="text-black md:text-md text-[14px]">
                    {order.deviveryFee > 0 ? `Ksh ${order.deliveryFee}` : "-"}
                  </td>
                  <td className="md:text-md text-[14px]">
                    <span
                      className={`px-4 rounded-md ${getStyles(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <div>You haven't made any orders yet.</div>
      )}
    </section>
  );
}

export default Orders;
