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
export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
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
      localStorage.setItem("user", res.data.data.userName);
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

  // const onSuccess = async (credentialResponse) => {
  //   if (credentialResponse) {
  //     document.body.style.overflowX = "hidden";
  //     try {
  //       const { data } = await axios.post(
  //         "https://bekya.onrender.com/api/v1/auth/googleLogin",
  //         {
  //           googleToken: credentialResponse.credential,
  //         }
  //       );
  //       if (data.message == "login success") {
  //         localStorage.setItem("token", data.token);
  //         localStorage.setItem("user", JSON.stringify(data.user));
  //         // setTimeout(() => {
  //         //   window.location.href = "/";
  //         //   window.location.replace = true;
  //         // }, 1500);
  //       }
  //     } catch (err) {
  //       if (err.response) {
  //         // toast.error(err.response.data.message);
  //         console.log(err);
  //       }
  //     }
  //     // setLoading(false);
  //   }
  //};
  return (
    <div className="flex flex-col">
      <Link
        to="/"
        className="btn btn-ghost normal-case w-fit text-xl mx-auto my-7"
      >
        MYReFurB
      </Link>
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
              <input
                {...register("password", { required: true, minLength: 8 })}
                className="rounded-lg  bg-white px-3 py-3 mt-2 pt-2 border border-gray-300 focus:border-blue-400 focus:bg-white focus:outline-primary"
                type="password"
                placeholder="•••••••••"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500 mt-2">Password is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500 mt-2">
                  Make the password at least 8 numbers
                </span>
              )}
            </div>

            <div className="flex justify-between text-primary py-5">
              {/* <p className="flex items-center">
              <input className="mr-2 bg-primary text-primary" type="checkbox" />{" "}
              Remember Me
            </p> */}
              <Link to="/forgotPassword" className="cursor-pointer">
                Forgot Password?
              </Link>
            </div>
            {error && <p className="text-red-500 mb-2 capitalize"> {error}</p>}
            <div className="flex justify-center">
              {isLoading ? (
                <ThreeDots color="#FFD336" />
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
