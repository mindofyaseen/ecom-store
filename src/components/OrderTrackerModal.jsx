import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Package, CheckCircle2, Clock, Truck, Bike, MapPin, Phone, MessageSquare, AlertCircle, Copy, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderTrackerModal = () => {
  const { trackingModalOrder, setTrackingModalOrder, getOrderById, formatPrice, generateWhatsAppLink } = useStore();
  const [searchId, setSearchId] = useState('');
  const [searchError, setSearchError] = useState('');
  const [copied, setCopied] = useState(false);

  if (!trackingModalOrder) return null;

  const currentOrder = typeof trackingModalOrder === 'object' ? trackingModalOrder : getOrderById(trackingModalOrder);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError('');
    if (!searchId.trim()) return;

    const found = getOrderById(searchId.trim());
    if (found) {
      setTrackingModalOrder(found);
    } else {
      setSearchError(`No order found matching "${searchId}". Try KN-98214 or KN-98215.`);
    }
  };

  const copyTracking = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { key: 'Pending', label: 'Order Confirmed', desc: 'Order details verified & scheduled', icon: CheckCircle2 },
    { key: 'Packing', label: 'Fresh Batch Packing', desc: 'Nitrogen-sealed in food grade pouch', icon: Package },
    { key: 'Shipped', label: 'Dispatched to Courier', desc: currentOrder?.courier || 'Handed over to courier', icon: Truck },
    { key: 'Out for Delivery', label: 'Out for Delivery', desc: 'Rider is on the way to your doorstep', icon: Bike },
    { key: 'Delivered', label: 'Delivered', desc: 'Package safely handed over', icon: CheckCircle2 }
  ];

  const getStepStatus = (stepKey, currentStatus) => {
    const orderRanks = {
      'Pending': 1,
      'Packing': 2,
      'Shipped': 3,
      'Out for Delivery': 4,
      'Delivered': 5,
      'Cancelled': -1
    };

    const currentRank = orderRanks[currentStatus] || 1;
    const stepRank = orderRanks[stepKey];

    if (currentStatus === 'Cancelled') return 'cancelled';
    if (currentRank > stepRank) return 'completed';
    if (currentRank === stepRank) return 'current';
    return 'upcoming';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#042f2e] border-2 border-emerald-700 rounded-3xl overflow-hidden shadow-2xl text-emerald-50 my-6"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-[#022c22] via-[#064e3b] to-[#042f2e] border-b border-emerald-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-tr from-amber-400 to-yellow-300 text-emerald-950 rounded-2xl font-black shadow-md">
                <Bike className="w-5 h-5 text-emerald-950" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2 font-serif">
                  Khandani Nimco Live Order Tracker
                  <span className="text-[10px] bg-amber-400 text-emerald-950 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                    Live Foodpanda Tracker
                  </span>
                </h2>
                <p className="text-xs text-amber-300">Track your fresh Karachi Nimco delivery in real time</p>
              </div>
            </div>

            <button
              onClick={() => setTrackingModalOrder(null)}
              className="p-2 text-emerald-200 hover:text-white bg-emerald-900 hover:bg-emerald-800 rounded-full transition-colors border border-emerald-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {/* Search Other Order */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter Order or Tracking ID (e.g. KN-98214)..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl py-2.5 pl-10 pr-4 text-xs text-emerald-100 placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
              </div>
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-colors"
              >
                Track
              </button>
            </form>

            {searchError && (
              <p className="text-xs text-rose-300 bg-rose-950/60 border border-rose-800 p-2.5 rounded-xl flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                {searchError}
              </p>
            )}

            {currentOrder ? (
              <div className="space-y-6">
                {/* Order Summary Header Card */}
                <div className="bg-emerald-900/60 border border-emerald-700 rounded-2xl p-4 flex flex-col sm:flex-row justify-between gap-4 shadow-inner">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                        Special Order Tracking ID:
                      </span>
                      <button
                        onClick={() => copyTracking(currentOrder.trackingNumber || currentOrder.id)}
                        className="text-[10px] bg-amber-400 text-emerald-950 px-2 py-0.5 rounded font-bold hover:bg-amber-300 flex items-center gap-1"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <span className="text-xl font-black text-white font-mono tracking-wide">{currentOrder.trackingNumber || currentOrder.id}</span>
                    <p className="text-xs text-emerald-200 mt-0.5">
                      Customer: <strong className="text-white">{currentOrder.customerName}</strong> ({currentOrder.city})
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                      Status & Total:
                    </span>
                    <div className="flex sm:justify-end items-center gap-2 mt-0.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase ${
                        currentOrder.status === 'Delivered'
                          ? 'bg-emerald-500 text-white'
                          : currentOrder.status === 'Cancelled'
                          ? 'bg-rose-500 text-white'
                          : 'bg-amber-400 text-emerald-950'
                      }`}>
                        {currentOrder.status}
                      </span>
                      <span className="text-sm font-black text-amber-300 font-mono">
                        {formatPrice(currentOrder.totalAmount)}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-300 block mt-1">
                      Courier: <strong className="text-amber-300">{currentOrder.courier || 'Khandani Express'}</strong>
                    </span>
                  </div>
                </div>

                {/* Stepped Progress Timeline */}
                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3.5 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-emerald-700">
                  {steps.map((st) => {
                    const status = getStepStatus(st.key, currentOrder.status);
                    const StepIcon = st.icon;

                    let badgeColor = 'bg-emerald-950 text-emerald-600 border-emerald-800';
                    let textClass = 'text-emerald-400/60';

                    if (status === 'completed') {
                      badgeColor = 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/20';
                      textClass = 'text-emerald-100 font-semibold';
                    } else if (status === 'current') {
                      badgeColor = 'bg-amber-400 text-emerald-950 border-amber-300 ring-4 ring-amber-400/20 animate-pulse';
                      textClass = 'text-amber-300 font-bold';
                    }

                    return (
                      <div key={st.key} className="relative flex items-start gap-4">
                        {/* Node icon */}
                        <div className={`-ml-6 sm:-ml-8 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all ${badgeColor}`}>
                          <StepIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 -mt-1">
                          <h4 className={`text-sm ${textClass}`}>
                            {st.label}
                            {status === 'current' && (
                              <span className="ml-2 text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/40">
                                In Progress
                              </span>
                            )}
                          </h4>
                          <p className="text-xs text-emerald-300/80 mt-0.5">{st.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Information Box */}
                <div className="bg-emerald-900/40 border border-emerald-700/80 rounded-2xl p-4 text-xs space-y-2">
                  <div className="flex items-start gap-2 text-emerald-200">
                    <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Destination:</strong> {currentOrder.address}, {currentOrder.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-200">
                    <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span><strong>Delivery Slot:</strong> {currentOrder.deliverySlot || 'Express 24-48 Hours'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-200">
                    <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span><strong>Contact Number:</strong> {currentOrder.phone}</span>
                  </div>
                </div>

                {/* WhatsApp Support Action */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={generateWhatsAppLink(`Assalam-o-Alaikum! Please provide an update on my Khandani Nimco Order: *${currentOrder.id}* (Tracking: ${currentOrder.trackingNumber || currentOrder.id}, Customer: ${currentOrder.customerName}).`)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Need Help? WhatsApp Helpline</span>
                  </a>

                  <button
                    onClick={() => setTrackingModalOrder(null)}
                    className="bg-emerald-900 hover:bg-emerald-800 text-emerald-200 font-bold py-3 px-5 rounded-xl text-xs transition-colors border border-emerald-700"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-emerald-300 space-y-2">
                <Package className="w-10 h-10 mx-auto text-emerald-500" />
                <p>No order selected. Enter your Order ID above to track.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
