import React from 'react';
import { FiLogIn } from "react-icons/fi";
import { MdShoppingCart } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const navbarElements = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];
const buttonClasses = `flex items-center justify-center gap-2 h-10 border-[1px] border-black rounded-lg p-2`;

export default function Navbar() {
  const location = useLocation(); 

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
              <Link to={item.path} key={item.name}>
                <li
                  className={`opacity-50 transition-all delay-100 hover:opacity-100 ${
                    location.pathname === item.path ? "opacity-100 font-bold" : ""
                  }`}
                >
                  {item.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className='flex gap-5 mr-16'>
        <Link to='/login'>
          <button
            className={`${buttonClasses} ${
              location.pathname === "/login" ? "bg-[#343a40] text-white" : ""
            }`}
          >
            <FiLogIn />
            Login
          </button>
        </Link>
        <Link to='/register'>
          <button
            className={`${buttonClasses} ${
              location.pathname === "/register" ? "bg-[#343a40] text-white" : ""
            }`}
          >
            <FaUserPlus />
            Register
          </button>
        </Link>
        <Link to='/bucket'>
          <button
            className={`${buttonClasses} ${
              location.pathname === "/bucket" ? "bg-[#343a40] text-white" : ""
            }`}
          >
            <MdShoppingCart />
            Cart(0)
          </button>
        </Link>
      </div>
    </div>
  );
}