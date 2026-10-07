import React from 'react';
import { Store, PartyPopper, Globe2, Award } from 'lucide-react';

export const ValuePropsStrip = () => {
  const props = [
    {
      icon: Store,
      title: 'Wholesale Supply',
      subtitle: 'For Shops & Distributors'
    },
    {
      icon: PartyPopper,
      title: 'Event Orders',
      subtitle: 'Parties & Family Functions'
    },
    {
      icon: Globe2,
      title: 'Export Orders',
      subtitle: 'Outside Pakistan'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      subtitle: 'Fresh & Hygienic'
    }
  ];

  return (
    <div className="bg-[#f6efe4] border-b border-[#e5d7c3] py-4 sm:py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#e2d1bc]">
          {props.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 pt-3 sm:pt-0 ${idx > 0 ? 'sm:pl-6' : ''}`}
              >
                <div className="w-10 h-10 rounded-full border border-[#b47d48]/40 bg-[#fdfbf7] flex items-center justify-center text-[#78350f] flex-shrink-0 shadow-sm">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-[#200e08] font-serif leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[#715442] font-medium leading-tight">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
