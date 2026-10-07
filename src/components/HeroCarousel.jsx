import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, MessageCircle, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/nimcoData';
import { useStore } from '../context/StoreContext';

export const HeroCarousel = () => {
  const { navigateTo, setActiveCategory, whatsappNumber } = useStore();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play timer for hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((curr) => (curr + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlideIndex];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleBulkOrder = () => {
    document.getElementById('bulk-orders-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("Assalam-o-Alaikum! I want to order authentic Khandani Nimco snacks. Please share today's fresh menu & details.");
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) handleNext();
    else if (diff < -45) handlePrev();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-hidden bg-[#1c0f0a] text-white border-b border-[#3b1f13]"
    >
      {/* Subtle Warm Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c8913c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#78350f]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left">
            
            {/* Subtitle in Golden Amber */}
            <div className="text-[11px] sm:text-xs font-black tracking-[0.2em] uppercase text-[#e5a842]">
              TRADITIONAL PAKISTANI NIMCO
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#fdf8f2] font-serif leading-[1.12]">
              Khandani Nimco<br />
              <span className="font-normal italic text-[#f4caa0]">Made for Every Occasion</span>
            </h1>

            {/* Decorative Vintage Flourish Divider */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-[#c8913c] py-1">
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c8913c]" />
              <span className="text-sm">✦ ❖ ✦</span>
              <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c8913c]" />
            </div>

            {/* Tagline Bullet Points */}
            <p className="text-xs sm:text-sm font-medium text-[#ecd8c3]/90 tracking-wide">
              Authentic taste <span className="text-[#e5a842] mx-1">•</span> Premium quality <span className="text-[#e5a842] mx-1">•</span> Freshly prepared
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={handleBulkOrder}
                className="w-full sm:w-auto bg-[#e5a842] hover:bg-[#d99b26] text-[#1c0f0a] font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transform active:scale-95 transition-all"
              >
                <ShoppingCart className="w-4 h-4 fill-[#1c0f0a]" />
                <span>Bulk Order Karein</span>
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto bg-[#22c55e] hover:bg-[#16a34a] text-white font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transform active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Us</span>
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-3">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentSlideIndex === idx
                      ? 'w-6 bg-[#e5a842]'
                      : 'w-2 bg-[#6b4731] hover:bg-[#a16207]'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Traditional Brass Nimco Feast Showcase */}
          <div className="lg:col-span-6 relative flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-lg aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#c8913c]/40 group"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c0f0a]/80 via-transparent to-black/20" />

                {/* Bottom Card Title Banner */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#1c0f0a]/90 backdrop-blur-md border border-[#c8913c]/30 p-3 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-[#e5a842] font-bold block uppercase tracking-wider">
                      {slide.badge || 'Featured Snack'}
                    </span>
                    <strong className="text-white text-xs font-serif line-clamp-1">
                      {slide.title}
                    </strong>
                  </div>
                  <button
                    onClick={() => {
                      if (slide.categoryFilter) setActiveCategory(slide.categoryFilter);
                      navigateTo('shop');
                    }}
                    className="bg-[#e5a842] hover:bg-[#d99b26] text-[#1c0f0a] font-black px-3 py-1.5 rounded-xl text-[11px] flex-shrink-0"
                  >
                    View Snack
                  </button>
                </div>

                {/* Left/Right Arrow Overlays */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/20"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/20"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};
