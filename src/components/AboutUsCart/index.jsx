import React from 'react'


export default function AboutUsCart({name, imgPath}) {
  return (
    <div className='border-2 rounded-md'>
        <div className='w-72'>
            <img className='w-[100%]' src={imgPath} alt={name} />
        </div>

        <h1 className='text-center text-xl p-3'>
            {name}
        </h1>
    </div>
)
}
