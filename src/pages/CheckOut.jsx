import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import notify from "../hooks/useNotification";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

function CheckOut() {
  const [address, setAddress] = useState([]);
  const [userCart, setUserCart] = useState({});
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [alias, setAlias] = useState("");
  const [Work, setWork] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [street, setStreet] = useState("");

  const handleAddressChange = (event) => {
    console.log(JSON.parse(event.target.value));
    setSelectedAddress(JSON.parse(event.target.value));
  };
  const handleMethodChange = (method) => {
    console.log(method.target.value);
    setSelectedMethod(method.target.value);
  };
  const handleCheckOut = async () => {
    console.log(!Object.keys(selectedAddress).length && !selectedMethod.length);
    if (!Object.keys(selectedAddress).length || !selectedMethod.length) {
      return notify("you must choose the address and method", "error");
    }
    if (selectedMethod === "cash") {
      setIsLoading(true);
      try {
        let res = await axios.post(
          `https://bekya.onrender.com/api/v1/orders/${id}`,
          { shippingAddress: selectedAddress },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.message == "success") {
          notify("order created successfully", "success");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (err) {
        if (err.response) {
          notify(err.response.data.message, "error");
        }
      }
      setIsLoading(false);
    }
    if (selectedMethod === "credit") {
      setIsLoading(true);
      try {
        let res = await axios.get(
          `https://bekya.onrender.com/api/v1/orders/checkout-session/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res);
        if (res.data.status === "success") {
          notify("you will be redirect to payment page", "success");
          console.log(res.data.session.url);
          setTimeout(() => {
            window.open(res.data.session.url, "_self");
          }, 2000);
        }
      } catch (err) {
        if (err.response) {
          notify(err.response.data.message, "error");
        }
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getAddress() {
      try {
        let addressData = await axios.get(
          "https://bekya.onrender.com/api/v1/addresses/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (addressData.data) {
          setAddress(addressData.data.data);
        }
      } catch (err) {
        if (err.response) {
          notify(err.response.data.message, "error");
        }
      }
    }
    async function getCardDetails() {
      try {
        let cartData = await axios.get(
          "https://bekya.onrender.com/api/v1/cart/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (cartData.data) {
          setUserCart(cartData.data.userCart);
          setNumberOfCartItems(cartData.data.numberOfCartItems);
        }
      } catch (err) {
        if (err.response) {
          notify(err.response.data.message, "error");
        }
      }
    }
    getCardDetails();
    getAddress();
  }, []);

  return (
    <>
      <ToastContainer></ToastContainer>
      <h2 className="text-center mt-8 w-fit mx-auto  border-b-2  border-primary font-extrabold text-lg">
        Check out
      </h2>
      <div className="max-w-7xl mx-auto p-8 flex max-[767px]:flex-col gap-10">
        <div className="w-[75%] max-[480px]:w-full">
          <div className="mb-4 flex flex-col lg:flex-row gap-16 lg:items-start">
            <div className="shadow-lg bg-slate-50 w-full p-5">
              <h1>1. address</h1>
              <hr />
              {address.map((ele, index) => (
                <div className="flex gap-4 my-2" key={ele._id}>
                  <input
                    type="radio"
                    id={`address${index}`}
                    name="address"
                    value={JSON.stringify(ele)}
                    onChange={handleAddressChange}
                  />
                  <label htmlFor={`address${index}`}>
                    <p>
                      <span className="font-extrabold">({ele.alias}) - </span>
                      country: <span className="font-bold">{ele.country}</span>-
                      governorate:{" "}
                      <span className="font-bold">{ele.governorate}</span> -
                      city:
                      <span className="font-bold"> {ele.city}</span>- street:
                      <span className="font-bold"> {ele.street}</span>
                    </p>
                  </label>{" "}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
            <div className="shadow-lg bg-slate-50  w-full p-5">
              <h1>2. payment method</h1>
              <hr />
              <div className="flex gap-4 my-2">
                <input
                  type="radio"
                  id="method"
                  name="method"
                  value="cash"
                  onChange={handleMethodChange}
                />
                <label htmlFor="method">
                  <div className="flex">
                    <span className="text-center pl-16 font-bold">
                      Cash On Delivery
                    </span>
                  </div>
                  <img
                    src="/images/car2.gif"
                    width="30%"
                    height="30%"
                    className="rounded-3xl"
                  ></img>
                </label>{" "}
              </div>
              <div className="flex gap-4 my-2">
                <input
                  type="radio"
                  id="method2"
                  name="method"
                  value="credit"
                  onChange={handleMethodChange}
                />
                <label htmlFor="method2">
                  <span className="text-center pl-16 font-bold">
                    Cash with card
                  </span>
                  <img
                    src="/images/visa.gif"
                    className="rounded-3xl"
                    width="30%"
                    height="30%"
                  ></img>
                </label>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[25%] max-[480px]:w-full">
          <div className="mb-4 flex flex-col lg:flex-row gap-16 w-full lg:items-start">
            <div className="shadow-lg bg-slate-50 w-full p-5">
              <h1 className="text-center mb-3">Order summary</h1>
              <hr />
              <div className="flex justify-between ">
                <span className="pt-4 pb-2">
                  total items({numberOfCartItems})
                </span>
                <span className="pt-4 pb-2 font-extrabold">
                  {userCart?.totalPrice} EGP
                </span>
              </div>
              <div className="flex justify-between">
                <span className="pt-4 pb-2">Delivery fees</span>
                <span className="pt-4 pb-2 font-extrabold">50 EGP</span>
              </div>
              <hr />
              <div className="flex justify-between mt-6">
                <span className="pt-4 pb-2  font-extrabold">Total</span>
                <span className="pt-4 pb-2 font-extrabold">
                  {userCart?.totalPrice + 50} EGP
                </span>
              </div>
              <hr></hr>

              {isLoading ? (
                <span className="flex justify-center align-middle">
                  <ThreeDots color="#FFD336" />
                </span>
              ) : (
                <button
                  className="btn btn-primary mt-6 text-white w-full uppercase"
                  onClick={handleCheckOut}
                >
                  confirm order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
