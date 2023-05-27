import { useState } from "react";

function ProductCard({ product }) {
  // console.log("product from card", product);

  const [wishListed, setWishListed] = useState(true);

  const toggleWishListed = () => {
    setWishListed((prevState) => !prevState);
  };

  const maxRating = 5;
  const filledStar = Array(product.user.ratingQuantity).fill(0);
  const unFilledStar = Array(maxRating - product.user.ratingQuantity).fill(0);
  // console.log(unFilledStar);

  return (
    <>
      <div className="card w-72 shadow-xl" key={product.id}>
        <figure>
          <div className="relative w-full">
            <img
              className="w-full h-full max-h-60"
              src={`${product.images[0].image}`}
              alt={product.title}
            />
            <button
              onClick={toggleWishListed}
              className="bg-white w-10 h-10 rounded-lg  m-2 absolute top-0 right-0 flex justify-center items-center  "
            >
              <div className=" text-primary hover:text-red-700">
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
            <div className="prod-card-container ">
              <h2 className="prod-card-title text-lg  ">{product.title}</h2>
            </div>
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
                  <div>
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
            </div>
          </div>
          <div className="card-actions w-full mt-2">
            <button className="btn btn-primary text-white w-full">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
