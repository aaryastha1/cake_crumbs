
// // import React, { useEffect, useState } from 'react';
// // import { useSnapshot } from 'valtio';
// // import { motion } from 'framer-motion';
// // import { Canvas } from '@react-three/fiber';
// // import { OrbitControls, Stage, Center } from '@react-three/drei';
// // import { ShoppingBag, ShieldCheck, ChevronLeft } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import { state } from '../store/store'; 
// // import CakeModel from '../components/cake'; 
// // import axios from 'axios';

// // export default function CakePreview() {
// //   const snap = useSnapshot(state);
// //   const navigate = useNavigate(); 
// //   const [loaded, setLoaded] = useState(false);

// //   const [sizeOptions, setSizeOptions] = useState([]);
// //   const [flavorOptions, setFlavorOptions] = useState([]);

// //   const [selectionData, setSelectionData] = useState({
// //     colorName: "Custom Designer Mix",
// //     size: snap.layers === 1 ? "1 Pound" : snap.layers === 2 ? "2 Pound" : "3 Pound",
// //     border: !snap.frostingType || snap.frostingType === 'none'
// //       ? 'No Border'
// //       : snap.frostingType.charAt(0).toUpperCase() + snap.frostingType.slice(1),
// //     garnish: !snap.extraItem || snap.extraItem === 'none'
// //       ? 'No Garnish'
// //       : snap.extraItem.charAt(0).toUpperCase() + snap.extraItem.slice(1),
// //     flavor: "Chocolate Truffle",
// //     price: snap.layers * 1200,
// //     notes: "Happy Birthday"
// //   });

// //   useEffect(() => {
// //     // Load saved design
// //     const saved = localStorage.getItem('cakeDesign');
// //     if (saved) Object.assign(state, JSON.parse(saved));

// //     const fetchOptions = async () => {
// //       try {
// //         const [sizesRes, flavorsRes] = await Promise.all([
// //           axios.get('http://localhost:5006/api/admin/categories/type/size'),
// //           axios.get('http://localhost:5006/api/admin/categories/type/flavour'),
// //         ]);

// //         setSizeOptions(sizesRes.data.categories.map(c => c.name));
// //         setFlavorOptions(flavorsRes.data.categories.map(c => c.name));

// //       } catch (err) {
// //         console.error("Failed to fetch category options:", err);
// //       } finally {
// //         setLoaded(true);
// //       }
// //     };

// //     fetchOptions();
// //   }, []);

// //   if (!loaded) return null;

// //   return (
// //     <div className="min-h-screen bg-[#faf9f6] p-4 md:p-8 flex items-center justify-center font-sans">
// //       <motion.div 
// //         initial={{ opacity: 0, scale: 0.95 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/60 backdrop-blur-2xl p-6 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.05)] border border-white"
// //       >
// //         {/* LEFT SIDE */}
// //         <div className="space-y-6 p-4 flex flex-col justify-center">
// //           <button 
// //             onClick={() => navigate('/customize-cake')} 
// //             className="group flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-all text-[10px] font-black uppercase tracking-[0.3em] mb-4"
// //           >
// //             <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
// //             Back to Studio
// //           </button>

// //           <div className="space-y-1">
// //             <h2 className="text-4xl font-black text-slate-800 tracking-tighter">
// //               Your <span className="text-pink-500 italic font-medium">Selection</span>
// //             </h2>
// //             <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Review your custom creation</p>
// //           </div>

// //           <div className="space-y-2 pt-4">
// //             {/* Color */}
// //             <div className="flex justify-between items-center py-5 border-b border-slate-50">
// //               <span className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">Color</span>
// //               <div className="flex items-center gap-3">
// //                 {snap.colors.bottomLayer && (
// //                   <div
// //                     className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
// //                     style={{ background: snap.colors.bottomLayer }}
// //                   />
// //                 )}
// //                 <span className="text-slate-700 font-extrabold text-sm">{selectionData.colorName}</span>
// //               </div>
// //             </div>

// //             {/* Size Dropdown */}
// //            {/* Size Dropdown */}
// // <div className="flex justify-between items-center py-5 border-b border-slate-50">
// //   <span className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">Size</span>
// //   <select
// //     value={selectionData.size}
// //     onChange={e => {
// //       const newSize = e.target.value;
// //       let newPrice = 1200; // default 1 Pound

