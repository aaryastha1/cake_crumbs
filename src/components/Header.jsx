// Header.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

const Header = () => {
  const navItems = [
    "Cakes Menu",
    "Bakeries",
    "Need a Cake today",
    "Occasions",
    "Customize Cake",
    "About Us",
  ];

  const location = useLocation(); // detect current page for active link

  return (
    <header className="w-full bg-white font-serif-tnr shadow-sm">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-8 py-3 border-b border-gray-100">
        {/* Logo */}
        <Link to="/">
          <img
            src="logo.png"
            alt="Cake and Crumbs Logo"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Search Bar slightly right */}
        <div className="relative flex items-center flex-grow max-w-lg ml-10">
          <input
            type="text"
            placeholder="Search cakes..."
            className="w-full py-3 pl-12 pr-4 text-base border border-gray-300 focus:outline-none rounded-full shadow-sm focus:ring-2 focus:ring-pink-300 transition"
            style={{ background: 'linear-gradient(to right, #ffeef2, #f9d8e5)' }}
          />
          <span className="absolute left-4 text-gray-500 text-xl">🔍</span>
        </div>

        {/* User Actions & Icons */}
        <div className="flex items-center gap-6 text-gray-700">
          {/* Login/Register */}
          <div className="flex items-center text-sm font-normal gap-2">
            <Link
              to="/login"
              className={`hover:text-pink-600 transition ${
                location.pathname === "/login" ? "font-bold" : ""
              }`}
            >
              Login
            </Link>
            <span>/</span>
            <Link
              to="/register"
              className={`hover:text-pink-600 transition ${
                location.pathname === "/register" ? "font-bold" : ""
              }`}
            >
              Register
            </Link>
          </div>

          {/* Heart & Cart icons */}
          <div className="flex gap-4 items-center">
            <Heart className="text-black w-8 h-8 cursor-pointer hover:scale-110 hover:text-red-600 transition-transform duration-200" />
            <ShoppingCart className="text-black w-8 h-8 cursor-pointer hover:scale-110 hover:text-gray-800 transition-transform duration-200" />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="flex justify-center items-center py-3 bg-white shadow-sm">
        <div className="flex gap-12">
          {navItems.map((item) => {
            const path = `/${item.toLowerCase().replace(/\s/g, '-')}`;
            const isActive = location.pathname === path;

            return (
              <Link
                key={item}
                to={path}
                className={`
                  text-gray-700 text-sm md:text-base tracking-wide hover:text-pink-600 transition duration-150
                  ${isActive ? "font-bold underline" : "font-normal"}
                `}
              >
                {item}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Header;
