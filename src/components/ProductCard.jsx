
import React from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "../pages/favoriteContext";

const ProductCard = ({ product }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some(fav => fav._id === product._id);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>

      <button onClick={() => toggleFavorite(product._id)}>
        <Heart color={isFavorite ? "red" : "gray"} />
      </button>
    </div>
  );
};

export default ProductCard;
