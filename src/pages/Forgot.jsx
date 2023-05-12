import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { patients } from "../../data";
import { toast } from "react-hot-toast";

function Forgot() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) return toast.error("Enter phone number.");

    setLoading(true);
    setTimeout(() => {
      const user = patients.find((p) => p.phone === phone);
      if (!user) {
        setLoading(false);
        return toast.error("Patient doesn't exist.");
      }

      setLoading(false);
      return toast.success(
        "A password reset link has been sent to your phone number."
      );
    }, 1000);
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
        <section className="mt-5">
          <label htmlFor="" className="text-xl">
            Phone number
          </label>
          <div className="flex gap-2 p-2 md:p-3 px-5 border-[1px] border-bcolor items-center rounded-md mt-1">
            <AiOutlineUser className="text-2xl text-lblack" />
            <input
              type="text"
              className="w-full text-lg md:text-lg px-3 text-lblack"
              placeholder="01 . . . . . . "
              value={phone}
              onChange={(e) => setPhone(e.target.value.trim())}
            />
          </div>
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
