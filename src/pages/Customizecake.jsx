import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Check, ShoppingBag, ArrowLeft, Users } from "lucide-react";

const UserCustomize = () => {
  const [customizations, setCustomizations] = useState([]);
  const [selectedCake, setSelectedCake] = useState(null);
  const [userChoice, setUserChoice] = useState({
    color: "",
    size: "",
    flavor: "",
    price: 0,
    colorImage: "",
  });

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const res = await axios.get("http://localhost:5006/api/admin/custom-cakes");
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
    setUserChoice({ color: "", size: "", flavor: "", price: 0, colorImage: cake.image });
  };

  const handleChange = (key, value) => {
    if (key === "size") {
      const weight = parseInt(value) || 1;
      setUserChoice(prev => ({ ...prev, size: value, price: selectedCake.basePrice * weight }));
    } else if (key === "color") {
      const colorObj = selectedCake.colorImages?.find(ci => ci.color.name === value);
      setUserChoice(prev => ({ ...prev, color: value, colorImage: colorObj?.image || selectedCake.image }));
    } else {
      setUserChoice(prev => ({ ...prev, [key]: value }));
    }
  };

  if (!selectedCake) {
    return (
      <div className="bg-[#FAF7F6] min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-serif text-gray-800 text-center mb-8">Choose Your Base Style</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {customizations.map(cake => (
              <div key={cake._id} onClick={() => handleCakeSelect(cake)} className="bg-white rounded-[28px] p-3 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-transparent hover:border-rose-100 group">
                <img src={`http://localhost:5006${cake.image}`} className="w-full h-56 object-cover rounded-[20px] mb-3 group-hover:scale-[1.02] transition-transform" alt="" />
                <h3 className="font-bold text-gray-800 text-md ml-2">{cake.name}</h3>
                <p className="text-rose-500 font-medium text-sm ml-2">From Rs {cake.basePrice}</p>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F6] min-h-screen font-sans text-slate-700">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT OPTIONS PANEL */}
          <div className="flex-1 space-y-5">
            <button onClick={() => setSelectedCake(null)} className="flex items-center gap-2 text-gray-400 hover:text-rose-500 text-sm font-medium transition-colors mb-2">
              <ArrowLeft size={16} /> Back to designs
            </button>

            {/* COLOR SECTION */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[30px] p-6 shadow-sm border border-white">
              <h3 className="text-md font-bold mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-rose-400 rounded-full"></span> Choose Color
              </h3>
              <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
                {selectedCake.color?.map(c => (
                  <div key={c._id} onClick={() => handleChange("color", c.name)} className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className={`w-12 h-12 rounded-full relative flex items-center justify-center transition-all duration-300 shadow-sm ${userChoice.color === c.name ? 'ring-2 ring-rose-400 ring-offset-2 scale-105' : 'hover:scale-105'}`} style={{ backgroundColor: c.name.toLowerCase() }}>
                      {userChoice.color === c.name && <Check size={18} className="text-white drop-shadow-sm" />}
                    </div>
                    <span className={`text-[10px] font-bold tracking-tight ${userChoice.color === c.name ? 'text-rose-600' : 'text-gray-400'}`}>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SIZE SECTION */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[30px] p-6 shadow-sm border border-white">
              <h3 className="text-md font-bold mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-rose-400 rounded-full"></span> Select Size
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {selectedCake.size?.map(s => {
                  const isActive = userChoice.size === s.name;
                  const price = selectedCake.basePrice * (parseInt(s.name) || 1);
                  return (
                    <div 
                      key={s._id} 
                      onClick={() => handleChange("size", s.name)} 
                      className={`group relative p-4 rounded-[22px] border-2 cursor-pointer transition-all duration-300 flex flex-col items-center text-center ${
                        isActive 
                        ? 'border-rose-300 bg-white shadow-md shadow-rose-100' 
                        : 'border-transparent bg-white/40 hover:bg-white'
                      }`}
                    >
                      {s.name.includes("2") && (
                        <span className="absolute -top-2 px-2 py-0.5 bg-rose-500 text-white text-[8px] font-black uppercase tracking-tighter rounded-full shadow-sm z-10">
                          Popular
                        </span>
                      )}
                      <p className={`text-sm font-black mb-0.5 ${isActive ? 'text-rose-600' : 'text-gray-800'}`}>{s.name}</p>
                      <span className="text-[10px] text-gray-400 font-bold mb-2">Serves {parseInt(s.name) * 6}</span>
                      <p className={`text-xs font-black ${isActive ? 'text-rose-500' : 'text-gray-400'}`}>Rs {price}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FLAVOR SECTION */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[30px] p-6 shadow-sm border border-white">
              <h3 className="text-md font-bold mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-rose-400 rounded-full"></span> Pick Flavor
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedCake.flavour?.map(f => {
                  const isActive = userChoice.flavor === f.name;
                  return (
                    <div key={f._id} onClick={() => handleChange("flavor", f.name)} className={`flex items-center justify-between p-3.5 rounded-[18px] border-2 cursor-pointer transition-all ${isActive ? 'border-rose-300 bg-white shadow-sm' : 'border-transparent bg-white/40 hover:bg-white'}`}>
                      <div className="flex items-center gap-3">
                        <div className="bg-rose-50 w-9 h-9 rounded-xl flex items-center justify-center text-md">🍰</div>
                        <div>
                          <p className={`font-bold text-xs ${isActive ? 'text-rose-600' : 'text-gray-800'}`}>{f.name}</p>
                          <p className="text-[8px] text-rose-400 font-black uppercase tracking-widest">Premium</p>
                        </div>
                      </div>
                      {isActive && <Check size={14} className="text-rose-500" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY SIDEBAR */}
          <div className="lg:w-[360px]">
            <div className="sticky top-10 bg-white rounded-[35px] p-8 shadow-xl shadow-rose-200/30 border border-rose-50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-gray-900 tracking-tight">Your Selection</h3>
                <span className="text-[8px] font-black bg-rose-50 text-rose-500 px-2.5 py-1 rounded-full uppercase tracking-widest border border-rose-100">Live</span>
              </div>

              <div className="relative rounded-[28px] overflow-hidden mb-8 shadow-lg bg-gray-50 aspect-square group">
                <img src={`http://localhost:5006${userChoice.colorImage || selectedCake.image}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full border-2 border-white shadow-xl" style={{ backgroundColor: userChoice.color?.toLowerCase() || '#f3f4f6' }}></div>
              </div>

              <div className="space-y-4 border-b border-dashed border-gray-100 pb-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Color</span>
                  <span className="font-black text-gray-900 text-xs">{userChoice.color || "-"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Size</span>
                  <span className="font-black text-gray-900 text-xs">{userChoice.size || "-"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Flavor</span>
                  <span className="font-black text-gray-900 text-xs">{userChoice.flavor || "-"}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-xs font-bold text-gray-400">Total</span>
                <span className="text-xl font-black text-rose-400 tracking-tight">Rs {userChoice.price || 0}</span>
              </div>

              {/* SMALLER ADD TO CART BUTTON */}
              <button 
                disabled={!userChoice.color || !userChoice.size || !userChoice.flavor} 
                className={`w-full py-4 rounded-[20px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${userChoice.color && userChoice.size && userChoice.flavor ? 'bg-rose-400 text-white shadow-lg shadow-rose-100 hover:bg-rose-600 active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                <ShoppingBag size={16} /> Add To Cart
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