import React, { useRef, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { Decal, useTexture, Float, Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { state } from '../store/store';

function Sparkles({ count = 100, color }) {
  const points = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [(Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2.5],
      speed: Math.random() * 0.01,
    }));
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    ref.current.children.forEach((child, i) => {
      child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.001;
      child.scale.setScalar(Math.sin(state.clock.elapsedTime * 2 + i) * 0.5 + 0.5);
    });
  });

  return (
    <group ref={ref}>
      {points.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function FrostingPiping({ radius, height, color, type }) {
  if (type === 'smooth') return <mesh position={[0, height / 2, 0]}><torusGeometry args={[radius, 0.03, 16, 100]} /><meshStandardMaterial color={color} roughness={1} /></mesh>;
  
  const count = 30;
  return (
    <group position={[0, height / 2, 0]}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]} rotation={[0, -angle, 0]}>
            {type === 'piped' ? <sphereGeometry args={[0.06, 16, 16]} /> : <coneGeometry args={[0.06, 0.12, 6]} />}
            <meshStandardMaterial color={color} roughness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Cake() {
  const snap = useSnapshot(state);
  const texture = useTexture(snap.logoTexture);
  const group = useRef();

  useFrame((_, delta) => {
    if (snap.isRotating) group.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Tier 1 */}
        <group position={[0, snap.layers === 1 ? 0 : -0.6, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.2, 1.2, 1.2, 64]} />
            <meshStandardMaterial color={snap.colors.bottomLayer} roughness={0.9} />
          </mesh>
          <FrostingPiping radius={1.2} height={1.2} color={snap.colors.bottomLayer} type={snap.frostingType} />
        </group>

        {/* Tier 2 */}
        {snap.layers >= 2 && (
          <group position={[0, snap.layers === 2 ? 0.6 : 0.4, 0]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.8, 0.8, 1, 64]} />
              <meshStandardMaterial color={snap.colors.midLayer} roughness={0.9} />
              {snap.layers === 2 && <Decal position={[0, 0, 0.8]} scale={0.5} map={texture} />}
            </mesh>
            <FrostingPiping radius={0.8} height={1} color={snap.colors.midLayer} type={snap.frostingType} />
          </group>
        )}

        {/* Tier 3 */}
        {snap.layers === 3 && (
          <group position={[0, 1.3, 0]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.5, 0.5, 0.8, 64]} />
              <meshStandardMaterial color={snap.colors.topLayer} roughness={0.9} />
              <Decal position={[0, 0, 0.5]} scale={0.4} map={texture} />
            </mesh>
            <FrostingPiping radius={0.5} height={0.8} color={snap.colors.topLayer} type={snap.frostingType} />
          </group>
        )}

        {/* Garnish / Extra Toppings */}
{snap.extraItem && snap.extraItem !== 'none' && (
  <group>
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = snap.layers === 1 ? 0.7 : snap.layers === 2 ? 0.5 : 0.35;
      const topY = snap.layers === 1 ? 0.61 : snap.layers === 2 ? 1.11 : 1.71;
      const pos = [Math.cos(angle) * radius, topY, Math.sin(angle) * radius];

      return (
        <group key={i} position={pos}>
          {snap.extraItem === 'cherries' && (
            <>
              <mesh castShadow>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshStandardMaterial color="#8B0000" roughness={0.1} />
              </mesh>
              <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.005, 0.005, 0.12]} />
                <meshStandardMaterial color="#2d1a0e" />
              </mesh>
            </>
          )}
          {snap.extraItem === 'chocolate' && (
            <mesh castShadow rotation={[0.5, i, 0]}>
              <boxGeometry args={[0.12, 0.04, 0.18]} />
              <meshStandardMaterial color="#3d1d11" roughness={0.4} />
            </mesh>
          )}
          {snap.extraItem === 'berries' && (
            <mesh castShadow>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial color="#D32F2F" roughness={0.6} />
            </mesh>
          )}
        </group>
      );
    })}
  </group>
)}


        {/* Sparkle Effect */}
        {snap.showSparkles && <Sparkles color={snap.colors.sparkle} />}
        
        <mesh position={[0, -1.25, 0]}><cylinderGeometry args={[1.5, 1.5, 0.1, 64]} /><meshStandardMaterial color="#ffffff" roughness={0.2} /></mesh>
      </Float>
    </group>
  );
}