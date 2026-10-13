import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  Plus,
  Minus,
  Tag,
  AlertTriangle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    freeShippingMin,
    minOrderLimit,
    calculatedShipping,
    cartGrandTotal,
    discountAmount,
    appliedCoupon,
    couponError,
    applyCouponCode,
    removeCoupon,
    formatPrice,
    initiateCheckout
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingMin) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingMin - cartSubtotal);
  const isBelowMinOrder = cartSubtotal < minOrderLimit;
  const remainingForMinOrder = Math.max(0, minOrderLimit - cartSubtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const ok = applyCouponCode(inputCoupon.trim());
    if (ok) setInputCoupon('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-[#F9F3EC] border-l border-[#D3C6B4] text-[#311A0A] shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-[#D3C6B4] bg-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#ECB85A] rounded-lg text-[#1C0A02] font-black">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold font-serif text-[#311A0A]">Your Shopping Basket</h2>
                  <p className="text-xs text-[#544333]">
                    {cart.length} {cart.length === 1 ? 'snack item' : 'snack items'} selected
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-rose-600 hover:underline px-2 py-1 font-semibold"
                    title="Empty Basket"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#544333] hover:text-[#311A0A] bg-[#F9F3EC] hover:bg-[#F0E3D1] rounded-full transition-colors border border-[#D3C6B4]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Minimum Order Warning Bar if below limit */}
            {cart.length > 0 && isBelowMinOrder && (
              <div className="bg-amber-100 border-b border-amber-300 p-2.5 px-4 flex items-center gap-2 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  Minimum order is <strong>Rs. {minOrderLimit}</strong>. Add <strong>Rs. {remainingForMinOrder}</strong> more to checkout.
                </span>
              </div>
            )}

            {/* Free Shipping Progress Indicator */}
            <div className="bg-white p-3 px-5 border-b border-[#D3C6B4]">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="flex items-center gap-1.5 text-[#6A330E]">
                  <Truck className="w-4 h-4 text-[#6A330E]" />
                  {remainingForFreeShipping > 0
                    ? `Add ${formatPrice(remainingForFreeShipping)} more for FREE Nationwide Delivery!`
                    : '🎉 You unlocked FREE Delivery nationwide!'}
                </span>
              </div>
              <div className="w-full bg-[#F0E3D1] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#ECB85A] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-[#6A330E] border border-[#D3C6B4]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold font-serif text-[#311A0A]">Your basket is empty</h3>
                  <p className="text-xs text-[#544333] max-w-xs mx-auto">
                    Add crispy Mix Nimco, crunchy Gathiya, or savory Dal snacks to start enjoying authentic snacks!
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-[#311A0A] hover:bg-[#1C0A02] text-[#F9F3EC] font-bold px-6 py-2.5 rounded-lg text-xs shadow-sm transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex gap-3 bg-white border border-[#D3C6B4] p-3 rounded-xl relative group shadow-sm"
                  >
                    {/* Item thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-[#F9F3EC] p-1 border border-[#D3C6B4] flex items-center justify-center shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Item info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-[#311A0A] line-clamp-1 font-serif">
                          {item.name}
                        </h4>
                        <span className="inline-block text-[10px] bg-[#F0E3D1] text-[#6A330E] px-2 py-0.5 rounded font-bold mt-0.5">
                          {item.weightLabel}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg">
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-1 text-[#311A0A] hover:bg-[#F0E3D1] rounded-l"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-[#311A0A]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-1 text-[#311A0A] hover:bg-[#F0E3D1] rounded-r"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs font-black text-[#311A0A]">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Section: Voucher & Checkout */}
            {cart.length > 0 && (
              <div className="p-4 bg-white border-t border-[#D3C6B4] space-y-3.5 shadow-lg">
                
                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        placeholder="Promo Code (e.g. KHANDANI10)"
                        className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg pl-8 pr-3 py-2 text-xs text-[#311A0A] uppercase placeholder-gray-400 focus:outline-none focus:border-[#311A0A]"
                      />
                      <Tag className="w-3.5 h-3.5 text-[#6A330E] absolute left-2.5 top-2.5" />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#311A0A] hover:bg-[#1C0A02] text-[#F9F3EC] text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  {couponError && <p className="text-[11px] text-rose-600 font-medium pl-1">{couponError}</p>}
                  {appliedCoupon && (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded text-xs text-emerald-800">
                      <span>Applied: <strong>{appliedCoupon.code}</strong> (-{formatPrice(discountAmount)})</span>
                      <button onClick={removeCoupon} className="text-xs text-rose-600 font-bold ml-2">Remove</button>
                    </div>
                  )}
                </form>

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs border-t border-[#D3C6B4]/60 pt-2.5 text-[#544333]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold text-[#311A0A]">{formatPrice(cartSubtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Discount Voucher:</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span>
                      {calculatedShipping === 0 ? (
                        <strong className="text-emerald-700">FREE</strong>
                      ) : (
                        formatPrice(calculatedShipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-[#311A0A] border-t border-[#D3C6B4] pt-2">
                    <span>Estimated Total:</span>
                    <span className="text-base text-[#311A0A]">{formatPrice(cartGrandTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  disabled={isBelowMinOrder}
                  onClick={() => {
                    initiateCheckout();
                  }}
                  className={`w-full py-3.5 rounded-lg font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                    isBelowMinOrder
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#ECB85A] hover:bg-[#DD8F25] text-[#1C0A02] active:scale-95'
                  }`}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#1C0A02]" />
                </button>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
