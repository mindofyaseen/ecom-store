import React from 'react';
import { useStore } from '../context/StoreContext';
import { Package, Globe, ArrowRight } from 'lucide-react';

export const PromotionalBanners = () => {
  const { navigateTo, siteConfig } = useStore();

  const wholesale = siteConfig?.wholesaleBanner || {};
  const exportCfg = siteConfig?.exportBanner || {};

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-8 bg-[#F9F3EC]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          
          {/* Banner 1: Wholesale Orders (Dark Chocolate) */}
          <div className="bg-[#311A0A] rounded-xl overflow-hidden border border-[#6A330E] text-[#F9F3EC] flex flex-col sm:flex-row items-center justify-between shadow-md">
            {/* Left Image: Jute sacks & Nimco */}
            <div className="w-full sm:w-2/5 h-48 sm:h-auto self-stretch relative overflow-hidden shrink-0">
              <img
                src={wholesale.imageUrl || "/assets/reference/wholesale_food.jpg"}
                alt="Wholesale Bulk Nimco Supply"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-[#311A0A] hidden sm:block" />
            </div>

            {/* Right Copy & Button */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-center">
              <span className="text-[#ECB85A] text-[11px] font-bold uppercase tracking-widest mb-1 block">
                {wholesale.eyebrow || 'NEED NIMCO IN BULK?'}
              </span>
              <h3 className="text-2xl sm:text-[28px] font-bold font-serif text-[#F9F3EC] leading-tight mb-2">
                {wholesale.title || 'Wholesale Orders'}
              </h3>
              <p className="text-[#F0E3D1]/85 text-xs sm:text-[13px] leading-relaxed mb-4">
                {wholesale.description || "Whether it's a family function, party, event, shop supply or export order — Khandani Nimco is ready for bulk orders."}
              </p>
              <div>
                <button
                  onClick={() => navigateTo(wholesale.ctaLink || 'bulk-orders')}
                  className="bg-[#ECB85A] hover:bg-[#DD8F25] text-[#1C0A02] font-black text-xs px-5 py-2.5 rounded-lg shadow inline-flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>{wholesale.ctaText || 'Get Wholesale Quote'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Banner 2: Beyond Borders / Export Orders (Nautical Espresso / Navy) */}
          <div className="bg-[#101e2c] rounded-xl overflow-hidden border border-[#1e344a] text-[#F9F3EC] flex flex-col sm:flex-row items-center justify-between shadow-md">
            {/* Left Copy & Button */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-center order-2 sm:order-1">
              <span className="text-[#ECB85A] text-[11px] font-bold uppercase tracking-widest mb-1 block">
                {exportCfg.eyebrow || 'TAKING PAKISTANI NIMCO'}
              </span>
              <h3 className="text-2xl sm:text-[28px] font-bold font-serif text-[#F9F3EC] leading-tight mb-2">
                {exportCfg.title || 'Beyond Borders'}
              </h3>
              <p className="text-[#F0E3D1]/85 text-xs sm:text-[13px] leading-relaxed mb-4">
                {exportCfg.description || 'Bulk & export orders available for buyers outside Pakistan with international customs-safe food packaging.'}
              </p>
              <div>
                <button
                  onClick={() => navigateTo(exportCfg.ctaLink || 'export')}
                  className="bg-transparent border border-[#ECB85A] text-[#ECB85A] hover:bg-[#ECB85A] hover:text-[#101e2c] font-black text-xs px-5 py-2.5 rounded-lg shadow inline-flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{exportCfg.ctaText || 'Contact for Export Orders'}</span>
                </button>
              </div>
            </div>

            {/* Right Image: Cargo vessel */}
            <div className="w-full sm:w-2/5 h-48 sm:h-auto self-stretch relative overflow-hidden shrink-0 order-1 sm:order-2">
              <img
                src={exportCfg.imageUrl || "/assets/reference/export_ship.jpg"}
                alt="International Export of Nimco via Cargo Ship"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-l from-transparent to-[#101e2c] hidden sm:block" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
