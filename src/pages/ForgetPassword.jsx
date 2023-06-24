// import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import notify from "../hooks/useNotification";
import { ThreeDots } from "react-loader-spinner";

const ForgetPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(false);
    try {
      const res = await axios.post(
        "https://bekya.onrender.com/api/v1/auth/forgetPassword",
        {
          email: data.email,
        }
      );
      console.log(res);
      notify("Email sent Successfully", "success");
      setTimeout(() => {
        navigate("/verify", { replace: true });
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col">
      <div className="mb-12  lg:mb-0 flex items-center justify-center mt-20 pt-10">
        <Link to="/" className=" normal-case text-xl">
          <img src="/images/logoblack.png" className="w-fit h-[4.8rem]"></img>
        </Link>
      </div>
      <div className="border mx-auto mt-4 mr-52 ml-52 rounded-lg shadow-lg flex flex-col items-center justify-center md:flex-row md:items-center md:justify-center md:border-0">
        <ToastContainer />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[500px] w-full mx-auto p-8 px-8"
        >
          <h2 className="text-4xl text-primary font-bold text-center pb-7">
            Forgot Password?
          </h2>
          <h6 className="pb-7 text-center">
            Please enter your email to send a verification code
          </h6>
          <div className="flex flex-col text-secondary py-2">
            <label htmlFor="email">Email</label>
            <input
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (v) =>
                    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(v),
                },
              })}
              className="rounded-lg bg-white px-3 py-3 mt-2 pt-2 border border-gray-300 focus:border-blue-400 focus:bg-[#FFF8F4] focus:outline-primary dark:placeholder-gray-400 dark:text-secondary"
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="example@mail.com"
            />
            {errors.email?.type === "required" && (
              <span className="text-red-500 mt-2">Email is required</span>
            )}
            {errors.email?.type === "matchPattern" && (
              <span className="text-red-500 mt-2">
                Email is not in the right format
              </span>
            )}
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}

          <div className="flex justify-center">
            {isLoading ? (
              <ThreeDots
                wrapperClass="text-primary flex justify-center items-center"
                color="currentColor"
              />
            ) : (
              <button className="w-full py-3 bg-primary border  border-primary hover:bg-white hover:border-primary hover:text-primary rounded-lg text-white font-semibold text-[20px]">
                Continue{" "}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
