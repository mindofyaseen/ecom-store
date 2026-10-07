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
          className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-black p-3.5 sm:p-4 rounded-2xl shadow-2xl border-2 border-emerald-900/30 flex items-center justify-between group transform hover:-translate-y-1 transition-all"
        >
          {/* Left item counter */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#042f2e] text-amber-300 flex items-center justify-center font-black text-sm shadow-inner relative">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#042f2e] font-extrabold animate-bounce">
                {totalCartCount}
              </span>
            </div>
            <div className="text-left">
              <span className="text-[11px] uppercase tracking-wider block font-bold text-emerald-900 -mb-0.5">
                Khandani Nimco Cart
              </span>
              <span className="text-base sm:text-lg font-black text-emerald-950 font-mono">
                {formatPrice(cartGrandTotal)}
              </span>
            </div>
          </div>

          {/* Right action button */}
          <div className="flex items-center gap-1.5 bg-[#042f2e] text-amber-300 px-4 py-2 rounded-xl text-xs font-black shadow-md group-hover:bg-[#064e3b] transition-colors">
            <span>View Cart</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
