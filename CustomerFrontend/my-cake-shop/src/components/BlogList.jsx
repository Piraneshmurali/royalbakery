// src/components/BlogList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowRight, CalendarDays } from "lucide-react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import heroImage from '../assets/dish.jpg';  // Adjust the path accordingly
import { Helmet } from 'react-helmet-async';
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();




 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/blogs");
        const data = await response.json();
        setBlogs(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen mt-40 bg-[#171718]">
       <Helmet>
        <title>Royal Bakery Blog | Fresh Updates, Recipes, and More</title>
        <meta name="description" content="Explore the Royal Bakery blog for delicious recipes, baking tips, the latest news, and updates from our bakery." />
        <meta name="keywords" content="Royal Bakery blog, bakery recipes, baking tips, fresh bread, cake recipes, Royal Bakery updates, pastries, food blog" />
        <meta property="og:title" content="Royal Bakery Blog | Fresh Updates, Recipes, and More" />
        <meta property="og:description" content="Discover the latest recipes, tips, and updates from Royal Bakery on our blog." />
        <meta property="og:url" content="https://www.royalbakery.com/blog" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Royal Bakery Blog | Fresh Updates, Recipes, and More" />
        <meta name="twitter:description" content="Stay updated with delicious recipes, baking tips, and bakery news at Royal Bakery." />
      </Helmet>

      <Navbar/>
      
      {/* Hero Section */}
      <div className="relative h-96 sm:mt-30 md:mt-40 w-full">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-6xl cormorant-garamond-medium uppercase text-center max-w-2xl mb-6">
            Our Blog
          </h1>
        </div>
      </div>

      {/* Header */}
      <div className="text-center py-20">
        <span className="inline-block text-sm tracking-[0.3em] uppercase cormorant-garamond-regular  text-[#8B7355] mb-4 px-4 py-2 border border-[#8B7355]/20">
          Our Stories
        </span>
        <h1 className="cormorant-garamond-semibold uppercase text-4xl sm:text-5xl  tracking-wider text-white mt-6 mb-4">
          Latest Blog Posts
        </h1>
        <div className="w-24 h-px bg-[#8B7355] mx-auto"></div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 pb-24">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-[#8B7355] animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-10">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="group bg-[#1C1C1D] rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-[#8B7355] mb-4">
                    <span className="flex items-center">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>

                  <h2 className=" text-xl text-white mb-4 cormorant-garamond-semibold group-hover:text-[#8B7355] transition-colors duration-300">
                    {blog.title}
                  </h2>

                  <p className="text-gray-400 mb-6 line-clamp-3 cormorant-garamond-regular">
                    {blog.content}
                  </p>

                  <button
                    onClick={() => navigate(`/blog/${blog._id}`)}
                    className="flex items-center space-x-2 text-[#8B7355] cormorant-garamond-bold hover:text-[#9B8365] transition-colors duration-300"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer/>
    </div>
  );
};

export default BlogList;
