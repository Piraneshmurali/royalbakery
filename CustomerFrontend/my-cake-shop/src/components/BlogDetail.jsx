import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, CalendarDays, Clock } from "lucide-react";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        
        // Log the response status
        console.log('Response status:', response);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched blog data:', data); // Log the received data
        
        if (!data) {
          throw new Error('No data received');
        }
        
        setBlog(data);
        setError(null);
      } catch (error) {
        console.error("Detailed error:", error);
        setError(
          error.response?.data?.message || 
          error.message || 
          "Failed to fetch blog post. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#171718] flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-[#8B7355] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#171718] flex flex-col justify-center items-center">
        <div className="text-red-400 mb-4">{error}</div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-[#8B7355] hover:text-[#9B8365] transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Blog List</span>
        </button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#171718] flex flex-col justify-center items-center">
        <div className="text-white mb-4">Blog post not found</div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-[#8B7355] hover:text-[#9B8365] transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Blog List</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#171718]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-[#8B7355] hover:text-[#9B8365] mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blogs</span>
        </button>

        {/* Main Content */}
        <article className="bg-[#1C1C1D] rounded-xl overflow-hidden shadow-xl">
          {/* Hero Image */}
          <div className="aspect-[21/9] relative">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1D] opacity-50" />
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-center space-x-4 text-sm text-[#8B7355] mb-6">
              <span className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-2" />
                {formatDate(blog.createdAt)}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                5 min read
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl  text-white mb-6">
              {blog.title}
            </h1>

            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {blog.content}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;