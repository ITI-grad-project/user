import React from "react";
import { useState, useEffect } from "react";

function UserProfileData({ userData, address }) {
  return (
    <>
      <div className="p-6">
        <h3 className="flex justify-center text-[20px] text-primary font-[600] mb-5">
          "Personal Information"
        </h3>
        <form>
          <div className="flex flex-col md:gap-4 gap-4">
            <div className=" flex justify-between gap-5 max-[480px]:flex-col">
              <div className="flex flex-col w-1/2 gap-2 max-[480px]:w-full">
                <label className="font-light text-gray-500 text-sm pl-1">
                  userName
                </label>
                <input
                  type="text"
                  placeholder={userData.userName}
                  className={` input input-bordered focus:outline-none disabled:placeholder-black disabled:bg-white  `}
                  disabled
                />
              </div>
              <div className="flex flex-col w-1/2 gap-2 max-[480px]:w-full">
                <label className="font-light text-gray-500 text-sm pl-1">
                  phone
                </label>
                <input
                  type="text"
                  placeholder={userData.phone || "not available"}
                  className={` input input-bordered focus:outline-none disabled:placeholder-black disabled:bg-white  `}
                  disabled
                />
              </div>
            </div>
            <div className=" flex justify-between gap-5">
              <div className="flex flex-col w-full gap-2">
                <label className="font-light text-gray-500 text-sm pl-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder={
                    address
                      ? `${address?.alias}: ${address?.country} - ${address?.governorate} - ${address?.street}`
                      : "not available"
                  }
                  className={` input input-bordered focus:outline-none disabled:placeholder-black disabled:bg-white  `}
                  disabled
                />
              </div>
            </div>
            <div className=" flex justify-between gap-5 max-[480px]:flex-col">
              <div className="flex flex-col w-1/2 gap-2 max-[480px]:w-full">
                <label className="font-light text-gray-500 text-sm pl-1">
                  Gender
                </label>
                <input
                  type="text"
                  placeholder={userData?.gender || "not available"}
                  className={` input input-bordered focus:outline-none disabled:placeholder-black disabled:bg-white  `}
                  disabled
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserProfileData;
