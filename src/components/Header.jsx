// Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import axios from "axios";

const Header = () => {
  const location = useLocation();
  const [heartActive, setHeartActive] = useState(false);
  const [cartActive, setCartActive] = useState(false);
  const [occasions, setOccasions] = useState([]);
  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        const res = await axios.get(`${API}/api/admin/categories/type/occasion`);
        setOccasions(res.data.categories);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOccasions();
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Cakes Menu", path: "/cakes-menu" },
    { name: "Bakeries", path: "/bakeries" },
    { name: "Need a Cake today", path: "/need-a-cake-today" },
    { name: "Occasions", path: "/occasions" }, // We'll add dropdown
    { name: "Customize Cake", path: "/customize-cake" },
    { name: "About Us", path: "/about-us" },
  ];

  const primaryPink = "#ff4c8a";
  const secondaryPink = "#b23a7e";

  const searchInputStyle = {
    background: 'linear-gradient(to right, #fff5f8, #fffbee)',
    border: '1px solid #f9d8e5',
    boxShadow: '0 0 10px rgba(255, 192, 203, 0.3)',
  };

  return (
    <header className="w-full bg-white shadow-md z-50 sticky top-0 font-sans">
      <div className="flex items-center px-12 py-3 border-b border-pink-100 gap-10">

        {/* Logo + Nav */}
        <div className="flex items-center gap-8 flex-shrink-0">
          <Link to="/">
            <img src="/logo.png" alt="Cake & Crumbs" className="h-14 w-auto object-contain" />
          </Link>

          <nav className="flex items-center">
            <div className="flex gap-7">
              {navItems.map((item) => {
                const active =
                  item.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.path);

                // For Occasions, render a dropdown
                if (item.name === "Occasions") {
                  return (
                    <div key={item.name} className="relative group">
                      <span
                        className={`text-sm tracking-wide relative cursor-pointer transition-all ${
                          active ? "font-bold" : "text-gray-600 hover:text-pink-600"
                        }`}
                        style={{ color: active ? secondaryPink : '' }}
                      >
                        {item.name}
                        <span className="ml-1">▼</span>
                      </span>
                      <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 min-w-[150px]">
                        {occasions.length > 0 ? (
                          occasions.map((o) => (
                            <Link
                              key={o._id}
                              to={`/occasions/${o._id}`}
                              className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 text-sm"
                            >
                              {o.name}
                            </Link>
                          ))
                        ) : (
                          <span className="block px-4 py-2 text-gray-400 text-sm">
                            No occasions
                          </span>
                        )}
                      </div>
                    </div>
                  );
                }

                // Normal nav items
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm tracking-wide relative transition-all ${
                      active ? "font-bold" : "text-gray-600 hover:text-pink-600"
                    }`}
                    style={{ color: active ? secondaryPink : '' }}
                  >
                    {item.name}
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

        {/* Search Bar */}
        <div className="relative flex items-center flex-grow">
          <input
            type="text"
            placeholder="Search delicious cakes..."
            className="w-full py-2 pl-10 pr-4 rounded-full shadow-inner text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-sm"
            style={searchInputStyle}
          />
          <span className="absolute left-3 text-pink-500 text-lg">🔍</span>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-7 flex-shrink-0">
          <div className="flex items-center text-sm font-semibold gap-3">
            <Link
              to="/login"
              className={`hover:text-pink-600 transition ${location.pathname === "/login" ? "font-bold" : "text-gray-600"}`}
              style={{ color: location.pathname === "/login" ? secondaryPink : '' }}
            >Login</Link>
            <span className="text-gray-400">|</span>
            <Link
              to="/register"
              className={`hover:text-pink-600 transition ${location.pathname === "/register" ? "font-bold" : "text-gray-600"}`}
              style={{ color: location.pathname === "/register" ? secondaryPink : '' }}
            >Register</Link>
          </div>
          <div className="flex items-center gap-5">
            <Heart
              className="w-6 h-6 cursor-pointer transition-all duration-200"
              onClick={() => { setHeartActive(true); setTimeout(() => setHeartActive(false), 300); }}
              style={{ color: heartActive ? primaryPink : "black" }}
            />
            <ShoppingCart
              className="w-6 h-6 cursor-pointer transition-all duration-200"
              onClick={() => { setCartActive(true); setTimeout(() => setCartActive(false), 300); }}
              style={{ color: cartActive ? secondaryPink : "black" }}
            />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
