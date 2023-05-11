import Orders from "../components/Orders";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/features/AuthSlice";
import { useNavigate } from "react-router-dom";

function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const all = {
    delivered: { bg: "#FCF4C7", color: "#854E23" },
    pending: { bg: "#C8F7DF", color: "#559982" },
    failed: { bg: "#F8EAE9", color: "#752E32" },
  };

  const Greetings = () => {
    let today = new Date();
    let hourNow = today.getHours();

    if (hourNow >= 0 && hourNow < 12) return "Good morning";
    if (hourNow >= 12 && hourNow < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="">
      <header
        className={`w-full bg-white z-[1000] sticky top-0 ease-in-out duration-[.5s]
          border-b-[1px] border-solid border-bcolor
        `}
      >
        <div className="flex justify-between items-center p-4 max-w-[1400px] mx-auto">
          <h1 className="font-bold text-red text-3xl">CURECAB</h1>

          <button
            onClick={() => dispatch(signOut())}
            className="md:w-[150px] w-[100px] h-[45px] border-solid border-[1px] border-bcolor rounded hover:border-red text-lblack md:text-lg"
          >
            Log out
          </button>
        </div>
      </header>

      <section className="max-w-[700px] mx-auto p-5">
        <h1 className="font-bold md:text-3xl text-xl text-lblack mb-2">
          {Greetings()}, <br />
          <span className="text-black md:text-4xl text-2xl">{"John Doe"} </span>
        </h1>
        <h2 className="text-lblack md:text-lg mb-4">
          You can now request a new order and we'll get it delivered to you.
        </h2>
        <button
          onClick={() => navigate("/order")}
          className="w-[200px] h-[50px] bg-red rounded-full text-white text-lg hover:scale-[98%]"
        >
          Make order
        </button>
      </section>

      <Orders />

      {/* <FeedBack /> */}
    </div>
  );
}

export default Index;
