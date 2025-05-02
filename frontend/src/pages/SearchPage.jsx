import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { apiUrl } from '../utils/constants';
import { marked } from 'marked';
import dompurify from 'dompurify';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef(null);

  const Token = JSON.parse(localStorage.getItem('userData'))?.accessToken;
  const email = JSON.parse(localStorage.getItem('userData'))?.email;
  const userId = JSON.parse(localStorage.getItem('userData'))?._id;

  const fetchSearchHistory = async () => {
    try {
      const response = await fetch(`${apiUrl}search/history/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: `Bearer ${Token}`
        },
        body: JSON.stringify({
          email,
        })
      });
      const data = await response.json();

      if (data && data.searchHistory) {
        // Sort history by timestamp (newest first)
        const sortedHistory = data.searchHistory.sort((a, b) =>
          new Date(b.timestamp) - new Date(a.timestamp)
        );
        console.log('Fetched search history:', sortedHistory);
        setSearchHistory(sortedHistory);
      }
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  };
  // Fetch search history on component mount
  useEffect(() => {
    if (!Token || !email) return;
    const fetchSearchHistory = async () => {
      try {
        const response = await fetch(`${apiUrl}search/history/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: `Bearer ${Token}`
          },
          body: JSON.stringify({
            email,
          })
        });
        const data = await response.json();

        if (data && data.searchHistory) {
          // Sort history by timestamp (newest first)
          const sortedHistory = data.searchHistory.sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
          );
          console.log('Fetched search history:', sortedHistory);
          setSearchHistory(sortedHistory);
        }
      } catch (error) {
        console.error('Error fetching search history:', error);
      }
    };

    if (Token && email) {
      fetchSearchHistory();
    }
  }, [Token, email])
  // Handle click outside to close history
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') return;

    try {
      setLoading(true);
      setShowHistory(false);

      const response = await fetch(`${apiUrl}search/ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: `Bearer ${Token}`
        },
        body: JSON.stringify({
          prompt: searchTerm
        })
      });

      const data = await response.json();
      if (data) {
        console.log('Search successful:', data);
        const respText = data?.candidates[0].content.parts[0].text;
        const markeResponnse = marked(respText);
        const sanitizedText = dompurify.sanitize(markeResponnse);
        setAiResponse(sanitizedText);
        setLoading(false);

// Save to database
        const saveHistoryToDb = await fetch(`${apiUrl}search/history`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            token: `Bearer ${Token}`
          },
          body: JSON.stringify({
            prompt: searchTerm,
            email,
          })
        });
        const savedData = await saveHistoryToDb.json();
        console.log("Updated searchHistory", savedData);
        setSearchTerm('');
        // Update local search history
        fetchSearchHistory();

      }
    } catch (error) {
      console.error('Search error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
        <div className="relative flex-1" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a food product..."
              className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowHistory(true)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Search history dropdown */}
          {showHistory && searchHistory.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="px-4 py-2 text-sm text-gray-500 border-b">Recent searches</div>
              <ul className="max-h-48 overflow-y-scroll">
                {searchHistory.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => {
                      setSearchTerm(item);
                      setShowHistory(false);
                    }}
                  >
                    <Search className="mr-2 text-gray-400" size={16} />
                    {item.query}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          className="px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Chat-style response box */}
      <div className="max-w-2xl mx-auto">
        {loading ? (
          <div className="bg-gray-100 p-4 rounded-lg flex justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        ) : aiResponse && (
          <div
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4"
            dangerouslySetInnerHTML={{ __html: aiResponse }}
          />
        )}
      </div>
    </div>
  );
}

export default SearchPage;