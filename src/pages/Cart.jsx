function Cart() {
  return (
    <>
      <div className="flex flex-col justify-center items-center m-10">
        <h2 className="font-bold text-3xl uppercase text-center">Cart</h2>
        <hr className="w-16 bg-primary h-1 mt-2" />
      </div>
      <div className="flex px-28 gap-8">
        <div className="w-2/3">
          <div className="border-b-2 border-base-300 ">
            <div className=" justify-between">
              <h1 className="capitalize text-xl font-semibold">My Cart</h1>
              <div className="flex self-center justify-between">
                <div className="flex">
                  <span class=" self-center text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-yellow-200 h-fit ">
                    5.0
                  </span>
                  <h3 className="capitalize">Items</h3>
                </div>
                <h3 className="capitalize">Price</h3>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-b-2 border-base-300 border-">
            <div className="flex gap-4">
              <img
                className="h-32 w-32 rounded-xl mb-4"
                src="https://avatars.mds.yandex.net/i?id=c168f36ffa212bbce10a6a27d52b0c255172bf00-7086399-images-thumbs&n=13"
                alt="image description"
              />
              <div>
                <h1 className="font-bold capitalize">Product title</h1>
                <a
                  href="#"
                  className="text-xs text-secondary hover:text-primary hover:underline"
                >
                  Remove From Cart
                </a>
              </div>
            </div>
            <h2 className="font-bold">EGP 200</h2>
          </div>
        </div>
        <div className="w-1/3 border border-base-300 rounded-lg">
          <h1 className="text-xl p-5 text-center font-semibold">
            Order Summary
          </h1>
        </div>
      </div>
    </>
  );
}

export default Cart;