// //       if (newSize === "1 Pound") newPrice = 1200;
// //       else if (newSize === "2 Pound") newPrice = 2400;
// //       else if (newSize === "3 Pound") newPrice = 3600;

// //       setSelectionData(prev => ({ ...prev, size: newSize, price: newPrice }));
// //     }}
// //     className="text-slate-700 font-extrabold text-sm border border-slate-300 rounded px-2 py-1"
// //   >
// //     {sizeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
// //   </select>
// // </div>


// //             {/* Flavor Dropdown */}
// //             <div className="flex justify-between items-center py-5 border-b border-slate-50">
// //               <span className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">Flavor</span>
// //               <select
// //                 value={selectionData.flavor}
// //                 onChange={e => setSelectionData(prev => ({ ...prev, flavor: e.target.value }))}
// //                 className="text-slate-700 font-extrabold text-sm border border-slate-300 rounded px-2 py-1"
// //               >
// //                 {flavorOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
// //               </select>
// //             </div>

// //             {/* Border, Garnish, Notes */}
// //           {/* Border */}
// // <div className="flex justify-between items-center py-5 border-b border-slate-50">
// //   <span className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">
// //     Border
// //   </span>
// //   <span className="text-slate-700 font-extrabold text-sm">
// //     {selectionData.border}
// //   </span>
// // </div>

// // {/* Garnish */}
// // <div className="flex justify-between items-center py-5 border-b border-slate-50">
// //   <span className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">
// //     Garnish
// //   </span>
// //   <span className="text-slate-700 font-extrabold text-sm">
// //     {selectionData.garnish}
// //   </span>
// // </div>

// // {/* Cake Notes – USER INPUT */}
// // <div className="flex justify-between items-center py-5 border-b border-slate-50">
// //   <span className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">
// //     Cake Notes
// //   </span>

// //   <input
// //     type="text"
// //     value={selectionData.notes}
// //     onChange={(e) =>
// //       setSelectionData(prev => ({
// //         ...prev,
// //         notes: e.target.value
// //       }))
// //     }
// //     placeholder="Write your message..."
// //     className="text-slate-700 font-extrabold text-sm border border-slate-300 rounded px-3 py-1 w-[60%]"
// //   />
// // </div>


// //             <div className="flex justify-between items-center pt-8">
// //               <span className="text-slate-800 font-black text-xs uppercase tracking-[0.2em]">Total Price</span>
// //               <span className="text-pink-600 font-black text-4xl tracking-tighter">₹{selectionData.price}</span>
// //             </div>
// //           </div>

// //           <div className="pt-6 space-y-4">
// //             <motion.button
// //               whileHover={{ scale: 1.02, backgroundColor: '#be185d' }}
// //               whileTap={{ scale: 0.98 }}
// //               className="w-full bg-pink-600 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(219,39,119,0.3)] flex items-center justify-center gap-3 transition-all"
// //             >
// //               <ShoppingBag size={20} /> Add to Cart
// //             </motion.button>

// //             <p className="flex items-center justify-center gap-2 text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
// //               <ShieldCheck size={14} className="text-green-500" /> Secure Checkout · Free Returns
// //             </p>
// //           </div>
// //         </div>

// //         {/* RIGHT SIDE: 3D PREVIEW */}
// //         <div className="relative bg-[#f3f4f6] rounded-[2.5rem] overflow-hidden min-h-[500px] border-4 border-white shadow-inner flex items-center justify-center">
// //           <div className="absolute top-8 left-8 z-10">
// //             <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
// //               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
// //               <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Live 3D View</span>
// //             </div>
// //           </div>

// //           <Canvas shadows camera={{ position: [0, 1.5, 5], fov: 30 }}>
// //             <Stage environment="city" intensity={0.6} contactShadow={false}>
// //               <Center>
// //                 <CakeModel />
// //               </Center>
// //             </Stage>
// //             <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
// //           </Canvas>

