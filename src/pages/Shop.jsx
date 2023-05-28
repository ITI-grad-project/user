import ProductCard from "../components/ProductCard.jsx";
import { useState, useEffect } from "react";
import PaginationPage from "../components/Pagination.jsx";
// import { useMemo } from "react";
import axios from "axios";
import RangeInput from "../components/RangeInput.jsx";

const MIN = 0;
const MAX = 10000;

function Shop({ Categories }) {
  const [Values, setValues] = useState([MIN, MAX]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getItemsByPage() {
      try {
        const { data } = await axios.get(
          CurrentPage === 1
            ? "https://bekya.onrender.com/api/v1/products?page=1&limit=4"
            : `https://bekya.onrender.com/api/v1/products?page=${CurrentPage}&limit=4`
        );
        setItems(data);
      } catch (error) {}
    }

    getItemsByPage();
  }, [CurrentPage]);
  console.log("items", items);

  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentCountry, setCurrentCountry] = useState(0);

  let FilteredItems = () => {
    return currentCategory === 0 && currentCountry === 0
      ? items.data?.filter(
          (item) => item.price > Values[0] && item.price < Values[1]
        )
      : currentCategory === 0 && currentCountry !== 0
      ? items.data?.filter(
          (item) =>
            item?._id === currentCountry &&
            item.price > Values[0] &&
            item.price < Values[1]
        )
      : currentCountry === 0 && currentCategory !== 0
      ? items.data?.filter(
          (item) =>
            item?.category._id === currentCategory &&
            item.price > Values[0] &&
            item.price < Values[1]
        )
      : items.data?.filter(
          (item) =>
            item?.category._id === currentCategory &&
            item?._id === currentCountry &&
            item.price > Values[0] &&
            item.price < Values[1]
        );
  };

  console.log("FilteredItems", FilteredItems());
  return (
    <div>
      {/* <h1 className="text-[60px] text-[#2D2D2D] text-center font-[600] font-['Rubik']">
        Shop
      </h1> */}
      <div className="px-36 py-10 flex gap-8">
        <div className="rounded-lg border-[2px] border-[#ECE8E8] w-[25vw] h-[900px] font-['Roboto'] px-10">
          <h2 className="text-[35px] text-primary font-[700] mb-5 mt-3">
            Categories
          </h2>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox w-[2rem] h-[2rem] checkbox-primary mr-5"
                onClick={() => {
                  setCurrentCategory(0);
                }}
              />
              <span className="label-text text-[26px] text-[#2D2D2D] font-[700]">
                All
              </span>
            </label>
          </div>
          {Categories?.map((category, index) => {
            return (
              <div className="form-control" key={index}>
                <label className="label cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    className="checkbox w-[2rem] h-[2rem] checkbox-primary mr-5"
                    onClick={() => {
                      setCurrentCategory(category?._id);
                    }}
                  />
                  <span className="label-text text-[26px] text-[#2D2D2D] font-[700]">
                    {category?.name}
                  </span>
                </label>
              </div>
            );
          })}

          <h2 className="text-[35px] text-primary font-[700] my-5">Country</h2>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox w-[2rem] h-[2rem] checkbox-primary mr-5"
                onClick={() => {
                  setCurrentCountry(0);
                }}
              />
              <span className="label-text text-[26px] text-[#2D2D2D] font-[700]">
                All
              </span>
            </label>
          </div>
          {items.data?.map((item, index) => {
            return (
              <div className="form-control" key={index}>
                <label className="label cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    className="checkbox w-[2rem] h-[2rem] checkbox-primary mr-5"
                    onClick={() => {
                      setCurrentCountry(item?._id);
                    }}
                  />
                  <span className="label-text text-[26px] text-[#2D2D2D] font-[700]">
                    {item?.country}
                  </span>
                </label>
              </div>
            );
          })}

          <h2 className="text-[35px] text-primary font-[700] mb-5 mt-3">
            Price Range
          </h2>
          <RangeInput
            Values={Values}
            setValues={setValues}
            MIN={MIN}
            MAX={MAX}
          />
        </div>
        <div className="flex gap-8 flex-wrap">
          {FilteredItems()?.map((item, index) => {
            return (
              <ProductCard
                key={index}
                ItemImg={item?.images[0].image}
                ItemTitle={item?.title}
                ItemPrice={item?.price}
                User={item?.user}
              />
            );
          })}
        </div>
      </div>
      <div className="px-36">
        <PaginationPage
          setCurrentPage={setCurrentPage}
          CurrentPage={CurrentPage}
        />
      </div>
    </div>
  );
}

export default Shop;
