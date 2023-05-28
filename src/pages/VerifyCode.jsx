import axios from "axios";
import { useState } from "react";
// import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import notify from "../hooks/useNotification";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const VerifyCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
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
        "https://bekya.onrender.com/api/v1/auth/verifyCode",
        {
          code: data.code,
        }
      );
      notify("Verified", "success");
      setTimeout(() => {
        navigate("/newPassword", { replace: true });
      }, 2000);
      console.log(res);
    } catch (error) {
      console.log(error.response.data.message);
      notify("Code is invalid", "error");
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
      <div className="border mx-auto mt-4 mr-52 ml-52 rounded-lg shadow-lg flex flex-col items-center justify-center md:flex-row md:items-center md:justify-center md:border-0">
        <ToastContainer />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[500px] w-full mx-auto p-8 px-8"
        >
          <h2 className="text-4xl text-primary font-bold text-center pb-7">
            Verification Code{" "}
          </h2>
          <h6 className="pb-7 text-center">
            Please enter your verification code
          </h6>
          <div className="flex flex-col text-secondary py-2">
            <label htmlFor="">Verification Code</label>
            <input
              {...register("code", {
                required: true,
              })}
              className="rounded-lg bg-white px-3 py-3 mt-2 pt-2 border border-gray-300 focus:border-blue-400 focus:bg-[#FFF8F4] focus:outline-primary dark:placeholder-gray-400 dark:text-secondary"
              type="text"
              id="code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              placeholder="code"
            />
            {errors.code?.type === "required" && (
              <span className="text-red-500">Code is required</span>
            )}
          </div>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <div className="flex justify-center">
            {isLoading ? (
              <ThreeDots color="#933D24" />
            ) : (
              <button className="w-full py-3 bg-primary border  border-primary hover:bg-white hover:border-primary hover:text-primary rounded-lg text-white font-semibold text-[20px]">
                Verify{" "}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
