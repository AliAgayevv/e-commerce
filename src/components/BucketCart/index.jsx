import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext";

export default function BucketCart({ id, imgPath, name, price }) {
  const { removeFromCart, cart } = useContext(CartContext);

  const product = cart.find((item) => item.id === id);
  const quantity = product ? product.quantity : 1;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 p-4 border-b">
      {/* Product Image and Details */}
      <div className="flex items-center gap-4 w-full sm:w-8/12">
        <img
          src={imgPath}
          alt={name}
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
        />
        <div className="flex flex-col">
          <p className="font-semibold text-sm sm:text-base">{name}</p>
          <p className="text-gray-600 text-sm sm:text-base">
            {quantity} x ${price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(id)}
        className="text-xs sm:text-sm text-red-500 border px-2 py-1 rounded hover:bg-red-500 hover:text-white transition"
      >
        Remove
      </button>
    </div>
  );
}