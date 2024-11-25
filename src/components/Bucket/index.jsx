import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import CustomHR from "../CustomHR";
import BucketCart from "../BucketCart";
import { useAuthState } from "react-firebase-hooks/auth";
import OrderSum from "../OrderSum";
import { auth } from "../../firebase";
import { motion } from "framer-motion";

export default function Bucket() {
  const [user, isLoading] = useAuthState(auth);
  const { cart, updateCartQuantity, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      updateCartQuantity(id, quantity);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading user information...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="mt-5 px-4 sm:px-8 lg:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl">Bucket</h1>
      <CustomHR mtop={"mt-5"} w={"w-full"} />

      <div className="flex flex-col lg:flex-row mt-10 lg:mt-24 gap-10">
        {/* Cart Items Section */}
        <div className="flex flex-col border-[1.5px] rounded-lg w-full lg:w-8/12 overflow-hidden">
          <h2 className="text-xl lg:text-2xl border-b bg-[#f6f6f6] p-3">
            Bucket of {user?.displayName || "Guest"}
          </h2>

          <div className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[60vh]">
            {cart.length === 0 ? (
              <p>Your cart is empty!</p>
            ) : (
              cart.map((item) => (
                <motion.div
                  key={item.id}
                  className="border-b pb-4 flex flex-col sm:flex-row justify-between items-center"
                  initial={{ opacity: 0, translateY: "-40%" }}
                  animate={{ opacity: 1, translateY: "0" }}
                >
                  <BucketCart
                    id={item.id}
                    imgPath={item.imgPath}
                    name={item.name}
                    price={item.price}
                  />
                  <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <button
                      className="border p-2"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      className="border p-2"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-4/12">
          <OrderSum totalPrice={totalPrice} />
        </div>
      </div>
    </motion.div>
  );
}