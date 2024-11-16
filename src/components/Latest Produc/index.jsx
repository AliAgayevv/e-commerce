import React, { useEffect, useState } from 'react'
import CustomHR from '../CustomHR'
import ProductCart from '../../ProductCart'


const classesForButton = "border-2 px-4 py-1 hover:bg-black hover:text-white delay-100 ease-in-out"


const api = 'https://fakestoreapi.com/products/'


export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error("Products", error);
        }
    };

    fetchProducts();
}, []);

if (loading) {
  return <p>Loading products...</p>;
}

  return (
    <div className='mt-14'>
        <h1 className='text-center text-5xl font-light'>
            Latest Products 
        </h1>



            <CustomHR w={"w-10/12"} mtop={"mt-5"}/>

      <div className='flex gap-4 justify-center items-center mt-10 mb-10'>
        <button className={classesForButton}>All</button>
        <button className={classesForButton}>Men's Clothing</button>
        <button className={classesForButton}>Women's Clothing</button>
        <button className={classesForButton}>Jewelery</button>
        <button className={classesForButton}>Electronics</button>
      </div>

        <div className='grid grid-cols-3 gap-10 w-11/12 mx-auto mt-5'>
        {products.map((product) => (
                <ProductCart
                    key={product.id}
                    imgPath={product.image}
                    name={product.title}
                    desc={product.description}
                    price={product.price}
                />
            ))}


          {/* <ProductCart imgPath={"./src/assets/imgs/manclot.jpeg"} name={"Mens Casual"} desc="Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight..." price={22.3}/>
          <ProductCart imgPath={"./src/assets/imgs/manclot.jpeg"} name={"Mens Casual"} desc="Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight..." price={22.3}/>
          <ProductCart imgPath={"./src/assets/imgs/manclot.jpeg"} name={"Mens Casual"} desc="Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight..." price={22.3}/>
          <ProductCart imgPath={"./src/assets/imgs/manclot.jpeg"} name={"Mens Casual"} desc="Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight..." price={22.3}/>
           */}
        </div>
    </div>
  )
}
