import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import Dialog from "@mui/material/Dialog";
import Login from "../components/Login";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoginModal } from "../redux/features/ModalSlice";

export default function Home() {
  const [scrollP, setScrollP] = useState(0);
  const dispatch = useDispatch();
  const { loginOpen } = useSelector((store) => store.modals);

  useEffect(() => {
    const unsub = window.addEventListener("scroll", () => {
      setScrollP(window.pageYOffset);
    });
    return unsub;
  }, []);

  const handleToggle = () => {
    dispatch(toggleLoginModal());
  };

  return (
    <>
      <main className="body-font font-prompt scroll-smooth">
        {/* navbar */}
        <header
          className={`w-full bg-white z-[1000] sticky top-0 ease-in-out duration-[.5s]${
            scrollP > 100 && " border-b-[1px] border-solid border-bcolor"
          }`}
        >
          <div className="flex justify-between items-center p-4 max-w-[1400px] mx-auto">
            <h1 className="font-bold text-red text-3xl">CURECAB</h1>

            <a
              href="#about"
              className="text-xl hover:text-red ease-in-out duration-[.4s] font-bold text-lblack"
            >
              About
            </a>
          </div>
        </header>

        <Dialog open={loginOpen}>
          <Login />
        </Dialog>

        {/* section1 */}
        <section className="relative grid gap-[50px] lg:grid-cols-2 sm:grid-cols-1 max-w-[1300px] mx-auto p-5 h-screen ">
          <div className="w-full h-full flex flex-col justify-center md:mx-4 sm:mx-4 ">
            <h1 className="md:text-6xl mb-4 font-bold sm:text-center sm:text-3xl">
              Stay healthy with <br /> ARV delivery!
            </h1>
            <h2 className="text-2xl text-lblack sm:text-center">
              Take the hassle out of getting your ARV medications and have them
              delivered to you quickly and easily.
            </h2>
            <section className="grid md:grid-cols-2 sm:grid-cols-1 gap-3  w-full">
              <button
                onClick={handleToggle}
                className="w-full bg-red text-white px-5 sm:py-4  p-3 text-xl rounded-full hover:scale-[98%] w-full  max-w-[400px]  mt-10 sm:mx-auto"
              >
                Make a request
              </button>

              <a
                href="https://nishauritest.kenyahmis.org/login"
                target="_blank"
                className="bg-[#3F00FF] text-white px-5 p-3 sm:py-4 text-xl rounded-full hover:scale-[98%] w-full  max-w-[400px] mt-10 sm:mx-auto text-center"
              >
                Book an appointment
              </a>
            </section>
          </div>
          <div className="w-full h-full mx-auto flex items-center justify-center mb-10">
            <div className="max-w-[350px] sm:w-[300px] w-full mx-auto relative rounded-xl">
              <img src="/medicines.png" width={600} height={600} alt="hello" />
            </div>
          </div>
        </section>

        {/* about */}
        <section id="about" className="px-5 py-[70px]">
          <h2 className="text-3xl font-bold text-center"> ~ About us ~</h2>
          <div className="mx-auto max-w-[1200px] flex md:flex-row flex-col gap-3 my-6">
            <div className="flex-1">
              <p className="mt-10 text-lg text-lblack text-center">
                Our website delivers affordable and reliable ARV pills to
                patients in need, regardless of their location or financial
                situation. Our dedicated team is passionate about improving
                healthcare outcomes, sourcing the highest quality medication and
                delivering it efficiently. We prioritize transparency, honesty
                and excellent customer service, and we're always available to
                help with any questions or concerns. Thank you for choosing us
                as your provider of life-saving medication.
              </p>
            </div>

            <div className="flex-1 flex justify-center items-center mt-5">
              <img
                src="route.gif"
                alt=""
                className="h-full w-full max-h-[300px] max-w-[300px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* section2 */}
        <section className="bg-[#F1F5FD] py-[100px] px-5">
          <div className="max-w-[1300px] mx-auto">
            <h1 className="text-center text-4xl">
              ARV Delivery Services: <br />
              <span className="text-2xl text-lblack">
                Unlocking the Power of Delivery.
              </span>
            </h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3 mt-10">
              <div className="bg-white sm:max-w-[500px] mx-auto p-3 rounded py-[50px] text-center shadow-xl">
                <BsCheckCircleFill className="text-3xl mx-auto mb-5 text-lblack" />
                <h1 className="font-bold text-xl mb-4">Delivery Service</h1>
                <p className="mb-4 text-lblack text-lg">
                  We provide a delivery service for ARV drugs, allowing patients
                  to order their drugs at the comfort of their homes.
                </p>
              </div>
              <div className="bg-white sm:max-w-[500px] mx-auto p-3 rounded py-[50px] text-center shadow-xl">
                <BsCheckCircleFill className="text-3xl mx-auto mb-5 text-lblack" />
                <h1 className="font-bold text-xl mb-4">Chatbot Service</h1>
                <p className="mb-4 text-lblack text-lg">
                  We offer a chatbot service to answer any questions patients
                  may have regarding their ARV drugs.
                </p>
              </div>
              <div className="bg-white sm:max-w-[500px] mx-auto p-3 rounded py-[50px] text-center shadow-xl">
                <BsCheckCircleFill className="text-3xl mx-auto mb-5 text-lblack" />
                <h1 className="font-bold text-xl mb-4">Pay on delivery</h1>
                <p className="mb-4 text-lblack text-lg">
                  We provide pay on delivery option for patients to pay for the
                  delivery fee of their ARV drugs.
                </p>
              </div>
              <div className="bg-white sm:max-w-[500px] mx-auto p-3 rounded py-[50px] text-center shadow-xl">
                <BsCheckCircleFill className="text-3xl mx-auto mb-5 text-lblack" />
                <h1 className="font-bold text-xl mb-4">Prescription Refill</h1>
                <p className="mb-4 text-lblack text-lg">
                  We offer prescription refill services to ensure that patients
                  get their ARV drugs on time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* section3 */}
        <section className="">
          <div className="max-w-[1300px] mx-auto p-5 py-[150px]">
            <h2 className="text-center text-2xl font-bold">
              Our ARV Delivery service <br /> offers convenient and reliable
              delivery of ARV drugs, with added chatbot services to answer{" "}
              <br /> any questions and provide extra support.
            </h2>

            <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mt-10">
              <div className="flex gap-4">
                <BsCheckCircleFill className="text-5xl mx-auto mb-5 text-lblack" />
                <div>
                  <p className="text-xl font-bold mt-3">Convenience</p>
                  <p className="text-lg text-lblack">
                    Patients can order their drugs from the comfort of their
                    homes, without having to visit the clinic.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <BsCheckCircleFill className="text-5xl mx-auto mb-5 text-lblack" />
                <div>
                  <p className="text-xl font-bold mt-3">Ease of Access</p>
                  <p className="text-lg text-lblack">
                    Patients can access their drugs easily and quickly, with no
                    need to travel to clinics.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <BsCheckCircleFill className="text-5xl mx-auto mb-5 text-lblack" />
                <div>
                  <p className="text-xl font-bold mt-3">Fast delivery</p>
                  <p className="text-lg text-lblack">
                    Patients can receive their drugs in a timely manner, without
                    having to wait in long queues at clinics.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* footer */}
        <footer className="bg-black py-[100px] px-5 text-center">
          <h1 className="text-white text-4xl font-bold">
            Convenient ARV Delivery
          </h1>
          <h2 className="text-white mt-5 text-lg">
            Enjoy the convenience of ARV Delivery <br /> Order your drugs now
            and have them delivered to your home!
          </h2>
          <button
            onClick={handleToggle}
            className="bg-red text-white px-5 p-3 text-xl rounded-full hover:scale-[98%] w-full max-w-[250px] mt-10"
          >
            Make request
          </button>
        </footer>
      </main>
    </>
  );
}
