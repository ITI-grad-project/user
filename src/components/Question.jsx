import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; //npm i @hookform/resolvers yup
import * as yup from "yup";
import axios from "axios";

import QAInput from "./QAInput";
import TrashIcon from "../assets/icons/TrashIcon";
import ConfirmModal from "./ConfirmModal";
import notify from "../hooks/useNotification";

const schema = yup.object({
  answer: yup
    .string()
    .required("required field")
    .min(5, "Answer must be at least 5 characters"),
});

export default function Question({
  question,
  productUser,
  handleAddNewAnswer,
  handleDeleteQuestion,
  handleDeleteAnswer,
  setLoading
}) {
  const [showReplyInput, setShowReplyInput] = useState(false);

  // const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (dataForm) => {
    console.log(question?.user?.profileImg);
    try {
      setLoading(true);
      // Call Backend
      const { data } = await axios.post(
        `https://bekya.onrender.com/api/v1/questions/question/${question?._id}`,
        dataForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Update app state
      // handleAddNewQA(data?.data.answer);
      handleAddNewAnswer(data?.data);
      reset();
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.data.message) {
        notify(err.response.data.message, "error");
      }
    }
  };

  const handleDeleteQ = async (question) => {
    try {
      const { data } = await axios.delete(
        `https://bekya.onrender.com/api/v1/questions/${question?._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Update app state
      handleDeleteQuestion(question);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      // toast.error("Something went wrong, please try again later");
    }
  };

  const handleDeleteA = async (question) => {
    try {
      const { data } = await axios.delete(
        `https://bekya.onrender.com/api/v1/questions/question/${question?._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Update app state
      handleDeleteAnswer(question);
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong, please try again later");
    }
  };

  const handleShowReplyInp = () => {
    setShowReplyInput(!showReplyInput);
  };
  return (
    <>
      <>
        <div
          key={question?._id}
          className="flex gap-2 border-b border-[#D4D4D4] pt-3 pb-6"
        >
          {/* <div className="flex gap-2"> */}
          <div className="avatar">
            <div className="w-12 h-12 rounded-full">
              <img
                src={
                  question?.user?.profileImg ||
                  "https://www.pinclipart.com/picdir/big/394-3949395_stacey-scott-icono-de-mi-cuenta-png-clipart.png"
                }
                alt="user"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            {/* --------- Question ------- */}
            <div className="flex justify-between">
              <h6 className="font-semibold">
                {question?.user?.userName ||
                  JSON.parse(localStorage.getItem("user")).userName}
              </h6>
              {/* -------- Question Delete ------ */}
              {JSON.parse(localStorage.getItem("user"))?._id ===
                question?.user?._id && (
                <>
                  <label
                    // onClick={() => handleDeleteQ(question)}
                    className="text-red-800 cursor-pointer"
                    htmlFor={`my_modal_${question?._id}_question`}
                  >
                    <TrashIcon />
                  </label>
                  <ConfirmModal
                    id={`${question?._id}_question`}
                    onClick={() => handleDeleteQ(question)}
                    message={"Delete This Question?"}
                  />
                </>
              )}
            </div>
            <div>{question?.question}</div>
            {/* -------- Answer (Reply) --------*/}
            {question?.answer ? (
              // <div className="flex justify-between mt-6">
              <div className="flex gap-2 mt-6">
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full">
                    <img
                      src={
                        productUser?.profileImg ||
                        "https://www.pinclipart.com/picdir/big/394-3949395_stacey-scott-icono-de-mi-cuenta-png-clipart.png"
                      }
                      alt="user"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <h6 className="font-semibold">{productUser?.userName}</h6>
                    {/* --------- Answer|Reply Delete */}
                    {JSON.parse(localStorage.getItem("user"))?._id ===
                      productUser?._id && (
                      // <span
                      //   onClick={() => handleDeleteA(question)}
                      //   className="text-red-800 cursor-pointer"
                      // >
                      //   <TrashIcon />
                      // </span>
                      <>
                        <label
                          // onClick={() => handleDeleteA(question)}
                          className="text-red-800 cursor-pointer"
                          htmlFor={`my_modal_${question?._id}_answer`}
                        >
                          <TrashIcon />
                        </label>
                        <ConfirmModal
                          id={`${question?._id}_answer`}
                          onClick={() => handleDeleteA(question)}
                          message={"Delete This Answer?"}
                        />
                      </>
                    )}
                  </div>
                  <div>{question?.answer}</div>
                </div>
              </div>
            ) : (
              // </div>
              <>
                {JSON.parse(localStorage.getItem("user"))._id ===
                  productUser?._id && (
                  <span
                    className="text-primary font-bold mt-3 cursor-pointer w-12"
                    onClick={() => handleShowReplyInp()}
                  >
                    Reply
                  </span>
                )}

                {showReplyInput && (
                  <form onSubmit={handleSubmit(formSubmit)}>
                    <QAInput
                      placeholder={"write your answer"}
                      register={{ ...register("answer") }}
                      errorMessage={errors.answer?.message}
                    />
                  </form>
                )}
              </>
            )}
          </div>
          {/* </div> */}
          {/* {JSON.parse(localStorage.getItem("user"))._id === question?.user?._id && (
            <span onClick={() => handleDeleteQ(question)} className="text-red-800 cursor-pointer">
              <TrashIcon />
            </span>
          )} */}
        </div>
      </>
    </>
  );
}
