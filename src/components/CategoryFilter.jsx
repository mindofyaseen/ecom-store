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

  const baseCategories = [
    { label: 'All', icon: '🌟', title: 'All Nimco' },
    { label: 'Mix Nimco', icon: '🥨', title: 'Mix Nimco' },
    { label: 'Gathiya & Bhujia', icon: '🌶️', title: 'Gathiya & Bhujia' },
    { label: 'Sew (Sev)', icon: '🍜', title: 'Sew (Sev)' },
    { label: 'Dal Snacks', icon: '🥣', title: 'Dal Snacks' },
    { label: 'Chewra & Papri', icon: '🍿', title: 'Chewra & Papri' },
    { label: 'Salted Nuts', icon: '🥜', title: 'Salted Nuts' },
    { label: 'Nimco Hampers', icon: '🎁', title: 'Nimco Hampers' }
  ];

  // Append any extra unique categories present in products
  const productCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
  const extraCategories = productCategories
    .filter(cat => !baseCategories.some(b => b.label === cat))
    .map(cat => ({ label: cat, icon: '🏷️', title: cat }));

  const categories = [...baseCategories, ...extraCategories];

  const getCategoryCount = (catLabel) => {
    if (catLabel === 'All') return products.length;
    return products.filter((p) => p.category === catLabel).length;
  };

  return (
    <div className="bg-[#F0E3D1]/60 border-b border-[#D3C6B4] py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {/* Wishlist Quick Filter Pill */}
          <button
            onClick={() => {
              setShowWishlistOnly(!showWishlistOnly);
            }}
            className={`flex-shrink-0 flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
              showWishlistOnly
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-white text-[#544333] border-[#D3C6B4] hover:border-rose-400 hover:text-rose-600'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showWishlistOnly ? 'fill-white' : 'text-rose-500'}`} />
            <span>My Favorites</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              showWishlistOnly ? 'bg-rose-800 text-white' : 'bg-[#F9F3EC] text-rose-700'
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
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#311A0A] text-[#F9F3EC] border-[#311A0A] shadow-sm'
                    : 'bg-white text-[#544333] border-[#D3C6B4] hover:border-[#6A330E] hover:text-[#311A0A]'
                }`}
              >
                <span className="text-xs">{cat.icon}</span>
                <span>{cat.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected
                      ? 'bg-[#ECB85A] text-[#1C0A02]'
                      : 'bg-[#F9F3EC] text-[#544333]'
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
