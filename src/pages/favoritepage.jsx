import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFavorites } from "../context/favoriteContext";

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

  const safeFavorites = Array.isArray(favorites) ? favorites : [];

  return (
    <div className="min-h-screen bg-[#FAF7F6]">
      <Header />

      <div className="max-w-[1200px] mx-auto p-6">
        <h1 className="text-2xl font-black mb-6">My Favorites ❤️</h1>

        {safeFavorites.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <Heart size={40} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-semibold">No favorite products yet</p>
            <p className="text-sm mt-2">Tap the heart on a product to add it</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {safeFavorites.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image ? `${API}${product.image}` : "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>

                <div className="p-4">
                  <h2 className="font-bold text-sm mb-2 truncate">
                    {product.name}
                  </h2>

                  <div className="flex justify-between items-center">
                    <span className="text-[#E24C63] font-black">
                      Rs {product.price}
                    </span>

                    <button
                      onClick={() => toggleFavorite(product._id)}
                      className="p-1 rounded-full hover:bg-gray-100 transition"
                    >
                      <Heart size={18} color="red" fill="red" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
