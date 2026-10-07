import React from 'react';
import { useStore } from '../context/StoreContext';
import { Award, ShieldCheck, Sparkles, Heart, Users, Truck, ArrowRight } from 'lucide-react';

export const AboutPage = () => {
  const { navigateTo } = useStore();

  return (
    <div className="min-h-screen bg-[#fbf8f2] py-12 text-[#2b1810] font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <span className="bg-[#f5ece0] text-[#78350f] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 border border-[#d8c3ad]">
            <Sparkles className="w-3.5 h-3.5 text-[#e5a842]" />
            Our Heritage Since 1978 • Khandani Riwayat
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#200e08] tracking-tight font-serif">
            The Story Behind Karachi's Original Khandani Nimco
          </h1>
          <p className="text-sm sm:text-base text-[#5d4433] max-w-2xl mx-auto leading-relaxed">
            From the historic lanes of Burns Road and Saddar Bohri Bazaar to tea tables across Pakistan, Khandani Nimco has preserved authentic Pakistani crunch, signature spice blends, and 100% pure edible recipes for generations.
          </p>
        </div>

        {/* Story Visual Banner */}
        <div className="relative rounded-3xl overflow-hidden aspect-21/9 shadow-2xl border-4 border-[#c8913c]/30">
          <img
            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80"
            alt="Khandani Nimco Heritage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white space-y-1">
              <span className="text-[#e5a842] font-black text-xs uppercase tracking-wider">
                Karachi Food Legacy - Khandani Nimco
              </span>
              <h2 className="text-xl sm:text-3xl font-black font-serif">
                Prepared Fresh Daily. Never Stale. 100% Khandani Taste.
              </h2>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#eaddcb] p-6 rounded-3xl space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f5ece0] text-[#78350f] flex items-center justify-center font-black">
              <Award className="w-6 h-6 text-[#78350f]" />
            </div>
            <h3 className="text-base font-black text-[#200e08] font-serif">Secret Burns Road Masala</h3>
            <p className="text-xs text-[#715442] leading-relaxed">
              Every batch uses hand-ground whole spices, Degi red chili, amchur, and roasted carom seeds (Ajwain) according to authentic secret master formulas.
            </p>
          </div>

          <div className="bg-white border border-[#eaddcb] p-6 rounded-3xl space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f5ece0] text-[#78350f] flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6 text-[#16a34a]" />
            </div>
            <h3 className="text-base font-black text-[#200e08] font-serif">100% Pure Edible Oils</h3>
            <p className="text-xs text-[#715442] leading-relaxed">
              We never reuse frying oil. Only premium-grade refined vegetable oils and pure ghee are used for light crunch that never feels heavy.
            </p>
          </div>

          <div className="bg-white border border-[#eaddcb] p-6 rounded-3xl space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f5ece0] text-[#78350f] flex items-center justify-center font-black">
              <Truck className="w-6 h-6 text-[#e5a842]" />
            </div>
            <h3 className="text-base font-black text-[#200e08] font-serif">Nitrogen-Sealed Nationwide</h3>
            <p className="text-xs text-[#715442] leading-relaxed">
              Our packaging seals in the day-one aroma and crunch so that customers in Lahore, Islamabad, or Quetta experience identical Karachi crispness.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#1c0f0a] border-2 border-[#c8913c]/40 rounded-3xl p-8 sm:p-10 text-center text-white space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#fdf8f2]">
            Ready to Taste the Burns Road Heritage?
          </h2>
          <p className="text-xs sm:text-sm text-[#ecd8c3] max-w-xl mx-auto">
            Order online today for door-to-door delivery across Karachi and nationwide courier dispatch.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="bg-[#e5a842] hover:bg-[#d99b26] text-[#200e08] font-extrabold px-8 py-3.5 rounded-full text-xs sm:text-sm shadow-xl inline-flex items-center gap-2"
          >
            <span>Explore 50+ Fresh Nimco Snacks</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
