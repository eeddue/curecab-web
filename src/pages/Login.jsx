import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { CgSpinnerTwoAlt } from "react-icons/cg";

import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { patients } from "../../data";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/AuthSlice";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!phone || !password) return toast.error("All fields are required.");
    if (password.length < 6)
      return toast.error("Password must be 6 or more characters.");

    setLoading(true);
    setTimeout(() => {
      const user = patients.find((p) => p.phone === phone);
      if (!user) {
        setLoading(false);
        return toast.error("Invalid credentials.");
      }

      const passwordMatch = password === user.password;
      if (!passwordMatch) {
        setLoading(false);
        return toast.error("Invalid credentials.");
      }

      setLoading(false);
      dispatch(setUser(user));
      return toast.success("You are now logged in.");
    }, 1000);
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
          <div className="flex gap-2 p-2 md:p-3 px-5 border-[1px] border-bcolor items-center rounded-md mt-1">
            <AiOutlineUser className="text-2xl text-lblack" />
            <input
              type="text"
              className="w-full md:text-lg px-3 text-lblack"
              placeholder="01 . . . . . . "
              value={phone}
              onChange={(e) => setPhone(e.target.value.trim())}
            />
          </div>
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
        <Link to="/forgot" className="text-red md:text-lg self-end my-3">
          Forgot password?
        </Link>
        <button className="h-[55px] bg-red rounded-md text-xl hover:scale-[98%] ease-in-out duration-300 font-bold text-white">
          {loading ? (
            <CgSpinnerTwoAlt className="animate-spin mx-auto duration-30 text-3xl" />
          ) : (
            "Login"
          )}
        </button>

        <p className="md:text-lg text-center mt-6">
          Dont have an account?
          <Link to="/register" className="text-red ml-3 font-bold">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
