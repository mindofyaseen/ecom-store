import React from 'react';
import { useStore } from '../context/StoreContext';
import { HeroSection } from './HeroSection';
import { ServiceBenefitsStrip } from './ServiceBenefitsStrip';
import { ProductCard } from './ProductCard';
import { PromotionalBanners } from './PromotionalBanners';
import { CustomerReviewsSection } from './CustomerReviewsSection';
import { WhyChooseUs } from './WhyChooseUs';
import { BrandStorySection } from './BrandStorySection';
import { ArrowRight } from 'lucide-react';

export const HomePage = () => {
  const { products, navigateTo } = useStore();

  // The 16 popular nimco products matching the reference showcase
  const popularProducts = products.slice(0, 16);

  return (
    <div className="bg-[#F9F3EC] text-[#311A0A]">
      
      {/* 1. Hero Section matching reference */}
      <HeroSection />

      {/* 2. Trust and Service Benefits Strip */}
      <ServiceBenefitsStrip />

      {/* 3. Popular Products Section */}
      <section id="products-section" className="py-10 sm:py-14 px-4 sm:px-8 max-w-7xl mx-auto">
        
        {/* Section Header with Horizontal Lines & Leaf detail */}
        <div className="text-center mb-7 sm:mb-9">
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-1.5">
            <span className="h-[1px] w-12 sm:w-28 bg-[#D3C6B4]" />
            <div className="flex items-center gap-2">
              <span className="text-emerald-700 text-xs select-none">🌿</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#311A0A] tracking-tight">
                Our Popular Nimco Products
              </h2>
              <span className="text-emerald-700 text-xs select-none">🌿</span>
            </div>
            <span className="h-[1px] w-12 sm:w-28 bg-[#D3C6B4]" />
          </div>
          <p className="text-xs sm:text-sm text-[#544333] font-medium">
            Traditional flavors, crafted with care
          </p>
        </div>

        {/* 16 Compact Cards Grid (8 per row on large desktop, 4 on medium, 2 on mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Explore Full Shop CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 bg-[#F0E3D1] hover:bg-[#D3C6B4] text-[#311A0A] border border-[#D3C6B4] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <span>Explore Complete Nimco Collection</span>
            <ArrowRight className="w-4 h-4 text-[#6A330E]" />
          </button>
        </div>

      </section>

      {/* 4. Customer Reviews & Social Proof Section */}
      <CustomerReviewsSection />

      {/* 5. Wholesale & Export Promotional Sections */}
      <PromotionalBanners />

      {/* 6. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 6. Brand Story Section ("A Legacy of Taste") */}
      <BrandStorySection />

    </div>
  );
};
