import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, ShoppingCart } from "lucide-react";
import logo from "../assets/logo.png";
import { useCart } from "./CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePath, setActivePath] = useState("");

  const { getCartSize } = useCart();

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartSize);
  }, [getCartSize]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const location = useLocation();
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 text-white transition-all duration-300 ${
        isScrolled ? "bg-[#171718] py-2" : "bg-[#171718] py-4"
      }`}
    >
      {/* Contact Info Bar */}
      <div
        className={`border-b border-zinc-800 transition-opacity duration-300 ${
          isScrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center py-2">
          <span className="text-sm hidden sm:block">
            Call Us : (+94) 77-614-6135
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm">Mon-Sun : 7am — 7pm</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center md:justify-center">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Logo */}
          <Link to="/" className="md:hidden">
            <img
              src={logo}
              alt="Sweet Cream Logo"
              className={`h-8 transition-all duration-300 ${
                isScrolled ? "h-6" : "h-8"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div
            className={` 
            fixed md:relative top-[93px] md:top-0 left-0 w-full md:w-auto
            bg-[#171718] md:bg-transparent
            ${isMenuOpen ? "block" : "hidden"} md:block
            border-t md:border-t-0 border-zinc-800
          `}
          >
            <div className="flex flex-col md:flex-row md:items-center md:space-x-12 p-4 md:p-0">
              <Link
                to="/"
                className={`relative overflow-hidden px-4 py-1 text-[13px] tracking-wider group ${
                  activePath === "/" ? "border border-[#8B7355]" : ""
                }`}
              >
                <span className="relative z-10 transition-colors jost-font duration-300 group-hover:text-white">
                  HOME
                </span>
                <div className="absolute inset-0 bg-[#8B7355] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
              <Link
                to="/aboutus"
                className={`relative overflow-hidden px-4 py-1 text-[13px] tracking-wider group ${
                  activePath === "/aboutus" ? "border border-[#8B7355]" : ""
                }`}
              >
                <span className="relative z-10 transition-colors jost-font duration-300 group-hover:text-white">
                  ABOUT
                </span>
                <div className="absolute inset-0 bg-[#8B7355] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
              <Link
                to="/shop"
                className={`relative overflow-hidden px-4 py-1 text-[13px] tracking-wider group ${
                  activePath === "/shop" ? "border border-[#8B7355]" : ""
                }`}
              >
                <span className="relative z-10 transition-colors jost-font duration-300 group-hover:text-white">
                  SHOP
                </span>
                <div className="absolute inset-0 bg-[#8B7355] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
              <Link to="/" className="hidden md:block px-16">
                <img
                  src={logo}
                  alt="Sweet Cream Logo"
                  className={`h-28 transition-all duration-300 ${
                    isScrolled ? "h-20" : "h-28"
                  }`}
                />
              </Link>
              <Link
                to="/blog"
                className={`relative overflow-hidden px-4 py-1 text-[13px] tracking-wider group ${
                  activePath === "/blog" ? "border border-[#8B7355]" : ""
                }`}
              >
                <span className="relative z-10 transition-colors jost-font duration-300 group-hover:text-white">
                  BLOG
                </span>
                <div className="absolute inset-0 bg-[#8B7355] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
              <Link
                to="/contact"
                className={`relative overflow-hidden px-4 py-1 text-[13px] tracking-wider group ${
                  activePath === "/contact" ? "border border-[#8B7355]" : ""
                }`}
              >
                <span className="relative z-10 transition-colors jost-font duration-300 group-hover:text-white">
                  CONTACT
                </span>
                <div className="absolute inset-0 bg-[#8B7355] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            </div>
          </div>

          {/* Cart Button */}
          <div className="relative flex items-center ml-10">
            <Link
              to="/cart"
              className="relative flex items-center justify-center"
              aria-label="View Cart"
            >
              <ShoppingCart
                className="hover:text-gray-300 transition-colors"
                size={24}
              />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
