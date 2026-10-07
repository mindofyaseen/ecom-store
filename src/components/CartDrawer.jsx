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
  AlertCircle,
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
    initiateCheckout,
    products,
    addToCart
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingMin) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingMin - cartSubtotal);
  const isBelowMinOrder = cartSubtotal < minOrderLimit;
  const remainingForMinOrder = Math.max(0, minOrderLimit - cartSubtotal);

  // Suggested impulse buy items
  const cartProductIds = cart.map(i => i.productId);
  const upsellProducts = products
    .filter(p => !cartProductIds.includes(p.id))
    .slice(0, 3);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const ok = applyCouponCode(inputCoupon.trim());
    if (ok) setInputCoupon('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-[#1c0f0a] border-l border-[#3b1f13] text-[#eedfc8] shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-[#3b1f13] bg-[#241108] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#e5a842] rounded-xl text-[#200e08] font-black">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-white font-serif">Your Khandani Basket</h2>
                  <p className="text-xs text-[#e5a842]">
                    {cart.length} {cart.length === 1 ? 'snack item' : 'snack items'} selected
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-rose-300 hover:text-white px-2 py-1 bg-[#34180d] rounded-lg"
                    title="Empty Basket"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#ecd8c3] hover:text-white bg-[#34180d] hover:bg-[#4a2213] rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Minimum Order Warning Bar if below limit */}
            {cart.length > 0 && isBelowMinOrder && (
              <div className="bg-amber-500/20 border-b border-amber-500/40 p-2.5 px-4 flex items-center gap-2 text-xs text-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  Minimum order limit is <strong>Rs. {minOrderLimit}</strong>. Add <strong>Rs. {remainingForMinOrder}</strong> more to checkout.
                </span>
              </div>
            )}

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#241108]/90 p-3 px-5 border-b border-[#3b1f13]">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="flex items-center gap-1.5 text-[#e5a842]">
                  <Truck className="w-4 h-4 text-[#e5a842]" />
                  {remainingForFreeShipping > 0
                    ? `Add ${formatPrice(remainingForFreeShipping)} more for FREE Delivery!`
                    : '🎉 You unlocked FREE Delivery nationwide!'}
                </span>
              </div>
              <div className="w-full bg-[#1c0f0a] rounded-full h-2 overflow-hidden border border-[#3b1f13]">
                <div
                  className="bg-gradient-to-r from-[#d97706] to-[#e5a842] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-20 h-20 bg-[#241108] rounded-full flex items-center justify-center mx-auto text-[#e5a842] border border-[#3b1f13]">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h3 className="text-base font-bold text-white font-serif">Your basket is empty</h3>
                  <p className="text-xs text-[#b89f8b] max-w-xs mx-auto">
                    Add crispy Khandani Mix Nimco, roasted cashews, or fresh gathiya to start enjoying authentic snacks!
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-[#e5a842] hover:bg-[#d99b26] text-[#200e08] font-black px-6 py-2.5 rounded-xl text-xs shadow"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex gap-3 bg-[#241108] border border-[#3b1f13] p-3 rounded-2xl relative group"
                  >
                    {/* Item thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#4a2213]"
                    />

                    {/* Item info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start pr-5">
                          <h4 className="text-xs font-bold text-white line-clamp-1 font-serif">
                            {item.name}
                          </h4>
                        </div>
                        <span className="inline-block text-[10px] bg-[#34180d] text-[#e5a842] px-2 py-0.5 rounded font-medium mt-0.5 border border-[#4a2213]">
                          {item.weightLabel}
                        </span>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center bg-[#1c0f0a] border border-[#4a2213] rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-1 text-[#ecd8c3] hover:text-white hover:bg-[#34180d]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-white min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-1 text-[#ecd8c3] hover:text-white hover:bg-[#34180d]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-black text-[#e5a842]">
                          {formatPrice(item.pricePerUnit * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="absolute top-2.5 right-2.5 text-[#ecd8c3]/60 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}

              {/* Upsell Recommendations */}
              {cart.length > 0 && upsellProducts.length > 0 && (
                <div className="pt-2 border-t border-[#3b1f13]">
                  <span className="text-[11px] font-bold text-[#e5a842] uppercase tracking-wider block mb-2 font-serif">
                    Popular Add-ons with Tea:
                  </span>
                  <div className="space-y-2">
                    {upsellProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between bg-[#241108] border border-[#3b1f13] p-2 rounded-xl text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-9 h-9 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-bold text-white line-clamp-1 text-[11px] font-serif">{p.name}</p>
                            <span className="text-[10px] text-[#e5a842] font-semibold">
                              {formatPrice(p.price)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => addToCart(p, p.weightOptions[0], 1)}
                          className="bg-[#e5a842] hover:bg-[#d99b26] text-[#200e08] font-black px-2.5 py-1 rounded-lg text-[10px] flex items-center gap-1 shadow"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Section: Coupon & Checkout Summary */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 bg-[#241108] border-t border-[#3b1f13] space-y-3">
                
                {/* Coupon Code Input */}
                <div className="space-y-1.5">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-[#1c0f0a] border border-[#c8913c]/60 p-2 rounded-xl text-xs text-[#e5a842]">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#e5a842]" />
                        <span>Code <strong>{appliedCoupon.code}</strong> applied!</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-[10px] text-rose-300 hover:text-white underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Promo code (e.g. KHANDANI10)..."
                          value={inputCoupon}
                          onChange={(e) => setInputCoupon(e.target.value)}
                          className="w-full bg-[#1c0f0a] border border-[#4a2213] rounded-xl py-2 pl-8 pr-2 text-xs text-white placeholder-[#8d715d] focus:outline-none focus:ring-1 focus:ring-[#c8913c]"
                        />
                        <Tag className="w-3.5 h-3.5 text-[#c8913c] absolute left-2.5 top-2.5" />
                      </div>
                      <button
                        type="submit"
                        className="bg-[#e5a842] hover:bg-[#d99b26] text-[#200e08] font-bold px-3 py-2 rounded-xl text-xs"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponError && (
                    <p className="text-[11px] text-rose-300 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {couponError}
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs border-t border-[#3b1f13] pt-2">
                  <div className="flex justify-between text-[#ecd8c3]">
                    <span>Subtotal:</span>
                    <span>{formatPrice(cartSubtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#e5a842] font-semibold">
                      <span>Discount ({appliedCoupon?.code}):</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#ecd8c3]">
                    <span>Delivery Fee:</span>
                    <span>
                      {calculatedShipping === 0 ? (
                        <strong className="text-[#22c55e]">FREE</strong>
                      ) : (
                        formatPrice(calculatedShipping)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-black text-white pt-1 border-t border-[#3b1f13]">
                    <span className="font-serif">Grand Total:</span>
                    <span className="text-[#e5a842]">{formatPrice(cartGrandTotal)}</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  disabled={isBelowMinOrder}
                  onClick={initiateCheckout}
                  className={`w-full font-black py-3.5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl transform active:scale-95 transition-all ${
                    isBelowMinOrder
                      ? 'bg-[#34180d] text-[#8d715d] cursor-not-allowed border border-[#4a2213]'
                      : 'bg-[#e5a842] hover:bg-[#d99b26] text-[#200e08]'
                  }`}
                >
                  <span>{isBelowMinOrder ? `Minimum Order Rs. ${minOrderLimit}` : 'Proceed to Checkout (Sign In Required)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
