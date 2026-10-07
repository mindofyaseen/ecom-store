import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Eye, Check, MessageCircle, AlertCircle, Heart, Flame } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductCard = ({ product }) => {
  const {
    addToCart,
    openProductPage,
    generateWhatsAppLink,
    formatPrice,
    toggleWishlist,
    isWishlisted
  } = useStore();

  const weightOptions = product.weightOptions || [
    { label: "100 gm", value: 0.1, priceMultiplier: 1 },
    { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
    { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
  ];

  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0]);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentPrice = Math.round(product.price * selectedWeight.priceMultiplier);
  const favorited = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e?.stopPropagation();
    addToCart(product, selectedWeight, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWhatsAppOrder = (e) => {
    e?.stopPropagation();
    const text = `Assalam-o-Alaikum! I want to order:\n\n*Product:* ${product.name}\n*Weight:* ${selectedWeight.label}\n*Price:* ${formatPrice(currentPrice)}\n\nPlease guide me on delivery slot.`;
    window.open(generateWhatsAppLink(text), '_blank');
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="bg-white border border-[#eaddcb] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#c8913c]/60 transition-all duration-300 flex flex-col justify-between group relative"
    >
      {/* Product Image Area */}
      <div 
        onClick={() => openProductPage(product.id)}
        className="relative aspect-square overflow-hidden bg-[#faf5ec] cursor-pointer p-3 flex items-center justify-center"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 ${
            isOutOfStock ? 'opacity-40 grayscale' : ''
          }`}
        />

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-all shadow-sm z-10 ${
            favorited
              ? 'bg-rose-500 text-white scale-110'
              : 'bg-white/80 hover:bg-white text-[#78350f] hover:text-rose-500'
          }`}
          title={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-white' : ''}`} />
        </button>

        {/* Spice Level Indicator */}
        {product.spiceLevel && (
          <span className="absolute bottom-2.5 left-2.5 bg-[#1c0f0a]/80 backdrop-blur-sm text-[#e5a842] text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
            <Flame className="w-2.5 h-2.5 text-red-400" />
            {product.spiceLevel}
          </span>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <span className="absolute inset-0 m-auto w-max h-max bg-red-600 text-white font-bold text-[10px] px-3 py-1 rounded-full shadow">
            Out of Stock
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2.5 text-center bg-white">
        
        <div>
          {/* Product Title */}
          <h3 
            onClick={() => openProductPage(product.id)}
            className="text-xs sm:text-sm font-black text-[#200e08] hover:text-[#a16207] cursor-pointer line-clamp-1 transition-colors font-serif"
          >
            {product.name}
          </h3>

          {/* Subtext: Weight & Price in the reference style */}
          <div className="text-[11px] font-semibold text-[#715442] mt-0.5">
            <span>{selectedWeight.label}</span>
            <span className="mx-1 text-[#b47d48]">|</span>
            <strong className="text-[#200e08] font-bold">{formatPrice(currentPrice)}</strong>
          </div>
        </div>

        {/* Quick Weight Pills */}
        <div className="flex items-center justify-center gap-1 pt-0.5">
          {weightOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedWeight(opt);
              }}
              className={`px-1.5 py-0.5 rounded-lg text-[9px] font-bold transition-all border ${
                selectedWeight.label === opt.label
                  ? 'bg-[#200e08] text-[#e5a842] border-[#200e08]'
                  : 'bg-[#faf6ee] text-[#715442] border-[#eaddcb] hover:border-[#b47d48]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Action Buttons: Dark Pill "Order Now" & WhatsApp */}
        <div className="pt-1 flex items-center gap-1.5">
          <button
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={`flex-1 py-1.5 px-3 rounded-full font-bold text-[11px] shadow transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : isOutOfStock
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#1c0f0a] hover:bg-[#34180d] text-[#fdf8f2] border border-[#a16207]/30'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <span>Order Now</span>
            )}
          </button>

          <button
            disabled={isOutOfStock}
            onClick={handleWhatsAppOrder}
            className="p-1.5 rounded-full border border-[#22c55e]/40 bg-[#f0fdf4] hover:bg-[#22c55e] text-[#16a34a] hover:text-white transition-colors"
            title="Order on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </motion.div>
  );
};
