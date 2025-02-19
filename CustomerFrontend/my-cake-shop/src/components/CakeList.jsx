import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Loader2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

const CakeList = () => {
  const [cakes, setCakes] = useState([]);
  const [visibleCakes, setVisibleCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/customer/cakes"
        );
        setCakes(response.data);
        setVisibleCakes(response.data.slice(0, 4)); // Display only the first 4 cakes initially
        setError(null);
      } catch (error) {
        console.error("Error fetching cakes:", error);
        setError("Failed to fetch cakes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCakes();
  }, []);

  const handleAddToCart = (cake) => {
    console.log("Adding to cart:", cake);

    addToCart({
      _id: cake._id,
      name: cake.name,
      price: cake.price,
      photo: cake.photo,
      quantity: 1,
    });

    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg transform transition-transform duration-500 ease-out";
    notification.textContent = `${cake.name} added to cart!`;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = "translateX(120%)";
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 2000);
  };

  const handleShowMore = () => {
    navigate("/shop"); // Redirect to the cake page
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <section className="bg-[#171718] py-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Elegant Header */}
        <div className="text-center mb-20">
          <span className="inline-block cormorant-garamond-semibold text-sm tracking-[0.3em] uppercase text-[#8B7355] mb-4 px-4 py-2 border border-[#8B7355]/20">
            Our Collection
          </span>
          <h2 className="text-4xl cormorant-garamond-semibold uppercase sm:text-5xl  tracking-wider text-white mt-6 mb-4">
            Exquisite Cakes
          </h2>
          <div className="w-24 h-px bg-[#8B7355] mx-auto"></div>
        </div>

        {/* Cart Button
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleGoToCart}
            className="bg-[#8B7355] hover:bg-[#9B8365] text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingBag className="w-6 h-6" />
          </button>
        </div> */}

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-8 h-8 text-[#8B7355] animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-gray-400 py-10">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleCakes.map((cake) => (
                <div
                  key={cake._id}
                  className="group relative bg-[#1C1C1D] p-4 rounded-lg transform transition-all duration-300 hover:shadow-xl"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-lg cormorant-garamond-semibold">
                    <img
                      src={cake.photo}
                      alt={cake.name}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                    <div className="absolute top-4 right-4 bg-[#171718]/80 backdrop-blur-sm px-4 py-2 rounded-md">
                      <span className="text-[#8B7355] ">
                        {cake.price} LKR{" "}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(cake)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span className="bg-[#8B7355] text-white px-6 py-3 rounded-md flex items-center space-x-3 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#9B8365]">
                        <ShoppingCart className="w-4 h-4" />
                        <span className="text-sm uppercase tracking-wider">
                          Add to Cart
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </button>
                  </div>

                  {/* Details */}
                  <div className="text-center px-2">
                    <h3 className=" text-xl cormorant-garamond-semibold mb-3 text-white group-hover:text-[#8B7355] transition-colors duration-300">
                      {cake.name}
                    </h3>
                    <p className="text-sm cormorant-garamond-semibold  text-gray-400 line-clamp-2 mb-6">
                      {cake.description}
                    </p>
                    <div className="w-12 h-px bg-[#8B7355]/30 mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <button
                onClick={handleShowMore}
                className="relative overflow-hidden border border-[#8B7355] px-6 py-2 sm:px-8 sm:py-3 text-xs sm:text-sm tracking-widest group"
              >
                <span className="relative z-10 text-white uppercase jost-font transition-colors duration-300 group-hover:text-white">
                  Show More Cakes
                </span>
                <div className="absolute inset-0 bg-[#8B7355] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CakeList;
