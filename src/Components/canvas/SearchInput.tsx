'use client';

import { Mic } from 'lucide-react';
import { useState } from 'react';
import './SearchInput.css';

const SearchInput = () => {
  const [query, setQuery] = useState('');

  // const router = useRouter(); // 🚫 API/Router এখন কমেন্ট করা

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // 🚫 এখন কোনো রাউটিং বা API কল হবে না
      console.log('Search query:', query);
    }
  };

  const handleVoiceSearch = () => {
    if (typeof window === 'undefined') return;

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
        } else {
          interimTranscript += transcript;
          setQuery(interimTranscript);
        }
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
      <div className="relative search-var h-13 flex items-center gap-1 rounded-full bg-white/5 backdrop-blur-xl ring-1 ring-white/25 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <div className="flex-1 flex items-center rounded-full bg-[#00000072] hover:bg-[#0000004a] ring-1 ring-black/5 shadow-md transition-colors">
          <input
            type="text"
            placeholder="Search Oyou or type a URL"
            className="search-input w-full bg-transparent outline-none px-3"
            style={{
              background:
                'linear-gradient(45deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF, #FF6B6B, #FF6BFF, #FFD93D, #6BCBFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button
            type="button"
            aria-label="Voice search"
            className="flex h-8 w-8 text-[#bebebe8e] items-center justify-center transition"
            onClick={handleVoiceSearch}
          >
            <Mic className="h-5 w-5" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
