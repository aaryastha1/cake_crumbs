// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import Sidebar from "../components/SidebarFilter";
// import { useCart } from "../context/cartContext";
// import { Heart, Loader2, Minus, Plus, X, ShoppingBag } from "lucide-react";

// const CakeDetails = () => {
//   const { productId } = useParams();
//   const { addToCart, setIsCartOpen } = useCart(); // Added setIsCartOpen to control drawer
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedFlavor, setSelectedFlavor] = useState('');
//   const [cakeMessage, setCakeMessage] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   const API = import.meta.env.VITE_API_URL || "http://localhost:5006";
//   const primaryColor = "#f0447c"; 

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${API}/api/admin/products/${productId}`);
//         const fetchedProduct = res.data.product;
//         setProduct(fetchedProduct);

//         if (fetchedProduct.sizes?.length) {
//           const smallest = [...fetchedProduct.sizes].sort((a, b) => a.price - b.price)[0];
//           setSelectedSize(smallest._id);
//         }
//         if (fetchedProduct.flavours?.length) {
//           setSelectedFlavor(fetchedProduct.flavours[0]._id);
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [productId, API]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader2 className="animate-spin text-pink-500 w-8 h-8" />
//       </div>
//     );
//   }

//   if (!product) return <p className="p-10 text-center">Cake not found.</p>;

//   const selectedSizeObject = product.sizes?.find(s => s._id === selectedSize) || product.sizes?.[0] || { price: 0, size: "Standard" };

//   const handleAddToCart = async () => {
//     const sizeName = selectedSizeObject.size || "Standard";
//     await addToCart(product._id, sizeName, quantity, "Product", cakeMessage);
//   };

//   const handleBuyNow = async () => {
//     const sizeName = selectedSizeObject.size || "Standard";
//     // 1. Add to cart first
//     await addToCart(product._id, sizeName, quantity, "Product", cakeMessage);

//     // 2. Explicitly close the cart drawer so it doesn't pop up
//     if (setIsCartOpen) setIsCartOpen(false);

//     // 3. Navigate directly to checkout
//     navigate("/checkout");
//   };

//   return (
//     <div className="relative min-h-screen">
//       {/* Background Content */}
//       <div className="blur-sm pointer-events-none opacity-50">
//         <Header />
//         <div className="p-8 flex gap-8">
//             <Sidebar onFilter={() => {}} />
//             <div className="flex-1 h-screen bg-gray-100 rounded-3xl" />
//         </div>
//       </div>

//       {/* Main Modal Overlay */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px] p-4">
//         <div className="bg-white w-full max-w-3xl rounded-[1.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative animate-in fade-in zoom-in duration-300">

//           {/* Close Button */}
//           <button 
//             onClick={() => navigate(-1)}
//             className="absolute right-4 top-4 z-10 p-1.5 bg-white rounded-full shadow-md text-gray-400 hover:text-black transition"
//           >
//             <X size={18} />
//           </button>

//           {/* LEFT SIDE: Image */}
//           <div className="w-full md:w-[45%] relative h-[300px] md:h-auto">
//             <img
//               src={product.image ? `${API}${product.image}` : "/placeholder.png"}
//               alt={product.name}
//               className="w-full h-full object-cover"
//             />
//             <button className="absolute top-4 left-4 p-1.5 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition">
//               <Heart size={18} />
//             </button>
//           </div>

//           {/* RIGHT SIDE: Details */}
//           <div className="w-full md:w-[55%] p-6 md:p-8 flex flex-col">
//             <h1 className="text-2xl font-bold text-[#1a202c] leading-tight">{product.name}</h1>
//             <p className="text-gray-500 mt-1 text-xs leading-relaxed line-clamp-2">{product.description}</p>

//             <div className="mt-4 text-2xl font-bold text-[#d53161]">
//               Rs {selectedSizeObject.price.toLocaleString()}
//             </div>

//             {/* Sizes Selection */}
//             <div className="mt-4">
//               <label className="text-[9px] font-bold text-gray-800 uppercase tracking-widest">Cake Size</label>
//               <div className="flex gap-2 mt-2">
//                 {product.sizes?.map((size) => (
//                   <button
//                     key={size._id}
//                     onClick={() => setSelectedSize(size._id)}
//                     className={`flex-1 py-2 px-1 border rounded-lg transition-all text-center ${
//                       selectedSize === size._id 
//                       ? "border-[#f0447c] bg-[#fff5f8] ring-1 ring-[#f0447c]" 
//                       : "border-gray-200 hover:border-gray-300"
//                     }`}
//                   >
//                     <div className={`text-[10px] font-bold ${selectedSize === size._id ? "text-[#f0447c]" : "text-gray-700"}`}>
//                       {size.size}
//                     </div>
//                     <div className="text-[8px] text-gray-500">Rs {size.price}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Flavor Select */}
//             <div className="mt-4">
//               <label className="text-[9px] font-bold text-gray-800 uppercase tracking-widest">Select Flavor</label>
//               <select
//                 className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-white text-xs focus:outline-none appearance-none"
//                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "0.8em" }}
//                 value={selectedFlavor}
//                 onChange={(e) => setSelectedFlavor(e.target.value)}
//               >
//                 {product.flavours?.map(flavor => (
//                   <option key={flavor._id} value={flavor._id}>{flavor.name}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Message Input */}
//             <div className="mt-4">
//               <label className="text-[9px] font-bold text-gray-800 uppercase tracking-widest">Message on Cake</label>
//               <input
//                 type="text"
//                 placeholder="Happy Birthday Alex..."
//                 className="w-full mt-1 p-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-pink-200"
//                 value={cakeMessage}
//                 onChange={(e) => setCakeMessage(e.target.value)}
//               />
//             </div>

//             {/* Quantity */}
//             <div className="mt-4">
//               <label className="text-[9px] font-bold text-gray-800 uppercase tracking-widest">Quantity</label>
//               <div className="flex items-center mt-1 border border-gray-200 rounded-lg w-fit">
//                 <button className="p-1.5 px-2 text-gray-400 hover:text-black transition" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
//                   <Minus size={14} />
//                 </button>
//                 <span className="w-6 text-center font-bold text-xs">{quantity}</span>
//                 <button className="p-1.5 px-2 text-gray-400 hover:text-black transition" onClick={() => setQuantity(q => q + 1)}>
//                   <Plus size={14} />
//                 </button>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-[1.5] bg-[#f0447c] text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-md hover:bg-[#d6336a] transition-colors flex items-center justify-center gap-2"
//               >
//                 <ShoppingBag size={14} />
//                 Add to Bag
//               </button>
//               <button
//                 onClick={handleBuyNow}
//                 className="flex-1 bg-[#1a202c] text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-colors"
//               >
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CakeDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/cartContext";
import { Heart, Loader2, Minus, Plus, ShoppingBag, ChevronRight } from "lucide-react";
import StarRating from "../components/StarRating";


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

  // ⭐ Reviews & Ratings (ADDED)
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");


  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

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
    window.scrollTo(0, 0);
  }, [productId, API]);

  // ⭐ Fetch reviews (ADDED)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${API}/api/reviews/Product/${productId}`);
        setReviews(res.data);

        const avg =
          res.data.reduce((sum, r) => sum + r.rating, 0) /
          (res.data.length || 1);

        setAvgRating(avg);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };

    fetchReviews();
  }, [productId, API]);


  // ⭐ Submit review (ADDED)
  const submitReview = async () => {
    if (!userRating) return alert("Please select a rating");

    try {
      await axios.post(`${API}/api/reviews`, {
        itemId: productId,
        itemType: "Product",
        userName: "Customer",
        rating: userRating,
        comment: reviewText,
      });

      setUserRating(0);
      setReviewText("");

      const res = await axios.get(`${API}/api/reviews/Product/${productId}`);
      setReviews(res.data);

      const avg =
        res.data.reduce((sum, r) => sum + r.rating, 0) /
        (res.data.length || 1);

      setAvgRating(avg);
    } catch (err) {
      console.error("Review submit failed", err);
    }
  };



  if (loading) return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex justify-center items-center">
        <Loader2 className="animate-spin text-[#f0447c] w-8 h-8" />
      </div>
      <Footer />
    </div>
  );

  if (!product) return <p className="p-20 text-center text-sm font-medium">Cake not found.</p>;

  const selectedSizeObject = product.sizes?.find(s => s._id === selectedSize) || product.sizes?.[0] || { price: 0, size: "Standard" };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-6 md:py-10">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-14">

          {/* LEFT: Image Section */}
          <div className="w-full md:w-[45%]">
            <div className="sticky top-24">
              <div className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-[4/5] shadow-sm">
                <img
                  src={product.image ? `${API}${product.image}` : "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-all">
                  <Heart size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="w-full md:w-[55%] flex flex-col pt-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              <span className="hover:text-black cursor-pointer" onClick={() => navigate("/")}>Shop</span>
              <ChevronRight size={10} />
              <span className="text-[#f0447c]">{product.occasion?.name || "Cakes"}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-2 tracking-tight uppercase">
              {product.name}
            </h1>

            {/* ⭐ Average Rating (ADDED) */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <StarRating rating={avgRating} readonly />
                <span className="text-xs text-gray-500 font-semibold">
                  {avgRating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>
            )}


            <p className="text-gray-500 text-sm mb-6 leading-relaxed max-w-lg">
              {product.description || "A delicious handcrafted treat made fresh for your special moments."}
            </p>

            <div className="mb-8">
              <span className="text-3xl font-black text-[#f0447c]">₹{selectedSizeObject.price.toLocaleString()}</span>
              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">Inclusive of all taxes</p>
            </div>

            <div className="space-y-6">
              {/* Size Selection */}
              <div>
                <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-3">Select Weight</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size._id}
                      onClick={() => setSelectedSize(size._id)}
                      className={`py-2.5 px-4 border rounded-xl transition-all ${selectedSize === size._id ? "border-[#f0447c] bg-[#fff5f8] ring-1 ring-[#f0447c]" : "border-gray-200 hover:border-gray-400"}`}
                    >
                      <div className={`text-xs font-bold ${selectedSize === size._id ? "text-[#f0447c]" : "text-gray-700"}`}>{size.size}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavor & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2">Flavor</h3>
                  <select
                    className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs font-bold focus:outline-none focus:border-[#f0447c] appearance-none"
                    value={selectedFlavor}
                    onChange={(e) => setSelectedFlavor(e.target.value)}
                  >
                    {product.flavours?.map(flavor => (
                      <option key={flavor._id} value={flavor._id}>{flavor.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2">Quantity</h3>
                  <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200 w-full justify-between">
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={14} /></button>
                    <span className="font-black text-sm">{quantity}</span>
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black" onClick={() => setQuantity(q => q + 1)}><Plus size={14} /></button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-2">Message on Cake</h3>
                <input
                  type="text"
                  placeholder="Happy Birthday Alex..."
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-medium focus:outline-none focus:border-[#f0447c]"
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => {
                    addToCart(product._id, selectedSizeObject.size, quantity, "Product", cakeMessage);
                  }}
                  className="flex-[1.5] bg-[#f0447c] text-white py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-md hover:bg-[#d6336a] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} /> Add to Bag
                </button>

                <button
                  onClick={() => {
                    navigate("/checkout", {
                      state: {
                        buyNowProduct: {
                          productId: product._id,
                          name: product.name,
                          size: selectedSizeObject.size,
                          price: selectedSizeObject.price,
                          flavour: product.flavours.find(f => f._id === selectedFlavor)?.name || "",
                          quantity,
                          message: cakeMessage,
                          image: product.image
                        }
                      }
                    });
                  }}
                  className="flex-1 bg-gray-900 text-white py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ⭐ Reviews & Ratings (ADDED — does not affect layout) */}
        <div className="mt-16 max-w-3xl border-t pt-10">
          <h2 className="text-lg font-black uppercase tracking-wide mb-3">
            Customer Reviews
          </h2>

          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={avgRating} readonly />
            <span className="text-sm text-gray-600">
              {avgRating.toFixed(1)} ({reviews.length} reviews)
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <h3 className="text-sm font-bold mb-2">Write a Review</h3>
            <StarRating rating={userRating} setRating={setUserRating} />

            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience..."
              className="w-full mt-3 p-3 border rounded-xl text-sm"
            />

            <button
              onClick={submitReview}
              className="mt-3 bg-[#f0447c] text-white px-6 py-2 rounded-xl text-xs font-black uppercase"
            >
              Submit Review
            </button>
          </div>

          <div className="space-y-4">
            {reviews.length === 0 && (
              <p className="text-gray-500 text-sm">No reviews yet.</p>
            )}

            {reviews.map((r) => (
              <div key={r._id} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm">{r.userName}</span>
                  <StarRating rating={r.rating} readonly />
                </div>
                <p className="text-gray-600 text-sm mt-1">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default CakeDetails;
