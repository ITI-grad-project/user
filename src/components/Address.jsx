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

const Address = ({ UserAddress }) => {
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

      const { update } = await axios.post(
        "https://bekya.onrender.com/api/v1/addresses/",
        {
          alias: "Home",
          country: data.country,
          governorate: data.governorate,
          city: data.city,
          street: data.street,
          build_no: data.buildNo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        // }
      );
      console.log(update);
    } catch (err) {
      console.log(err);
    }
  };

  const [AddressEditBtn, setAddressEditBtn] = useState(0);

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
              key={address?._id}
              className={AddressEditBtn === 0 && `border-2 p-6 mb-4`}
            >
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
