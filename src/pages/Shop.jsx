import ProductCard from "../components/ProductCard.jsx";
import { useState, useEffect, useMemo, useCallback } from "react";
import PaginationPage from "../components/Pagination.jsx";
import axios from "axios";
import RangeInput from "../components/RangeInput.jsx";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
// import { ThreeDots } from "react-loader-spinner";
import Loading from "../components/Loading.jsx";

const MIN = 0;
const MAX = 10000;
const BaseURL = "https://bekya.onrender.com/api/v1";

function Shop({ Categories, loginState, searchQuery, debouncedValue }) {
  const [Values, setValues] = useState([MIN, MAX]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(null);
  const [items, setItems] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentCountry, setCurrentCountry] = useState(0);
  const [price, setPrice] = useState([]);
  const [keyword, setKeyword] = useState("");
  const { id } = useParams();
  let limit = 2;
  let countries = [
    "Cairo",
    "Ismailia",
    "Port Said",
    "Alexandria",
    "Suez",
    "Giza",
  ];
  let url = `${BaseURL}/products/?`;
  let urlWithId = `${BaseURL}/categories/${id}/products?`;

  // useEffect(() => {
  //   console.log("debou", debouncedValue);
  //   setKeyword(debouncedValue);
  // }, [debouncedValue]);

  useEffect(() => {
    async function getItemsByPage() {
      try {
        setIsLoading(true);
        if (id) {
          console.log(urlWithId);
          if (currentCountry != 0) {
            console.log(currentCountry);
            urlWithId += `country=${currentCountry}&`;
          }
          if (price.length) {
            urlWithId = urlWithId.replace(/price\[gte\]=\d+&?/, "");
            urlWithId = urlWithId.replace(/price\[lte\]=\d+&?/, "");
            urlWithId += `price[gte]=${price[0]}&price[lte]=${price[1]}`;
          }
          // if (price.searchQuery) {
          //   urlWithId += `keyword=${currentCountry}&`;
          // }
          const { data } = await axios.get(`${urlWithId}`);

          setItems(data);
        } else {
          if (currentCategory != 0) {
            url += `category=${currentCategory}&`;
          }
          if (currentCountry != 0) {
            url += `country=${currentCountry}&`;
          }
          if (price.length) {
            url = url.replace(/price\[gte\]=\d+&?/, "");
            url = url.replace(/price\[lte\]=\d+&?/, "");
            url += `price[gte]=${price[0]}&price[lte]=${price[1]}`;
          }
          if (debouncedValue) {
            url += `keyword=${debouncedValue}&`;
          }
          const { data } = await axios.get(`${url}`);
          setItems(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    }

    getItemsByPage();
  }, [CurrentPage, id, currentCategory, currentCountry, price, debouncedValue]);

  let noOfPages = 1;
  let pageSize = 9;
  let itemsRender = [];
  noOfPages = Math.ceil((items?.data?.length || 0) / pageSize); // Ensure filteredData?.length is not undefined or null
  const pages = Array(noOfPages)
    .fill(0)
    .map((item, i) => i + 1);

  const start = CurrentPage * pageSize - pageSize;
  const end = start + pageSize;

  itemsRender = items?.data?.slice(start, end);

  const changeCurrentPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="lg:px-36 px-12 py-5">
      <ToastContainer />
      {/* max-[700px]:grid-rows-2 */}

      <h2 className="w-3/4 ml-[-5rem] text-center font-light capitalize text-gray-400 py-2">
        total items:{" "}
        <span className="font-bold">
          {items?.data?.length == 0 ? "0" : items?.data?.length}
        </span>
      </h2>

      <div className="grid grid-cols-12 w-full xl:gap-12 lg:gap-[5.2rem]">
        <div className="rounded-lg border-[2px] border-[#ECE8E8] lg:col-span-3 lg:min-w-[15rem] w-full col-span-12 h-fit font-['Roboto'] px-10">
          {!id && (
            <>
              <h2 className="text-[24px] text-primary font-[700] mb-2 mt-3">
                Categories
              </h2>
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input
                    type="radio"
                    name="radio-6"
                    className="radio radio-primary mr-5"
                    defaultChecked
                    value={"All"}
                    onClick={(event) => {
                      console.log(event.target.value);
                      setCurrentCategory(0);
                    }}
                  />
                  <span className="label-text text-[19px] text-[#2D2D2D] font-[700]">
                    All
                  </span>
                </label>
              </div>
              {Categories?.map((category, index) => {
                return (
                  <div className="form-control" key={index}>
                    <label className="label cursor-pointer justify-start">
                      <input
                        type="radio"
                        name="radio-6"
                        value={category.name}
                        className="radio radio-primary mr-5"
                        checked={currentCategory === category?._id}
                        onClick={(event) => {
                          console.log(event.target.value);
                          setCurrentCategory(category?._id);
                        }}
                      />
                      <span className="label-text text-[19px] text-[#2D2D2D] font-[700]">
                        {category?.name}
                      </span>
                    </label>
                  </div>
                );
              })}
            </>
          )}

          <hr></hr>
          <h2 className="text-[24px] text-primary font-[700] my-3">Country</h2>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="radio"
                name="radio-7"
                className="radio radio-primary mr-5"
                defaultChecked
                onClick={() => {
                  console.log("here");
                  setCurrentCountry(0);
                }}
              />
              <span className="label-text text-[19px] text-[#2D2D2D] font-[700]">
                All
              </span>
            </label>
          </div>
          {countries.map((item, index) => {
            return (
              <div className="form-control" key={index}>
                <label className="label cursor-pointer justify-start">
                  <input
                    type="radio"
                    name="radio-7"
                    className="radio radio-primary mr-5"
                    onClick={() => {
                      console.log(item);
                      setCurrentCountry(item);
                    }}
                  />
                  <span className="label-text text-[19px] text-[#2D2D2D] font-[700]">
                    {item}
                  </span>
                </label>
              </div>
            );
          })}
          <hr></hr>
          <h2 className="text-[24px] text-primary font-[700] mt-3 mb-2">
            Price Range
          </h2>
          <div className="flex flex-col mb-4">
            <RangeInput
              Values={Values}
              setValues={setValues}
              MIN={MIN}
              MAX={MAX}
            />
            <button
              onClick={() => setPrice(Values)}
              className="btn btn-primary mt-6 text-white w-full uppercase"
            >
              apply price
            </button>
          </div>
        </div>
        <div className="lg:col-span-9 w-full col-span-12 flex flex-wrap gap-4 lg:justify-start lg:items-start justify-center items-center lg:mt-0 mt-5">
          {/* <div className="grid grid-cols-6 md:gap-16 grid-flow-row-dense justify-items-center"> */}
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <>
              {!itemsRender?.length ? (
                <p className="font-bold text-center w-full text-2xl capitalize mt-[25vh]">
                  no products to show
                </p>
              ) : (
                <>
                  {itemsRender?.map((item, index) => {
                    return (
                      <div className="col-span-2 lg:col-span-3 2xl:col-span-2 min-[1700px]:col-span-1">
                        <ProductCard
                          key={index}
                          product={item}
                          loginState={loginState}
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="px-36">
        <div className="flex flex-wrap gap-1 items-center justify-center bg-white py-3 sm:px-6 ">
          {pages.length > 1 && (
            <div>
              <div className="btn-group">
                {pages.map((page) => (
                  <button
                    onClick={() => changeCurrentPage(page)}
                    key={page}
                    className={`btn ${
                      CurrentPage === page ? "btn-active" : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
