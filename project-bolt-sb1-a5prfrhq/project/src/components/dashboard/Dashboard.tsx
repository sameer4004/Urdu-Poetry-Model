import React, { useState } from 'react';
import { Header } from './Header';
import { SearchBar } from './SearchBar';
import { ShayariCard } from './ShayariCard';
import { useAuth } from '../../contexts/AuthContext';
import { Shayari } from '../../types';
import { shayariAPI } from '../../services/api';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [shayariResults, setShayariResults] = useState<Shayari[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [bigruResult, setBigruResult] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    setBigruResult(null);
    try {
      // Try Bi-GRU generation first
      const bigru = await shayariAPI.generate(query);
      if (bigru && bigru.shayari) {
        setBigruResult(bigru.shayari);
        setShayariResults([]);
      } else {
        setBigruResult(null);
        // fallback to normal search
        const response = await shayariAPI.search(query);
        if (response.success) {
          setShayariResults(response.results);
        } else {
          setShayariResults([]);
        }
      }
    } catch (error) {
      console.error('Search failed:', error);
      setBigruResult(null);
      setShayariResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            خوش آمدید، {user?.name}! 🌹
          </h2>
          <p className="text-xl text-white mb-8">
            اردو شاعری کے خوبصورت مجموعے سے لطف اندوز ہوں
          </p>
          
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Bi-GRU Result Section */}
        {bigruResult && !isLoading && (
          <div className="text-center py-8">
            <div className="bg-gray-800 text-white rounded-xl p-6 shadow-lg inline-block max-w-2xl">
              <h3 className="text-2xl font-bold mb-4">جنریٹڈ شاعری</h3>
              <p className="text-xl leading-loose">{bigruResult}</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="mt-4 text-white">شاعری تلاش کی جا رہی ہے...</p>
          </div>
        )}

        {!isLoading && hasSearched && !bigruResult && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              {shayariResults.length > 0 
                ? `${shayariResults.length} شاعری ملی` 
                : 'کوئی شاعری نہیں ملی'
              }
            </h3>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {shayariResults.map((shayari) => (
                <ShayariCard key={shayari.id} shayari={shayari} />
              ))}
            </div>
          </div>
        )}

        {!hasSearched && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              شاعری کی تلاش شروع کریں
            </h3>
            <p className="text-white max-w-2xl mx-auto">
              اوپر سرچ بار میں اپنے دل کی بات لکھیں اور بہترین اردو شاعری دریافت کریں۔ 
              آپ موضوع، شاعر کا نام، یا کوئی خاص لفظ تلاش کر سکتے ہیں۔
            </p>
          </div>
        )}
      </main>
    </div>
  );
};