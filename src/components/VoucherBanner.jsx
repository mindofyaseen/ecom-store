import React, { useState } from 'react';
import { Tag, Copy, Check, Flame } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const VoucherBanner = () => {
  const { coupons, applyCouponCode, appliedCoupon, viewMode } = useStore();
  const [copiedCode, setCopiedCode] = useState(null);

  if (viewMode !== 'store' || !coupons || coupons.length === 0) return null;

  const handleCopyAndApply = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyCouponCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-emerald-950/90 border-y border-emerald-800/80 py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Title */}
        <div className="flex items-center gap-2 flex-shrink-0 text-center md:text-left">
          <div className="p-1.5 bg-amber-400 text-emerald-950 rounded-lg">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-black text-amber-300 uppercase tracking-wider block">
              Khandani Nimco Today's Vouchers
            </span>
            <span className="text-[11px] text-emerald-200">
              Tap any coupon code to auto-apply & save instantly!
            </span>
          </div>
        </div>

        {/* Coupons Carousel / Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {coupons.map((c) => {
            const isApplied = appliedCoupon && appliedCoupon.code === c.code;
            const isCopied = copiedCode === c.code;

            return (
              <button
                key={c.code}
                type="button"
                onClick={() => handleCopyAndApply(c.code)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
                  isApplied
                    ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-amber-400/20 font-black'
                    : 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 border-emerald-700/80 hover:border-amber-400'
                }`}
              >
                <Tag className={`w-3.5 h-3.5 ${isApplied ? 'text-emerald-950' : 'text-amber-400'}`} />
                <span className={`font-mono tracking-wider font-extrabold ${isApplied ? 'text-emerald-950' : 'text-amber-300'}`}>
                  {c.code}
                </span>
                <span className={`text-[10px] border-l pl-1.5 ${isApplied ? 'border-emerald-950/40 text-emerald-900 font-bold' : 'border-emerald-700 text-emerald-200'}`}>
                  {c.discountPercent ? `${c.discountPercent}% OFF` : c.isFreeShipping ? 'FREE SHIP' : `Rs. ${c.flatDiscount} OFF`}
                </span>
                {isApplied ? (
                  <span className="text-[9px] bg-emerald-950 px-1.5 py-0.2 rounded text-amber-300 font-extrabold uppercase">
                    ACTIVE
                  </span>
                ) : isCopied ? (
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Copy className="w-3 h-3 text-emerald-400 opacity-60" />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
