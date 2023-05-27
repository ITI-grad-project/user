function FeatureCard() {
  return (
    // <>
    //   <div className="flex justify-around border border-solid shadow-md py-3 px-14 rounded-md">
    //     <div className="flex gap-3">
    //       <div className="text-primary text-3xl rounded-full w-16 h-16 border border-solid flex justify-center items-center">
    //         <i class="fas fa-shipping-fast"></i>
    //       </div>
    //       <div className="self-center">
    //         <h2 className="text-base font-semibold">Free Shipping</h2>
    //         <p className="text-sm text-gray-500">Capped at EGP 39 Per Order</p>
    //       </div>
    //     </div>
    //     <div className="border-l border-gray-500 h-16"></div>
    //     <div className="flex gap-3">
    //       <div className="text-primary text-3xl rounded-full w-16 h-16 border border-solid flex justify-center items-center">
    //         <i class="fas fa-credit-card"></i>
    //       </div>
    //       <div className="self-center">
    //         <h2 className="text-base font-semibold">Card Payments</h2>
    //         <p className="text-sm text-gray-500">12 Months Installments</p>
    //       </div>
    //     </div>
    //     <div className="border-l border-gray-500 h-16"></div>
    //     <div className="flex gap-3">
    //       <div className="text-primary text-3xl rounded-full w-16 h-16 border border-solid flex justify-center items-center">
    //         <i class="fas fa-box-open"></i>
    //       </div>
    //       <div className="self-center">
    //         <h2 className="text-base font-semibold">Easy Returns</h2>
    //         <p className="text-sm text-gray-500">Shop with confidence</p>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <div className="flex flex-wrap justify-center sm:justify-around border border-solid shadow-md py-3 px-14 rounded-md">
        <div className="flex gap-3">
          <div className="text-primary text-3xl rounded-full w-16 h-16 border border-solid flex justify-center items-center">
            <i className="fas fa-shipping-fast"></i>
          </div>
          <div className="self-center">
            <h2 className="text-base font-semibold">Free Shipping</h2>
            <p className="text-sm text-gray-500">Capped at EGP 39 Per Order</p>
          </div>
        </div>
        <div className="hidden border-gray-500 h-16 sm:block sm:border-l sm:border-t sm:h-auto sm:w-0"></div>
        <div className="flex gap-3 mt-3 sm:mt-0">
          <div className="text-primary text-3xl rounded-full w-16 h-16 border border-solid flex justify-center items-center">
            <i className="fas fa-credit-card"></i>
          </div>
          <div className="self-center">
            <h2 className="text-base font-semibold">Card Payments</h2>
            <p className="text-sm text-gray-500">12 Months Installments</p>
          </div>
        </div>
        <div className="hidden border-gray-500 h-16 sm:block sm:border-l sm:border-t sm:h-auto sm:w-0"></div>
        <div className="flex gap-3 mt-3 sm:mt-0">
          <div className="text-primary text-3xl rounded-full w-16 h-16 border border-solid flex justify-center items-center">
            <i className="fas fa-box-open"></i>
          </div>
          <div className="self-center ">
            <h2 className="text-base font-semibold">Easy Returns</h2>
            <p className="text-sm text-gray-500">Shop with confidence</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeatureCard;
