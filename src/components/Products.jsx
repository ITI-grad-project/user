import { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import TrashIcon from "../assets/icons/TrashIcon";
import EditIcon from "../assets/icons/EditIcon";
import PlusIcon from "../assets/icons/PlusIcon";

export default function Products() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMyProducts() {
      try {
        const { data } = await axios.get(
          "https://bekya.onrender.com/api/v1/user/getMyProducts",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(data.data);
        setProducts(data?.data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    }

    getMyProducts();
  }, []);
  return (
    <div className="p-6">
      <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between sm:items-center md:mb-3">
        <h4 className="font-bold text-lg text-primary">My Products</h4>
        <button className="btn btn-primary h-[2.5rem] min-h-[2.5rem] text-white normal-case md:max-w-[20%]">
          <span className="pr-2">
            {" "}
            <PlusIcon />{" "}
          </span>{" "}
          Add Product
        </button>
      </div>
      <div className="overflow-x-auto hidden md:block">
        {!loading && !products ? (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/No Orders.png" alt="" className="w-52 h-52" />
            <p className="text-lg font-bold">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <>
            {!products?.length && loading ? (
              <ThreeDots
                wrapperClass="text-primary flex justify-center items-center"
                color="currentColor"
              />
            ) : (
              <table className="table w-full">
                {/* head */}
                <thead className="">
                  <tr>
                    <th></th>
                    <th className="capitalize text-sm">Product</th>
                    <th className="capitalize text-sm">Price</th>
                    <th className="capitalize text-sm">Update</th>
                    <th className="capitalize text-sm">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products?.map((product) => (
                    <tr key={product?._id}>
                      <th className="w-24">
                        <div className="avatar">
                          <div className="w-24 rounded-xl">
                            <img src={product?.images[0]?.image} />
                          </div>
                        </div>
                      </th>
                      <td className="w-60 whitespace-normal capitalize">
                        {product?.title}
                      </td>
                      <td>EGP {product?.price}</td>
                      <td>
                        <span className="text-sky-800 cursor-pointer">
                          <EditIcon />
                        </span>
                      </td>
                      <td>
                        <span className="text-red-800 cursor-pointer">
                          <TrashIcon />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
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
                        <h3 className="font-semibold capitalize">
                          {product?.title}
                        </h3>
                        <p className="pt-2">EGP {product?.price}</p>
                        <span className="text-sky-800 cursor-pointer flex gap-2 mb-1">
                          <EditIcon /> Edit
                        </span>
                        <p>
                          <span className="text-red-800 cursor-pointer flex gap-2">
                            <TrashIcon /> Remove
                          </span>
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
    </div>
  );
}
