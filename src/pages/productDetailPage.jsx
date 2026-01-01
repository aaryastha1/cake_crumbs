import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/cartContext";
import { ShoppingBag, Minus, Plus, Loader2, Heart } from "lucide-react";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        let currentProd = null;
        let type = "Product";

        try {
          const res = await axios.get(`${API}/api/admin/products/${productId}`);
          currentProd = res.data.product;
        } catch (err) {
          const bakeryRes = await axios.get(`${API}/api/admin/bakery`);
          currentProd = bakeryRes.data.find((item) => item._id === productId);
          type = "Bakery";
        }

        if (!currentProd) {
          setLoading(false);
          return;
        }

        setProduct({ ...currentProd, itemType: type });

        if (type === "Bakery") {
          const catId = currentProd.category?._id || currentProd.category;
          if (catId) {
            const relRes = await axios.get(`${API}/api/admin/bakery/related/${productId}/${catId}`);
            setRelated(relRes.data.slice(0, 4));
          }
        } else {
          const occasionId = currentProd.occasion?._id || currentProd.occasion;
          if (occasionId) {
            const relRes = await axios.get(`${API}/api/admin/products/related/${occasionId}`);
            setRelated(relRes.data.products.filter((p) => p._id !== productId).slice(0, 4));
          }
        }
        window.scrollTo(0, 0);
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [productId, API]);

  const handleAddToBag = async () => {
    // 1. Check for Login Token
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to your bag", {
        style: { borderRadius: '16px', background: '#2D3E50', color: '#fff' }
      });
      return;
    }

    const price = product.itemType === "Bakery" ? product.price : (product.sizes?.[0]?.price || 0);
    const size = product.itemType === "Product" ? (product.sizes?.[0]?.size || "Standard") : "";

    try {
      // 2. Execute Add to Cart Context function
      await addToCart(
        product._id,
        size,
        quantity,
        product.itemType,
        price,
        product.name
      );

      // 3. Success Feedback (Stay on Page)
      toast.success(`${product.name} added to bag!`, {
        icon: '🍰',
        style: { borderRadius: '16px', background: '#2D3E50', color: '#fff' }
      });

      // 4. Open the Drawer so the user stays here but sees the update
      setIsCartOpen(true);

    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Could not add to cart");
      }
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-pink-500" /></div>;
  if (!product) return <div className="p-20 text-center">Product Not Found</div>;

  const displayPrice = product.itemType === "Bakery" 
    ? product.price 
    : (product.sizes?.[0]?.price || 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFC]">
      <Toaster position="bottom-right" />
      <Header />

      <div className="flex-grow max-w-6xl mx-auto px-6 py-12 w-full">
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            
            <div className="p-6">
              <div className="relative rounded-[24px] overflow-hidden group bg-gray-50">
                <img
                  src={product.image?.startsWith("http") ? product.image : `${API}${product.image}`}
                  alt={product.name}
                  className="w-full h-[400px] object-cover"
                />
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full text-gray-400 hover:text-pink-500 shadow-sm transition-colors">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            <div className="p-8 md:pl-4">
              <div className="mb-3">
                <span className="bg-pink-50 text-pink-500 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                  {product.occasion?.name || product.category?.name || "Bakery"}
                </span>
              </div>

              <h1 className="text-3xl font-black text-pink-500 mb-4 tracking-tight">
                {product.name}
              </h1>

              <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md font-medium">
                {product.description || "Freshly prepared with the finest ingredients. A classic treat featuring premium layers and rich flavors."}
              </p>

              <div className="text-2xl font-black text-gray-900 mb-8">
                Rs {displayPrice}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl p-2 h-[60px]">
                  <button 
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white transition-all active:scale-90"
                  >
                    <Minus size={24} strokeWidth={4} color="#000000" />
                  </button>
                  <span className="w-12 text-center font-black text-black text-xl">{quantity}</span>
                  <button 
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white transition-all active:scale-90"
                  >
                    <Plus size={24} strokeWidth={4} color="#000000" />
                  </button>
                </div>

                <button
                  onClick={handleAddToBag}
                  className="flex-grow bg-pink-500 text-white h-[56px] rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-pink-600 transition-all active:scale-95 shadow-lg shadow-pink-100"
                >
                  <ShoppingBag size={20} strokeWidth={2.5} />
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Items */}
        {related.length > 0 && (
          <div className="pt-8">
            <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Related Items</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((item) => {
                const itemPrice = item.itemType === "Bakery" ? item.price : item.sizes?.[0]?.price;
                return (
                  <Link key={item._id} to={`/product/${item._id}`} className="group block">
                    <div className="bg-white p-3 rounded-[24px] border border-gray-50 hover:shadow-md transition-all">
                      <div className="rounded-[18px] overflow-hidden mb-3">
                        <img
                          src={item.image?.startsWith("http") ? item.image : `${API}${item.image}`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          alt={item.name}
                        />
                      </div>
                      <div className="px-1">
                        <h3 className="font-bold text-gray-800 text-xs truncate uppercase tracking-wide">{item.name}</h3>
                        <p className="text-pink-600 font-black text-sm mt-1">Rs {itemPrice}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;