// //           <motion.div 
// //             initial={{ y: 20, opacity: 0 }}
// //             animate={{ y: 0, opacity: 1 }}
// //             transition={{ delay: 0.5 }}
// //             className="absolute bottom-10 px-8 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-pink-50 max-w-[80%] text-center"
// //           >
// //             <p className="font-serif italic text-pink-600 text-xl tracking-tight">"{selectionData.notes}"</p>
// //           </motion.div>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from 'react';
// import { useSnapshot } from 'valtio';
// import { motion } from 'framer-motion';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Stage, Center } from '@react-three/drei';
// import { ShoppingBag, ShieldCheck, ChevronLeft, ChevronDown, CreditCard } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { state } from '../store/store';
// import CakeModel from '../components/cake';
// import axios from 'axios';

// // Import your actual Header and Footer components
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// export default function CakePreview() {
//   const snap = useSnapshot(state);
//   const navigate = useNavigate();
//   const [loaded, setLoaded] = useState(false);

//   const [sizeOptions, setSizeOptions] = useState([]);
//   const [flavorOptions, setFlavorOptions] = useState([]);

//   const [selectionData, setSelectionData] = useState({
//     colorName: "Custom Designer Mix",
//     size: snap.layers === 1 ? "1 Pound" : snap.layers === 2 ? "2 Pound" : "3 Pound",
//     border: !snap.frostingType || snap.frostingType === 'none'
//       ? 'No Border'
//       : snap.frostingType.charAt(0).toUpperCase() + snap.frostingType.slice(1),
//     garnish: !snap.extraItem || snap.extraItem === 'none'
//       ? 'No Garnish'
//       : snap.extraItem.charAt(0).toUpperCase() + snap.extraItem.slice(1),
//     flavor: "Chocolate Truffle",
//     price: snap.layers * 1200,
//     notes: "Happy Birthday"
//   });

//   useEffect(() => {
//     const saved = localStorage.getItem('cakeDesign');
//     if (saved) Object.assign(state, JSON.parse(saved));

//     const fetchOptions = async () => {
//       try {
//         const API = import.meta.env.VITE_API_URL || "http://localhost:5006";
//         const [sizesRes, flavorsRes] = await Promise.all([
//           axios.get(`${API}/api/admin/categories/type/size`),
//           axios.get(`${API}/api/admin/categories/type/flavour`),
//         ]);
//         setSizeOptions(sizesRes.data.categories.map(c => c.name));
//         setFlavorOptions(flavorsRes.data.categories.map(c => c.name));
//       } catch (err) {
//         console.error("Failed to fetch category options:", err);
//       } finally {
//         setLoaded(true);
//       }
//     };
//     fetchOptions();
//   }, []);

//   if (!loaded) return null;

//   const selectWrapper = "relative flex items-center";
//   const selectBase = "appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2 pr-10 text-slate-700 font-extrabold text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all cursor-pointer";

//   return (
//     <div className="min-h-screen bg-[#faf9f6] flex flex-col font-sans">

//       {/* --- YOUR ACTUAL HEADER --- */}
//       <Header />

//       {/* --- MAIN PREVIEW CONTENT --- */}
//       <main className="flex-grow flex items-center justify-center p-4 md:p-8">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/60 backdrop-blur-2xl p-6 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.05)] border border-white"
//         >
//           {/* LEFT SIDE: Selection Details */}
//           <div className="space-y-6 p-4 flex flex-col justify-center">
//             <button
//               onClick={() => navigate('/customize-cake')}
//               className="group flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-all text-[10px] font-black uppercase tracking-[0.3em] mb-4"
//             >
//               <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
//               Back to Studio
//             </button>

//             <div className="space-y-1">
//               <h2 className="text-4xl font-black text-slate-800 tracking-tighter">
//                 Your <span className="text-pink-500 italic font-medium">Selection</span>
//               </h2>
//               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Review your custom creation</p>
//             </div>

//             <div className="space-y-2 pt-4">
//               {/* Color Display */}
//               <div className="flex justify-between items-center py-5 border-b border-slate-50">
//                 <span className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">Color</span>
//                 <div className="flex items-center gap-3">
//                   {snap.colors.bottomLayer && (
//                     <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ background: snap.colors.bottomLayer }} />
//                   )}
//                   <span className="text-slate-700 font-extrabold text-sm">{selectionData.colorName}</span>
//                 </div>
//               </div>

