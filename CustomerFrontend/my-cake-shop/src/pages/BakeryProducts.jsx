import React, { useState } from "react";
import { Star, ShoppingCart, ArrowRight, MessageCircle } from "lucide-react";

const BakeryProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All Items");

  const categories = ["All Items", "Bread", "Cake", "Danish", "Viennoiserie"];

  const products = [
    {
      id: 1,
      name: "Chocolate Cupcake",
      price: 38.0,
      rating: 5,
      image: "/api/placeholder/300/300",
      category: "Cake",
    },
    {
      id: 2,
      name: "Chocolate Cake",
      price: 97.0,
      rating: 4,
      image: "/api/placeholder/300/300",
      category: "Cake",
    },
    {
      id: 3,
      name: "Choco Doughnuts",
      price: 96.0,
      rating: 3,
      image: "/api/placeholder/300/300",
      category: "Danish",
    },
    {
      id: 4,
      name: "Danish Pastry",
      price: 95.0,
      rating: 4,
      image: "/api/placeholder/300/300",
      category: "Danish",
    },
  ];

  const filteredProducts =
    activeCategory === "All Items"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16">
          <p className="text-[#D4AF37] uppercase tracking-wider">
            Our Fresh bakery Product is here
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">
            Our Special <span className="text-[#D4AF37]">Product</span> For You
          </h2>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-6 py-2 transition-all duration-300 ${
                  activeCategory === category
                    ? "text-[#D4AF37]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {category}
                {activeCategory === category && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#D4AF37]"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>

                {/* Quick Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                  <button className="w-full bg-[#D4AF37] text-black py-2 rounded-full flex items-center justify-center gap-2 hover:bg-[#C4A137] transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <h3 className="text-xl font-medium mb-2">{product.name}</h3>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[#D4AF37] text-lg font-semibold">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < product.rating
                          ? "text-[#D4AF37] fill-[#D4AF37]"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Chat Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-[#D4AF37] text-black p-4 rounded-full shadow-lg hover:bg-[#C4A137] transition-colors">
          <MessageCircle className="w-6 h-6" />
        </button>
        <div className="absolute bottom-full right-0 mb-4 bg-white text-black p-4 rounded-lg shadow-lg w-64 transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all">
          <p className="font-medium">Say "Hello!" and Get Your DISCOUNT</p>
          <button className="mt-2 w-full bg-[#D4AF37] text-black py-2 rounded-full flex items-center justify-center gap-2">
            START CHAT
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BakeryProducts;
