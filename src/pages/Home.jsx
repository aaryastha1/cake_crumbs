// Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth"; // For auth info

// --- Design Constants ---
const primaryPink = "#ff4c8a"; // Button pink
const secondaryPink = "#b23a7e"; // Heading pink

// Soft background for the main page area (Hero section area)
const mainContentStyle = {
  background: "linear-gradient(180deg, #FDF7F8 0%, #FFECD2 100%)",
};

// Background color for the Best Sellers section
const bestSellersBgColor = "#F7E7EB";

// Hero title style (fancy cursive)
const specialTitleStyle = {
  color: secondaryPink,
  fontWeight: "700",
  fontStyle: "normal",
  fontSize: "3rem",
  lineHeight: "1.1",
  fontFamily: "'Great Vibes', cursive",
  letterSpacing: "1px",
};

// Hero paragraph style (soft cursive)
const heroParagraphStyle = {
  color: "#555",
  fontSize: "1rem",
  fontFamily: "'Dancing Script', cursive",
};

const bestSellerCardStyle = {
  backgroundColor: "#fff",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
  borderRadius: "1rem",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
};

export default function Home() {
  const { user } = useAuth(); // Get logged-in user info
  const navigate = useNavigate(); // Initialize navigation
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0); // For hero carousel

  useEffect(() => {
    fetch("http://localhost:5006/api/home")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setHomeData(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Automatic hero carousel
  useEffect(() => {
    if (!homeData) return;

    const heroImages = homeData.hero?.images?.length
      ? homeData.hero.images
      : [homeData.hero?.image];

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [homeData]);

  if (loading)
    return <p className="text-center py-20 text-gray-500">Loading...</p>;
  if (!homeData)
    return <p className="text-center py-20 text-red-500">Failed to load data</p>;

  const { hero, bestSellers, customSection } = homeData;
  const heroImages = hero?.images?.length > 0 ? hero.images : [hero?.image];

  const handleSlideClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Pass user to Header so it can show profile icon */}
      <Header user={user} />

      <main className="flex-grow relative" style={mainContentStyle}>
        {/* HERO SECTION */}
        <section className="pt-16 pb-28 relative">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
            {/* IMAGE COLUMN */}
            <div className="md:w-1/2 md:pr-10 mb-10 md:mb-0 relative">
              <img
                src={`http://localhost:5006${heroImages[currentSlide]}`}
                alt={`Hero Cake ${currentSlide + 1}`}
                className="rounded-2xl shadow-xl w-full max-w-lg mx-auto object-cover h-[400px] md:h-[450px]"
              />

              {/* Carousel indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlideClick(index)}
                    className={`w-2.5 h-2.5 rounded-full ${
                      currentSlide === index
                        ? "bg-pink-500"
                        : "bg-gray-300 hover:bg-pink-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* TEXT COLUMN */}
            <div className="md:w-1/2 text-center md:text-left md:pl-10">
              <h1 style={specialTitleStyle} className="mb-4">
                Deliver You A Blissful Dessert in Every Bite
              </h1>
              <p style={heroParagraphStyle} className="mb-6">
                Each cake is handcrafted with rich flavors and a soft, traditional sponge.
                Perfect for birthdays, get-togethers, or simply moments delivered fresh across Kathmandu.
              </p>
              <button
                className="text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-[1.03]"
                style={{ background: primaryPink }}
              >
                Order Now
              </button>
            </div>
          </div>

          {/* CLOUDY BOTTOM DECORATION */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none">
            <svg
              className="relative block w-full h-24 md:h-32"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 80"
              preserveAspectRatio="none"
            >
              <path
                d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
                fill={bestSellersBgColor}
              />
            </svg>
          </div>
        </section>

        {/* BEST SELLERS SECTION */}
        <section
          className="relative pt-16 pb-24 text-center"
          style={{ backgroundColor: bestSellersBgColor }}
        >
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-12">
              Check Out Our{" "}
              <span style={{ color: secondaryPink }}>Best Sellers</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {bestSellers.slice(0, 4).map((item, index) => (
                <div
                  key={index}
                  className="group cursor-pointer p-3"
                  style={bestSellerCardStyle}
                >
                  <div className="w-full aspect-square overflow-hidden rounded-xl mb-3 bg-white flex items-center justify-center">
                    <img
                      src={`http://localhost:5006${item.imageUrl}`}
                      alt={item.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p
                    className="text-base font-semibold mt-2"
                    style={{ color: secondaryPink }}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
            </div>

            <button
              className="mt-12 text-sm font-semibold px-6 py-2 rounded-full transition-colors"
              style={{
                backgroundColor: "#FFFFFF",
                border: `1px solid ${primaryPink}`,
                color: primaryPink,
              }}
            >
              See More
            </button>
          </div>
        </section>

        {/* CUSTOM ORDER SECTION - Professional Studio Look */}
        <section className="py-24 relative overflow-hidden" style={{ backgroundColor: "#FDF7F8" }}>
          {/* Soft background light effect */}
          <div className="absolute top-0 right-0 w-[50%] h-full bg-[#F7E7EB] rounded-l-[100px] -z-0"></div>

          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between relative z-10">
            
            {/* LEFT COLUMN: ELEGANT TEXT */}
            <div className="lg:w-[45%] mb-16 lg:mb-0 text-left">
              <h2
                className="mb-6"
                style={{
                  color: secondaryPink,
                  fontFamily: "'Great Vibes', cursive",
                  fontWeight: "500", // Adjusted to match your "bigger/bold" request
                  fontSize: "4rem", // Adjusted to match your "bigger/bold" request
                  lineHeight: "1.0",
                }}
              >
                Special Orders
              </h2>

              <p
                className="mb-10 leading-relaxed max-w-lg" // Adjusted to match your "bigger/bold" request
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  color: "#333", // Darker for better visibility
                  fontSize: "1.75rem", // Bigger
                  fontWeight: "400", // Bold
                }}
              >
                Your celebration deserves a centerpiece as unique as your story. 
                Each cake is a handcrafted masterpiece, designed in our 3D studio 
                with delicate pearls, silk ribbons, and artistic floral arrangements.
              </p>

              <button
                onClick={() => navigate("/customize-cake")} // Action: Navigate to customize-cake
                className="group bg-[#2D3E50] text-white font-bold py-4 px-12 rounded-xl shadow-2xl transition-all hover:bg-pink-500 hover:scale-105 active:scale-95 flex items-center gap-4"
              >
                <span className="uppercase tracking-widest text-[11px]">Start Designing</span>
                <div className="w-6 h-[1px] bg-white/50 group-hover:w-10 transition-all"></div>
              </button>
            </div>

            {/* RIGHT COLUMN: THE STUDIO PHOTO WITH DEEP CURVES */}
            <div className="lg:w-[50%] flex justify-center lg:justify-end">
              <div className="relative group">
                
                {/* Image container */}
                <div className="relative z-10 p-4 bg-white rounded-[60px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] transition-transform duration-1000 ease-out group-hover:scale-[1.02]">
                  <img
                    src={`http://localhost:5006${customSection.image}`}
                    alt="Custom 3D Cake Design"
                    className="w-full max-w-lg rounded-[50px] object-cover aspect-[4/5]"
                    style={{ 
                        border: "1px solid rgba(0,0,0,0.05)"
                    }}
                  />
                  
                  {/* Subtle "Studio Information" Overlay */}
                  <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <div className="bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/30 text-[#2D3E50]">
                        <p className="text-[8px] uppercase font-black tracking-widest opacity-70">Texture</p>
                        <p className="text-xs font-bold">Silk Buttercream</p>
                     </div>
                     <div className="bg-white p-3 rounded-2xl shadow-lg">
                        <p className="text-[10px] font-black text-pink-500 uppercase">360° View</p>
                     </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200/20 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/50 blur-3xl rounded-full"></div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}