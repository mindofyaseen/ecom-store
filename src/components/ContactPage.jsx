import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const ContactPage = () => {
  const { whatsappNumber, generateWhatsAppLink } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: 'Karachi',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;
    setSubmitted(true);
    setForm({ name: '', phone: '', city: 'Karachi', subject: 'General Inquiry', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#fbf8f2] py-12 text-[#2b1810] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="bg-[#f5ece0] text-[#78350f] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 border border-[#d8c3ad]">
            <Sparkles className="w-3.5 h-3.5 text-[#e5a842]" />
            Hum Aapki Khidmat Mein Hazir Hain
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#200e08] font-serif">
            Contact Khandani Nimco Store
          </h1>
          <p className="text-xs sm:text-sm text-[#715442] max-w-xl mx-auto">
            Shaadi, bulk gifting, corporate boxes, ya live delivery tracking ke silsile mein hamare Burns Road Karachi head office se rabta karein.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Outlet Info Column */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white border border-[#eaddcb] p-6 rounded-3xl space-y-4 shadow-sm">
              <h3 className="text-base font-black text-[#200e08] font-serif">
                Khandani Nimco Central Outlets:
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#faf5ec] border border-[#eaddcb] flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#78350f] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#200e08] block text-xs">Flagship Outlet - Burns Road</strong>
                    <span className="text-[#715442]">Shop #14, Heritage Food Street, Burns Road, Saddar, Karachi</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#faf5ec] border border-[#eaddcb] flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#78350f] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#200e08] block text-xs">Bohri Bazaar Saddar</strong>
                    <span className="text-[#715442]">Shop #4, Main Bohri Bazaar, Saddar Town, Karachi</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#faf5ec] border border-[#eaddcb] flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#78350f] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#200e08] block text-xs">PECHS Tariq Road Branch</strong>
                    <span className="text-[#715442]">Block 2 Main Commercial Boulevard, PECHS, Karachi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Connect Card */}
            <div className="bg-[#1c0f0a] text-white p-6 rounded-3xl space-y-3 shadow-xl border-2 border-[#c8913c]/40">
              <h3 className="font-black text-sm text-[#e5a842] font-serif">
                Instant WhatsApp Helpline
              </h3>
              <p className="text-xs text-[#ecd8c3]/90 leading-relaxed font-normal">
                Hamari customer care team 5 minute ke andar WhatsApp par foran jawab deti hai.
              </p>
              <a
                href={generateWhatsAppLink("Assalam-o-Alaikum! Mujhe Khandani Nimco ke bare mein maloomat chahiye.")}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 text-center"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp (+{whatsappNumber})</span>
              </a>
            </div>

          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white border border-[#eaddcb] p-6 sm:p-8 rounded-3xl shadow-sm space-y-5">
            
            <div>
              <h3 className="text-lg font-black text-[#200e08] font-serif">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#715442]">
                Apna paigham darj karein, hamari management team foran rabta karegi.
              </p>
            </div>

            {submitted && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl flex items-center gap-2 text-xs font-bold border border-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Shukriya! Aapka message receive ho chuka hai. Hamari team foran rabta karegi.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#200e08] block mb-1">Your Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Asad Siddiqui"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#faf5ec] border border-[#eaddcb] rounded-xl p-3 text-xs text-[#200e08] focus:outline-none focus:ring-1 focus:ring-[#c8913c]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#200e08] block mb-1">Phone / WhatsApp *</label>
                  <input
                    required
                    type="tel"
                    placeholder="0300 1234567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#faf5ec] border border-[#eaddcb] rounded-xl p-3 text-xs text-[#200e08] focus:outline-none focus:ring-1 focus:ring-[#c8913c]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#200e08] block mb-1">Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-[#faf5ec] border border-[#eaddcb] rounded-xl p-3 text-xs text-[#200e08] focus:outline-none focus:ring-1 focus:ring-[#c8913c]"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Wholesale & Bulk Order">Wholesale & Bulk Order</option>
                  <option value="Export Inquiry">Export Inquiry</option>
                  <option value="Delivery Issue">Delivery Issue</option>
                  <option value="Feedback & Suggestion">Feedback & Suggestion</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#200e08] block mb-1">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Apna sawal ya requirement yahan likhein..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#faf5ec] border border-[#eaddcb] rounded-xl p-3 text-xs text-[#200e08] focus:outline-none focus:ring-1 focus:ring-[#c8913c]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#200e08] hover:bg-[#34180d] text-[#e5a842] font-black px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
