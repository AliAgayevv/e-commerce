import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCart from "../ProductCart";
import { FaStar } from "react-icons/fa";

const classesForDarkButton =
  "border-2 p-2 h-10 bg-black text-white rounded-lg hover:bg-[#424649] delay-100 ease-in-out outline-none border-none";

const classesForWhiteButton =
  "border-[.7px] p-2 h-10 bg-black text-black rounded-lg hover:bg-[#424649] bg-white text-black border-black delay-100 ease-in-out outline-none";

const item = {
  hidden: { opacity: 0, translateY: 20 },
  visible: { opacity: 1, translateY: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [sameCategoryProducts, setSameCategoryProducts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);

        fetch(`https://fakestoreapi.com/products/category/${data.category}`)
          .then((res) => res.json())
          .then((categoryProducts) => {
            setSameCategoryProducts(categoryProducts.filter((item) => item.id !== data.id));
          });
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Simulate adding to cart
      console.log("Product added to cart:", product);
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-hidden">
      {showNotification && (
        <div className="top-10 right-[10%] bg-green-500 text-white text-sm px-4 py-2 rounded shadow-md animate-fadeIn z-50 fixed">
          <span>
            Added to
            <Link to="/e-commerce/bucket">
              <span className="underline"> Cart</span>
            </Link>
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 w-full max-w-screen-lg mx-auto px-4 md:px-8">
        <div className="w-full h-[300px] sm:h-[400px] flex items-center justify-center overflow-hidden">
          <img className="max-w-full max-h-full object-contain" src={product.image} alt={product.title} />
        </div>

        <div className="gap-2 flex flex-col">
          <h1 className="uppercase text-[#212529BF] text-lg md:text-xl">{product.category}</h1>
          <h2 className="text-2xl md:text-4xl font-bold">{product.title}</h2>
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl">{product.rating?.rate}</span>
            <FaStar />
          </div>
          <p className="text-xl md:text-3xl font-semibold mb-3">${product.price}</p>
          <p className="text-sm md:text-base">{product.description}</p>

          <div className="flex gap-2 mt-4">
            <button className={classesForWhiteButton} onClick={handleAddToCart}>
              Add to Cart
            </button>
            <Link to="/e-commerce/bucket">
              <button className={classesForDarkButton}>Go to cart</button>
            </Link>
          </div>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 sm:mt-15 lg:grid-cols-3 gap-6 lg:mx-auto mt-10 lg:mt-20 ml-10"
        variants={item}
        initial="hidden"
        animate="visible"
      >
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
      </motion.div>
    </motion.div>
  );
}