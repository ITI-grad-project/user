import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
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
import notify from "../hooks/useNotification";
import { ToastContainer } from "react-toastify";

const schema = yup.object({
  question: yup
    .string()
    .required("required field")
    .min(5, "Answer must be at least 5 characters"),
});

export default function ProductDetails({
  cartItems,
  setCartItems,
  loginState,
  wishlistedItems,
  setWishlistedItems,
}) {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indexActive, setIndexActive] = useState(0);
  const [wishListed, setWishListed] = useState(false);

  const navigate = useNavigate();
  const BaseURL = "https://bekya.onrender.com";
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

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

    getProductDetails();
    // getProductQuestions();
  }, []);

  const handleAddToCart = async (productID) => {
    console.log(loginState);
    if (loginState === true) {
      const prodID = { productId: productID };
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

  const toggleWishListed = async (productID) => {
    setWishListed((prevState) => !prevState);
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
        setWishlistedItems(newWishlist);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAddToWishlist = async (productID) => {
    if (loginState === true) {
      if (!wishListed) {
        const prodID = { productId: productID };
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

  const handleAddNewAnswer = (UpdatedQuestion) => {
    let newQuestion = questions?.map((question) =>
      question._id === UpdatedQuestion._id
        ? { ...question, answer: UpdatedQuestion.answer }
        : question
    );
    setQuestions(newQuestion);
  };
  const handleAddNewQuestion = (NewQuestion) => {
    console.log(NewQuestion);
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

  return (
    <div className="max-w-7xl mx-auto p-8">
      <ToastContainer></ToastContainer>
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
                onClick={() => {
                  handleAddToWishlist(product?._id);
                }}
              >
                {wishListed ? <HeartSolidIcon /> : <HeartIcon />}
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
                  <img
                    src={
                      product?.user?.profileImg ||
                      "https://www.pinclipart.com/picdir/big/394-3949395_stacey-scott-icono-de-mi-cuenta-png-clipart.png"
                    }
                    alt="user"
                  />
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
                <LocationIcon w={"w-6"} h={"h-6"} />
              </span>
              {product?.country}
            </div>
            <div className="flex">
              <span className="pr-2 text-center">
                <PhoneIcon w={"w-6"} h={"h-6"} />
              </span>
              +2{product?.phone}
            </div>
            <button
              disabled={product?.user?._id === userData._id}
              className="btn btn-primary text-white normal-case lg:w-[70%] md:w-[70%] mt-6"
              onClick={() => {
                handleAddToCart(product._id);
              }}
            >
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
          ) : (
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
