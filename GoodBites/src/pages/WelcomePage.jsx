import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

function WelcomePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 px-4 page-transition">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold text-green-800 mb-6">
          Make Healthier Food Choices
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover the health score of your favorite processed foods and find healthier alternatives
          for a better lifestyle.
        </p>
        <Link
          to="/search"
          className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-200 scale-in"
        >
          <Search className="mr-2" size={24} />
          Start Exploring
        </Link>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {[
          {
            title: "Health Scores",
            description: "Get detailed health scores for thousands of processed food products."
          },
          {
            title: "Ingredients",
            description: "Learn about ingredients and their impact on your health."
          },
          {
            title: "Alternatives",
            description: "Discover healthier alternatives to your favorite products."
          }
        ].map((item, index) => (
          <div 
            key={item.title}
            className="bg-white p-6 rounded-xl shadow-md transition-all duration-500"
            style={{ 
              animationDelay: `${index * 200}ms`,
              animation: 'fadeIn 0.8s ease-out forwards',
              opacity: 0 
            }}
          >
            <h3 className="text-xl font-semibold text-green-700 mb-3">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WelcomePage;