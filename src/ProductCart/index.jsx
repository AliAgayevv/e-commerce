import React from 'react'
import CustomHR from '../components/CustomHR'
const classesForButton = "border-2 p-2 bg-black text-white rounded-lg hover:bg-[#424649] delay-300 outline-none border-none"

export default function ProductCart({imgPath, name, desc, price}) {
  return (
    <div className='flex flex-col justify-center items-center border-2 text-center'>
        <div className='w-96'>
            <img className='w-[100%]' src={imgPath} alt={name} />
        </div>


        <p className='text-center'>
                {name}
        </p>

        <desc className='py-2'>
        {desc}
        </desc>

        <CustomHR mtop={""} w={"w-[100%]"}/>
        <p className='text-xl p-2'>
           $ {price}
        </p>

        <CustomHR mtop={""} w={"w-[100%]"}/>
        <div className='flex gap-3 p-4'>
            <button className={classesForButton}>Buy Now</button>
            <button className={classesForButton}>Add to Cart</button>
        </div>
    </div>

  )
}
