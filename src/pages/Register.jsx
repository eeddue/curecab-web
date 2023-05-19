import "react-phone-number-input/style.css";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { Dialog } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { generateAvatar } from "../../lib/avatar";

function Register() {
  const [phone, setPhone] = useState("");
  const [ccc_no, setCcc_no] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const [idmodal, setIdmodal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !ccc_no || !password || !cpassword)
      return toast.error("All input fields are required.");

    if (password.length < 6)
      return toast.error("Password must be 6 or more characters.");

    if (password !== cpassword) return toast.error("Passwords don't match.");

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/patients/validate",
        { ccc_no }
      );
      setFoundUser(data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return toast.error(error.response.data.msg);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!id) return toast.error("Provide an ID number.");

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/patients/register",
        {
          full_name: foundUser.full_name,
          facility: foundUser.facility,
          id_no: foundUser.id_no,
          phone,
          ccc_no,
          password,
          photoUrl: generateAvatar(foundUser.full_name),
        }
      );
      setLoading(false);
      setIdmodal(false);
      setFoundUser(null);
      navigate("/login");
      return toast.success(data.msg);
    } catch (error) {
      setLoading(false);
      return toast.error(error.response.data.msg);
    }
  };

  const handleReject = (e) => {
    e.preventDefault();
    setFoundUser(null);
    setId("");
  };

  return (
    <>
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
            <section className="mt-2 w-full">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 gap-0">
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
          </div>
          <button
            className="h-[50px] md:h-[55px] bg-red rounded-md text-lg md:text-xl font-bold text-white mt-5 
           w-full max-w-[400px] mx-auto hover:scale-[98%] ease-in-out duration-300"
          >
            {!foundUser && loading ? (
              <CgSpinnerTwoAlt className="animate-spin mx-auto duration-30 text-3xl" />
            ) : (
              "Register"
            )}
          </button>
          {!loading && (
            <p className="text-lg text-center mt-6">
              Already have an account?
              <Link to="/login" className="text-red ml-3 font-bold">
                Login
              </Link>
            </p>
          )}
        </form>
      </div>
      <Dialog open={foundUser !== null}>
        <div className="bg-white p-5 rounded-sm m-auto  max-w-[500px] flex flex-col">
          <p className="text-lg text- text-center">
            Is your name{" "}
            <span className="text-black text-xl font-bold">
              {foundUser?.full_name.split(" ")[0]}...
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
              onClick={() => {
                setIdmodal(true);
              }}
              className="flex-1 rounded-sm bg-green text-white h-[50px] font-bold text-lg"
            >
              YES
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog open={idmodal}>
        <section className="bg-white p-5 rounded-sm max-w-[600px] md:min-w-[450px] w-full flex flex-col">
          <p className="text-lg md:text-xl text-center mb-5 border-b-[1px] border-bcolor pb-3">
            Enter your ID Number
          </p>
          <input
            required
            type="number"
            placeholder="12345678"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full bg-input text-lg p-2 px-4 rounded-md"
          />
          <section className="flex items-center gap-2 mt-5">
            <button
              disabled={loading}
              onClick={() => setIdmodal(false)}
              className="flex-1 rounded-sm bg-red text-white h-[50px] font-bold text-lg"
            >
              CANCEL
            </button>
            <button
              disabled={loading}
              onClick={handleRegister}
              className="flex-1 rounded-sm bg-green text-white h-[50px] font-bold text-lg"
            >
              {foundUser && loading ? (
                <CgSpinnerTwoAlt className="animate-spin mx-auto duration-30 text-3xl" />
              ) : (
                "CONFIRM"
              )}
            </button>
          </section>
        </section>
      </Dialog>
    </>
  );
}

export default Register;
