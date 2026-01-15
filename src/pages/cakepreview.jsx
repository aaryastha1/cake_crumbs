

import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Center } from '@react-three/drei';
import { ShoppingBag, ChevronLeft, ChevronDown, Loader2, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { state } from '../store/store';
import CakeModel from '../components/cake';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { useCart } from "../context/cartContext";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CakePreview() {
  const snap = useSnapshot(state);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [loaded, setLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [sizeOptions, setSizeOptions] = useState([]);
  const [flavorOptions, setFlavorOptions] = useState([]);

 const [selectionData, setSelectionData] = useState({
  colorName: "Custom Designer Mix",
  size: snap.layers === 1 ? "1 Pound" : "2 Pound", // default based on layers
  flavor: "Chocolate Truffle",
  price: snap.layers * 1200,
  notes: ""
});


 useEffect(() => {
  const saved = localStorage.getItem('cakeDesign');
  if (saved) Object.assign(state, JSON.parse(saved));

  const fetchOptions = async () => {
    try {
      const API = import.meta.env.VITE_API_URL || "http://localhost:5006";
      const [sizesRes, flavorsRes] = await Promise.all([
        axios.get(`${API}/api/admin/categories/type/size`),
        axios.get(`${API}/api/admin/categories/type/flavour`),
      ]);

      // Filter size options based on layers
      let sizes = sizesRes.data.categories.map(c => c.name);
      if (snap.layers === 1) sizes = sizes.filter(s => s.includes("1"));
      else sizes = sizes.filter(s => !s.includes("1")); // 2 layers or more: remove 1 Pound

      setSizeOptions(sizes);

      setFlavorOptions(flavorsRes.data.categories.map(c => c.name));
    } catch (err) {
      console.error("Failed to fetch options:", err);
    } finally {
      setLoaded(true);
    }
  };
  fetchOptions();
}, [snap.layers]);


 // ... inside handleAddToCart function
const handleAddToCart = async (redirect = false) => {
  // 1. Capture the snapshot from the canvas
  const canvas = document.querySelector('canvas');
  // This creates a long string representing the 3D design
  const snapshotImage = canvas ? canvas.toDataURL("image/png") : null;

  const PLACEHOLDER_ID = "64b0f1a2b3c4d5e6f7a8b9c0";
  const customConfig = `${selectionData.size} | ${selectionData.flavor} ${selectionData.notes ? `| Note: ${selectionData.notes}` : ''}`;
  
  try {
    setIsAdding(true);
    const cartItem = {
      itemId: PLACEHOLDER_ID,
      name: "Custom 3D Cake",
      price: selectionData.price,
      quantity: 1,
      selectedSize: customConfig,
      itemType: "CustomCake",
      image: snapshotImage // <--- SEND THE SNAPSHOT HERE
    };

    if (redirect) {
      navigate("/checkout", { state: { buyNowProduct: cartItem } });
    } else {
      await addToCart(
        cartItem.itemId,
        cartItem.selectedSize,
        cartItem.quantity,
        cartItem.itemType,
        cartItem.price,
        cartItem.name,
        cartItem.image // <--- PASS IT TO THE CONTEXT
      );
    }
    // ... rest of the code
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login first");
        navigate("/login");
      }
    } finally {
      setIsAdding(false);
    }
  };

  if (!loaded) return null;

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-sans">
      <Header />

      <main className="flex-grow max-w-[1200px] mx-auto w-full p-4 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT COLUMN: SELECTION FORM */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 order-2 lg:order-1">
            <header className="space-y-2">
              <button
                onClick={() => navigate('/customize-cake')}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all text-[10px] font-black uppercase tracking-[0.2em] mb-4"
              >
                <ChevronLeft size={14} /> Back to Studio
              </button>
              <h1 className="text-5xl font-black text-[#1a1d23] tracking-tight">
                Your <span className="text-[#e92d77]" style={{ fontFamily: "cursive", fontStyle: "italic" }}>Selection</span>
              </h1>
              <p className="text-[#9da3af] text-[10px] font-black uppercase tracking-[0.2em]">Review your custom creation</p>
            </header>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-8">
              <SelectionRow label="Color" value={selectionData.colorName} isColor color={snap.colors.bottomLayer} />
              
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#9da3af]">Size</span>
                <div className="relative min-w-[140px]">
                  <select
                    value={selectionData.size}
                    onChange={e => {
                      const newSize = e.target.value;
                      let newPrice = 1200;
                      if (newSize.includes("2")) newPrice = 2400;
                      else if (newSize.includes("3")) newPrice = 3600;
                      setSelectionData(prev => ({ ...prev, size: newSize, price: newPrice }));
                    }}
                    className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#1a1d23] font-bold text-sm focus:outline-none cursor-pointer"
                  >
                    {sizeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#9da3af]">Flavor</span>
                <div className="relative min-w-[180px]">
                  <select
                    value={selectionData.flavor}
                    onChange={e => setSelectionData(prev => ({ ...prev, flavor: e.target.value }))}
                    className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#1a1d23] font-bold text-sm focus:outline-none cursor-pointer"
                  >
                    {flavorOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>

              <div className="flex justify-between items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#9da3af] whitespace-nowrap">Cake Notes</span>
                <input
                  type="text"
                  value={selectionData.notes}
                  onChange={(e) => setSelectionData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Happy Birthday"
                  className="w-full max-w-[240px] bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 focus:outline-none"
                />
              </div>

              <div className="pt-6 border-t border-slate-50 flex justify-between items-end">
                <span className="text-slate-900 font-black text-sm uppercase tracking-tighter">Total Price</span>
                <span className="text-3xl font-black text-[#e92d77]">Rs {selectionData.price}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAddToCart(false)}
                disabled={isAdding}
                className="bg-[#e92d77] text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.1em] hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-100"
              >
                {isAdding ? <Loader2 className="animate-spin" /> : <ShoppingBag size={18} />}
                Add to Cart
              </button>
              
              <button
                onClick={() => handleAddToCart(true)}
                className="bg-[#1a1d23] text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.1em] hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <CreditCard size={18} />
                Buy Now
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D PREVIEW */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="sticky top-24 bg-[#eff1f5] rounded-[3rem] h-[500px] lg:h-[750px] relative border-4 border-white shadow-inner overflow-hidden flex flex-col">
              <div className="absolute top-8 left-8 z-10">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-800 border border-white">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Live 3D View
                </div>
              </div>

              <div className="flex-grow cursor-grab active:cursor-grabbing">
                <Canvas shadows camera={{ position: [0, 1.5, 5], fov: 28 }}
                gl={{ preserveDrawingBuffer: true }}>
                  
                  <Stage environment="city" intensity={0.5} contactShadow={false}>
                    <Center><CakeModel /></Center>
                  </Stage>
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
              </div>

              {selectionData.notes && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    className="px-10 py-5 bg-white rounded-2xl shadow-xl text-center min-w-[200px]"
                  >
                    <p className="font-serif italic text-[#e92d77] text-2xl">"{selectionData.notes}"</p>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const SelectionRow = ({ label, value, isColor, color }) => (
  <div className="flex justify-between items-center">
    <span className="text-[10px] font-black uppercase tracking-widest text-[#9da3af]">{label}</span>
    <div className="flex items-center gap-2">
      {isColor && color && <div className="w-4 h-4 rounded-full border border-white shadow-sm" style={{ background: color }} />}
      <span className="text-[#1a1d23] font-bold text-sm">{value}</span>
    </div>
  </div>
);