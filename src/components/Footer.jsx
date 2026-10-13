import React from 'react';
import { Phone, MapPin, Mail, MessageCircle, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from './BrandLogo';

export const Footer = () => {
  const { whatsappNumber, navigateTo, openAdminPanel, siteConfig } = useStore();

  const activeWhatsapp = siteConfig?.whatsappNumber || whatsappNumber;
  const storeName = siteConfig?.storeName || 'Khandani Nimco';

  return (
    <footer className="bg-[#1C0A02] text-[#F9F3EC] border-t border-[#311A0A] pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* 4-Column Structured Desktop Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-[#311A0A]">
          
          {/* Column 1: Brand Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <BrandLogo size="footer" variant="badge" />
            <p className="text-xs text-[#F0E3D1]/80 max-w-sm leading-relaxed mt-2">
              {siteConfig?.storeTagline ? `${siteConfig.storeTagline}. ` : ''}
              Authentic Pakistani traditional Nimco and savory snacks prepared with pure spices, heritage recipes, and daily fresh crunch.
            </p>
            <div className="pt-1">
              <button
                onClick={openAdminPanel}
                className="text-[11px] text-[#ECB85A] hover:underline font-semibold"
              >
                🔐 Admin Access & Customizer
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ECB85A] font-serif">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#F0E3D1]/85">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#ECB85A] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#ECB85A] transition-colors">
                  Our Products
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('bulk-orders')} className="hover:text-[#ECB85A] transition-colors">
                  Bulk Orders
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('export')} className="hover:text-[#ECB85A] transition-colors">
                  Export
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#ECB85A] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#ECB85A] transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ECB85A] font-serif">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-xs text-[#F0E3D1]/85">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#ECB85A] shrink-0" />
                <a href={`tel:${siteConfig?.phoneNumber || '+923242478108'}`} className="hover:text-[#ECB85A] font-semibold">
                  {siteConfig?.phoneNumber || '+92 324 2478108'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#ECB85A] shrink-0" />
                <span>{siteConfig?.storeAddress || 'Karachi, Pakistan'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#ECB85A] shrink-0" />
                <a href={`mailto:${siteConfig?.supportEmail || 'info@khandaninimco.pk'}`} className="hover:text-[#ECB85A]">
                  {siteConfig?.supportEmail || 'info@khandaninimco.pk'}
                </a>
              </div>
              
              <div className="pt-2">
                <a
                  href={`https://wa.me/${activeWhatsapp}?text=Assalam-o-Alaikum!%20I%20want%20to%20order%20from%20${encodeURIComponent(storeName)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Follow Us & Proudly Pakistani (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ECB85A] font-serif">
              Follow Us
            </h4>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 text-[#F0E3D1]/90">
              <a href={siteConfig?.socials?.facebook || "#"} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-[#311A0A] hover:bg-[#ECB85A] hover:text-[#1C0A02] flex items-center justify-center transition-colors text-xs font-bold" aria-label="Facebook">
                f
              </a>
              <a href={siteConfig?.socials?.instagram || "#"} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-[#311A0A] hover:bg-[#ECB85A] hover:text-[#1C0A02] flex items-center justify-center transition-colors text-xs font-bold" aria-label="Instagram">
                ig
              </a>
              <a href={siteConfig?.socials?.tiktok || "#"} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-[#311A0A] hover:bg-[#ECB85A] hover:text-[#1C0A02] flex items-center justify-center transition-colors text-xs font-bold" aria-label="TikTok">
                tk
              </a>
              <a href={siteConfig?.socials?.youtube || "#"} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-[#311A0A] hover:bg-[#ECB85A] hover:text-[#1C0A02] flex items-center justify-center transition-colors text-xs font-bold" aria-label="YouTube">
                yt
              </a>
            </div>

            <div className="pt-4 flex items-center gap-1.5 text-xs text-[#ECB85A] font-medium">
              <Heart className="w-3.5 h-3.5 fill-[#ECB85A]" />
              <span>Proudly Pakistani</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F0E3D1]/60 gap-3">
          <p>{siteConfig?.copyrightText || '© 2025 Khandani Nimco & Sweets. All Rights Reserved.'}</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-[#ECB85A] transition-colors">Privacy Policy</button>
            <span>•</span>
            <button className="hover:text-[#ECB85A] transition-colors">Terms & Conditions</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
