import { useState } from "react";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLoginModal } from "../redux/features/ModalSlice";
import axios from "axios";
import { setUser } from "../redux/features/AuthSlice";

function Login() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone) return toast.error("Phone number is required!");
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/clients/sendCode",
        {
          phone,
        }
      );
      setCodeSent(true);
      setLoading(false);

      return toast.success(data.msg);
    } catch (error) {
      setLoading(false);
      return toast.error(error.response.data.msg);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!code) return toast.error("Enter code sent to your number!");
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/clients/verify",
        { phone, verifyCode: parseInt(code) }
      );
      toast.success(data.msg);
      dispatch(toggleLoginModal());
      dispatch(setUser(data.client));
      return navigate("/welcome");
    } catch (error) {
      setLoading(false);
      return toast.error(error.response.data.msg);
    }
  };

  return (
    <form className="bg-white rounded-md w-full max-w-[700px] p-5">
      <div className="relative border-b-[1px] border-bcolor mb-3 pb-2">
        <button
          disabled={loading}
          className="text-4xl absolute right-0 text-lblack"
          onClick={() => dispatch(toggleLoginModal())}
        >
          <MdCancel />
        </button>
        <p className="font-bold text-2xl md:text-3xl text-center">Login</p>
      </div>

      <div className="w-full mb-3">
        <label htmlFor="" className="text-[18px]">
          Phone number
        </label>
        <input
          disabled={loading}
          value={phone}
          onChange={(e) => setPhone(e.target.value.trim())}
          type="text"
          placeholder="+2540123456789"
          className="w-full bg-input p-3 lg:p-4 rounded-sm mt-2 outline-none text-lblack"
        />
      </div>

      {codeSent && (
        <div className="w-full mb-3">
          <label className="text-[18px]" htmlFor="">
            Verify code
          </label>
          <input
            disabled={loading}
            value={code}
            onChange={(e) => setCode(e.target.value.trim())}
            minLength={6}
            maxLength={16}
            type="number"
            placeholder="123456"
            className="w-full bg-input p-3 lg:p-4 rounded-sm mt-2
            outline-none text-lblack"
          />
        </div>
      )}

      <button
        disabled={loading}
        onClick={!codeSent ? handleSubmit : handleLogin}
        className="w-full bg-red py-3 text-white text-bold text-xl hover:opacity-[.8] rounded-md mt-5"
      >
        {loading ? "Loading..." : "Continue"}
      </button>
    </form>
  );
}

export default Login;
