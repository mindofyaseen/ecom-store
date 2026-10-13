import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Package, Truck, CheckCircle2, Phone, Mail, Store, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

export const BulkOrdersPage = () => {
  const { whatsappNumber, formatPrice } = useStore();

  const [form, setForm] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    city: 'Karachi',
    orderType: 'Shop Retail / Distributor',
    approxKg: '15-25 KG',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Assalam-o-Alaikum! *Wholesale / Bulk Order Inquiry*\n\n` +
      `*Business/Event:* ${form.businessName || 'Individual'}\n` +
      `*Contact Person:* ${form.contactName}\n` +
      `*Phone:* ${form.phone}\n` +
      `*City:* ${form.city}\n` +
      `*Type:* ${form.orderType}\n` +
      `*Estimated Volume:* ${form.approxKg}\n` +
      `*Requirements/Notes:* ${form.notes || 'Standard Assorted Bulk Packets'}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F9F3EC] text-[#311A0A] min-h-screen py-8 sm:py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
        
        {/* 1. Header Banner */}
        <div className="bg-[#311A0A] rounded-2xl overflow-hidden border border-[#6A330E] text-[#F9F3EC] p-8 sm:p-12 shadow-lg relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[#ECB85A] text-xs font-bold uppercase tracking-[0.2em] block">
                WHOLESALE & BULK SUPPLY
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-serif text-[#F9F3EC] leading-tight">
                Bulk Orders for Shops, Events & Weddings
              </h1>
              <p className="text-[#F0E3D1]/85 text-sm sm:text-base leading-relaxed">
                Supply your shop or delight your wedding guests with freshly fried authentic Karachi Nimco. Special wholesale discount rates on orders starting from 10 KG.
              </p>
              <div className="flex items-center flex-wrap gap-4 pt-2 text-xs font-medium text-[#ECB85A]">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> 100% Nitrogen Fresh Sealed</span>
                <span>•</span>
                <span className="flex items-center gap-1.5"><Truck className="w-4 h-4" /> Nationwide Courier & Cargo Dispatch</span>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 rounded-xl overflow-hidden shadow-inner border border-[#6A330E]">
              <img
                src="/assets/reference/wholesale_food.jpg"
                alt="Wholesale Bulk Nimco Supply"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 2. Bulk Quantity Tiers */}
        <div>
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#311A0A]">
              Special Bulk Tiers & Discounts
            </h2>
            <p className="text-xs sm:text-sm text-[#544333] mt-1">
              Select tier according to your expected batch size
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-[#D3C6B4] rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#6A330E] uppercase tracking-wider block">Small Events</span>
                <h3 className="text-xl font-bold text-[#311A0A] font-serif mt-1">10 - 25 KG</h3>
                <p className="text-xs text-[#544333] mt-2 leading-relaxed">
                  Ideal for family gatherings, dawat, birthdays, and small school/college events.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#F0E3D1]">
                <span className="text-xs font-bold text-emerald-700">12% Wholesale Savings</span>
              </div>
            </div>

            <div className="bg-white border-2 border-[#ECB85A] rounded-xl p-6 shadow-md flex flex-col justify-between relative">
              <span className="absolute -top-3 right-4 bg-[#ECB85A] text-[#1C0A02] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow">
                Most Popular
              </span>
              <div>
                <span className="text-xs font-bold text-[#6A330E] uppercase tracking-wider block">Retailers & Mehndi</span>
                <h3 className="text-xl font-bold text-[#311A0A] font-serif mt-1">26 - 75 KG</h3>
                <p className="text-xs text-[#544333] mt-2 leading-relaxed">
                  Ideal for sweet shops, grocery stores, wedding favor hampers, and corporate gifting.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#F0E3D1]">
                <span className="text-xs font-bold text-emerald-700">20% Wholesale Savings + Free Karachi Delivery</span>
              </div>
            </div>

            <div className="bg-white border border-[#D3C6B4] rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#6A330E] uppercase tracking-wider block">Distributors & Cargo</span>
                <h3 className="text-xl font-bold text-[#311A0A] font-serif mt-1">75+ KG Bulk</h3>
                <p className="text-xs text-[#544333] mt-2 leading-relaxed">
                  Commercial supply with customized branded packaging and direct factory rates.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#F0E3D1]">
                <span className="text-xs font-bold text-emerald-700">Custom B2B Quotation</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Inquiry Form */}
        <div className="bg-white border border-[#D3C6B4] rounded-2xl p-6 sm:p-10 shadow-md">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[#6A330E] text-xs font-bold uppercase tracking-widest block">
                DIRECT INQUIRY
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#311A0A] mt-1">
                Request a Wholesale Quotation
              </h2>
              <p className="text-xs sm:text-sm text-[#544333] mt-1">
                Fill this brief form to instantly receive a discounted wholesale price list on WhatsApp & Email
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#F0E3D1]/60 border border-[#D3C6B4] rounded-xl p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold font-serif text-[#311A0A]">Inquiry Dispatched Successfully!</h3>
                <p className="text-xs sm:text-sm text-[#544333] max-w-md mx-auto">
                  Our wholesale manager is reviewing your volume request and will connect with you with samples and custom pricing.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Instant WhatsApp Follow-up</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#311A0A] mb-1">
                      Business or Event Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.businessName}
                      onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                      placeholder="e.g. Al-Madina Sweets or Tariq Family Wedding"
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#311A0A] mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      placeholder="e.g. Muhammad Bilal"
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#311A0A] mb-1">
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0321-XXXXXXX"
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#311A0A] mb-1">
                      Destination City *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Karachi, Lahore, etc."
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#311A0A] mb-1">
                      Estimated Quantity *
                    </label>
                    <select
                      value={form.approxKg}
                      onChange={(e) => setForm({ ...form, approxKg: e.target.value })}
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                    >
                      <option value="10-25 KG">10 - 25 KG (Small Batch)</option>
                      <option value="26-50 KG">26 - 50 KG (Event / Store)</option>
                      <option value="51-100 KG">51 - 100 KG (Commercial)</option>
                      <option value="100+ KG">100+ KG (Distributor)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#311A0A] mb-1">
                    Specific Nimco Varieties & Extra Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="e.g. 10kg Mix Nimco, 5kg Mota Gathiya, 5kg Dal Mung, packed in 250g custom foil pouches..."
                    className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="submit"
                    className="bg-[#ECB85A] hover:bg-[#DD8F25] text-[#1C0A02] font-black text-xs sm:text-sm px-8 py-3 rounded-lg shadow-md transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                  >
                    <Package className="w-4 h-4" />
                    <span>Submit Wholesale Inquiry via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
