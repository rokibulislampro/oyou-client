'use client';

import { useRouter } from 'next/navigation';
import { Mic, Search, Settings } from 'lucide-react';
import { useState } from 'react';

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // URL change: /result?q=searchTerm
      router.push(`/result?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full max-w-4xl px-4 pointer-events-auto"
    >
      {/* side glows */}
      <div className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 h-24 w-40 rounded-full bg-white/10 blur-xl"></div>
      <div className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 h-24 w-40 rounded-full bg-white/10 blur-xl"></div>

      {/* main search bar */}
      <div className="relative h-14 flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl ring-1 ring-white/25 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        {/* Mic button */}
        <button
          type="button"
          aria-label="Voice search"
          className="flex h-12 w-12 items-center justify-center text-white transition"
        >
          <Mic className="h-5 w-5" />
        </button>

        {/* Search input */}
        <div className="flex-1 flex items-center rounded-full bg-white/90 ring-1 ring-black/5 shadow-md">
          <input
            type="text"
            placeholder="Search Oyou or type a URL"
            className="w-full bg-transparent outline-none placeholder-black/50 px-3"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" className="px-3">
            <Search className="h-6 w-6 opacity-70" aria-hidden="true" />
          </button>
        </div>

        {/* Settings button */}
        <button
          type="button"
          aria-label="Search settings"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 hover:bg-white/25 transition"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
