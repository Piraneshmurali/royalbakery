import React from "react";
import coverImage from '../assets/cake4.jpg';
import left from '../assets/left3.jpg';
import right from '../assets/right2.jpg';

const BakeryWebsite = () => {
  return (
    <div className="bg-[#171718] text-center min-h-screen flex flex-col items-center justify-center p-4 md:p-8 lg:p-12">
      {/* Header Text */}
      <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8 cormorant-garamond-medium">
      SWEETNESS THAT  <br /> MELTS YOUR HEART
      </h1>

      {/* Main Image Container */}
      <div className="w-full max-w-7xl mx-auto mb-8">
        <div className="relative pt-[46%]">
          <img
            src={coverImage}
            alt="Bakery"
            lazy="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-8 mt-10 cormorant-garamond-medium">
        FRESHLY BAKED <br /> JUST FOR YOU
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-white mb-6 text-sm md:text-base jost-font ">
          Discover the authentic flavors of Jaffna Chavachery, 
          where tradition meets taste in every bite. Nestled in the heart of Jaffna, our recipes are crafted with love, inspired by the rich culinary heritage of the region.
          </p>
          <p className="text-white text-sm md:text-base jost-font">
          Whether you're craving a hearty meal, a delicious snack, or something sweet to delight your senses, we promise an experience that's nothing short of heavenly.
          </p>
        </div>
      </div>

      {/* Image Grid Section */}
      <div className="w-full max-w-7xl mx-auto mt-20 md:mt-40 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-24">
          {/* Left Image */}
          <div className="w-full">
            <div className="relative pt-[83%]">
              <img
                src={left}
                alt="Macarons"
                lazy="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full md:pt-20">
            <div className="relative pt-[116%]">
              <img
                src={right}
                alt="Cupcakes"
                lazy="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BakeryWebsite;