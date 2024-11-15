import React from 'react'
import { FiLogIn } from "react-icons/fi";
import { MdShoppingCart } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";



const navbarElements = ["Home", "Products", "About", "Contact"];
const buttonClasses = "flex items-center justify-center gap-2 h-10 border-[1px] border-black rounded-lg p-2"

export default function Navbar() {
    return (
        <div className='flex justify-between items-center p-6 bg-[#f6f7f9] sticky'>
            <div>
                <a href='/home'>
                <h1 className='ml-20 font-bold text-2xl'>
                    React Ecommerce
                </h1>
                </a>
            </div>

            <div>
                <ul className='flex gap-5'>
                    {navbarElements.map((item) => {
                        return <a href={item.toLowerCase()}>
                            <li className='opacity-50 transition-all delay-100 hover:opacity-100'>{item}</li>
                        </a>
                    })}
                </ul>
            </div>
            <div className='flex gap-5 mr-16'>
                <a href='/login'>
                    <button className={buttonClasses}>
                        <FiLogIn />
                        Login
                    </button>
                </a>
                <a href='/register'>
                    <button className={buttonClasses}>
                        <FaUserPlus />
                        Register
                    </button>
                </a>
                <a href='/bucket'>
                    <button className={buttonClasses}>
                        <MdShoppingCart />
                        Cart(0)
                    </button>
                </a>
            </div>
        </div>
    )
}
