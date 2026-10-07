import React from 'react';
import { Crown, Phone, MapPin, Mail, MessageCircle, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer = () => {
  const { whatsappNumber, setCurrentPage, setViewMode } = useStore();

  const handleBulkScroll = () => {
    setCurrentPage('home');
    setTimeout(() => {
      document.getElementById('bulk-orders-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleExportScroll = () => {
    setCurrentPage('home');
    setTimeout(() => {
      document.getElementById('export-orders-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <footer className="bg-[#1c0f0a] text-[#eedfc8] border-t-2 border-[#3b1f13] pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Logo Badge */}
          <div className="space-y-4">
            <div className="flex flex-col items-start select-none">
              <div className="relative bg-[#241108] border-2 border-[#c8913c] px-4 py-2 rounded-2xl shadow-md flex flex-col items-center text-center">
                <Crown className="w-4 h-4 text-[#e5a842] fill-[#e5a842] -mb-0.5" />
                <span className="text-lg font-black tracking-tight text-[#fdf8f2] font-serif leading-tight">
                  Khandani
                </span>
                <span className="text-base font-black tracking-tight text-[#f4caa0] font-serif -mt-1">
                  Nimco
                </span>
              </div>
              <div className="-mt-1.5 ml-2 bg-gradient-to-r from-[#d97706] via-[#e5a842] to-[#d97706] text-[#200e08] px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow border border-[#b45309]/30">
                Asli Swad, Khandani Andaaz
              </div>
            </div>

            <p className="text-xs text-[#d3beab] leading-relaxed pt-1">
              Pakistan's authentic taste of traditional snacks, prepared with pure ingredients, secret family spices, and daily fresh crunch.
            </p>

            <button
              onClick={() => setViewMode('admin')}
              className="text-[11px] text-[#e5a842] hover:underline font-bold block pt-1"
            >
              🔐 Store Admin Panel
            </button>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#e5a842] font-serif">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#ecd8c3]">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop')} className="hover:text-white transition-colors">
                  Our Products
                </button>
              </li>
              <li>
                <button onClick={handleBulkScroll} className="hover:text-white transition-colors">
                  Bulk Orders
                </button>
              </li>
              <li>
                <button onClick={handleExportScroll} className="hover:text-white transition-colors">
                  Export
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#e5a842] font-serif">
              Contact Us
            </h4>
            <div className="space-y-2 text-xs text-[#ecd8c3]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#e5a842]" />
                <span>+{whatsappNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#e5a842]" />
                <span>Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#e5a842]" />
                <span>info@khandanimco.pk</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white text-xs font-bold px-4 py-2 rounded-xl shadow mt-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Col 4: Follow Us & Proudly Pakistani */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#e5a842] font-serif">
              Follow Us
            </h4>
            
            {/* Social Icons Strip */}
            <div className="flex items-center gap-3 pt-1">
              <a href="#" className="w-8 h-8 rounded-full bg-[#2a140a] border border-[#a16207]/40 text-[#eedfc8] hover:text-[#e5a842] flex items-center justify-center text-xs font-bold transition-colors">
                f
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#2a140a] border border-[#a16207]/40 text-[#eedfc8] hover:text-[#e5a842] flex items-center justify-center text-xs font-bold transition-colors">
                ig
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#2a140a] border border-[#a16207]/40 text-[#eedfc8] hover:text-[#e5a842] flex items-center justify-center text-xs font-bold transition-colors">
                tk
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#2a140a] border border-[#a16207]/40 text-[#eedfc8] hover:text-[#e5a842] flex items-center justify-center text-xs font-bold transition-colors">
                yt
              </a>
            </div>

            <div className="pt-4 flex items-center gap-1.5 text-xs text-[#ecd8c3] font-semibold">
              <span>❤️ Proudly Pakistani</span>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Copyright & Terms */}
        <div className="pt-8 border-t border-[#341a0e] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#b89f8b]">
          <p>© 2026 Khandani Nimco. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
