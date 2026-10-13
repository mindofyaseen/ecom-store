import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const BrandStorySection = () => {
  const { navigateTo, siteConfig } = useStore();

  return (
    <section className="bg-[#F0E3D1] border-y border-[#D3C6B4] py-8 sm:py-12 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          
          {/* Left Column: Traditional Brass Kettle & Nimco Photography */}
          <div className="lg:col-span-4 h-56 sm:h-64 lg:h-72 rounded-xl overflow-hidden shadow-sm border border-[#D3C6B4]">
            <img
              src={siteConfig?.storyImageUrl || "/assets/reference/story_food.jpg"}
              alt="Traditional Pakistani Nimco and Tea Heritage"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* Center Column: Our Story Content */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <span className="text-[#6A330E] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase block">
              {siteConfig?.storyEyebrow || 'OUR STORY'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#311A0A] leading-tight">
              {siteConfig?.storyTitle || 'A Legacy of Taste'}
            </h2>
            <p className="text-[#544333] text-xs sm:text-sm leading-relaxed font-normal">
              {siteConfig?.storyDescription || 'Khandani Nimco brings you the authentic taste of traditional Pakistani snacks, made with quality ingredients and time-honored recipes. From local gatherings to global markets, we serve happiness in every bite.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo(siteConfig?.storyCtaLink || 'about')}
                className="bg-[#311A0A] hover:bg-[#1C0A02] text-[#F9F3EC] font-bold text-xs px-5 py-3 rounded-lg shadow inline-flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>{siteConfig?.storyCtaText || 'Know More About Us'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Calligraphic Script & Monument Motif */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center p-4 border-t lg:border-t-0 lg:border-l border-[#D3C6B4]/60">
            <div className="text-center relative select-none">
              <span className="font-serif italic text-2xl sm:text-3xl font-black text-[#311A0A] tracking-tight block transform -rotate-3">
                {siteConfig?.storyBadgeText ? siteConfig.storyBadgeText.split('\n')[0] : 'Desi Swad'}
              </span>
              <span className="font-serif italic text-xl sm:text-2xl font-bold text-[#6A330E] block transform -rotate-3 mt-1">
                {siteConfig?.storyBadgeText && siteConfig.storyBadgeText.split('\n')[1] ? siteConfig.storyBadgeText.split('\n')[1] : 'Har Ghar Tak'}
              </span>
              <div className="mt-3 flex items-center justify-center gap-2 text-[#AF7F47] text-xs font-bold uppercase tracking-wider">
                <span className="h-[1px] w-6 bg-[#AF7F47]" />
                <span>Est. Burns Road</span>
                <span className="h-[1px] w-6 bg-[#AF7F47]" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
