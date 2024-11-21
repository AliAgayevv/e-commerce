import React, { useContext, useState } from 'react';
import CustomHR from '../CustomHR';
import { CartContext } from '../../context/cartContext';
import { Link } from 'react-router-dom';

const classesForButton = "border-2 p-2 bg-black text-white rounded-lg hover:bg-[#424649] delay-100 ease-in-out outline-none border-none";

export default function ProductCart({ id, imgPath, name, desc, price }) {
  const truncatedName = name.length > 15 ? `${name.substring(0, 15)}...` : name;
  const truncatedDesc = desc.length > 50 ? `${desc.substring(0, 50)}...` : desc;

  const [showNotification, setShowNotification] = useState(false);

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const product = { id, imgPath, name, price };
    addToCart(product);

    setShowNotification(true)

    setTimeout(() => {
      setShowNotification(false)
    },2000)
  };

  return (
    <div className='flex flex-col justify-center items-center border-2 text-center p-4 w-[430px]'> 
      {showNotification && (
      
      <div className=" top-10 right-[700px] bg-green-500 text-white text-sm px-4 py-2 rounded shadow-md animate-fadeIn z-[9999999999] fixed">
    <span>Added to 
    <Link to="/e-commerce/bucket" key={"bucket"}>
           <span className='underline'> Cart</span>
    </Link>
    </span>
  </div>
)}
      <div className='w-full h-[300px] flex items-center justify-center overflow-hidden'>
        <img className='max-w-[300px] max-h-[300px] object-contain' src={imgPath} alt={name} /> 
      </div>

      <p className='text-center font-bold mt-4'>
        {truncatedName}
      </p>

      <p className='py-2 text-gray-600'>
        {truncatedDesc}
      </p>

      <CustomHR mtop={""} w={"w-[100%]"} />
      <p className='text-xl font-semibold p-2'>
        $ {price}
      </p>

      <CustomHR mtop={""} w={"w-[100%]"} />
      <div className='flex gap-3 p-4'>
        <button className={classesForButton}>Buy Now</button>
        <button className={classesForButton} onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}