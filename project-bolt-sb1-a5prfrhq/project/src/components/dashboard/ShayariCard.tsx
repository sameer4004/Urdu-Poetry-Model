import React from 'react';
import { Heart, Share2, Copy } from 'lucide-react';
import { Shayari } from '../../types';

interface ShayariCardProps {
  shayari: Shayari;
}

export const ShayariCard: React.FC<ShayariCardProps> = ({ shayari }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shayari.content);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shayari.title,
          text: shayari.content,
        });
      } catch (err) {
        console.error('Failed to share:', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="border-l-4 border-gray-400 pl-6 mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{shayari.title}</h3>
        <div className="text-gray-700 leading-relaxed text-right whitespace-pre-line text-lg">
          {shayari.content}
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          <span className="font-medium">{shayari.author}</span>
          {shayari.category && (
            <span className="mx-2">•</span>
          )}
          {shayari.category && (
            <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
              {shayari.category}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            title="کاپی کریں"
          >
            <Copy className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleShare}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            title="شیئر کریں"
          >
            <Share2 className="w-4 h-4" />
          </button>
          
          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};