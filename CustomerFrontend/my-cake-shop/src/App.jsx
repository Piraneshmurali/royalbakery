// src/App.js
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";

// Lazy-loaded components
const Home = React.lazy(() => import("./pages/Home"));
const CakeList = React.lazy(() => import("./components/CakeList"));
const Checkout = React.lazy(() => import("./components/Checkout"));
const Cart = React.lazy(() => import("./components/Cart"));
const Shop = React.lazy(() => import("./pages/Shop"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const BlogList = React.lazy(() => import("./components/BlogList"));
const BlogDetail = React.lazy(() => import("./components/BlogDetail"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const BlogForm = React.lazy(() => import("./components/BlogForm"));

const App = () => {
  return (
    <Router>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cakes" element={<CakeList />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/BlogForm" element={<BlogForm />} />

        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
      {/* </Suspense> */}
    </Router>
  );
};

export default App;
