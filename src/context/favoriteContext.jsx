// src/context/favoriteContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext"; // assuming you have this

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { token } = useContext(AuthContext); // token from login
  const [favorites, setFavorites] = useState([]);
  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

  // ✅ Fetch favorites from backend
  const fetchFavorites = useCallback(async () => {
    if (!token) return setFavorites([]);
    try {
      const res = await axios.get(`${API}/api/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(res.data.favorites || []);
    } catch (err) {
      console.error("Fetch favorites error:", err);
      setFavorites([]); // fallback
    }
  }, [token, API]);

  // ✅ Toggle favorite (add/remove)
  const toggleFavorite = async (productId) => {
    if (!token) return alert("Please login to add favorites");

    try {
      const res = await axios.post(
        `${API}/api/favorites/toggle`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavorites(res.data.favorites || []);
    } catch (err) {
      console.error("Toggle favorite error:", err);
    }
  };

  // Load favorites when token changes (login/logout)
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, fetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// ✅ Custom hook for easier access
export const useFavorites = () => useContext(FavoritesContext);
