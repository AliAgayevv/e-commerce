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
import Bucket from "./components/Bucket"
import { CartProvider } from "./context/cartContext";
import Checkout from "./components/Checkout";
import ForgotPassword from "./components/ForgotPassword"

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <MainRoutes />
      </Router>
    </CartProvider >
  );
}

function MainRoutes() {
  const location = useLocation(); 
  const isNotFoundPage = !["/", "/home", "/about", "/products", "/contact", "/login", "/register", "/checkout", "/bucket"].includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/e-commerce/" element={[<Landing />, <LatestProducts />]} />
        <Route path="/e-commerce/home" element={[<Landing />, <LatestProducts />]} />
        <Route path="/e-commerce/checkout" element={<Checkout />} />
        <Route path="/e-commerce/bucket" element={<Bucket/>} />
        <Route path="/e-commerce/about" element={<AboutUs />} />
        <Route path="/e-commerce/products" element={<LatestProducts />} />
        <Route path="/e-commerce/contact" element={<Contact />} />
        <Route path="/e-commerce/login" element={<Login />} />
        <Route path="/e-commerce/register" element={<Register />} />
        <Route path="/e-commerce/forgot-password" element={<ForgotPassword />} />
        <Route path="/e-commerce/*" element={<NotFound />} />
      </Routes>

      {!isNotFoundPage && <Footer />}
    </>
  );
}

export default App;