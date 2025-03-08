import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils } from 'lucide-react';

function WelcomeScreen() {
  const [fadeOut, setFadeOut] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show content with initial animation
    setTimeout(() => setShowContent(true), 100);

    // Start fade out sequence
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        navigate('/home');
      }, 1200);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      className={`fixed inset-0 bg-green-50 flex flex-col items-center justify-center transition-all duration-1200 ${
        fadeOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      <div className={`text-center transition-all duration-1000 ${
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <Utensils 
          className={`w-24 h-24 text-green-600 mx-auto mb-6 transition-transform duration-700 ${
            showContent ? 'scale-100 rotate-0' : 'scale-50 rotate-180'
          }`} 
        />
        <h1 className={`text-6xl font-bold text-green-800 mb-4 tracking-tight transition-all duration-700 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Welcome to
        </h1>
        <div className="relative">
          <h1 className={`text-8xl font-extrabold text-green-600 tracking-tighter transition-all duration-700 delay-200 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            GoodBites
          </h1>
          <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-green-400 rounded-full transition-all duration-700 delay-400 ${
            showContent ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}></div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;