import { useState } from "react";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
    if (!upi || !password) return toast.error("UPI and password required!");
    return navigate("/welcome");
  };

  return (
    <div>
      <form className="bg-white p-3 rounded-md w-full max-w-[500px] py-6">
        <div className="relative">
          <MdCancel
            onClick={handleClose}
            className="text-4xl absolute right-0 text-lblack"
          />
          <p className="text-3xl mb-5 text-center">Login</p>
        </div>

        <div className="w-full mb-3">
          <label htmlFor="" className="text-[18px]">
            Unique Patient identifier (UPI)
          </label>
          <input
            value={upi}
            onChange={(e) => setUpi(e.target.value.trim())}
            type="text"
            placeholder="Your UPI"
            className="w-full bg-input p-4 rounded-sm mt-2 outline-none text-lblack"
          />
        </div>

        <div className="w-full mb-3">
          <label className="text-[18px]" htmlFor="">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            minLength={6}
            maxLength={16}
            type="password"
            placeholder="password"
            className="w-full bg-input p-4 rounded-sm  mt-2
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
    </div>
  );
}

export default Login;
