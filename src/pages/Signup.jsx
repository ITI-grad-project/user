import { useState } from "react";
import loginImg from "../assets/image3.png";
import { useForm } from "react-hook-form";
// import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import notify from "../hooks/useNotification";
import { ToastContainer } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

// import { GoogleLogin } from "@react-oauth/google";
// import formData from "../../formData.json";
export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm();
  const pwd = watch("password");

  ///
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  ///
  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);
    axios
      .post("https://bekya.onrender.com/api/v1/auth/signup", {
        userName: data.userName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })
      .then(function (res) {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        setIsLoading(false);

        localStorage.setItem("user", JSON.stringify(res.data.data));
        setIsLoading(false);

        notify("Sign up successfully", "success");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      })
      .catch(function (err) {
        setIsLoading(false);

        let newError = [];
        console.log(err);
        if (err.response) {
          newError = err.response.data.errors.map((err) => err.msg);
        }
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        newError.forEach((err) => {
          notify(err, "error");
        });
      });
  };

  return (
    <div className="border m-16 rounded-lg shadow-lg flex items-center justify-center md:border-0">
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
          className="max-w-[500px] w-full mx-auto p-8 h-fit  "
        >
          <h2 className="text-4xl text-[#933D24] font-bold text-center pb-7">
            Sign Up{" "}
          </h2>
          <div className="flex flex-col text-black py-2">
            <label htmlFor="">User Name </label>
            <input
              {...register("userName", { required: true })}
              className="rounded-lg bg-white px-3 py-3 mt-2 pt-2 border border-gray-300 focus:border-blue-400 focus:bg-[#FFF8F4] focus:outline-[#933D24] dark:placeholder-gray-400 dark:text-white"
              type="text"
              placeholder="John max"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            {errors.userName?.type === "required" && (
              <span className="text-red-500 ">user name is required</span>
            )}
          </div>
          <div className="flex flex-col text-black py-2">
            <label htmlFor="">Email </label>
            <input
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (v) =>
                    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(v),
                },
              })}
              className="rounded-lg bg-white px-3 py-3 mt-2 pt-2 border border-gray-300 focus:border-blue-400 focus:bg-[#FFF8F4] focus:outline-[#933D24] dark:placeholder-gray-400 dark:text-white"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {errors.email?.type === "required" && (
              <span className="text-red-500">Email is required</span>
            )}
            {errors.email?.type === "matchPattern" && (
              <span className="text-red-500">
                Email is not in the right format
              </span>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-4 ">
            <div className="flex flex-col text-black py-2">
              <label htmlFor="">Password </label>
              <input
                {...register("password", { required: true, minLength: 5 })}
                className="rounded-lg bg-white px-3 py-3 mt-2 pt-2 border border-gray-300 focus:border-blue-400 focus:bg-white focus:outline-[#933D24]"
                type="password"
                placeholder="•••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500">Password is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500">
                  Make the password at least 6 numbers
                </span>
              )}
            </div>
            <div className="flex flex-col w-full text-black py-2">
              <label htmlFor="">Confirm Password </label>
              <input
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === pwd || "Passwords do not match",
                  minLength: 5,
                })}
                className="rounded-lg bg-white px-2 py-3 mt-2 pt-2  items-center  border  border-gray-300 focus:border-blue-400 focus:bg-white focus:outline-[#933D24]"
                type="password"
                placeholder="•••••••••"
                value={confirmPwd}
                onChange={(e) => {
                  setConfirmPwd(e.target.value);
                }}
              />
              {errors.confirmPassword?.type === "required" && (
                <span className="text-red-500 ">
                  Confirm Password is required
                </span>
              )}
              {errors.confirmPassword?.type === "validate" && (
                <span className="text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between text-[#933D24] py-5">
            <p className="flex items-center">
              <input
                className="mr-2 bg-[#933D24] text-[#933D24]"
                type="checkbox"
              />{" "}
              Remember Me
            </p>
            <Link to="/forgotPassword" className="cursor-pointer">
              Forgot Password?
            </Link>
          </div>
          <div className="flex justify-center">
            {isLoading ? (
              <ThreeDots color="#933D24" />
            ) : (
              <button className="w-full py-3 bg-[#933D24] border  border-[#933D24] hover:bg-white hover:border-[#933D24] hover:text-[#933D24] rounded-lg text-white font-semibold text-[20px]">
                Sign Up
              </button>
            )}
          </div>
          <div className="flex justify-center mt-5">
            <p className="flex text-center ">
              Already have an account ?{" "}
              <Link to="/login" className="pl-2 text-primary">
                Login
              </Link>
            </p>
          </div>
          {/* <GoogleLogin /> */}
        </form>
      </div>
    </div>
  );
}
