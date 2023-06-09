import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import HeartIcon from "../assets/icons/HeartIcon";
import StarIcon from "../assets/icons/StarIcon";
import HeartSolidIcon from "../assets/icons/HeartSolidIcon";
import CartIcon from "../assets/icons/CartIcon";
import LocationIcon from "../assets/icons/LocationIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
import Question from "../components/Question";
import QuestionIcon from "../assets/icons/QuestionIcon";
import QAInput from "../components/QAInput";
import { ThreeDots } from "react-loader-spinner";

const schema = yup.object({
  question: yup
    .string()
    .required("required field")
    .min(5, "Answer must be at least 5 characters"),
});

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indexActive, setIndexActive] = useState(0);
  const [showFav, setShowFav] = useState(false);

  useEffect(() => {
    async function getProductDetails() {
      try {
        const { data } = await axios.get(
          `https://bekya.onrender.com/api/v1/products/${productId}`
        );
        console.log(data.data);
        setProduct(data?.data);
        setQuestions(data?.data?.questions);
        // setImages(data?.data?.images);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    }
    // async function getProductQuestions(){
    //   try {
    //     console.log( await axios.get(
    //       `https://bekya.onrender.com/api/v1/questions/${productId}`
    //     ))
    //     console.log(data.data);
    //     setQuestions(data?.data);
    //     setLoading(false);
    //   } catch (error) {
    //     setLoading(true);
    //     console.log(error);
    //   }
    // }
    getProductDetails();
    // getProductQuestions();
  }, []);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const formSubmit = async (dataForm) => {
    try {
      setLoading(true);
      // Call Backend
      const { data } = await axios.post(
        `https://bekya.onrender.com/api/v1/questions/${product?._id}`,
        dataForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Update app state
      // handleAddNewQA(data?.data.answer);
      console.log(data.questionData);
      // console.log(questions);
      handleAddNewQuestion(data?.questionData);
      reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
      // toast.error("Something went wrong, please try again later");
      //   const { data } = error.response;
      //   toast.error(data.message);
    }
  };

  const handleAddNewAnswer = (UpdatedQuestion) => {
    let newQuestion = questions?.map((question) =>
      question._id === UpdatedQuestion._id
        ? { ...question, answer: UpdatedQuestion.answer }
        : question
    );
    setQuestions(newQuestion);
  };
  const handleAddNewQuestion = (NewQuestion) => {
    console.log(NewQuestion)
    setQuestions([...questions, NewQuestion]);
  };

  const handleDeleteQuestion = (question) => {
    setQuestions(questions.filter((q) => q._id !== question._id));
  };
  const handleDeleteAnswer = (question) => {
    let updatedQuestions = questions.map((q) =>
      q._id === question._id ? { ...question, answer: "" } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleShowFav = () => {
    setShowFav(!showFav);
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-start">
          {/* Images */}
          <div className="flex flex-col gap-6 lg:w-2/4">
            <div className="relative">
              <img
                src={product?.images[indexActive]?.image}
                alt=""
                className="w-full h-full object-cover aspect-square rounded-xl"
              />
              <span
                className="absolute top-4 right-4 text-primary bg-white/95 p-1 rounded-xl cursor-pointer"
                onClick={handleShowFav}
              >
                {showFav ? <HeartSolidIcon /> : <HeartIcon />}
              </span>
            </div>
            <ul className="flex justify-evenly items-center flex-wrap">
              {product?.images?.map((image, index) => (
                <li
                  key={image._id}
                  onClick={() => setIndexActive(index)}
                  className={`${
                    index === indexActive &&
                    "ring ring-primary ring-offset-base-100 ring-offset-2 p-2 scale-75 transition-all duration-300 opacity-75"
                  } rounded-2xl overflow-hidden cursor-pointer`}
                >
                  <img
                    src={image?.image}
                    alt=""
                    className="w-28 h-28 rounded-md object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
          {/* INFO */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <h5 className="capitalize badge py-3 px-6 badge-primary badge-outline font-semibold tracking-wider">
              {product?.category?.name}
            </h5>
            <h3 className="text-secondary font-bold text-3xl">
              {product?.title}
            </h3>
            <p className="text-[#404040] text-lg">{product?.description}</p>
            <h4 className="text-secondary font-bold text-3xl my-3">
              EGP {product?.price}
            </h4>
            <div className="flex gap-2 items-center">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={product?.user?.profileImg || "https://www.pinclipart.com/picdir/big/394-3949395_stacey-scott-icono-de-mi-cuenta-png-clipart.png"} alt="user" />
                </div>
              </div>
              <div>
                <h6 className="font-semibold">{product?.user?.userName}</h6>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <span className="text-[#FF9934]">
                      <StarIcon w={"w-5"} h={"h-5"} />
                    </span>
                    <span className="text-[#FF9934]">
                      <StarIcon w={"w-5"} h={"h-5"} />
                    </span>
                    <span className="text-[#FF9934]">
                      <StarIcon w={"w-5"} h={"h-5"} />
                    </span>
                    <span className="text-[#FF9934]">
                      <StarIcon w={"w-5"} h={"h-5"} />
                    </span>
                    <span className="text-[#FF9934]">
                      <StarIcon w={"w-5"} h={"h-5"} />
                    </span>
                  </div>
                  <div className="text-[#404040] font-medium">
                    {"(0 Reviews)"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="pr-2 text-center">
                <LocationIcon />
              </span>
              {product?.country}
            </div>
            <div className="flex">
              <span className="pr-2 text-center">
                <PhoneIcon />
              </span>
              +2{product?.phone}
            </div>
            <button className="btn btn-primary text-white normal-case lg:w-[70%] md:w-[70%] mt-6">
              <span className="pr-2">
                {" "}
                <CartIcon />{" "}
              </span>{" "}
              Add to Cart
            </button>
          </div>
        </div>

        {/* Add Question/Comment */}
        <div className="flex flex-col gap-2">
          <h5 className="font-bold border-b border-[#D4D4D4] pb-2 flex">
            <span className="mr-1">
              <QuestionIcon />
            </span>
            Questions
            <span className="text-[#404040] font-medium pl-2">{`(${product?.questions?.length})`}</span>
          </h5>
          {/*Users Questions/Comments */}
          {!loading && questions?.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <img src="/images/No Question.png" alt="" className="w-48 h-48" />
              <p className="text-xl font-bold">No Question Yet</p>
            </div>
          ):(
            <>
            {!questions?.length && loading ? (
                <ThreeDots
                  wrapperClass="text-primary flex justify-center items-center"
                  color="currentColor"
                />
              ) : (
                <> 
                  {questions?.map((question) => (
                    <Question
                      key={question?._id}
                      question={question}
                      productUser={product?.user}
                      handleAddNewAnswer={handleAddNewAnswer}
                      handleDeleteQuestion={handleDeleteQuestion}
                      handleDeleteAnswer={handleDeleteAnswer}
                    />
                  ))}
                </>
              )}
            </>
          )}
          {/* {questions?.length !== 0 ? (
            <>
              {questions?.map((question) => (
                <Question
                  key={question?._id}
                  question={question}
                  productUser={product?.user}
                  handleAddNewAnswer={handleAddNewAnswer}
                  handleDeleteQuestion={handleDeleteQuestion}
                  handleDeleteAnswer={handleDeleteAnswer}
                />
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img src="/images/No Question.png" alt="" className="w-48 h-48" />
              <p className="text-xl font-bold">No Question Yet</p>
            </div>
          )} */}

          {JSON.parse(localStorage.getItem("user"))._id !==
            product?.user?._id && (
            <form onSubmit={handleSubmit(formSubmit)}>
              <QAInput
                placeholder={"write your question"}
                register={{ ...register("question") }}
                errorMessage={errors.question?.message}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
