import React from 'react';
import { Clock, Search, Trash2 } from 'lucide-react';

interface RecentSearchesProps {
  searches: string[];
  onSearchClick: (query: string) => void;
  onClearHistory: () => void;
}

export function RecentSearches({ searches, onSearchClick, onClearHistory }: RecentSearchesProps) {
  if (searches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Clock className="mb-4 h-16 w-16 text-gray-400" />
        <h3 className="mb-2 text-xl font-semibold text-gray-900">No recent searches</h3>
        <p className="text-gray-600">
          Your search history will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Recent Searches</h2>
        <button
          onClick={onClearHistory}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
          Clear History
        </button>
      </div>
      <div className="space-y-2">
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => onSearchClick(search)}
            className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-gray-50"
          >
            <Search className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700">{search}</span>
          </button>
        ))}
      </div>
    </div>
  );
}