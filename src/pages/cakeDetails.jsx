// src/pages/CakeDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/SidebarFilter";
import { Heart, ShoppingCart, Loader2, Minus, Plus, Phone } from "lucide-react";

const CakeDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [cakeMessage, setCakeMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";
  const primaryColor = "#ff4c8a"; // Main pink/red
  const secondaryColor = "#b23a7e"; // Deep pink

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/admin/products/${productId}`);
        const fetchedProduct = res.data.product;
        setProduct(fetchedProduct);

        // Auto-select smallest size & first flavor
        if (fetchedProduct.sizes?.length) {
          const smallest = [...fetchedProduct.sizes].sort((a, b) => a.price - b.price)[0];
          setSelectedSize(smallest._id);
        }
        if (fetchedProduct.flavours?.length) {
          setSelectedFlavor(fetchedProduct.flavours[0]._id);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, API]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin text-pink-500 w-8 h-8" />
        <p className="ml-2 text-pink-500">Loading cake details...</p>
      </div>
    );
  }

  if (!product) return <p className="p-10 text-center">Cake not found.</p>;

  const selectedSizeObject = product.sizes?.find(s => s._id === selectedSize) || product.sizes?.[0] || { price: 0, size: "N/A" };
  const currentPrice = selectedSizeObject.price * quantity;

  const handleAddToCart = () => {
    console.log({
      product: product.name,
      size: selectedSizeObject.size,
      flavor: product.flavours.find(f => f._id === selectedFlavor)?.name || 'N/A',
      message: cakeMessage,
      quantity,
      price: currentPrice
    });
    alert(`Added ${product.name} (${selectedSizeObject.size}) to cart!`);
  };

  return (
    <>
      <Header />
      <div className="p-8 min-h-screen flex gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <Sidebar onFilter={() => {}} />
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 bg-white p-6 rounded-2xl shadow-xl">
            
            {/* Left: Image */}
            <div className="w-full lg:w-1/2 relative">
              <img
                src={product.image ? `${API}${product.image}` : "/placeholder.png"}
                alt={product.name}
                className="w-full h-auto rounded-xl shadow-2xl object-cover"
              />
              <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-pink-50 transition">
                <Heart color={primaryColor} size={24} fill="#fdd2e1" />
              </button>
            </div>

            {/* Right: Details */}
            <div className="w-full lg:w-1/2 p-4">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>
                Rs {currentPrice}
              </p>
              <p className="text-gray-600 mb-6 border-b pb-4">
                {product.description || "A custom-designed cake for special events."}
              </p>

              {/* Customization */}
              <div className="space-y-6">
                {/* Cake Size */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">Cake Size:</label>
                  <select
                    className="w-full p-3 border rounded-lg appearance-none bg-white cursor-pointer focus:ring-pink-500 focus:border-pink-500 transition"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    style={{ borderColor: primaryColor + '40' }}
                  >
                    {product.sizes?.map(size => (
                      <option key={size._id} value={size._id}>
                        {size.size} - ₹{size.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Flavor */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">Select Flavor:</label>
                  <select
                    className="w-full p-3 border rounded-lg appearance-none bg-white cursor-pointer focus:ring-pink-500 focus:border-pink-500 transition"
                    value={selectedFlavor}
                    onChange={(e) => setSelectedFlavor(e.target.value)}
                    style={{ borderColor: primaryColor + '40' }}
                  >
                    {product.flavours?.map(flavor => (
                      <option key={flavor._id} value={flavor._id}>
                        {flavor.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cake Message */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">Cake Message:</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:ring-pink-500 focus:border-pink-500 transition"
                    placeholder="E.g., Happy Birthday"
                    value={cakeMessage}
                    onChange={(e) => setCakeMessage(e.target.value)}
                    maxLength={50}
                    style={{ borderColor: primaryColor + '40' }}
                  />
                  <p className="text-sm text-gray-400 mt-1">Max 50 characters</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                {/* Quantity */}
                <div className="flex items-center border rounded-xl shadow-inner" style={{ borderColor: primaryColor + '40' }}>
                  <button
                    className="p-3 text-gray-600 hover:bg-pink-50 rounded-l-xl transition"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="p-3 font-bold w-10 text-center text-lg">{quantity}</span>
                  <button
                    className="p-3 text-gray-600 hover:bg-pink-50 rounded-r-xl transition"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  className="flex-1 text-white py-3 px-6 font-bold transition hover:opacity-90 flex items-center justify-center text-lg rounded-xl"
                  style={{
                    background: `linear-gradient(90deg, ${primaryColor} 0%, #ff7e8c 100%)`,
                    boxShadow: "0 8px 20px rgba(255, 76, 138, 0.4)"
                  }}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={22} className="mr-2" /> ADD TO CART
                </button>
              </div>

              {/* Order Now */}
            
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CakeDetails;



