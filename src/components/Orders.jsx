import { useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([1, 2, 3, 4, 5, 6, 7]);

  const getStyles = (i) => {
    const isEven = i % 2 === 0;
    if (isEven) return "bg-[#FCF4C7] text-[#854E23] px-4 rounded-md";
    return "bg-[#C8F7DF] text-[#559982] px-4 rounded-md";
  };

  return (
    <section className="max-w-[700px] mx-auto p-5">
      <h1 className="text-xl">Order history</h1>
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
            {orders.map((order, i) => (
              <tr key={i} className="h-[45px] text-lblack">
                <td className="">21/12/2022</td>
                <td className="">277834043</td>
                <td className="text-black">Ksh 230</td>
                <td className="">
                  <span className={getStyles(i)}>Delivered</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default Orders;
