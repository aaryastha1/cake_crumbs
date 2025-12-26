import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Check, ShoppingBag, ArrowLeft, Heart } from "lucide-react";

const UserCustomize = () => {
  const [customizations, setCustomizations] = useState([]);
  const [selectedCake, setSelectedCake] = useState(null);

  // ✅ State to track wishlisted items
  const [wishlist, setWishlist] = useState([]);

  const [userChoice, setUserChoice] = useState({
    color: "",
    size: "",
    flavor: "",
    shape: "",
    toppings: [],
    price: 0,
    colorImage: "",
    shapeImage: "",
  });

  const API_URL = "http://localhost:5006";

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/custom-cakes`);
        setCustomizations(res.data);
      } catch (err) {
        console.error("Error fetching cakes:", err);
      }
    };
    fetchCakes();
  }, []);

  const handleCakeSelect = (cake) => {
    setSelectedCake(cake);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setUserChoice({
      color: "",
      size: "",
      flavor: "",
      shape: "",
      toppings: [],
      price: 0,
      colorImage: cake.image,
      shapeImage: cake.image,
    });
  };

  // ✅ Toggle Wishlist Function
  const toggleWishlist = (e, cakeId) => {
    if (e) e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(cakeId)
        ? prev.filter((id) => id !== cakeId)
        : [...prev, cakeId]
    );
  };

  // Handle selections
  const handleChange = (key, value) => {
    if (key === "size") {
      const weight = parseInt(value) || 1;
      setUserChoice((prev) => ({
        ...prev,
        size: value,
        price: selectedCake.basePrice * weight,
      }));
    } else if (key === "color") {
      const colorObj = selectedCake.colorImages?.find(
        (ci) => ci.color.name === value
      );
      setUserChoice((prev) => ({
        ...prev,
        color: value,
        colorImage: colorObj?.image || selectedCake.image,
      }));
    } else if (key === "shape") {
      setUserChoice((prev) => ({
        ...prev,
        shape: value,
        shapeImage:
          selectedCake.shape?.find((s) => s.name === value)?.image ||
          prev.shapeImage,
      }));
    } else if (key === "toppings") {
      const current = userChoice.toppings.includes(value)
        ? userChoice.toppings.filter((t) => t !== value)
        : [...userChoice.toppings, value];
      setUserChoice((prev) => ({ ...prev, toppings: current }));
    } else {
      setUserChoice((prev) => ({ ...prev, [key]: value }));
    }
  };

  // --- BASE STYLE SELECTION VIEW ---
  if (!selectedCake) {
    return (
      <div className="bg-[#FAF7F6] min-h-screen font-sans">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-[#2D3E50] mb-3">
              Choose Your Base Style
            </h1>
            <p className="text-gray-500 text-sm italic">
              Each cake is handcrafted with love using premium ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {customizations.map((cake) => {
              const isLiked = wishlist.includes(cake._id);

              return (
                <div
                  key={cake._id}
                  onClick={() => handleCakeSelect(cake)}
                  className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group border border-transparent hover:border-rose-100"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={`${API_URL}${cake.image}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={cake.name}
                    />

                    <button
                      onClick={(e) => toggleWishlist(e, cake._id)}
                      className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm transition-all duration-300 hover:scale-110"
                    >
                      <Heart
                        size={18}
                        fill={isLiked ? "#E24C63" : "none"}
                        className={isLiked ? "text-[#E24C63]" : "text-gray-400"}
                      />
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-[#2D3E50] text-lg mb-1">
                      {cake.name}
                    </h3>
                    <p className="text-[#E24C63] font-bold text-sm">
                      From Rs {cake.basePrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- CUSTOMIZATION VIEW ---
  return (
    <div className="bg-[#FAF7F6] min-h-screen font-sans text-slate-700 antialiased">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <button
          onClick={() => setSelectedCake(null)}
          className="flex items-center gap-2 text-gray-400 hover:text-[#E24C63] text-sm font-bold transition-colors mb-8 group"
        >
          <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
            <ArrowLeft size={16} />
          </div>
          BACK TO DESIGNS
        </button>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* LEFT: OPTIONS PANEL */}
          <div className="flex-1 space-y-6">
            {/* COLOR */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-rose-50/50">
              <h3 className="text-lg font-black text-[#2D3E50] mb-6 tracking-tight uppercase text-[13px]">
                1. Choose Color
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {selectedCake.color?.map((c) => (
                  <div
                    key={c._id}
                    onClick={() => handleChange("color", c.name)}
                    className="flex flex-col items-center gap-3 cursor-pointer group min-w-[60px]"
                  >
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-inner ${
                        userChoice.color === c.name
                          ? "ring-4 ring-rose-100 scale-110 shadow-lg"
                          : "hover:scale-105 border-4 border-white"
                      }`}
                      style={{ backgroundColor: c.name.toLowerCase() }}
                    >
                      {userChoice.color === c.name && (
                        <Check size={20} className="text-white drop-shadow-md" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest ${
                        userChoice.color === c.name ? "text-rose-500" : "text-gray-400"
                      }`}
                    >
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SIZE */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-rose-50/50">
              <h3 className="text-lg font-black text-[#2D3E50] mb-6 tracking-tight uppercase text-[13px]">
                2. Select Weight
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {selectedCake.size?.map((s) => {
                  const isActive = userChoice.size === s.name;
                  const price = selectedCake.basePrice * (parseInt(s.name) || 1);
                  return (
                    <div
                      key={s._id}
                      onClick={() => handleChange("size", s.name)}
                      className={`p-5 rounded-[24px] border-2 transition-all duration-300 flex flex-col items-center text-center cursor-pointer ${
                        isActive
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-gray-100 bg-gray-50/50 hover:bg-white hover:border-rose-200"
                      }`}
                    >
                      <p
                        className={`text-base font-black ${
                          isActive ? "text-rose-600" : "text-[#2D3E50]"
                        }`}
                      >
                        {s.name} KG
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold mt-1">
                        Rs {price.toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FLAVOR */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-rose-50/50">
              <h3 className="text-lg font-black text-[#2D3E50] mb-6 tracking-tight uppercase text-[13px]">
                3. Pick Flavor
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedCake.flavour?.map((f) => {
                  const isActive = userChoice.flavor === f.name;
                  return (
                    <div
                      key={f._id}
                      onClick={() => handleChange("flavor", f.name)}
                      className={`flex items-center justify-between p-4 rounded-[20px] border-2 transition-all cursor-pointer ${
                        isActive
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-gray-100 bg-gray-50/50 hover:bg-white"
                      }`}
                    >
                      <span
                        className={`font-bold text-xs ${
                          isActive ? "text-rose-600" : "text-[#2D3E50]"
                        }`}
                      >
                        {f.name}
                      </span>
                      {isActive && <Check size={16} className="text-rose-500" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SHAPE */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-rose-50/50">
              <h3 className="text-lg font-black text-[#2D3E50] mb-6 tracking-tight uppercase text-[13px]">
                4. Select Shape
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {selectedCake.shape?.map((s) => {
                  const isActive = userChoice.shape === s.name;
                  return (
                    <div
                      key={s._id}
                      onClick={() => handleChange("shape", s.name)}
                      className={`p-5 rounded-[24px] border-2 transition-all duration-300 flex flex-col items-center text-center cursor-pointer ${
                        isActive
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-gray-100 bg-gray-50/50 hover:bg-white hover:border-rose-200"
                      }`}
                    >
                      <p
                        className={`text-base font-black ${
                          isActive ? "text-rose-600" : "text-[#2D3E50]"
                        }`}
                      >
                        {s.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TOPPINGS */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-rose-50/50">
              <h3 className="text-lg font-black text-[#2D3E50] mb-6 tracking-tight uppercase text-[13px]">
                5. Add Toppings
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedCake.toppings?.map((t) => {
                  const isActive = userChoice.toppings.includes(t.name);
                  return (
                    <div
                      key={t._id}
                      onClick={() => handleChange("toppings", t.name)}
                      className={`flex items-center justify-between p-4 rounded-[20px] border-2 transition-all cursor-pointer ${
                        isActive
                          ? "border-rose-400 bg-rose-50/30"
                          : "border-gray-100 bg-gray-50/50 hover:bg-white"
                      }`}
                    >
                      <span
                        className={`font-bold text-xs ${
                          isActive ? "text-rose-600" : "text-[#2D3E50]"
                        }`}
                      >
                        {t.name}
                      </span>
                      {isActive && <Check size={16} className="text-rose-500" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: STICKY SUMMARY */}
          <div className="lg:w-[400px] sticky top-10">
            <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-rose-200/20 border border-rose-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50/50 rounded-full -mr-16 -mt-16 blur-3xl"></div>

              <h3 className="text-xl font-black text-[#2D3E50] mb-8 flex items-center gap-2">
                Order Summary
                <button
                  onClick={() => toggleWishlist(null, selectedCake._id)}
                  className="ml-auto p-2 bg-white/80 rounded-full shadow-sm hover:scale-110"
                >
                  <Heart
                    size={20}
                    fill={wishlist.includes(selectedCake._id) ? "#E24C63" : "none"}
                    className={wishlist.includes(selectedCake._id) ? "text-[#E24C63]" : "text-gray-400"}
                  />
                </button>
              </h3>

              <div className="relative rounded-[30px] overflow-hidden mb-8 shadow-xl aspect-square border-4 border-white">
                <img
                  src={`${API_URL}${userChoice.shapeImage || userChoice.colorImage || selectedCake.image}`}
                  className="w-full h-full object-cover transition-transform duration-1000"
                  alt="Preview"
                />
              </div>

              <div className="space-y-4 mb-8">
                {["color", "size", "flavor", "shape", "toppings"].map((field) => (
                  <div
                    key={field}
                    className="flex justify-between items-center bg-gray-50/80 px-4 py-3 rounded-2xl"
                  >
                    <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                      {field}
                    </span>
                    <span className="font-black text-[#2D3E50] text-xs">
                      {Array.isArray(userChoice[field])
                        ? userChoice[field].join(", ") || "Not Selected"
                        : userChoice[field] || "Not Selected"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-10 px-2">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Total Price
                </span>
                <span className="text-3xl font-black text-[#E24C63]">
                  Rs {userChoice.price.toLocaleString()}
                </span>
              </div>

              <button
                disabled={
                  !userChoice.color ||
                  !userChoice.size ||
                  !userChoice.flavor ||
                  !userChoice.shape
                }
                className={`w-full py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500 ${
                  userChoice.color &&
                  userChoice.size &&
                  userChoice.flavor &&
                  userChoice.shape
                    ? "bg-[#E24C63] text-white shadow-xl shadow-rose-200 hover:bg-[#c93d52] hover:-translate-y-1 active:scale-95"
                    : "bg-gray-100 text-gray-300 cursor-not-allowed"
                }`}
              >
                <ShoppingBag size={18} /> Add To Cart
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserCustomize;
