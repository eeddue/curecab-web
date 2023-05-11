import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleOrderModal } from "../redux/features/ModalSlice";
import { counties, couriers } from "../../data";
import { updateOrders } from "../redux/features/OrderSlice";

function OrderForm() {
  const [county, setCounty] = useState(null);
  const [subCounty, setSubCounty] = useState(null);
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(null);
  const [courier, setCourier] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryDate, setdDeliveryDate] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!county || !subCounty || !facility || !courier || !deliveryDate)
      return toast.error("All fields are required!");

    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://5ff6-102-212-236-168.ngrok-free.app/api/v1/orders/clients/make",
        {
          client: user.phone,
          facility,
          address,
          deliverBy: deliveryDate,
          courier,
        }
      );

      setLoading(false);
      dispatch(updateOrders(data.newOrder));
      dispatch(toggleOrderModal());
      return toast.success("Your prescription order was made successfully!");
    } catch (error) {
      setLoading(false);
      console.log(error);
      return toast.error(error.response.data.msg);
    }
  };

  return (
    <form className="bg-white rounded-md w-full max-w-[600px] p-5">
      <div className="relative sticky top-0 bg-white py-1  z-10 w-full border-b-[1px] border-bcolor mb-3">
        <button
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggleOrderModal());
          }}
          className="text-2xl absolute right-0 text-lblack"
        >
          <MdCancel />
        </button>
        <p className="md:text-3xl text-xl pb-2 text-center">Make order</p>
      </div>

      <div className="w-full mb-3 flex flex-col w-full">
        <label htmlFor="" className="text-[18px]">
          County
        </label>
        <select
          disabled={loading}
          onChange={(e) =>
            setCounty(counties.find((c) => c.name === e.target.value))
          }
          className="w-full bg-input p-2 md:p-3 rounded-sm mt-1 outline-none text-lblack"
        >
          <option value="">- Select -</option>
          {counties?.map((c, i) => (
            <option key={i} value={county?.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {county && (
        <div className="w-full mb-3 flex flex-col">
          <label htmlFor="" className="text-[18px]">
            Sub-county
          </label>
          <select
            disabled={loading}
            onChange={(e) =>
              setSubCounty(
                county.subCounties.find((sb) => sb.name === e.target.value)
              )
            }
            className="w-full bg-input p-2 md:p-3 rounded-sm mt-1 outline-none text-lblack"
          >
            <option value="">- Select -</option>
            {county?.subCounties.map((sc, i) => (
              <option key={i} value={subCounty?.name}>
                {sc.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {county && subCounty && (
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
            {subCounty.facilities.map((fc, i) => (
              <option key={i} value={fc}>
                {fc}
              </option>
            ))}
          </select>
        </div>
      )}

      {county && subCounty && facility && (
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
      )}

      <div className="w-full mb-3">
        <label className="text-[18px]" htmlFor="">
          Delivery address
        </label>
        <input
          disabled={loading}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="112345 example"
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
          className="w-full bg-input p-2 md:p-3 rounded-sm  mt-1
            outline-none text-lblack"
        />
      </div>

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="w-full bg-red py-3 text-white text-bold text-xl hover:opacity-[.8] rounded-md mt-5"
      >
        {loading ? "Loading..." : "Continue"}
      </button>
    </form>
  );
}

export default OrderForm;
