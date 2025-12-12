// Header.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react"; 

const Header = () => {
  const location = useLocation();

  const [heartActive, setHeartActive] = useState(false);
  const [cartActive, setCartActive] = useState(false);

  // Added "Home" as the first item
  const navItems = [
    "Home",
    "Cakes Menu",
    "Bakeries",
    "Need a Cake today",
    "Occasions",
    "Customize Cake",
    "About Us",
  ];

  // Colors based on the Register page design for brand consistency
  const primaryPink = "#ff4c8a"; // Bright pink for accents/hover
  const secondaryPink = "#b23a7e"; // Deep magenta for strong text

  // Search Input Style (Custom styles for the "sweet" theme)
  const searchInputStyle = {
    background: 'linear-gradient(to right, #fff5f8, #fffbee)', 
    border: '1px solid #f9d8e5', 
    boxShadow: '0 0 10px rgba(255, 192, 203, 0.3)', 
  };

  return (
    <header className="w-full bg-white shadow-md z-50 sticky top-0 font-sans">

      {/* --- MAIN HEADER BAR --- */}
      <div className="flex items-center px-12 py-3 border-b border-pink-100 gap-10">

        {/* 1. LEFT COLUMN: LOGO + NAVIGATION (Fixed Width) */}
        <div className="flex items-center gap-8 flex-shrink-0">
            
            {/* LOGO */}
            <Link to="/">
                <img 
                    src="/logo.png"
                    alt="Cake & Crumbs"
                    className="h-14 w-auto object-contain" 
                />
            </Link>

            {/* NAVIGATION BAR (Aligned right next to the logo) */}
            <nav className="flex items-center">
                <div className="flex gap-7"> 
                    {navItems.map((item) => {
                        // If the item is "Home", the path should be "/"
                        const path = item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s/g, "-")}`;
                        
                        // Check if the current location pathname matches the calculated path. 
                        // Special handling for "/" path: only active if pathname is exactly "/"
                        const active = path === "/" 
                                ? location.pathname === "/"
                                : location.pathname.startsWith(path);


                        return (
                            <Link
                                key={item}
                                to={path}
                                className={`text-sm tracking-wide relative transition-all ${ 
                                    active
                                        ? "font-bold" 
                                        : "text-gray-600 hover:text-pink-600"
                                }`}
                                style={{ color: active ? secondaryPink : '' }} 
                            >
                                {item}

                                {/* Active underline */}
                                {active && (
                                    <span
                                        className="absolute left-0 right-0 mx-auto h-[2px] rounded-full"
                                        style={{ backgroundColor: primaryPink, width: "100%", bottom: "-3px" }}
                                    ></span>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
        {/* END of LEFT COLUMN */}


        {/* 2. CENTER COLUMN: SEARCH BAR (Takes up flexible space, pushing it left) */}
        <div className="relative flex items-center flex-grow"> 
            <input
              type="text"
              placeholder="Search delicious cakes..." 
              className="w-full py-2 pl-10 pr-4 rounded-full shadow-inner text-gray-700 
                         focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-sm"
              style={searchInputStyle} 
            />
            <span className="absolute left-3 text-pink-500 text-lg">🔍</span>
          </div>


        {/* 3. RIGHT COLUMN: ACTIONS (Fixed width) */}
        <div className="flex items-center gap-7 flex-shrink-0">
          
          {/* Login / Register */}
          <div className="flex items-center text-sm font-semibold gap-3">
            <Link
              to="/login"
              className={`hover:text-pink-600 transition ${
                location.pathname === "/login" 
                  ? "font-bold" 
                  : "text-gray-600"
              }`}
              style={{ color: location.pathname === "/login" ? secondaryPink : '' }}
            >
              Login
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              to="/register"
              className={`hover:text-pink-600 transition ${
                location.pathname === "/register" 
                  ? "font-bold" 
                  : "text-gray-600"
              }`}
              style={{ color: location.pathname === "/register" ? secondaryPink : '' }}
            >
              Register
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <Heart
              className="w-6 h-6 cursor-pointer transition-all duration-200"
              onClick={() => {
                setHeartActive(true);
                setTimeout(() => setHeartActive(false), 300);
              }}
              style={{ color: heartActive ? primaryPink : "black" }} 
            />
            <ShoppingCart
              className="w-6 h-6 cursor-pointer transition-all duration-200"
              onClick={() => {
                setCartActive(true);
                setTimeout(() => setCartActive(false), 300);
              }}
              style={{ color: cartActive ? secondaryPink : "black" }} 
            />
          </div>

        </div> 
        {/* END of RIGHT COLUMN */}

      </div>
      {/* --- END of MAIN HEADER BAR --- */}

    </header>
  );
};

export default Header;