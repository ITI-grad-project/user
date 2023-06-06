import { useState } from "react";
import Personallnfo from "../components/Personallnfo";
import ChangePassword from "../components/ChangePassword";
import Address from "../components/Address";
import Orders from "../components/Orders";
import Products from "../components/Products";
function Profile() {
  const [currentTab, setCurrentTab] = useState(1);
  const [activeButton, setActiveButton] = useState(1);
  return (
    <>
      <div className="container mx-auto px-6 md:px-0 lg:px-8 xl:px-8 2xl:px-32">
        <div className="grid grid-cols-10 lg:grid-cols-10 gap-6">
          <div className="col-span-10 lg:col-span-2 2xl:col-span-2 flex flex-col justify-center items-center lg:border-2 rounded py-8">
            <div>
              <img
                className="w-28 h-28 object-cover rounded-full mb-2"
                src="src/assets/women.jpg"
                alt=""
              />
              <h3 className="text-center text-xl font-semibold mb-6">
                Laila Ahmed
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
          <div className="border-2 col-span-10 lg:col-span-8 2xl:col-span-8">
            {currentTab === 1 ? (
              <Personallnfo />
            ) : currentTab === 2 ? (
              <ChangePassword />
            ) : currentTab === 3 ? (
              <Address />
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
