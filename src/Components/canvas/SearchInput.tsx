'use client';

import { useRouter } from 'next/navigation';
import { Mic, Search, Settings } from 'lucide-react';
import { useState } from 'react';
import './SearchInput.css';

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/result?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleVoiceSearch = () => {
    if (typeof window === 'undefined') return; // ✅ SSR safe

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support voice recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setQuery(transcript);

          setTimeout(() => {
            if (transcript.trim()) {
              router.push(`/result?q=${encodeURIComponent(transcript.trim())}`);
            }
          }, 300);
        } else {
          interimTranscript += transcript;
          setQuery(interimTranscript);
        }
      }
    };

    recognition.onend = () => {
      if (query.trim()) {
        router.push(`/result?q=${encodeURIComponent(query.trim())}`);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Voice recognition error:', event.error);
    };
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative search-padding w-full max-w-4xl pointer-events-auto"
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
          className="flex h-12 w-12 items-center justify-center text-white hover:text-blue-500 transition"
          onClick={handleVoiceSearch}
        >
          <Mic className="h-5 w-5" />
        </button>

        {/* Search input */}
        <div className="flex-1 flex items-center rounded-full bg-white/90 hover:bg-white ring-1 ring-black/5 shadow-md transition-colors">
          <input
            type="text"
            placeholder="Search Oyou or type a URL"
            className="search-input w-full bg-transparent outline-none placeholder-black/50 px-3"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" className="search-icon">
            <Search className="h-5 w-5 opacity-80" aria-hidden="true" />
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
