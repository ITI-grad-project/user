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
      <div className="px-32">
        <div className="grid grid-cols-10 gap-6">
          <div className="col-span-2 flex flex-col justify-center items-center border-2 rounded py-8">
            <div>
              <img
                className="w-28 h-28 object-cover rounded-full mb-2"
                src="src/assets/women.jpg"
                alt=""
              />
              <h3 className="text-center text-[20px] font-[600] mb-3">
                Laila Ahmed
              </h3>
            </div>
            <div className="flex flex-col">
              <button
                className={`px-16 py-1 text-[18px] font-[400] rounded ${
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
                className={`px-16 py-1 text-[18px] font-[400] rounded ${
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
                className={`px-16 py-1 text-[18px] font-[400] rounded ${
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
                className={`px-16 py-1 text-[18px] font-[400] rounded ${
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
                className={`px-16 py-1 text-[18px] font-[400] rounded ${
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
          <div className="border-2 col-span-8">
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
