import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Loader2,
  ArrowRight,
  ShoppingBag,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import axios from "axios";
import { Input, Select, notification, Drawer, Radio } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { Helmet } from "react-helmet-async";

const { Option } = Select;

const Shop = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const itemsPerPage = 8;
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

  // Filter and sort cakes
  const filteredCakes = cakes
    .filter((cake) => {
      const matchesSearch =
        cake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cake.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under25" && cake.price < 25) ||
        (priceRange === "25to50" && cake.price >= 25 && cake.price <= 50) ||
        (priceRange === "over50" && cake.price > 50);
      return matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const paginatedCakes = filteredCakes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCakes.length / itemsPerPage);

  const handleAddToCart = (cake) => {
    console.log("Adding to cart:", cake);

    addToCart({
      _id: cake._id,
      name: cake.name,
      price: cake.price,
      photo: cake.photo,
      quantity: 1,
    });

    notification.success({
      message: "Added to Cart",
      description: `${cake.name} added to cart!`,
      placement: "topRight",
      className: "bg-[#8B7355] text-white",
      duration: 2,
    });
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <section className="bg-[#171718] py-24 min-h-screen mt-40">
      <Helmet>
        <title>Shop - Exquisite Cakes</title>
        <meta
          name="description"
          content="Explore a variety of exquisite cakes at our shop."
        />
        <meta name="keywords" content="cakes, shop, sweet treats, bakery" />
        <meta property="og:title" content="Shop - Exquisite Cakes" />
        <meta
          property="og:description"
          content="Explore a variety of exquisite cakes at our shop."
        />
        <meta property="og:image" content="URL-to-your-image" />
      </Helmet>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6">
        {/* Elegant Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-sm tracking-[0.3em] uppercase text-[#8B7355] mb-4 px-4 py-2 border border-[#8B7355]/20">
            Our Collection
          </span>
          <h2 className="text-4xl sm:text-5xl cormorant-garamond-semibold tracking-wider uppercase text-white mt-6 mb-4">
            Exquisite Cakes
          </h2>
          <div className="w-24 h-px bg-[#8B7355] mx-auto"></div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Input
              placeholder=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<Search className="text-white w-4 h-4" />}
              className="bg-[#1C1C1D] border-[#8B7355]/20 rounded-md py-2 px-4"
              style={{
                backgroundColor: "#1C1C1D",
                borderColor: "rgba(139, 115, 85, 0.2)",
                color: "white", // Change text color
              }}
            />
          </div>

          <div className="flex  gap-4 items-center">
            <Select
              defaultValue="name"
              onChange={setSortBy}
              className="w-40 "
              style={{
                backgroundColor: "#1C1C1D",
                color: "white",
              }}
              dropdownStyle={{
                backgroundColor: "#1C1C1D",
                borderColor: "rgba(139, 115, 85, 0.2)",
              }}
            >
              <Option value="name">Sort by Name</Option>
              <Option value="price-asc">Price: Low to High</Option>
              <Option value="price-desc">Price: High to Low</Option>
            </Select>

            <button
              onClick={() => setFilterDrawerVisible(true)}
              className="bg-[#1C1C1D] border border-[#8B7355]/20 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#2C2C2D] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* <button
              onClick={handleGoToCart}
              className="bg-[#8B7355] hover:bg-[#9B8365] text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Cart
            </button> */}
          </div>
        </div>

        {/* Filter Drawer */}
        <Drawer
          title="Filter Cakes"
          placement="right"
          onClose={() => setFilterDrawerVisible(false)}
          open={filterDrawerVisible}
          className="bg-[#1C1C1D]"
          styles={{
            header: {
              background: "#1C1C1D",
              color: "white",
              borderBottom: "1px solid rgba(139, 115, 85, 0.2)",
            },
            body: {
              background: "#1C1C1D",
              color: "white",
            },
          }}
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-white mb-4">Price Range</h4>
              <Radio.Group
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="space-y-2 text-white"
              >
                <Radio value="all" className="text-white block">
                  All Prices
                </Radio>
                <Radio value="under25" className="text-white block">
                  Under 25
                </Radio>
                <Radio value="25to50" className="text-white block">
                  25 - 50
                </Radio>
                <Radio value="over50" className="text-white block">
                  Over 50
                </Radio>
              </Radio.Group>
            </div>
          </div>
        </Drawer>

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
              {paginatedCakes.map((cake) => (
                <div
                  key={cake._id}
                  className="group relative bg-[#1C1C1D] p-4 rounded-lg transform transition-all duration-300 hover:shadow-xl"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-lg">
                    <img
                      src={cake.photo}
                      alt={cake.name}
                      lazy="true"
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                    {/* Price Tag */}
                    <div className="absolute top-4 right-4 bg-[#171718]/80 backdrop-blur-sm px-4 py-2 rounded-md">
                      <span className="text-[#8B7355] ">{cake.price} LKR</span>
                    </div>

                    {/* Add to Cart Button */}
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
                    <h3 className=" text-xl mb-3 cormorant-garamond-medium text-white group-hover:text-[#8B7355] transition-colors duration-300">
                      {cake.name}
                    </h3>
                    <p className="text-sm  text-gray-400 line-clamp-2 mb-6">
                      {cake.description}
                    </p>
                    <div className="w-12 h-px bg-[#8B7355]/30 mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="bg-[#1C1C1D] border border-[#8B7355]/20 text-white px-4 py-2 rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === page
                          ? "bg-[#8B7355] text-white"
                          : "bg-[#1C1C1D] border border-[#8B7355]/20 text-white"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="bg-[#1C1C1D] border border-[#8B7355]/20 text-white px-4 py-2 rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default Shop;
