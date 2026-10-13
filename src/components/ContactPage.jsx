import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Phone, Mail, Send, CheckCircle2, Clock, MessageCircle } from 'lucide-react';

export const ContactPage = () => {
  const { whatsappNumber, siteConfig } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: 'Karachi',
    subject: 'General Inquiry',
    message: ''
  });

  const activeWhatsapp = siteConfig?.whatsappNumber || whatsappNumber;
  const storeName = siteConfig?.storeName || 'Khandani Nimco';
  const displayPhone = siteConfig?.phoneNumber || '+92 324 2478108';
  const displayEmail = siteConfig?.supportEmail || 'info@khandaninimco.pk';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;
    
    const text = encodeURIComponent(
      `Assalam-o-Alaikum! *Contact Form Message for ${storeName}*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*City:* ${form.city}\n` +
      `*Subject:* ${form.subject}\n` +
      `*Message:* ${form.message}`
    );
    window.open(`https://wa.me/${activeWhatsapp}?text=${text}`, '_blank');
    
    setSubmitted(true);
    setForm({ name: '', phone: '', city: 'Karachi', subject: 'General Inquiry', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F9F3EC] py-10 sm:py-14 text-[#311A0A] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[#6A330E] text-xs font-bold uppercase tracking-[0.2em] block font-serif">
            WE ARE AT YOUR SERVICE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#311A0A] font-serif">
            Contact {storeName}
          </h1>
          <p className="text-xs sm:text-sm text-[#544333] max-w-xl mx-auto leading-relaxed">
            For retail queries, order assistance, bulk party hampers, or export orders, our central Karachi office is always ready to assist.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Outlets & Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="bg-white border border-[#D3C6B4] p-6 rounded-xl space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-[#311A0A] font-serif">
                Central Locations:
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-lg bg-[#F9F3EC] border border-[#D3C6B4] flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#6A330E] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#311A0A] block text-xs">Flagship Outlet</strong>
                    <span className="text-[#544333]">{siteConfig?.storeAddress || 'Burns Road / Saddar, Karachi, Pakistan'}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F9F3EC] border border-[#D3C6B4] flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#6A330E] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#311A0A] block text-xs">Dispatch & Fulfillment Center</strong>
                    <span className="text-[#544333]">Plot 42-B, Industrial Area / Central Cargo Hub, Karachi</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#D3C6B4]/60 space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-[#544333]">
                  <Phone className="w-4 h-4 text-[#6A330E]" />
                  <span>Call & WhatsApp: <strong className="text-[#311A0A]">{displayPhone}</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-[#544333]">
                  <Mail className="w-4 h-4 text-[#6A330E]" />
                  <span>Email: <strong className="text-[#311A0A]">{displayEmail}</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-[#544333]">
                  <Clock className="w-4 h-4 text-[#6A330E]" />
                  <span>Hours: Mon - Sun, 9:00 AM - 11:00 PM</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Quick Card */}
            <div className="bg-[#311A0A] text-[#F9F3EC] p-6 rounded-xl border border-[#6A330E] shadow-sm space-y-3">
              <h4 className="font-bold font-serif text-sm text-[#ECB85A]">
                Need Urgent Delivery or Bulk Order?
              </h4>
              <p className="text-xs text-[#F0E3D1]/85 leading-relaxed">
                Chat directly with our team on WhatsApp for immediate order confirmation, live order tracking, or customized gift packaging.
              </p>
              <a
                href={`https://wa.me/${activeWhatsapp}?text=Assalam-o-Alaikum!%20I%20have%20an%20urgent%20query%20for%20${encodeURIComponent(storeName)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp ({displayPhone})</span>
              </a>
            </div>

          </div>

          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#D3C6B4] p-6 sm:p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold font-serif text-[#311A0A] mb-1">
              Send Us a Message
            </h3>
            <p className="text-xs text-[#544333] mb-6">
              Fill in your inquiry details below and our customer support team will get back to you promptly.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your message has been dispatched to our support team on WhatsApp!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#311A0A] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Asad Khan"
                    className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#311A0A] mb-1">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0324-XXXXXXX"
                    className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#311A0A] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Karachi, Lahore, Islamabad..."
                    className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#311A0A] mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Tracking">Order Tracking & Status</option>
                    <option value="Bulk / Party Orders">Bulk / Party Orders</option>
                    <option value="Export Question">Export Question</option>
                    <option value="Feedback / Quality">Feedback & Suggestion</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#311A0A] mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we assist you today? Please mention your order number or product requirements..."
                  className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg p-2.5 text-xs text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-[#ECB85A] hover:bg-[#DD8F25] text-[#1C0A02] font-black text-xs px-6 py-3 rounded-lg shadow transition-all inline-flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4 text-[#1C0A02]" />
                  <span>Send Message via WhatsApp</span>
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
