import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ✅ IMPORT LOCAL IMAGES
import customCake from "../assets/custom.png";
import dreamCake from "../assets/dream.jpg";

const Services = () => {
  const primaryColor = "#e888a3"; 

  const serviceList = [
    {
      title: "Custom Cakes",
      description:
        "Personalized cakes designed for birthdays, weddings, and special occasions with premium ingredients and elegant designs.",
      image: customCake,
      icon: "🎂",
    },
    {
      title: "Fresh Pastries",
      description:
        "A daily selection of freshly baked pastries, cookies, and desserts crafted with care and rich flavors.",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop",
      icon: "🥐",
    },
    {
      title: "Event Orders",
      description:
        "Freshly baked cakes and desserts for weddings and special occasions, made to add sweetness and elegance to your most important moments.",
      image: dreamCake,
      icon: "🧁",
    },
  ];

  return (
    <>
      <Header />

      <div className="bg-[#fffcf9] text-gray-800 font-sans selection:bg-pink-100">

        {/* ===== Header Section - PADDING REDUCED TO MOVE UP ===== */}
        <div className="pt-12 pb-8 px-4"> 
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-pink-400 block mb-4">
              What We Offer
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-[#3d2b24] mb-6 tracking-tight">
              Our Services
            </h1>
            <p className="text-[15px] leading-relaxed text-gray-400 max-w-2xl mx-auto font-light">
              At Cake & Crumbs, we offer thoughtfully crafted bakery services
              designed to make every celebration special and memorable.
            </p>
          </div>
        </div>

        {/* ===== Services Cards - PADDING ADJUSTED ===== */}
        <div className="max-w-7xl mx-auto px-8 pb-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {serviceList.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-700 border border-gray-50/50"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />

                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md border border-pink-50">
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </span>
                </div>
              </div>

              <div className="p-10">
                <h3
                  className="text-2xl font-serif mb-4"
                  style={{ color: primaryColor }}
                >
                  {service.title}
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Call To Action ===== */}
        {/* <div className="relative w-full overflow-hidden min-h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=2000&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Bakery background"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-pink-900/10" />
          </div>

          <div className="relative z-10 py-24 px-4 text-center">
            <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/80 block mb-4">
              Let's Create Together
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 tracking-tight">
              Planning a Special Occasion?
            </h2>
            <p className="text-white/90 text-[16px] mb-12 max-w-xl mx-auto leading-relaxed font-light">
              From intimate gatherings to grand celebrations, we're here to make
              your event unforgettable with our custom creations.
            </p>
            <button
              className="px-12 py-5 rounded-full text-white text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl hover:bg-white hover:scale-105"
              style={{ 
                backgroundColor: primaryColor,
                "--hover-color": "#fff" 
              }}
              onMouseEnter={(e) => e.target.style.color = primaryColor}
              onMouseLeave={(e) => e.target.style.color = "#fff"}
            >
              Contact Us
            </button>
          </div>
        </div> */}

      </div>

      <Footer />
    </>
  );
};

export default Services;