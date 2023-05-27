import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import ProductCard from "../components/ProductCard.jsx";
import { useState } from "react";
const MIN = 0;
const MAX = 10000;

// const items = [
//   {
//     id: 1,
//     title: "Back End Developer",
//     department: "Engineering",
//     type: "Full-time",
//     location: "Remote",
//   },
//   {
//     id: 2,
//     title: "Front End Developer",
//     department: "Engineering",
//     type: "Full-time",
//     location: "Remote",
//   },
//   {
//     id: 3,
//     title: "User Interface Designer",
//     department: "Design",
//     type: "Full-time",
//     location: "Remote",
//   },
// ];
function Shop() {
  const [Values, setValues] = useState([MIN, MAX]);
  console.log("Values", Values);
  return (
    <div>
      {/* <h1 className="text-[60px] text-[#2D2D2D] text-center font-[600] font-['Rubik']">
        Shop
      </h1> */}
      <div className="px-36 py-10 flex gap-6">
        <div className="rounded-lg border-[2px] border-[#ECE8E8] w-[26%] font-['Roboto'] px-10">
          <h2 className="text-[35px] text-primary font-[700] mb-5 mt-3">
            Categories
          </h2>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                checked
                className="checkbox w-[2rem] h-[2rem] checkbox-primary mr-5"
              />
              <span className="label-text text-[26px] text-[#2D2D2D] font-[700]">
                All
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                className="checkbox w-[2rem] h-[2rem] checkbox-primary mr-5"
              />
              <span className="label-text text-[26px] text-[#2D2D2D] font-[700]">
                Fashion
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                className="checkbox w-[2rem] h-[2rem] checkbox-primary mr-5"
              />
              <span className="label-text text-[26px] text-[#2D2D2D] font-[700]">
                Electronics
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                className="checkbox w-[2rem] h-[2rem] checkbox-primary mr-5"
              />
              <span className="label-text text-[26px] text-[#2D2D2D] font-[700]">
                Books
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                className="checkbox w-[2rem] h-[2rem] checkbox-primary mr-5"
              />
              <span className="label-text text-[26px] text-[#2D2D2D] font-[700]">
                Furniture
              </span>
            </label>
          </div>
          <h2 className="text-[35px] text-primary font-[700] my-5">Country</h2>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                checked
                className="checkbox w-[2rem] h-[2rem] checkbox-primary mr-5"
              />
              <span className="label-text text-[26px] text-[#2D2D2D] font-[700]">
                All
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                className="checkbox w-[2rem] h-[2rem] checkbox-primary mr-5"
              />
              <span className="label-text text-[26px] text-[#2D2D2D] font-[700]">
                Ismailia
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                className="checkbox w-[2rem] h-[2rem] checkbox-primary mr-5"
              />
              <span className="label-text text-[26px] text-[#2D2D2D] font-[700]">
                Portsaid
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                className="checkbox w-[2rem] h-[2rem] checkbox-primary mr-5"
              />
              <span className="label-text text-[26px] text-[#2D2D2D] font-[700]">
                Egypt
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                className="checkbox w-[2rem] h-[2rem] checkbox-primary mr-5"
              />
              <span className="label-text text-[26px] text-[#2D2D2D] font-[700]">
                Alexandria
              </span>
            </label>
          </div>
          <h2 className="text-[35px] text-primary font-[700] mb-5 mt-3">
            Price Range
          </h2>
          <div className="flex gap-3 mb-10">
            <div className="border-2 text-[20px] font-[600] text-[#3d3b3b] border-[#ECE8E8] w-28 text-center p-3 rounded-lg">
              {Values[0]}
            </div>
            <div className="text-[20px] font-[600] text-[#3d3b3b] w-6 text-center p-3 rounded-lg">
              -
            </div>
            <div className="border-2 text-[20px] font-[600] text-[#3d3b3b] border-[#ECE8E8] w-28 text-center p-3 rounded-lg">
              {Values[1]}
            </div>
          </div>
          <RangeSlider min={MIN} max={MAX} value={Values} onInput={setValues} />
        </div>
        <div className="flex gap-6 flex-wrap">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">97</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                {/* <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" /> */}
              </a>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              <a
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                2
              </a>
              <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                3
              </a>
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>
              <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                8
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                9
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                10
              </a>
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
