import { User } from 'lucide-react';
import EarthCanvas from '../canvas/Earth';
import SearchInput from '../canvas/SearchInput';
import StarsCanvas from '../canvas/Stars';

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      {/* 3D Earth */}
      <EarthCanvas />
      <StarsCanvas />

      {/* Top Right User Icon */}
      <div className="absolute top-0 right-0 px-6 py-4">
        <button className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-md ring-1 ring-white/30 flex items-center justify-center hover:bg-white/40 transition">
          <User className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Centered Search section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-10 pointer-events-none">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">Oyou</h1>
        <SearchInput />
      </div>
    </div>
  );
}
