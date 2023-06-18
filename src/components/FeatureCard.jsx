import { motion } from "framer-motion";

function FeatureCard() {
  return (
    <>
      <div className="flex flex-wrap justify-center sm:justify-around border border-solid shadow-md py-3 px-14 rounded-md">
        <div className="flex gap-3">
          <div className="text-primary text-3xl rounded-full w-16 h-16 border border-solid flex justify-center items-center">
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: -70 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <i className="fas fa-shipping-fast"></i>
            </motion.div>
          </div>
          <div className="self-center">
            <h2 className="text-base font-semibold">Free Shipping</h2>
            <p className="text-sm text-gray-500">Capped at EGP 39 Per Order</p>
          </div>
        </div>
        <div className="hidden border-gray-500 h-16 sm:block sm:border-l sm:border-t sm:h-auto sm:w-0"></div>
        <div className="flex gap-3 mt-3 sm:mt-0">
          <div className="text-primary text-3xl rounded-full w-16 h-16 border border-solid flex justify-center items-center">
            <motion.div
              whileHover={{ rotate: 360 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
            >
              <i className="fas fa-credit-card"></i>
            </motion.div>
          </div>
          <div className="self-center">
            <h2 className="text-base font-semibold">Card Payments</h2>
            <p className="text-sm text-gray-500">12 Months Installments</p>
          </div>
        </div>
        <div className="hidden border-gray-500 h-16 sm:block sm:border-l sm:border-t sm:h-auto sm:w-0"></div>
        <div className="flex gap-3 mt-3 sm:mt-0">
          <div className="text-primary text-3xl rounded-full w-16 h-16 border border-solid flex justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.2, y: -10 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <i className="fas fa-box-open"></i>
            </motion.div>
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
