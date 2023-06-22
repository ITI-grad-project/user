import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import { ThreeDots } from "react-loader-spinner";
import StarRating from "../components/Stars";
import notify from "../hooks/useNotification";
import DeleteItem from "../components/deleteItem";

export default function UserProfileReviews({ reviews, setReviews, id }) {
  const [userRate, setUserRate] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

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
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
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
      <div className="flex justify-center items-center">
        <div className="flex flex-col p-5 border rounded-xl w-1/2 m-2  ">
          <h1 className="flex justify-center pb-3">give review to user</h1>
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
                      <div className="font-bold">{ele?.user?.userName}</div>
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
  );
}
