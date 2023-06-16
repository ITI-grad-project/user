import { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import CancelIcon from "../assets/icons/CancelIcon";
import Order from "./Order";

export default function Orders() {
  const [orders, setOrders] = useState();
  // const [isCancel, setIsCancel] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMyOrders() {
      try {
        const { data } = await axios.get(
          "https://bekya.onrender.com/api/v1/orders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(data.data);
        setOrders(data?.data);
        // getMyOrdersProduct(orders?.cartItem[0]?.product);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    }
    // async function getMyOrdersProduct(id) {
    //   try {
    //     const { data } = await axios.get(
    //      `https://bekya.onrender.com/api/v1/products/${id}`,
    //     );
    //     console.log(data.data);
    //     setProducts(data?.data);
    //     setLoading(false);
    //   } catch (error) {
    //     setLoading(true);
    //     console.log(error);
    //   }
    // }
    getMyOrders();
  }, []);

  // const handleCancelOrder = async (orderID) => {
  //   try {
  //     const { data } = await axios.put(
  //       `https://bekya.onrender.com/api/v1/orders/${orderID}/cancel`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     console.log(data?.data);
  //     // Update app state
  //     console.log(data?.data?.cancelOrder);
  //     setIsCancel(data?.data?.cancelOrder);
  //     console.log(isCancel)
  //     // handleUpdateStatusOrder(data?.data);
  //   } catch (error) {
  //     console.log(error);
  //     // toast.error("Something went wrong, please try again later");
  //   }
  // };

  // const handleUpdateStatusOrder = (updatedOrder) => {
  //   let updatedOrders = orders.map((order) =>
  //     order._id === updatedOrder._id && updatedOrder.cancelOrder
  //       // ? { ...order, orderStatus: updatedOrder.orderStatus }
  //       ? { ...order, orderStatus: "canceled" }
  //       : order
  //   );
  //   setOrders(updatedOrders);
  // };
  return (
    <div className="p-6">
      <h4 className="font-bold text-lg text-primary md:mb-3">My Orders</h4>
      <div className="overflow-x-auto hidden md:block">
        {!loading && orders?.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/No Orders.png" alt="" className="w-52 h-52" />
            <p className="text-lg font-bold">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <>
            {!orders?.length && loading ? (
              <ThreeDots
                wrapperClass="text-primary flex justify-center items-center"
                color="currentColor"
              />
            ) : (
              <>
                {orders?.map((order) => (
                 <Order key={order?._id} order={order}/>
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* ------------------ Small Screen ----------------------------- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        <div className="space-y-3 rounded-lg divide-y divide-gray-200 pt-4 first:pt-0">
          {!loading && orders?.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <img src="/images/No Orders.png" alt="" className="w-52 h-52" />
              <p className="text-lg font-bold">You haven't any order yet.</p>
            </div>
          ) : (
            <>
              {!orders?.length && loading ? (
                <ThreeDots
                  wrapperClass="text-primary flex justify-center items-center"
                  color="currentColor"
                />
              ) : (
                <>
                  {orders?.map((order) => (
                    <div className="flex gap-5 pt-4" key={order?._id}>
                      <div className="avatar">
                        <div className="w-24 h-24 aspect-square rounded-xl">
                          <img src="https://images.unsplash.com/photo-1534653299134-96a171b61581?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=975&q=80" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold">
                          Trapstar London Irongate Cream Puffer Jacket
                        </h3>
                        <p className="pt-2">EGP {order?.totalOrderPrice}</p>
                        <span className={`order-status ${order?.orderStatus}`}>
                          {order?.orderStatus}
                        </span>
                        <p>
                          {new Date(order?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* <div className="overflow-x-auto">
  <table className="table w-full">
    <tbody className="divide-y divide-gray-200">
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="w-24 h-24 mask mask-square rounded-xl">
                <img src="https://images.unsplash.com/photo-1534653299134-96a171b61581?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=975&q=80" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold">Silver Leather High Heels</div>
              <div>EGP 300</div>
              <span className="py-1.5 px-6 w-28 text-center text-sm font-semibold text-yellow-800 bg-yellow-200 bg-opacity-70 rounded-2xl">
                  Pending
                </span>
                <p>23 May, 2023</p>
            </div>
          </div>
        </td>
      </tr>
     
    </tbody>
  </table>
</div> */}
    </div>
  );
}
