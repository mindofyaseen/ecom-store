import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Phone } from 'lucide-react';

export const HeroSection = () => {
  const { whatsappNumber, navigateTo, siteConfig } = useStore();

  const activeWhatsapp = siteConfig?.whatsappNumber || whatsappNumber;
  const storeName = siteConfig?.storeName || 'Khandani Nimco';

  return (
    <section className="relative w-full bg-[#1C0A02] text-[#F9F3EC] overflow-hidden border-b border-[#311A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[340px] sm:min-h-[380px] lg:min-h-[400px] items-center">
          
          {/* Left Column: Text Content & CTAs */}
          <div className="lg:col-span-6 px-6 sm:px-10 lg:pl-12 lg:pr-6 py-10 sm:py-12 z-10 flex flex-col justify-center">
            
            {/* 1. Small uppercase gold eyebrow */}
            <p className="text-[#ECB85A] text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase mb-2">
              {siteConfig?.heroEyebrow || 'TRADITIONAL PAKISTANI NIMCO'}
            </p>

            {/* 2. Large Serif Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black font-serif text-[#F9F3EC] leading-[1.08] tracking-tight mb-1">
              {siteConfig?.heroTitle || storeName}
            </h1>

            {/* 3. Secondary Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal font-serif text-[#F0E3D1]/90 italic leading-snug mb-3">
              {siteConfig?.heroSubtitle || 'Made for Every Occasion'}
            </h2>

            {/* 4. Thin decorative gold divider with center swirl/knot */}
            <div className="flex items-center gap-3 my-2 max-w-md">
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#ECB85A]/70 to-[#ECB85A]" />
              <svg className="w-5 h-5 text-[#ECB85A]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.4 9.6H22L15.8 14.1L18.2 21.7L12 17.2L5.8 21.7L8.2 14.1L2 9.6H9.6L12 2Z" opacity="0.8" />
              </svg>
              <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#ECB85A]/70 to-[#ECB85A]" />
            </div>

            {/* 5. Value Proposition Bullets */}
            <p className="text-[#F0E3D1]/85 text-xs sm:text-sm font-medium tracking-wide my-3 flex items-center flex-wrap gap-2 sm:gap-3">
              {siteConfig?.heroTagline ? (
                <span>{siteConfig.heroTagline}</span>
              ) : (
                <>
                  <span>Authentic taste</span>
                  <span className="text-[#ECB85A]">•</span>
                  <span>Premium quality</span>
                  <span className="text-[#ECB85A]">•</span>
                  <span>Freshly prepared</span>
                </>
              )}
            </p>

            {/* 6. Two Clear Call-To-Action Buttons */}
            <div className="flex items-center flex-wrap gap-3 sm:gap-4 mt-2 pt-1">
              {/* Primary CTA: Bulk Order Karein */}
              <button
                onClick={() => navigateTo('bulk-orders')}
                className="bg-[#ECB85A] hover:bg-[#DD8F25] text-[#1C0A02] font-black text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-lg shadow-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <ShoppingCart className="w-4 h-4 text-[#1C0A02]" />
                <span>{siteConfig?.heroPrimaryCtaText || 'Bulk Order Karein'}</span>
              </button>

              {/* Secondary CTA: WhatsApp Us */}
              <a
                href={`https://wa.me/${activeWhatsapp}?text=Assalam-o-Alaikum!%20I%20want%20to%20order%20from%20${encodeURIComponent(storeName)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-3 rounded-lg shadow-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>{siteConfig?.heroSecondaryCtaText || 'WhatsApp Us'}</span>
              </a>
            </div>

          </div>

          {/* Right Column: High Quality Nimco Photography */}
          <div className="lg:col-span-6 relative h-[260px] sm:h-[320px] lg:h-full min-h-[300px] overflow-hidden">
            {/* Blend Gradient from dark chocolate into image */}
            <div className="absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#1C0A02] via-[#1C0A02]/80 to-transparent z-10 pointer-events-none hidden lg:block" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#1C0A02] to-transparent z-10 pointer-events-none lg:hidden" />
            
            <img
              src={siteConfig?.heroImageUrl || '/assets/reference/hero_food.jpg'}
              alt={`${storeName} Traditional Spread`}
              className="w-full h-full object-cover object-center transform scale-105 hover:scale-110 transition-transform duration-700 ease-out"
              loading="eager"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
