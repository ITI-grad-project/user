import { useState } from "react";
import axios from "axios";

import CancelIcon from "../assets/icons/CancelIcon";
import ConfirmModal from "./ConfirmModal";

export default function Order({ order }) {
  const [isCancel, setIsCancel] = useState();

  const handleCancelOrder = async (orderID) => {
    try {
      const { data } = await axios.put(
        `https://bekya.onrender.com/api/v1/orders/${orderID}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data?.data);
      // Update app state
      console.log(data?.data?.cancelOrder);
      setIsCancel(data?.data?.cancelOrder);
      console.log(isCancel);
      // handleUpdateStatusOrder(data?.data);
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong, please try again later");
    }
  };
  return (
    <>
      <div className="hidden md:block">
        {order?.orderStatus === "pending" ? (
          <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between sm:items-center md:mb-3">
            <div>
              <h5 className="font-bold text-sm">
                Order <span className="text-sky-600">#{order?._id}</span>{" "}
              </h5>
              <p className="text-gray-600">Order Placed: {new Date(order?.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}</p>
            </div>
            {!order?.cancelOrder && !isCancel ? (
              <>
                <label
                  // onClick={() => handleCancelOrder(order?._id)}
                  className="bg-gray-50 border-none py-2 px-4 rounded-lg normal-case md:max-w-[25%] flex justify-center items-center cursor-pointer"
                  htmlFor={`my_modal_${order?._id}`}
                >
                  <span className="pr-0 lg:pr-2">
                    {" "}
                    <CancelIcon />{" "}
                  </span>{" "}
                  Cancel Order
                </label>
                <ConfirmModal
                id={order?._id}
                onClick={() => handleCancelOrder(order?._id)}
                message={"Cancel This Order?"}
              />
              </>
            ) : (
              <span className="text-gray-600">Canceled</span>
            )}
          </div>
        ): ("")}
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="capitalize text-sm">Product</th>
              <th className="capitalize text-sm">Price</th>
              <th className="capitalize text-sm">Status</th>
              {/* <th className="capitalize text-sm">Date</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {order?.cartItems?.map((item) => (
              <tr key={item?._id}>
                <th className="w-24">
                  <div className="avatar">
                    <div className="w-24 rounded-xl">
                      <img
                        src={item?.product?.images[0]?.image}
                        alt="product"
                      />
                    </div>
                  </div>
                </th>
                <td className="w-60 whitespace-normal capitalize">
                  {item?.product?.title}
                </td>
                <td>EGP {order?.totalOrderPrice}</td>
                <td>
                  <span className={`order-status ${order?.orderStatus}`}>
                    {order?.orderStatus}
                  </span>
                </td>
                {/* <td>
                  {new Date(order?.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  ----------------- Small Screen --------------- */}
      <div className="md:hidden">
      {order?.orderStatus === "pending" ? (
        <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between sm:items-center md:mb-3">
         <div className="pt-2">
          <h5 className="font-bold text-sm">
            Order <span className="text-sky-600">#{order?._id}</span>{" "}
          </h5>
          <p className="text-gray-600">
          {new Date(order?.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
          </p>
         </div>
          {!order?.cancelOrder && !isCancel ? (
            <>
              <label
                // onClick={() => handleCancelOrder(order?._id)}
                className="bg-gray-50 border-none py-2 px-4 rounded-lg normal-case md:max-w-[25%] flex justify-center items-center cursor-pointer"
                htmlFor={`my_modal_${order?._id}_mobile`}
              >
                <span className="pr-0 lg:pr-2">
                  {" "}
                  <CancelIcon />{" "}
                </span>{" "}
                Cancel
              </label>
              <ConfirmModal
              id={`${order?._id}_mobile`}
              onClick={() => handleCancelOrder(order?._id)}
              message={"Cancel This Order?"}
            />
            </>
          ) : (
            <span className="text-gray-600">Canceled</span>
          )}
        </div>
      ):("")}
        <div>
          {order?.cartItems?.map((item) => (
            <div key={item?._id} className="flex gap-5 pt-4">
              <div className="avatar">
                <div className="w-24 h-24 aspect-square rounded-xl">
                  <img src={item?.product?.images[0]?.image} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold capitalize">
                  {item?.product?.title}
                </h3>
                <p className="pt-2">EGP {order?.totalOrderPrice}</p>
                <span className={`order-status ${order?.orderStatus}`}>
                  {order?.orderStatus}
                </span>
                {/* <p>
                  {new Date(order?.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
