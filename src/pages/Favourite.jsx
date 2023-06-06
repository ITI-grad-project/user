import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import notify from "../hooks/useNotification";

function Favorite({ setCartItems }) {
  const [wishlistedItems, setWishlistedItems] = useState([]);

  const BaseURL = "https://bekya.onrender.com";
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    async function getWishlistOfUser() {
      const { data } = await axios.get(`${BaseURL}/api/v1/wishlist/`, config);
      console.log(data.data);
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
      notify(data.message, "success");
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
      notify("Item Added to wishlist successfully", "success");
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
                      to={`/productDetails/`}
                      className="font-bold capitalize hover:text-primary hover:underline"
                    >
                      {product?.title}
                    </Link>
                    <div href="#" className="text-s ">
                      <h3>
                        by <span>{product?.user.userName}</span>
                      </h3>
                      <h3 className="font-semibold">EGP {product?.price}</h3>
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
                    className="btn btn-primary btn-sm rounded-full w-full my-1"
                  >
                    Add to Cart
                  </button>
                  <div
                    onClick={() => {
                      handleRemoveFromWishlist(product?._id);
                    }}
                    className="text-xs text-red-400 hover:text-red-500 hover:underline hover:cursor-pointer my-1 w-fit flex gap-1 "
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
    </>
  );
}

export default Favorite;
