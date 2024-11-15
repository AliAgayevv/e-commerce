import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import LatestProducts from "./components/Latest Produc";
import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={[<Landing/>, <LatestProducts/>]} />
        <Route path="/home" element={[<Landing/>, <LatestProducts/>]} />
        <Route path="/products" element={<LatestProducts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;