import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Info } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/home" className="flex items-center space-x-2">
            <span className="text-xl font-bold">GoodBites</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/search" className="flex items-center space-x-1 hover:text-green-200">
              <Search size={20} />
              <span>Search</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-1 hover:text-green-200">
              <Info size={20} />
              <span>About Us</span>
            </Link>
            <Link 
              to="/auth" 
              className="flex items-center space-x-1 bg-green-700 px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
            >
              <User size={20} />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;