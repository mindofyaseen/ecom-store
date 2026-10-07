import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart } from 'lucide-react';

export const CategoryFilter = () => {
  const {
    activeCategory,
    setActiveCategory,
    products,
    showWishlistOnly,
    setShowWishlistOnly,
    wishlist
  } = useStore();

  const categories = [
    { label: 'All', icon: '🌟', title: 'All Nimco' },
    { label: 'Mix Nimco', icon: '🥨', title: 'Mix Nimco' },
    { label: 'Gathiya & Bhujia', icon: '🌶️', title: 'Gathiya & Bhujia' },
    { label: 'Sew (Sev)', icon: '🍜', title: 'Sew (Sev)' },
    { label: 'Dal Snacks', icon: '🥣', title: 'Dal Snacks' },
    { label: 'Chewra & Papri', icon: '🍿', title: 'Chewra & Papri' },
    { label: 'Salted Nuts', icon: '🥜', title: 'Salted Nuts' },
    { label: 'Nimco Hampers', icon: '🎁', title: 'Nimco Hampers' }
  ];

  const getCategoryCount = (catLabel) => {
    if (catLabel === 'All') return products.length;
    return products.filter((p) => p.category === catLabel).length;
  };

  return (
    <div className="bg-[#fcf9f2] border-b border-[#eaddcb] py-3 sm:py-4 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {/* Wishlist Quick Filter Pill */}
          <button
            onClick={() => {
              setShowWishlistOnly(!showWishlistOnly);
            }}
            className={`flex-shrink-0 flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm border ${
              showWishlistOnly
                ? 'bg-rose-600 text-white border-rose-500 shadow-rose-500/20 shadow-md scale-105'
                : 'bg-white text-[#715442] border-[#eaddcb] hover:border-rose-400 hover:text-rose-600'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showWishlistOnly ? 'fill-white' : 'text-rose-500'}`} />
            <span>My Favorites</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
              showWishlistOnly ? 'bg-rose-800 text-white' : 'bg-rose-100 text-rose-700'
            }`}>
              {wishlist.length}
            </span>
          </button>

          {/* Regular Category Pills */}
          {categories.map((cat) => {
            const isSelected = !showWishlistOnly && activeCategory === cat.label;
            const count = getCategoryCount(cat.label);

            return (
              <button
                key={cat.label}
                onClick={() => {
                  setShowWishlistOnly(false);
                  setActiveCategory(cat.label);
                }}
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm border ${
                  isSelected
                    ? 'bg-[#200e08] text-[#e5a842] border-[#200e08] shadow-md transform scale-105'
                    : 'bg-white text-[#4a2e1d] border-[#eaddcb] hover:border-[#a16207] hover:bg-[#faf5ec]'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isSelected
                      ? 'bg-[#e5a842] text-[#200e08]'
                      : 'bg-[#f5ece0] text-[#78350f]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
