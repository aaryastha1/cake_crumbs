// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

// // Loads a GLB/GLTF model
// const Model = ({ path }) => {
//   const gltf = useGLTF(path);
//   return <primitive object={gltf.scene} scale={1} />;
// };

// const ModelViewer = ({ path, width = 80, height = 80 }) => {
//   if (!path) return <div className="w-full h-full bg-slate-50" />;

//   return (
//     <Canvas
//       style={{ width, height }}
//       camera={{ position: [0, 1, 3], fov: 30 }}
//     >
//       <Stage environment="city" intensity={0.5}>
//         <Model path={path} />
//       </Stage>
//       <OrbitControls enableZoom={false} />
//     </Canvas>
//   );
// };

// export default ModelViewer;
