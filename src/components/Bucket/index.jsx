import React, { useContext } from 'react';
import { CartContext } from '../../context/cartContext';

import CustomHR from '../CustomHR';
import BucketCart from '../BucketCart';

export default function Bucket() {
  const { cart } = useContext(CartContext);

  // Toplam fiyat hesaplama
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-5">
      <h1 className="text-center text-5xl">Cart</h1>
      <CustomHR mtop={"mt-5"} w={"w-11/12"} />

      <div className="flex mt-24 gap-10">
        <div className="flex flex-col border-[1.5px] h-screen ml-32 w-6/12">
          <h2 className="text-2xl border-[1px] bg-[#f6f6f6] p-3">Item list</h2>

          <div className="p-4 flex flex-col gap-4">
            {cart.length === 0 ? (
              <p>Your cart is empty!</p>
            ) : (
              cart.map((item) => (
                <BucketCart
                  key={item.id}
                  id={item.id}
                  imgPath={item.imgPath}
                  name={item.name}
                  price={item.price}
                />
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col w-3/12 h-screen bg-[#f6f6f6] p-4">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <CustomHR mtop={""} w={"w-[100%]"} />
          <div className="flex justify-between mt-4">
            <p className="font-semibold">Total Items:</p>
            <p>{cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="font-semibold">Total Price:</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <button className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}