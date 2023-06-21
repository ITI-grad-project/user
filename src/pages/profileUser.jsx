import React, { useMemo } from "react";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import ButtonProfile from "../components/buttonProfile";
import { useParams } from "react-router";
import Avatar from "../components/avatar";
import moment from "moment/moment";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import StarRating from "../components/Stars";
import notify from "../hooks/useNotification";
import DeleteItem from "../components/deleteItem";

function ProfileUser() {
  const [user, setUser] = useState({});
  const [currentTab, setCurrentTab] = useState(1);
  const [activeButton, setActiveButton] = useState(1);
  const [userData, setUserData] = useState([]);
  const [address, setAddress] = useState([]);
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [userRate, setUserRate] = useState(0);
  const [userComment, setUserComment] = useState("");

  const { id } = useParams();

  const ratingChanged = (newRating) => {
    setUserRate(newRating);
  };
  const commentChanged = (comment) => {
    setUserComment(comment);
  };

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const BaseURL = "https://bekya.onrender.com";
  let titles = ["user profile", "reviews", "products"];

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    let getUserData = async () => {
      try {
        let { data: userDetails } = await axios.get(
          `${BaseURL}/api/v1/user/getUserDetails/${id}`
        );
        if (userDetails) {
          console.log(userDetails);
          setUserData(userDetails.data);
          if (userDetails.data.addresses) {
            setAddress(userDetails.data.addresses[0]);
          }
        }
      } catch (err) {
        if (err.response.data.message) {
          notify(err.response.data.message, "error");
        }
      }
    };
    getUserData();
  }, [reviews.length, userData?.ratingsAverage]);

  useEffect(() => {
    async function getMyProducts() {
      try {
        const { data } = await axios.get(
          `https://bekya.onrender.com/api/v1/products/?user=${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProducts(data?.data);
      } catch (err) {
        if (err.response.data.message) {
          notify(err.response.data.message, "error");
        }
      }
    }

    getMyProducts();
  }, []);

  useEffect(() => {
    async function getAllReviews() {
      try {
        const { data } = await axios.get(
          `https://bekya.onrender.com/api/v1/review/?targetUser=${id}`
        );
        setReviews(data.data);
      } catch (error) {
        if (err.response.data.message) {
          notify(err.response.data.message, "error");
        }
      }
    }
    getAllReviews();
  }, []);

  const handleAddReview = async () => {
    try {
      if (!userRate || !userComment) {
        throw Error("rate and comment is required");
      }
      setLoading(true);
      const { data: res } = await axios.post(
        "https://bekya.onrender.com/api/v1/review/",
        {
          comment: userComment,
          rating: userRate,
          targetUser: id,
        },
        config
      );
      if (res.message) {
        notify(res.message, "success");
        setReviews([res.data, ...reviews]);
      }
    } catch (err) {
      if (err.message) {
        notify(err.message, "error");
      }
      if (err?.response?.data.message) {
        notify(err.response.data.message, "error");
      }
      if (err?.response?.data.errors[0]) {
        notify(err.response.data.errors[0].msg, "error");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="container mx-auto px-6 md:px-0 lg:px-8 xl:px-8 2xl:px-32 py-10">
        <div className="grid grid-cols-10 lg:grid-cols-10 gap-6 ">
          <div className="col-span-10  h-fit lg:col-span-2 2xl:col-span-2 flex flex-col justify-center items-center lg:border-2 rounded py-8">
            <div>
              {userData?.profileImg ? (
                <img
                  className="w-[10rem] h-[11rem] object-cover rounded-full mb-2"
                  src={userData?.profileImg}
                  alt=""
                />
              ) : (
                <Avatar width={"10rem"}></Avatar>
              )}

              <h3 className="text-center text-[20px] font-[600]">
                {userData.userName}
              </h3>
              <div className="self-center flex m-3">
                {userData?.ratingsAverage ? (
                  <StarRating
                    rating={Math.round(userData?.ratingsAverage)}
                  ></StarRating>
                ) : (
                  <StarRating rating={0}></StarRating>
                )}
                <div className="flex justify-center align-middle font-semibold mr-2 px-2.5 py-0.5 rounded bg-yellow-200  ml-1">
                  <span className=" text-base ">
                    {userData?.ratingQuantity}
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
            <div className="flex justify-between flex-col md:flex-row lg:flex-col w-full">
              {titles.map((ele, idx) => (
                <ButtonProfile
                  title={ele}
                  key={idx}
                  setActiveButton={setActiveButton}
                  setCurrentTab={setCurrentTab}
                  number={idx + 1}
                  activeButton={activeButton}
                ></ButtonProfile>
              ))}
            </div>
          </div>
          <div className="border-2 col-span-10 lg:col-span-8 2xl:col-span-8">
            {currentTab === 1 ? (
              <div className="p-6">
                <h3 className="flex justify-center text-[20px] text-primary font-[600] mb-5">
                  "Personal Information"
                </h3>
                <form>
                  <div className="flex flex-col md:gap-4 gap-4">
                    <div className=" flex justify-between gap-5 max-[480px]:flex-col">
                      <div className="flex flex-col w-1/2 gap-2 max-[480px]:w-full">
                        <label className="font-light text-gray-500 text-sm pl-1">
                          userName
                        </label>
                        <input
                          type="text"
                          placeholder={userData.userName}
                          className={` input input-bordered focus:outline-none disabled:placeholder-black disabled:bg-white  `}
                          disabled
                        />
                      </div>
                      <div className="flex flex-col w-1/2 gap-2 max-[480px]:w-full">
                        <label className="font-light text-gray-500 text-sm pl-1">
                          phone
                        </label>
                        <input
                          type="text"
                          placeholder={userData.phone || "not available"}
                          className={` input input-bordered focus:outline-none disabled:placeholder-black disabled:bg-white  `}
                          disabled
                        />
                      </div>
                    </div>
                    <div className=" flex justify-between gap-5">
                      <div className="flex flex-col w-full gap-2">
                        <label className="font-light text-gray-500 text-sm pl-1">
                          Address
                        </label>
                        <input
                          type="text"
                          placeholder={
                            address
                              ? `${address?.alias}: ${address?.country} - ${address?.governorate} - ${address?.street}`
                              : "not available"
                          }
                          className={` input input-bordered focus:outline-none disabled:placeholder-black disabled:bg-white  `}
                          disabled
                        />
                      </div>
                    </div>
                    <div className=" flex justify-between gap-5 max-[480px]:flex-col">
                      <div className="flex flex-col w-1/2 gap-2 max-[480px]:w-full">
                        <label className="font-light text-gray-500 text-sm pl-1">
                          Gender
                        </label>
                        <input
                          type="text"
                          placeholder={userData?.gender || "not available"}
                          className={` input input-bordered focus:outline-none disabled:placeholder-black disabled:bg-white  `}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : currentTab === 2 ? (
              <>
                <div className="flex justify-center items-center">
                  <div className="flex flex-col p-5 border rounded-xl w-1/2 m-2  ">
                    <h1 className="flex justify-center pb-3">
                      give review to user
                    </h1>
                    <div className="flex flex-col justify-center align-middle gap-10">
                      <div className="flex justify-center">
                        <div className="rating">
                          {[...Array(5)].map((_, index) => (
                            <input
                              type="radio"
                              name="rating-2"
                              value={index + 1}
                              checked={userRate === index + 1}
                              onChange={() => ratingChanged(index + 1)}
                              className="mask mask-star-2 bg-orange-400"
                            />
                          ))}
                        </div>
                      </div>
                      <textarea
                        value={userComment}
                        onChange={(e) => commentChanged(e.target.value)}
                        placeholder="input your comment"
                        className="input input-bordered border-primary focus:outline-primary"
                      ></textarea>
                    </div>
                    <div className="flex justify-center align-middle">
                      {loading ? (
                        <ThreeDots color="#FFD336"></ThreeDots>
                      ) : (
                        <button
                          onClick={handleAddReview}
                          type="submit"
                          className="btn btn-active  w-1/4 mt-5 btn-outline hover:bg-white hover:border-primary hover:text-primary rounded-lg text-white  "
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto hidden md:block">
                  <table className="table w-full">
                    {/* head */}
                    <thead className="">
                      <tr>
                        <th>Name</th>
                        <th>Comment</th>
                        <th>Rating</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews?.map((ele) => (
                        <tr>
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                  {ele?.user?.profileImg ? (
                                    <img
                                      src={ele?.user?.profileImg}
                                      alt="Avatar Tailwind CSS Component"
                                    />
                                  ) : (
                                    <Avatar></Avatar>
                                  )}
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">
                                  {ele?.user?.userName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {ele?.comment}
                            <br />
                            <span className="badge badge-ghost badge-sm">
                              <div className="text-sm opacity-50">
                                {moment(ele?.createdAt).format("DD-MM-YYYY")}{" "}
                                {moment(ele?.createdAt).format("h:mm A")}
                              </div>
                            </span>
                          </td>
                          <td>
                            <StarRating rating={ele?.rating}></StarRating>
                          </td>
                          <th>
                            {ele?.user?._id == user._id ? (
                              <DeleteItem
                                id={ele._id}
                                reviews={reviews}
                                setReviews={setReviews}
                              ></DeleteItem>
                            ) : null}
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div className="overflow-x-hidden hidden md:block">
                  <table className="table w-full">
                    {/* head */}
                    <thead className="">
                      <tr>
                        <th className="capitalize text-sm pl-7">Image</th>
                        <th className="capitalize text-sm">Title</th>
                        <th className="capitalize text-sm">Price</th>
                        <th className="capitalize text-sm">Description</th>
                        <th className="capitalize text-sm">Country</th>
                        <th className="capitalize text-sm">Category</th>
                        <th className="capitalize text-sm">CreatedAt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products?.map((product, index) => (
                        <tr key={product?._id}>
                          <th className="w-16">
                            <div className="avatar">
                              <div className="w-24 rounded-xl">
                                <Link
                                  to={`/productDetails/${product?._id}`}
                                  style={{
                                    textDecoration: "underline",
                                    color: "blue",
                                  }}
                                >
                                  <img
                                    className="hover:scale-125 hover:cursor-pointer"
                                    src={product?.images[0]?.image}
                                  />
                                </Link>
                              </div>
                            </div>
                          </th>
                          <td className="w-1/4 whitespace-normal capitalize">
                            {product?.title}
                          </td>
                          <td>{product?.price} EGP</td>
                          <td className="w-1/4 whitespace-break-spaces  capitalize">
                            <p className="h-24 overflow-hidden text-ellipsis">
                              {product?.description}
                            </p>
                          </td>
                          <td className="w-1/4 whitespace-normal capitalize">
                            {product?.country}
                          </td>
                          <td className="w-full whitespace-normal capitalize">
                            {product?.category.name}
                          </td>
                          <td className="w-full  capitalize">
                            {moment(product?.createdAt).format("YYYY-MM-DD")}
                            <br />
                            {moment(product?.createdAt).format("h:mm A")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* ------------------ Small Screen ----------------------------- */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                  <div className="space-y-3 rounded-lg divide-y divide-gray-200 pt-4 first:pt-0">
                    {!loading && !products ? (
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src="/images/No Orders.png"
                          alt=""
                          className="w-52 h-52"
                        />
                        <p className="text-lg font-bold">
                          You haven't any order yet.
                        </p>
                      </div>
                    ) : (
                      <>
                        {!products?.length && loading ? (
                          <ThreeDots
                            wrapperClass="text-primary flex justify-center items-center"
                            color="currentColor"
                          />
                        ) : (
                          <>
                            {products?.map((product) => (
                              <div
                                className="flex gap-5 pt-4"
                                key={product?._id}
                              >
                                <div className="avatar">
                                  <div className="w-24 h-24 aspect-square rounded-xl">
                                    <img src={product?.images[0]?.image} />
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <h3 className="text-primary font-semibold capitalize">
                                    {product?.title}
                                  </h3>
                                  <p className="pt-1">
                                    <span className="font-bold">Price:</span>{" "}
                                    {product?.price} EGP
                                  </p>
                                  <p className="pt-1">
                                    <span className="font-bold">
                                      Description:
                                    </span>{" "}
                                    <br />
                                    {product?.description}
                                  </p>
                                  <p className="pt-1">
                                    <span className="font-bold">Country:</span>{" "}
                                    {product?.country}
                                  </p>
                                  <p className="pt-1">
                                    <span className="font-bold">
                                      Category Name:
                                    </span>{" "}
                                    {product?.category.name}
                                  </p>
                                  <p className="pt-1">
                                    <span className="font-bold pt-1">
                                      Date:
                                    </span>{" "}
                                    {moment(product?.createdAt).format(
                                      "YYYY-MM-DD"
                                    )}
                                  </p>
                                  <p className="pt-1">
                                    <span className="font-bold">Time:</span>{" "}
                                    {moment(product?.createdAt).format(
                                      "h:mm A"
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileUser;
