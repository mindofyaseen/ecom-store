import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingCartBar = () => {
  const { totalCartCount, cartGrandTotal, isCartOpen, setIsCartOpen, formatPrice, viewMode } = useStore();

  if (viewMode !== 'store' || totalCartCount === 0 || isCartOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40"
      >
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full bg-[#311A0A] hover:bg-[#1C0A02] text-[#F9F3EC] font-bold p-3.5 sm:p-4 rounded-xl shadow-2xl border border-[#ECB85A]/40 flex items-center justify-between group transform hover:-translate-y-0.5 transition-all"
        >
          {/* Left item counter */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ECB85A] text-[#311A0A] flex items-center justify-center font-bold text-sm shadow relative">
              <ShoppingBag className="w-5 h-5 text-[#311A0A]" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#DD8F25] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#311A0A] font-extrabold">
                {totalCartCount}
              </span>
            </div>
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-wider block font-semibold text-[#ECB85A] font-serif">
                Khandani Nimco Cart
              </span>
              <span className="text-base sm:text-lg font-bold text-[#F9F3EC]">
                {formatPrice(cartGrandTotal)}
              </span>
            </div>
          </div>

          {/* Right action button */}
          <div className="flex items-center gap-1.5 bg-[#ECB85A] text-[#311A0A] px-4 py-2 rounded-lg text-xs font-bold shadow-md group-hover:bg-[#DD8F25] transition-colors">
            <span>View Cart</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
