import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import CustomHR from "../CustomHR";
import { Link, useLocation } from "react-router-dom";

export default function OrderSum() {
  const { cart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const location = useLocation();

  return (
    <div className="flex flex-col  w-full sm:w-12/12 lg:w-12/12 bg-[#f6f6f6] p-4 rounded-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Order Summary</h2>
      <CustomHR mtop={""} w={"w-[100%]"} />
      <div className="flex justify-between mt-4">
        <p className="font-semibold text-sm md:text-base">Total Items:</p>
        <p className="text-sm md:text-base">
          {cart.reduce((acc, item) => acc + item.quantity, 0)}
        </p>
      </div>
      <div className="flex justify-between mt-2">
        <p className="font-semibold text-sm md:text-base">Total Price:</p>
        <p className="text-sm md:text-base">${totalPrice.toFixed(2)}</p>
      </div>

      {location.pathname !== "/e-commerce/checkout" && cart.length > 0 && (
        <Link to="/e-commerce/checkout" key="checkout">
          <button className="mt-6 w-full bg-black text-white py-2 text-sm md:text-base rounded-lg hover:bg-gray-800">
            Proceed to Checkout
          </button>
        </Link>
      )}
    </div>
  );
}