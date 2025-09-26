import { Settings } from 'lucide-react';
import EarthCanvas from '../canvas/Earth';
import SearchInput from '../canvas/SearchInput';
import './Home.css';

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      {/* Gradient Background */}
      <div className="w-full h-screen absolute inset-0 z-[-1] bg-gradient-to-b from-[#0b0c10] via-[#1f2833] to-[#0b0c10]">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-2/3 right-1/3 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* 3D Earth */}
      <EarthCanvas />

      {/* Top Right User Icon */}
      <div className="absolute top-3 right-3 px-6 py-4">
        <button className="h-10 w-10 rounded-full bg-white/30 backdrop-blur-md ring-1 ring-white/30 flex items-center justify-center hover:bg-white/40 transition">
          <Settings className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Centered Search section */}
      <div className="absolute top-[16.666%] left-1/2 -translate-x-1/2 xl:top-1/2 xl:-translate-y-1/2 w-full flex flex-col items-center pointer-events-none">
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
