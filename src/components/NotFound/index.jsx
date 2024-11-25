import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="bg-[#f6f7f9] w-full h-screen flex flex-col items-center justify-center px-4">
      {/* 404 Message */}
      <p className="text-2xl sm:text-4xl lg:text-5xl text-center font-bold mb-6">
        404: Page Not Found
      </p>

      {/* Back to Home Button */}
      <Link to="/e-commerce/" key="home">
        <div className="flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base lg:text-lg border border-black rounded-lg hover:bg-black hover:text-white transition ease-out duration-200">
          <FaArrowLeft />
          Go Back to Home
        </div>
      </Link>
    </div>
  );
}