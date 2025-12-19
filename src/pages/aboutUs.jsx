// src/pages/AboutUs.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUs = () => {
  // --- Styling and Constants ---
  // Using the pink color prominent in your designs
  const primaryColor = "#ff4c8a"; 

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        
        {/* Top Banner Section: Image and Short Description */}
        <div className="relative pt-16 pb-16">
          <img
            src="/path/to/your/top_strawberry_cake_image.jpg" // Placeholder for the large image at the top             alt="Cake & Crumble Showcase"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-white/70 flex justify-center items-center">
            <div className="bg-white p-10 rounded-xl shadow-2xl max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold mb-4" style={{ color: primaryColor }}>
                About Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Cake & Crumble is a modern bakery creating high-quality cakes, cookies, and pastries. We blend rich flavors with elegant designs to make every treat unique. Whether you’re stopping by or ordering from us in person, we’re here to deliver fresh, beautiful, and delicious treats that make every moment sweeter.
              </p>
            </div>
          </div>
        </div>
        
        {/* Mission and Promises Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Our Mission */}
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold" style={{ color: primaryColor }}>
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to provide premium, freshly baked cakes, cookies, and pastries that delight every customer. We are committed to offering more than merely dessert; beautifully crafted designs and unforgettable flavors. With every cake, we aim to create sweet experiences that bring joy, celebration, and complete satisfaction.
              </p>
              {/* Image related to Mission (Left side) */}
              <img
                src="/path/to/your/mission_image_blueberries.jpg" // Placeholder for the image with blueberries
                alt="Our Mission - Quality Baked Goods"
                className="w-full h-72 object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Our Promises */}
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold" style={{ color: primaryColor }}>
                Our Promises
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We promise to deliver fresh, premium cakes, cookies, and pastries crafted with beautiful designs, reliable service, and a complete lot of love. Your satisfaction comes first, and we're committed to making every order special, every bite delicious, and every celebration sweeter.
              </p>
              {/* Image related to Promises (Right side) */}
              <img
                src="/path/to/your/promises_image_counter.jpg" // Placeholder for the counter image
                alt="Our Promises - Customer Service"
                className="w-full h-72 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Call to Action Footer */}
        <div className="relative bg-gray-700 py-16 mt-10">
          <img
            src="/path/to/your/bottom_chocolate_image.jpg" // Placeholder for the bottom image
            alt="Chocolate Treats"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Want to Know more about Us?
            </h2>
            <button 
              className="px-8 py-3 font-semibold rounded-full text-white transition hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
              onClick={() => console.log("Contact Us clicked")}
            >
              Contact Us
            </button>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default AboutUs;