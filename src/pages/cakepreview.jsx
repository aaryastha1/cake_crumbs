// import React from 'react';
// import { useEffect, useState } from 'react';
// import { useSnapshot } from 'valtio';
// import { motion } from 'framer-motion';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Stage, Center } from '@react-three/drei';
// import { ShoppingBag, ShieldCheck, ChevronLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { state } from '../store/store'; 
// import CakeModel from '../components/cake'; 
// import axios from 'axios';

// export default function CakePreview() {
//   const snap = useSnapshot(state);
//   const navigate = useNavigate(); 
//   const [loaded, setLoaded] = useState(false);

//   // Initial selectionData with defaults
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
//     // Load saved cake design from localStorage
//     const saved = localStorage.getItem('cakeDesign');
//     if (saved) {
//       Object.assign(state, JSON.parse(saved));
//     }

//     // Fetch cake details from backend
//     const fetchCake = async () => {
//       try {
//         // Use cakeId from saved design or a valid backend ID
//         const cakeId = snap.cakeId || "YOUR_VALID_CAKE_ID_HERE"; 
//         const res = await axios.get(`http://localhost:5006/api/custom-cakes/${cakeId}`);
//         const cake = res.data;

//         // Update selectionData with backend values
//         setSelectionData(prev => ({
//           ...prev,
//           size: cake.size,
//           flavor: cake.flavor,
//           price: cake.price,
//           notes: cake.description || prev.notes
//         }));
//       } catch (err) {
//         console.error("Failed to fetch cake details:", err);
//       } finally {
//         setLoaded(true);
//       }
//     };

//     fetchCake();
//   }, [snap.cakeId]);

//   if (!loaded) return null;

//   return (
//     <div className="min-h-screen bg-[#faf9f6] p-4 md:p-8 flex items-center justify-center font-sans">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/60 backdrop-blur-2xl p-6 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.05)] border border-white"
//       >
//         {/* LEFT SIDE: SELECTION DETAILS */}
//         <div className="space-y-6 p-4 flex flex-col justify-center">
//           <button 
//             onClick={() => navigate('/customize-cake')} 
//             className="group flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-all text-[10px] font-black uppercase tracking-[0.3em] mb-4"
//           >
//             <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
//             Back to Studio
//           </button>

//           <div className="space-y-1">
//             <h2 className="text-4xl font-black text-slate-800 tracking-tighter">
//               Your <span className="text-pink-500 italic font-medium">Selection</span>
//             </h2>
//             <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Review your custom creation</p>
//           </div>

//           <div className="space-y-2 pt-4">
//             {[
//               { label: "Color", value: selectionData.colorName, colorDot: snap.colors.bottomLayer },
//               { label: "Size", value: selectionData.size },
//               { label: "Flavor", value: selectionData.flavor },
//               { label: "Border", value: selectionData.border },
//               { label: "Garnish", value: selectionData.garnish },
//               { label: "Cake Notes", value: selectionData.notes },
//             ].map((item, i) => (
//               <div key={i} className="flex justify-between items-center py-5 border-b border-slate-50">
//                 <span className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">
//                   {item.label}
//                 </span>

//                 <div className="flex items-center gap-3">
//                   {item.colorDot && (
//                     <div
//                       className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
//                       style={{ background: item.colorDot }}
//                     />
//                   )}
//                   <span className="text-slate-700 font-extrabold text-sm">
//                     {item.value}
//                   </span>
//                 </div>
//               </div>
//             ))}

//             <div className="flex justify-between items-center pt-8">
//               <span className="text-slate-800 font-black text-xs uppercase tracking-[0.2em]">Total Price</span>
//               <span className="text-pink-600 font-black text-4xl tracking-tighter">₹{selectionData.price}</span>
//             </div>
//           </div>

//           <div className="pt-6 space-y-4">
//             <motion.button
//               whileHover={{ scale: 1.02, backgroundColor: '#be185d' }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full bg-pink-600 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(219,39,119,0.3)] flex items-center justify-center gap-3 transition-all"
//             >
//               <ShoppingBag size={20} /> Add to Cart
//             </motion.button>

//             <p className="flex items-center justify-center gap-2 text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
//               <ShieldCheck size={14} className="text-green-500" /> Secure Checkout · Free Returns
//             </p>
//           </div>
//         </div>

//         {/* RIGHT SIDE: 3D PREVIEW */}
//         <div className="relative bg-[#f3f4f6] rounded-[2.5rem] overflow-hidden min-h-[500px] border-4 border-white shadow-inner flex items-center justify-center">
//           <div className="absolute top-8 left-8 z-10">
//             <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//               <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Live 3D View</span>
//             </div>
//           </div>

//           <Canvas shadows camera={{ position: [0, 1.5, 5], fov: 30 }}>
//             <Stage environment="city" intensity={0.6} contactShadow={false}>
//               <Center>
//                 <CakeModel />
//               </Center>
//             </Stage>
//             <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
//           </Canvas>
          
