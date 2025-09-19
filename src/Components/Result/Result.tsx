'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Mic } from 'lucide-react';
import Footer from '../Footer/Footer';
import './Result.css';

type SearchResult = {
  title: string;
  link: string;
  snippet: string;
  image?: string;
};

const Result = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch results from API
  const fetchResults = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/search?q=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      setResults(data || []);
    } catch (err) {
      console.error('Error fetching results:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on initial load & handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const query = params.get('q') || '';
      setSearchTerm(query);
      if (query) fetchResults(query);
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Normal search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    router.push(`/result?q=${encodeURIComponent(searchTerm.trim())}`);
    fetchResults(searchTerm.trim());
  };

  // Voice search
  const handleVoiceSearch = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert('Your browser does not support voice recognition.');
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          const finalTranscript = transcript.trim();
          setSearchTerm(finalTranscript);
          router.push(`/result?q=${encodeURIComponent(finalTranscript)}`);
          fetchResults(finalTranscript); // ✅ fetch final result
        } else {
          interimTranscript += transcript;
          setSearchTerm(interimTranscript); // show interim in input
        }
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Voice recognition error:', event.error);
    };
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header with Search Bar */}
      <div className="sticky top-0 z-50 bg-white shadow-lg shadow-blue-50">
        <div className="top-padding max-w-5xl mx-auto flex items-center gap-2 lg:gap-7 perspective-1000">
          {/* Logo */}
          <h1
            className="text-4xl font-bold cursor-pointer flex gap-0.5"
            onClick={() => router.push('/')}
          >
            {['O', 'Y', 'O', 'U'].map((letter, index) => (
              <span
                key={index}
                className={`transform transition-transform duration-500 hover:-translate-y-1 hover:scale-110`}
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

          {/* Search Input */}
          <form
            onSubmit={handleSearch}
            className="flex-1 relative flex items-center gap-2"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input w-full border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 shadow-lg shadow-blue-50 pl-4 pr-12"
              placeholder="Search..."
            />

            {/* Search button */}
            <button
              type="submit"
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 transition"
            >
              <Search />
            </button>

            {/* Mic button */}
            <button
              type="button"
              onClick={handleVoiceSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 transition"
              aria-label="Voice Search"
            >
              <Mic />
            </button>
          </form>
        </div>
      </div>

      {/* Search Results */}
      <div className="custom-padding">
        <div className="max-w-4xl">
          {loading && <p className="text-gray-500">Loading...</p>}
          {results.map((item, index) => (
            <div
              key={index}
              className="group p-3 custom-margin rounded-lg hover:bg-gray-50 transition-colors"
            >
              <a href={item.link} rel="noopener noreferrer" className="block">
                {/* Logo & Source */}
                <div className="flex items-center gap-3 mb-2">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-full w-8 h-8"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {new URL(item.link).hostname}
                    </span>
                    <span className="text-xs text-green-700">{item.link}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-medium text-blue-700 group-hover:underline">
                  {item.title}
                </h2>

                {/* Description */}
                <p className="text-gray-700 mt-1 text-sm leading-relaxed">
                  {item.snippet}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Result;
