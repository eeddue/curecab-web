import { useEffect, useState } from "react";
import { BsArrow90DegLeft } from "react-icons/bs";
import { generateOrderId, getUserNextOrderDate } from "../../data";
import { useNavigate } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateOrders } from "../redux/features/OrderSlice";
import { setUser } from "../redux/features/AuthSlice";

function Order() {
  const [couriers, setCouriers] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [facility, setFacility] = useState("");
  const [loading, setLoading] = useState(false);
  const [courier, setCourier] = useState("any");
  const [address, setAddress] = useState("");
  const [span, setSpan] = useState("");
  const [deliverBy, setdDeliverBy] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  //fetch couriers and facilities
  useEffect(() => {
    (async () => {
      const response = await Promise.all([
        axios.get("http://localhost:5000/api/v1/couriers"),
        axios.get("http://localhost:5000/api/v1/facilities"),
      ]);
      setCouriers(response[0].data.couriers);
      setFacilities(response[1].data.facilities);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!facility || !courier || !address || !deliverBy || !span)
      return toast.error("All input fields are required.");

    if (deliverBy <= new Date().toISOString().split("T")[0])
      return toast.error("Select a delivery date from today.");

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/orders/make",
        {
          client: user.phone,
          orderId: generateOrderId(),
          address,
          courier,
          deliverBy,
          userId: user._id,
          span,
          facility,
          photoUrl: user.photoUrl,
          next_order: getUserNextOrderDate(span),
        }
      );

      dispatch(updateOrders(data.order));
      dispatch(setUser(data.user));
      setLoading(false);
      toast.success(data.msg);
      return navigate("/welcome");
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error(error.response.data.msg);
    }
  };

  return (
    <form className="bg-white rounded-md w-full max-w-[600px] mx-auto p-5">
      <div className="sticky top-0 bg-white py-1  z-10 w-full border-b-[1px] border-bcolor mb-3">
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
          {facilities?.map((fc, i) => (
            <option key={i} value={facility.name}>
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
          defaultValue="any"
          disabled={loading}
          onChange={(e) => setCourier(e.target.value)}
          className="w-full bg-input p-2 md:p-3 rounded-sm mt-1 outline-none text-lblack"
        >
          <option value="any">- Any -</option>
          {couriers?.map((courier) => (
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
          value={deliverBy}
          onChange={(e) => setdDeliverBy(e.target.value)}
          type="date"
          className="w-full bg-input p-2 md:p-3 rounded-sm mt-1
            outline-none text-lblack"
        />
      </div>

      <div className="w-full mb-3">
        <label className="text-[18px]" htmlFor="">
          Prescription span (in days)
        </label>
        <input
          disabled={loading}
          value={span}
          onChange={(e) => setSpan(e.target.value)}
          type="number"
          className="w-full bg-input p-2 md:p-3 rounded-sm mt-1
            outline-none text-lblack"
          placeholder="Enter days"
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
