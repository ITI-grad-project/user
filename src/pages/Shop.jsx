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

function Shop({ Categories, loginState, searchQuery }) {
  const [Values, setValues] = useState([MIN, MAX]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(null);
  const [items, setItems] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentCountry, setCurrentCountry] = useState(0);
  const [price, setPrice] = useState([]);
  const { id } = useParams();
  let countries = [
    "Cairo",
    "Ismailia",
    "Port Said",
    "Alexandria",
    "Suez",
    "Giza",
  ];
  let url = `${BaseURL}/products?`;

  useEffect(() => {
    async function getItemsByPage() {
      try {
        setIsLoading(true);
        if (id) {
          const { data } = await axios.get(
            CurrentPage === 1
              ? `${BaseURL}/categories/${id}/products?page=1&limit=6`
              : `${BaseURL}/categories/${id}/products?page=${CurrentPage}&limit=6`
          );
          setItems(data);
        } else {
          if (currentCategory != 0) {
            url += `category=${currentCategory}&`;
          }
          if (currentCountry != 0) {
            console.log(currentCountry);
            url += `country=${currentCountry}&`;
            console.log(url);
          }
          if (price.length) {
            url = url.replace(/price\[gte\]=\d+&?/, "");
            url = url.replace(/price\[lte\]=\d+&?/, "");
            url += `price[gte]=${price[0]}&price[lte]=${price[1]}`;
            console.log(url);
            console.log(price);
          }

          const { data } = await axios.get(
            CurrentPage === 1
              ? `${url}`
              : `${BaseURL}/products?page=${CurrentPage}&limit=6&category=${currentCategory}`
          );
          setItems(data);
          console.log(items);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    }

    getItemsByPage();
  }, [CurrentPage, id, currentCategory, currentCountry, price]);

  let filteredData = [];
  //apply search query if ensure there is data found in postData
  if (items) {
    filteredData = items.data?.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="lg:px-36 px-12 py-10">
      <ToastContainer />
      {/* max-[700px]:grid-rows-2 */}
      <div className="grid grid-cols-12 w-full xl:gap-12 lg:gap-[5.2rem]">
        <div className="rounded-lg border-[2px] border-[#ECE8E8] lg:col-span-3 lg:min-w-[15rem] w-full col-span-12 h-[810px] font-['Roboto'] px-10">
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
          <div className="flex flex-col">
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
              {!filteredData.length ? (
                <p className="font-bold text-center w-full text-2xl capitalize mt-[25vh]">
                  no products to show
                </p>
              ) : (
                <>
                  {filteredData?.map((item, index) => {
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
        <PaginationPage
          setCurrentPage={setCurrentPage}
          CurrentPage={CurrentPage}
          // NoOfPages={items?.pagination?.numOfPages}
        />
      </div>
    </div>
  );
}

export default Shop;
