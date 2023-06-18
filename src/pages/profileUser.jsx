import React from "react";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import ButtonProfile from "../components/buttonProfile";

function ProfileUser() {
  const [LoggedUser, setLoggedUser] = useState([]);
  const [currentTab, setCurrentTab] = useState(1);
  const [activeButton, setActiveButton] = useState(1);

  const BaseURL = "https://bekya.onrender.com";
  let titles = ["user profile", "reviews", "products"];
  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="container mx-auto px-6 md:px-0 lg:px-8 xl:px-8 2xl:px-32 py-10">
        <div className="grid grid-cols-10 lg:grid-cols-10 gap-6">
          <div className="col-span-10 lg:col-span-2 2xl:col-span-2 flex flex-col justify-center items-center lg:border-2 rounded py-8">
            <div>
              <img
                className="w-28 h-28 object-cover rounded-full mb-2"
                src={LoggedUser.profileImg}
                alt=""
              />
              <h3 className="text-center text-[20px] font-[600] mb-3">
                {LoggedUser.userName}
              </h3>
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
              <h1>user details</h1>
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
