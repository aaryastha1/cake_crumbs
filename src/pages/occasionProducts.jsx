// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import { ShoppingBag, Heart, Eye, Loader2 } from "lucide-react";
// import { useCart } from "../context/cartContext";
// import { useFavorites } from "../context/favoriteContext";
// import toast from "react-hot-toast";

// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import SidebarFilters from "../components/SidebarFilter";

// const OccasionProducts = () => {
//   const { occasionId } = useParams();
//   const { addToCart } = useCart();
//   const { favorites, toggleFavorite } = useFavorites();

//   const [products, setProducts] = useState([]);
//   const [occasionName, setOccasionName] = useState("");
//   const [loading, setLoading] = useState(true);

//   const API = import.meta.env.VITE_API_URL || "http://localhost:5006";
//   const primaryPink = "#d84e6d";

//   const fetchProducts = useCallback(
//     async (filters = {}) => {
//       try {
//         setLoading(true);
//         const query = new URLSearchParams(filters).toString();
//         const res = await axios.get(`${API}/api/admin/products/by-occasion/${occasionId}${query ? `?${query}` : ""}`);
//         setProducts(res.data.products || []);
//         setOccasionName(res.data.products[0]?.occasion?.name || "Special Collection");
//       } catch (err) {
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [API, occasionId]
//   );

//   useEffect(() => {
//     fetchProducts();
//   }, [occasionId, fetchProducts]);

//   return (
//     <div className="bg-[#fdfbfb] min-h-screen">
//       <Header />

//       <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8 flex flex-col lg:flex-row gap-6">
//         <aside className="w-full lg:w-64 flex-shrink-0">
//           <div className="sticky top-24">
//             <SidebarFilters onFilter={fetchProducts} />
//           </div>
//         </aside>

