import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import LatestProducts from "./components/Latest Produc";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Navbar />
      <MainRoutes />
    </Router>
  );
}

function MainRoutes() {
  const location = useLocation(); 
  const isNotFoundPage = !["/", "/home", "/about", "/products", "/contact", "/login", "/register"].includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={[<Landing />, <LatestProducts />]} />
        <Route path="/home" element={[<Landing />, <LatestProducts />]} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<LatestProducts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isNotFoundPage && <Footer />}
    </>
  );
}

export default App;