import React, { useContext, useCallback, useState, useRef, useEffect } from "react";
import { FiLogIn } from "react-icons/fi";
import { MdShoppingCart } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { FaBars, FaTimes } from "react-icons/fa";

const navbarElements = [
  { name: "Home", path: "/e-commerce/" },
  { name: "Products", path: "/e-commerce/products" },
  { name: "About", path: "/e-commerce/about" },
  { name: "Contact", path: "/e-commerce/contact" },
];
const buttonClasses = `flex items-center justify-center gap-2 h-10 border-[1px] border-black rounded-lg p-2`;

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const producstCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const location = useLocation();
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  const handleSignOut = useCallback(() => {
    setMenuOpen(false)
    signOut(auth);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:gap-2 justify-between items-center p-4 md:p-6 bg-[#f6f7f9] sticky top-0 z-[9999]">
      <div className="w-full flex justify-between items-center">
        <Link to="/e-commerce/">
          <h1 className="text-lg md:text-2xl font-bold">React Ecommerce</h1>
        </Link>
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        ref={menuRef}
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row w-full md:w-auto items-center gap-3 md:gap-10 mt-4 md:mt-0`}
      >
        <ul className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
          {navbarElements.map((item) => (
            <Link to={item.path} key={item.name}>
              <li
                onClick={() => setMenuOpen(false)}
                className={`opacity-50 transition-all delay-100 hover:opacity-100 ${
                  location.pathname === item.path ? "opacity-100 font-bold" : ""
                }`}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>

        {user !== null ? (
          <div className="w-40">
            
            <button className={`${buttonClasses} mx-auto`} onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex flex-row md:flex-row items-center gap-3 md:gap-5">
            <Link to="/e-commerce/login">
              <button
              onClick={() => setMenuOpen(false)}
                className={`${buttonClasses} ${
                  location.pathname === "/e-commerce/login"
                    ? "bg-[#343a40] text-white"
                    : ""
                }`}
              >
                <FiLogIn />
                Login
              </button>
            </Link>
            <Link to="/e-commerce/register">
              <button
              onClick={() => setMenuOpen(false)}
                className={`${buttonClasses} ${
                  location.pathname === "/e-commerce/register"
                    ? "bg-[#343a40] text-white"
                    : ""
                }`}
              >
                <FaUserPlus />
                Register
              </button>
            </Link>
          </div>
        )}

        <div className="flex flex-row">
          <Link to="/e-commerce/bucket">
            <button
            onClick={() => setMenuOpen(false)}
              className={`${buttonClasses} ${
                location.pathname === "/e-commerce/bucket"
                  ? "bg-[#343a40] text-white"
                  : ""
              }`}
            >
              <MdShoppingCart size={24} />
              <span className="text-sm">Bucket ({producstCount})</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}