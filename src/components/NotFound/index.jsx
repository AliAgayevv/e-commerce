import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className='bg-[#f6f7f9] w-10/12 h-52 mt-10 mx-auto flex flex-col items-center justify-center'>
            <p className='text-5xl'>
                404: Page Not Found
            </p>
            <Link to="/" key="home">

                <div className='flex-row flex items-center hover:bg-black hover:text-white delay-100 ease-out justify-center gap-2 border-[1px] mt-8 rounded-lg p-2 border-black'>
                    <FaArrowLeft />
                    Go Back to Home
                </div>
            </Link>
        </div>
    )
}
