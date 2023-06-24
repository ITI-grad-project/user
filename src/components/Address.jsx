import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./Input";
import { useState, useEffect } from "react";
import axios from "axios";
import notify from "../hooks/useNotification";

const schema = yup.object({
  country: yup.string().required("required field"),
  governorate: yup.string().required("required field"),
  city: yup.string().required("required field"),
  street: yup.string().required("required field"),
  buildNo: yup.number().required("required field"),
});

const Address = ({ UserAddress, setUserAddress }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // useEffect(() => {
  //   setAddressEditBtn(0);
  // }, [UserAddress]);

  const onSubmit = async (data) => {
    try {
      console.log("Address: dataaaa", data);

      const NewAddress = {
        alias: data.alias,
        country: data.country,
        governorate: data.governorate,
        city: data.city,
        street: data.street,
        build_no: data.buildNo,
      };

      const { update } = await axios.post(
        "https://bekya.onrender.com/api/v1/addresses/",
        NewAddress,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await setUserAddress([...UserAddress, NewAddress]);
      // setAddressEditBtn(0);
      notify("Address Added Successfully", "success");
      setAddressEditBtn(0);
    } catch (err) {
      console.log(err);
    }
  };

  const removeAddress = async (AddressID) => {
    try {
      await axios.delete(
        `https://bekya.onrender.com/api/v1/addresses/${AddressID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const newAddress = UserAddress.filter((Add) => Add._id !== AddressID);
      setUserAddress(newAddress);
      notify("Address Deleted Successfully", "success");
    } catch (err) {
      console.log(err);
    }
  };

  const [AddressEditBtn, setAddressEditBtn] = useState(0);

  // let i = 0;
  // useEffect(() => {
  //   setValue("alias", UserAddress[i]?.alias);
  //   if (i === UserAddress?.length) {
  //     i = 0;
  //   } else {
  //     i++;
  //   }
  // }, [UserAddress]);
  const [selectedAdd, setSelectedAdd] = useState("Home");
  const handleChangeAdd = (event) => {
    console.log(event.target.value);
    setSelectedAdd(event.target.value);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h3 className="text-[20px] text-primary font-[600] mb-5">
          {(AddressEditBtn === 0 && "Address") || "Add new Address"}
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {UserAddress?.map((address, index) =>
          // console.log(address);
          AddressEditBtn === 1 && index > 0 ? null : (
            <div
              key={index}
              className={AddressEditBtn === 0 && `border-2 p-6 mb-4`}
            >
              <div className="flex justify-between">
                <div className="flex md:flex-row flex-col md:gap-16 gap-4">
                  <div>
                    <Input
                      label="Country"
                      name="country"
                      type="text"
                      placeholder={address?.country || ""}
                      register={register("country")}
                      errorMessage={errors.country?.message}
                      disabled={!watch("country")}
                      editbtn={AddressEditBtn}
                    />
                  </div>
                  <div>
                    <Input
                      label="Governorate"
                      name="governorate"
                      type="text"
                      placeholder={address?.governorate || ""}
                      register={register("governorate")}
                      errorMessage={errors.governorate?.message}
                      disabled={!watch("governorate")}
                      editbtn={AddressEditBtn}
                    />
                  </div>
                </div>
                <div>
                  {AddressEditBtn === 0 && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      className="cursor-pointer text-red-700"
                      onClick={() => {
                        removeAddress(address?._id);
                      }}
                    >
                      <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex md:flex-row flex-col xl:gap-16 gap-4 my-5 flex-wrap lg:gap-10">
                <div>
                  <Input
                    label="City"
                    name="city"
                    type="text"
                    placeholder={address?.city || ""}
                    // value={LoggedUser.city || ""}
                    register={register("city")}
                    errorMessage={errors.city?.message}
                    disabled={!watch("city")}
                    editbtn={AddressEditBtn}
                  />
                </div>
                <div>
                  <Input
                    label="Street"
                    name="street"
                    type="text"
                    placeholder={address?.street || ""}
                    register={register("street")}
                    errorMessage={errors.street?.message}
                    disabled={!watch("street")}
                    editbtn={AddressEditBtn}
                  />
                </div>

                <div>
                  <Input
                    label="Build No"
                    name="buildNo"
                    type="number"
                    placeholder={address?.build_no || ""}
                    register={register("buildNo")}
                    errorMessage={errors.buildNo?.message}
                    disabled={!watch("buildNo")}
                    editbtn={AddressEditBtn}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <p className="font-[600] mb-2 text-[15px]">Alias:</p>
                {AddressEditBtn === 0 && (
                  <p className="font-[600] mb-2 text-[15px]">
                    {address?.alias}
                  </p>
                )}
                {/* {setSelectedAdd(address?.alias)} */}
                {AddressEditBtn === 1 && (
                  <>
                    <input
                      type="radio"
                      // name={`Address${index}`}
                      {...register("alias")}
                      className="radio radio-primary h-5 w-5"
                      value="Home"
                      checked={selectedAdd === "Home"}
                      onChange={handleChangeAdd}
                    />
                    Home
                    <input
                      type="radio"
                      // name={`Address${index}`}
                      {...register("alias")}
                      className="radio radio-primary h-5 w-5"
                      value="Work"
                      checked={selectedAdd === "Work"}
                      onChange={handleChangeAdd}
                      // {...(AddressEditBtn === 0 && !watch("radio-4"))}
                    />
                    Work
                  </>
                )}
              </div>
            </div>
          )
        )}

        {AddressEditBtn === 0 && (
          <button
            name="add"
            className="w-full btn my-3 btn-outline btn-primary"
            onClick={() => {
              setAddressEditBtn(1);
            }}
          >
            Add Another Address
          </button>
        )}

        {AddressEditBtn === 1 && (
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

export default Address;
