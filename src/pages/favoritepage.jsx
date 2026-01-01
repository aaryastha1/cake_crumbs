import React from "react";
import { Heart, ShoppingBag, Trash2, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFavorites } from "../context/favoriteContext";
import { useCart } from "../context/cartContext";

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  
  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";
  const safeFavorites = Array.isArray(favorites) ? favorites : [];

  const handleRemove = (product) => {
    toggleFavorite(product._id);
    toast.success(`${product.name} removed`, {
      icon: '🗑️',
      style: {
        borderRadius: '16px',
        background: '#2D3E50',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
      },
    });
  };

  const handleAddToCartAndNavigate = async (product) => {
    // 1. Check for token to prevent 401 redirect to home
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to shop");
      navigate("/login");
      return;
    }

    // 2. Identify Item Type (Product vs Bakery)
    // Products usually have a sizes array, Bakery items usually have a direct price
    const isBakery = product.itemType === "Bakery" || !product.sizes || product.sizes.length === 0;
    const itemType = isBakery ? "Bakery" : "Product";

    // 3. Set Default Values to prevent 400 Bad Request
    const selectedSize = isBakery ? "" : (product.sizes[0]?.size || "Standard");
    const displayPrice = isBakery ? (product.price || 0) : (product.sizes[0]?.price || 0);

    try {
      // 4. Call context addToCart
      await addToCart(
        product._id,
        selectedSize,
        1,
        itemType,
        displayPrice,
        product.name
      );

      // 5. Success UI
      toast.success('Added to Bag!', {
        icon: <CheckCircle size={18} className="text-green-400" />,
        style: { borderRadius: '20px', padding: '16px' }
      });

      // 6. Interaction
      setIsCartOpen(true); // Open the side drawer
      
    } catch (err) {
      console.error("Cart Addition Error:", err);
      // If server still returns 401, token might be invalid
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error("Could not add to cart. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F6] font-sans antialiased text-[#2D3E50]">
      <Toaster position="bottom-right" reverseOrder={false} />
      <Header />

      <div className="max-w-[1200px] mx-auto p-6 lg:px-10">
        <div className="mb-10">
          <h1 className="text-3xl font-black tracking-tight uppercase mb-1">
            My <span className="text-[#E24C63]">Favorites</span>
          </h1>
          <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
            Your handpicked selection of treats
          </p>
        </div>

        {safeFavorites.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[40px] shadow-sm border border-dashed border-gray-200">
            <div className="bg-rose-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={32} className="text-[#E24C63]" />
            </div>
            <p className="text-xl font-bold text-slate-800">Your wishlist is empty</p>
            <Link 
              to="/cakes-menu" 
              className="inline-block mt-8 bg-[#E24C63] text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-rose-100 transition-all hover:scale-105"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {safeFavorites.map((product) => {
              const displayPrice = product.price 
                ? product.price 
                : (product.sizes?.[0]?.price || 0);

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-rose-100 relative"
                >
                  <button
                    onClick={() => handleRemove(product)}
                    className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>

                  <Link to={`/product/${product._id}`} className="block relative aspect-[5/4] overflow-hidden">
                    <img
                      src={product.image?.startsWith("http") ? product.image : `${API}${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </Link>

                  <div className="p-5">
                    <span className="text-[9px] font-bold text-[#E24C63] uppercase tracking-[0.2em] block mb-1.5">
                      {product.category?.name || "Premium Treat"}
                    </span>
                    <h2 className="text-[16px] font-black text-slate-800 mb-4 truncate">
                      {product.name}
                    </h2>

                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[#E24C63] font-black text-xl tracking-tighter">
                          Rs {displayPrice}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddToCartAndNavigate(product)}
                        className="bg-slate-900 text-white p-3 rounded-2xl shadow-lg transition-all active:scale-90 hover:bg-black"
                      >
                        <ShoppingBag size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FavoritesPage;