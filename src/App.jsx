import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import LatestProducts from "./components/Latest Produc";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register"
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={[<Landing/>, <LatestProducts/>]} />
        <Route path="/home" element={[<Landing/>, <LatestProducts/>]} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/products" element={<LatestProducts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;