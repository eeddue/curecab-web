import { useState } from "react";
import { BsArrow90DegLeft } from "react-icons/bs";
import { facilities, couriers, generateOrderId } from "../../data";
import { useNavigate } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateOrders } from "../redux/features/OrderSlice";

function Order() {
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courier, setCourier] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryDate, setdDeliveryDate] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!facility || !courier || !address || !deliveryDate)
      return toast.error("All input fields are required.");

    if (deliveryDate <= new Date().toISOString().split("T")[0])
      return toast.error("Select a delivery date from today.");

    setLoading(true);
    setTimeout(() => {
      dispatch(
        updateOrders({
          facility,
          courier,
          deliveryFee: 400,
          orderId: generateOrderId(),
          deliverBy: new Date().getTime() + 60000000,
          address,
          client: user.phone,
          status: "pending",
        })
      );
      setLoading(false);
      toast.success("Your order was placed successfully.");
      return navigate("/welcome");
    }, 1500);
  };

  return (
    <form className="bg-white rounded-md w-full max-w-[600px] mx-auto p-5">
      <div className="relative sticky top-0 bg-white py-1  z-10 w-full border-b-[1px] border-bcolor mb-3">
        <button
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            navigate("/welcome");
          }}
          className="text-2xl absolute left-0 text-lblack"
        >
          <BsArrow90DegLeft />
        </button>
        <p className="md:text-3xl text-xl pb-2 text-center">Make order</p>
      </div>

      <div className="w-full mb-3 flex flex-col">
        <label htmlFor="" className="text-[18px]">
          Facility
        </label>
        <select
          disabled={loading}
          onChange={(e) => setFacility(e.target.value)}
          className="w-full bg-input p-2 md:p-3 rounded-sm mt-1 outline-none text-lblack"
        >
          <option value="">- Select -</option>
          {facilities.map((fc, i) => (
            <option key={i} value={facility}>
              {fc.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full mb-3 flex flex-col">
        <label htmlFor="" className="text-[18px]">
          Preffered Courier
        </label>
        <select
          disabled={loading}
          onChange={(e) => setCourier(e.target.value)}
          className="w-full bg-input p-2 md:p-3 rounded-sm mt-1 outline-none text-lblack"
        >
          <option value="">- Select -</option>
          {couriers.map((courier) => (
            <option key={courier} value={courier}>
              {courier}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full mb-3">
        <label className="text-[18px]" htmlFor="">
          Delivery address
        </label>
        <input
          disabled={loading}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="1234 example"
          className="w-full bg-input p-2 md:p-3 rounded-sm mt-1
            outline-none text-lblack"
        />
      </div>

      <div className="w-full mb-3">
        <label className="text-[18px]" htmlFor="">
          Delivery by
        </label>
        <input
          disabled={loading}
          value={deliveryDate}
          onChange={(e) => setdDeliveryDate(e.target.value)}
          type="date"
          className="w-full bg-input p-2 md:p-3 rounded-sm mt-1
            outline-none text-lblack"
        />
      </div>

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="w-full bg-red h-[55px] text-white text-bold text-xl hover:opacity-[.8] rounded-md mt-5"
      >
        {loading ? (
          <CgSpinnerTwoAlt className="animate-spin mx-auto duration-30 text-3xl" />
        ) : (
          "Continue"
        )}
      </button>
    </form>
  );
}

export default Order;
