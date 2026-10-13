import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Bike, Package, CheckCircle2, Truck, MapPin, Clock, Phone, AlertCircle, Copy, Check } from 'lucide-react';

export const TrackOrderPage = () => {
  const { orders, getOrderById, formatPrice, whatsappNumber } = useStore();
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
    navigator.clipboard?.writeText(code);
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
    <div className="min-h-screen bg-[#F9F3EC] py-10 sm:py-14 text-[#311A0A] font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[#6A330E] text-xs font-bold uppercase tracking-[0.2em] block font-serif">
            LIVE PARCEL TRACKING
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif text-[#311A0A]">
            Track Your Nimco Order
          </h1>
          <p className="text-xs sm:text-sm text-[#544333] max-w-md mx-auto">
            Apna special order number (jaise KN-98214) darj karein aur apne parcel ka live status check karein.
          </p>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Order Code (e.g. KN-98214)"
              className="w-full pl-9 pr-4 py-3 bg-white border border-[#D3C6B4] rounded-lg text-xs sm:text-sm text-[#311A0A] font-mono uppercase focus:outline-none focus:border-[#311A0A]"
            />
            <Search className="w-4 h-4 text-[#6A330E] absolute left-3 top-3.5" />
          </div>
          <button
            type="submit"
            className="bg-[#311A0A] hover:bg-[#1C0A02] text-[#F9F3EC] font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-sm transition-colors"
          >
            Track Status
          </button>
        </form>

        {errorMsg && (
          <div className="max-w-xl mx-auto p-3 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Order Details Display Card */}
        {currentOrder && (
          <div className="bg-white border border-[#D3C6B4] rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
            
            {/* Top Order Information */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-[#D3C6B4] gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A330E] block">
                  Order Tracking Reference
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <h2 className="text-xl sm:text-2xl font-bold font-mono text-[#311A0A]">
                    {currentOrder.trackingNumber || currentOrder.id}
                  </h2>
                  <button
                    onClick={() => copyTracking(currentOrder.trackingNumber || currentOrder.id)}
                    className="p-1.5 hover:bg-[#F9F3EC] rounded-lg text-[#544333] hover:text-[#311A0A] border border-[#D3C6B4] transition-colors"
                    title="Copy Code"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-[#544333] mt-1">
                  Recipient: <strong className="text-[#311A0A]">{currentOrder.customerName}</strong> ({currentOrder.city})
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="inline-block px-3 py-1 bg-[#F0E3D1] text-[#311A0A] text-xs font-bold rounded-full">
                  Status: {currentOrder.status}
                </span>
                <p className="text-xs text-[#544333] mt-1">
                  Estimated Delivery: <strong className="text-[#311A0A]">{currentOrder.deliverySlot || '24-48 Hours'}</strong>
                </p>
              </div>
            </div>

            {/* Timeline Progress */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A330E] font-serif">
                Dispatch Milestones
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D3C6B4]">
                {steps.map((step, idx) => {
                  const status = getStepStatus(step.key, currentOrder.status);
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Node Circle */}
                      <div
                        className={`absolute -left-6 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                          status === 'completed'
                            ? 'bg-[#311A0A] text-[#ECB85A] shadow-sm'
                            : status === 'current'
                            ? 'bg-[#ECB85A] text-[#1C0A02] ring-4 ring-[#ECB85A]/30 shadow-md scale-110'
                            : 'bg-[#F9F3EC] text-[#544333]/50 border border-[#D3C6B4]'
                        }`}
                      >
                        <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>

                      {/* Content */}
                      <div className="pl-4 sm:pl-3">
                        <h4
                          className={`text-xs sm:text-sm font-bold ${
                            status === 'current'
                              ? 'text-[#311A0A]'
                              : status === 'completed'
                              ? 'text-[#311A0A]'
                              : 'text-[#544333]/60'
                          }`}
                        >
                          {step.label}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-[#544333] mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items in this Order */}
            <div className="pt-4 border-t border-[#D3C6B4] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6A330E] font-serif">
                Snacks in this Package
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentOrder.items?.map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-[#311A0A] block">{item.name}</span>
                      <span className="text-[11px] text-[#544333]">{item.weight} x{item.quantity}</span>
                    </div>
                    <span className="font-bold text-[#311A0A]">{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Helpline Assistance */}
            <div className="p-4 rounded-xl bg-[#F0E3D1]/50 border border-[#D3C6B4] flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#6A330E]" />
                <span className="text-[#544333]">Rider ya courier details ke liye helpline se rabta karein:</span>
              </div>
              <a
                href={`https://wa.me/${whatsappNumber}?text=Assalam-o-Alaikum!%20I%20am%20tracking%20order%20${currentOrder.id}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                WhatsApp Support Desk
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
