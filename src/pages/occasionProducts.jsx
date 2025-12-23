import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SidebarFilters from "../components/SidebarFilter";
import { Heart, ShoppingBag, Eye, Loader2 } from "lucide-react";
import { useFavorites } from "../context/favoriteContext"; // ✅ Import Favorites Context

const OccasionProducts = () => {
  const { occasionId } = useParams();
  const [products, setProducts] = useState([]);
  const [occasionName, setOccasionName] = useState("");
  const [loading, setLoading] = useState(true);

  const { favorites, toggleFavorite } = useFavorites(); // ✅ Use context

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((p) => {
                const smallestSize = [...(p.sizes || [])].sort((a, b) => a.price - b.price)[0] || { price: 0 };

                // ✅ Check if this product is in favorites
                const isLiked = favorites.some(fav => fav._id === p._id);

                return (
                  <div key={p._id} className="bg-white rounded-[30px] p-3 shadow-sm hover:shadow-md transition-all group flex flex-col">
                    
                    {/* Image Container */}
                    <div className="relative aspect-square mb-3 overflow-hidden rounded-[22px] bg-[#f9f9f9]">
                      <div className="absolute top-3 left-3 z-10 bg-[#d84e6d] text-[9px] font-bold text-white px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-sm">
                        {p.occasion?.name || "Special"}
                      </div>

                      {/* ✅ Heart Button */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(p._id); // ✅ Add/remove from backend & context
                        }}
                        className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-sm hover:scale-110 transition-transform"
                      >
                        <Heart 
                          size={16} 
                          strokeWidth={2.5} 
                          fill={isLiked ? "#ff0000" : "none"} 
                          className={isLiked ? "text-red-600" : "text-pink-400"} 
                        />
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
                      <div className="min-h-[42px] mb-2">
                        <h3 className="text-[14px] font-semibold text-gray-800 leading-tight line-clamp-2">
                          {p.name}
                        </h3>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
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
