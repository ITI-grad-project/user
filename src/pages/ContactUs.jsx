import { useState } from "react";
import EmailIcon from "../assets/icons/EmailIcon";
import LocationIcon from "../assets/icons/LocationIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
import Input from "../components/Input";
import { ToastContainer } from "react-toastify";
import notify from "../hooks/useNotification";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      return notify("all fields is required", "error");
    }
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://bekya.onrender.com/api/v1/user/contactUs",
        { name, email, subject, message }
      );
      if (data.message) {
        notify(data.message, "success");
        setName("");
        setMessage("");
        setSubject("");
        setEmail("");
      }
    } catch (err) {
      if (err.response.data.message) {
        notify(err.response.data.message, "error");
      }
    }
    setLoading(false);
  };
  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="flex flex-col justify-center items-center m-10">
        <h2 className="font-bold text-3xl text-center">Contact Us</h2>
        <hr className="w-16 bg-primary h-1 mt-2" />
      </div>
      <div className="container mx-auto px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-32 ">
        <div className="grid grid-cols-10 lg:grid-cols-10 gap-6">
          <div className="col-span-10 lg:col-span-4 2xl:col-span-4 flex flex-col justify-between items-center">
            <div className="flex items-center gap-3 border rounded shadow w-full md:text-lg py-6 md:px-8 px-4">
              <span className="text-primary rounded-full w-12 h-12 border flex justify-center items-center">
                <PhoneIcon w={"w-7"} h={"h-7"} />
              </span>
              <div>
                <h5 className="font-semibold">Phone</h5>
                <p>+20123456789</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border rounded shadow w-full md:text-lg py-6 md:px-8 px-4">
              <span className="text-primary rounded-full w-12 h-12 border flex justify-center items-center">
                <EmailIcon w={"w-7"} h={"h-7"} />
              </span>
              <div>
                <h5 className="font-semibold">Email</h5>
                <p>myrefurb87@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border rounded shadow w-full md:text-lg py-6 md:px-8 px-4">
              <span className="text-primary rounded-full w-12 h-12 border flex justify-center items-center">
                <LocationIcon w={"w-8"} h={"h-8"} />
              </span>
              <div>
                <h5 className="font-semibold">Address</h5>
                <p>ITI, Ismailia, Egypt</p>
              </div>
            </div>
          </div>
          {/* ------------- Form ------------ */}
          <div className="border shadow col-span-10 lg:col-span-6 2xl:col-span-6 rounded">
            <form className="p-5 md:p-10 flex flex-col gap-4">
              <div className="flex md:flex-row gap-6 flex-col md:justify-center">
                <div className="md:w-[50%]">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="md:w-[50%]">
                  <Input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>
              <Input
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                placeholder="Subject"
              />
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`textarea textarea-bordered focus:outline-none min-h-[8rem] text-base focus:border-primary focus:border-2`}
                placeholder="Your Message"
              ></textarea>
              <div className="form-control mt-1 justify-center items-center">
                {loading ? (
                  <ThreeDots color="#FFD336"></ThreeDots>
                ) : (
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="btn btn-primary capitalize text-white w-[65%] md:w-[50%]"
                  >
                    Send Message
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
