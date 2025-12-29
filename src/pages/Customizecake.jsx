import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Decal, useTexture, Float, Center } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { motion } from 'framer-motion';
import { SketchPicker } from 'react-color';
import { Upload, RotateCw, Sparkles as SparkleIcon, Check } from 'lucide-react';
import { state } from '../store/store';

// --- COMPONENTS ---
import Header from '../components/Header'; 
import Footer from '../components/Footer';

// --- 3D TOPPINGS COMPONENT ---
function Toppings({ type, layers }) {
  if (type === 'none') return null;

  const topY = layers === 1 ? 0.61 : layers === 2 ? 1.11 : 1.71;
  const radius = layers === 1 ? 0.7 : layers === 2 ? 0.5 : 0.35;

  const positions = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    return [Math.cos(angle) * radius, topY, Math.sin(angle) * radius];
  });

  return (
    <group>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          {type === 'cherries' && (
            <>
              <mesh castShadow>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshStandardMaterial color="#8B0000" roughness={0.1} />
              </mesh>
              <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0.3]}>
                <cylinderGeometry args={[0.005, 0.005, 0.12]} />
                <meshStandardMaterial color="#2d1a0e" />
              </mesh>
            </>
          )}
          {type === 'chocolate' && (
            <mesh castShadow rotation={[0.5, i, 0]}>
              <boxGeometry args={[0.12, 0.04, 0.18]} />
              <meshStandardMaterial color="#3d1d11" roughness={0.4} />
            </mesh>
          )}
          {type === 'berries' && (
            <mesh castShadow>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial color="#D32F2F" roughness={0.6} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

// --- GLITTER SYSTEM ---
function Glitter({ color }) {
  const ref = useRef();
  const points = useMemo(() => Array.from({ length: 50 }).map(() => ({
    pos: [(Math.random() - 0.5) * 2.5, (Math.random() * 2.5) - 0.5, (Math.random() - 0.5) * 2.5],
  })), []);

  useFrame((state) => {
    ref.current.children.forEach((child, i) => {
      child.scale.setScalar(Math.sin(state.clock.elapsedTime * 3 + i) * 0.4 + 0.6);
    });
  });

  return (
    <group ref={ref}>
      {points.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
}

// --- FROSTING SHAPES ---
function FrostingEdge({ radius, height, color, type }) {
  if (type === 'none') return null;

  if (type === 'smooth') {
    return (
      <mesh position={[0, height / 2 + 0.01, 0]}>
        <torusGeometry args={[radius, 0.025, 12, 100]} />
        <meshStandardMaterial color={color} roughness={1} />
      </mesh>
    );
  }
  return (
    <group position={[0, height / 2 + 0.02, 0]}>
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]} rotation={[0, -angle, 0]}>
            {type === 'piped' ? <sphereGeometry args={[0.07, 12, 12]} /> : <coneGeometry args={[0.07, 0.14, 6]} />}
            <meshStandardMaterial color={color} roughness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

// --- CORE CAKE ASSEMBLY ---
function CakeModel() {
  const snap = useSnapshot(state);
  const texture = useTexture(snap.logoTexture);
  const group = useRef();

  useFrame((_, delta) => {
    if (snap.isRotating) group.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        {/* Tier 1 */}
        <group position={[0, snap.layers === 1 ? 0 : -0.6, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.2, 1.2, 1.2, 64]} />
            <meshStandardMaterial color={snap.colors.bottomLayer} roughness={0.9} />
          </mesh>
          <FrostingEdge radius={1.2} height={1.2} color={snap.colors.bottomLayer} type={snap.frostingType} />
        </group>

        {/* Tier 2 */}
        {snap.layers >= 2 && (
          <group position={[0, snap.layers === 2 ? 0.6 : 0.4, 0]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.8, 0.8, 1, 64]} />
              <meshStandardMaterial color={snap.colors.midLayer} roughness={0.9} />
              {snap.layers === 2 && <Decal position={[0, 0, 0.8]} scale={0.5} map={texture} />}
            </mesh>
            <FrostingEdge radius={0.8} height={1} color={snap.colors.midLayer} type={snap.frostingType} />
          </group>
        )}

        {/* Tier 3 */}
        {snap.layers === 3 && (
          <group position={[0, 1.4, 0]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.5, 0.5, 0.8, 64]} />
              <meshStandardMaterial color={snap.colors.topLayer} roughness={0.9} />
              <Decal position={[0, 0, 0.5]} scale={0.4} map={texture} />
            </mesh>
            <FrostingEdge radius={0.5} height={0.8} color={snap.colors.topLayer} type={snap.frostingType} />
          </group>
        )}

        <Toppings type={snap.extraItem} layers={snap.layers} />
        {snap.showSparkles && <Glitter color={snap.colors.sparkle} />}
        
        <mesh position={[0, -1.25, 0]}>
          <cylinderGeometry args={[1.6, 1.6, 0.05, 64]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

// --- UI PAGE ---
export default function Customizecake() {
  const snap = useSnapshot(state);

  return (
    <div className="flex flex-col h-screen w-full bg-[#f8f9fa] overflow-hidden">
      <Header />

      <main className="flex-grow relative overflow-hidden flex items-center justify-center">
        {/* NEXT BUTTON – RIGHT SIDE */}
<div className="absolute right-10 bottom-10 z-20">
  <button
    onClick={() => {
      localStorage.setItem('cakeDesign', JSON.stringify(state));
      window.location.href = '/cake-preview';
    }}
    className="bg-gradient-to-r from-pink-600 to-rose-500 text-white font-black px-10 py-5 rounded-full shadow-[0_15px_30px_rgba(219,39,119,0.4)] transition-all flex items-center gap-3 tracking-widest text-sm"
  >
    NEXT →
  </button>
</div>

        {/* Canvas Area */}
        <div className="absolute inset-0 z-0">
          <Canvas shadows camera={{ position: [0, 1, 5.5], fov: 35 }} className="w-full h-full">
            <ambientLight intensity={0.8} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
            <Environment preset="city" />
            <Suspense fallback={null}>
              {/* Removed "top" prop to center the object perfectly in the middle of the available space */}
              <Center>
                  <CakeModel />
              </Center>
            </Suspense>
            <ContactShadows position={[0, -1.3, 0]} opacity={0.4} scale={12} blur={2.8} />
            <OrbitControls makeDefault enablePan={false} maxPolarAngle={Math.PI / 1.8} />
          </Canvas>
        </div>

        {/* Refined Sidebar UI */}
        <div className="absolute inset-0 p-6 pointer-events-none flex items-start justify-start">
          <motion.div 
            initial={{ x: -100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            className="bg-white/80 backdrop-blur-xl border border-white/50 p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-[18rem] pointer-events-auto overflow-y-auto max-h-[60vh] scrollbar-hide"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              Design Your Cake
            </h2>

            {/* Layer Selection */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Number of Tiers</label>
              <div className="flex bg-gray-100/50 p-1 rounded-2xl gap-1">
                {[1, 2, 3].map((num) => (
                  <button 
                    key={num} 
                    onClick={() => (state.layers = num)} 
                    className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${snap.layers === num ? 'bg-white shadow-sm text-pink-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Layer Tabs */}
            <div className="flex gap-2 mb-4 border-b border-gray-100 pb-2">
              {['bottomLayer', 'midLayer', 'topLayer'].slice(0, snap.layers).map(t => (
                <button 
                  key={t} 
                  onClick={() => state.currentPart = t} 
                  className={`relative px-3 py-1 text-xs font-bold uppercase transition ${snap.currentPart === t ? 'text-pink-500' : 'text-gray-400'}`}
                >
                  {t.replace('Layer', '')}
                  {snap.currentPart === t && <motion.div layoutId="active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500" />}
                </button>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
              <SketchPicker 
                width="100%" 
                elevation={0}
                color={snap.colors[snap.currentPart]} 
                onChange={(c) => state.colors[snap.currentPart] = c.hex} 
              />
            </div>

            <div className="mt-8 space-y-6">
              {/* Border Styles */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Border Detail</label>
                <div className="grid grid-cols-2 gap-2">
                  {['none', 'smooth', 'piped', 'star'].map(f => (
                    <button 
                      key={f} 
                      onClick={() => state.frostingType = f} 
                      className={`py-2 text-[10px] font-bold uppercase rounded-xl border transition-all flex items-center justify-center gap-2 ${snap.frostingType === f ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
                    >
                      {snap.frostingType === f && <Check size={10} />} {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Toppings */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Garnish</label>
                <div className="grid grid-cols-2 gap-2">
                  {['none', 'cherries', 'chocolate', 'berries'].map(t => (
                    <button 
                      key={t} 
                      onClick={() => state.extraItem = t} 
                      className={`py-2 text-[10px] font-bold uppercase rounded-xl border transition-all ${snap.extraItem === t ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Utility Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => state.showSparkles = !state.showSparkles} 
                  className={`flex-1 flex items-center justify-center gap-2 border p-3 rounded-2xl text-xs font-bold transition-all ${snap.showSparkles ? 'bg-amber-400 border-amber-500 text-white shadow-lg' : 'bg-white text-gray-500 border-gray-200 shadow-sm'}`}
                >
                  <SparkleIcon size={14} /> GLITTER
                </button>
                <button 
                  onClick={() => state.isRotating = !state.isRotating} 
                  className={`flex-1 flex items-center justify-center gap-2 border p-3 rounded-2xl text-xs font-bold transition-all ${snap.isRotating ? 'bg-blue-500 border-blue-600 text-white' : 'bg-white text-gray-500 border-gray-200 shadow-sm'}`}
                >
                  <RotateCw size={14} className={snap.isRotating ? 'animate-spin' : ''} /> SPIN
                </button>
              </div>

              {/* File Upload */}
              <label className="flex items-center justify-center gap-3 bg-gradient-to-r from-gray-800 to-black text-white p-4 rounded-2xl cursor-pointer hover:shadow-2xl transition-all shadow-xl group">
                <Upload size={16} className="group-hover:-translate-y-1 transition-transform" /> 
                <span className="text-xs font-black uppercase tracking-widest">Add Custom Decal</span>
                <input type="file" hidden onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => (state.logoTexture = reader.result);
                    reader.readAsDataURL(file);
                  }
                }} />
              </label>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}