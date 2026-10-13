import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Check, Heart } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const {
    addToCart,
    openProductPage,
    formatPrice,
    toggleWishlist,
    isWishlisted
  } = useStore();

  const weightOptions = product.weightOptions || [
    { label: "100 gm", value: 0.1, priceMultiplier: 1 }
  ];

  const defaultWeight = weightOptions[0];
  const [addedAnimation, setAddedAnimation] = useState(false);
  const favorited = isWishlisted(product.id);
  const currentPrice = Math.round(product.price * defaultWeight.priceMultiplier);

  const handleOrderNow = (e) => {
    e?.stopPropagation();
    addToCart(product, defaultWeight, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      onClick={() => openProductPage(product.id)}
      className="group relative bg-white border border-[#D3C6B4] rounded-[10px] p-2.5 sm:p-3 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[#6A330E]"
    >
      {/* 1. Upper Image Area */}
      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#F9F3EC]/80 flex items-center justify-center p-1.5 mb-2.5">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain transform group-hover:scale-108 transition-transform duration-300 ease-out"
        />

        {/* Favorite Wishlist Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-1.5 right-1.5 p-1 rounded-full transition-colors ${
            favorited ? 'text-red-500 bg-white/90 shadow' : 'text-[#311A0A]/40 hover:text-red-500 bg-white/60'
          }`}
          title="Save to favorites"
          aria-label="Save to favorites"
        >
          <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-red-500' : ''}`} />
        </button>
      </div>

      {/* 2. Product Name */}
      <div className="text-center flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-[13px] sm:text-[14px] font-bold text-[#311A0A] leading-tight line-clamp-1 group-hover:text-[#6A330E] transition-colors">
            {product.name}
          </h3>

          {/* 3. Weight & Price Subtitle (e.g. 100 gm | Rs 150) */}
          <p className="text-[11px] sm:text-[12px] text-[#544333] font-medium mt-0.5 mb-2.5">
            {defaultWeight.label} | <span className="font-bold text-[#311A0A]">{formatPrice(currentPrice)}</span>
          </p>
        </div>

        {/* 4. Dark Chocolate "Order Now" Button */}
        <button
          onClick={handleOrderNow}
          className={`w-full py-1.5 px-2 rounded-md font-bold text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1.5 ${
            addedAnimation
              ? 'bg-[#ECB85A] text-[#1C0A02]'
              : 'bg-[#311A0A] text-[#F9F3EC] hover:bg-[#1C0A02] active:scale-95'
          }`}
        >
          {addedAnimation ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <span>Order Now</span>
          )}
        </button>
      </div>
    </div>
  );
};
