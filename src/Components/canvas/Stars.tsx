'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';

const Stars: React.FC<any> = props => {
  const ref = useRef<THREE.Points>(null);

  // Generate random positions
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(5000 * 3), { radius: 1.2 }),
    []
  );

  // Create individual random offsets for twinkling
  const twinkleOffsets = useMemo(() => {
    const arr = new Float32Array(5000);
    for (let i = 0; i < 5000; i++) arr[i] = Math.random() * Math.PI * 2;
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotate the star field slowly
      ref.current.rotation.x += delta * 0.05;
      ref.current.rotation.y += delta * 0.05;

      // Animate twinkle by changing size per star
      const material = ref.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        // Using simple time-based sinusoidal effect
        const time = state.clock.elapsedTime;
        material.uniforms.uSize.value =
          0.002 + Math.sin(time + twinkleOffsets[0]) * 0.001;
      }
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#217aff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
          vertexColors={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas: React.FC = () => {
  return (
    <div className="w-full h-screen absolute inset-0 z-[-1] bg-gradient-to-b from-[#0b0c10] via-[#1f2833] to-[#0b0c10]">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 right-1/3 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Three.js Canvas */}
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
