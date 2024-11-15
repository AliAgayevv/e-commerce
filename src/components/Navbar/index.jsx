import React from 'react';
import { FiLogIn } from "react-icons/fi";
import { MdShoppingCart } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const navbarElements = ["Home", "Products", "About", "Contact"];
const buttonClasses = "flex items-center justify-center gap-2 h-10 border-[1px] border-black rounded-lg p-2";

export default function Navbar() {
  return (
    <div className='flex justify-between items-center p-6 bg-[#f6f7f9] sticky'>
      <div>
        <Link to='/'>
          <h1 className='ml-20 font-bold text-2xl'>
            React Ecommerce
          </h1>
        </Link>
      </div>

      <div>
        <ul className='flex gap-5'>
          {navbarElements.map((item) => {
            return (
              <Link to={item.toLowerCase()} key={item}>
                <li className='opacity-50 transition-all delay-100 hover:opacity-100'>{item}</li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className='flex gap-5 mr-16'>
        <Link to='/login'>
          <button className={buttonClasses}>
            <FiLogIn />
            Login
          </button>
        </Link>
        <Link to='/register'>
          <button className={buttonClasses}>
            <FaUserPlus />
            Register
          </button>
        </Link>
        <Link to='/bucket'>
          <button className={buttonClasses}>
            <MdShoppingCart />
            Cart(0)
          </button>
        </Link>
      </div>
    </div>
  );
}