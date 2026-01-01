import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, X, Minus, Plus, CreditCard, Loader2, Heart } from "lucide-react";
import { useCart } from "../context/cartContext";
import { useFavorites } from "../context/favoriteContext";
import { toast } from "react-hot-toast";

import Header from "../components/Header";
import Footer from "../components/Footer";

const BakeryProducts = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

  const isFavorited = (id) => favorites.some((fav) => fav._id === id);

  useEffect(() => {
    const fetchBakeryProducts = async () => {
      setLoading(true);
      try {
        let url = `${API}/api/admin/bakery`;
        if (categoryId) url += `/category/${categoryId}`;
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bakery products");
      } finally {
        setLoading(false);
      }
    };
    fetchBakeryProducts();
  }, [categoryId, API]);

  // Reusable function for adding to cart
  const handleQuickAdd = async (e, product) => {
    e.stopPropagation(); // Prevents opening the modal
    try {
      await addToCart(
        product._id,
        "",
        1,
        "Bakery",
        product.price,
        product.name
      );
      toast.success(`${product.name} added to Bag!`);
      setIsCartOpen(true);
    } catch (error) {
      toast.error("Could not add to cart");
    }
  };

  const handleAddToCart = async () => {
    if (!selectedProduct) return;
    try {
      await addToCart(
        selectedProduct._id,
        "",
        quantity,
        "Bakery",
        selectedProduct.price,
        selectedProduct.name
      );
      toast.success("Added to Bag!");
      setIsCartOpen(true);
      setSelectedProduct(null);
      setQuantity(1);
    } catch {
      toast.error("Could not add to cart");
    }
  };

  const handleBuyNow = () => {
    if (!selectedProduct) return;
    navigate("/checkout", {
      state: {
        buyNowProduct: {
          _id: selectedProduct._id,
          name: selectedProduct.name,
          image: selectedProduct.image,
          price: selectedProduct.price,
          quantity: quantity,
          type: "Bakery",
        },
      },
    });
    setSelectedProduct(null);
    setQuantity(1);
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-[#E24C63]" />
    </div>
  );

  return (
    <div className="bg-[#FAF7F6] min-h-screen font-sans">
      <Header />

      <div className="max-w-[1200px] mx-auto p-6 lg:px-10">
        <h1 className="text-2xl font-black mb-6 uppercase tracking-tight">
          {products[0]?.category?.name || "Bakery Items"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(item => (
            <div
              key={item._id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-transparent hover:border-rose-50 transition-all relative"
            >
              {/* FAVORITE BUTTON */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item._id);
                }}
                className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-sm hover:scale-110 transition-all"
              >
                <Heart 
                  size={16} 
                  fill={isFavorited(item._id) ? "#E24C63" : "none"} 
                  className={isFavorited(item._id) ? "text-[#E24C63]" : "text-gray-400"}
                />
              </button>

              <div onClick={() => { setSelectedProduct(item); setQuantity(1); }} className="cursor-pointer">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <img
                    src={item.image.startsWith("http") ? item.image : `${API}${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-slate-800 font-bold text-sm truncate mb-1">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-[#E24C63] font-black text-lg">Rs {item.price}</span>
                    
                    {/* UPDATED QUICK ADD TO CART ICON */}
                    <button 
                      onClick={(e) => handleQuickAdd(e, item)}
                      className="bg-[#E24C63] text-white p-2 rounded-full shadow-md hover:bg-[#d13a51] active:scale-95 transition-all"
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          
          <div className="bg-white w-full max-w-[360px] rounded-[28px] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-gray-100 hover:bg-white transition-colors"
            >
              <X size={16} />
            </button>

            <button
              onClick={() => toggleFavorite(selectedProduct._id)}
              className="absolute top-3 left-3 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-110 transition-all"
            >
              <Heart 
                size={18} 
                fill={isFavorited(selectedProduct._id) ? "#E24C63" : "none"} 
                className={isFavorited(selectedProduct._id) ? "text-[#E24C63]" : "text-gray-400"}
              />
            </button>

            <div className="relative p-2">
              <img
                src={selectedProduct.image.startsWith("http") ? selectedProduct.image : `${API}${selectedProduct.image}`}
                alt={selectedProduct.name}
                className="w-full h-56 object-cover rounded-[20px]"
              />
            </div>

            <div className="px-6 pb-6 pt-1">
              <span className="text-[#E24C63] text-[10px] font-bold uppercase tracking-[0.2em] mb-1 block">
                {selectedProduct.category?.name || "Bakery"}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mb-1 leading-tight">
                {selectedProduct.name}
              </h2>
              <p className="text-gray-400 text-xs leading-relaxed mb-4 font-medium">
                Freshly baked with premium ingredients for the perfect flavor.
              </p>

              <div className="mb-4">
                <span className="text-[#E24C63] font-serif italic text-3xl">
                  Rs {selectedProduct.price * quantity}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-slate-800 text-xs font-bold">Quantity:</span>
                <div className="flex items-center bg-[#F3F4F6] rounded-full px-4 py-1.5 gap-6">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-400 hover:text-slate-900 transition-colors"
                  >
                    <Minus size={14} strokeWidth={3} />
                  </button>
                  <span className="font-bold text-slate-900 text-base w-3 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-400 hover:text-slate-900 transition-colors"
                  >
                    <Plus size={14} strokeWidth={3} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#E24C63] text-white py-3 rounded-xl font-bold text-sm flex justify-center items-center gap-2 hover:bg-[#d13a51] transition-all shadow-lg shadow-rose-100"
                >
                  <ShoppingCart size={16} />
                  Add to Bag — Rs {selectedProduct.price * quantity}
                </button>
                
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#A3A3A3] text-white py-3 rounded-xl font-bold text-sm flex justify-center items-center gap-2 hover:bg-slate-500 transition-all"
                >
                  <CreditCard size={16} />
                  Buy It Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BakeryProducts;