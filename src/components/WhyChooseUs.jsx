import React from 'react';
import { Leaf, ShieldCheck, Box, PartyPopper, Store, Plane } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhyChooseUs = () => {
  const { siteConfig } = useStore();

  const cfgItems = siteConfig?.whyChooseUsItems || [];
  const icons = [Leaf, ShieldCheck, Box, PartyPopper, Store, Plane];

  const items = [
    { icon: icons[0], label: cfgItems[0]?.title || "Freshly Prepared" },
    { icon: icons[1], label: cfgItems[1]?.title || "Consistent Quality" },
    { icon: icons[2], label: cfgItems[2]?.title || "Bulk Orders Available" },
    { icon: icons[3], label: cfgItems[3]?.title || "Event & Party Orders" },
    { icon: icons[4], label: cfgItems[4]?.title || "Wholesale Supply" },
    { icon: icons[5], label: cfgItems[5]?.title || "Export Orders" }
  ];

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-8 bg-[#F9F3EC]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Ornamental Dividers */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 mb-8 sm:mb-12">
          <span className="h-[1px] w-12 sm:w-28 bg-[#D3C6B4]" />
          <div className="flex items-center gap-2">
            <span className="text-emerald-700 text-xs">🌿</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#311A0A] tracking-tight">
              {siteConfig?.whyChooseUsTitle || 'Why Khandani Nimco?'}
            </h2>
            <span className="text-emerald-700 text-xs">🌿</span>
          </div>
          <span className="h-[1px] w-12 sm:w-28 bg-[#D3C6B4]" />
        </div>

        {/* 6 Minimalist Outline Items with Dividers */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-0 lg:divide-x lg:divide-[#D3C6B4]/80 text-center">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center justify-center px-2 sm:px-4 py-2 group">
                {/* Outline Icon in Dark Brown with subtle gold hover */}
                <div className="w-12 h-12 rounded-full border border-[#D3C6B4] bg-[#F0E3D1]/40 flex items-center justify-center mb-3 text-[#311A0A] group-hover:border-[#6A330E] group-hover:bg-white group-hover:scale-105 transition-all">
                  <Icon className="w-5 h-5 text-[#311A0A]" strokeWidth={1.6} />
                </div>
                
                {/* Short Title */}
                <span className="text-xs sm:text-[13px] font-bold text-[#311A0A] group-hover:text-[#6A330E] transition-colors leading-tight">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
