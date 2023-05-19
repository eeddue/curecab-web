import { useDispatch } from "react-redux";
import { updateOrdersData } from "../redux/features/OrderSlice";
import moment from "moment";
import { toast } from "react-hot-toast";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useState } from "react";
import axios from "axios";

const ConfirmDelivery = ({ selectedOrder, setSelectedOrder }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.patch(
        "http://localhost:5000/api/v1/orders/update/" + selectedOrder._id,
        {
          delivered: true,
          status: "delivered",
        }
      );
      dispatch(updateOrdersData(selectedOrder.orderId));
      dispatch(setSelectedOrder(null));
      setLoading(false);
      return toast.success(
        "Order delivery completed. Thank you for choosing us."
      );
    } catch (error) {
      setLoading(false);
      return toast.error(error.response.data.msg);
    }
  };
  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="bg-white p-5 py-8 rounded-md w-full max-w-[450px] mx-5">
        <p className="text-center text-lg px-5">
          Confirm the delivery of a request with order Id{" "}
          <b>{selectedOrder?.orderId}</b> made on <br />
          {moment(selectedOrder.orderDate).format("LLL")}
        </p>
        <section className="flex gap-5 mt-5">
          <button
            onClick={() => {
              dispatch(setSelectedOrder(null));
            }}
            disabled={loading}
            className="w-full rounded-md h-[45px] text-white text-lg font-bold bg-red"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full rounded-md h-[45px] text-white text-lg font-bold bg-green"
          >
            {loading ? (
              <CgSpinnerTwoAlt className="animate-spin mx-auto duration-30 text-3xl" />
            ) : (
              "Confirm"
            )}
          </button>
        </section>
      </div>
    </section>
  );
};

export default ConfirmDelivery;
