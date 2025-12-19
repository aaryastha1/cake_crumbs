// // src/pages/OccasionProducts.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom"; 
// import axios from "axios";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const OccasionProducts = () => {
//   const { occasionId } = useParams();
//   const [products, setProducts] = useState([]);
//   const [occasionName, setOccasionName] = useState("");

//   const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

//   // ---------- Styles ----------
//   const primaryPink = "#ff4c8a";
//   const secondaryPink = "#b23a7e";

//   const cardBgStyle = {
//     // Matches the soft white/pink gradient background and subtle shadow
//     background:
//       "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,240,240,0.95) 100%)",
//     boxShadow:
//       "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
//   };

//   const buttonStyle = {
//     // FIX: Using template literals with backticks for the background value
//     background: `linear-gradient(90deg, ${primaryPink} 0%, ${secondaryPink} 100%)`,
//     boxShadow: "0 4px 8px rgba(178, 58, 126, 0.2)",
//     padding: "10px 0",
//   };

//   const tagStyle = {
//     // Matches the light tags with pink border and text
//     border: "1px solid #f5c0d0", 
//     color: primaryPink,
//     backgroundColor: "#fff5f8",
//   };

//   const priceColor = {
//     color: secondaryPink
//   };


//   // ---------- Fetch products ----------
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(
//           `${API}/api/admin/products/by-occasion/${occasionId}`
//         );
//         setProducts(res.data.products || []);
//         if (res.data.products?.length > 0) {
//           setOccasionName(res.data.products[0].occasion?.name);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchProducts();
//   }, [occasionId, API]);

//   return (
//     <>
//       <Header />

//       <div className="p-8 min-h-screen">
//         <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-3 border-pink-100">
//           {occasionName || "Occasion"} Cakes
//         </h1>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {products.length === 0 && (
//             <p className="text-gray-500 col-span-full text-center py-10">
//               No products found for this occasion.
//             </p>
//           )}

//           {products.map((p) => {
//             // Get the smallest size/price for display
//             const smallestSize =
//               p.sizes?.sort((a, b) => a.price - b.price)[0] || {
//                 size: "N/A",
//                 price: "N/A",
//               };

//             return (
//               <Link
//                 key={p._id}
//                 to={`/products/${p._id}`} // Assuming a product detail route
//                 className="rounded-2xl overflow-hidden block hover:shadow-xl transition cursor-pointer"
//                 style={cardBgStyle}
//               >
//                 {/* Image Area */}
//                 <div className="relative h-64 bg-pink-50">
//                   <img
//                     src={p.image ? `${API}${p.image}` : "/placeholder.png"}
//                     alt={p.name}
//                     className="w-full h-full object-cover"
//                   />

//                   {/* Badge (Top Left) - Matches the image style */}
//                   <span className="absolute top-3 left-3 bg-white text-pink-700 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
//                     {p.occasion?.name}
//                   </span>

//                   {/* Heart Icon (Top Right) - Matches the image style */}
//                   <button 
//                     type="button" 
//                     className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-105 transition"
//                     onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log("Added to Wishlist"); }}
//                   >
//                     {/* SVG for the Heart icon */}
//                     <svg 
//                       xmlns="http://www.w3.org/2000/svg" 
//                       width="18" 
//                       height="18" 
//                       viewBox="0 0 24 24" 
//                       fill="none" 
//                       stroke={primaryPink} 
//                       strokeWidth="2" 
//                       strokeLinecap="round" 
//                       strokeLinejoin="round"
//                     >
//                       <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
//                     </svg>
//                   </button>
//                 </div>

//                 {/* Info */}
//                 <div className="p-4 flex flex-col">
//                   {/* Product Title */}
//                   <h3 className="font-semibold text-lg text-gray-800 leading-snug">{p.name}</h3>
//                   
//                   {/* Occasion (subtext, matching image) */}
//                   <p className="text-sm text-gray-500 mb-3 font-medium">
//                     {p.occasion?.name}
//                   </p>

//                   {/* Flavours/Tags */}
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {p.flavours?.slice(0, 2).map((f) => (
//                       <span
//                         key={f._id}
//                         className="px-3 py-1 text-xs rounded font-medium"
//                         style={tagStyle}
//                       >
//                         {f.name}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Size, Price, and Button Footer */}
//                   <div className="mt-auto border-t pt-4 border-pink-100">
//                     <div className="flex justify-between items-center mb-4">
//                       <span className="text-sm text-gray-700 font-medium">
//                         {smallestSize.size}
//                       </span>
//                       <span className="text-xl font-bold" style={priceColor}>
//                         ₹{smallestSize.price}
//                       </span>
//                     </div>

//                     {/* Order Button */}
//                     <button
//                       type="button"
//                       className="w-full text-white rounded-lg font-semibold transition-opacity hover:opacity-90"
//                       style={buttonStyle}
//                     >
//                       Order Now
//                     </button>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default OccasionProducts;


import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarFilters from "../components/SidebarFilter";
import { Heart, ShoppingBag, Eye, Loader2 } from "lucide-react";

const OccasionProducts = () => {
  const { occasionId } = useParams();
  const [products, setProducts] = useState([]);
  const [occasionName, setOccasionName] = useState("");
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";
  const primaryPink = "#d84e6d"; 

  const fetchProducts = useCallback(async (activeFilters = {}) => {
    try {
      setLoading(true);
      const query = new URLSearchParams(activeFilters).toString();
      const url = `${API}/api/admin/products/by-occasion/${occasionId}${query ? `?${query}` : ""}`;
      const res = await axios.get(url);
      setProducts(res.data.products || []);
      setOccasionName(res.data.products[0]?.occasion?.name || "Special Collection");
    } catch (err) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [API, occasionId]);

  useEffect(() => {
    fetchProducts({});
  }, [occasionId, fetchProducts]);

  return (
    <div className="bg-[#fdfbfb] min-h-screen">
      <Header />
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8 flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <SidebarFilters onFilter={(filters) => fetchProducts(filters)} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6 px-2">
            <h1 className="text-xl font-bold text-gray-800 uppercase tracking-tight">
              {occasionName}
            </h1>
            <p className="text-xs text-gray-400 font-medium bg-white px-3 py-1 rounded-full border border-gray-100">
              {products.length} Products
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-pink-400 w-8 h-8" />
            </div>
          ) : (
            /* Updated Grid: Forced 4 columns on desktop */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((p) => {
                const smallestSize = [...(p.sizes || [])].sort((a, b) => a.price - b.price)[0] || { price: 0 };

                return (
                  <div key={p._id} className="bg-white rounded-[30px] p-3 shadow-sm hover:shadow-md transition-all group flex flex-col">
                    
                    {/* Image Container - Square Aspect */}
                    <div className="relative aspect-square mb-3 overflow-hidden rounded-[22px] bg-[#f9f9f9]">
                      {/* Badge */}
                      <div className="absolute top-3 left-3 z-10 bg-[#d84e6d] text-[9px] font-bold text-white px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-sm">
                        {p.occasion?.name || "Graduation"}
                      </div>

                      {/* Wishlist */}
                      <button className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-sm hover:scale-110 transition-transform text-pink-400">
                        <Heart size={16} strokeWidth={2.5} />
                      </button>

                      <Link to={`/products/${p._id}`} className="block w-full h-full">
                        <img
                          src={p.image ? `${API}${p.image}` : "/placeholder.png"}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                    </div>

                    {/* Content Section */}
                    <div className="px-1 flex flex-col flex-grow">
                      {/* Fixed height title keeps cards aligned */}
                      <div className="min-h-[42px] mb-2">
                        <h3 className="text-[14px] font-semibold text-gray-800 leading-tight line-clamp-2">
                          {p.name}
                        </h3>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        {/* Smaller Price */}
                        <div className="text-[#d84e6d] font-bold text-lg">
                          ₹{smallestSize.price.toLocaleString()}
                        </div>

                        <div className="flex gap-1.5">
                          <Link
                            to={`/products/${p._id}`}
                            className="p-2 rounded-xl border border-gray-100 text-pink-300 hover:bg-gray-50 transition-colors"
                          >
                            <Eye size={18} strokeWidth={2.5} />
                          </Link>
                          <button
                            className="p-2 rounded-xl text-white shadow-lg shadow-pink-100 active:scale-95 transition-all"
                            style={{ backgroundColor: primaryPink }}
                          >
                            <ShoppingBag size={18} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default OccasionProducts;