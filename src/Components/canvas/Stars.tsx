'use client';

import { useRef, useMemo, JSX } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as THREE from 'three';

// Custom function to generate random points inside a sphere
function generateInSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let x = Math.random() * 2 - 1;
    let y = Math.random() * 2 - 1;
    let z = Math.random() * 2 - 1;
    const len = Math.sqrt(x * x + y * y + z * z);
    if (len > 0) {
      x /= len;
      y /= len;
      z /= len;
    }
    const r = Math.cbrt(Math.random()) * radius;
    positions[i * 3] = x * r;
    positions[i * 3 + 1] = y * r;
    positions[i * 3 + 2] = z * r;
  }
  return positions;
}

// Instead of React.FC<any>, use proper typing
const Stars = (props: JSX.IntrinsicElements['group']) => {
  const ref = useRef<THREE.Points>(null);

  // Generate star positions without external lib
  const sphere = useMemo(() => generateInSphere(5000, 1.2), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.05;
      ref.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]} {...props}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#217aff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-screen absolute inset-0 z-[-1] bg-gradient-to-b from-[#0b0c10] via-[#1f2833] to-[#0b0c10]">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 right-1/3 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Three.js Canvas */}
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;


