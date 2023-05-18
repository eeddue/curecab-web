import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [scrollP, setScrollP] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = window.addEventListener("scroll", () => {
      setScrollP(window.pageYOffset);
    });
    return unsub;
  }, []);

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
        {/* section1 */}
        <section className="relative grid gap-[50px] lg:grid-cols-2 sm:grid-cols-1 max-w-[1300px] mx-auto p-5 h-screen ">
          <div className="w-full h-full flex flex-col justify-center md:mx-4 sm:mx-4 ">
            <h1 className="md:text-6xl mb-5 text-4xl font-bold text-center">
              Usi-<span className="text-red">tense</span>!
            </h1>
            <h2 className="md:text-2xl sm:text-lg text-lblack sm:text-center max-w-[600px] mx-auto">
              Take the hassle out of getting your ARV medications and have them
              delivered to you quickly and easily.
            </h2>
            <section className="grid md:grid-cols-2 sm:grid-cols-1 gap-3 max-w-[500px] mx-auto w-full mt-10">
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-red text-white px-5 p-3 md:text-xl text-md rounded-full hover:scale-[98%]"
              >
                Order now
              </button>

              <a
                href="https://play.google.com/store/apps/details?id=com.mhealth.nishauri"
                rel="noreferrer"
                target="_blank"
                className="w-full bg-[#3F00FF] text-white px-5 p-3 md:text-xl text-md rounded-full hover:scale-[98%]  text-center"
              >
                Book appointment
              </a>
            </section>
          </div>
          <div className="w-full h-full mx-auto flex items-center justify-center p-5">
            <div className="max-w-[350px] w-full mx-auto relative rounded-xl">
              <img
                src="/medicines.png"
                className="max-w-[200px] mx-auto lg:max-w-[350px] w-full h-full"
                alt="hello"
              />
            </div>
          </div>
        </section>
        {/* about */}
        <section id="about" className="px-5 py-[50px]">
          <h2 className="text-3xl font-bold text-center"> ~ About us ~</h2>
          <div className="mx-auto max-w-[1200px] flex lg:flex-row flex-col gap-3 my-6">
            <div className="flex-1">
              <p className="mt-10 text-lg text-lblack text-center md:px-[50px]">
                We are dedicated in improving health care services by ensuring
                there is efficient and timely delivering of ARV drugs. We
                prioritize client's confidentiality and provide excellent
                customer services to address any questions and concerns.
              </p>
            </div>

            <div className="flex-1 flex justify-center items-center mt-5 px-5">
              <img
                src="route.gif"
                alt=""
                className="h-full w-full max-h-[200px] max-w-[200px] lg:max-w-[300px] lg:max-h-[300px] object-cover"
              />
            </div>
          </div>
        </section>
        {/* section2 */}
        <section className="bg-[#F1F5FD] py-[100px] px-5">
          <div className="max-w-[1300px] mx-auto">
            <h1 className="text-center text-4xl font-bold">~ Services ~</h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 mt-10">
              <div className="bg-white sm:max-w-[500px] mx-auto p-3 rounded py-[50px] text-center shadow-xl">
                <BsCheckCircleFill className="text-3xl mx-auto mb-5 text-red" />
                <h1 className="font-bold text-xl mb-4">Delivery Service</h1>
                <p className="mb-4 text-lblack md:text-lg sm:text-md">
                  We provide a delivery service for ARV drugs, allowing patients
                  to order their drugs at the comfort of their homes.
                </p>
              </div>
              <div className="bg-white sm:max-w-[500px] mx-auto p-3 rounded py-[50px] text-center shadow-xl">
                <BsCheckCircleFill className="text-3xl mx-auto mb-5 text-red" />
                <h1 className="font-bold text-xl mb-4">Pay on delivery</h1>
                <p className="mb-4 text-lblack md:text-lg sm:text-md">
                  We provide pay on delivery option for patients to pay for the
                  delivery fee of their ARV drugs after getting them.
                </p>
              </div>
              <div className="bg-white sm:max-w-[500px] mx-auto p-3 rounded py-[50px] text-center shadow-xl">
                <BsCheckCircleFill className="text-3xl mx-auto mb-5 text-red" />
                <h1 className="font-bold text-xl mb-4">Prescription Refill</h1>
                <p className="mb-4 text-lblack md:text-lg sm:text-md">
                  We offer prescription refill services to ensure that patients
                  get their ARV drugs on time.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* section3 */}
        <section>
          <div className="max-w-[1300px] mx-auto p-5 py-[100px]">
            <h2 className="text-center text-3xl font-bold">
              ~ Why Choose us ~
            </h2>

            <section className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mt-10">
              <div className="flex gap-4">
                <BsCheckCircleFill className="text-5xl mx-auto mb-5 text-red" />
                <div>
                  <p className="text-xl font-bold mt-3">Confidentiality</p>
                  <p className="md:text-lg sm:text-md text-lblack">
                    Patients data is well handled throughout the delivery
                    process without outsiders getting involved.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <BsCheckCircleFill className="text-5xl mx-auto mb-5 text-red" />
                <div>
                  <p className="text-xl font-bold mt-3">Convenience</p>
                  <p className="md:text-lg sm:text-md text-lblack">
                    Patients can order their drugs from the comfort of their
                    homes, without having to visit the clinic.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <BsCheckCircleFill className="text-5xl mx-auto mb-5 text-red" />
                <div>
                  <p className="text-xl font-bold mt-3">Ease of Access</p>
                  <p className="md:text-lg sm:text-md text-lblack">
                    Patients can access our services through our websites,
                    mobile app and USSD.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <BsCheckCircleFill className="text-5xl mx-auto mb-5 text-red" />
                <div>
                  <p className="text-xl font-bold mt-3">Fast delivery</p>
                  <p className="md:text-lg sm:text-md text-lblack">
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
          <h1 className="text-white text-5xl font-bold">Let's goooo!!!</h1>
          <h2 className="text-white mt-5 text-lg">
            Enjoy the convenience of ARV Delivery. <br /> Order your drugs now
            and have them delivered to your home.
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="bg-red text-white px-5 p-3 text-xl rounded-full hover:scale-[98%] w-full max-w-[250px] mt-10"
          >
            Order now
          </button>
        </footer>
      </main>
    </>
  );
}
