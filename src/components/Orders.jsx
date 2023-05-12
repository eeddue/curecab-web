import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Loader from "./Loader";

function Orders() {
  const [loading, setLoading] = useState(true);
  const { orders } = useSelector((store) => store.orders);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getStyles = (status) => {
    if (status === "pending") return "bg-[#FCF4C7] text-[#854E23]";
    if (status === "failed") return "bg-[#F8EAE9] text-[#752E32]";
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
