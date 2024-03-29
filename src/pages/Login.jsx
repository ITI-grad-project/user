// import React from "react";
// import { GoogleLogin } from "@react-oauth/google";
import loginImg from "../assets/image3.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import notify from "../hooks/useNotification";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Password from "../components/password";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // handle showPassword
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(false);
    try {
      const res = await axios.post(
        "https://bekya.onrender.com/api/v1/auth/login",

        {
          email: data.email,
          password: data.password,
        }
      );
      console.log(res);
      setIsLoading(false);
      setError(false);
      console.log(res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("isLoggedIn", true);
      notify("Login successfully", "success");
      console.log("login success");
      navigate("/", { replace: true });
    } catch (error) {
      setIsLoading(false);

      console.log(error);
      if (error.response.data) {
        console.log(error.response.data.message);
        notify("Login Failed", "error");
        setError(error.response.data.message);
      }
    }
  };

  const onSuccess = async (credentialResponse) => {
    if (credentialResponse) {
      document.body.style.overflowX = "hidden";
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          "https://bekya.onrender.com/api/v1/auth/googleLogin",
          { googleToken: credentialResponse.credential }
        );
        if (data.message == "login success") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          notify("login success", "success");
          setTimeout(() => {
            window.location.href = "/";
            window.location.replace = true;
          }, 1500);
        }
      } catch (err) {
        console.log(err);
        if (err.response) {
          notify(err.response.data.message, "error");
        }
      }
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="mb-12 lg:mb-0 flex items-center justify-center ">
        <Link to="/" className=" normal-case text-xl   mb-5">
          <img src="/images/logoblack.png" className="w-fit h-[4.8rem]"></img>
        </Link>
      </div>
      <div className="border mx-16 rounded-lg shadow-lg flex items-center justify-center md:border-0">
        <ToastContainer />
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full  ">
          <div className="hidden md:block ">
            <img
              className="w-full h-[81vh] object-cover border rounded-tl-lg rounded-bl-lg"
              src={loginImg}
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[500px]   w-full mx-auto p-8 px-8   "
          >
            <h2 className="text-4xl text-primary font-bold text-center pb-7">
              Sign In{" "}
            </h2>
            <div className="flex flex-col text-secondary py-2">
              <label htmlFor="">Email </label>
              <input
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (v) =>
                      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(v),
                  },
                })}
                className="rounded-lg bg-white px-3 py-3 mt-2 pt-2 border border-gray-300  focus:border-blue-400 focus:bg-[#FFF8F4] focus:outline-primary dark:placeholder-gray-400 dark:text-secondary"
                type="email"
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
            <div className="flex flex-col text-secondary py-2">
              <label htmlFor="">Password </label>
              <div className="flex justify-around align-middle">
                <input
                  {...register("password", { required: true, minLength: 8 })}
                  className="rounded-lg w-full bg-white px-3 py-3 mt-2 pt-2 border border-gray-300 focus:border-blue-400 focus:bg-white focus:outline-primary"
                  placeholder="•••••••••"
                  type={showPassword ? "text" : "password"}
                />
                <Password
                  showPassword={showPassword}
                  handleShowPassword={handleShowPassword}
                ></Password>
              </div>
              {errors.password?.type === "required" && (
                <span className="text-red-500 mt-2">Password is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500 mt-2">
                  Make the password at least 8 numbers
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3 justify-between text-primary ">
              <div className="pt-4 md:pl-24">
                <GoogleLogin onSuccess={onSuccess} />
              </div>
              <Link
                to="/forgotPassword"
                className="cursor-pointer flex justify-center mb-3"
              >
                Forgot Password?
              </Link>
            </div>
            {error && <p className="text-red-500 mb-2 capitalize"> {error}</p>}
            <div className="flex justify-center">
              {isLoading ? (
                <ThreeDots
                  wrapperClass="text-primary flex justify-center items-center"
                  color="currentColor"
                />
              ) : (
                <button className="w-full py-3 bg-primary border  border-primary hover:bg-white hover:border-primary hover:text-primary rounded-lg text-white font-semibold text-[20px]">
                  Sign In
                </button>
              )}
            </div>
            <div className="flex justify-center mt-5">
              <p className="flex text-center ">
                Do not have an account ?{" "}
                <Link to="/signup" className="pl-2 text-primary">
                  Sign Up
                </Link>
              </p>
            </div>
            {/* <GoogleLogin onSuccess={onSuccess} /> */}
          </form>
        </div>
      </div>
    </div>
  );
}
