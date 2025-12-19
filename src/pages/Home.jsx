// Home.jsx
import React, { useEffect, useState } from "react";
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

        {/* CUSTOM ORDER SECTION */}
        <section className="py-10" style={{ backgroundColor: bestSellersBgColor }}>
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-start justify-between">
            {/* TEXT */}
            <div className="md:w-1/2 mb-6 md:mb-0 text-left md:pr-16 md:ml-8mt-4">
              <h2
                className="mb-6"
                style={{
                  color: secondaryPink,
                  fontFamily: "'Great Vibes', cursive",
                  fontWeight: "700",
                  fontSize: "3rem",
                  lineHeight: "1.1",
                }}
              >
                Special Orders
              </h2>

              <p
                className="text-lg mb-10 leading-relaxed"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  color: "#555",
                }}
              >
                Create the perfect cake for your celebration with our custom designs.
                From elegant minimalist styles to charming pedal creations, every cake
                is handcrafted with delicious details, smooth frosting, and personalized
                touches like ribbons, pearls, and fondant toppers.
              </p>

              <button
                className="text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-[1.03]"
                style={{ background: primaryPink }}
              >
                Customize Now
              </button>
            </div>

            {/* IMAGE */}
            <div className="md:w-1/2">
              <img
                src={`http://localhost:5006${customSection.image}`}
                alt="Custom Cake"
                className="rounded-2xl shadow-2xl w-full max-w-sm ml-auto object-cover aspect-[3/4]"
                style={{ boxShadow: "0 15px 30px rgba(178, 58, 126, 0.2)" }}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
