import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, User, X } from "lucide-react";
import axios from "axios";
import { useFavorites } from "../context/favoriteContext";
import { useCart } from "../context/cartContext";
import { AuthContext } from "../auth/AuthContext"; // ✅ ADDED

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, setIsCartOpen } = useCart();
  const { favorites } = useFavorites();

  // ✅ AUTH CONTEXT (FIX)
  const { user, token } = useContext(AuthContext);
  const isLoggedIn = !!token;

  const [occasions, setOccasions] = useState([]);
  const [bakeries, setBakeries] = useState([]);

  // State to track which dropdown is open (Click logic)
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  // --- Search Logic States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

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
  }, [API]);

  useEffect(() => {
    const fetchBakeries = async () => {
      try {
        const res = await axios.get(`${API}/api/admin/categories/type/bakeries`);
        setBakeries(res.data.categories);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBakeries();
  }, [API]);

  // --- Live Search ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        try {
          const res = await axios.get(`${API}/api/search?q=${searchQuery}`);
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
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
  ];

  const primaryPink = "#ff4c8a";
  const secondaryPink = "#b23a7e";

  const searchInputStyle = {
    background: "linear-gradient(to right, #fff5f8, #fffbee)",
    border: "1px solid #f9d8e5",
    boxShadow: "0 0 10px rgba(255, 192, 203, 0.3)",
  };

  const handleToggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="w-full bg-white shadow-md z-50 sticky top-0 font-sans">
      <div className="flex items-center px-12 py-3 border-b border-pink-100 gap-10">

        {/* Logo + Navigation */}
        <div className="flex items-center gap-8 flex-shrink-0" ref={navRef}>
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

                if (item.name === "Bakeries" || item.name === "Occasions") {
                  const data = item.name === "Bakeries" ? bakeries : occasions;
                  const path = item.name === "Bakeries" ? "bakeries" : "occasions";
                  const isOpen = activeDropdown === item.name;

                  return (
                    <div key={item.name} className="relative">
                      <span
                        onClick={() => handleToggleDropdown(item.name)}
                        className={`text-sm tracking-wide cursor-pointer transition-all select-none ${
                          active ? "font-bold" : "text-gray-600 hover:text-pink-600 font-normal"
                        }`}
                        style={{ color: active ? secondaryPink : "" }}
                      >
                        {item.name} <span className="ml-0.5 text-[10px]">{isOpen ? "▲" : "▼"}</span>
                      </span>

                      {isOpen && (
                        <div className="absolute top-full left-0 mt-3 bg-white border border-pink-100 rounded shadow-xl z-50 min-w-[160px] py-1">
                          {data.length > 0 ? (
                            data.map((b) => (
                              <Link
                                key={b._id}
                                to={`/${path}/${b._id}`}
                                onClick={() => setActiveDropdown(null)}
                                className="block px-4 py-2.5 text-gray-700 hover:bg-pink-50 hover:text-pink-600 text-sm font-medium border-b border-gray-50 last:border-none"
                              >
                                {b.name}
                              </Link>
                            ))
                          ) : (
                            <span className="block px-4 py-2 text-gray-400 text-sm">
                              No {item.name}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm tracking-wide relative transition-all ${
                      active ? "font-bold" : "text-gray-600 hover:text-pink-600 font-normal"
                    }`}
                    style={{ color: active ? secondaryPink : "" }}
                  >
                    {item.name}
                    {active && (
                      <span
                        className="absolute left-0 right-0 mx-auto h-[2px] rounded-full"
                        style={{
                          backgroundColor: primaryPink,
                          width: "100%",
                          bottom: "-3px",
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* 🔍 Search */}
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

          {showDropdown && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-pink-100 rounded-xl shadow-xl z-[100] max-h-80 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="p-2">
                  {searchResults.map((item) => (
                    <Link
                      key={item._id}
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
                        onError={(e) => (e.target.src = "/placeholder.png")}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800">
                          {item.name}
                        </span>
                        {item.price && (
                          <span className="text-xs text-pink-500 font-bold">
                            ₹{item.price}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-gray-400">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>

        {/* ❤️ Cart + User */}
        <div className="flex items-center gap-7 flex-shrink-0">
          {!isLoggedIn ? (
            <div className="flex items-center text-sm font-semibold gap-3">
              <Link to="/login" className="text-gray-600 hover:text-pink-600 transition">
                Login
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/register" className="text-gray-600 hover:text-pink-600 transition">
                Register
              </Link>
            </div>
          ) : (
            <Link to="/profile" className="text-black hover:text-pink-600 transition">
              <User className="w-6 h-6 cursor-pointer" />
            </Link>
          )}

          <div className="flex items-center gap-5">
            <Link to="/favorites" className="relative">
              <Heart
                className="w-6 h-6 cursor-pointer"
                style={{ color: favorites.length > 0 ? primaryPink : "black" }}
              />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>

            <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart
                className="w-6 h-6"
                style={{ color: cart.length > 0 ? secondaryPink : "black" }}
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cart.reduce((t, i) => t + i.quantity, 0)}
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

// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Heart, ShoppingCart, User, X } from "lucide-react";
// import axios from "axios";
// import { useFavorites } from "../context/favoriteContext";
// import { useCart } from "../context/cartContext";
// import { AuthContext } from "../auth/AuthContext";

// const Header = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { cart, setIsCartOpen } = useCart();
//   const { favorites } = useFavorites();
//   const { user, token } = useContext(AuthContext);

//   const isLoggedIn = !!token;

//   const [occasions, setOccasions] = useState([]);
//   const [bakeries, setBakeries] = useState([]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const searchRef = useRef(null);

//   const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

//   useEffect(() => {
//     axios
//       .get(`${API}/api/admin/categories/type/occasion`)
//       .then(res => setOccasions(res.data.categories))
//       .catch(console.error);
//   }, [API]);

//   useEffect(() => {
//     axios
//       .get(`${API}/api/admin/categories/type/bakeries`)
//       .then(res => setBakeries(res.data.categories))
//       .catch(console.error);
//   }, [API]);

//   useEffect(() => {
//     const t = setTimeout(async () => {
//       if (searchQuery.trim().length > 1) {
//         const res = await axios.get(`${API}/api/search?q=${searchQuery}`);
//         setSearchResults([...res.data.products, ...res.data.bakeries]);
//         setShowDropdown(true);
//       } else {
//         setShowDropdown(false);
//       }
//     }, 300);
//     return () => clearTimeout(t);
//   }, [searchQuery, API]);

//   useEffect(() => {
//     const click = e => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", click);
//     return () => document.removeEventListener("mousedown", click);
//   }, []);

  

//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "Bakeries", path: "/bakeries" },
//     { name: "Occasions", path: "/occasions" },
//     { name: "Customize Cake", path: "/customize-cake" },
//   ];

//   const primaryPink = "#ff4c8a";
//   const secondaryPink = "#b23a7e";

//   return (
//     <header className="w-full bg-white shadow-md sticky top-0 z-50">
//       <div className="flex items-center px-12 py-3 border-b border-pink-100 gap-6">

//         {/* LOGO + NAV */}
//         <div className="flex items-center gap-6 flex-shrink-0">
//           <Link to="/">
//             <img src="/logo.png" alt="Cake & Crumbs" className="h-14" />
//           </Link>

//           <nav className="flex items-center gap-6">
//             {navItems.map(item => {
//               const active =
//                 item.path === "/"
//                   ? location.pathname === "/"
//                   : location.pathname.startsWith(item.path);

//               const baseClass =
//                 "text-sm uppercase tracking-wider transition font-medium";

//               if (item.name === "Bakeries" || item.name === "Occasions") {
//                 const list = item.name === "Bakeries" ? bakeries : occasions;
//                 const path = item.name === "Bakeries" ? "bakeries" : "occasions";

//                 return (
//                   <div key={item.name} className="relative group">
//                     <span
//                       className={`${baseClass} cursor-pointer ${
//                         active
//                           ? "font-bold"
//                           : "text-gray-600 hover:text-pink-600"
//                       }`}
//                       style={{ color: active ? secondaryPink : "" }}
//                     >
//                       {item.name}
//                     </span>

//                     <div className="absolute top-full left-0 mt-2 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition z-50 min-w-[160px]">
//                       {list.map(i => (
//                         <Link
//                           key={i._id}
//                           to={`/${path}/${i._id}`}
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600"
//                         >
//                           {i.name}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 );
//               }

//               return (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   className={`${baseClass} ${
//                     active
//                       ? "font-bold"
//                       : "text-gray-600 hover:text-pink-600"
//                   }`}
//                   style={{ color: active ? secondaryPink : "" }}
//                 >
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>

//         {/* SEARCH */}
//         <div className="flex-grow relative" ref={searchRef}>
//           <input
//             value={searchQuery}
//             onChange={e => setSearchQuery(e.target.value)}
//             placeholder="Search delicious cakes..."
//             className="w-full py-2 pl-10 pr-10 rounded-full text-sm shadow-inner focus:ring-2 focus:ring-pink-400"
//           />
//           <span className="absolute left-3 top-2.5">🔍</span>
//           {searchQuery && (
//             <X
//               className="absolute right-4 top-2.5 w-4 h-4 cursor-pointer"
//               onClick={() => setSearchQuery("")}
//             />
//           )}
//         </div>

//        {/* ❤️ Cart + User */}
// <div className="flex items-center gap-7 flex-shrink-0">

//   {!isLoggedIn ? (
//     <div className="flex items-center text-sm font-semibold gap-3">
//       <Link
//         to="/login"
//         className="text-gray-600 hover:text-pink-600 transition"
//       >
//         Login
//       </Link>
//       <span className="text-gray-400">|</span>
//       <Link
//         to="/register"
//         className="text-gray-600 hover:text-pink-600 transition"
//       >
//         Register
//       </Link>
//     </div>
//   ) : (
//     <Link to="/profile">
//       <User
//         className="w-6 h-6 cursor-pointer"
//         style={{
//           color: location.pathname === "/profile" ? "red" : "black", // ✅ turns red on click
//         }}
//       />
//     </Link>
//   )}

//   <div className="flex items-center gap-5">
//     <Link to="/favorites" className="relative">
//       <Heart
//         className="w-6 h-6 cursor-pointer"
//         style={{
//           color: location.pathname === "/favorites" ? "red" : favorites.length > 0 ? primaryPink : "black", // ✅ red on click
//         }}
//       />
//       {favorites.length > 0 && (
//         <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//           {favorites.length}
//         </span>
//       )}
//     </Link>

//     <div
//       className="relative cursor-pointer"
//       onClick={() => setIsCartOpen(true)}
//     >
//       <ShoppingCart
//         className="w-6 h-6"
//         style={{
//           color: location.pathname === "/cart" ? "red" : cart.length > 0 ? secondaryPink : "black", // ✅ red on click
//         }}
//       />
//       {cart.length > 0 && (
//         <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-white">
//           {cart.reduce((t, i) => t + i.quantity, 0)}
//         </span>
//       )}
//     </div>
//   </div>
// </div>

//       </div>
//     </header>
//   );
// };

// export default Header;
