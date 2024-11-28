import React from "react";
import CustomHR from "../CustomHR";
import AboutUsCart from "../AboutUsCart";
import { motion } from "framer-motion";

const aboutUsData = [
  {
    id: 1,
    photoPath: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Men's Clothing",
  },
  {
    id: 2,
    photoPath:
      "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Women's Clothing",
  },
  {
    id: 3,
    photoPath:
      "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Jewelery",
  },
  {
    id: 4,
    photoPath:
      "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Electronics",
  },
];

export default function AboutUs() {
  return (
    <motion.div
      className="flex flex-col mt-10 px-4 md:px-10 lg:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Başlık */}
      <h1 className="text-center text-4xl md:text-5xl font-bold">
        About Us
      </h1>
      <CustomHR mtop={"mt-5"} w={"w-full"} />

      <div className="w-full mt-5">
        <p className="w-60 text-left m-auto text-base md:text-lg lg:text-xl font-light sm:w-full sm:text-center leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum facere doloremque
          veritatis odit similique sequi. Odit amet fuga nam quam quasi facilis sed doloremque saepe
          sint perspiciatis explicabo totam vero quas provident ipsam, veritatis nostrum velit quos
          recusandae est mollitia esse fugit dolore laudantium. Ex vel explicabo earum unde eligendi
          autem praesentium, doloremque distinctio nesciunt porro tempore quis eaque labore
          voluptatibus ea necessitatibus exercitationem tempora molestias.
        </p>
      </div>

      <h2 className="text-center mt-20 text-2xl md:text-3xl lg:text-4xl font-semibold">
        Our Products
      </h2>

      <motion.div
        className="grid grid-cols-1 m-auto sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
        initial={{ opacity: 0, translateY: "-40%" }}
        animate={{ opacity: 1, translateY: "0" }}
      >
        {aboutUsData.map((item) => (
          <AboutUsCart key={item.id} name={item.title} imgPath={item.photoPath} />
        ))}
      </motion.div>
    </motion.div>
  );
}