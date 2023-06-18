import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./Input";
import ProfilePhoto from "./ProfilePhoto";
import { useState } from "react";
import axios from "axios";
// import { useRef } from "react";

const schema = yup.object({
  firstname: yup.string(),
  lastname: yup.string(),
  email: yup.string().email("you should enter a valid email"),
  // .required("required field"),
  phone: yup
    .number()
    // .required("required field")
    .min(11, "Password should be 11 numbers"),
});

const Personallnfo = ({
  LoggedUser,
  handleEditUserAccount,
  imgFile,
  setImgFile,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let FName, LName;

  // const [updatedPhoto, setUpdatedphoto] = useState("");
  const onSubmit = async (data) => {
    try {
      var gender;
      console.log("Account: dataaaaaaaaaaaa", data);
      setEditbtn(0);
      if (data.female === "on") {
        gender = "female";
      } else {
        gender = "male";
      }
      let DataObj = {
        email: data.email,
        userName: data.firstname + " " + data.lastname,
        phone: data.phone,
        gender: gender,
      };
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

      <form onSubmit={handleSubmit(onSubmit)}>
        {editbtn === 1 && (
          <ProfilePhoto
            LoggedUser={LoggedUser}
            imgFile={imgFile}
            setImgFile={setImgFile}
            // handleEditUserAccount={handleEditUserAccount}
            // setUpdatedphoto={setUpdatedphoto}
          />
        )}
        <div className="flex md:flex-row flex-col md:gap-16 gap-4">
          <div>
            {/* <p className="font-[600] mb-2 text-[15px]">First Name</p> */}
            <Input
              label="First Name"
              name="firstname"
              type="text"
              placeholder={
                LoggedUser?.userName
                  ? (LoggedUser?.userName?.split(" "))[0]
                  : " "
              }
              register={register("firstname")}
              errorMessage={errors.firstname?.message}
              disabled={!watch("firstname")}
              editbtn={editbtn}
            />
          </div>
          <div>
            <Input
              label="Last Name"
              name="lastname"
              type="text"
              placeholder={
                LoggedUser?.userName
                  ? (LoggedUser?.userName?.split(" "))[1]
                  : " "
              }
              register={register("lastname")}
              errorMessage={errors.lastname?.message}
              disabled={!watch("email")}
              editbtn={editbtn}
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:gap-16 gap-4 my-5">
          <div>
            <Input
              label="Email"
              name="email"
              type="text"
              placeholder={LoggedUser.email || ""}
              // value={LoggedUser.email || ""}
              register={register("email")}
              errorMessage={errors.email?.message}
              disabled={!watch("email")}
              editbtn={editbtn}
            />
          </div>
          <div>
            <Input
              label="phone Number"
              name="phone"
              type="tel"
              placeholder={LoggedUser?.phone}
              register={register("phone")}
              errorMessage={errors.phone?.message}
              disabled={!watch("phone")}
              editbtn={editbtn}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <p className="font-[600] mb-2 text-[15px]">Gender</p>
          <input
            type="radio"
            name="gender"
            {...register("male")}
            className="radio radio-primary h-5 w-5"
            value="no"
            checked={selected === "no"}
            onChange={handleChange}
          />
          Male
          <input
            type="radio"
            name="gender"
            {...register("female")}
            className="radio radio-primary h-5 w-5"
            value="yes"
            checked={selected === "yes"}
            onChange={handleChange}

            // defaultChecked
            // {...(editbtn === 0 && !watch("radio-4"))}
          />
          Female
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
