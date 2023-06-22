import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import notify from "../hooks/useNotification";

function DeleteItem({ id, reviews, setReviews }) {
  const BaseURL = "https://bekya.onrender.com";
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  console.log(id);
  const handleDeleteReview = async () => {
    try {
      await axios.delete(`${BaseURL}/api/v1/review/${id}`, config);
      let filterReviews = reviews.filter((ele) => ele._id != id);
      notify("review deleted successfully");
      setReviews(filterReviews);
      console.log(filterReviews);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="join">
        <label
          className="btn btn-sm join-item text-red-600"
          htmlFor={`my_modal_${id}`}
        >
          <i className="fa-solid fa-trash"></i>
        </label>
      </div>
      <input type="checkbox" id={`my_modal_${id}`} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col items-center">
          <h3 className="font-bold text-3xl text-primary">
            <i className="fa-solid fa-circle-exclamation"></i>
          </h3>
          <p className="py-4">Are you sure you want to delete this review?</p>
          <div className="flex gap-3 modal-action">
            <label
              className="btn btn-error"
              onClick={() => handleDeleteReview(id)}
              htmlFor={`my_modal_${id}`}
            >
              Yes
            </label>
            <label className="btn btn-gray" htmlFor={`my_modal_${id}`}>
              No
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteItem;
