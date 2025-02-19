import React from 'react';
import coverImage from '../assets/cake4.jpg'; 
import p1 from '../assets/p1.jpg'; 
import p2 from '../assets/p2.jpg'; 
import p3 from '../assets/p3.jpg'; 
import p4 from '../assets/p4.jpg'; 
const RestaurantShowcase = () => {
  const teamMembers = [
    {
      name: "TONY SOLU",
      position: "Founders",
      image: p1
    },
    {
      name: "NICK YORKE",
      position: "Cook",
      image: p2
    },
    {
      name: "ELENA DISO",
      position: "Co. Founders",
      image: p3
    },
    {
      name: "DIETRO LAS",
      position: "C.E.O",
      image: p4
    }
  ];

  return (
    <div className="bg-[#171718]">
      {/* Quote Section */}
      <div className="relative w-full h-96 overflow-hidden">
        {/* Image container */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0">
            <img 
              src={coverImage}
              alt="Background with kitchen tools"
              lazy="true"

              className="w-full h-full object-cover opacity-80"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          {/* Quote content */}
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <span className="block text-white text-6xl  mb-4">"</span>
            <p className="text-white text-2xl md:text-3xl  italic mb-6  cormorant-garamond-medium">
            Our cakes are freshly made with the finest ingredients, perfect for any event. Whether it's a birthday or a simple treat, indulge in our mouthwatering cakes!
            </p>
            {/* <p className="text-white text-lg uppercase tracking-wider">
              — Royal Bakery
            </p> */}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className=" tracking-widest uppercase text-sm mb-4 text-[#8B7355] ">
            OUR TEAM
          </h2>
          <h1 className="text-white text-5xl   cormorant-garamond-medium">
            MASTER COOK
          </h1>
        </div>

        {/* Team Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group  cormorant-garamond-medium">
                {/* Image Container */}
                <div className="aspect-[3/4] mb-6 overflow-hidden ">
                  <img
                    src={member.image}
                    lazy="true"
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-white text-xl font-medium mb-2">
                    {member.name}
                  </h3>
                  <p className=" text-sm text-[#8B7355] ">
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantShowcase;