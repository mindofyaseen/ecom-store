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
    <div className="bg-[#311A0A] border-y border-[#D3C6B4]/30 py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Title */}
        <div className="flex items-center gap-2 flex-shrink-0 text-center md:text-left">
          <div className="p-1.5 bg-[#ECB85A] text-[#311A0A] rounded-lg">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#ECB85A] uppercase tracking-wider block font-serif">
              Khandani Nimco Today's Vouchers
            </span>
            <span className="text-[11px] text-[#F9F3EC]/80">
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
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all shadow-sm ${
                  isApplied
                    ? 'bg-[#ECB85A] text-[#311A0A] border-[#ECB85A] font-bold'
                    : 'bg-white/10 hover:bg-white/15 text-[#F9F3EC] border-[#D3C6B4]/30 hover:border-[#ECB85A]'
                }`}
              >
                <Tag className={`w-3.5 h-3.5 ${isApplied ? 'text-[#311A0A]' : 'text-[#ECB85A]'}`} />
                <span className={`font-mono tracking-wider font-extrabold ${isApplied ? 'text-[#311A0A]' : 'text-[#ECB85A]'}`}>
                  {c.code}
                </span>
                <span className={`text-[10px] border-l pl-1.5 ${isApplied ? 'border-[#311A0A]/40 text-[#311A0A] font-bold' : 'border-[#D3C6B4]/40 text-[#F9F3EC]/80'}`}>
                  {c.discountPercent ? `${c.discountPercent}% OFF` : c.isFreeShipping ? 'FREE SHIP' : `Rs. ${c.flatDiscount} OFF`}
                </span>
                {isApplied ? (
                  <span className="text-[9px] bg-[#311A0A] px-1.5 py-0.2 rounded text-[#ECB85A] font-extrabold uppercase">
                    ACTIVE
                  </span>
                ) : isCopied ? (
                  <Check className="w-3.5 h-3.5 text-[#ECB85A]" />
                ) : (
                  <Copy className="w-3 h-3 text-[#ECB85A] opacity-60" />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
