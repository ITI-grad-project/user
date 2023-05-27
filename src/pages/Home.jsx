
import CategoryCard from "../components/CategoryCard";
import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";
import { useContext, useEffect } from "react";
import ProductContext from "../context/ProductContext";
import axios from "axios";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";

function Home({ listOfCategories }) {
  console.log(listOfCategories);

  const { listOfProducts, setListOfProducts } = useContext(ProductContext);
  const BaseURL = "https://bekya.onrender.com";

  useEffect(() => {
    async function getAllProducts() {
      const { data } = await axios.get(`${BaseURL}/api/v1/products/`);
      setListOfProducts(data);
      console.log("data", data);
    }
    getAllProducts();
  }, []);

  return (
    // <>
    //   <Slider />
    //   <div className="mt-20">
    //     <div className="flex flex-col justify-center items-center m-10">
    //       <h2 className="font-bold text-3xl uppercase">
    //         Browse Our Categories
    //       </h2>
    //       <hr className="w-44 bg-primary h-1 mt-6" />
    //     </div>
    //     <div className="flex gap-6 justify-center">
    //       {listOfCategories?.length === 0 && <h1>No Categories to show ...</h1>}
    //       {listOfCategories?.map((category) => {
    //         // console.log("category", category);
    //         return <CategoryCard category={category} />;
    //       })}
    //     </div>
    //   </div>
    //   <div className="mt-20 mx-32 ">
    //     <div className="flex flex-col justify-center items-center m-10">
    //       <h2 className="font-bold text-3xl uppercase">Latest Items</h2>
    //       <hr className="w-20 bg-primary h-1 mt-6 " />
    //     </div>
    //     <div className="flex gap-6 justify-center">
    //       {listOfProducts.data?.length === 0 && (
    //         <h1>No Products to show ...</h1>
    //       )}
    //       {listOfProducts.data?.slice(0, 4).map((product) => {
    //         // console.log(product);
    //         return <ProductCard product={product} />;
    //       })}
    //     </div>
    //   </div>
    //   <div className="mt-20 mx-32 flex justify-center ">
    //     <div className="card w-fit bg-base-100 shadow-xl image-full ">
    //       <figure>
    //         <img
    //           src="https://miro.medium.com/max/1400/1*iS8Ta0egGT5NYPVl6hzMoQ.jpeg"
    //           alt="Shoes"
    //         />
    //       </figure>
    //       <div className="card-body flex flex-col justify-center">
    //         <h2 className="card-title text-5xl justify-center">
    //           Variety Of Selling Items
    //         </h2>
    //         <div className="card-actions justify-center ">
    //           <Link to="/shop" className="btn btn-primary ">
    //             Shop now
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="mt-20 mx-32">
    //     <FeatureCard />
    //   </div>
    //   <div className="my-20 mx-32">
    //     <div className="flex flex-col justify-center items-center m-10">
    //       <h2 className="font-bold text-3xl uppercase">our items</h2>
    //       <hr className="w-24 bg-primary h-1 mt-6" />
    //     </div>
    //     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4  justify-center">
    //       {listOfProducts.data?.length === 0 && (
    //         <h1>No Products to show ...</h1>
    //       )}
    //       {listOfProducts.data?.map((product) => {
    //         // console.log(product);
    //         return <ProductCard product={product} />;
    //       })}
    //     </div>
    //   </div>
    // </>
    <>
      <Slider />
      <div className="mt-20">
        <div className="flex flex-col justify-center items-center m-10">
          <h2 className="font-bold text-3xl uppercase text-center">
            Browse Our Categories
          </h2>
          <hr className="w-44 bg-primary h-1 mt-6" />
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {listOfCategories?.length === 0 && <h1>No Categories to show ...</h1>}
          {listOfCategories?.map((category) => {
            // console.log("category", category);
            return <CategoryCard category={category} />;
          })}
        </div>
      </div>
      <div className="mt-20 mx-2 sm:mx-10 lg:mx-32 ">
        <div className="flex flex-col justify-center items-center m-10">
          <h2 className="font-bold text-3xl uppercase">Latest Items</h2>
          <hr className="w-20 bg-primary h-1 mt-6 " />
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {listOfProducts.data?.length === 0 && (
            <h1>No Products to show ...</h1>
          )}
          {listOfProducts.data?.slice(0, 4).map((product) => {
            // console.log(product);
            return <ProductCard product={product} />;
          })}
        </div>
      </div>
      <div className="mt-20 mx-2 sm:mx-10 lg:mx-32 flex justify-center ">
        <div className="card w-fit bg-base-100 shadow-xl image-full ">
          <figure>
            <img
              src="https://miro.medium.com/max/1400/1*iS8Ta0egGT5NYPVl6hzMoQ.jpeg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body flex flex-col justify-center">
            <h2 className="card-title text-5xl justify-center">
              Variety Of Selling Items
            </h2>
            <div className="card-actions justify-center ">
              <Link to="/shop" className="btn btn-primary ">
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 mx-2 sm:mx-10 lg:mx-32">
        <FeatureCard />
      </div>
      <div className="my-20 mx-2 sm:mx-10 lg:mx-32">
        <div className="flex flex-col justify-center items-center m-10">
          <h2 className="font-bold text-3xl uppercase">our items</h2>
          <hr className="w-24 bg-primary h-1 mt-6" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 justify-center ">
          {listOfProducts.data?.length === 0 && (
            <h1>No Products to show ...</h1>
          )}
          {listOfProducts.data?.slice(0, 8).map((product) => {
            // console.log(product);
            return <ProductCard product={product} />;
          })}
        </div>
        {listOfProducts.data?.length > 8 ? (
          <div className="text-center mt-6">
            <Link to="/shop" className="btn btn-outline btn-primary">
              View more
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default Home;
