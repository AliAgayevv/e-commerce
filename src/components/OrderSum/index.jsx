import React, {useContext} from 'react'
import { CartContext } from '../../context/cartContext';
import CustomHR from '../CustomHR';
import { Link, useLocation } from 'react-router-dom';




export default function OrderSum() {
    const { cart } = useContext(CartContext);

const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const location = useLocation(); 
  

  return (
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

          {location.pathname !== "/checkout" && cart.length > 0 && (
  <Link to="/checkout" key="checkout">
    <button className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
      Proceed to Checkout
    </button>
  </Link>
)}

        </div>
  )
}
