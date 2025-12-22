import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUs = () => {
  const primaryColor = "#ff4c8a";

  return (
    <>
      <Header />

      <div className="bg-white text-gray-700">

        {/* ===== Top Showcase Section ===== */}
        <div className="bg-pink-50 py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <img
              src="/public/aboutus.png"
              alt="Cake Showcase"
              className="mx-auto rounded-2xl shadow-lg mb-10"
            />

            <h2
              className="text-[22px] font-semibold tracking-wide mb-4"
              style={{ color: primaryColor }}
            >
              About Us
            </h2>

            <p className="max-w-3xl mx-auto text-[14px] leading-7 text-gray-500">
              Cake & Crumble is a modern bakery crafting high-quality cakes,
              cookies, and pastries. We blend rich flavors with elegant designs
              to create desserts that are both beautiful and delicious.
              Whether you shop online or visit us in person, we’re here to make
              every moment sweeter.
            </p>
          </div>
        </div>

        {/* ===== Mission & Promises ===== */}
        <div className="max-w-6xl mx-auto px-4 py-20 space-y-20">

          {/* Our Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3
                className="text-[18px] font-semibold tracking-wide mb-3"
                style={{ color: primaryColor }}
              >
                Our Mission
              </h3>
              <p className="text-[14px] leading-7 text-gray-500">
                Our mission is to provide premium, freshly baked cakes,
                cookies, and pastries that delight every customer. We are
                committed to reliable service, beautiful designs, and
                unforgettable flavors. Every creation is made to bring joy,
                celebration, and complete satisfaction.
              </p>
            </div>

            <img
              src="/public/about.png"
              alt="Our Mission"
              className="rounded-2xl shadow-md"
            />
          </div>

          {/* Our Promises */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img
              src="/public/us.png"
              alt="Our Promises"
              className="rounded-2xl shadow-md"
            />

            <div>
              <h3
                className="text-[18px] font-semibold tracking-wide mb-3"
                style={{ color: primaryColor }}
              >
                Our Promises
              </h3>
              <p className="text-[14px] leading-7 text-gray-500">
                We promise to deliver fresh, premium desserts crafted with
                care and creativity. From timely service to perfect presentation,
                every order is handled with attention and love. Your celebrations
                deserve nothing less than excellence.
              </p>
            </div>
          </div>
        </div>

        {/* ===== Call To Action ===== */}
        <div className="relative mt-10">
          <img
            src="/public/Frame.png"
            alt="Gift Boxes"
            className="w-full h-72 object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-[22px] font-semibold tracking-wide text-white mb-6">
                Want to Know more about Us?
              </h2>

              <button
                className="px-8 py-3 rounded-full text-white text-[14px] font-medium hover:opacity-90 transition"
                style={{ backgroundColor: primaryColor }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
