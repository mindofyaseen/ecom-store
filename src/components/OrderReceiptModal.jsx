import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, CheckCircle, ShieldCheck, PhoneCall, MapPin, Calendar, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderReceiptModal = () => {
  const { receiptModalOrder, setReceiptModalOrder, formatPrice, whatsappNumber } = useStore();

  if (!receiptModalOrder) return null;

  const order = receiptModalOrder;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-white text-gray-900 rounded-3xl overflow-hidden shadow-2xl my-6 flex flex-col"
        >
          {/* Top Control Bar (Hidden during print) */}
          <div className="print:hidden p-4 bg-[#042f2e] text-emerald-50 flex items-center justify-between border-b border-emerald-800">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-400 text-emerald-950 rounded-lg font-black text-xs">
                RECEIPT
              </span>
              <span className="text-xs font-bold text-amber-200">
                Official Khandani Nimco Order Invoice
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={() => setReceiptModalOrder(null)}
                className="p-1.5 text-emerald-300 hover:text-white bg-emerald-900 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Invoice Container */}
          <div id="printable-receipt" className="p-6 sm:p-8 space-y-6 text-sm bg-white">
            
            {/* Invoice Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-emerald-900/20 pb-6 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#064e3b] flex items-center justify-center text-amber-400 font-black text-lg font-serif">
                    KN
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-emerald-950 tracking-tight font-serif">
                      KHANDANI NIMCO
                    </h1>
                  </div>
                </div>
                <p className="text-xs text-emerald-800 font-semibold mt-1">
                  Authentic Karachi Nimco & Fresh Spiced Snacks
                </p>
                <p className="text-[11px] text-gray-500 mt-1">
                  Burns Road / Saddar Karachi • Helpline: +{whatsappNumber}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs uppercase font-extrabold text-emerald-900 block tracking-wider">
                  Order Invoice & Tracking
                </span>
                <span className="text-xl font-black text-emerald-950 font-mono">
                  {order.id}
                </span>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center sm:justify-end gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  {order.date}
                </p>
                <span className="inline-block mt-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full">
                  Status: {order.status}
                </span>
              </div>
            </div>

            {/* Billed To / Shipping Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs">
              <div>
                <span className="font-bold text-emerald-900 uppercase tracking-wider block text-[10px] mb-1">
                  Customer Information:
                </span>
                <p className="font-extrabold text-gray-900 text-sm">{order.customerName}</p>
                <p className="text-gray-700 mt-0.5 flex items-center gap-1 font-mono">
                  <PhoneCall className="w-3 h-3 text-emerald-800" />
                  {order.phone}
                </p>
                <p className="text-gray-700 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-800" />
                  {order.address}, {order.city}
                </p>
              </div>

              <div>
                <span className="font-bold text-emerald-900 uppercase tracking-wider block text-[10px] mb-1">
                  Delivery & Payment Method:
                </span>
                <p className="font-extrabold text-gray-900">{order.paymentMethod}</p>
                <p className="text-gray-700 mt-0.5">
                  Courier: <strong className="text-gray-900">{order.courier || 'Express Delivery'}</strong>
                </p>
                <p className="text-gray-700 mt-0.5">
                  Special Tracking Code: <strong className="text-emerald-900 font-mono font-bold">{order.trackingNumber || order.trackingId || order.id}</strong>
                </p>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300 bg-gray-50 text-gray-700">
                    <th className="py-2.5 px-3 font-bold uppercase text-[10px]">Item Description</th>
                    <th className="py-2.5 px-3 font-bold uppercase text-[10px] text-center">Pack Size</th>
                    <th className="py-2.5 px-3 font-bold uppercase text-[10px] text-center">Qty</th>
                    <th className="py-2.5 px-3 font-bold uppercase text-[10px] text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50/40">
                      <td className="py-3 px-3 font-bold text-gray-900">
                        {item.name}
                      </td>
                      <td className="py-3 px-3 text-center text-gray-600 font-medium">
                        {item.weight}
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-gray-900">
                        x{item.quantity}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-gray-900 font-mono">
                        {formatPrice(item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Totals Calculation */}
            <div className="border-t-2 border-gray-200 pt-4 flex justify-end">
              <div className="w-full sm:w-64 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{formatPrice(order.subtotal || order.totalAmount)}</span>
                </div>

                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount {order.couponCode ? `(${order.couponCode})` : ''}:</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Shipping / Courier Fee:</span>
                  <span>{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee || 0)}</span>
                </div>

                <div className="border-t border-gray-300 pt-2 flex justify-between text-base font-black text-emerald-950 font-mono">
                  <span>Grand Total:</span>
                  <span className="text-emerald-900">{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Quality & Food Safety Guarantee */}
            <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-2">
              <div className="flex items-center gap-1.5 text-emerald-900 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Halal • Nitrogen-Sealed Crispness Guarantee • Made with Pure Edible Oil</span>
              </div>
              <p className="font-semibold text-emerald-900">
                Shukriya for choosing Khandani Nimco!
              </p>
            </div>

          </div>

          {/* Bottom Actions (Hidden on Print) */}
          <div className="print:hidden p-4 bg-gray-100 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={() => setReceiptModalOrder(null)}
              className="px-4 py-2 text-xs font-bold text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-xl"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 text-xs font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
