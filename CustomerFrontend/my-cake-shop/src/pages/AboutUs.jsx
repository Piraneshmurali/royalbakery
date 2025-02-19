import React from "react";
import coverImage from "../assets/bakery.jpg";
import a1 from "../assets/about1.jpg";
import a2 from "../assets/ab-inner-02.jpg";
import Navbar from "../components/Navbar";
import AboutUsHome from "../pages/AboutUsHome";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <div>
      {/* Meta Tags for SEO */}
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Learn more about Royal Bakery Jaffna, our commitment to creating delicious and custom-designed cakes with the finest ingredients."
        />
        <meta
          name="keywords"
          content="Royal Bakery Jaffna, custom cakes, cake making, bakery in Jaffna, custom designs, delicious cakes"
        />
        <meta name="author" content="Royal Bakery Jaffna" />
        <meta property="og:title" content="About Us | Royal Bakery Jaffna" />
        <meta
          property="og:description"
          content="Discover the art of cake making at Royal Bakery Jaffna. Our expert team creates beautiful, handcrafted cakes for all occasions."
        />
        <meta property="og:image" content={coverImage} />
        <meta
          property="og:url"
          content="https://royalbakeryjaffna.com/aboutus"
        />
        <meta property="og:type" content="website" />
        <title>About Us | Royal Bakery Jaffna</title>
      </Helmet>

      {/* Navbar */}
      <Navbar />

      <div className="w-full h-full bg-[#171718]">
        {/* Hero Section */}
        <div className="relative h-96 sm:mt-30 md:mt-40 w-full">
          <div className="absolute inset-0">
            <img
              src={coverImage}
              alt="Chocolate cake with almonds"
              lazy="true"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="relative h-full flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl md:text-6xl cormorant-garamond-medium uppercase text-center max-w-2xl mb-6">
              About Us
            </h1>
          </div>
        </div>

        {/* Alternating Sections */}
        <div className="container mx-auto px-4 py-16">
          {/* First Section */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
            <div className="w-full md:w-1/2 md:pl-20">
              <img
                src={a1}
                alt="Artisan cake making"
                lazy="true"
                style={{ width: "635px", height: "400px" }}
                className="w-full h-auto md:h-96 object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-5xl  mb-4 text-white cormorant-garamond-light uppercase">
                Our Craft
              </h3>
              <p className="text-white  text-justify md:pr-20">
                We specialize in creating beautiful, custom-designed cakes that
                are as delicious as they are stunning. Each cake is handcrafted
                with attention to detail and made with the finest ingredients to
                ensure both visual appeal and exceptional taste.
              </p>
              <p className="text-white  text-justify md:pr-20">
                We specialize in creating beautiful, custom-designed cakes that
                are as delicious as they are stunning. Each cake is handcrafted
                with attention to detail and made with the finest ingredients to
                ensure both visual appeal and exceptional taste.
              </p>
            </div>
          </div>

          {/* Second Section */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2">
              <img
                src={a2}
                alt="Custom cake designs"
                lazy="true"
                style={{ width: "635px", height: "400px" }}
                className="w-full h-auto md:h-96 object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-5xl  mb-4 md:pl-20 text-white cormorant-garamond-light uppercase">
                Custom Designs
              </h3>
              <p className="text-white  md:pl-20 text-justify">
                Whether you're celebrating a wedding, birthday, or special
                occasion, our team works closely with you to bring your vision
                to life. We combine traditional techniques with modern design
                elements to create unique cakes that reflect your personal
                style.
              </p>
              <p className="text-white text-justify md:pl-20">
                We specialize in creating beautiful, custom-designed cakes that
                are as delicious as they are stunning. Each cake is handcrafted
                with attention to detail and made with the finest ingredients to
                ensure both visual appeal and exceptional taste.
              </p>
            </div>
          </div>
        </div>

        {/* About Us Home Section */}
        <AboutUsHome />
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
