import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import notify from "../hooks/useNotification";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

function Cart({ cartItems, setCartItems }) {
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);

  const BaseURL = "https://bekya.onrender.com";
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    async function getLoggedUserCart() {
      const { data } = await axios.get(`${BaseURL}/api/v1/cart/`, config);
      console.log("data from cart", data);
      setNumberOfCartItems(data.numberOfCartItems);
      setCartItems(data.userCart.cartItems);
      setTotalPrice(data.userCart.totalPrice);
      console.log(cartItems);
    }
    getLoggedUserCart();
  }, []);

  const handleRemoveFromCart = async (productID) => {
    try {
      const { data } = await axios.delete(
        `${BaseURL}/api/v1/cart/${productID}`,
        config
      );
      console.log("data after remove one item", data);
      notify(data.message, "success");
      const newListofCart = cartItems.filter((item) => item._id !== productID);
      setCartItems(newListofCart);
      setNumberOfCartItems(newListofCart.length);
      setTotalPrice(data.userCart.totalPrice);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAllFromCart = async () => {
    try {
      const { data } = await axios.delete(`${BaseURL}/api/v1/cart/`, config);
      // console.log(data);
      setCartItems([]);
      setNumberOfCartItems(0);
      setTotalPrice(0);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <>
    //   <ToastContainer />
    //   <div className="flex flex-col justify-center items-center m-10">
    //     <h2 className="font-bold text-3xl uppercase text-center">Cart</h2>
    //     <hr className="w-16 bg-primary h-1 mt-2" />
    //   </div>
    //   <div className="flex px-28 gap-8">
    //     <div className="w-2/3">
    //       <div className="border-b-2 border-base-300 ">
    //         <div className=" justify-between">
    //           <h1 className="capitalize text-xl font-semibold">My Cart</h1>
    //           <div className="flex self-center justify-between">
    //             <div className="flex">
    //               <span class=" self-center text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-yellow-200 h-fit ">
    //                 {numberOfCartItems}
    //               </span>
    //               <h3 className="capitalize">Items</h3>
    //               {cartItems?.length !== 0 ? (
    //                 <div
    //                   className="text-xs hover:text-red-500 hover:underline hover:cursor-pointer"
    //                   onClick={handleRemoveAllFromCart}
    //                 >
    //                   Remove All
    //                 </div>
    //               ) : (
    //                 ""
    //               )}
    //             </div>
    //             <h3 className="capitalize">Price</h3>
    //           </div>
    //         </div>
    //       </div>
    //       {cartItems?.length === 0 && (
    //         <h1 className="border-b-2 border-base-300 pb-20 pt-4">
    //           Your cart is empty ...
    //         </h1>
    //       )}
    //       {cartItems?.map((product) => {
    //         return (
    //           <div
    //             className="mt-4 flex justify-between border-b-2  border-base-300"
    //             key={product._id}
    //           >
    //             <div className="flex gap-4">
    //               <Link to={`/productDetails/${product.product._id}`}>
    //                 <img
    //                   className="h-32 w-32 rounded-xl mb-4"
    //                   src={`${product.product.images[0].image}`}
    //                   alt="image description"
    //                 />
    //               </Link>
    //               <div>
    //                 <Link
    //                   to={`/productDetails/${product.product._id}`}
    //                   className="font-bold capitalize hover:text-primary hover:underline"
    //                 >
    //                   {product.product.title}
    //                 </Link>
    //                 <div
    //                   onClick={() => {
    //                     handleRemoveFromCart(product._id);
    //                   }}
    //                   href="#"
    //                   className="text-xs text-secondary hover:text-red-500 hover:underline hover:cursor-pointer"
    //                 >
    //                   Remove From Cart
    //                 </div>
    //               </div>
    //             </div>
    //             <h2 className="font-bold">EGP {product.price}</h2>
    //           </div>
    //         );
    //       })}
    //     </div>
    //     <div className="w-1/3 border border-base-300 rounded-lg p-6 h-fit">
    //       <h1 className="text-xl  text-center font-semibold">Order Summary</h1>
    //       <div className="flex justify-between pt-3">
    //         <h2 className="capitalize">items</h2>
    //         <p>{cartItems?.length}</p>
    //       </div>
    //       <div className="flex justify-between border-t-2 border-base-300 mt-3 font-bold">
    //         <h2 className="capitalize">subtotal</h2>
    //         <p>EGP {totalPrice}</p>
    //       </div>
    //       <Link to="/checkout" className="btn-sm btn w-full btn-primary mt-3">
    //         Proceed to Buy
    //       </Link>
    //     </div>
    //   </div>
    // </>
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center m-10">
        <h2 className="font-bold text-3xl uppercase text-center">Cart</h2>
        <hr className="w-16 bg-primary h-1 mt-2" />
      </div>
      <div className="flex flex-col lg:flex-row px-5 lg:px-28 gap-8">
        <div className="w-full lg:w-2/3">
          <div className="border-b-2 border-base-300">
            <div className="justify-between">
              <h1 className="capitalize text-xl font-semibold">My Cart</h1>
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="flex items-center mb-2 lg:mb-0">
                  <span className="self-center text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-yellow-200 h-fit">
                    {numberOfCartItems}
                  </span>
                  <h3 className="capitalize">Items</h3>
                  {cartItems?.length !== 0 && (
                    <div
                      className="text-xs text-red-400 hover:text-red-500 hover:underline hover:cursor-pointer ml-2 flex gap-1"
                      onClick={handleRemoveAllFromCart}
                    >
                      <i class="fa-solid fa-trash"></i>
                      <h3>Remove All</h3>
                    </div>
                  )}
                </div>
                <h3 className="capitalize">Price</h3>
              </div>
            </div>
          </div>
          {cartItems?.length === 0 ? (
            <h1 className="border-b-2 border-base-300 pb-20 pt-4">
              Your cart is empty ...
            </h1>
          ) : (
            cartItems?.map((product) => {
              return (
                <div
                  className="mt-4 flex flex-col lg:flex-row justify-between border-b-2 border-base-300"
                  key={product._id}
                >
                  <div className="flex gap-4">
                    <Link to={`/productDetails/${product.product._id}`}>
                      <img
                        className="h-32 w-32 rounded-xl mb-4"
                        src={`${product.product.images[0].image}`}
                        alt="image description"
                      />
                    </Link>
                    <div>
                      <Link
                        to={`/productDetails/${product.product._id}`}
                        className="font-bold capitalize hover:text-primary hover:underline"
                      >
                        {product.product.title}
                      </Link>
                      <div
                        onClick={() => {
                          handleRemoveFromCart(product._id);
                        }}
                        href="#"
                        className="text-xs text-red-400 hover:text-red-500 hover:underline hover:cursor-pointer mt-1 flex gap-1"
                      >
                        {/* Remove From Cart */}
                        <i class="fa-solid fa-trash"></i>
                        <h3>Remove</h3>
                      </div>
                    </div>
                  </div>
                  <h2 className="font-bold">EGP {product.price}</h2>
                </div>
              );
            })
          )}
        </div>
        <div className="w-full lg:w-1/3 border border-base-300 rounded-lg h-fit p-6">
          <h1 className="text-xl text-center font-semibold">Order Summary</h1>
          <div className="flex justify-between pt-3">
            <h2 className="capitalize">Items</h2>
            <p>{cartItems?.length}</p>
          </div>
          <div className="flex justify-between border-t-2 border-base-300 mt-3 font-bold">
            <h2 className="capitalize">Subtotal</h2>
            <p>EGP {totalPrice}</p>
          </div>
          <Link
            to="/checkout"
            className="btn-sm btn w-full btn-primary mt-3 disabled"
            disabled={`${cartItems.length === 0 ? "disabled" : ""}`}
          >
            Proceed to Buy
          </Link>
        </div>
      </div>
    </>
  );
}

export default Cart;
