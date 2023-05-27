function ProductCard() {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <div className="relative">
            <img
              className="w-[405px] h-[301]"
              src="https://avatars.mds.yandex.net/i?id=0bea427b46963d9d9ff3749d0ca1f825-5661150-images-thumbs&n=13"
              alt="Shoes"
            />
            <div className="bg-white w-[40px] h-[40px] rounded-lg  m-[16px] absolute top-0 right-0 flex justify-center items-center  ">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </figure>
        <div className="card-body ">
          <div className="flex justify-between">
            <h2 className="card-title text-[22px]">Product title</h2>
            <h2 className="text-primary font-bold text-[22px]">EGP 200</h2>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 mt-[16px] self-center">
              <img
                className="rounded-full w-[40px]"
                src="https://yandex-images.clstorage.net/r5fFc3179/60d6facjV/KJ9YvaQaxdSNyvq0t1mR-ZhEWiUdXWlDcsJYpp_Z9a6zOERUHNsiMQXicN4cZldIqA5DhpCX1ctPTOf5hQm0oGWCDaiUdrzopc76uIN9_d2EaHoZPU05X3ujBS82ADU_BtCFodxvkkBAnnGHOAcOEf2r3o-d39w2q0AeCASwyU3Ew3RxkLqApOGeZ-xvOS0hVGkmjS0wjXYG-vFb6tQN02J0aan43yIsBBqJ2833YpldF6unjWt4hr8YRsgANNmxgBfw0QRyLCTZ8mswt8nBWZghRrEBNB0qzkLFx0Ko0a-uDFEBmBsyzHCCuR9dq5Y1cYuHEx1r_MobAO40fNx9qUQfVNV0njA4iWqfRIvBCfGEMTYVHezJYkqOYQdeGCEHLgzppXgPZkygNonP1XfW4Q3Du5-Fdwx6q9weoJRYKaH8pzwJLArY5OE6E-QHyelhiOVqDVXQmX4i9u0P_sxpKx54eVFEV47k1P59JzHrwpnRG2uHkZdwRq-E-sD4FMXt6B_M6bzmMPyZOg_Y601p9ciVoomdzGHO3lZp_-qY8Zc2MJURaNuiDNiGQUtVn9YdqeuD25XnNJpTNFp4nGBd4bAnZEU4VrgkLUYTRNt9IT3UNcIJ2ci9VqpKAdsO7O2r0rwdRaDPFgwsDt1L5RMOxe1bf-f9cxgO01iuBBDw0Sm0L1hdNMo0WIFSG-RbjeGluLkC3elMRbKCcsXbwkSl4yoIGa2Alz743OYh922TzinVNxdf7efg-osU3hAk6OGhpEu8MQj2RNztdh8kC201sbwJ9vlpTJX6HtrtlxbA7QOuINHl4GfKCKz-yQ-9j5Ix6ec3LzETXKYHaDpk8ECVDWz7vOWAflA0sYITRNdhlUEIHUJNISxpRtpO0XMKAFU_vizJ3VQXtmQEIlUzyStWDVk3D4OZbzgiQ9gqCISUFUUEI4R9wG6QRCXimzTrybkxCCEywaEAiWKCjoVDQiwU"
              />
              <h3 className="self-center text-[16px]">User Name</h3>
            </div>
            <div className="self-center flex">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="fill"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="fill"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="fill"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="card-actions w-full mt-[24px]">
            <button className="btn btn-primary text-white w-full">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
