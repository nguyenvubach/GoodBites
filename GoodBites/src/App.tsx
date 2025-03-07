import React, { useState, useEffect } from 'react';
import { History, Leaf, AlertTriangle, ShieldAlert, Droplets, Wheat, Cookie, Sandwich, PlusCircle, Home } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { HealthScore } from './components/HealthScore';
import { NoResults } from './components/NoResults';
import { RecentSearches } from './components/RecentSearches';
import { ProductSubmission } from './components/ProductSubmission';

// Temporary mock data
const mockProduct = {
  name: "Organic Granola",
  brand: "Nature's Best",
  healthScore: 8,
  image: "https://images.unsplash.com/photo-1517747614396-d21a78b850e8?auto=format&fit=crop&q=80&w=500",
  ingredients: ["Rolled oats", "Honey", "Almonds", "Coconut oil", "Chia seeds"],
  alternatives: [
    { name: "Protein Granola", healthScore: 7, brand: "FitFoods" },
    { name: "Low Sugar Granola", healthScore: 9, brand: "HealthyChoice" }
  ]
};

const harmfulIngredients = [
  {
    name: "Seed Oils",
    icon: Droplets,
    description: "Highly processed oils like canola, soybean, and corn oil are high in inflammatory omega-6 fatty acids and often undergo chemical extraction.",
    alternatives: "Use olive oil, coconut oil, or avocado oil instead.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "High Fructose Corn Syrup",
    icon: Cookie,
    description: "A highly processed form of sugar linked to obesity, diabetes, and liver problems. Often hidden in processed foods and beverages.",
    alternatives: "Choose natural sweeteners like honey, maple syrup, or whole fruits.",
    image: "https://images.unsplash.com/photo-1558642891-54be180ea339?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Modified Corn Starch",
    icon: Wheat,
    description: "A highly processed thickener that can spike blood sugar and offers no nutritional value. Common in processed foods and sauces.",
    alternatives: "Look for products using natural thickeners like arrowroot or tapioca starch.",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Artificial Preservatives",
    icon: ShieldAlert,
    description: "Chemical additives like BHA, BHT, and sodium nitrite may have potential health risks and are often found in processed meats and packaged foods.",
    alternatives: "Choose fresh, whole foods or products using natural preservatives like vitamin E or rosemary extract.",
    image: "https://images.unsplash.com/photo-1626200926749-cccc3d2caf12?auto=format&fit=crop&q=80&w=500"
  }
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [showSubmission, setShowSubmission] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchPerformed(true);
    setShowRecentSearches(false);
    
    // Add to recent searches if not already present
    if (!recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev].slice(0, 10));
    }
  };

  const clearSearchHistory = () => {
    setRecentSearches([]);
  };

  const toggleRecentSearches = () => {
    setShowRecentSearches(!showRecentSearches);
    setSearchPerformed(false);
  };

  const handleHomeClick = () => {
    setSearchQuery('');
    setSearchPerformed(false);
    setShowRecentSearches(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">FoodScan</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleHomeClick}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
                aria-label="Go to home page"
              >
                <Home className="h-5 w-5" />
                <span className="hidden sm:inline">Home</span>
              </button>
              <button
                onClick={() => setShowSubmission(true)}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                <PlusCircle className="h-5 w-5" />
                <span className="hidden sm:inline">Submit Product</span>
              </button>
              <button
                onClick={toggleRecentSearches}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                <History className="h-5 w-5" />
                <span className="hidden sm:inline">Recent Searches</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <section className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Discover the Quality of Your Food
          </h2>
          <p className="mb-8 text-gray-600">
            Search for any food product to check its health score and find better alternatives
          </p>
          <SearchBar 
            onSearch={handleSearch} 
            className="mx-auto"
            recentSearches={recentSearches}
          />
        </section>

        {/* Content Section */}
        {showRecentSearches ? (
          <section className="mx-auto max-w-4xl">
            <RecentSearches
              searches={recentSearches}
              onSearchClick={handleSearch}
              onClearHistory={clearSearchHistory}
            />
          </section>
        ) : searchPerformed ? (
          searchQuery === 'Organic Granola' ? (
            <section className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <img
                    src={mockProduct.image}
                    alt={mockProduct.name}
                    className="rounded-lg object-cover"
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">{mockProduct.name}</h3>
                  <p className="mb-4 text-gray-600">{mockProduct.brand}</p>
                  <HealthScore score={mockProduct.healthScore} className="mb-6" />
                  
                  <div className="mb-6">
                    <h4 className="mb-2 font-semibold text-gray-900">Ingredients:</h4>
                    <ul className="list-inside list-disc text-gray-600">
                      {mockProduct.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-gray-900">Healthier Alternatives:</h4>
                    <div className="space-y-2">
                      {mockProduct.alternatives.map((alt, index) => (
                        <div key={index} className="rounded-lg bg-gray-50 p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{alt.name}</p>
                              <p className="text-sm text-gray-600">{alt.brand}</p>
                            </div>
                            <HealthScore score={alt.healthScore} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <NoResults searchQuery={searchQuery} />
          )
        ) : (
          // Harmful Ingredients Section
          <section className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <div className="mb-4 flex items-center justify-center">
                <AlertTriangle className="mr-2 h-8 w-8 text-red-500" />
                <h2 className="text-3xl font-bold text-gray-900">Common Harmful Ingredients</h2>
              </div>
              <p className="text-gray-600">
                Learn about potentially harmful ingredients commonly found in processed foods and discover healthier alternatives
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {harmfulIngredients.map((ingredient, index) => (
                <div key={index} className="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-[1.02]">
                  <div className="relative h-48">
                    <img
                      src={ingredient.image}
                      alt={ingredient.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center">
                      <ingredient.icon className="mr-2 h-6 w-6 text-white" />
                      <h3 className="text-xl font-bold text-white">{ingredient.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="mb-4 text-gray-600">{ingredient.description}</p>
                    <div className="rounded-lg bg-green-50 p-4">
                      <h4 className="mb-2 font-semibold text-green-800">Healthier Alternatives:</h4>
                      <p className="text-green-700">{ingredient.alternatives}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Product Submission Modal */}
      {showSubmission && <ProductSubmission onClose={() => setShowSubmission(false)} />}
    </div>
  );
}

export default App;