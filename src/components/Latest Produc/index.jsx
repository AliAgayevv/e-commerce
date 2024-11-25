import { FaSearch } from "react-icons/fa";
import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import CustomHR from "../CustomHR";
import ProductCart from "../ProductCart";
import { motion } from "framer-motion";
import { CartContext } from "../../context/cartContext";
import { useContext } from "react";

const classesForButton =
  "border-2 px-4 py-1 hover:bg-black hover:text-white delay-100 ease-in-out";
const api = "https://fakestoreapi.com/products/";

// Framer motion animations
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export default function LatestProducts() {

  const [products, setProducts] = useState([]); // Filtered products
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false); // Toggle state for search box

  const { allProducts, setAllProducts, category, setCategory } =
    useContext(CartContext);

  const searchRef = useRef(null); // Ref to detect outside clicks

  // Fetch products from API
  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(api);
      const data = await response.json();
      setAllProducts(data);
      setProducts(data); // for initial, all products show on the screen
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [setAllProducts]);

  // Fetch products on component mount
  useMemo(() => {
    fetchAllProducts();
  }, []);

  // Filter by category
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);

    if (newCategory === "All") {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (item) => item.category === newCategory
      );
      setProducts(filteredProducts);
    }
  };

  // Close search box on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false); // Close search box`
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (loading) {
    return <div className="h-screen w-screen">Loading products...</div>;
  }

  return (
    <div className="mt-14">
      <h1 className="text-center text-5xl font-light">Latest Products</h1>

      {/* Search Bar */}
      <div
        className="flex justify-center items-center my-5 relative group"
        ref={searchRef}
      >
        <div
          className="relative flex items-center"
          onClick={() => setSearchOpen(!searchOpen)} // Toggle search box
        >
          {/* Search Icon */}
          <FaSearch
            className={`absolute left-3 text-gray-500 cursor-pointer transition-opacity duration-300 ${
              searchOpen ? "opacity-100" : "opacity-100"
            }`}
          />
          {/* Search Input */}
          <input
            className={`outline-none rounded-lg pl-10 py-2 ${
              searchOpen ? "w-48" : "w-10 group-hover:w-48"
            } transition-all duration-300 ease-in-out border border-gray-300`}
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search"
            autoFocus={searchOpen}
          />
        </div>
      </div>

      <CustomHR w={"w-10/12"} mtop={"mt-5"} />

      {/* Category Buttons */}
      <div className="flex gap-4 justify-center items-center mt-10 mb-10">
        {[
          "All",
          "men's clothing",
          "women's clothing",
          "jewelery",
          "electronics",
        ].map((cat) => (
          <button
            key={cat}
            className={`${classesForButton} ${
              category === cat ? "bg-black text-white" : ""
            }`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-3 gap-10 w-11/12 mx-auto mt-5"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {products
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(search.toLowerCase());
          })
          .map((product) => (
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
    </div>
  );
}