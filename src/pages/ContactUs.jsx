import EmailIcon from "../assets/icons/EmailIcon";
import LocationIcon from "../assets/icons/LocationIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
import Input from "../components/Input";

export default function Contact() {
  return (
    <>
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
                <p>myrefurb.iti@gmail.com</p>
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
                  // label="Current Password"
                  name="name"
                  type="text"
                  placeholder="Name"
                  // register={{ ...register("currentPassword") }}
                  // errorMessage={errors.currentPassword?.message}
                />
                </div>
                <div className="md:w-[50%]">

                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                </div>
                
                {/* <span
                  className="absolute top-12 right-4 cursor-pointer"
                  onClick={handleShowCurrentPass}
                >
                  {showCurrentPass ? <EyeShowIcon /> : <EyeSlashIcon />}
                </span> */}
              </div>
              <Input
                  name="subject"
                  type="text"
                  placeholder="Subject"
                />
 <textarea
          name="message"
          className={`textarea textarea-bordered focus:outline-none min-h-[8rem] text-base focus:border-primary focus:border-2`}
          placeholder="Your Message"
        ></textarea>
              <div className="form-control mt-1 justify-center items-center">
                <button className="btn btn-primary capitalize text-white w-[65%] md:w-[50%]">
                  {/* <span>
                    {loading && (
                      <Loader w={"w-6"} h={"h-6"} color={"fill-white"} />
                    )}{" "}
                  </span> */}
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
