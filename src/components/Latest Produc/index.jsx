import React from 'react'
import CustomHR from '../CustomHR'
import ProductCart from '../../ProductCart'

const api = 'https://fakestoreapi.com/products'



export default function LatestProducts() {
  return (
    <div className='mt-14'>
        <h1 className='text-center text-5xl font-light'>
            Latest Products 
        </h1>


            <CustomHR w={"w-10/12"} mtop={"mt-5"}/>

        <div className='grid grid-cols-3 gap-4 w-11/12 mx-auto mt-5'>
          <ProductCart imgPath={"./src/assets/imgs/manclot.jpeg"} name={"Mens Casual"} desc="Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight..." price={22.3}/>
          <ProductCart imgPath={"./src/assets/imgs/manclot.jpeg"} name={"Mens Casual"} desc="Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight..." price={22.3}/>
          <ProductCart imgPath={"./src/assets/imgs/manclot.jpeg"} name={"Mens Casual"} desc="Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight..." price={22.3}/>
          
        </div>
    </div>
  )
}
