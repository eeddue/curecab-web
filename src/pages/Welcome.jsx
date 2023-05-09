import Dialog from "@mui/material/Dialog";
import OrderForm from "../components/OrderForm";
import FeedBack from "../components/FeedBack";
import { useNavigate } from "react-router-dom";
import Orders from "../components/Orders";
import { useDispatch, useSelector } from "react-redux";
import { toggleOrderModal } from "../redux/features/ModalSlice";

function Index() {
  const { orderOpen } = useSelector((store) => store.modals);
  const dispatch = useDispatch();

  const all = {
    delivered: { bg: "#FCF4C7", color: "#854E23" },
    pending: { bg: "#C8F7DF", color: "#559982" },
    failed: { bg: "#F8EAE9", color: "#752E32" },
  };

  const navigate = useNavigate();

  const handleOpen = () => {
    dispatch(toggleOrderModal());
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
            onClick={() => navigate("/")}
            className="w-[150px] h-[45px] border-solid border-[1px] border-bcolor rounded hover:border-red text-lblack text-lg"
          >
            Log out
          </button>
        </div>
      </header>

      <Dialog open={orderOpen}>
        <OrderForm />
      </Dialog>

      <section className="max-w-[700px] mx-auto p-5">
        <h1 className="font-bold text-3xl text-lblack mb-2">
          {Greetings()}, <br />
          <span className="text-black text-4xl">John Doe</span>
        </h1>
        <h2 className="text-lblack text-lg mb-4">
          You can now request a new order and we'll get it delivered to you.
        </h2>
        <button
          onClick={handleOpen}
          className="w-[200px] h-[50px] bg-red rounded-full text-white text-lg hover:scale-[98%]"
        >
          Make order
        </button>
      </section>

      <Orders />

      <FeedBack />
    </div>
  );
}

export default Index;
