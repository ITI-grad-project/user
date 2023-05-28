import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; //npm i @hookform/resolvers yup
import * as yup from "yup";
import axios from "axios";

import QAInput from "./QAInput";

const schema = yup.object({
  answer: yup.string().required("required field"),
});

export default function Question({ question, productUser, handleAddNewQA }) {
  const [showReplyInput, setShowReplyInput] = useState(false);

  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (dataForm) => {
    try {
      setLoading(true);
      // Call Backend
      const { data } = await axios.post(
        `https://bekya.onrender.com/api/v1/questions/question/${question?._id}`,
        dataForm,
        console.log(dataForm),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      // Update app state
      handleAddNewQA(data?.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      // toast.error("Something went wrong, please try again later");
      //   const { data } = error.response;
      //   toast.error(data.message);
    }
  };

  const handleShowReplyInp = () => {
    setShowReplyInput(!showReplyInput);
  };
  return (
    <>
      <>
        <div
          key={question._id}
          className="flex gap-2 items-start border-b border-[#D4D4D4] py-6"
        >
          <div className="avatar">
            <div className="w-12 h-12 rounded-full">
              <img
                // src="https://images.unsplash.com/photo-1539614474468-f423a2d2270c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                src={question?.user?.profileImg}
                alt="user"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <h6 className="font-semibold">{question?.user?.userName}</h6>
            <div>{question?.question}</div>
            {/* User Reply */}
            {question.answer ? (
              <div className="flex gap-2 mt-6">
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full">
                    <img src={productUser?.profileImg} alt="user" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h6 className="font-semibold">{productUser?.userName}</h6>
                  <div>{question.answer}</div>
                </div>
              </div>
            ) : (
              <>
                <span
                  className="text-primary font-bold mt-3 cursor-pointer w-12"
                  onClick={() => handleShowReplyInp()}
                >
                  Reply
                </span>
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
        </div>
      </>
    </>
  );
}
