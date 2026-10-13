import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle,
  Truck,
  MessageCircle,
  ShieldCheck,
  MapPin,
  Phone,
  User,
  PackageCheck,
  CreditCard,
  Building,
  Printer,
  Bike,
  Copy,
  Check,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { CITIES_LIST } from '../data/nimcoData';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discountAmount,
    appliedCoupon,
    calculatedShipping,
    cartGrandTotal,
    formatPrice,
    placeOrder,
    generateWhatsAppLink,
    selectedCity,
    setSelectedCity,
    currentCityInfo,
    setTrackingModalOrder,
    setReceiptModalOrder,
    currentUser,
    minOrderLimit,
    siteConfig
  } = useStore();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: selectedCity || 'Karachi',
    address: '',
    notes: '',
    paymentMethod: 'Cash on Delivery',
    transactionId: '',
    deliverySlot: currentCityInfo?.deliveryEstimate || 'Standard Express 24-48 Hours'
  });

  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  // Sync logged in user details into form
  useEffect(() => {
    if (currentUser) {
      setForm((prev) => ({
        ...prev,
        name: currentUser.name || prev.name,
        phone: currentUser.phone || prev.phone,
        city: currentUser.city || prev.city
      }));
    }
  }, [currentUser]);

  // Sync city delivery slot
  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    const cityInfo = CITIES_LIST.find((c) => c.name.toLowerCase() === newCity.toLowerCase());
    setForm((prev) => ({
      ...prev,
      city: newCity,
      deliverySlot: cityInfo?.deliveryEstimate || 'Standard 2-3 Days'
    }));
  };

  if (!isCheckoutOpen) return null;

  const handleCopy = (text, fieldName) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cartSubtotal < minOrderLimit) {
      alert(`Minimum order limit Rs. ${minOrderLimit} hai. Meharbani farma kar mazeed snacks cart mein shamil karein!`);
      return;
    }

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      alert('Bara-e-meharbani apna Mukammal Naam, WhatsApp Phone aur Address darj karein.');
      return;
    }

    if ((form.paymentMethod === 'JazzCash' || form.paymentMethod === 'EasyPaisa') && !form.transactionId.trim()) {
      alert('Bara-e-meharbani raqam transfer karne ke baad Transaction ID (TID) darj karein.');
      return;
    }

    const orderItems = cart.map((item) => ({
      id: item.productId,
      name: item.name,
      weight: item.weightLabel,
      price: item.pricePerUnit * item.quantity,
      quantity: item.quantity
    }));

    const paymentDetails = {
      transactionId: form.transactionId || null,
      notes: form.notes
    };

    const newOrder = placeOrder(
      form,
      orderItems,
      cartGrandTotal,
      form.paymentMethod,
      paymentDetails
    );

    setPlacedOrderDetails(newOrder);

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }

    // If WhatsApp method selected, redirect to WhatsApp
    if (form.paymentMethod === 'WhatsApp Direct') {
      const itemsText = orderItems.map((i) => `• ${i.name} (${i.weight}) x${i.quantity} - ${formatPrice(i.price)}`).join('\n');
      const text = `🎉 *NEW ORDER - ${newOrder.id} (Khandani Nimco)*\n\n*Customer:* ${form.name}\n*Phone:* ${form.phone}\n*City:* ${form.city}\n*Address:* ${form.address}\n\n*TRACKING ID:* ${newOrder.trackingNumber || newOrder.id}\n\n*ITEMS:* \n${itemsText}\n\n*Subtotal:* ${formatPrice(cartSubtotal)}\n*Discount:* -${formatPrice(discountAmount)}\n*Delivery:* ${formatPrice(calculatedShipping)}\n*GRAND TOTAL:* ${formatPrice(cartGrandTotal)}\n*Payment Method:* WhatsApp Order Direct\n\nMeharbani farma kar mera order confirm kijiye!`;
      
      setTimeout(() => {
        window.open(generateWhatsAppLink(text), '_blank');
      }, 1200);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white border border-[#D3C6B4] rounded-2xl overflow-hidden shadow-2xl text-[#311A0A] my-6"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#F9F3EC] border-b border-[#D3C6B4] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#ECB85A] text-[#1C0A02] flex items-center justify-center font-bold shadow-sm">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-serif text-[#311A0A]">Khandani Nimco Express Checkout</h2>
                <p className="text-xs text-[#544333]">Fast & fresh door-to-door delivery across Pakistan</p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setPlacedOrderDetails(null);
              }}
              className="p-2 text-[#544333] hover:text-[#311A0A] bg-[#F0E3D1] hover:bg-[#D3C6B4] rounded-full transition-colors border border-[#D3C6B4]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Screen after Order Placement */}
          {placedOrderDetails ? (
            <div className="p-6 sm:p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="bg-[#ECB85A] text-[#1C0A02] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  Order Placed Successfully!
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#311A0A] mt-2">
                  Shukriya, {placedOrderDetails.customerName}!
                </h3>
                <p className="text-xs text-[#544333] mt-1 max-w-md mx-auto">
                  Aapka order receive ho chuka hai aur Khandani kitchen mein fresh batch pack hona shuru ho gaya hai.
                </p>
              </div>

              {/* Special Order Tracking Code Card with 1-Click Copy */}
              <div className="bg-[#F9F3EC] border border-[#ECB85A] p-4 rounded-xl max-w-md mx-auto text-left shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6A330E]">
                    Order Tracking Number:
                  </span>
                  <span className="text-[10px] bg-[#F0E3D1] text-[#311A0A] px-2 py-0.5 rounded font-mono font-bold">
                    Official KN-ID
                  </span>
                </div>

                <div className="flex items-center justify-between bg-white border border-[#D3C6B4] p-2.5 rounded-lg">
                  <span className="font-mono text-base font-bold text-[#311A0A] tracking-wider">
                    {placedOrderDetails.trackingNumber || placedOrderDetails.id}
                  </span>
                  <button
                    onClick={() => handleCopy(placedOrderDetails.trackingNumber || placedOrderDetails.id, 'tracking')}
                    className="flex items-center gap-1.5 text-xs bg-[#ECB85A] hover:bg-[#DD8F25] text-[#1C0A02] font-bold px-3 py-1.5 rounded-md transition-colors"
                  >
                    {copiedField === 'tracking' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-[#544333]">
                  Yeh special tracking code save kar lein. Is se aap website par kisi bhi waqt live status dekh sakte hain.
                </p>
              </div>

              {/* Order Receipt Details */}
              <div className="bg-[#F9F3EC] border border-[#D3C6B4] p-4 rounded-xl text-left space-y-2 text-xs max-w-md mx-auto">
                <div className="flex justify-between border-b border-[#D3C6B4]/60 pb-2">
                  <span className="text-[#544333] font-bold">Delivery Destination:</span>
                  <span className="text-[#311A0A] text-right font-medium">{placedOrderDetails.address}, {placedOrderDetails.city}</span>
                </div>
                <div className="flex justify-between border-b border-[#D3C6B4]/60 pb-2">
                  <span className="text-[#544333] font-bold">WhatsApp Phone:</span>
                  <span className="text-[#311A0A] font-mono">{placedOrderDetails.phone}</span>
                </div>
                <div className="flex justify-between border-b border-[#D3C6B4]/60 pb-2">
                  <span className="text-[#544333] font-bold">Payment Method:</span>
                  <span className="text-[#6A330E] font-bold">{placedOrderDetails.paymentMethod}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#311A0A] pt-1">
                  <span>Grand Total to Pay:</span>
                  <span>{formatPrice(placedOrderDetails.totalAmount)}</span>
                </div>
              </div>

              {/* Action Buttons: Live Tracker & Print Receipt */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setTrackingModalOrder(placedOrderDetails);
                  }}
                  className="flex-1 bg-[#311A0A] hover:bg-[#1C0A02] text-[#F9F3EC] font-bold py-3 px-4 rounded-lg text-xs flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
                >
                  <Bike className="w-4 h-4 text-[#ECB85A]" />
                  <span>Track Live Delivery</span>
                </button>

                <button
                  onClick={() => {
                    setReceiptModalOrder(placedOrderDetails);
                  }}
                  className="flex-1 bg-[#F0E3D1] hover:bg-[#D3C6B4] text-[#311A0A] font-bold py-3 px-4 rounded-lg text-xs flex items-center justify-center gap-2 border border-[#D3C6B4] transition-colors"
                >
                  <Printer className="w-4 h-4 text-[#6A330E]" />
                  <span>Print Receipt / PDF</span>
                </button>
              </div>

              <div>
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setPlacedOrderDetails(null);
                  }}
                  className="text-xs text-[#6A330E] hover:underline font-bold"
                >
                  Back to Khandani Nimco Storefront
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              
              {/* Minimum Order Limit Notice */}
              {cartSubtotal < minOrderLimit && (
                <div className="bg-amber-100 border border-amber-300 p-3 rounded-lg flex items-center gap-2 text-amber-900 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    Minimum Order Limit Rs. <strong>{minOrderLimit}</strong> hai. Aapka mojooda subtotal Rs. {cartSubtotal} hai. Mazeed items add karein.
                  </span>
                </div>
              )}

              {/* Order Summary Pill */}
              <div className="bg-[#F0E3D1]/60 border border-[#D3C6B4] p-3.5 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#311A0A]">
                    Items in Cart: {cart.length} packs
                  </span>
                  {appliedCoupon && (
                    <span className="text-emerald-700 block text-[11px] font-bold">
                      Coupon Applied: {appliedCoupon.code} (-{formatPrice(discountAmount)})
                    </span>
                  )}
                  <span className="text-[11px] text-[#544333] block">
                    Delivery Charges: {calculatedShipping === 0 ? 'FREE' : formatPrice(calculatedShipping)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#544333] block uppercase font-bold">Total to Pay:</span>
                  <span className="text-base font-black text-[#311A0A] font-mono">{formatPrice(cartGrandTotal)}</span>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-[#6A330E] uppercase tracking-wider flex items-center gap-1.5 font-serif">
                  <User className="w-4 h-4" />
                  1. Customer & Delivery Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#311A0A] block mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Muhammad Ali"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] placeholder-gray-400 focus:outline-none focus:border-[#311A0A]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#311A0A] block mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. 0324 2478108"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] placeholder-gray-400 focus:outline-none focus:border-[#311A0A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#311A0A] block mb-1">
                      City *
                    </label>
                    <select
                      value={selectedCity}
                      onChange={handleCityChange}
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                    >
                      {CITIES_LIST.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name} ({c.deliveryEstimate.split(' ')[0]}) - Delivery: Rs. {c.deliveryFee}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#311A0A] block mb-1">
                      Delivery Estimate
                    </label>
                    <div className="bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#6A330E] font-semibold flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#6A330E]" />
                      <span>{currentCityInfo?.deliveryEstimate || '24-48 Hours'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#311A0A] block mb-1">
                    Complete Street Address & Landmark *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Flat #, Street #, Sector/Block, Famous Landmark..."
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] placeholder-gray-400 focus:outline-none focus:border-[#311A0A]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#311A0A] block mb-1">
                    Special Instructions / Order Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call before arrival, packaging note, gift wrap..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] placeholder-gray-400 focus:outline-none focus:border-[#311A0A]"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2 border-t border-[#D3C6B4]">
                <h3 className="text-xs font-bold text-[#6A330E] uppercase tracking-wider flex items-center gap-1.5 font-serif">
                  <CreditCard className="w-4 h-4" />
                  2. Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* COD */}
                  <label className={`p-3 rounded-lg border cursor-pointer flex items-center gap-2.5 transition-all ${
                    form.paymentMethod === 'Cash on Delivery'
                      ? 'bg-[#311A0A] border-[#311A0A] text-[#F9F3EC] shadow-sm'
                      : 'bg-white border-[#D3C6B4] text-[#311A0A] hover:border-[#6A330E]'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === 'Cash on Delivery'}
                      onChange={() => setForm({ ...form, paymentMethod: 'Cash on Delivery' })}
                      className="accent-[#ECB85A]"
                    />
                    <div>
                      <span className="font-bold text-xs block">
                        💵 Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] text-gray-400">Pay cash upon delivery</span>
                    </div>
                  </label>

                  {/* JazzCash */}
                  <label className={`p-3 rounded-lg border cursor-pointer flex items-center gap-2.5 transition-all ${
                    form.paymentMethod === 'JazzCash'
                      ? 'bg-[#311A0A] border-[#311A0A] text-[#F9F3EC] shadow-sm'
                      : 'bg-white border-[#D3C6B4] text-[#311A0A] hover:border-[#6A330E]'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === 'JazzCash'}
                      onChange={() => setForm({ ...form, paymentMethod: 'JazzCash' })}
                      className="accent-[#ECB85A]"
                    />
                    <div>
                      <span className="font-bold text-xs block">
                        📱 JazzCash Wallet
                      </span>
                      <span className="text-[10px] text-gray-400">Instant mobile wallet transfer</span>
                    </div>
                  </label>

                  {/* EasyPaisa */}
                  <label className={`p-3 rounded-lg border cursor-pointer flex items-center gap-2.5 transition-all ${
                    form.paymentMethod === 'EasyPaisa'
                      ? 'bg-[#311A0A] border-[#311A0A] text-[#F9F3EC] shadow-sm'
                      : 'bg-white border-[#D3C6B4] text-[#311A0A] hover:border-[#6A330E]'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === 'EasyPaisa'}
                      onChange={() => setForm({ ...form, paymentMethod: 'EasyPaisa' })}
                      className="accent-[#ECB85A]"
                    />
                    <div>
                      <span className="font-bold text-xs block">
                        📱 EasyPaisa Account
                      </span>
                      <span className="text-[10px] text-gray-400">Easy transfer via EasyPaisa App</span>
                    </div>
                  </label>

                  {/* WhatsApp Direct */}
                  <label className={`p-3 rounded-lg border cursor-pointer flex items-center gap-2.5 transition-all ${
                    form.paymentMethod === 'WhatsApp Direct'
                      ? 'bg-[#25D366] border-[#25D366] text-white shadow-sm'
                      : 'bg-white border-[#D3C6B4] text-[#311A0A] hover:border-[#6A330E]'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === 'WhatsApp Direct'}
                      onChange={() => setForm({ ...form, paymentMethod: 'WhatsApp Direct' })}
                      className="accent-[#25D366]"
                    />
                    <div>
                      <span className="font-bold text-xs block">
                        💬 Order via WhatsApp
                      </span>
                      <span className="text-[10px] opacity-80">Confirm & finalize on chat</span>
                    </div>
                  </label>
                </div>

                {/* Mobile Wallet Transaction ID input if JazzCash or EasyPaisa */}
                {(form.paymentMethod === 'JazzCash' || form.paymentMethod === 'EasyPaisa') && (() => {
                  const walletInfo = form.paymentMethod === 'JazzCash' 
                    ? siteConfig?.payments?.jazzcash 
                    : siteConfig?.payments?.easypaisa;
                  const accNum = walletInfo?.accountNumber || '0324-2478108';
                  const accTitle = walletInfo?.accountTitle || (siteConfig?.storeName || 'Khandani Nimco');

                  return (
                    <div className="bg-[#F9F3EC] border border-[#ECB85A] p-3.5 rounded-xl space-y-2 text-xs">
                      <p className="font-bold text-[#311A0A]">
                        Send Rs. {cartGrandTotal} to {form.paymentMethod} Number: <strong>{accNum}</strong> (Title: {accTitle})
                      </p>
                      <input
                        type="text"
                        required
                        placeholder="Enter 11-digit Transaction ID (TID) *"
                        value={form.transactionId}
                        onChange={(e) => setForm({ ...form, transactionId: e.target.value })}
                        className="w-full bg-white border border-[#D3C6B4] rounded-lg p-2 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                      />
                    </div>
                  );
                })()}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={cartSubtotal < minOrderLimit}
                  className={`w-full py-3.5 rounded-lg font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                    cartSubtotal < minOrderLimit
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#ECB85A] hover:bg-[#DD8F25] text-[#1C0A02] active:scale-95'
                  }`}
                >
                  <PackageCheck className="w-4 h-4 text-[#1C0A02]" />
                  <span>Confirm Order ({formatPrice(cartGrandTotal)})</span>
                </button>
              </div>

            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
