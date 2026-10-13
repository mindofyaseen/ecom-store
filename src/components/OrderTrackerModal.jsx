import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Package, CheckCircle2, Truck, Bike, Phone, AlertCircle, Copy, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderTrackerModal = () => {
  const { trackingModalOrder, setTrackingModalOrder, getOrderById, formatPrice, whatsappNumber } = useStore();
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
    navigator.clipboard?.writeText(code);
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white border border-[#D3C6B4] rounded-2xl overflow-hidden shadow-2xl text-[#311A0A] my-6"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#F9F3EC] border-b border-[#D3C6B4] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#ECB85A] text-[#1C0A02] rounded-lg font-bold shadow-sm">
                <Bike className="w-5 h-5 text-[#1C0A02]" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-serif text-[#311A0A] flex items-center gap-2">
                  Live Order Tracker
                </h2>
                <p className="text-xs text-[#544333]">Track your fresh Karachi Nimco delivery in real time</p>
              </div>
            </div>

            <button
              onClick={() => setTrackingModalOrder(null)}
              className="p-2 text-[#544333] hover:text-[#311A0A] bg-[#F0E3D1] hover:bg-[#D3C6B4] rounded-full transition-colors border border-[#D3C6B4]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Search Other Order */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter Order or Tracking ID (e.g. KN-98214)..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg py-2.5 pl-9 pr-4 text-xs text-[#311A0A] placeholder-gray-400 focus:outline-none focus:border-[#311A0A]"
                />
                <Search className="w-4 h-4 text-[#6A330E] absolute left-3 top-3" />
              </div>
              <button
                type="submit"
                className="bg-[#311A0A] hover:bg-[#1C0A02] text-[#F9F3EC] font-bold px-4 py-2.5 rounded-lg text-xs shadow-sm transition-colors"
              >
                Track
              </button>
            </form>

            {searchError && (
              <p className="text-xs text-rose-800 bg-rose-50 border border-rose-300 p-2.5 rounded-lg flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                {searchError}
              </p>
            )}

            {currentOrder && (
              <div className="space-y-6">
                {/* Order Summary Header Card */}
                <div className="bg-[#F9F3EC] border border-[#D3C6B4] rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-[#6A330E] uppercase tracking-wider block">
                        Order Tracking ID:
                      </span>
                      <button
                        onClick={() => copyTracking(currentOrder.trackingNumber || currentOrder.id)}
                        className="text-[10px] bg-[#ECB85A] text-[#1C0A02] px-2 py-0.5 rounded font-bold hover:bg-[#DD8F25] flex items-center gap-1"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <span className="text-lg font-bold font-mono text-[#311A0A] block mt-1">
                      {currentOrder.trackingNumber || currentOrder.id}
                    </span>
                    <p className="text-xs text-[#544333] mt-0.5">
                      Recipient: <strong className="text-[#311A0A]">{currentOrder.customerName}</strong> ({currentOrder.city})
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="inline-block px-3 py-1 bg-[#F0E3D1] text-[#311A0A] text-xs font-bold rounded-md">
                      Status: {currentOrder.status}
                    </span>
                    <p className="text-xs text-[#544333] mt-1 font-medium">
                      Estimated Delivery: <strong className="text-[#311A0A]">{currentOrder.deliverySlot || '24-48 Hours'}</strong>
                    </p>
                  </div>
                </div>

                {/* Progress Steps Timeline */}
                <div className="space-y-5 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A330E] font-serif">
                    Live Dispatch Timeline
                  </h3>

                  <div className="relative pl-6 space-y-5 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D3C6B4]">
                    {steps.map((step, idx) => {
                      const status = getStepStatus(step.key, currentOrder.status);
                      const Icon = step.icon;
                      return (
                        <div key={idx} className="relative flex items-start gap-4">
                          <div
                            className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                              status === 'completed'
                                ? 'bg-[#311A0A] text-[#ECB85A]'
                                : status === 'current'
                                ? 'bg-[#ECB85A] text-[#1C0A02] ring-4 ring-[#ECB85A]/30 scale-110 shadow-sm'
                                : 'bg-[#F9F3EC] text-[#544333]/50 border border-[#D3C6B4]'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>

                          <div className="pl-2">
                            <h4
                              className={`text-xs font-bold ${
                                status === 'current'
                                  ? 'text-[#311A0A]'
                                  : status === 'completed'
                                  ? 'text-[#311A0A]'
                                  : 'text-[#544333]/60'
                              }`}
                            >
                              {step.label}
                            </h4>
                            <p className="text-[11px] text-[#544333]">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* WhatsApp Support Button */}
                <div className="pt-2 flex justify-end">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Assalam-o-Alaikum!%20I%20am%20tracking%20order%20${currentOrder.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp Courier Helpline</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
