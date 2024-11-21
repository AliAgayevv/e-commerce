import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext";

export default function BucketCart({ id, imgPath, name, price }) {
  const { removeFromCart, updateCartQuantity, cart } = useContext(CartContext);

  const product = cart.find((item) => item.id === id);
  const quantity = product ? product.quantity : 1;

  return (
    <div className="flex justify-between  items-center">
      <div className="flex items-center w-96">
          <img
          src={imgPath}
          alt={name}
          className="w-20 h-20 object-contain mr-4"
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-gray-600">
            {quantity} x ${price.toFixed(2)}
          </p>
        </div>
      </div>

      
      <button
        onClick={() => removeFromCart(id)}
        className=" text-red-500 border px-2 py-1 hover:bg-red-500 hover:text-white ml-4"
      >
        Remove
      </button>

      
    </div>
  );
}