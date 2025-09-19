import { User } from 'lucide-react';
import EarthCanvas from '../canvas/Earth';
import SearchInput from '../canvas/SearchInput';
import StarsCanvas from '../canvas/Stars';
import "./Home.css";

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
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="title text-6xl font-bold cursor-pointer flex gap-0.5 pointer-events-auto">
          {['O', 'Y', 'O', 'U'].map((letter, index) => (
            <span
              key={index}
              className="transform transition-transform duration-500 hover:-translate-y-1 hover:scale-110 pointer-events-auto"
              style={{
                background: `linear-gradient(45deg, ${
                  index === 0
                    ? '#FF6B6B, #FFD93D'
                    : index === 1
                    ? '#6BCB77, #4D96FF'
                    : index === 2
                    ? '#FF6B6B, #FF6BFF'
                    : '#FFD93D, #6BCBFF'
                })`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        <SearchInput />
      </div>
    </div>
  );
}
