import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import Cake from "./Cake";

const CakeCanvas = () => {
  return (
    <div className="flex-1 h-full bg-white relative">
      <Canvas shadows camera={{ position: [0, 8, 15], fov: 35 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} castShadow />
        
        {/* Adds the professional reflections from the photo  */}
        <Environment preset="apartment" /> 

        <Cake />

        <ContactShadows 
          position={[0, -0.1, 0]} 
          opacity={0.4} 
          scale={20} 
          blur={2} 
          far={1.5} 
        />
        
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.8} />
      </Canvas>
    </div>
  );
};

export default CakeCanvas;