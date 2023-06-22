import React from "react";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import notify from "../hooks/useNotification";

function UserProfileProducts({ products, setProducts, id }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMyProducts() {
      try {
        const { data } = await axios.get(
          `https://bekya.onrender.com/api/v1/products/?user=${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProducts(data?.data);
      } catch (err) {
        if (err.response.data.message) {
          notify(err.response.data.message, "error");
        }
      }
    }

    getMyProducts();
  }, []);
  return (
    <>
      <div className="overflow-x-hidden hidden md:block">
        <table className="table w-full">
          {/* head */}
          <thead className="">
            <tr>
              <th className="capitalize text-sm pl-7">Image</th>
              <th className="capitalize text-sm">Title</th>
              <th className="capitalize text-sm">Price</th>
              <th className="capitalize text-sm">Description</th>
              <th className="capitalize text-sm">Country</th>
              <th className="capitalize text-sm">Category</th>
              <th className="capitalize text-sm">CreatedAt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products?.map((product, index) => (
              <tr key={product?._id}>
                <th className="w-16">
                  <div className="avatar">
                    <div className="w-24 rounded-xl">
                      <Link
                        to={`/productDetails/${product?._id}`}
                        style={{
                          textDecoration: "underline",
                          color: "blue",
                        }}
                      >
                        <img
                          className="hover:scale-125 hover:cursor-pointer"
                          src={product?.images[0]?.image}
                        />
                      </Link>
                    </div>
                  </div>
                </th>
                <td className="w-1/4 whitespace-normal capitalize">
                  {product?.title}
                </td>
                <td>{product?.price} EGP</td>
                <td className="w-1/4 whitespace-break-spaces  capitalize">
                  <p className="h-24 overflow-hidden text-ellipsis">
                    {product?.description}
                  </p>
                </td>
                <td className="w-1/4 whitespace-normal capitalize">
                  {product?.country}
                </td>
                <td className="w-full whitespace-normal capitalize">
                  {product?.category.name}
                </td>
                <td className="w-full  capitalize">
                  {moment(product?.createdAt).format("YYYY-MM-DD")}
                  <br />
                  {moment(product?.createdAt).format("h:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ------------------ Small Screen ----------------------------- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        <div className="space-y-3 rounded-lg divide-y divide-gray-200 pt-4 first:pt-0">
          {!loading && !products ? (
            <div className="flex flex-col items-center justify-center">
              <img src="/images/No Orders.png" alt="" className="w-52 h-52" />
              <p className="text-lg font-bold">You haven't any order yet.</p>
            </div>
          ) : (
            <>
              {!products?.length && loading ? (
                <ThreeDots
                  wrapperClass="text-primary flex justify-center items-center"
                  color="currentColor"
                />
              ) : (
                <>
                  {products?.map((product) => (
                    <div className="flex gap-5 pt-4" key={product?._id}>
                      <div className="avatar">
                        <div className="w-24 h-24 aspect-square rounded-xl">
                          <img src={product?.images[0]?.image} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-primary font-semibold capitalize">
                          {product?.title}
                        </h3>
                        <p className="pt-1">
                          <span className="font-bold">Price:</span>{" "}
                          {product?.price} EGP
                        </p>
                        <p className="pt-1">
                          <span className="font-bold">Description:</span> <br />
                          {product?.description}
                        </p>
                        <p className="pt-1">
                          <span className="font-bold">Country:</span>{" "}
                          {product?.country}
                        </p>
                        <p className="pt-1">
                          <span className="font-bold">Category Name:</span>{" "}
                          {product?.category.name}
                        </p>
                        <p className="pt-1">
                          <span className="font-bold pt-1">Date:</span>{" "}
                          {moment(product?.createdAt).format("YYYY-MM-DD")}
                        </p>
                        <p className="pt-1">
                          <span className="font-bold">Time:</span>{" "}
                          {moment(product?.createdAt).format("h:mm A")}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfileProducts;
