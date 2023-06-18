import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import notify from "../hooks/useNotification";

function Favorite({ wishlistedItems, setWishlistedItems }) {
  // const [wishlistedItems, setWishlistedItems] = useState([]);
  const [isWishlistLoading, setIsWishListLoading] = useState(false);

  const BaseURL = "https://bekya.onrender.com";
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    setIsWishListLoading(true);
    async function getWishlistOfUser() {
      const { data } = await axios.get(`${BaseURL}/api/v1/wishlist/`, config);
      console.log(data.data);
      setIsWishListLoading(false);
      setWishlistedItems(data?.data);
    }
    getWishlistOfUser();
  }, []);

  const handleRemoveFromWishlist = async (productID) => {
    try {
      const { data } = await axios.delete(
        `${BaseURL}/api/v1/wishlist/${productID}`,
        config
      );
      notify(data.message, "warn");
      const newWishlist = wishlistedItems.filter(
        (item) => item._id !== productID
      );
      console.log(newWishlist);
      setWishlistedItems(newWishlist);
    } catch (error) {
      console.log(error);
      // notify()
    }
  };

  const handleAddToCart = async (productID) => {
    console.log("productID", productID);
    try {
      const response = await axios.post(
        `${BaseURL}/api/v1/cart/`,
        { productId: productID },
        config
      );
      notify("Item Added to Cart successfully", "success");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center m-10">
        <h2 className="font-bold text-3xl uppercase text-center">WishList</h2>
        <hr className="w-16 bg-primary h-1 mt-2" />
      </div>
      <div className="px-5 lg:px-28 gap-8">
        <div className="border-b-2 border-base-300">
          <div className=" flex justify-between">
            <h1 className="capitalize text-xl font-semibold">My List</h1>
            <div className="flex  items-center mb-2 lg:mb-0">
              <span className="self-center text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-yellow-200 h-fit">
                {wishlistedItems?.length}
              </span>
              <h3 className="capitalize">Items</h3>
            </div>
          </div>
        </div>
        {isWishlistLoading ? (
          <div
            role="status"
            className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center border-b-2 border-base-300 mt-4"
          >
            <div className="flex items-center justify-center w-40 h-32  bg-gray-300  mb-4 rounded-lg dark:bg-gray-700">
              <svg
                className="w-12 h-12 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
            <div className="w-full">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div>
            {wishlistedItems?.length === 0 ? (
              <h1 className="border-b-2 border-base-300 pb-20 pt-4">
                Your List is empty ...
              </h1>
            ) : (
              wishlistedItems?.map((product) => {
                return (
                  <div
                    className="mt-4 flex flex-col sm:flex-row justify-between border-b-2 border-base-300"
                    key={product._id}
                  >
                    <div className="flex gap-4">
                      <Link to={`/productDetails/`}>
                        <img
                          className="h-32 w-32 rounded-xl mb-4"
                          src={`${product.images[0]?.image}`}
                          alt="image description"
                        />
                      </Link>
                      <div>
                        <Link
                          to={`/productDetails/${product?._id}`}
                          className="font-bold capitalize hover:text-primary hover:underline"
                        >
                          {product?.title}
                        </Link>
                        <div href="#" className="text-s ">
                          <h3>
                            by <span>{product?.user.userName}</span>
                          </h3>
                          <h3 className="font-semibold">
                            EGP {product?.price}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-xs">
                        Item Added at {product?.createdAt}
                      </h4>
                      <button
                        onClick={() => {
                          handleAddToCart(product?._id);
                        }}
                        className="btn btn-primary btn-sm rounded-lg w-full my-1"
                      >
                        Add to Cart
                      </button>
                      <div
                        onClick={() => {
                          handleRemoveFromWishlist(product?._id);
                        }}
                        className="text-xs btn btn-error btn-outline btn-xs mx-auto text-red-400 hover:text-red-500 hover:underline hover:cursor-pointer my-1 w-fit flex gap-1 "
                      >
                        <i className="fa-solid fa-trash"></i>
                        <h3>Remove</h3>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* <div
          role="status"
          className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center border-b-2 border-base-300 mt-4"
        >
          <div className="flex items-center justify-center w-40 h-32  bg-gray-300  mb-4 rounded-lg dark:bg-gray-700">
            <svg
              className="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <div className="w-full">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div> */}
      </div>
    </>
  );
}

export default Favorite;
