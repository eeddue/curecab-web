import { useState } from "react";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLoginModal } from "../redux/features/ModalSlice";

function Login() {
  const [upi, setUpi] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleLoginModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!upi || !password) return toast.error("UPI and password required!");
    dispatch(toggleLoginModal());
    toast.success("You are now logged in!");
    return navigate("/welcome");
  };

  return (
    <form className="bg-white rounded-md w-full max-w-[700px] p-5">
      <div className="relative border-b-[1px] border-bcolor mb-3 pb-2">
        <MdCancel
          onClick={handleClose}
          className="text-4xl absolute right-0 text-lblack"
        />
        <p className="font-bold text-2xl md:text-3xl text-center">Login</p>
      </div>

      <div className="w-full mb-3">
        <label htmlFor="" className="text-[18px]">
          Phone number
        </label>
        <input
          value={upi}
          onChange={(e) => setUpi(e.target.value.trim())}
          type="number"
          placeholder="+2540123456789"
          className="w-full bg-input p-3 lg:p-4 rounded-sm mt-2 outline-none text-lblack"
        />
      </div>

      <div className="w-full mb-3">
        <label className="text-[18px]" htmlFor="">
          Verify code
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
          minLength={6}
          maxLength={16}
          type="number"
          placeholder="123456"
          className="w-full bg-input p-3 lg:p-4 rounded-sm mt-2
            outline-none text-lblack"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-red py-3 text-white text-bold text-xl hover:opacity-[.8] rounded-md mt-5"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
