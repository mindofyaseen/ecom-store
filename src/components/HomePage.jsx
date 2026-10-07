import React from 'react';
import { useStore } from '../context/StoreContext';
import { HeroCarousel } from './HeroCarousel';
import { ValuePropsStrip } from './ValuePropsStrip';
import { CategoryFilter } from './CategoryFilter';
import { ProductCard } from './ProductCard';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  Leaf,
  Package,
  Store,
  Plane,
  PartyPopper,
  Quote,
  MessageSquarePlus,
  Star
} from 'lucide-react';

export const HomePage = () => {
  const {
    products,
    activeCategory,
    navigateTo,
    showWishlistOnly,
    wishlist,
    feedbacks,
    setIsFeedbackModalOpen,
    whatsappNumber
  } = useStore();

  // Products for the showcase grid (matching reference image with 16 popular snacks)
  const displayedProducts = showWishlistOnly
    ? products.filter((p) => wishlist.includes(p.id))
    : activeCategory === 'All'
    ? products.slice(0, 16)
    : products.filter((p) => p.category === activeCategory);

  const handleWholesaleQuote = () => {
    const text = encodeURIComponent("Assalam-o-Alaikum! I am interested in placing a Bulk / Wholesale Nimco Order for a party/shop. Please share wholesale prices & catalog.");
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  const handleExportInquiry = () => {
    const text = encodeURIComponent("Assalam-o-Alaikum! We are interested in Export Orders of Khandani Nimco outside Pakistan. Please share export packaging & details.");
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-8 sm:space-y-12 bg-[#fbf8f2] text-[#2b1810]">
      
      {/* 1. Hero Section matching reference */}
      <HeroCarousel />

      {/* 2. Value Proposition Strip (4 feature cards) */}
      <ValuePropsStrip />

      {/* 3. Category Filter Navigation Bar */}
      <CategoryFilter />

      {/* 4. Main Products Showcase Section ("Our Popular Nimco Products") */}
      <main id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header with Dashed Decorative Lines */}
        <div className="text-center space-y-1.5 pt-2">
          <div className="flex items-center justify-center gap-3 text-[#c8913c]">
            <span className="h-[1px] w-8 sm:w-20 bg-[#c8913c]" />
            <h2 className="text-xl sm:text-3xl font-black text-[#200e08] font-serif tracking-tight">
              {showWishlistOnly ? 'My Favorite Nimco' : 'Our Popular Nimco Products'}
            </h2>
            <span className="h-[1px] w-8 sm:w-20 bg-[#c8913c]" />
          </div>
          <p className="text-xs sm:text-sm text-[#715442] font-medium">
            {showWishlistOnly ? 'Your saved Pakistani snacks' : 'Traditional flavors, crafted with care'}
          </p>
        </div>

        {/* Product Cards Grid: 2 cols on mobile, 3-4 cols on tablet, 4-5 cols on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-5">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigateTo('shop')}
            className="bg-[#200e08] hover:bg-[#34180d] text-[#e5a842] font-extrabold px-8 py-3.5 rounded-full text-xs sm:text-sm shadow-lg inline-flex items-center gap-2 transform active:scale-95 transition-all border border-[#c8913c]/30"
          >
            <span>View All 50+ Pakistani Snacks</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5. Split Promotional Banners (Wholesale & Export Orders) */}
        <div className="pt-6 sm:pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Banner A: Wholesale Orders */}
          <div
            id="bulk-orders-section"
            className="relative rounded-3xl overflow-hidden bg-[#241108] border-2 border-[#b47d48]/50 text-white p-6 sm:p-8 flex flex-col justify-between shadow-xl min-h-[260px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#1c0f0a] via-[#241108]/90 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
              alt="Wholesale Nimco"
              className="absolute inset-0 w-full h-full object-cover opacity-35 object-right pointer-events-none"
            />
            <div className="relative z-20 space-y-2 max-w-sm">
              <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-[#e5a842] block">
                NEED NIMCO IN BULK?
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-serif text-[#fdf8f2]">
                Wholesale Orders
              </h3>
              <p className="text-xs text-[#ecd8c3]/90 leading-relaxed font-normal">
                Whether it's a family function, party, event, shop supply or export order - Khandani Nimco is ready for bulk orders.
              </p>
            </div>
            <div className="relative z-20 pt-4">
              <button
                onClick={handleWholesaleQuote}
                className="bg-[#e5a842] hover:bg-[#d99b26] text-[#200e08] font-black px-5 py-2.5 rounded-xl text-xs shadow-md inline-flex items-center gap-2 transition-all transform active:scale-95"
              >
                <span>🏷️ Get Wholesale Quote</span>
              </button>
            </div>
          </div>

          {/* Banner B: Beyond Borders Export Orders */}
          <div
            id="export-orders-section"
            className="relative rounded-3xl overflow-hidden bg-[#0d2238] border-2 border-[#3b82f6]/40 text-white p-6 sm:p-8 flex flex-col justify-between shadow-xl min-h-[260px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#091726] via-[#0d2238]/90 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
              alt="Export Beyond Borders"
              className="absolute inset-0 w-full h-full object-cover opacity-35 object-right pointer-events-none"
            />
            <div className="relative z-20 space-y-2 max-w-sm">
              <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-[#93c5fd] block">
                TAKING PAKISTANI NIMCO
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-serif text-[#fdf8f2]">
                Beyond Borders
              </h3>
              <p className="text-xs text-[#dbeafe]/90 leading-relaxed font-normal">
                Bulk & export orders available for buyers outside Pakistan. Delivering the authentic taste worldwide.
              </p>
            </div>
            <div className="relative z-20 pt-4">
              <button
                onClick={handleExportInquiry}
                className="bg-[#e5a842] hover:bg-[#d99b26] text-[#200e08] font-black px-5 py-2.5 rounded-xl text-xs shadow-md inline-flex items-center gap-2 transition-all transform active:scale-95"
              >
                <span>🌐 Contact for Export Orders</span>
              </button>
            </div>
          </div>

        </div>

        {/* 6. "Why Khandani Nimco?" Section */}
        <div className="pt-8 sm:pt-12 space-y-6">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-3 text-[#c8913c]">
              <span className="h-[1px] w-8 sm:w-16 bg-[#c8913c]" />
              <div className="flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-[#16a34a] -scale-x-100" />
                <h2 className="text-xl sm:text-2xl font-black text-[#200e08] font-serif">
                  Why Khandani Nimco?
                </h2>
              </div>
              <span className="h-[1px] w-8 sm:w-16 bg-[#c8913c]" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 text-center">
            
            <div className="bg-white border border-[#eaddcb] p-4 rounded-2xl space-y-2 shadow-sm flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#fdfbf7] border border-[#c8913c]/30 text-[#16a34a] flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-[#200e08] font-serif">Freshly Prepared</h4>
            </div>

            <div className="bg-white border border-[#eaddcb] p-4 rounded-2xl space-y-2 shadow-sm flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#fdfbf7] border border-[#c8913c]/30 text-[#78350f] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-[#200e08] font-serif">Consistent Quality</h4>
            </div>

            <div className="bg-white border border-[#eaddcb] p-4 rounded-2xl space-y-2 shadow-sm flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#fdfbf7] border border-[#c8913c]/30 text-[#78350f] flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-[#200e08] font-serif">Bulk Orders Available</h4>
            </div>

            <div className="bg-white border border-[#eaddcb] p-4 rounded-2xl space-y-2 shadow-sm flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#fdfbf7] border border-[#c8913c]/30 text-[#78350f] flex items-center justify-center">
                <PartyPopper className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-[#200e08] font-serif">Event & Party Orders</h4>
            </div>

            <div className="bg-white border border-[#eaddcb] p-4 rounded-2xl space-y-2 shadow-sm flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#fdfbf7] border border-[#c8913c]/30 text-[#78350f] flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-[#200e08] font-serif">Wholesale Supply</h4>
            </div>

            <div className="bg-white border border-[#eaddcb] p-4 rounded-2xl space-y-2 shadow-sm flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#fdfbf7] border border-[#c8913c]/30 text-[#78350f] flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-[#200e08] font-serif">Export Orders</h4>
            </div>

          </div>
        </div>

        {/* 7. "Our Story - A Legacy of Taste" Section */}
        <div className="pt-6 sm:pt-10">
          <div className="bg-[#f6efe4] border border-[#e5d7c3] rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Image: Brass Tea & Snack Heritage */}
            <div className="lg:col-span-5 relative aspect-4/3 rounded-2xl overflow-hidden shadow-md border border-[#c8913c]/30">
              <img
                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80"
                alt="Karachi Heritage Tea & Nimco"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs text-[#e5a842] font-serif font-black">
                  Burns Road, Karachi Tradition
                </span>
              </div>
            </div>

            {/* Center Story Text */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-[#a16207] block font-serif">
                OUR STORY
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#200e08] font-serif">
                A Legacy of Taste
              </h3>
              <p className="text-xs sm:text-sm text-[#5d4433] leading-relaxed">
                Khandani Nimco brings you the authentic taste of traditional Pakistani snacks, made with quality ingredients and time-honored recipes. From local gatherings to global markets, we serve happiness in every bite.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('about')}
                  className="bg-[#200e08] hover:bg-[#34180d] text-[#fdf8f2] font-bold px-5 py-2.5 rounded-full text-xs shadow-md inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Know More About Us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Callout: Desi Swad Har Ghar Tak */}
            <div className="lg:col-span-2 text-center lg:text-right flex flex-col justify-center items-center lg:items-end">
              <div className="p-4 rounded-2xl border-2 border-dashed border-[#b47d48]/40 bg-[#fdfbf7] space-y-1">
                <span className="text-xs text-[#a16207] font-bold block uppercase tracking-wider">
                  Karachi Special
                </span>
                <p className="text-base sm:text-lg font-serif font-black italic text-[#200e08]">
                  "Desi Swad<br />Har Ghar Tak"
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 8. Customer Reviews & Community Love */}
        <div className="pt-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#eaddcb] pb-3">
            <div>
              <span className="text-xs font-bold text-[#a16207] uppercase tracking-widest block font-serif">
                Customer Voices & Love
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#200e08] font-serif">
                What Pakistan Says About Khandani Nimco
              </h3>
            </div>

            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="bg-[#f6efe4] hover:bg-[#ebdcc9] text-[#200e08] font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm border border-[#d8c3ad] transition-colors"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#a16207]" />
              <span>Leave Feedback / Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feedbacks && feedbacks.slice(0, 3).map((fb) => (
              <div key={fb.id} className="bg-white border border-[#eaddcb] p-5 rounded-2xl space-y-3 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#200e08]">{fb.name}</h4>
                      <span className="text-[10px] text-[#8d715d]">{fb.category}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(fb.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#5d4433] leading-relaxed italic">
                    "{fb.comment}"
                  </p>
                </div>
                <div className="pt-2 border-t border-[#f4ede1] flex items-center justify-between text-[11px] text-[#8d715d]">
                  <span className="text-[#16a34a] font-semibold">✓ Verified Customer</span>
                  <span>{fb.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

    </div>
  );
};
