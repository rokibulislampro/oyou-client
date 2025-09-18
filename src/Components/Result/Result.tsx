'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type SearchResult = {
  title: string;
  link: string;
  snippet: string;
};

const Result = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/search?q=${encodeURIComponent(
            query
          )}`
        ); // relative path
        const data = await res.json();
        setResults(data || []); // data is now array
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Oyou</h1>
          <p className="text-gray-500 text-sm">
            Search results for:{' '}
            <span className="font-semibold text-black">{query}</span>
          </p>
        </div>
      </header>

      {/* Results Section */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {loading ? (
          <p className="text-gray-500">Loading results...</p>
        ) : results.length > 0 ? (
          <div className="space-y-8">
            {results.map((item, index) => (
              <div key={index} className="group">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <p className="text-sm text-green-700 truncate">{item.link}</p>
                  <h2 className="text-xl font-medium text-blue-700 group-hover:underline">
                    {item.title}
                  </h2>
                </a>
                <p className="text-gray-600 mt-1">{item.snippet}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </main>
    </div>
  );
};

export default Result;
