// src/pages/BakeryProducts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Heart, Star, Timer } from "lucide-react"; // Matching icons from UI

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

const BakeryProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

  useEffect(() => {
    const fetchBakeryProducts = async () => {
      setLoading(true);
      try {
        let url = `${API}/api/admin/bakery`;
        if (categoryId) {
          url += `/category/${categoryId}`;
        }
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching bakery products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBakeryProducts();
  }, [categoryId]);

  return (
    <div className="bg-[#FAF7F6] min-h-screen font-sans">
      <Header />

      <div className="max-w-7xl mx-auto p-6 lg:px-12">
        {loading ? (
          <div className="min-h-[60vh] flex items-center justify-center text-gray-400 font-medium">
            Loading delicious items...
          </div>
        ) : products.length === 0 ? (
          <div className="min-h-[60vh] flex items-center justify-center text-gray-400 font-medium">
            No bakery items available.
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
                {products[0]?.category?.name || "Our Bakery"}
              </h1>
              <p className="text-gray-400 text-sm font-medium">Freshly baked every single day</p>
            </div>

            {/* Same size grid pattern as image_677b0b.jpg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-50"
                >
                  {/* Image Container with Badges */}
                  <div className="relative h-60 overflow-hidden">
                    {item.image ? (
                      <img
                        src={`${API}${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                        No Image
                      </div>
                    )}

                    {/* Floating Badges matching UI */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm">
                        New
                      </span>
                      <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Star size={10} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-[10px] font-black text-gray-800">4.8</span>
                      </div>
                    </div>

                    {/* Heart Icon */}
                    <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-rose-500 transition-colors shadow-sm">
                      <Heart size={18} />
                    </button>
                  </div>

                  {/* Content Area */}
                  <div className="p-6">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                      {item.category?.name || "Pastries"}
                    </span>
                    <h2 className="text-lg font-bold text-gray-800 leading-tight mb-3">
                      {item.name}
                    </h2>

                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-rose-500 font-black text-xl tracking-tighter">
                          Rs {item.price}
                        </span>
                      </div>
                      
                      {/* Delivery Time Tag matching UI */}
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Timer size={14} className="text-indigo-400" />
                        <span className="text-[11px] font-bold">30 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BakeryProducts;