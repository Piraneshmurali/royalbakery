import React, { useState, useEffect } from 'react';
import { ChevronRight, ShoppingBag, Clock, MapPin, Phone } from 'lucide-react';

const BakeryLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm py-4' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-serif text-[#D4AF37]">Artisan Bakery</h1>
          <div className="flex items-center gap-8">
            <button className="hover:text-[#D4AF37] transition-colors">Menu</button>
            <button className="hover:text-[#D4AF37] transition-colors">About</button>
            <button className="hover:text-[#D4AF37] transition-colors">Contact</button>
            <button className="bg-[#D4AF37] text-black px-6 py-2 rounded-full hover:bg-[#C4A137] transition-all flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Order Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 relative pt-20">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-12 bg-[#D4AF37]"></div>
                <span className="text-[#D4AF37] uppercase tracking-widest text-sm">Welcome to Our Bakery</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-serif leading-tight">
                Good things <span className="text-[#D4AF37]">come to</span> those who <span className="text-[#D4AF37]">bake</span>
              </h2>
            </div>

            <p className="text-gray-300 text-lg max-w-xl">
              Moreover, bakeries serve as gathering spaces, where people connect over a shared love of baked goods. 
              From casual coffee shops to upscale patisseries, we foster a sense of community through the art of baking.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="group bg-[#D4AF37] text-black px-8 py-4 rounded-full hover:bg-[#C4A137] transition-all flex items-center gap-2">
                Order Now
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all">
                Our Menu
              </button>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-[#D4AF37]" />
                <div>
                  <p className="font-medium">Open Daily</p>
                  <p className="text-sm text-gray-400">7AM - 8PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-[#D4AF37]" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-gray-400">123 Baker St</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-8 h-8 text-[#D4AF37]" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-sm text-gray-400">555-0123</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Featured Products */}
          <div className="relative hidden lg:block">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl"></div>
            <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-[#D4AF37] font-serif text-2xl mb-6">Today's Specials</h3>
              <div className="space-y-6">
                {[
                  { name: 'Sourdough Bread', price: '$6.99', description: 'Traditional fermented bread' },
                  { name: 'Chocolate Croissant', price: '$4.99', description: 'Buttery layers with dark chocolate' },
                  { name: 'Artisan Baguette', price: '$3.99', description: 'Crusty French classic' },
                  { name: 'Cinnamon Roll', price: '$4.49', description: 'Fresh baked with cream cheese frosting' }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-start pb-4 border-b border-white/10 group cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-all">
                    <div>
                      <h4 className="text-white font-medium group-hover:text-[#D4AF37] transition-colors">{item.name}</h4>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                    <span className="text-[#D4AF37] font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BakeryLanding;