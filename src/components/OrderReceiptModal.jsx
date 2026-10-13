import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, ShieldCheck, PhoneCall, MapPin, Calendar } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from './BrandLogo';

export const OrderReceiptModal = () => {
  const { receiptModalOrder, setReceiptModalOrder, formatPrice, whatsappNumber, siteConfig } = useStore();

  if (!receiptModalOrder) return null;

  const order = receiptModalOrder;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-white text-[#311A0A] rounded-2xl overflow-hidden shadow-2xl my-6 flex flex-col border border-[#D3C6B4]"
        >
          {/* Top Control Bar (Hidden during print) */}
          <div className="print:hidden p-4 bg-[#1C0A02] text-[#F9F3EC] flex items-center justify-between border-b border-[#311A0A]">
            <div className="flex items-center gap-2">
              <span className="p-1 px-2 bg-[#ECB85A] text-[#1C0A02] rounded-md font-bold text-xs">
                RECEIPT
              </span>
              <span className="text-xs font-semibold text-[#F0E3D1]">
                Official {siteConfig?.storeName || 'Khandani Nimco'} Order Invoice
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="bg-[#ECB85A] hover:bg-[#DD8F25] text-[#1C0A02] font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={() => setReceiptModalOrder(null)}
                className="p-1.5 text-[#F0E3D1] hover:text-white bg-[#311A0A] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Invoice Container */}
          <div id="printable-receipt" className="p-6 sm:p-8 space-y-6 text-sm bg-white">
            
            {/* Invoice Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#D3C6B4] pb-6 gap-4">
              <div>
                <BrandLogo size="sm" />
                <p className="text-xs text-[#6A330E] font-semibold mt-2">
                  {siteConfig?.storeTagline || 'Authentic Karachi Nimco & Fresh Spiced Snacks'}
                </p>
                <p className="text-[11px] text-[#544333] mt-0.5">
                  {siteConfig?.storeAddress || 'Burns Road / Saddar Karachi'} • Helpline: {siteConfig?.phoneNumber || `+${whatsappNumber}`}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs uppercase font-bold text-[#6A330E] block tracking-wider">
                  Order Invoice & Tracking
                </span>
                <span className="text-xl font-bold text-[#311A0A] font-mono">
                  {order.id}
                </span>
                <p className="text-xs text-[#544333] mt-0.5 flex items-center sm:justify-end gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#6A330E]" />
                  {order.date}
                </p>
                <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#F0E3D1] text-[#311A0A] text-[11px] font-bold rounded-md">
                  Status: {order.status}
                </span>
              </div>
            </div>

            {/* Billed To / Shipping Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#F9F3EC] border border-[#D3C6B4] text-xs">
              <div>
                <span className="font-bold text-[#6A330E] uppercase tracking-wider block text-[10px] mb-1">
                  Customer Information:
                </span>
                <p className="font-bold text-[#311A0A] text-sm">{order.customerName}</p>
                <p className="text-[#544333] mt-0.5 flex items-center gap-1 font-mono">
                  <PhoneCall className="w-3 h-3 text-[#6A330E]" />
                  {order.phone}
                </p>
                <p className="text-[#544333] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#6A330E]" />
                  {order.address}, {order.city}
                </p>
              </div>

              <div>
                <span className="font-bold text-[#6A330E] uppercase tracking-wider block text-[10px] mb-1">
                  Delivery & Payment Method:
                </span>
                <p className="font-bold text-[#311A0A]">{order.paymentMethod}</p>
                <p className="text-[#544333] mt-0.5">
                  Courier: <strong className="text-[#311A0A]">{order.courier || 'Express Delivery'}</strong>
                </p>
                <p className="text-[#544333] mt-0.5">
                  Tracking Code: <strong className="text-[#311A0A] font-mono font-bold">{order.trackingNumber || order.trackingId || order.id}</strong>
                </p>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#D3C6B4] bg-[#F9F3EC] text-[#311A0A]">
                    <th className="py-2.5 px-3 font-bold uppercase text-[10px]">Item Description</th>
                    <th className="py-2.5 px-3 font-bold uppercase text-[10px] text-center">Pack Size</th>
                    <th className="py-2.5 px-3 font-bold uppercase text-[10px] text-center">Qty</th>
                    <th className="py-2.5 px-3 font-bold uppercase text-[10px] text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D3C6B4]/60">
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#F9F3EC]/50">
                      <td className="py-3 px-3 font-bold text-[#311A0A]">
                        {item.name}
                      </td>
                      <td className="py-3 px-3 text-center text-[#544333] font-medium">
                        {item.weight}
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-[#311A0A]">
                        x{item.quantity}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-[#311A0A] font-mono">
                        {formatPrice(item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Totals Calculation */}
            <div className="border-t border-[#D3C6B4] pt-4 flex justify-end">
              <div className="w-full sm:w-64 space-y-2 text-xs">
                <div className="flex justify-between text-[#544333]">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-[#311A0A]">{formatPrice(order.subtotal || order.totalAmount)}</span>
                </div>

                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount {order.couponCode ? `(${order.couponCode})` : ''}:</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#544333]">
                  <span>Delivery Fee:</span>
                  <span>{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee || 0)}</span>
                </div>

                <div className="border-t border-[#D3C6B4] pt-2 flex justify-between text-base font-black text-[#311A0A] font-mono">
                  <span>Grand Total:</span>
                  <span className="text-[#311A0A]">{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Quality & Food Safety Guarantee */}
            <div className="border-t border-[#D3C6B4] pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#544333] gap-2">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#6A330E]" />
                <span>100% Halal • Nitrogen-Sealed Crispness Guarantee • Made with Pure Edible Oil</span>
              </div>
              <p className="font-bold text-[#311A0A]">
                Shukriya for choosing Khandani Nimco!
              </p>
            </div>

          </div>

          {/* Bottom Actions (Hidden on Print) */}
          <div className="print:hidden p-4 bg-[#F9F3EC] border-t border-[#D3C6B4] flex justify-end gap-3">
            <button
              onClick={() => setReceiptModalOrder(null)}
              className="px-4 py-2 text-xs font-bold text-[#544333] hover:text-[#311A0A] bg-white border border-[#D3C6B4] rounded-lg"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 text-xs font-bold text-[#1C0A02] bg-[#ECB85A] hover:bg-[#DD8F25] rounded-lg shadow-sm flex items-center gap-1.5"
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
