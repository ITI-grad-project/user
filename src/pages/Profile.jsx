import { useState, useEffect } from "react";
import Personallnfo from "../components/Personallnfo";
import ChangePassword from "../components/ChangePassword";
import Address from "../components/Address";
import Orders from "../components/Orders";
import Products from "../components/Products";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Avatar from "../components/avatar";

function Profile() {
  const [LoggedUser, setLoggedUser] = useState();
  const [UserAddress, setUserAddress] = useState([
    {
      country: "",
      governorate: "",
      city: "",
      street: "",
      build_no: "",
    },
  ]);
  const [currentTab, setCurrentTab] = useState(1);
  const [activeButton, setActiveButton] = useState(1);
  const [photo, setPhoto] = useState("");

  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    async function getUser() {
      await axios
        .get("https://bekya.onrender.com/api/v1/user/getMe/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((Response) => {
          setLoggedUser(Response?.data?.data);
          console.log("profile Response", Response?.data);
        });
    }
    async function getAddressUser() {
      await axios
        .get("https://bekya.onrender.com/api/v1/addresses/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((Response) => {
          if (Response.data.data.length !== 0) {
            setUserAddress(Response.data.data);
          }

          console.log("Address", Response.data.data);
        });
    }
    getUser();
    getAddressUser();
  }, []);

  console.log("profile: User", LoggedUser);

  const handleEditUserAccount = (EditedUser) => {
    setLoggedUser({ ...LoggedUser, ...EditedUser });
  };
  // const handleAddAddress = (NewAdd) => {
  //   console.log("newwwwww", NewAdd);
  //   console.log("oldddd", UserAddress);
  //   setUserAddress([...UserAddress, NewAdd]);
  // };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-6 md:px-0 lg:px-8 xl:px-8 2xl:px-32 py-10">
        <div className="grid grid-cols-10 lg:grid-cols-10 gap-6">
          <div className="col-span-10 lg:col-span-2 2xl:col-span-2 flex flex-col lg:border-2 rounded py-8">
            {/* <div className="h-96 col-span-10 lg:col-span-2 2xl:col-span-2 flex flex-col justify-center items-center lg:border-2 rounded py-8"> */}
            <div className="flex flex-col justify-center items-center">
              {LoggedUser?.profileImg ? (
                <img
                  className="w-28 h-28 object-cover rounded-full mb-2"
                  src={LoggedUser?.profileImg}
                  alt="ProfileImg"
                />
              ) : (
                <Avatar width={28} />
              )}

              <h3 className="text-center text-[20px] font-[600] mb-3">
                {LoggedUser?.userName}
              </h3>
            </div>
            <div className="flex justify-between flex-col md:flex-row lg:flex-col w-full">
              <button
                className={` py-1 text-lg font-medium rounded lg:w-full px-10 ${
                  activeButton === 1
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => {
                  setCurrentTab(1);
                  setActiveButton(1);
                }}
              >
                Account
              </button>
              <button
                className={`py-1 text-lg font-medium rounded lg:w-full px-10 ${
                  activeButton === 2
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => {
                  setCurrentTab(2);
                  setActiveButton(2);
                }}
              >
                Password
              </button>
              <button
                className={` py-1 text-lg font-medium rounded lg:w-full px-10 ${
                  activeButton === 3
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => {
                  setCurrentTab(3);
                  setActiveButton(3);
                }}
              >
                Address
              </button>
              <button
                className={` py-1 text-lg font-medium rounded lg:w-full px-10 ${
                  activeButton === 4
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => {
                  setCurrentTab(4);
                  setActiveButton(4);
                }}
              >
                Orders
              </button>
              <button
                className={` py-1 text-lg font-medium rounded lg:w-full px-10 ${
                  activeButton === 5
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => {
                  setCurrentTab(5);
                  setActiveButton(5);
                }}
              >
                Products
              </button>
            </div>
          </div>
          <div className="border-2 col-span-10 lg:col-span-8 2xl:col-span-8 rounded">
            {currentTab === 1 ? (
              <Personallnfo
                LoggedUser={LoggedUser}
                handleEditUserAccount={handleEditUserAccount}
                photo={photo}
                setPhoto={setPhoto}
              />
            ) : currentTab === 2 ? (
              <ChangePassword />
            ) : currentTab === 3 ? (
              <Address
                UserAddress={UserAddress}
                // handleAddAddress={handleAddAddress}
                setUserAddress={setUserAddress}
              />
            ) : currentTab === 4 ? (
              <Orders />
            ) : (
              <Products />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
