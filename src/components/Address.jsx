import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./Input";
import ProfilePhoto from "./ProfilePhoto";
import { useState } from "react";
import axios from "axios";

const schema = yup.object({
  country: yup.string().required("required field"),
  governorate: yup.string().required("required field"),
  city: yup.string().required("required field"),
  street: yup.string().required("required field"),
  buildNo: yup.number().required("required field"),
});

const Address = ({ UserAddress, setUserAddress, handleAddAddress }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      console.log("Address: dataaaaaaaaaaaa", data);
      setAddressEditBtn(0);

      const NewAddress = {
        alias: "Home",
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
        // }
      );
      handleAddAddress(NewAddress);
      console.log(update);
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
    } catch (err) {
      console.log(err);
    }
  };

  const [AddressEditBtn, setAddressEditBtn] = useState(0);
  // const [removebtn, setRemovebtn] = useState(0);
  const [selected, setSelected] = useState("yes");

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
                      fill="primary"
                      height="1.2em"
                      width="1.2em"
                      className="text-primary cursor-pointer"
                      onClick={() => {
                        removeAddress(address?._id);
                      }}
                    >
                      <path d="M8.707 19.707L18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 00-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 000-2.828L19.414 3a2 2 0 00-2.828 0L15 4.586 19.414 9 21 7.414z" />
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
                <p className="font-[600] mb-2 text-[15px]">Alias</p>
                <input
                  type="radio"
                  name="alias"
                  {...register("home")}
                  className="radio radio-primary h-5 w-5"
                />
                Home
                <input
                  type="radio"
                  name="alias"
                  {...register("work")}
                  className="radio radio-primary h-5 w-5"
                  defaultChecked
                  // {...(AddressEditBtn === 0 && !watch("radio-4"))}
                />
                Work
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