//         <main className="flex-1">
//           <div className="flex justify-between items-center mb-6 px-2">
//             <h1 className="text-xl font-bold text-gray-800 uppercase">{occasionName}</h1>
//             <p className="text-xs text-gray-400 font-medium bg-white px-3 py-1 rounded-full border border-gray-100">
//               {products.length} Products
//             </p>
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <Loader2 className="animate-spin text-pink-400 w-8 h-8" />
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {products.map(p => {
//                 const smallestSize = (p.sizes || []).sort((a, b) => a.price - b.price)[0] || null;
//                 const isLiked = favorites.some(f => f._id === p._id);

//                 return (
//                   <div key={p._id} className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md flex flex-col">
//                     <div className="relative aspect-square mb-3 overflow-hidden rounded-2xl">
//                       <div className="absolute top-3 left-3 z-10 bg-[#d84e6d] text-[9px] font-bold text-white px-2.5 py-1 rounded-full uppercase">
//                         {p.occasion?.name || "Special"}
//                       </div>

//                       <button
//                         onClick={e => { e.preventDefault(); e.stopPropagation(); toggleFavorite(p._id); }}
//                         className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full"
//                       >
//                         <Heart size={16} fill={isLiked ? "#ff0000" : "none"} />
//                       </button>

//                       <Link to={`/products/${p._id}`}>
//                         <img src={p.image ? `${API}${p.image}` : "/placeholder.png"} alt={p.name} className="w-full h-full object-cover" />
//                       </Link>
//                     </div>

//                     <div className="px-1 flex flex-col flex-grow">
//                       <h3 className="text-[14px] font-semibold text-gray-800 mb-2">{p.name}</h3>

//                       <div className="mt-auto flex items-center justify-between">
//                         <div className="text-[#d84e6d] font-bold text-lg">₹{smallestSize?.price?.toLocaleString() || 0}</div>

//                         <div className="flex gap-1.5">
//                           <Link to={`/products/${p._id}`} className="p-2 rounded-xl border border-gray-100 text-pink-300 hover:bg-gray-50">
//                             <Eye size={18} />
//                           </Link>
// <button
//   className="p-2 rounded-xl text-white shadow-lg"
//   style={{ backgroundColor: primaryPink }}
//   onClick={() => {
//     if (!smallestSize) return toast.error("Size not available");
//     addToCart(p._id, smallestSize.size, 1, "Product"); // pass ID instead of full object
//     toast.success("Added to cart");
//   }}
// >
//   <ShoppingBag size={18} />
// </button>

//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default OccasionProducts;


// src/pages/OccasionProducts.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ShoppingBag, Heart, Eye, Loader2 } from "lucide-react";
import { useCart } from "../context/cartContext";
import { useFavorites } from "../context/favoriteContext";
import toast from "react-hot-toast";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarFilters from "../components/SidebarFilter";

const OccasionProducts = () => {
  const { occasionId } = useParams();
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const [products, setProducts] = useState([]);
  const [occasionName, setOccasionName] = useState("");
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";
  const primaryPink = "#d84e6d";

 // src/pages/OccasionProducts.jsx
// src/pages/OccasionProducts.jsx

const fetchProducts = useCallback(
  async (filters = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      // Handle Flavour filter
      if (filters.flavour && filters.flavour !== "all") {
        queryParams.append("flavour", filters.flavour);
      }

      // Determine the Occasion ID: prefer the sidebar selection, fallback to URL
      const currentOccasion = filters.occasion || occasionId;

      let url = "";
      if (currentOccasion === "all") {
        // Use your "Get All" route
        url = `${API}/api/admin/products?${queryParams.toString()}`;
        setOccasionName("All Collections");
      } else {
        // Use your "By Occasion" route
        url = `${API}/api/admin/products/by-occasion/${currentOccasion}?${queryParams.toString()}`;
      }

      const res = await axios.get(url);
      setProducts(res.data.products || []);

      // Set the title from the first product's occasion if available
      if (currentOccasion !== "all" && res.data.products?.length > 0) {
        setOccasionName(res.data.products[0]?.occasion?.name);
      }
    } catch (err) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  },
  [API, occasionId]
);
  

  useEffect(() => {
    fetchProducts();
  }, [occasionId, fetchProducts]);

  return (
    <div className="bg-[#fdfbfb] min-h-screen">
      <Header />
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8 flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <SidebarFilters onFilter={fetchProducts} />
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-center mb-6 px-2">
            <h1 className="text-xl font-bold text-gray-800 uppercase">{occasionName}</h1>
            <p className="text-xs text-gray-400 font-medium bg-white px-3 py-1 rounded-full border border-gray-100">
              {products.length} Products
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-pink-400 w-8 h-8" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.length === 0 ? (
                <div className="col-span-full text-center py-20 text-gray-500">No products found.</div>
              ) : (
                products.map(p => {
                  const smallestSize = (p.sizes || []).sort((a, b) => a.price - b.price)[0] || null;
                  const isLiked = favorites.some(f => f._id === p._id);

                  return (
                    <div key={p._id} className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md flex flex-col">
                      <div className="relative aspect-square mb-3 overflow-hidden rounded-2xl">
                        <div className="absolute top-3 left-3 z-10 bg-[#d84e6d] text-[9px] font-bold text-white px-2.5 py-1 rounded-full uppercase">
                          {p.occasion?.name || "Cake"}
                        </div>
                        <button
                          onClick={() => toggleFavorite(p._id)}
                          className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-sm"
                        >
                          <Heart size={16} fill={isLiked ? "#ff0000" : "none"} color={isLiked ? "#ff0000" : "#000"} />
                        </button>
                        <Link to={`/products/${p._id}`}>
                          <img src={p.image ? `${API}${p.image}` : "/placeholder.png"} alt={p.name} className="w-full h-full object-cover" />
                        </Link>
                      </div>
                      <div className="px-1 flex flex-col flex-grow">
                        <h3 className="text-[14px] font-semibold text-gray-800 mb-2 truncate">{p.name}</h3>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="text-[#d84e6d] font-bold text-lg">₹{smallestSize?.price?.toLocaleString() || 0}</div>
                          <div className="flex gap-1.5">
                            <Link to={`/products/${p._id}`} className="p-2 rounded-xl border border-gray-100 text-pink-300 hover:bg-gray-50">
                              <Eye size={18} />
                            </Link>
                            <button
                              className="p-2 rounded-xl text-white shadow-lg"
                              style={{ backgroundColor: primaryPink }}
                              onClick={() => {
                                if (!smallestSize) return toast.error("Size not available");
                                addToCart(p._id, smallestSize.size, 1, "Product");
                                toast.success("Added to cart");
                              }}
                            >
                              <ShoppingBag size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default OccasionProducts;