import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Phone, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroSection = () => {
  const { whatsappNumber, navigateTo, siteConfig } = useStore();

  const activeWhatsapp = siteConfig?.whatsappNumber || whatsappNumber;
  const storeName = siteConfig?.storeName || 'Khandani Nimco';
  const displayPhone = siteConfig?.announcementPhone || siteConfig?.phoneNumber || '+92 324 2478108';

  // Fallback default slides if siteConfig.heroSlides is empty
  const defaultSlides = [
    {
      id: "slide-1",
      eyebrow: siteConfig?.heroEyebrow || "TRADITIONAL PAKISTANI NIMCO",
      title: siteConfig?.heroTitle || storeName,
      subtitle: siteConfig?.heroSubtitle || "Made for Every Occasion",
      tagline: siteConfig?.heroTagline || "Authentic taste • Premium quality • Freshly prepared",
      badge: "⭐ Burns Road Heritage",
      primaryCtaText: siteConfig?.heroPrimaryCtaText || "Explore Collection",
      primaryCtaLink: siteConfig?.heroPrimaryCtaLink || "shop",
      secondaryCtaText: siteConfig?.heroSecondaryCtaText || "WhatsApp Us",
      secondaryCtaLink: siteConfig?.heroSecondaryCtaLink || "whatsapp",
      imageUrl: siteConfig?.heroImageUrl || "/assets/reference/hero_food.jpg"
    },
    {
      id: "slide-2",
      eyebrow: "FRESH CRUNCH EVERY DAY",
      title: "Wholesale & Event Packs",
      subtitle: "Weddings, Parties & Shops",
      tagline: "Custom batch roasting • Bulk discount pricing • Nationwide delivery",
      badge: "🎉 Event & Wholesale",
      primaryCtaText: "Bulk Order Karein",
      primaryCtaLink: "bulk-orders",
      secondaryCtaText: "Call Helpline",
      secondaryCtaLink: "tel",
      imageUrl: "/assets/reference/wholesale_food.jpg"
    },
    {
      id: "slide-3",
      eyebrow: "TAKING PAKISTANI NIMCO",
      title: "Beyond Borders",
      subtitle: "International Export Supply",
      tagline: "Vacuum-sealed freshness • Customs compliant • Worldwide cargo",
      badge: "✈️ Worldwide Shipping",
      primaryCtaText: "Export Inquiry",
      primaryCtaLink: "export",
      secondaryCtaText: "Chat on WhatsApp",
      secondaryCtaLink: "whatsapp",
      imageUrl: "/assets/reference/export_ship.jpg"
    }
  ];

  const slides = siteConfig?.heroSlides && siteConfig.heroSlides.length > 0
    ? siteConfig.heroSlides
    : defaultSlides;

  const carouselEnabled = siteConfig?.carouselEnabled !== false && slides.length > 1;
  const carouselAutoplay = siteConfig?.carouselAutoplay !== false;
  const intervalMs = Number(siteConfig?.carouselInterval) || 5000;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Keep index in valid range if slides array changes
  useEffect(() => {
    if (currentIndex >= slides.length) {
      setCurrentIndex(0);
    }
  }, [slides.length, currentIndex]);

  // Autoplay timer
  useEffect(() => {
    if (!carouselEnabled || !carouselAutoplay || isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, intervalMs);

    return () => clearInterval(timer);
  }, [carouselEnabled, carouselAutoplay, isPaused, intervalMs, slides.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext(); // swipe left
    } else if (distance < -50) {
      handlePrev(); // swipe right
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleCtaClick = (linkTarget, defaultPage = 'shop') => {
    if (!linkTarget) {
      navigateTo(defaultPage);
      return;
    }
    if (linkTarget === 'whatsapp') {
      window.open(
        `https://wa.me/${activeWhatsapp}?text=Assalam-o-Alaikum!%20I%20want%20to%20order%20from%20${encodeURIComponent(storeName)}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else if (linkTarget === 'tel') {
      window.location.href = `tel:${displayPhone.replace(/[^0-9+]/g, '')}`;
    } else {
      navigateTo(linkTarget);
    }
  };

  const currentSlide = slides[currentIndex] || slides[0] || defaultSlides[0];

  return (
    <section
      className="relative w-full bg-[#1C0A02] text-[#F9F3EC] overflow-hidden border-b border-[#311A0A] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto relative">
        
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSlide.id || currentIndex}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] items-center"
          >
            {/* Left Column: Text Content & CTAs */}
            <div className="lg:col-span-6 px-6 sm:px-10 lg:pl-12 lg:pr-6 py-10 sm:py-14 z-10 flex flex-col justify-center">
              
              {/* Slide Badge & Eyebrow row */}
              <div className="flex items-center gap-2.5 flex-wrap mb-2.5">
                {currentSlide.badge && (
                  <span className="bg-[#ECB85A]/15 border border-[#ECB85A]/40 text-[#ECB85A] text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#ECB85A]" />
                    <span>{currentSlide.badge}</span>
                  </span>
                )}
                <p className="text-[#ECB85A] text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase">
                  {currentSlide.eyebrow || 'TRADITIONAL PAKISTANI NIMCO'}
                </p>
              </div>

              {/* Large Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black font-serif text-[#F9F3EC] leading-[1.08] tracking-tight mb-1.5">
                {currentSlide.title || storeName}
              </h1>

              {/* Secondary Subtitle */}
              <h2 className="text-xl sm:text-2xl lg:text-[30px] font-normal font-serif text-[#F0E3D1]/90 italic leading-snug mb-3">
                {currentSlide.subtitle || 'Made for Every Occasion'}
              </h2>

              {/* Decorative Gold Divider */}
              <div className="flex items-center gap-3 my-2 max-w-md">
                <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#ECB85A]/70 to-[#ECB85A]" />
                <svg className="w-4 h-4 text-[#ECB85A]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.4 9.6H22L15.8 14.1L18.2 21.7L12 17.2L5.8 21.7L8.2 14.1L2 9.6H9.6L12 2Z" opacity="0.8" />
                </svg>
                <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#ECB85A]/70 to-[#ECB85A]" />
              </div>

              {/* Value proposition tagline */}
              <p className="text-[#F0E3D1]/85 text-xs sm:text-sm font-medium tracking-wide my-3 leading-relaxed">
                {currentSlide.tagline || "Authentic taste • Premium quality • Freshly prepared"}
              </p>

              {/* Call-to-action buttons */}
              <div className="flex items-center flex-wrap gap-3 sm:gap-4 mt-2 pt-1">
                {/* Primary CTA */}
                <button
                  onClick={() => handleCtaClick(currentSlide.primaryCtaLink, 'shop')}
                  className="bg-[#ECB85A] hover:bg-[#DD8F25] text-[#1C0A02] font-black text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-lg shadow-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <ShoppingCart className="w-4 h-4 text-[#1C0A02]" />
                  <span>{currentSlide.primaryCtaText || 'Explore Collection'}</span>
                </button>

                {/* Secondary CTA */}
                {currentSlide.secondaryCtaText && (
                  <button
                    onClick={() => handleCtaClick(currentSlide.secondaryCtaLink, 'whatsapp')}
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-lg shadow-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Phone className="w-4 h-4 fill-white" />
                    <span>{currentSlide.secondaryCtaText}</span>
                  </button>
                )}
              </div>

            </div>

            {/* Right Column: High Quality Photography */}
            <div className="lg:col-span-6 relative h-[280px] sm:h-[340px] lg:h-full min-h-[320px] overflow-hidden">
              {/* Gradient edge overlays */}
              <div className="absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#1C0A02] via-[#1C0A02]/85 to-transparent z-10 pointer-events-none hidden lg:block" />
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#1C0A02] to-transparent z-10 pointer-events-none lg:hidden" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1C0A02] to-transparent z-10 pointer-events-none lg:hidden" />

              <img
                src={currentSlide.imageUrl || siteConfig?.heroImageUrl || '/assets/reference/hero_food.jpg'}
                alt={`${currentSlide.title || storeName} Slide Photo`}
                className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Interactive Controls (Only if carouselEnabled) */}
        {carouselEnabled && (
          <>
            {/* Left Prev Arrow Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#1C0A02]/80 hover:bg-[#ECB85A] text-[#ECB85A] hover:text-[#1C0A02] border border-[#ECB85A]/40 flex items-center justify-center transition-all backdrop-blur-sm shadow-lg hover:scale-110 active:scale-95"
              aria-label="Previous Slide"
              title="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Next Arrow Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#1C0A02]/80 hover:bg-[#ECB85A] text-[#ECB85A] hover:text-[#1C0A02] border border-[#ECB85A]/40 flex items-center justify-center transition-all backdrop-blur-sm shadow-lg hover:scale-110 active:scale-95"
              aria-label="Next Slide"
              title="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom Pagination Strip */}
            <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center gap-3 px-4">
              <div className="bg-[#1C0A02]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#ECB85A]/30 flex items-center gap-3 shadow-lg">
                
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {slides.map((slide, idx) => (
                    <button
                      key={slide.id || idx}
                      onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      className={`transition-all rounded-full ${
                        idx === currentIndex
                          ? 'w-6 h-2 bg-[#ECB85A] shadow-sm'
                          : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Counter text */}
                <span className="text-[11px] font-mono font-bold text-[#ECB85A] pl-1 border-l border-white/20">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </span>

                {/* Pause / Play status icon */}
                {carouselAutoplay && (
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="text-white/60 hover:text-white transition-colors p-0.5"
                    title={isPaused ? "Resume Autoplay" : "Pause Autoplay"}
                  >
                    {isPaused ? <Play className="w-3 h-3 text-[#ECB85A]" /> : <Pause className="w-3 h-3" />}
                  </button>
                )}
              </div>
            </div>
          </>
        )}

      </div>
    </section>
  );
};
