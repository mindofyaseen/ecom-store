import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Truck, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroBanner = () => {
  const { generateWhatsAppLink } = useStore();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-900 via-amber-950 to-amber-900 text-amber-50 py-12 md:py-16 border-b border-amber-800">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-amber-800/80 border border-amber-700/80 text-yellow-300 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Karachi's Favorite Authentic Nimco & Snacks</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Crispy, Fresh & Spiced <br />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                Traditional Pakistani Nimco
              </span>
            </h1>

            <p className="text-sm sm:text-base text-amber-200/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Experience the legendary crunch of Karachi Mix Nimco, spicy Aloo Bhujia, roasted salted nuts, and crispy Gathiya, Sew & Chewra delivered fresh to your doorstep anywhere in Pakistan.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#products-section"
                className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-amber-950 font-black px-6 py-3.5 rounded-xl text-sm shadow-lg hover:shadow-yellow-500/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={generateWhatsAppLink("Assalam-o-Alaikum! I want to inquire about ordering fresh Nimco packages.")}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3.5 rounded-xl text-sm shadow-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5 border border-emerald-500/50"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
                <span>Quick WhatsApp Order</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-800/80 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-800/60 text-yellow-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-100">100% Pure</h4>
                  <p className="text-[10px] text-amber-300">Desi Ghee & Fresh Oil</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-800/60 text-yellow-400">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-100">Fast Shipping</h4>
                  <p className="text-[10px] text-amber-300">Safe Sealed Packaging</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-800/60 text-yellow-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-100">Daily Fresh</h4>
                  <p className="text-[10px] text-amber-300">Guaranteed Crunch</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 opacity-30 blur-lg animate-pulse" />
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-600/50 shadow-2xl bg-amber-900">
                <img
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
                  alt="Special Karachi Mix Nimco"
                  className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-4 left-4 right-4 bg-amber-950/90 backdrop-blur-md p-4 rounded-xl border border-amber-700/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-yellow-400 font-bold">Featured Best Seller</span>
                    <h3 className="text-sm font-bold text-white">Special Karachi Mix Nimco</h3>
                    <p className="text-xs text-amber-200">Starting from Rs. 340 (250g)</p>
                  </div>
                  <span className="bg-yellow-400 text-amber-950 font-black text-xs px-3 py-1.5 rounded-lg shadow">
                    HOT
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
