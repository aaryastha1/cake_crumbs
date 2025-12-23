import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart, X, Minus, Plus } from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";

const BakeryProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

  useEffect(() => {
    const fetchBakeryProducts = async () => {
      setLoading(true);
      try {
        let url = `${API}/api/admin/bakery`;
        if (categoryId) url += `/category/${categoryId}`;
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBakeryProducts();
  }, [categoryId]);

  return (
    <div className="bg-[#FAF7F6] min-h-screen font-sans antialiased text-[#2D3E50]">
      <Header />

      <div className="max-w-[1200px] mx-auto p-6 lg:px-10">
        <div className="mb-8">
          <h1 className="text-2xl font-black tracking-tight uppercase mb-1">
            {products[0]?.category?.name || "PASTRIES"}
          </h1>
          <p className="text-gray-400 text-xs font-medium">Freshly baked every single day</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item._id}
              onClick={() => { setSelectedProduct(item); setQuantity(1); }}
              className="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group border border-transparent hover:border-rose-50"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <img src={`${API}${item.image}`} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#E24C63] text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase">New</span>
                </div>
              </div>
              <div className="p-4">
                <span className="text-[9px] font-bold text-[#E24C63] uppercase tracking-widest block mb-1">Pastries</span>
                <h2 className="text-[15px] font-bold mb-3 truncate">{item.name}</h2>
                <div className="flex justify-between items-center">
                  <span className="text-[#E24C63] font-black text-lg tracking-tight">Rs {item.price}</span>
                  <div className="bg-[#E24C63] text-white p-1.5 rounded-full shadow-md"><ShoppingCart size={14} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Refined & Smaller Modal --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={() => setSelectedProduct(null)} />
          
          <div className="bg-white w-full max-w-[360px] rounded-[28px] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur-md rounded-full p-1.5 shadow-sm hover:bg-white transition-colors border border-gray-100"
            >
              <X size={16} />
            </button>

            {/* Image */}
            <div className="relative h-56">
              <img src={`${API}${selectedProduct.image}`} className="w-full h-full object-cover" alt="" />
              <div className="absolute top-3 left-3">
                <span className="bg-[#E24C63] text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase">New</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <span className="text-[9px] font-bold text-[#E24C63] uppercase tracking-[0.15em] block mb-1">Pastries</span>
              <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
              <p className="text-gray-400 text-[12px] leading-relaxed mb-5">
                Baked with premium ingredients for the perfect artisan texture and flavor.
              </p>

              <div className="text-[#E24C63] font-black text-2xl mb-6">
                Rs {selectedProduct.price}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between mb-6 bg-gray-50 p-2 rounded-2xl">
                <span className="text-gray-500 text-[11px] font-semibold ml-2">Quantity</span>
                <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-100 px-3 py-1 gap-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-[#E24C63]"><Minus size={14} /></button>
                  <span className="font-bold text-sm w-4 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-[#E24C63]"><Plus size={14} /></button>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-[#E24C63] active:scale-95 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-100 text-sm">
                <ShoppingCart size={16} fill="currentColor" />
                <span>Add to Cart — Rs {selectedProduct.price * quantity}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BakeryProducts;