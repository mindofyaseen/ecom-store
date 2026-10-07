import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle,
  Truck,
  MessageCircle,
  DollarSign,
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
    minOrderLimit
  } = useStore();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: selectedCity || 'Karachi',
    address: '',
    notes: '',
    paymentMethod: 'Cash on Delivery', // 'Cash on Delivery' | 'JazzCash' | 'EasyPaisa' | 'WhatsApp Direct'
    transactionId: '',
    deliverySlot: currentCityInfo?.deliveryEstimate || 'Standard Express 24-48 Hours'
  });

  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  // Auto-fill customer details from currentUser when logged in
  useEffect(() => {
    if (currentUser) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || currentUser.name || '',
        phone: prev.phone || currentUser.phone || '',
        city: prev.city || currentUser.city || selectedCity || 'Karachi'
      }));
    }
  }, [currentUser, selectedCity]);

  if (!isCheckoutOpen) return null;

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    const info = CITIES_LIST.find((c) => c.name === cityName);
    setForm((prev) => ({
      ...prev,
      city: cityName,
      deliverySlot: info ? info.deliveryEstimate : 'Standard Express 24-48 Hours'
    }));
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
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
        particleCount: 120,
        spread: 90,
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#1c0f0a] border-2 border-[#a16207]/50 rounded-3xl overflow-hidden shadow-2xl text-[#eedfc8] my-6"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#241108] border-b border-[#3b1f13] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#d97706] to-[#e5a842] text-[#200e08] flex items-center justify-center font-black shadow-lg">
                <Truck className="w-5 h-5 text-[#200e08]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-white font-serif">Khandani Nimco Express Checkout</h2>
                </div>
                <p className="text-xs text-amber-300">Fast & fresh door-to-door delivery across Pakistan</p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setPlacedOrderDetails(null);
              }}
              className="p-2 text-emerald-200 hover:text-white bg-emerald-900/80 hover:bg-emerald-800 rounded-full transition-colors border border-emerald-700/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Screen after Order Placement */}
          {placedOrderDetails ? (
            <div className="p-6 sm:p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400/60 shadow-lg shadow-emerald-500/20">
                <CheckCircle className="w-12 h-12" />
              </div>

              <div>
                <span className="bg-amber-400 text-emerald-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow">
                  <Sparkles className="w-3.5 h-3.5" />
                  Mubarak Ho! Order Successfully Placed
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 font-serif">
                  Shukriya, {placedOrderDetails.customerName}!
                </h3>
                <p className="text-xs text-emerald-200 mt-1 max-w-md mx-auto">
                  Aapka order receive ho chuka hai aur Khandani kitchen mein fresh batch pack hona shuru ho gaya hai.
                </p>
              </div>

              {/* Special Order Tracking Code Card with 1-Click Copy */}
              <div className="bg-gradient-to-r from-emerald-900/90 to-[#022c22] border-2 border-amber-400/80 p-4 rounded-2xl max-w-md mx-auto text-left shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    Special Order Tracking Number:
                  </span>
                  <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
                    Official KN-ID
                  </span>
                </div>

                <div className="flex items-center justify-between bg-black/40 border border-emerald-600/50 p-2.5 rounded-xl">
                  <span className="font-mono text-lg font-black text-amber-400 tracking-wider">
                    {placedOrderDetails.trackingNumber || placedOrderDetails.id}
                  </span>
                  <button
                    onClick={() => handleCopy(placedOrderDetails.trackingNumber || placedOrderDetails.id, 'tracking')}
                    className="flex items-center gap-1.5 text-xs bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-3 py-1.5 rounded-lg transition-colors shadow"
                  >
                    {copiedField === 'tracking' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-900" />
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
                <p className="text-[11px] text-emerald-300/80">
                  Yeh special tracking code save kar lein. Is se aap website par kisi bhi waqt live status dekh sakte hain.
                </p>
              </div>

              {/* Order Receipt Details */}
              <div className="bg-emerald-900/40 border border-emerald-800 p-4 rounded-2xl text-left space-y-2 text-xs max-w-md mx-auto">
                <div className="flex justify-between border-b border-emerald-800/80 pb-2">
                  <span className="text-emerald-300 font-bold">Delivery Destination:</span>
                  <span className="text-white text-right">{placedOrderDetails.address}, {placedOrderDetails.city}</span>
                </div>
                <div className="flex justify-between border-b border-emerald-800/80 pb-2">
                  <span className="text-emerald-300 font-bold">WhatsApp Phone:</span>
                  <span className="text-white font-mono">{placedOrderDetails.phone}</span>
                </div>
                <div className="flex justify-between border-b border-emerald-800/80 pb-2">
                  <span className="text-emerald-300 font-bold">Payment Method:</span>
                  <span className="text-amber-300 font-bold">{placedOrderDetails.paymentMethod}</span>
                </div>
                <div className="flex justify-between border-b border-emerald-800/80 pb-2">
                  <span className="text-emerald-300 font-bold">Estimated Delivery:</span>
                  <span className="text-emerald-200 font-semibold">{placedOrderDetails.deliverySlot}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-amber-400 pt-1">
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
                  className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-emerald-950 font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                  <Bike className="w-4 h-4" />
                  <span>Track Live Delivery</span>
                </button>

                <button
                  onClick={() => {
                    setReceiptModalOrder(placedOrderDetails);
                  }}
                  className="flex-1 bg-emerald-900 hover:bg-emerald-800 text-emerald-100 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-emerald-700 transition-colors"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>Print Receipt / PDF</span>
                </button>
              </div>

              <div>
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setPlacedOrderDetails(null);
                  }}
                  className="text-xs text-amber-300 hover:text-white underline font-medium"
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
                <div className="bg-rose-950/80 border border-rose-500/80 p-3 rounded-2xl flex items-center gap-2 text-rose-200 text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>
                    Minimum Order Limit Rs. <strong>{minOrderLimit}</strong> hai. Aapka mojooda subtotal Rs. {cartSubtotal} hai. Mazeed items add karein.
                  </span>
                </div>
              )}

              {/* Order Summary Pill */}
              <div className="bg-emerald-900/50 border border-emerald-700 p-3.5 rounded-2xl flex items-center justify-between text-xs shadow-inner">
                <div>
                  <span className="font-bold text-emerald-200">
                    Items in Cart: {cart.length} packs
                  </span>
                  {appliedCoupon && (
                    <span className="text-amber-400 block text-[11px] font-semibold">
                      Coupon Applied: {appliedCoupon.code} (-{formatPrice(discountAmount)})
                    </span>
                  )}
                  <span className="text-[11px] text-emerald-300/80 block">
                    Delivery Charges: {calculatedShipping === 0 ? 'FREE' : formatPrice(calculatedShipping)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-amber-300 block uppercase font-bold">Total to Pay:</span>
                  <span className="text-lg font-black text-amber-400 font-mono">{formatPrice(cartGrandTotal)}</span>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  1. Customer & Delivery Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-emerald-200 block mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Muhammad Ali"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl p-2.5 text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-emerald-200 block mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. 0300 1234567"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl p-2.5 text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-emerald-200 block mb-1">
                      City *
                    </label>
                    <select
                      value={selectedCity}
                      onChange={handleCityChange}
                      className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    >
                      {CITIES_LIST.map((c) => (
                        <option key={c.name} value={c.name} className="bg-emerald-950 text-white">
                          {c.name} ({c.deliveryEstimate.split(' ')[0]}) - Delivery: Rs. {c.deliveryFee}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-emerald-200 block mb-1">
                      Delivery Estimate
                    </label>
                    <div className="bg-emerald-900/40 border border-emerald-700/80 rounded-xl p-2.5 text-xs text-amber-300 font-semibold flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-amber-400" />
                      <span>{currentCityInfo?.deliveryEstimate || '24-48 Hours'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-emerald-200 block mb-1">
                    Complete Street Address & Landmark *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Flat #, Street #, Sector/Block, Famous Landmark..."
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl p-2.5 text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-emerald-200 block mb-1">
                    Special Instructions / Order Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call before arrival, packaging note, gift wrap..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl p-2.5 text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2 border-t border-emerald-800">
                <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4" />
                  2. Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* COD */}
                  <label className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                    form.paymentMethod === 'Cash on Delivery'
                      ? 'bg-emerald-900 border-amber-400 text-white shadow-md'
                      : 'bg-emerald-950/60 border-emerald-800 text-emerald-200 hover:border-emerald-600'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === 'Cash on Delivery'}
                      onChange={() => setForm({ ...form, paymentMethod: 'Cash on Delivery' })}
                      className="accent-amber-400"
                    />
                    <div>
                      <span className="font-bold text-xs block text-white flex items-center gap-1">
                        💵 Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] text-emerald-300">Pay cash upon parcel delivery</span>
                    </div>
                  </label>

                  {/* JazzCash */}
                  <label className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                    form.paymentMethod === 'JazzCash'
                      ? 'bg-emerald-900 border-amber-400 text-white shadow-md'
                      : 'bg-emerald-950/60 border-emerald-800 text-emerald-200 hover:border-emerald-600'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === 'JazzCash'}
                      onChange={() => setForm({ ...form, paymentMethod: 'JazzCash' })}
                      className="accent-amber-400"
                    />
                    <div>
                      <span className="font-bold text-xs block text-white flex items-center gap-1">
                        📱 JazzCash Wallet
                      </span>
                      <span className="text-[10px] text-emerald-300">Instant mobile wallet transfer</span>
                    </div>
                  </label>

                  {/* EasyPaisa */}
                  <label className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                    form.paymentMethod === 'EasyPaisa'
                      ? 'bg-emerald-900 border-amber-400 text-white shadow-md'
                      : 'bg-emerald-950/60 border-emerald-800 text-emerald-200 hover:border-emerald-600'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === 'EasyPaisa'}
                      onChange={() => setForm({ ...form, paymentMethod: 'EasyPaisa' })}
                      className="accent-amber-400"
                    />
                    <div>
                      <span className="font-bold text-xs block text-white flex items-center gap-1">
                        📱 EasyPaisa Account
                      </span>
                      <span className="text-[10px] text-emerald-300">Easy transfer via EasyPaisa App</span>
                    </div>
                  </label>

                  {/* WhatsApp Direct */}
                  <label className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                    form.paymentMethod === 'WhatsApp Direct'
                      ? 'bg-emerald-800 border-emerald-400 text-white shadow-md'
                      : 'bg-emerald-950/60 border-emerald-800 text-emerald-200 hover:border-emerald-600'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === 'WhatsApp Direct'}
                      onChange={() => setForm({ ...form, paymentMethod: 'WhatsApp Direct' })}
                      className="accent-amber-400"
                    />
                    <div>
                      <span className="font-bold text-xs block text-white flex items-center gap-1">
                        💬 WhatsApp Direct Order
                      </span>
                      <span className="text-[10px] text-emerald-300">Confirm order live with agent</span>
                    </div>
                  </label>
                </div>

                {/* Account Details instructions if JazzCash or EasyPaisa selected */}
                {(form.paymentMethod === 'JazzCash' || form.paymentMethod === 'EasyPaisa') && (
                  <div className="bg-emerald-900/80 border-2 border-amber-400/80 p-3.5 rounded-2xl text-xs space-y-2.5 shadow-md">
                    <div className="flex items-center justify-between font-bold text-amber-300">
                      <span>{form.paymentMethod} Official Account:</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(form.paymentMethod === 'JazzCash' ? '03009876543' : '03331234567', 'account')}
                        className="flex items-center gap-1 text-[11px] bg-amber-400 text-emerald-950 px-2 py-0.5 rounded font-bold hover:bg-amber-300"
                      >
                        {copiedField === 'account' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedField === 'account' ? 'Copied' : 'Copy Number'}</span>
                      </button>
                    </div>

                    <div className="bg-black/30 p-2.5 rounded-xl flex items-center justify-between border border-emerald-700">
                      <div>
                        <span className="block text-[10px] text-emerald-300 uppercase">Account Title:</span>
                        <span className="font-bold text-white text-xs">Khandani Nimco Store</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-emerald-300 uppercase">Account Number:</span>
                        <span className="font-mono font-black text-amber-400 text-sm">
                          {form.paymentMethod === 'JazzCash' ? '0300-9876543' : '0333-1234567'}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-emerald-200">
                      Barah-e-karam <strong className="text-amber-300">{formatPrice(cartGrandTotal)}</strong> transfer karein aur apna 6-12 digit Transaction ID (TID) darj karein:
                    </p>

                    <input
                      type="text"
                      required
                      placeholder="Transaction ID / TID (e.g. 9821384021)..."
                      value={form.transactionId}
                      onChange={(e) => setForm({ ...form, transactionId: e.target.value })}
                      className="w-full bg-emerald-950 border border-emerald-600 rounded-xl p-2.5 text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={cartSubtotal < minOrderLimit}
                  className={`w-full py-3.5 rounded-2xl text-sm font-black shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
                    cartSubtotal < minOrderLimit
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-emerald-950'
                  }`}
                >
                  <PackageCheck className="w-5 h-5" />
                  <span>
                    {cartSubtotal < minOrderLimit
                      ? `Min Order Limit: Rs. ${minOrderLimit}`
                      : `Confirm Order - ${formatPrice(cartGrandTotal)}`}
                  </span>
                </button>
              </div>

            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
