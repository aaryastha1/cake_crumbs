// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Heart, ShoppingCart, User } from "lucide-react";
// import axios from "axios";
// import { useFavorites } from "../context/favoriteContext"; // Added

// const Header = () => {
//   const location = useLocation();

//   const [cartActive, setCartActive] = useState(false);
//   const [occasions, setOccasions] = useState([]);
//   const [bakeries, setBakeries] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const { favorites } = useFavorites(); // Added

//   const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

//   // ✅ Check login status
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   // ✅ Fetch occasions
//   useEffect(() => {
//     const fetchOccasions = async () => {
//       try {
//         const res = await axios.get(`${API}/api/admin/categories/type/occasion`);
//         setOccasions(res.data.categories);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchOccasions();
//   }, []);

//   // ✅ Fetch bakery categories
//   useEffect(() => {
//     const fetchBakeries = async () => {
//       try {
//         const res = await axios.get(`${API}/api/admin/categories/type/bakeries`);
//         setBakeries(res.data.categories);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchBakeries();
//   }, []);

//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "Cakes Menu", path: "/cakes-menu" },
//     { name: "Bakeries", path: "/bakeries" },
//     { name: "Occasions", path: "/occasions" },
//     { name: "Customize Cake", path: "/customize-cake" },
//     { name: "About Us", path: "/about-us" },
//   ];

//   const primaryPink = "#ff4c8a";
//   const secondaryPink = "#b23a7e";

//   const searchInputStyle = {
//     background: "linear-gradient(to right, #fff5f8, #fffbee)",
//     border: "1px solid #f9d8e5",
//     boxShadow: "0 0 10px rgba(255, 192, 203, 0.3)",
//   };

//   return (
//     <header className="w-full bg-white shadow-md z-50 sticky top-0 font-sans">
//       <div className="flex items-center px-12 py-3 border-b border-pink-100 gap-10">
//         {/* Logo + Navigation */}
//         <div className="flex items-center gap-8 flex-shrink-0">
//           <Link to="/">
//             <img
//               src="/logo.png"
//               alt="Cake & Crumbs"
//               className="h-14 w-auto object-contain"
//             />
//           </Link>

//           <nav className="flex items-center">
//             <div className="flex gap-7">
//               {navItems.map((item) => {
//                 const active =
//                   item.path === "/"
//                     ? location.pathname === "/"
//                     : location.pathname.startsWith(item.path);

//                 if (item.name === "Bakeries") {
//                   return (
//                     <div key={item.name} className="relative group">
//                       <span
//                         className={`text-sm tracking-wide cursor-pointer transition-all ${active ? "font-bold" : "text-gray-600 hover:text-pink-600"}`}
//                         style={{ color: active ? secondaryPink : "" }}
//                       >
//                         {item.name} <span className="ml-1">▼</span>
//                       </span>
//                       <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 min-w-[150px]">
//                         {bakeries.length > 0 ? (
//                           bakeries.map((b) => (
//                             <Link
//                               key={b._id}
//                               to={`/bakeries/${b._id}`}
//                               className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 text-sm"
//                             >
//                               {b.name}
//                             </Link>
//                           ))
//                         ) : (
//                           <span className="block px-4 py-2 text-gray-400 text-sm">No bakeries</span>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 }

//                 if (item.name === "Occasions") {
//                   return (
//                     <div key={item.name} className="relative group">
//                       <span
//                         className={`text-sm tracking-wide cursor-pointer transition-all ${active ? "font-bold" : "text-gray-600 hover:text-pink-600"}`}
//                         style={{ color: active ? secondaryPink : "" }}
//                       >
//                         {item.name} <span className="ml-1">▼</span>
//                       </span>
//                       <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 min-w-[150px]">
//                         {occasions.length > 0 ? (
//                           occasions.map((o) => (
//                             <Link
//                               key={o._id}
//                               to={`/occasions/${o._id}`}
//                               className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 text-sm"
//                             >
//                               {o.name}
//                             </Link>
//                           ))
//                         ) : (
//                           <span className="block px-4 py-2 text-gray-400 text-sm">No occasions</span>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 }

