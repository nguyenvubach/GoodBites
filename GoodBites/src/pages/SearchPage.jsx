import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Mock data for demonstration
const mockProducts = [
  {
    id: 1,
    name: "Organic Granola",
    brand: "Nature's Best",
    healthScore: 85,
    category: "Breakfast Cereals",
    image: "https://images.unsplash.com/photo-1517093702855-a3c7966b8417?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "Whole Grain Crackers",
    brand: "HealthyBite",
    healthScore: 75,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=400"
  }
];

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products] = useState(mockProducts);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for a food product..."
            className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{product.brand}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.healthScore >= 80 ? 'bg-green-100 text-green-800' :
                  product.healthScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  Score: {product.healthScore}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;