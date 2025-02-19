import React from "react";
import coverImage from "../assets/bake2.jpg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Add the useNavigate import
const SplitSection = () => {
  const navigate = useNavigate();

  const handleReadmore = () => {
    navigate("/aboutus"); // Redirect to the cake page
  };
  return (
    <div className="bg-[#171718] text-white py-12 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
          {/* Left Section - FLAVOUR */}
          <div className="text-center px-4 sm:px-6 group hover:transform hover:scale-105 transition-transform duration-500">
            <div className="mb-4 transform hover:-translate-y-1 transition-transform duration-300">
              <span className="text-xs tracking-[0.3em] cormorant-garamond-medium  text-[#8B7355] inline-block animate-shimmer bg-gradient-to-r from-[#8B7355] via-[#9B8365] to-[#8B7355] bg-[length:200%_100%] bg-clip-text text-transparent">
                SWEET
              </span>
            </div>
            <h2 className="cormorant-garamond-medium   text-2xl sm:text-3xl md:text-4xl mb-6 tracking-wider transform transition-all duration-500 hover:text-[#8B7355]">
              FLAVOUR
            </h2>
            <p className="text-white text-sm jost-font leading-8 mb-8 max-w-sm mx-auto opacity-90 hover:opacity-100 transition-opacity duration-300">
              It Is A Long Established Fact That A Reader Will Be Distracted By
              The Readable Content Of A Page When Looking At You. The Point Of
              Using Lorem Ipsum Is That It Has Making It Look Like Readable
              English Dummy.
            </p>
            <button
              onClick={handleReadmore}
              className="relative overflow-hidden border border-[#8B7355] px-6 py-2 sm:px-8 sm:py-3 text-xs sm:text-sm tracking-widest group"
            >
              <span className="relative z-10 transition-colors jost-font  duration-300 group-hover:text-white">
                READ MORE
              </span>
              <div className="absolute inset-0 bg-[#8B7355] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>

          {/* Center Image */}
          <div className="relative px-4 sm:px-6 group">
            <div className="relative overflow-hidden  transform hover:scale-105 transition-all duration-500 cursor-pointer">
              <img
                src={coverImage}
                alt="Chocolate dripping on cookies"
                lazy="true"
                className="w-full max-w-full object-cover shadow-md transform transition-all duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171718] via-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Right Section - PROCESS */}
          <div className="text-center px-4 sm:px-6 group hover:transform hover:scale-105 transition-transform duration-500">
            <div className="mb-4 transform hover:-translate-y-1 transition-transform duration-300">
              <span className="text-xs cormorant-garamond-medium  tracking-[0.3em] text-[#8B7355] inline-block animate-shimmer bg-gradient-to-r from-[#8B7355] via-[#9B8365] to-[#8B7355] bg-[length:200%_100%] bg-clip-text text-transparent">
                SWEET
              </span>
            </div>
            <h2 className=" text-2xl cormorant-garamond-medium   sm:text-3xl md:text-4xl mb-6 tracking-wider transform transition-all duration-500 hover:text-[#8B7355]">
              PROCESS
            </h2>
            <p className="text-white text-sm jost-font leading-8 mb-8 max-w-sm mx-auto opacity-90 hover:opacity-100 transition-opacity duration-300">
              It Is A Long Established Fact That A Reader Will Be Distracted By
              The Readable Content Of A Page When Looking At You. The Point Of
              Using Lorem Ipsum Is That It Has Making It Look Like Readable
              English Dummy.
            </p>
            <button
              onClick={handleReadmore}
              className="relative overflow-hidden border border-[#8B7355] px-6 py-2 sm:px-8 sm:py-3 text-xs sm:text-sm tracking-widest group"
            >
              <span className="relative z-10 transition-colors jost-font duration-300 group-hover:text-white">
                READ MORE
              </span>
              <div className="absolute inset-0 bg-[#8B7355] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitSection;