//                 return (
//                   <Link
//                     key={item.name}
//                     to={item.path}
//                     className={`text-sm tracking-wide relative transition-all ${active ? "font-bold" : "text-gray-600 hover:text-pink-600"}`}
//                     style={{ color: active ? secondaryPink : "" }}
//                   >
//                     {item.name}
//                     {active && (
//                       <span
//                         className="absolute left-0 right-0 mx-auto h-[2px] rounded-full"
//                         style={{ backgroundColor: primaryPink, width: "100%", bottom: "-3px" }}
//                       />
//                     )}
//                   </Link>
//                 );
//               })}
//             </div>
//           </nav>
//         </div>

//         {/* 🔍 Search Bar */}
//         <div className="relative flex items-center flex-grow">
//           <input
//             type="text"
//             placeholder="Search delicious cakes..."
//             className="w-full py-2 pl-10 pr-4 rounded-full shadow-inner text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-sm"
//             style={searchInputStyle}
//           />
//           <span className="absolute left-3 text-pink-500 text-lg">🔍</span>
//         </div>

//         {/* ❤️ Cart + User */}
//         <div className="flex items-center gap-7 flex-shrink-0">
//           {!isLoggedIn ? (
//             <div className="flex items-center text-sm font-semibold gap-3">
//               <Link
//                 to="/login"
//                 className={`hover:text-pink-600 transition ${location.pathname === "/login" ? "font-bold" : "text-gray-600"}`}
//                 style={{ color: location.pathname === "/login" ? secondaryPink : "" }}
//               >
//                 Login
//               </Link>
//               <span className="text-gray-400">|</span>
//               <Link
//                 to="/register"
//                 className={`hover:text-pink-600 transition ${location.pathname === "/register" ? "font-bold" : "text-gray-600"}`}
//                 style={{ color: location.pathname === "/register" ? secondaryPink : "" }}
//               >
//                 Register
//               </Link>
//             </div>
//           ) : (
//             <Link to="/profile" className="text-black">
//               <User className="w-6 h-6 cursor-pointer hover:text-pink-600 transition" />
//             </Link>
//           )}

//           <div className="flex items-center gap-5">
//             {/* ❤️ Favorites Heart */}
//             <Link to="/favorites" className="relative">
//               <Heart
//                 className="w-6 h-6 cursor-pointer transition-all duration-200"
//                 style={{ color: favorites.length > 0 ? primaryPink : "black" }}
//               />
//               {favorites.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//                   {favorites.length}
//                 </span>
//               )}
//             </Link>

