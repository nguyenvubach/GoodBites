import React from 'react';
import { SearchX } from 'lucide-react';

interface NoResultsProps {
  searchQuery: string;
}

export function NoResults({ searchQuery }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <SearchX className="mb-4 h-16 w-16 text-gray-400" />
      <h3 className="mb-2 text-xl font-semibold text-gray-900">No results found</h3>
      <p className="text-gray-600">
        We couldn't find any products matching "{searchQuery}"
      </p>
    </div>
  );
}