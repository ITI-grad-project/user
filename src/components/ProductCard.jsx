import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import notify from "../hooks/useNotification";
import axios from "axios";
import Avatar from "../components/avatar";

function ProductCard({
  product,
  loginState,
  cartItems,
  setCartItems,
  setWishlistedItems,
  wishlistedItems,
}) {
  // console.log("product from card", product);

  const navigate = useNavigate();

  const [wishListed, setWishListed] = useState(false);

  const BaseURL = "https://bekya.onrender.com";
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const toggleWishListed = async (productID) => {
    setWishListed((prevState) => !prevState);
    console.log(wishListed);
    if (wishListed) {
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
    }
  };

  const handleAddToWishlist = async (productID) => {
    if (loginState === true) {
      if (!wishListed) {
        // const check = cartItems?.find(product._id == productID);
        // console.log("check", check);
        // const token = localStorage.getItem("token");
        const prodID = { productId: productID };
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     "Content-Type": "application/json",
        //   },
        // };
        try {
          const response = await axios.post(
            `${BaseURL}/api/v1/wishlist/`,
            prodID,
            config
          );
          toggleWishListed(productID);
          notify("Item Added to wishlist successfully", "success");
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      } else {
        toggleWishListed(productID);
      }
    } else {
      notify("You must login first", "warn");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const handleAddToCart = async (productID) => {
    console.log("productID", productID);
    console.log("login state", loginState);

    if (loginState === true) {
      const check = cartItems?.find(product._id == productID);
      console.log("check", check);
      const token = localStorage.getItem("token");
      const prodID = { productId: productID };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await axios.post(
          `${BaseURL}/api/v1/cart/`,
          prodID,
          config
        );
        if (response.data.status == "fail") {
          notify(response.data.message, "error");
        } else {
          notify(response.data.message, "success");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      notify("You must login first", "warn");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const maxRating = 5;
  const filledStar = useMemo(() => {
    return product?.user?.ratingsAverage
      ? Array(Math.round(product?.user?.ratingsAverage)).fill(0)
      : [];
  }, [product?.user?.ratingsAverage]);

  const unFilledStar = useMemo(() => {
    return Array(Math.round(maxRating - filledStar?.length)).fill(0);
  }, [maxRating, filledStar?.length]);

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }}>
        <div className="card w-72 hover:shadow-2xl" key={product?._id}>
          <figure>
            <div className="relative w-full">
              <img
                className="w-full h-full max-h-60"
                src={`${product?.images[0]?.image}`}
                alt={product?.title}
              />
              <button
                onClick={() => {
                  handleAddToWishlist(product?._id);
                }}
                className="bg-white w-10 h-10 rounded-lg  m-2 absolute top-0 right-0 flex justify-center items-center  "
              >
                <div className=" text-primary hover:text-yellow-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={!wishListed ? "none" : "currentColor"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </figure>
          <div className="p-3 ">
            <div>
              <Link
                to={`/productDetails/${product?._id}`}
                className="prod-card-container "
              >
                <h2 className="prod-card-title text-lg hover:underline hover:text-primary ">
                  {product?.title}
                </h2>
              </Link>

              <h2 className="text-primary font-bold text-lg">
                EGP {product?.price}
              </h2>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 mt-2 self-center">
                {product.user?.profileImg ? (
                  <img
                    src={product.user?.profileImg}
                    className="w-13 h-11 rounded-full"
                  />
                ) : (
                  <Avatar></Avatar>
                )}
                <h3 className="self-center capitalize text-sm">
                  {product.user?.userName}
                </h3>
              </div>
              <div className="self-center flex">
                {filledStar.map((fStar, idx) => {
                  return (
                    <div key={idx}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#F2C76E"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#F2C76E"
                        className="w-4 h-4 mt-[6px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </div>
                  );
                })}

                {unFilledStar.map((unfStar, idx) => {
                  return (
                    <div key={idx} className="self-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#F2C76E"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </div>
                  );
                })}

                <div className="flex justify-center align-middle font-semibold mr-2 px-2.5 py-0.5 rounded bg-yellow-200  ml-1">
                  <span className=" text-base ">
                    {product?.user?.ratingQuantity}
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
            <div className="card-actions w-full mt-2">
              <button
                onClick={() => {
                  handleAddToCart(product._id);
                }}
                className="btn btn-primary text-white w-full"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default ProductCard;