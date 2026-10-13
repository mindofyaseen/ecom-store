import React from 'react';
import { useStore } from '../context/StoreContext';
import { Award, ShieldCheck, Heart, Truck, ArrowRight, Sparkles } from 'lucide-react';

export const AboutPage = () => {
  const { navigateTo, siteConfig } = useStore();

  const storeName = siteConfig?.storeName || 'Khandani Nimco';
  const storeTagline = siteConfig?.storeTagline || 'Asli Swad, Khandani Andaaz';

  return (
    <div className="min-h-screen bg-[#F9F3EC] py-10 sm:py-14 text-[#311A0A] font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[#6A330E] text-xs font-bold uppercase tracking-[0.2em] block font-serif">
            OUR HERITAGE & TRADITION
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#311A0A] tracking-tight font-serif">
            The Story Behind {storeName}
          </h1>
          <p className="text-xs sm:text-sm text-[#544333] max-w-2xl mx-auto leading-relaxed">
            From the bustling food street of Burns Road and Saddar, Karachi, to chai tables across Pakistan and abroad, {storeName} preserves authentic taste, secret family spice recipes, and time-honored hospitality.
          </p>
        </div>

        {/* Story Visual Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#D3C6B4] h-64 sm:h-80">
          <img
            src={siteConfig?.storyImageUrl || "/assets/reference/story_food.jpg"}
            alt={`${storeName} Traditional Tea and Snack Heritage`}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C0A02]/90 via-[#1C0A02]/40 to-transparent flex items-end p-6 sm:p-10">
            <div className="text-[#F9F3EC] space-y-1">
              <span className="text-[#ECB85A] font-bold text-xs uppercase tracking-wider block">
                {storeTagline}
              </span>
              <h2 className="text-xl sm:text-3xl font-bold font-serif text-[#F9F3EC]">
                Prepared Fresh Daily. Never Stale. 100% Authentic Crunch.
              </h2>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#D3C6B4] p-6 rounded-xl space-y-3 shadow-sm">
            <div className="w-11 h-11 rounded-lg bg-[#F0E3D1] text-[#311A0A] flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-[#6A330E]" />
            </div>
            <h3 className="text-base font-bold text-[#311A0A] font-serif">Signature Heritage Spices</h3>
            <p className="text-xs text-[#544333] leading-relaxed">
              Every single batch utilizes hand-ground spices, Kashmiri red chili, roasted cumin, amchur, and carom seeds blended according to historic family ratios.
            </p>
          </div>

          <div className="bg-white border border-[#D3C6B4] p-6 rounded-xl space-y-3 shadow-sm">
            <div className="w-11 h-11 rounded-lg bg-[#F0E3D1] text-[#311A0A] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="text-base font-bold text-[#311A0A] font-serif">100% Pure Edible Oil & Besan</h3>
            <p className="text-xs text-[#544333] leading-relaxed">
              Strictly filtered vegetable edible oil and premium stone-ground chickpea flour (Besan). Zero recycled burnt oils, zero artificial colorants.
            </p>
          </div>

          <div className="bg-white border border-[#D3C6B4] p-6 rounded-xl space-y-3 shadow-sm">
            <div className="w-11 h-11 rounded-lg bg-[#F0E3D1] text-[#311A0A] flex items-center justify-center font-bold">
              <Truck className="w-5 h-5 text-[#311A0A]" />
            </div>
            <h3 className="text-base font-bold text-[#311A0A] font-serif">Daily Fresh Batch Dispatch</h3>
            <p className="text-xs text-[#544333] leading-relaxed">
              Dispatched straight from the frying pans and nitrogen-sealed immediately so you experience the legendary Burns Road aroma the instant you open the pouch.
            </p>
          </div>
        </div>

        {/* Brand Callout */}
        <div className="bg-[#311A0A] text-[#F9F3EC] rounded-2xl p-8 sm:p-10 border border-[#6A330E] text-center space-y-4 shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#F9F3EC]">
            Taste The Tradition Today
          </h2>
          <p className="text-xs sm:text-sm text-[#F0E3D1]/85 max-w-xl mx-auto leading-relaxed">
            Order your favorite Mix Nimco, crunchy Gathiya, Sew, or assorted gift boxes directly to your home anywhere in Pakistan.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="bg-[#ECB85A] hover:bg-[#DD8F25] text-[#1C0A02] font-black text-xs sm:text-sm px-6 py-3 rounded-lg shadow inline-flex items-center gap-2 transition-all"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 text-[#1C0A02]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
