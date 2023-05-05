import { couriers } from "../../utils/couriers";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toggleOrderModal } from "../redux/features/ModalSlice";

function OrderForm() {
  const [county, setCounty] = useState("");
  const [constituency, setConstituency] = useState("");
  const [ward, setWard] = useState("");
  const [clinic, setClinic] = useState("");
  const [courier, setCourier] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryDate, setdDeliveryDate] = useState("");

  const dispatch = useDispatch();

  const getConstituencies = async () => {
    try {
      const { data } = await axios.get(
        "https://frozen-basin-45055.herokuapp.com/api/wards?county=Nairobi"
      );
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getWards = async () => {
    try {
      const { data } = await axios.get(
        "https://frozen-basin-45055.herokuapp.com/api/wards?county=Nairobi"
      );
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClose = () => {
    dispatch(toggleOrderModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !county ||
      !constituency ||
      !ward ||
      !clinic ||
      !courier ||
      !deliveryDate
    )
      return toast.error("All fields are required!");
    setOpen(false);
    return toast.success("Your prescription order was made successfully!");
  };

  return (
    <div>
      <form className="bg-white p-3 rounded-md w-full max-w-[500px] pt-0 py-6">
        <div className="relative sticky top-0 bg-white pt-6 pb-1  z-10 w-full">
          <MdCancel
            onClick={handleClose}
            className="text-4xl absolute right-0 text-lblack"
          />
          <p className="text-3xl mb-5 text-center">Make order</p>
        </div>

        <div className="w-full mb-3 flex flex-col w-full">
          <label htmlFor="" className="text-[18px]">
            County
          </label>
          <select
            onChange={(e) => setCounty(e.target.value)}
            className="w-full bg-input p-3 rounded-sm mt-2 outline-none text-lblack"
          >
            <option value="">- Select -</option>
            <option value="one">County 1</option>
            <option value="one">County 2</option>
            <option value="one">County 3</option>
            <option value="one">County 4</option>
          </select>
        </div>

        {county && (
          <div className="w-full mb-3 flex flex-col">
            <label htmlFor="" className="text-[18px]">
              Constituency
            </label>
            <select
              onChange={(e) => setConstituency(e.target.value)}
              className="w-full bg-input p-3 rounded-sm mt-2 outline-none text-lblack"
            >
              <option value="">- Select -</option>
              <option value="one">Constituency 1</option>
              <option value="one">Constituency 2</option>
              <option value="one">Constituency 3</option>
              <option value="one">Constituency 4</option>
            </select>
          </div>
        )}

        {county && constituency && (
          <div className="w-full mb-3 flex flex-col">
            <label htmlFor="" className="text-[18px]">
              Ward
            </label>
            <select
              onChange={(e) => setWard(e.target.value)}
              className="w-full bg-input p-3 rounded-sm mt-2 outline-none text-lblack"
            >
              <option value="">- Select -</option>
              <option value="one">Ward 1</option>
              <option value="one">Ward 2</option>
              <option value="one">Ward 3</option>
              <option value="one">Ward 4</option>
            </select>
          </div>
        )}

        {county && constituency && ward && (
          <div className="w-full mb-3 flex flex-col">
            <label htmlFor="" className="text-[18px]">
              Clinic
            </label>
            <select
              onChange={(e) => setClinic(e.target.value)}
              className="w-full bg-input p-3 rounded-sm mt-2 outline-none text-lblack"
            >
              <option value="">- Select -</option>
              <option value="one">Clinic 1</option>
              <option value="one">Clinic 2</option>
              <option value="one">Clinic 3</option>
              <option value="one">Clinic 4</option>
            </select>
          </div>
        )}

        {county && constituency && ward && clinic && (
          <div className="w-full mb-3 flex flex-col">
            <label htmlFor="" className="text-[18px]">
              Preffered Courier
            </label>
            <select
              onChange={(e) => setCourier(e.target.value)}
              className="w-full bg-input p-3 rounded-sm mt-2 outline-none text-lblack"
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="112345 example"
            className="w-full bg-input p-4 rounded-sm  mt-2
            outline-none text-lblack"
          />
        </div>

        <div className="w-full mb-3">
          <label className="text-[18px]" htmlFor="">
            Delivery by
          </label>
          <input
            value={deliveryDate}
            onChange={(e) => setdDeliveryDate(e.target.value)}
            type="date"
            className="w-full bg-input p-4 rounded-sm  mt-2
            outline-none text-lblack"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-red py-3 text-white text-bold text-xl hover:opacity-[.8] rounded-md mt-5"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
