import React from 'react';
import { Store, Gift, Globe, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ServiceBenefitsStrip = () => {
  const { navigateTo, siteConfig } = useStore();

  const cfgBenefits = siteConfig?.benefits || [];

  const benefits = [
    {
      icon: Store,
      title: cfgBenefits[0]?.title || "Wholesale Supply",
      subtitle: cfgBenefits[0]?.subtitle || "For Shops & Distributors",
      action: () => navigateTo('bulk-orders')
    },
    {
      icon: Gift,
      title: cfgBenefits[1]?.title || "Event Orders",
      subtitle: cfgBenefits[1]?.subtitle || "Parties & Family Functions",
      action: () => navigateTo('bulk-orders')
    },
    {
      icon: Globe,
      title: cfgBenefits[2]?.title || "Export Orders",
      subtitle: cfgBenefits[2]?.subtitle || "Outside Pakistan",
      action: () => navigateTo('export')
    },
    {
      icon: ShieldCheck,
      title: cfgBenefits[3]?.title || "Premium Quality",
      subtitle: cfgBenefits[3]?.subtitle || "Fresh & Hygienic",
      action: null
    }
  ];

  return (
    <section className="bg-[#F0E3D1] border-b border-[#D3C6B4] py-4 sm:py-5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0 lg:divide-x lg:divide-[#D3C6B4]">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={item.action || undefined}
                className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-6 lg:px-8 justify-center lg:justify-start ${
                  item.action ? 'cursor-pointer group' : ''
                }`}
              >
                {/* Minimalist Outline Icon in Dark Brown / Bronze */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D3C6B4] bg-[#F9F3EC] flex items-center justify-center shrink-0 text-[#311A0A] group-hover:border-[#6A330E] group-hover:bg-white transition-colors">
                  <Icon className="w-5 h-5 text-[#311A0A]" strokeWidth={1.75} />
                </div>

                {/* Text Content */}
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-[#311A0A] tracking-tight group-hover:text-[#6A330E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#544333] font-medium leading-tight">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
