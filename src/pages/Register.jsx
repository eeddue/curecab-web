import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { EMR_patients } from "../../data";
import { Dialog } from "@mui/material";

function Register() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [ccc, setCcc] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [foundUser, setFoundUser] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !phone || !ccc || !password || !cpassword)
      return toast.error("All input fields are required.");

    if (password.length < 6)
      return toast.error("Password must be 6 or more characters.");

    if (password !== cpassword) return toast.error("Passwords don't match.");

    setLoading(true);
    setTimeout(() => {
      const user = EMR_patients.find((p) => p.ccc_no === ccc);
      if (!user) {
        setLoading(false);
        return toast.error("Invalid CCC no.");
      }

      setLoading(false);
      setFoundUser(user);
    }, 1000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFoundUser(null);
      navigate("/login");
      return toast.success(
        "Your registration was successfull. Continue to login."
      );
    }, 1000);
  };

  const handleReject = (e) => {
    e.preventDefault();
    setFoundUser(null);
  };

  return (
    <div className="flex md:h-screen justify-center items-center bg-white">
      <form
        className="w-full max-w-[800px] p-5 flex flex-col"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-2xl font-bold mb-3">
          Sign up to continue.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 gap-0">
          <section className="mt-2 w-full">
            <label htmlFor="" className="md:text-xl">
              Username
            </label>
            <div className="flex gap-2 p-3 px-5 border-[1px] border-bcolor items-center rounded-md mt-1">
              <input
                type="text"
                className="w-full md:text-lg px-3 text-lblack"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value.trim())}
              />
            </div>
          </section>

          <section className="mt-2 w-full">
            <label htmlFor="" className="md:text-xl">
              Phone
            </label>
            <div className="flex gap-2 p-3 px-5 border-[1px] border-bcolor items-center rounded-md mt-1">
              <input
                type="text"
                className="w-full md:text-lg px-3 text-lblack"
                placeholder="+254......"
                value={phone}
                onChange={(e) => setPhone(e.target.value.trim())}
              />
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 gap-0">
          <section className="mt-2 w-full">
            <label htmlFor="" className="md:text-xl">
              CCC number
            </label>
            <div className="flex gap-2 p-3 px-5 border-[1px] border-bcolor items-center rounded-md mt-1">
              <input
                type="text"
                className="w-full md:text-lg px-3 text-lblack"
                placeholder="Enter your CCC no."
                value={ccc}
                onChange={(e) => setCcc(e.target.value.trim())}
              />
            </div>
          </section>
          <section className="mt-2 w-full">
            <label htmlFor="" className="md:text-xl">
              Password
            </label>
            <div className="flex gap-2 p-3 px-5 border-[1px] border-bcolor items-center rounded-md mt-1">
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 gap-0">
          <section className="mt-2 w-full">
            <label htmlFor="" className="md:text-xl">
              Confirm Password
            </label>
            <div className="flex gap-2 p-3 px-5 border-[1px] border-bcolor items-center rounded-md mt-1">
              <FiLock className="text-2xl text-lblack" />
              <input
                type="password"
                className="w-full md:text-lg px-3 text-lblack"
                placeholder="Confirm Password"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value.trim())}
              />
            </div>
          </section>

          <button
            className="h-[50px] md:h-[55px] bg-red rounded-md text-lg md:text-xl font-bold text-white mt-0 sm:mt-5 
          self-end w-full hover:scale-[98%] ease-in-out duration-300"
          >
            {!foundUser && loading ? (
              <CgSpinnerTwoAlt className="animate-spin mx-auto duration-30 text-3xl" />
            ) : (
              "Register"
            )}
          </button>
        </div>

        <p className="text-lg text-center mt-6">
          Dont have an account?
          <Link to="/login" className="text-red ml-3 font-bold">
            Login
          </Link>
        </p>
      </form>
      <Dialog open={foundUser}>
        <section className="b-white p-5 rounded-sm w-full max-w-[600px] flex flex-col">
          <p className="text-lg text- text-center">
            Is your name{" "}
            <span className="text-black text-xl font-bold">
              {foundUser?.full_name}
            </span>{" "}
            with CCC number{" "}
            <span className="text-black text-xl font-bold">
              {foundUser?.ccc_no}
            </span>{" "}
            ?
          </p>
          <div className="flex items-center gap-2 mt-5">
            <button
              onClick={handleReject}
              className="flex-1 rounded-sm bg-red text-white h-[50px] font-bold text-lg"
            >
              NO
            </button>
            <button
              onClick={handleRegister}
              className="flex-1 rounded-sm bg-green text-white h-[50px] font-bold text-lg"
            >
              {foundUser && loading ? (
                <CgSpinnerTwoAlt className="animate-spin mx-auto duration-30 text-3xl" />
              ) : (
                "YES"
              )}
            </button>
          </div>
        </section>
      </Dialog>
    </div>
  );
}

export default Register;
