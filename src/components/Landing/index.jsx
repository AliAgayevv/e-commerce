import React from "react";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
      <img
        src="https://reactjs-ecommerce-app.vercel.app/assets/main.png.jpg"
        alt="Season Arrivals"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 md:px-8 lg:px-16">
        <p className="font-extralight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
          New Season Arrivals
        </p>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-4 max-w-2xl">
          Discover the latest trends in our new collection. Quality products,
          crafted with care, just for you!
        </p>
        {/* <button className="mt-6 px-6 py-3 bg-[#0d6efd] hover:bg-[#0b5ed7] transition text-white rounded-lg text-sm md:text-base">
          Shop Now
        </button> */}
      </div>
    </div>
  );
}