//               {/* Size Select */}
//               <div className="flex justify-between items-center py-5 border-b border-slate-50">
//                 <span className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">Size</span>
//                 <div className={selectWrapper}>
//                   <select
//                     value={selectionData.size}
//                     onChange={e => {
//                       const newSize = e.target.value;
//                       let newPrice = 1200;
//                       if (newSize === "1 Pound") newPrice = 1200;
//                       else if (newSize === "2 Pound") newPrice = 2400;
//                       else if (newSize === "3 Pound") newPrice = 3600;
//                       setSelectionData(prev => ({ ...prev, size: newSize, price: newPrice }));
//                     }}
//                     className={selectBase}
//                   >
//                     {sizeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 text-slate-400 pointer-events-none" size={16} />
//                 </div>
//               </div>

//               {/* Flavor Select */}
//               <div className="flex justify-between items-center py-5 border-b border-slate-50">
//                 <span className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">Flavor</span>
//                 <div className={selectWrapper}>
//                   <select
//                     value={selectionData.flavor}
//                     onChange={e => setSelectionData(prev => ({ ...prev, flavor: e.target.value }))}
//                     className={selectBase}
//                   >
//                     {flavorOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 text-slate-400 pointer-events-none" size={16} />
//                 </div>
//               </div>

//               {/* Notes Input */}
//               <div className="flex justify-between items-center py-5 border-b border-slate-50">
//                 <span className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">Cake Notes</span>
//                 <input
//                   type="text"
//                   value={selectionData.notes}
//                   onChange={(e) => setSelectionData(prev => ({ ...prev, notes: e.target.value }))}
//                   placeholder="Write your message..."
//                   className="text-slate-700 font-extrabold text-sm border border-slate-200 rounded-lg px-3 py-2 w-[60%] focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all"
//                 />
//               </div>

//              <div className="flex justify-between items-center pt-8">
//   <span className="text-slate-800 font-black text-xs uppercase tracking-[0.2em]">Total Price</span>
//   {/* Updated to use the Coral Red color from your image */}
//   <span className="font-black text-xl tracking-tighter" style={{ color: '#E34A5F' }}>
//     Rs {selectionData.price}
//   </span>
// </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="pt-6">
//               <div className="flex gap-3">
//                 <motion.button
//                   whileHover={{ scale: 1.02, backgroundColor: "#d13d50" }} // Slightly darker on hover
//                   whileTap={{ scale: 0.98 }}
//                   style={{ backgroundColor: "#E34A5F" }} // The exact color from your image
//                   className="flex-[1.5] text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.15em] shadow-lg flex items-center justify-center gap-2 transition-all"
//                 >
//                   <ShoppingBag size={18} /> Add to Cart
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.15em] shadow-lg flex items-center justify-center gap-2 transition-all hover:bg-black"
//                 >
//                   <CreditCard size={18} /> Buy Now
//                 </motion.button>
//               </div>
//               <p className="flex items-center justify-center gap-2 text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mt-6">
//                 <ShieldCheck size={14} className="text-green-500" /> Secure Checkout · Free Returns
//               </p>
//             </div>
//           </div>

//           {/* RIGHT SIDE: 3D Preview Canvas */}
//           <div className="relative bg-[#f3f4f6] rounded-[2.5rem] overflow-hidden min-h-[500px] border-4 border-white shadow-inner flex items-center justify-center">
//             <div className="absolute top-8 left-8 z-10">
//               <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Live 3D View</span>
//               </div>
//             </div>
//             <Canvas shadows camera={{ position: [0, 1.5, 5], fov: 30 }}>
//               <Stage environment="city" intensity={0.6} contactShadow={false}>
//                 <Center><CakeModel /></Center>
//               </Stage>
//               <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
//             </Canvas>
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.5 }}
//               className="absolute bottom-10 px-8 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-pink-50 max-w-[80%] text-center"
//             >
//               <p className="font-serif italic text-pink-600 text-xl tracking-tight">"{selectionData.notes}"</p>
//             </motion.div>
//           </div>
//         </motion.div>
//       </main>

//       {/* --- YOUR ACTUAL FOOTER --- */}
//       <Footer />

//     </div>
//   );
// }

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
    size: snap.layers === 1 ? "1 Pound" : snap.layers === 2 ? "2 Pound" : "3 Pound",
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
        setSizeOptions(sizesRes.data.categories.map(c => c.name));
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