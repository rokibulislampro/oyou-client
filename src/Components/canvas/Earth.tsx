'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

const Earth = () => {
  const earth = useGLTF('/planet/scene.gltf');
  const [scale, setScale] = useState(2.5);

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth >= 1024 ? 3 : 2);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <primitive object={earth.scene} scale={scale} position={[0, 0, 0]} />;
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0, 10] }}
    >
      <OrbitControls
        autoRotate
        autoRotateSpeed={5}
        enableZoom
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 2.9}
      />
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
