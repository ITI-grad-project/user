import React, { useMemo } from "react";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import ButtonProfile from "../components/buttonProfile";
import { useParams } from "react-router";
import Input from "../components/Input";
import Avatar from "../components/avatar";
function ProfileUser() {
  const BaseURL = "https://bekya.onrender.com";

  let titles = ["user profile", "reviews", "products"];

  const [LoggedUser, setLoggedUser] = useState([]);
  const [currentTab, setCurrentTab] = useState(1);
  const [activeButton, setActiveButton] = useState(1);
  const [userData, setUserData] = useState([]);
  const [address, setAddress] = useState([]);
  const { id } = useParams();

  const maxRating = 5;
  const filledStar = useMemo(() => {
    return userData?.ratingsAverage
      ? Array(Math.round(userData?.ratingsAverage)).fill(0)
      : [];
  }, [userData?.ratingsAverage]);

  const unFilledStar = useMemo(() => {
    return Array(Math.round(maxRating - filledStar?.length)).fill(0);
  }, [maxRating, filledStar?.length]);

  useEffect(() => {
    let getUserData = async () => {
      try {
        let { data: userDetails } = await axios.get(
          `${BaseURL}/api/v1/user/getUserDetails/${id}`
        );
        if (userDetails) {
          setUserData(userDetails.data);
          if (userDetails.data.addresses) {
            setAddress(userDetails.data.addresses[0]);
            console.log(address);
          }
          console.log(userDetails.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="container mx-auto px-6 md:px-0 lg:px-8 xl:px-8 2xl:px-32 py-10">
        <div className="grid grid-cols-10 lg:grid-cols-10 gap-6">
          <div className="col-span-10 lg:col-span-2 2xl:col-span-2 flex flex-col justify-center items-center lg:border-2 rounded py-8">
            <div>
              {userData?.profileImg ? (
                <img
                  className="w-[10rem] h-[11rem] object-cover rounded-full mb-2"
                  src={userData?.profileImg}
                  alt=""
                />
              ) : (
                <Avatar width={"10rem"}></Avatar>
              )}

              <h3 className="text-center text-[20px] font-[600]">
                {userData.userName}
              </h3>
              <div className="self-center flex m-3">
                {filledStar.map((fStar, idx) => {
                  return (
                    <div key={idx}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#F2C76E"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#F2C76E"
                        className="w-4 h-4 mt-[6px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </div>
                  );
                })}

                {unFilledStar.map((unfStar, idx) => {
                  return (
                    <div key={idx} className="self-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#F2C76E"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </div>
                  );
                })}

                <div className="flex justify-center align-middle font-semibold mr-2 px-2.5 py-0.5 rounded bg-yellow-200  ml-1">
                  <span className=" text-base ">
                    {userData?.ratingQuantity}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mt-[4px] ml-[4px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex justify-between flex-col md:flex-row lg:flex-col w-full">
              {titles.map((ele, idx) => (
                <ButtonProfile
                  title={ele}
                  setActiveButton={setActiveButton}
                  setCurrentTab={setCurrentTab}
                  number={idx + 1}
                  activeButton={activeButton}
                ></ButtonProfile>
              ))}
            </div>
          </div>
          <div className="border-2 col-span-10 lg:col-span-8 2xl:col-span-8">
            {currentTab === 1 ? (
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
                  </div>
                </form>
              </div>
            ) : currentTab === 2 ? (
              <h1>reviews</h1>
            ) : (
              <h1>products</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileUser;
