import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./Input";
import ProfilePhoto from "./ProfilePhoto";
import { useEffect, useState } from "react";
import axios from "axios";
import notify from "../hooks/useNotification";

const schema = yup.object({
  profileImg: yup.mixed(),
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
  photo,
  setPhoto,
}) => {
  const [editbtn, setEditbtn] = useState(0);
  const [selected, setSelected] = useState(true);
  const [emailBeforeEdit, setEmailBeforeEdit] = useState();
  // const [photo, setPhoto] = useState("");

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
  });

  useEffect(() => {
    let SelectGender;
    if (LoggedUser?.gender === "female") {
      SelectGender = true;
    } else {
      SelectGender = false;
    }
    setSelected(SelectGender);

    setEmailBeforeEdit(LoggedUser?.email);
    setValue("firstname", LoggedUser?.userName?.split(" ")[0]);
    setValue("lastname", LoggedUser?.userName?.split(" ")[1]);
    setValue("email", LoggedUser?.email);
    setValue("phone", LoggedUser?.phone);
    // setValue("gender", LoggedUser?.gender);
  }, [LoggedUser]);

  const handleChange = (event) => {
    console.log(event.target.value);
    if (event.target.value === "true") {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };
  // console.log(selected);
  // console.log(LoggedUser?.gender === "female");

  const onSubmit = async (data) => {
    try {
      // if (data.firstname === undefined && data.lastname !== undefined) {
      //   delete Object.assign(data, {
      //     userName: LoggedUser?.userName.split(" ")[0] + " " + data.lastname,
      //   })["lastname"];
      // } else if (data.firstname !== undefined && data.lastname === undefined) {
      //   delete Object.assign(data, {
      //     userName: data.firstname + " " + LoggedUser?.userName.split(" ")[1],
      //   })["firstname"];
      // } else if (data.firstname !== undefined && data.lastname !== undefined) {
      //   delete Object.assign(data, {
      //     userName: data.firstname + " " + data.lastname,
      //   })["lastname"];
      //   delete data["firstname"];
      // }

      // console.log(LoggedUser?.userName.split(" ")[1]);

      // const [updatedPhoto, setUpdatedphoto] = useState("");

      console.log("Account: dataaaa", data);
      setEditbtn(0);

      console.log(emailBeforeEdit, " ", data.email);

      if (data.gender === "true") {
        data.gender = "female";
      } else if (data.gender === "false" || data.gender === "null") {
        data.gender = "male";
      }

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
      const { data: userData } = await axios.put(
        "https://bekya.onrender.com/api/v1/user/updateMe",
        DataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (photo !== "") {
        await axios
          .put("https://bekya.onrender.com/api/v1/user/updatePhoto", photo, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log("hello photo", response?.data);
            console.log(photo);

            let UrlImg = URL.createObjectURL(photo.get("profileImg"));


            let FullObj = {
              ...DataObj,
              profileImg: UrlImg,
            };

            handleEditUserAccount(FullObj);
            let Userdata = userData.data;

            let StorageObj = {
              ...Userdata,
              profileImg: UrlImg,
            };
            localStorage.setItem("user", JSON.stringify(StorageObj));
          });
      } else {
        handleEditUserAccount(DataObj);
        localStorage.setItem("user", JSON.stringify(userData.data));
      }
      // localStorage.setItem("user", JSON.stringify({...userData.data, profileImg:photo}));

      notify("Data Updated Successfully", "success");
    } catch (err) {
      console.log(err);
    }
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
            setPhoto={setPhoto}
            // handleEditUserAccount={handleEditUserAccount}
            // setUpdatedphoto={setUpdatedphoto}
          />
        )}
        <div className="flex md:flex-row flex-col md:gap-16 gap-4 md:justify-center">
          <div className="md:w-[50%]">
            <Input
              label="First Name"
              name="firstname"
              type="text"
              register={{ ...register("firstname") }}
              errorMessage={errors.firstname?.message}
              disabled
              editbtn={editbtn}
            />
          </div>
          <div className="md:w-[50%]">
            <Input
              label="Last Name"
              name="lastname"
              type="text"
              register={{ ...register("lastname") }}
              errorMessage={errors.lastname?.message}
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
              register={{ ...register("email") }}
              errorMessage={errors.email?.message}
              disabled
              editbtn={editbtn}
            />
          </div>
          <div className="md:w-[50%]">
            <Input
              label="Phone Number"
              name="phone"
              type="text"
              register={{ ...register("phone") }}
              errorMessage={errors.phone?.message}
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
            {...register("gender")}
            className="radio radio-primary h-5 w-5"
            value={false}
            checked={selected === false}
            onChange={handleChange}
          />
          <label htmlFor="male-radio" className="cursor-pointer">
            Male
          </label>

          <input
            id="female-radio"
            type="radio"
            name="gender"
            {...register("gender")}
            className="radio radio-primary h-5 w-5"
            value={true}
            checked={selected === true}
            onChange={handleChange}
          />
          <label htmlFor="female-radio" className="cursor-pointer">
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
