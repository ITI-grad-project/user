import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import Input from "./Input";
import EyeShowIcon from "../assets/icons/EyeShowIcon";
import EyeSlashIcon from "../assets/icons/EyeSlashIcon";
import { toast } from "react-toastify";
import notify from "../hooks/useNotification";

const schema = yup.object({
  currentPassword: yup.string().required("required field"),
  password: yup
    .string()
    .required("required field")
    .min(8, "Password should be greater than 8 characters"),
  confirmPassword: yup
    .string()
    .required("required field")
    .oneOf([yup.ref("password")], "Confirm Password do not match"),
});

export default function ChangePassword() {
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (dataForm) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://bekya.onrender.com/api/v1/user/changePassword",
        dataForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
      notify("Password Changed Successfully", "success");
    } catch (error) {
      console.log(error);
      setLoading(false);
      const { data } = error.response;
      console.log(data.errors[0]);
      if (data.errors[0].path === "currentPassword") {
        notify(data.errors[0].msg, "error");
      }
      // if(data.errors[0].path === "currentPassword") {setError(data.errors[0].msg)}
      // if(data.errors[0].path !== "password" && data.errors[0].path !== "currentPassword"){
      //   toast.error(data.errors[0].msg);
      // }
    }
  };

  const handleShowCurrentPass = () => {
    setShowCurrentPass(!showCurrentPass);
  };
  const handleShowNewPass = () => {
    setShowNewPass(!showNewPass);
  };
  const handleShowConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  return (
    <div className="p-6">
      <h4 className="font-bold text-lg text-primary mb-3">Change Password</h4>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="relative">
          <Input
            label="Current Password"
            name="currentPassword"
            type={showCurrentPass ? "text" : "password"}
            placeholder=""
            register={{ ...register("currentPassword") }}
            errorMessage={errors.currentPassword?.message}
          />
          <span
            className="absolute top-12 right-4 cursor-pointer"
            onClick={handleShowCurrentPass}
          >
            {showCurrentPass ? <EyeShowIcon /> : <EyeSlashIcon />}
          </span>
        </div>
        <div className="relative">
          <Input
            label="New Password"
            name="password"
            type={showNewPass ? "text" : "password"}
            placeholder=""
            register={{ ...register("password") }}
            errorMessage={errors.password?.message}
          />
          <span
            className="absolute top-12 right-4 cursor-pointer"
            onClick={handleShowNewPass}
          >
            {showNewPass ? <EyeShowIcon /> : <EyeSlashIcon />}
          </span>
        </div>
        <div className="relative">
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPass ? "text" : "password"}
            placeholder="●●●●●●●●●●●●"
            register={{ ...register("confirmPassword") }}
            errorMessage={errors.confirmPassword?.message}
          />
          <span
            className="absolute top-12 right-4 cursor-pointer"
            onClick={handleShowConfirmPass}
          >
            {showConfirmPass ? <EyeShowIcon /> : <EyeSlashIcon />}
          </span>
        </div>

        <div className="form-control mt-6 justify-center items-center">
          <button className="btn btn-primary capitalize text-white w-[50%]">
            {/* <span>
                    {loading && (
                      <Loader w={"w-6"} h={"h-6"} color={"fill-white"} />
                    )}{" "}
                  </span> */}
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