//             <ShoppingCart
//               className="w-6 h-6 cursor-pointer transition-all duration-200"
//               onClick={() => {
//                 setCartActive(true);
//                 setTimeout(() => setCartActive(false), 300);
//               }}
//               style={{ color: cartActive ? secondaryPink : "black" }}
//             />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, User, Search, X } from "lucide-react";
import axios from "axios";
import { useFavorites } from "../context/favoriteContext";
import { useCart } from "../context/cartContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, setIsCartOpen } = useCart();
  const { favorites } = useFavorites();

  const [occasions, setOccasions] = useState([]);
  const [bakeries, setBakeries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --- Search Logic States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        const res = await axios.get(`${API}/api/admin/categories/type/occasion`);
        setOccasions(res.data.categories);
      } catch (err) { console.error(err); }
    };
    fetchOccasions();
  }, [API]);

  useEffect(() => {
    const fetchBakeries = async () => {
      try {
        const res = await axios.get(`${API}/api/admin/categories/type/bakeries`);
        setBakeries(res.data.categories);
      } catch (err) { console.error(err); }
    };
    fetchBakeries();
  }, [API]);

  // --- Live Search Functionality ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        try {
          const res = await axios.get(`${API}/api/search?q=${searchQuery}`);
          // Combine products and bakeries to show as a single product list
          setSearchResults([...res.data.products, ...res.data.bakeries]);
          setShowDropdown(true);
        } catch (err) {
          console.error("Search fetch error:", err);
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, API]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Bakeries", path: "/bakeries" },
    { name: "Occasions", path: "/occasions" },
    { name: "Customize Cake", path: "/customize-cake" },
    { name: "About Us", path: "/about-us" },
  ];

  const primaryPink = "#ff4c8a";
  const secondaryPink = "#b23a7e";

  const searchInputStyle = {
    background: "linear-gradient(to right, #fff5f8, #fffbee)",
    border: "1px solid #f9d8e5",
    boxShadow: "0 0 10px rgba(255, 192, 203, 0.3)",
  };

  return (
    <header className="w-full bg-white shadow-md z-50 sticky top-0 font-sans">
      <div className="flex items-center px-12 py-3 border-b border-pink-100 gap-10">
        {/* Logo + Navigation */}
        <div className="flex items-center gap-8 flex-shrink-0">
          <Link to="/">
            <img src="/logo.png" alt="Cake & Crumbs" className="h-14 w-auto object-contain" />
          </Link>

          <nav className="flex items-center">
            <div className="flex gap-7">
              {navItems.map((item) => {
                const active = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);

                if (item.name === "Bakeries" || item.name === "Occasions") {
                  const data = item.name === "Bakeries" ? bakeries : occasions;
                  const path = item.name === "Bakeries" ? "bakeries" : "occasions";
                  return (
                    <div key={item.name} className="relative group">
                      <span
                        className={`text-sm tracking-wide cursor-pointer transition-all ${active ? "font-bold" : "text-gray-600 hover:text-pink-600"}`}
                        style={{ color: active ? secondaryPink : "" }}
                      >
                        {item.name} <span className="ml-1">▼</span>
                      </span>
                      <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 min-w-[150px]">
                        {data.length > 0 ? data.map((b) => (
                          <Link key={b._id} to={`/${path}/${b._id}`} className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 text-sm">
                            {b.name}
                          </Link>
                        )) : (
                          <span className="block px-4 py-2 text-gray-400 text-sm">No {item.name}</span>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm tracking-wide relative transition-all ${active ? "font-bold" : "text-gray-600 hover:text-pink-600"}`}
                    style={{ color: active ? secondaryPink : "" }}
                  >
                    {item.name}
                    {active && <span className="absolute left-0 right-0 mx-auto h-[2px] rounded-full" style={{ backgroundColor: primaryPink, width: "100%", bottom: "-3px" }} />}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* 🔍 Search Bar (Updated with Link Logic) */}
        <div className="relative flex items-center flex-grow" ref={searchRef}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search delicious cakes..."
            className="w-full py-2 pl-10 pr-10 rounded-full shadow-inner text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-sm"
            style={searchInputStyle}
          />
          <span className="absolute left-3 text-pink-500 text-lg">🔍</span>
          {searchQuery && (
            <X 
              className="absolute right-4 w-4 h-4 text-gray-400 cursor-pointer hover:text-pink-500" 
              onClick={() => setSearchQuery("")} 
            />
          )}

          {/* Results Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-pink-100 rounded-xl shadow-xl z-[100] max-h-80 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="p-2">
                  {searchResults.map((item) => (
                    <Link
                      key={item._id}
                      // THIS IS THE KEY: Dynamic link to the specific product
                      to={`/product/${item._id}`}
                      onClick={() => {
                        setShowDropdown(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-pink-50 rounded-lg transition"
                    >
                      <img 
                        src={item.image ? `${API}${item.image}` : "/placeholder.png"} 
                        alt={item.name} 
                        className="w-10 h-10 object-cover rounded shadow-sm"
                        onError={(e) => { e.target.src = "/placeholder.png"; }}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800">{item.name}</span>
                        {item.price && <span className="text-xs text-pink-500 font-bold">₹{item.price}</span>}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-gray-400">No products found</div>
              )}
            </div>
          )}
        </div>

        {/* ❤️ Cart + User */}
        <div className="flex items-center gap-7 flex-shrink-0">
          {!isLoggedIn ? (
            <div className="flex items-center text-sm font-semibold gap-3">
              <Link to="/login" className="text-gray-600 hover:text-pink-600 transition">Login</Link>
              <span className="text-gray-400">|</span>
              <Link to="/register" className="text-gray-600 hover:text-pink-600 transition">Register</Link>
            </div>
          ) : (
            <Link to="/profile" className="text-black hover:text-pink-600 transition">
              <User className="w-6 h-6 cursor-pointer" />
            </Link>
          )}

          <div className="flex items-center gap-5">
            <Link to="/favorites" className="relative">
              <Heart className="w-6 h-6 cursor-pointer transition-all duration-200" style={{ color: favorites.length > 0 ? primaryPink : "black" }} />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>

            <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="w-6 h-6 transition-all duration-200" style={{ color: cart.length > 0 ? secondaryPink : "black" }} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;