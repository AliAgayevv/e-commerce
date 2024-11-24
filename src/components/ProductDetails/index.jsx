import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../context/cartContext'
import { FaStar } from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCart from '../ProductCart';
import { motion } from 'framer-motion';

const classesForDarkButton = " border-2 p-2 h-10 bg-black text-white rounded-lg hover:bg-[#424649] delay-100 ease-in-out outline-none border-none";

const classesForWhiteButton = " border-[.7px] p-2 h-10 bg-black text-black rounded-lg hover:bg-[#424649] bg-white text-black border-black delay-100 ease-in-out outline-none";

const item = {
    hidden: { opacity: 0, translateY: 20 },
    visible: { opacity: 1, translateY: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

export default function ProductDetails() {
    window.scrollTo({
        top:0,
        behavior: "smooth"
    })


    const [showNotification, setShowNotification] = useState(false);
    
    const { allProducts, category, setCategory, id, addToCart } = useContext(CartContext)

    
    
    const currentProduct = allProducts.filter((item) => item.id === id)
    

    currentProduct.map(item => setCategory(item.category))


    const sameCategoryProducts = []

    allProducts.filter((item) => { item.category === category && item.id !== id ? sameCategoryProducts.push(item) : null })






    const handleAddToCart = () => {

        currentProduct.map((product) => {
            addToCart({ id: product.id, imgPath: product.image, name: product.title, price: product.price })
        })


        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, 2000);
    };




    return (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        >
            {showNotification && (
                <div className=" top-10 right-[700px] bg-green-500 text-white text-sm px-4 py-2 rounded shadow-md animate-fadeIn z-[9999999999] fixed">
                    <span>Added to
                        <Link to="/e-commerce/bucket" key={"bucket"}>
                            <span className='underline'> Cart</span>
                        </Link>
                    </span>
                </div>
            )}

            {currentProduct.map((product) => (
                <div className='grid grid-cols-2 mt-20 w-[1400px] mx-auto'>
                    <div className='w-full h-[400px] flex items-center justify-center overflow-hidden'>
                        <img className='max-w-[400px] max-h-[400px] object-contain' src={product.image}></img>
                    </div>

                    <div className='gap-2 flex flex-col'>
                        <h1 className='uppercase text-[#212529BF]'>{product.category}</h1>
                        <h2 className='text-5xl'>{product.title}</h2>
                        <div className='flex items-center gap-2'>
                            {product.rating.rate}
                            <FaStar />
                        </div>
                        <p className='text-4xl mb-3'>${product.price}</p>
                        <p>{product.description}</p>

                        <div className='flex gap-2 mt-2'>
                            <button className={classesForWhiteButton} onClick={handleAddToCart}>Add to Cart</button>
                            <Link to="/e-commerce/bucket" key={"bucket"}>
                            <button className={classesForDarkButton}>Go to cart</button>
                            </Link>
                        </div>

                    </div>

                </div>
            ))}

            <motion.div className='flex flex-col gap-10 mt-32'
            variants={item}
            initial="hidden"
            animate="visible">

                <h1 className='ml-20 text-left text-4xl font-serif'>You may also like</h1>
                <div className='grid grid-cols-3 gap-5 mx-auto'>


                    {sameCategoryProducts.map((product) => (
                        <ProductCart
                            key={product.id}
                            imgPath={product.image}
                            name={product.title}
                            desc={product.description}
                            price={product.price}
                            id={product.id}
                        />
                    ))}

                </div>
            </motion.div>
        </motion.div>
    )
}
