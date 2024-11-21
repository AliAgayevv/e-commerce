import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import CustomHR from "../CustomHR";
import BucketCart from "../BucketCart";
import { useAuthState } from "react-firebase-hooks/auth";
import OrderSum from "../OrderSum";
import { auth } from "../../firebase";

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
    <div className="mt-5">
    <h1 className="text-center text-5xl">Bucket</h1>
      <CustomHR mtop={"mt-5"} w={"w-11/12"} />

      <div className="flex mt-24 gap-10">
        <div className="flex flex-col border-[1.5px] h-screen ml-32 w-6/12">
          <h2 className="text-2xl border-[1px] bg-[#f6f6f6] p-3">
            Bucket of {user?.displayName || "Guest"}
          </h2>

          <div className="p-4 flex flex-col gap-4">
            {cart.length === 0 ? (
              <p>Your cart is empty!</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="border-b pb-4 flex justify-between items-center">
                  <BucketCart
                    id={item.id}
                    imgPath={item.imgPath}
                    name={item.name}
                    price={item.price}
                  />
                  <div className="flex items-center gap-2">
                    <button
                      className="border p-2"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="border p-2"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <OrderSum totalPrice={totalPrice} />
      </div>
    </div>
  );
}