import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';

interface SearchBarProps {
  className?: string;
  onSearch: (query: string) => void;
  recentSearches?: string[];
}

export function SearchBar({ className, onSearch, recentSearches }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showRecent, setShowRecent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowRecent(false);
    }
  };

  const handleRecentSearch = (search: string) => {
    setQuery(search);
    onSearch(search);
    setShowRecent(false);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative w-full max-w-2xl", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowRecent(true)}
          placeholder="Search for food products..."
          className="w-full rounded-full border border-gray-200 bg-white py-4 pl-12 pr-4 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      {showRecent && recentSearches && recentSearches.length > 0 && (
        <div className="absolute mt-2 w-full rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
          <h4 className="mb-2 px-2 text-sm font-medium text-gray-500">Recent Searches</h4>
          {recentSearches.map((search, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleRecentSearch(search)}
              className="w-full rounded px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              {search}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}