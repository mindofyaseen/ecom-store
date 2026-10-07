import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Bike, Package, CheckCircle2, Truck, MapPin, Clock, Phone, AlertCircle, Sparkles, Copy, Check } from 'lucide-react';

export const TrackOrderPage = () => {
  const { orders, getOrderById, formatPrice, generateWhatsAppLink } = useStore();
  const [searchId, setSearchId] = useState('KN-98214');
  const [currentOrder, setCurrentOrder] = useState(() => orders[0] || null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!searchId.trim()) return;

    const found = getOrderById(searchId.trim());
    if (found) {
      setCurrentOrder(found);
    } else {
      setErrorMsg(`Koi order "${searchId}" se match nahi hua. Barah-e-karam KN-98214 ya KN-98215 try karein.`);
    }
  };

  const copyTracking = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { key: 'Pending', label: 'Order Confirmed', desc: 'Order details verified & scheduled', icon: CheckCircle2 },
    { key: 'Packing', label: 'Fresh Batch Packing', desc: 'Nitrogen-sealed in food grade pouch for crispness', icon: Package },
    { key: 'Shipped', label: 'Dispatched to Courier', desc: currentOrder?.courier || 'Handed to courier express fleet', icon: Truck },
    { key: 'Out for Delivery', label: 'Out for Delivery', desc: 'Rider is en route to your doorstep', icon: Bike },
    { key: 'Delivered', label: 'Delivered', desc: 'Package handed over safely & enjoyed fresh', icon: CheckCircle2 }
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
    <div className="min-h-screen bg-[#faf7f2] py-12 text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="bg-emerald-100 text-emerald-900 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 shadow-sm border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Khandani Live Foodpanda-Style Delivery Tracker
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-emerald-950 font-serif">
            Track Your Khandani Nimco Delivery
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
            Apna special Khandani Nimco Order ID ya Tracking Number darj karein aur fresh snacks ki real-time packaging aur dispatch status dekhein.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white border-2 border-emerald-900/10 p-4 sm:p-6 rounded-3xl shadow-lg">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Special Order / Tracking ID (e.g. KN-98214)..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full bg-emerald-50/40 border border-emerald-200 rounded-2xl py-3 pl-11 pr-4 text-xs font-mono font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
              <Search className="w-5 h-5 text-emerald-700 absolute left-3.5 top-3" />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-amber-300 font-black py-3 px-8 rounded-2xl text-xs shadow-md transition-all"
            >
              Track Status
            </button>
          </form>

          {errorMsg && (
            <p className="mt-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 p-2.5 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </p>
          )}
        </div>

        {/* Tracking Details */}
        {currentOrder ? (
          <div className="bg-white border-2 border-emerald-900/10 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            
            {/* Top Order Card */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-100 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                    Special Order Tracking ID:
                  </span>
                  <button
                    onClick={() => copyTracking(currentOrder.trackingNumber || currentOrder.id)}
                    className="text-[10px] bg-amber-400 text-emerald-950 px-2 py-0.5 rounded font-bold hover:bg-amber-300 flex items-center gap-1 shadow-sm"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <span className="text-2xl font-black text-emerald-950 font-mono tracking-wide">{currentOrder.trackingNumber || currentOrder.id}</span>
                <p className="text-xs text-gray-600 mt-0.5">
                  Ordered by <strong>{currentOrder.customerName}</strong> ({currentOrder.city}) on {currentOrder.date}
                </p>
              </div>

              <div className="sm:text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase shadow-sm ${
                  currentOrder.status === 'Delivered'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : currentOrder.status === 'Cancelled'
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  Status: {currentOrder.status}
                </span>
                <span className="text-base font-black text-emerald-900 block mt-1 font-mono">
                  Grand Total: {formatPrice(currentOrder.totalAmount)}
                </span>
              </div>
            </div>

            {/* Stepped Progress Timeline */}
            <div className="relative pl-8 sm:pl-10 space-y-7 before:absolute before:left-4 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-emerald-200">
              {steps.map((st) => {
                const status = getStepStatus(st.key, currentOrder.status);
                const StepIcon = st.icon;

                let badgeColor = 'bg-gray-100 text-gray-400 border-gray-200';
                let textClass = 'text-gray-400';

                if (status === 'completed') {
                  badgeColor = 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20';
                  textClass = 'text-gray-900 font-bold';
                } else if (status === 'current') {
                  badgeColor = 'bg-amber-400 text-emerald-950 border-amber-300 ring-4 ring-amber-200 animate-pulse';
                  textClass = 'text-emerald-950 font-black';
                }

                return (
                  <div key={st.key} className="relative flex items-start gap-4">
                    <div className={`-ml-8 sm:-ml-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${badgeColor}`}>
                      <StepIcon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 -mt-0.5">
                      <h4 className={`text-sm ${textClass}`}>
                        {st.label}
                        {status === 'current' && (
                          <span className="ml-2 text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold border border-amber-300">
                            Live Stage
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Shipping & Delivery Info Details */}
            <div className="bg-emerald-50/60 border border-emerald-200/80 p-4 rounded-2xl text-xs space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-800 flex-shrink-0 mt-0.5" />
                <span><strong>Destination:</strong> {currentOrder.address}, {currentOrder.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                <span><strong>Delivery ETA:</strong> {currentOrder.deliverySlot || '24-48 Hours'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-800 flex-shrink-0" />
                <span><strong>Courier Provider:</strong> {currentOrder.courier || 'Khandani Express'} (Tracking ID: {currentOrder.trackingNumber || currentOrder.trackingId})</span>
              </div>
            </div>

            {/* WhatsApp Rider / Support Help */}
            <div className="pt-2">
              <a
                href={generateWhatsAppLink(`Assalam-o-Alaikum! Please give me an update on my Khandani Nimco Order: *${currentOrder.id}* (Tracking: ${currentOrder.trackingNumber || currentOrder.id}, Customer: ${currentOrder.customerName}).`)}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Contact Dispatch Rider / Helpline on WhatsApp</span>
              </a>
            </div>

          </div>
        ) : (
          <div className="bg-white p-12 text-center text-gray-500 rounded-3xl border border-gray-200">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-xs">Enter your Order ID above to see live tracking status.</p>
          </div>
        )}

      </div>
    </div>
  );
};
