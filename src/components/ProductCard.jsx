import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import notify from "../hooks/useNotification";
import { ToastContainer } from "react-toastify";

function ProductCard({ product, loginState, setLoginState }) {
  console.log("product from card", product);
  const navigate = useNavigate();

  const [wishListed, setWishListed] = useState(true);

  const toggleWishListed = () => {
    if (loginState === true) {
      setWishListed((prevState) => !prevState);
    } else {
      notify("You must login first", "warn");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const handleAddToCart = (event) => {
    // event.stopPropagation();
    if (loginState === true) {
    } else {
      notify("You must login first", "warn");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const maxRating = 5;
  const filledStar = Array(product.user.ratingQuantity).fill(0);
  const unFilledStar = Array(maxRating - product.user.ratingQuantity).fill(0);
  // console.log(unFilledStar);

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }}>
        <div className="card w-72 hover:shadow-2xl" key={product._id}>
          <figure>
            <div className="relative w-full">
              <img
                className="w-full h-full max-h-60"
                src={`${product.images[0].image}`}
                alt={product.title}
              />
              <button
                onClick={toggleWishListed}
                className="bg-white w-10 h-10 rounded-lg  m-2 absolute top-0 right-0 flex justify-center items-center hover:shadow-lg "
              >
                <div className=" text-primary hover:text-yellow-600 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={wishListed ? "none" : "currentColor"}
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
                to={`/productDetails/${product._id}`}
                className="prod-card-container "
              >
                <h2 className="prod-card-title text-lg hover:underline hover:text-primary ">
                  {product.title}
                </h2>
              </Link>
              <h2 className="text-primary font-bold text-lg">
                EGP {product.price}
              </h2>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 mt-2 self-center">
                <img
                  className="rounded-full w-8 h-8"
                  src={`${product.user.profileImg}`}
                />
                <h3 className="self-center capitalize text-sm">
                  {product.user.userName}
                </h3>
              </div>
              <div className="self-center flex">
                {filledStar.map((fStar) => {
                  console.log("fStar", fStar);
                  return (
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="fill"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
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
                {unFilledStar.map((unfStar) => {
                  console.log("unfStar", unfStar);
                  return (
                    <div className="self-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
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
                <div class=" text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-yellow-200  ml-1">
                  5.0
                </div>
              </div>
            </div>
            <div className="card-actions w-full mt-2">
              <button
                onClick={handleAddToCart}
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
