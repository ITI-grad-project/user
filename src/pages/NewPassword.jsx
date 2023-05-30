import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import notify from "../hooks/useNotification";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const NewPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm();
  const pwd = watch("password");

  const onSubmit = async (data) => {
    setError(false);
    setIsLoading(true);
    console.log(data);
    try {
      const res = await axios.put(
        "https://bekya.onrender.com/api/v1/auth/resetPassword",
        {
          email: data.email,
          password: data.password,
        }
      );
      console.log(res);
      localStorage.setItem("token", res.data.token);
      notify("Password changed", "success");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col">
      <Link
        to="/"
        className="btn btn-ghost normal-case w-fit text-xl mx-auto my-10"
      >
        MYReFurB
      </Link>
      <div className="border mx-auto mt-3 mr-52 ml-52 rounded-lg shadow-lg flex flex-col items-center justify-center md:flex-row md:items-center md:justify-center md:border-0">
        <ToastContainer />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[500px] w-full mx-auto p-8 px-8"
        >
          <h2 className="text-4xl text-primary font-bold text-center pb-7">
            New Password
          </h2>
          <h6 className="pb-7 text-center">
            Please enter your your new Password
          </h6>
          <div className="flex flex-col text-secondary py-2">
            <label htmlFor="email">Email</label>
            <input
              {...register("email", { required: true })}
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
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div className="flex flex-col text-secondary py-2">
            <label htmlFor="">Password </label>
            <input
              {...register("password", { required: true, minLength: 8 })}
              className="rounded-lg bg-white px-3 py-3 mt-2 pt-2 border border-gray-300 focus:border-blue-400 focus:bg-white focus:outline-primary"
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
                Make the password at least 8 numbers
              </span>
            )}
          </div>
          <div className="flex flex-col text-secondary py-2">
            <label htmlFor="">Confirm Password </label>
            <input
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === pwd || "Passwords do not match",
                minLength: 6,
              })}
              className="rounded-lg bg-white px-3 py-3 mt-2 pt-2 border border-gray-300 focus:border-blue-400 focus:bg-white focus:outline-primary"
              type="password"
              placeholder="•••••••••"
              value={confirmPwd}
              onChange={(e) => {
                setConfirmPwd(e.target.value);
              }}
            />
            {errors.confirmPassword?.type === "required" && (
              <span className="text-red-500">Confirm Password is required</span>
            )}
            {errors.confirmPassword?.type === "validate" && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <div className="flex justify-center">
            {isLoading ? (
              <ThreeDots color="#FFD336" />
            ) : (
              <button className="w-full py-3 bg-primary border  border-primary hover:bg-white hover:border-primary hover:text-primary rounded-lg text-white font-semibold text-[20px]">
                Change Password
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
