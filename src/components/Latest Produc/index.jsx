import React, { useState, useMemo, useCallback } from 'react';
import CustomHR from '../CustomHR';
import ProductCart from '../ProductCart';

const classesForButton = "border-2 px-4 py-1 hover:bg-black hover:text-white delay-100 ease-in-out";
const api = 'https://fakestoreapi.com/products/';

export default function LatestProducts() {
  const [allProducts, setAllProducts] = useState([]); 
  const [products, setProducts] = useState([]); // Filtered products
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

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
  }, []);

  // When website initialized, all product show 
  useMemo(() => {
    fetchAllProducts();
  }, []);

  // filter by category
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);

    if (newCategory === "all") {
      setProducts(allProducts); 
    } else {
      const filteredProducts = allProducts.filter((item) => item.category === newCategory);
      setProducts(filteredProducts); 
    }
  };

  if (loading) {
    return <div className='h-screen w-screen'>Loading products...</div>;
  }

  return (
    <div className='mt-14'>
      <h1 className='text-center text-5xl font-light'>
        Latest Products
      </h1>

      <CustomHR w={"w-10/12"} mtop={"mt-5"} />

      <div className='flex gap-4 justify-center items-center mt-10 mb-10'>
        <button
          className={`${classesForButton} ${category === "all" ? "bg-black text-white" : ""}`}
          onClick={() => handleCategoryChange("all")}
        >
          All
        </button>
        <button
          className={`${classesForButton} ${category === "men's clothing" ? "bg-black text-white" : ""}`}
          onClick={() => handleCategoryChange("men's clothing")}
        >
          Men's Clothing
        </button>
        <button
          className={`${classesForButton} ${category === "women's clothing" ? "bg-black text-white" : ""}`}
          onClick={() => handleCategoryChange("women's clothing")}
        >
          Women's Clothing
        </button>
        <button
          className={`${classesForButton} ${category === "jewelery" ? "bg-black text-white" : ""}`}
          onClick={() => handleCategoryChange("jewelery")}
        >
          Jewelery
        </button>
        <button
          className={`${classesForButton} ${category === "electronics" ? "bg-black text-white" : ""}`}
          onClick={() => handleCategoryChange("electronics")}
        >
          Electronics
        </button>
      </div>

      <div className='grid grid-cols-3 gap-10 w-11/12 mx-auto mt-5'>
        {products.map((product) => (
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
    </div>
  );
}