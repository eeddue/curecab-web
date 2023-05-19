import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { patients } from "../../data";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/AuthSlice";
import PhoneInput from "react-phone-number-input";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phone || !password) return toast.error("All fields are required.");
    if (password.length < 6)
      return toast.error("Password must be 6 or more characters.");

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/patients/login",
        { phone, password }
      );
      setLoading(false);
      dispatch(setUser(data.user));
      return toast.success(data.msg);
    } catch (error) {
      setLoading(false);
      return toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <form
        className="w-full max-w-[550px] p-5 flex flex-col"
        onSubmit={handleLogin}
      >
        <p className="text-center text-2xl font-bold mb-3">
          Sign in to continue.
        </p>
        <section className="mt-5">
          <label htmlFor="" className="md:text-xl">
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

        <section className="mt-5">
          <label htmlFor="" className="md:text-xl">
            Password
          </label>
          <div className="flex gap-2 p-2 md:p-3 px-5 border-[1px] border-bcolor items-center rounded-md mt-1">
            <FiLock className="text-2xl text-lblack" />
            <input
              type="password"
              className="w-full md:text-lg px-3 text-lblack"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
            />
          </div>
        </section>
        {!loading && (
          <Link to="/forgot" className="text-red md:text-lg self-end my-3">
            Forgot password?
          </Link>
        )}
        <button
          className={`h-[55px] bg-red rounded-md text-xl hover:scale-[98%] ease-in-out duration-300 font-bold text-white ${
            loading && "mt-5"
          }`}
        >
          {loading ? (
            <CgSpinnerTwoAlt className="animate-spin mx-auto duration-30 text-3xl" />
          ) : (
            "Login"
          )}
        </button>

        {!loading && (
          <p className="md:text-lg text-center mt-6">
            Don't have an account?
            <Link to="/register" className="text-red ml-3 font-bold">
              Sign up
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
