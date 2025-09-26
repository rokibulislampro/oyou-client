'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { MeshStandardMaterial, Color, Object3D, Mesh } from 'three';

const Earth = () => {
  const earth = useGLTF('/planet/scene.gltf');
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    earth.scene.traverse((child: Object3D) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        mesh.material = new MeshStandardMaterial({
          map: (mesh.material as MeshStandardMaterial).map,
          emissive: new Color('#ece6ff'),
          emissiveMap: (mesh.material as MeshStandardMaterial).map,
          emissiveIntensity: 1.5,
          roughness: 0.6,
          metalness: 0.2,
        });
      }
    });

    const handleResize = () => {
      setScale(window.innerWidth >= 1024 ? 0.3 : 0.22);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [earth]);

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
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <OrbitControls
        autoRotate
        autoRotateSpeed={5}
        enableZoom
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
      />
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
