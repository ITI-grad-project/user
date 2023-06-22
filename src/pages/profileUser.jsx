import React, { useMemo } from "react";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import ButtonProfile from "../components/buttonProfile";
import { useParams } from "react-router";
import Avatar from "../components/avatar";
import StarRating from "../components/Stars";
import notify from "../hooks/useNotification";
import UserProfileData from "../components/userProfileData";
import UserProfileProducts from "../components/userProfileProducts";
import UserProfileReviews from "../components/UserProfileReviews";

function ProfileUser() {
  const [currentTab, setCurrentTab] = useState(1);
  const [activeButton, setActiveButton] = useState(1);
  const [userData, setUserData] = useState([]);
  const [products, setProducts] = useState();
  const [reviews, setReviews] = useState([]);
  const [address, setAddress] = useState([]);
  const BaseURL = "https://bekya.onrender.com";

  const { id } = useParams();
  let titles = ["user profile", "reviews", "products"];

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
          }
        }
      } catch (err) {
        if (err?.response?.data?.message) {
          notify(err.response.data.message, "error");
        }
      }
    };
    getUserData();
  }, [reviews.length, userData?.ratingsAverage]);

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="container mx-auto px-6 md:px-0 lg:px-8 xl:px-8 2xl:px-32 py-10">
        <div className="grid grid-cols-10 lg:grid-cols-10 gap-6 ">
          <div className="col-span-10  h-fit lg:col-span-2 2xl:col-span-2 flex flex-col justify-center items-center lg:border-2 rounded py-8">
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
                {userData?.ratingsAverage ? (
                  <StarRating
                    rating={Math.round(userData?.ratingsAverage)}
                  ></StarRating>
                ) : (
                  <StarRating rating={0}></StarRating>
                )}
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
                  key={idx}
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
              <UserProfileData
                id={id}
                userData={userData}
                setUserData={setUserData}
                reviews={reviews}
                address={address}
                setReviews={setReviews}
              ></UserProfileData>
            ) : currentTab === 2 ? (
              <UserProfileReviews
                reviews={reviews}
                setReviews={setReviews}
                id={id}
              ></UserProfileReviews>
            ) : (
              <UserProfileProducts
                products={products}
                setProducts={setProducts}
                id={id}
              ></UserProfileProducts>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileUser;
