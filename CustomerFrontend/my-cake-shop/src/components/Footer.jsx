import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#171718] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <p className="text-lg font-semibold mb-6">Royal Bakery</p>

            <p className="text-gray-400 mb-6  mt-7 leading-relaxed jost-font ">
              Crafting moments of joy through our delicious artisanal baked
              goods since 1995. Every creation is made with love and the finest
              ingredients.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-lg font-semibold mb-6">Quick Links</p>
            <ul className="space-y-4">
              {["AboutUs", "Shop", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase()}`} // Adjusting the link dynamically
                    className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <p className="text-lg font-semibold  mb-6">Opening Hours</p>
            <ul className="space-y-4 jost-font  text-gray-400">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>7:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>8:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-lg font-semibold mb-6">Contact Us</p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin size={20} />
                <span>123 Chava Street, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={20} />
                <span>(+1) 718-999-0779</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={20} />
                <span>info@royalbakery.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Clock size={20} />
                <span>Open 7 Days a Week</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row  justify-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} Royal Bakery. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
