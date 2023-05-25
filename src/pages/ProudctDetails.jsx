import { useState } from "react";
import HeartIcon from "../assets/icons/HeartIcon";
import StarIcon from "../assets/icons/StarIcon";
import HeartSolidIcon from "../assets/icons/HeartSolidIcon";
import CartIcon from "../assets/icons/CartIcon";
import LocationIcon from "../assets/icons/LocationIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";

export default function ProductDetails() {
    useEffect(() => {
        async function getProductDetails() {
          try {
            const { data } = await axios.get(
              "https://blog-backend-amwb.onrender.com/v1/post"
            );
            console.log(data.data);
            // setPosts(data?.data?.reverse());
            setLoading(false);
          } catch (error) {
            setLoading(true);
            // setError(error);
            console.log(error);
            if (error.message === "Network Error")
              toast.error("No Internet, Please check your connectivity");
          }
        }
        getProductDetails();
      }, []);
  const [images, setImages] = useState([
    {
      id: 1,
      url: "https://cdn.shopify.com/s/files/1/0499/3079/7217/products/LID-DJTT-059-BLUE_1_900x.jpg?v=1678628136",
    },
    {
      id: 2,
      url: "https://cdn.shopify.com/s/files/1/0499/3079/7217/products/LID-DJTT-059-BLUE_2_800x.jpg?v=1678628136",
    },
    {
      id: 3,
      url: "https://cdn.shopify.com/s/files/1/0499/3079/7217/products/LID-DJTT-059-BLUE_3_800x.jpg?v=1678628136",
    },
    {
      id: 4,
      url: "https://cdn.shopify.com/s/files/1/0499/3079/7217/products/LID-DJTT-059-BLUE_4_800x.jpg?v=1678628136",
    },
  ]);

  // const [activeImg, setActiveImage] = useState(images.img1)
  const [indexActive, setIndexActive] = useState(0);
  const { url } = images[indexActive]; //main | cover image

  const [showFav, setShowFav] = useState(false);

  const handleShowFav = () => {
    setShowFav(!showFav);
  };
  return (
    // <section className="max-w-7xl mx-auto">
    //     <div>
    //         <img src={url} alt="main product image" className="h-9/12 rounded-2xl"/>
    //         <ul className="flex items-center justify-start gap-5 flex-wrap mt-5">
    //             {images.map((image, index) => (
    //                 <li key={image.id} onClick={() => setIndexActive(index)} className={`${index === indexActive && "ring ring-primary ring-offset-base-100 ring-offset-2 p-2 scale-75 opacity-80"} rounded-2xl overflow-hidden cursor-pointer`}>
    //                     <img src={image.url} alt="thumbnail product image" className="w-32 h-32 object-cover"/>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // </section>
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-start">
          {/* Images */}
          <div className="flex flex-col gap-6 lg:w-2/4">
            <div className="relative">
              <img
                src={url}
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
              {images.map((image, index) => (
                <li
                  key={image.id}
                  onClick={() => setIndexActive(index)}
                  className={`${
                    index === indexActive &&
                    "ring ring-primary ring-offset-base-100 ring-offset-2 p-2 scale-75 transition-all duration-300 opacity-75"
                  } rounded-2xl overflow-hidden cursor-pointer`}
                >
                  <img
                    src={image.url}
                    alt=""
                    className="w-28 h-28 rounded-md object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
          {/* INFO */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            {/* <div> */}
            <h5 className="capitalize badge py-3 px-6 badge-primary badge-outline font-semibold tracking-wider">
              Women's Fashion
            </h5>
            <h3 className="text-secondary font-bold text-3xl">
              Blue Leather Bag
            </h3>
            {/* </div> */}
            <p className="text-[#404040] text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
            <h4 className="text-secondary font-bold text-3xl my-3">EGP 200</h4>
            <div className="flex gap-2 items-center">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1539614474468-f423a2d2270c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                    alt="user"
                  />
                </div>
              </div>
              <div>
                <h6 className="font-semibold">Laila Ahmed</h6>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <span className="text-[#FF9934]">
                      <StarIcon w={"w-4"} h={"h-4"} />
                    </span>
                    <span className="text-[#FF9934]">
                      <StarIcon w={"w-4"} h={"h-4"} />
                    </span>
                    <span className="text-[#FF9934]">
                      <StarIcon w={"w-4"} h={"h-4"} />
                    </span>
                    <span className="text-[#FF9934]">
                      <StarIcon w={"w-4"} h={"h-4"} />
                    </span>
                    <span className="text-[#FF9934]">
                      <StarIcon w={"w-4"} h={"h-4"} />
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
              Elshiekh Zayed, Ismailia, Egypt
            </div>
            <div className="flex">
              <span className="pr-2 text-center">
                <PhoneIcon />
              </span>
              +201234567899
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
          <h5 className="font-bold border-b border-[#D4D4D4] pb-2">
            Questions
            <span className="text-[#404040] font-medium pl-2">{"(0)"}</span>
          </h5>
          {/*Users Comment */}
          <div className="flex gap-2 items-start border-b border-[#D4D4D4] py-5">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1539614474468-f423a2d2270c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                  alt="user"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h6 className="font-semibold">Laila Ahmed</h6>
              <div>What is item's Brand and Material ?</div>
              {/* User Reply */}
              <div className="flex gap-2 mt-6">
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1539614474468-f423a2d2270c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                      alt="user"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h6 className="font-semibold">Laila Ahmed</h6>
                  <div>Good Condition</div>
                </div>
              </div>
            {/* <span className="text-primary border border-primary py-1 px-3 mt-2 rounded-md w-[20%] text-center text-sm font-semibold">Reply</span> */}
            <span className="text-primary link font-semibold mt-3">Reply</span>
            </div>
          </div>
          <div className="flex gap-2 items-start  border-b border-[#D4D4D4] py-6">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1539614474468-f423a2d2270c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                  alt="user"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h6 className="font-semibold">Laila Ahmed</h6>
              <div>What is item's Condition ?</div>
            </div>
          </div>
          <div className="form-control pt-2">
            {/* <label htmlFor="comment" className="label">
                        <span className="label-text">Comments</span>
                    </label> */}
            <textarea
              name="comment"
              className={`textarea textarea-bordered focus:outline-none min-h-[8rem]`}
              placeholder="write your question"
            ></textarea>
          </div>
          <div className="flex items-end justify-end">
            <button className="btn btn-primary normal-case text-white w-[9rem]">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
