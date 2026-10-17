import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, CheckCircle, MapPin, MessageSquarePlus, Quote, ThumbsUp, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

export const CustomerReviewsSection = () => {
  const { feedbacks, siteConfig, setIsFeedbackModalOpen } = useStore();
  const [activeFilter, setActiveFilter] = useState('all');

  const title = siteConfig?.reviewsSectionTitle || "Loved by Customers Across Pakistan";
  const subtitle = siteConfig?.reviewsSectionSubtitle || "Authentic crunch, unmatched freshness & traditional taste praised by thousands of happy families";
  const badgeText = siteConfig?.reviewsSectionBadge || "⭐ 4.9 / 5.0 (500+ Verified Orders)";

  // Filter reviews
  const filteredReviews = (feedbacks || []).filter(item => {
    if (activeFilter === '5stars') return (item.rating || 5) === 5;
    if (activeFilter === 'karachi') return (item.city || '').toLowerCase().includes('karachi');
    if (activeFilter === 'overseas') return (item.category || '').toLowerCase().includes('export') || (item.city || '').toLowerCase().includes('dubai') || (item.city || '').toLowerCase().includes('overseas');
    return true;
  });

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* 1. Header with Traditional Heritage Accents */}
      <div className="text-center mb-9 sm:mb-11">
        
        {/* Rating pill */}
        <div className="inline-flex items-center gap-2 bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold px-3.5 py-1 rounded-full mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{badgeText}</span>
        </div>

        {/* Section Title with horizontal lines */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 mb-2">
          <span className="h-[1px] w-12 sm:w-28 bg-[#D3C6B4]" />
          <div className="flex items-center gap-2">
            <span className="text-emerald-700 text-xs select-none">🌿</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#311A0A] tracking-tight">
              {title}
            </h2>
            <span className="text-emerald-700 text-xs select-none">🌿</span>
          </div>
          <span className="h-[1px] w-12 sm:w-28 bg-[#D3C6B4]" />
        </div>

        <p className="text-xs sm:text-sm text-[#544333] font-medium max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => setActiveFilter('all')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
              activeFilter === 'all'
                ? 'bg-[#6A330E] text-white shadow-sm'
                : 'bg-white text-[#544333] border border-[#D3C6B4] hover:bg-[#F0E3D1]'
            }`}
          >
            All Reviews ({feedbacks?.length || 0})
          </button>

          <button
            onClick={() => setActiveFilter('5stars')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
              activeFilter === '5stars'
                ? 'bg-[#6A330E] text-white shadow-sm'
                : 'bg-white text-[#544333] border border-[#D3C6B4] hover:bg-[#F0E3D1]'
            }`}
          >
            ⭐ 5-Star Only
          </button>

          <button
            onClick={() => setActiveFilter('karachi')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
              activeFilter === 'karachi'
                ? 'bg-[#6A330E] text-white shadow-sm'
                : 'bg-white text-[#544333] border border-[#D3C6B4] hover:bg-[#F0E3D1]'
            }`}
          >
            📍 Karachi Heritage
          </button>

          <button
            onClick={() => setActiveFilter('overseas')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
              activeFilter === 'overseas'
                ? 'bg-[#6A330E] text-white shadow-sm'
                : 'bg-white text-[#544333] border border-[#D3C6B4] hover:bg-[#F0E3D1]'
            }`}
          >
            ✈️ Overseas & Exports
          </button>
        </div>

      </div>

      {/* 2. Customer Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {filteredReviews.map((item, idx) => {
          const initials = (item.customerName || item.name || 'Valued Customer')
            .split(' ')
            .map(n => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={item.id || idx}
              className="bg-white border border-[#E7DFD5] rounded-2xl p-5 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Subtle Quote icon watermark */}
              <Quote className="absolute top-4 right-4 w-7 h-7 text-[#F0E3D1]/80 -scale-x-100 pointer-events-none group-hover:text-amber-200/50 transition-colors" />

              <div className="space-y-3.5">
                
                {/* Header: Avatar, Name & Location */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8C3A00] to-[#4A1800] text-amber-100 font-bold text-xs flex items-center justify-center shrink-0 shadow-sm border border-amber-900/20">
                    {initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-[#311A0A] truncate">
                      {item.customerName || item.name}
                    </h4>

                    <div className="flex items-center gap-1 text-[11px] text-[#8C7A6B] mt-0.5">
                      <MapPin className="w-3 h-3 text-[#AF7F47] shrink-0" />
                      <span className="truncate">{item.city || 'Pakistan'}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Stars & Verified Badge */}
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (item.rating || 5)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>

                  {item.verified !== false && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-2.5 h-2.5" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                {/* Product / Occasion Tag */}
                {item.product && (
                  <div className="inline-block text-[10px] font-semibold text-[#6A330E] bg-[#F7EFE5] px-2 py-0.5 rounded border border-[#E7DFD5]">
                    📦 {item.product}
                  </div>
                )}

                {/* Review Text */}
                <p className="text-xs text-[#4A3828] leading-relaxed italic line-clamp-4">
                  "{item.comment}"
                </p>

              </div>

              {/* Bottom Details */}
              <div className="pt-3.5 mt-3.5 border-t border-[#F0E3D1] flex items-center justify-between text-[11px] text-[#8C7A6B]">
                <span className="font-medium text-[10px] bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200/60">
                  {item.category || 'Taste & Quality'}
                </span>
                <span className="text-[10px]">{item.date}</span>
              </div>

            </div>
          );
        })}
      </div>

      {/* 3. Bottom Action & Trust Strip */}
      <div className="mt-10 bg-[#F0E3D1]/50 border border-[#D3C6B4] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5">
        
        {/* Trust Points */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 text-xs text-[#311A0A]">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>100% Pure Fresh Ingredients</span>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Nitrogen Crisp Packing</span>
          </div>
          <div className="flex items-center gap-2 font-semibold col-span-2 sm:col-span-1">
            <HeartHandshake className="w-4 h-4 text-rose-700 shrink-0" />
            <span>25,000+ Happy Families</span>
          </div>
        </div>

        {/* Write Review Button */}
        <button
          onClick={() => setIsFeedbackModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#6A330E] hover:bg-[#522508] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all shrink-0 hover:scale-[1.02] active:scale-95"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Apna Review Share Karein</span>
        </button>

      </div>

    </section>
  );
};
