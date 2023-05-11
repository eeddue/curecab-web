import { AiOutlineUser } from "react-icons/ai";

function Forgot() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <form className="w-full max-w-[550px] p-5 flex flex-col">
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
          <div className="flex gap-2 p-3 px-5 border-[1px] border-bcolor items-center rounded-md mt-1">
            <AiOutlineUser className="text-2xl text-lblack" />
            <input
              type="text"
              className="w-full text-lg px-3 text-lblack"
              placeholder="01 . . . . . . "
            />
          </div>
        </section>

        <button className="h-[55px] mt-5 bg-red rounded-md text-xl hover:scale-[98%] ease-in-out duration-300 font-bold text-white">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Forgot;
