import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="شاعری تلاش کریں... (مثال: محبت، درد، خوشی)"
            className="w-full pl-12 pr-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 shadow-lg"
            dir="rtl"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'تلاش کر رہا ہے...' : 'تلاش کریں'}
        </button>
      </form>
    </div>
  );
};