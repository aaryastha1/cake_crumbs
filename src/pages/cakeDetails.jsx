import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/SidebarFilter";
import { useCart } from "../context/cartContext";
import { Heart, Loader2, Minus, Plus, X, ShoppingBag } from "lucide-react";

const CakeDetails = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [cakeMessage, setCakeMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";
  const primaryColor = "#f0447c"; 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/admin/products/${productId}`);
        const fetchedProduct = res.data.product;
        setProduct(fetchedProduct);

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
      </div>
    );
  }

  if (!product) return <p className="p-10 text-center">Cake not found.</p>;

  const selectedSizeObject = product.sizes?.find(s => s._id === selectedSize) || product.sizes?.[0] || { price: 0, size: "Standard" };

  const handleAddToCart = async () => {
    const sizeName = selectedSizeObject.size || "Standard";
    await addToCart(product._id, sizeName, quantity, "Product", cakeMessage);
  };

  const handleBuyNow = async () => {
    const sizeName = selectedSizeObject.size || "Standard";
    await addToCart(product._id, sizeName, quantity, "Product", cakeMessage);
    navigate("/checkout");
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Content */}
      <div className="blur-sm pointer-events-none opacity-50">
        <Header />
        <div className="p-8 flex gap-8">
            <Sidebar onFilter={() => {}} />
            <div className="flex-1 h-screen bg-gray-100 rounded-3xl" />
        </div>
      </div>

      {/* Main Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px] p-4">
        {/* Adjusted: max-w-3xl instead of 4xl, rounded-3xl instead of 2.5rem */}
        <div className="bg-white w-full max-w-3xl rounded-[1.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative animate-in fade-in zoom-in duration-300">
          
          {/* Close Button */}
          <button 
            onClick={() => navigate(-1)}
            className="absolute right-4 top-4 z-10 p-1.5 bg-white rounded-full shadow-md text-gray-400 hover:text-black transition"
          >
            <X size={18} />
          </button>

          {/* LEFT SIDE: Image (Reduced width ratio slightly) */}
          <div className="w-full md:w-[45%] relative h-[300px] md:h-auto">
            <img
              src={product.image ? `${API}${product.image}` : "/placeholder.png"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button className="absolute top-4 left-4 p-1.5 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition">
              <Heart size={18} />
            </button>
          </div>

          {/* RIGHT SIDE: Details (Reduced padding from p-12 to p-6) */}
          <div className="w-full md:w-[55%] p-6 md:p-8 flex flex-col">
            <h1 className="text-2xl font-bold text-[#1a202c] leading-tight">{product.name}</h1>
            <p className="text-gray-500 mt-1 text-xs leading-relaxed line-clamp-2">{product.description}</p>

            <div className="mt-4 text-2xl font-bold text-[#d53161]">
              Rs {selectedSizeObject.price.toLocaleString()}
            </div>

            {/* Sizes Selection (Condensed spacing) */}
            <div className="mt-4">
              <label className="text-[9px] font-bold text-gray-800 uppercase tracking-widest">Cake Size</label>
              <div className="flex gap-2 mt-2">
                {product.sizes?.map((size) => (
                  <button
                    key={size._id}
                    onClick={() => setSelectedSize(size._id)}
                    className={`flex-1 py-2 px-1 border rounded-lg transition-all text-center ${
                      selectedSize === size._id 
                      ? "border-[#f0447c] bg-[#fff5f8] ring-1 ring-[#f0447c]" 
                      : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`text-[10px] font-bold ${selectedSize === size._id ? "text-[#f0447c]" : "text-gray-700"}`}>
                      {size.size}
                    </div>
                    <div className="text-[8px] text-gray-500">Rs {size.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Flavor Select (Reduced height) */}
            <div className="mt-4">
              <label className="text-[9px] font-bold text-gray-800 uppercase tracking-widest">Select Flavor</label>
              <select
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-white text-xs focus:outline-none appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "0.8em" }}
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
              >
                {product.flavours?.map(flavor => (
                  <option key={flavor._id} value={flavor._id}>{flavor.name}</option>
                ))}
              </select>
            </div>

            {/* Message Input (Reduced height) */}
            <div className="mt-4">
              <label className="text-[9px] font-bold text-gray-800 uppercase tracking-widest">Message on Cake</label>
              <input
                type="text"
                placeholder="Happy Birthday Alex..."
                className="w-full mt-1 p-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-pink-200"
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
              />
            </div>

            {/* Quantity (Reduced size) */}
            <div className="mt-4">
              <label className="text-[9px] font-bold text-gray-800 uppercase tracking-widest">Quantity</label>
              <div className="flex items-center mt-1 border border-gray-200 rounded-lg w-fit">
                <button className="p-1.5 px-2 text-gray-400 hover:text-black transition" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center font-bold text-xs">{quantity}</span>
                <button className="p-1.5 px-2 text-gray-400 hover:text-black transition" onClick={() => setQuantity(q => q + 1)}>
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons (Condensed padding and text) */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddToCart}
                className="flex-[1.5] bg-[#f0447c] text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-md hover:bg-[#d6336a] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={14} />
                Add to Bag
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-[#1a202c] text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeDetails;