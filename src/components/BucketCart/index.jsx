import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext";

export default function BucketCart({ id, imgPath, name, price }) {
  const { removeFromCart, updateCartQuantity, cart } = useContext(CartContext);

  const product = cart.find((item) => item.id === id);
  const quantity = product ? product.quantity : 1;

  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div className="flex items-center">
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

      <div className="flex items-center">
        <button
          className="border px-2 py-1 text-lg"
          onClick={() => updateCartQuantity(id, quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="px-4">{quantity}</span>
        <button
          className="border px-2 py-1 text-lg"
          onClick={() => updateCartQuantity(id, quantity + 1)}
        >
          +
        </button>
      </div>

      <button
        onClick={() => removeFromCart(id)}
        className="text-red-500 border px-2 py-1 hover:bg-red-500 hover:text-white ml-4"
      >
        Remove
      </button>
    </div>
  );
}