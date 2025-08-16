'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { Mic, Search, Settings, User } from 'lucide-react';

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

const EarthCanvasWithSearch = () => {
  return (
    <div className="relative w-full h-screen">
      {/* 3D Earth */}
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

      {/* Top Right User Icon */}
      <div className="absolute top-0 right-0 px-6 py-4">
        <button className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-md ring-1 ring-white/30 flex items-center justify-center hover:bg-white/40 transition">
          <User className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Centered Search section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-10 pointer-events-none">
        {/* Title above search bar */}
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">Oyou</h1>

        <div className="relative w-full max-w-4xl px-4 pointer-events-auto">
          {/* side glows */}
          <div className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 h-24 w-40 rounded-full bg-white/10 blur-xl"></div>
          <div className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 h-24 w-40 rounded-full bg-white/10 blur-xl"></div>

          {/* main search bar */}
          <div className="relative h-14 flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl ring-1 ring-white/25 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            {/* Mic button */}
            <button
              aria-label="Voice search"
              className="flex h-12 w-12 items-center justify-center text-white transition"
            >
              <Mic className="h-5 w-5" />
            </button>

            {/* Search input */}
            <div className="flex-1 flex items-center rounded-full bg-white/90 ring-1 ring-black/5 shadow-md">
              {' '}
              <input
                type="text"
                placeholder="Search Oyou or type a URL"
                className="w-full bg-transparent outline-none placeholder-black/50"
              />{' '}
              <Search className="h-10 w-5 opacity-70" aria-hidden="true" />{' '}
            </div>

            {/* Settings button */}
            <button
              aria-label="Search settings"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 hover:bg-white/25 transition"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthCanvasWithSearch;
