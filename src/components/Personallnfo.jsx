import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./Input";
import ProfilePhoto from "./ProfilePhoto";
import { useEffect, useState } from "react";
import axios from "axios";
import notify from "../hooks/useNotification";
// import { useRef } from "react";

const schema = yup.object({
  firstname: yup
    .string()
    .required("required field")
    .min(3, "first name must be at least 3 characters"),
  lastname: yup
    .string()
    .required("required field")
    .min(3, "last name must be at least 3 characters"),
  email: yup
    .string()
    .required("required field")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email is not valid"),
  phone: yup
    .string()
    .required("required field")
    .min(11, "Password should be 11 numbers"),
});

const Personallnfo = ({
  LoggedUser,
  // defaultValues,
  // emailBeforeEdit,
  handleEditUserAccount,
  imgFile,
  setImgFile,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    // defaultValues: {
    //   firstname: LoggedUser?.userName?.split(" ")[0],
    //   lastname: LoggedUser?.userName?.split(" ")[1],
    //   email: LoggedUser?.email,
    //   phone: LoggedUser?.phone,
    //   gender: LoggedUser?.gender,
    // },
  });

  let FName, LName;
  // const [defaultValuesInputs, setDefaultValuesInputs] = useState(defaultValues);
  const [emailBeforeEdit, setEmailBeforeEdit] = useState();
  // const [updatedPhoto, setUpdatedphoto] = useState("");
  const onSubmit = async (data) => {
    try {
      // var gender;
      console.log("Account: dataaaaaaaaaaaa", data);
      setEditbtn(0);
      // if (data.female === "on") {
      //   gender = "female";
      // } else {
      //   gender = "male";
      // }
      console.log(emailBeforeEdit, " ", data.email);
      // let DataObj = (emailBeforeEdit === data.email) ? {
      //   userName: data.firstname + " " + data.lastname,
      //   phone: data.phone,
      //   gender: gender,
      // } : {
      //   email: data.email,
      //   userName: data.firstname + " " + data.lastname,
      //   phone: data.phone,
      //   gender: gender,
      // };
      let DataObj;
      if (emailBeforeEdit === data.email) {
        DataObj = {
          userName: data.firstname + " " + data.lastname,
          phone: data.phone,
          gender: data.gender,
        };
      } else {
        DataObj = {
          email: data.email,
          userName: data.firstname + " " + data.lastname,
          phone: data.phone,
          gender: data.gender,
        };
      }
      console.log("edit this ..", DataObj);
      const { update } = await axios.put(
        "https://bekya.onrender.com/api/v1/user/updateMe",
        DataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("update", update);
      // DataObj = { ...DataObj, profileImg: updatedPhoto };
      handleEditUserAccount(DataObj);
      notify("Data Updated Successfully", "success");
      // const FullName = LoggedUser?.userName?.split(" ");
      // console.log(FullName);
      // FName = FullName[0];
      // LName = FullName[1];

      // console.log(update);
      // toast.success("data Changed Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setEmailBeforeEdit(LoggedUser?.email);
    setValue("firstname", LoggedUser?.userName?.split(" ")[0]);
    setValue("lastname", LoggedUser?.userName?.split(" ")[1]);
    setValue("email", LoggedUser?.email);
    setValue("phone", LoggedUser?.phone);
    setValue("gender", LoggedUser?.gender);
    // let defaultValues = {
    //   firstname: LoggedUser?.userName?.split(" ")[0],
    //   lastname: LoggedUser?.userName?.split(" ")[1],
    //   email: LoggedUser?.email,
    //   phone: LoggedUser?.phone,
    //   gender: LoggedUser?.gender,
    // };
    // console.log(defaultValues)
    // reset( {...defaultValues} );
  }, [LoggedUser]);

  // useEffect(() => {
  //   async function getUser() {
  //     await axios
  //       .get("https://bekya.onrender.com/api/v1/user/getMe/", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       })
  //       .then((Response) => {
  //         // setValue("photo", Response?.data.photo);
  //         // setSelectedImage(data.data.photo);
  //         setEmailBeforeEdit(getValues("email"));
  //         setValue("firstname", (Response?.data.data.userName?.split(" "))[0]);
  //         setValue("lastname", (Response?.data.data.userName?.split(" "))[1]);
  //         setValue("email", Response?.data.data.email);
  //         setValue("phone", Response?.data.data.phone);
  //         setValue("gender", Response?.data.data.gender);
  //         // setLoggedUser(Response?.data?.data);
  //         console.log("profile Response", Response?.data.data);
  //       });
  //   }
  //   getUser();
  // }, []);

  const [editbtn, setEditbtn] = useState(0);
  const [selected, setSelected] = useState("yes");
  const handleChange = (event) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h3 className="text-[20px] text-primary font-[600] mb-5">
          {(editbtn === 0 && "Personal Information") ||
            "Update Personal Information"}
        </h3>
        {editbtn === 0 && (
          <svg
            viewBox="0 0 24 24"
            fill="primary"
            height="1.2em"
            width="1.2em"
            className="text-primary cursor-pointer"
            onClick={() => {
              setEditbtn(1);
            }}
          >
            <path d="M8.707 19.707L18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 00-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 000-2.828L19.414 3a2 2 0 00-2.828 0L15 4.586 19.414 9 21 7.414z" />
          </svg>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} >
        {editbtn === 1 && (
          <ProfilePhoto
            LoggedUser={LoggedUser}
            imgFile={imgFile}
            setImgFile={setImgFile}
            // handleEditUserAccount={handleEditUserAccount}
            // setUpdatedphoto={setUpdatedphoto}
          />
        )}
        <div className="flex md:flex-row flex-col md:gap-16 gap-4 md:justify-center">
          <div className="md:w-[50%]">
            {/* <p className="font-[600] mb-2 text-[15px]">First Name</p> */}
            <Input
              label="First Name"
              name="firstname"
              type="text"
              // value={
              //   LoggedUser?.userName
              //     ? (LoggedUser?.userName?.split(" "))[0]
              //     : " "
              // }
              register={{ ...register("firstname") }}
              errorMessage={errors.firstname?.message}
              disabled
              // disabled={!watch("firstname")}
              editbtn={editbtn}
            />
          </div>
          <div className="md:w-[50%]">
            <Input
              label="Last Name"
              name="lastname"
              type="text"
              // value={
              //   LoggedUser?.userName
              //     ? (LoggedUser?.userName?.split(" "))[1]
              //     : " "
              // }
              register={{ ...register("lastname") }}
              errorMessage={errors.lastname?.message}
              // disabled={!watch("email")}
              disabled
              editbtn={editbtn}
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:gap-16 gap-4 md:justify-center my-5">
          <div className="md:w-[50%]">
            <Input
              label="Email"
              name="email"
              type="text"
              // value={LoggedUser.email}
              // value={LoggedUser.email || ""}
              register={{ ...register("email") }}
              errorMessage={errors.email?.message}
              // disabled={!watch("email")}
              disabled
              editbtn={editbtn}
            />
          </div>
          <div className="md:w-[50%]">
            <Input
              label="Phone Number"
              name="phone"
              type="text"
              // value={LoggedUser?.phone}
              register={{ ...register("phone") }}
              errorMessage={errors.phone?.message}
              // disabled={!watch("phone")}
              disabled
              editbtn={editbtn}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="font-[600] text-[15px]">Gender</p>
          <input
            id="male-radio"
            type="radio"
            name="gender"
            value="male"
            {...register("gender")}
            className="radio radio-primary h-5 w-5"
            // checked={selected === "no"}
            // onChange={handleChange}
            // disabled
            // {editbtn === 0 && disabled}
          />
          <label
            htmlFor="male-radio"
            className="cursor-pointer"
          >
            Male
          </label>
          
          <input
            id="female-radio"
            type="radio"
            name="gender"
            value="female"
            {...register("gender")}
            className="radio radio-primary h-5 w-5"
            // checked={selected === "yes"}
            // onChange={handleChange}
            // {...(editbtn === 0 && disabled)}
            // defaultChecked
            // {...(editbtn === 0 && !watch("radio-4"))}
          />
          <label
            htmlFor="female-radio"
            className="cursor-pointer"
          >
            Female
          </label>
        </div>

        {editbtn === 1 && (
          <div className="form-control mt-6 justify-center items-center">
            <button
              type="submit"
              className="btn btn-primary capitalize text-white w-[50%]"
            >
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Personallnfo;
