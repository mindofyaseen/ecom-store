import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Globe, Plane, Ship, ShieldCheck, CheckCircle2, Phone, Mail, Award, FileText } from 'lucide-react';

export const ExportPage = () => {
  const { whatsappNumber } = useStore();

  const [form, setForm] = useState({
    country: 'United Kingdom',
    cityPort: '',
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    shipmentMode: 'Air Cargo (Fast Delivery)',
    estimatedVolume: '50 - 150 KG',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Assalam-o-Alaikum! *International Export Inquiry - Khandani Nimco*\n\n` +
      `*Country:* ${form.country}\n` +
      `*Port/City:* ${form.cityPort}\n` +
      `*Company/Buyer:* ${form.companyName || 'Individual / Importer'}\n` +
      `*Contact:* ${form.contactName}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Email:* ${form.email}\n` +
      `*Mode:* ${form.shipmentMode}\n` +
      `*Estimated Volume:* ${form.estimatedVolume}\n` +
      `*Details:* ${form.notes || 'Full product catalog & export quote needed'}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  const exportDestinations = [
    { country: "United Kingdom", desc: "London, Birmingham, Manchester, Bradford" },
    { country: "United States", desc: "Texas, New York, California, Illinois" },
    { country: "UAE & Saudi Arabia", desc: "Dubai, Sharjah, Riyadh, Jeddah" },
    { country: "Canada", desc: "Toronto, Mississauga, Calgary, Vancouver" },
    { country: "European Union", desc: "Germany, Norway, Sweden, Netherlands" },
    { country: "Australia", desc: "Sydney, Melbourne, Brisbane, Perth" }
  ];

  return (
    <div className="bg-[#F9F3EC] text-[#311A0A] min-h-screen py-8 sm:py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
        
        {/* 1. Hero Banner */}
        <div className="bg-[#101e2c] rounded-2xl overflow-hidden border border-[#1e344a] text-[#F9F3EC] p-8 sm:p-12 shadow-lg relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[#ECB85A] text-xs font-bold uppercase tracking-[0.2em] block">
                TAKING PAKISTANI NIMCO
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-serif text-[#F9F3EC] leading-tight">
                Beyond Borders: Worldwide Export
              </h1>
              <p className="text-[#F0E3D1]/85 text-sm sm:text-base leading-relaxed">
                Take the true Burns Road Karachi taste to international markets. We handle customs-compliant nitrogen vacuum packing, phytosanitary certifications, and expedited air/sea logistics.
              </p>
              <div className="flex items-center flex-wrap gap-4 pt-2 text-xs font-medium text-[#ECB85A]">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> 12-Month Extended Shelf Life</span>
                <span>•</span>
                <span className="flex items-center gap-1.5"><Plane className="w-4 h-4" /> Express Air Cargo & FCL/LCL Sea Freight</span>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 rounded-xl overflow-hidden shadow-inner border border-[#1e344a]">
              <img
                src="/assets/reference/export_ship.jpg"
                alt="International Export of Nimco via Cargo Ship"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 2. Key Export Quality Standards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-[#D3C6B4] rounded-xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#F0E3D1] flex items-center justify-center text-[#311A0A] mb-3">
              <ShieldCheck className="w-5 h-5 text-[#311A0A]" />
            </div>
            <h3 className="text-base font-bold text-[#311A0A] font-serif">Export-Grade Barrier Foil</h3>
            <p className="text-xs text-[#544333] mt-1.5 leading-relaxed">
              Multi-layer metallic barrier pouches with 99.9% nitrogen flush guarantee 100% crispy crunch up to 12 months.
            </p>
          </div>

          <div className="bg-white border border-[#D3C6B4] rounded-xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#F0E3D1] flex items-center justify-center text-[#311A0A] mb-3">
              <FileText className="w-5 h-5 text-[#311A0A]" />
            </div>
            <h3 className="text-base font-bold text-[#311A0A] font-serif">Customs & Lab Documentation</h3>
            <p className="text-xs text-[#544333] mt-1.5 leading-relaxed">
              Complete certificates of origin, nutrition facts analysis, Halal compliance, and phytosanitary clearance included.
            </p>
          </div>

          <div className="bg-white border border-[#D3C6B4] rounded-xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#F0E3D1] flex items-center justify-center text-[#311A0A] mb-3">
              <Globe className="w-5 h-5 text-[#311A0A]" />
            </div>
            <h3 className="text-base font-bold text-[#311A0A] font-serif">Door-to-Door & Port Clearance</h3>
            <p className="text-xs text-[#544333] mt-1.5 leading-relaxed">
              Direct delivery to your warehouse in UK, US, Middle East, and Canada via accredited international freight partners.
            </p>
          </div>
        </div>

        {/* 3. Major International Hubs */}
        <div className="bg-white border border-[#D3C6B4] rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#311A0A] text-center mb-6">
            Global Destinations Frequently Served
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {exportDestinations.map((dest, i) => (
              <div key={i} className="p-3 bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg">
                <span className="text-xs font-bold text-[#311A0A] block">{dest.country}</span>
                <span className="text-[11px] text-[#6A330E] block mt-0.5">{dest.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Export Inquiry Form */}
        <div className="bg-white border border-[#D3C6B4] rounded-2xl p-6 sm:p-10 shadow-md">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[#6A330E] text-xs font-bold uppercase tracking-widest block">
                GLOBAL INQUIRY
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#311A0A] mt-1">
                Contact For Export Quotation
              </h2>
              <p className="text-xs sm:text-sm text-[#544333] mt-1">
                Connect with our international export desk for HS Code documentation and FOB/CIF freight rates
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#F0E3D1]/60 border border-[#D3C6B4] rounded-xl p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold font-serif text-[#311A0A]">Export Inquiry Received!</h3>
                <p className="text-xs sm:text-sm text-[#544333] max-w-md mx-auto">
                  Our export coordinator will respond within 24 hours with product sample kits and landed freight cost estimates.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp Export Desk</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#311A0A] mb-1">
                      Destination Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      placeholder="e.g. United Kingdom, USA, UAE..."
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#311A0A] mb-1">
                      City / Airport / Discharge Port *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.cityPort}
                      onChange={(e) => setForm({ ...form, cityPort: e.target.value })}
                      placeholder="e.g. London Heathrow or Jebel Ali"
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#311A0A] mb-1">
                      Company / Importer Name
                    </label>
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      placeholder="e.g. Desi Mart UK Ltd."
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
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#311A0A] mb-1">
                      WhatsApp with Country Code *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+44 7XXX XXXXXX"
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#311A0A] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="buyer@domain.com"
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#311A0A] mb-1">
                      Preferred Shipping Mode *
                    </label>
                    <select
                      value={form.shipmentMode}
                      onChange={(e) => setForm({ ...form, shipmentMode: e.target.value })}
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                    >
                      <option value="Air Cargo (Express 3-5 Days)">Air Cargo (Express 3-5 Days)</option>
                      <option value="Sea Freight LCL (Pallets)">Sea Freight LCL (Pallets)</option>
                      <option value="Sea Freight 20ft FCL Container">Sea Freight 20ft FCL Container</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#311A0A] mb-1">
                    Requirements / Inquired Products
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Specific items: Mix Nimco, Bikaneri Bhujia, Dal Mung, custom white-label packaging..."
                    className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="submit"
                    className="bg-[#101e2c] border border-[#ECB85A] text-[#ECB85A] hover:bg-[#ECB85A] hover:text-[#101e2c] font-black text-xs sm:text-sm px-8 py-3 rounded-lg shadow-md transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Submit Export Inquiry via WhatsApp</span>
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
