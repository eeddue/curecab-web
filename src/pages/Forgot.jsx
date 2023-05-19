import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import axios from "axios";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-number-input";

function Forgot() {
  const [phone, setPhone] = useState("");
  const [ccc_no, setCcc_no] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) return toast.error("Enter phone number.");

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/patients/forgot-password",
        { phone, ccc_no }
      );
      toast.success(data.msg);
      setLoading(false);
      return navigate("/login");
    } catch (error) {
      setLoading(false);
      return toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <form
        className="w-full max-w-[550px] p-5 flex flex-col"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-2xl font-bold mb-2">
          Forgot your password?
        </p>
        <span className="text-center text-lg text-lblack">
          Don't stress out. We'll help you recover it.
        </span>

        <section className="mt-5 w-full">
          <label htmlFor="" className="md:text-xl">
            CCC number
          </label>
          <div className="flex gap-2 p-3 px-5 border-[1px] border-bcolor items-center rounded-md mt-1">
            <input
              type="text"
              className="w-full md:text-lg px-3 text-lblack"
              placeholder="Enter your CCC no."
              value={ccc_no}
              onChange={(e) => setCcc_no(e.target.value.trim())}
            />
          </div>
        </section>
        <section className="mt-3">
          <label htmlFor="" className="text-xl">
            Phone number
          </label>
          <PhoneInput
            defaultCountry="KE"
            disabled={loading}
            placeholder="0712345678"
            value={phone}
            onChange={(e) => setPhone(e?.trim())}
            className="w-full md:text-lg px-3 text-lblack border-[1px] border-bcolor items-center rounded-md mt-1 h-[55px]"
          />
        </section>

        <button
          disabled={loading}
          className="h-[50px] md:h-[55px] mt-5 bg-red rounded-md text-lg md:text-xl hover:scale-[98%] ease-in-out duration-300 font-bold text-white"
        >
          {loading ? (
            <CgSpinnerTwoAlt className="animate-spin mx-auto duration-30 text-3xl" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}

export default Forgot;