//           <motion.div 
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="absolute bottom-10 px-8 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-pink-50 max-w-[80%] text-center"
//           >
//             <p className="font-serif italic text-pink-600 text-xl tracking-tight">"{selectionData.notes}"</p>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Center } from '@react-three/drei';
import { ShoppingBag, ShieldCheck, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { state } from '../store/store'; 
import CakeModel from '../components/cake'; 
import axios from 'axios';

export default function CakePreview() {
  const snap = useSnapshot(state);
  const navigate = useNavigate(); 
  const [loaded, setLoaded] = useState(false);

  const [sizeOptions, setSizeOptions] = useState([]);
  const [flavorOptions, setFlavorOptions] = useState([]);

  const [selectionData, setSelectionData] = useState({
    colorName: "Custom Designer Mix",
    size: snap.layers === 1 ? "1 Pound" : snap.layers === 2 ? "2 Pound" : "3 Pound",
    border: !snap.frostingType || snap.frostingType === 'none'
      ? 'No Border'
      : snap.frostingType.charAt(0).toUpperCase() + snap.frostingType.slice(1),
    garnish: !snap.extraItem || snap.extraItem === 'none'
      ? 'No Garnish'
      : snap.extraItem.charAt(0).toUpperCase() + snap.extraItem.slice(1),
    flavor: "Chocolate Truffle",
    price: snap.layers * 1200,
    notes: "Happy Birthday"
  });

  useEffect(() => {
    // Load saved design
    const saved = localStorage.getItem('cakeDesign');
    if (saved) Object.assign(state, JSON.parse(saved));

    const fetchOptions = async () => {
      try {
        const [sizesRes, flavorsRes] = await Promise.all([
          axios.get('http://localhost:5006/api/admin/categories/type/size'),
          axios.get('http://localhost:5006/api/admin/categories/type/flavour'),
        ]);

        setSizeOptions(sizesRes.data.categories.map(c => c.name));
        setFlavorOptions(flavorsRes.data.categories.map(c => c.name));

      } catch (err) {
        console.error("Failed to fetch category options:", err);
      } finally {
        setLoaded(true);
      }
    };

    fetchOptions();
  }, []);

  if (!loaded) return null;

  return (
    <div className="min-h-screen bg-[#faf9f6] p-4 md:p-8 flex items-center justify-center font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/60 backdrop-blur-2xl p-6 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.05)] border border-white"
      >
        {/* LEFT SIDE */}
        <div className="space-y-6 p-4 flex flex-col justify-center">
          <button 
            onClick={() => navigate('/customize-cake')} 
            className="group flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-all text-[10px] font-black uppercase tracking-[0.3em] mb-4"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Studio
          </button>

          <div className="space-y-1">
            <h2 className="text-4xl font-black text-slate-800 tracking-tighter">
              Your <span className="text-pink-500 italic font-medium">Selection</span>
            </h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Review your custom creation</p>
          </div>

          <div className="space-y-2 pt-4">
            {/* Color */}
            <div className="flex justify-between items-center py-5 border-b border-slate-50">
              <span className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">Color</span>
              <div className="flex items-center gap-3">
                {snap.colors.bottomLayer && (
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ background: snap.colors.bottomLayer }}
                  />
                )}
                <span className="text-slate-700 font-extrabold text-sm">{selectionData.colorName}</span>
              </div>
            </div>

            {/* Size Dropdown */}
            <div className="flex justify-between items-center py-5 border-b border-slate-50">
              <span className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">Size</span>
              <select
                value={selectionData.size}
                onChange={e => setSelectionData(prev => ({ ...prev, size: e.target.value }))}
                className="text-slate-700 font-extrabold text-sm border border-slate-300 rounded px-2 py-1"
              >
                {sizeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Flavor Dropdown */}
            <div className="flex justify-between items-center py-5 border-b border-slate-50">
              <span className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">Flavor</span>
              <select
                value={selectionData.flavor}
                onChange={e => setSelectionData(prev => ({ ...prev, flavor: e.target.value }))}
                className="text-slate-700 font-extrabold text-sm border border-slate-300 rounded px-2 py-1"
              >
                {flavorOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Border, Garnish, Notes */}
            {[
              { label: "Border", value: selectionData.border },
              { label: "Garnish", value: selectionData.garnish },
              { label: "Cake Notes", value: selectionData.notes },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-5 border-b border-slate-50">
                <span className="text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">{item.label}</span>
                <span className="text-slate-700 font-extrabold text-sm">{item.value}</span>
              </div>
            ))}

            <div className="flex justify-between items-center pt-8">
              <span className="text-slate-800 font-black text-xs uppercase tracking-[0.2em]">Total Price</span>
              <span className="text-pink-600 font-black text-4xl tracking-tighter">₹{selectionData.price}</span>
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#be185d' }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-pink-600 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(219,39,119,0.3)] flex items-center justify-center gap-3 transition-all"
            >
              <ShoppingBag size={20} /> Add to Cart
            </motion.button>

            <p className="flex items-center justify-center gap-2 text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
              <ShieldCheck size={14} className="text-green-500" /> Secure Checkout · Free Returns
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: 3D PREVIEW */}
        <div className="relative bg-[#f3f4f6] rounded-[2.5rem] overflow-hidden min-h-[500px] border-4 border-white shadow-inner flex items-center justify-center">
          <div className="absolute top-8 left-8 z-10">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Live 3D View</span>
            </div>
          </div>

          <Canvas shadows camera={{ position: [0, 1.5, 5], fov: 30 }}>
            <Stage environment="city" intensity={0.6} contactShadow={false}>
              <Center>
                <CakeModel />
              </Center>
            </Stage>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
          </Canvas>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-10 px-8 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-pink-50 max-w-[80%] text-center"
          >
            <p className="font-serif italic text-pink-600 text-xl tracking-tight">"{selectionData.notes}"</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
