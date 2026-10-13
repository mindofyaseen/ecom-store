import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Palette,
  Image,
  Type,
  Layout,
  CreditCard,
  Truck,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Globe,
  Sliders,
  Eye,
  Megaphone,
  Gift,
  Store,
  ShieldCheck,
  Package,
  Layers,
  Share2
} from 'lucide-react';

export const SiteCustomizerTab = () => {
  const { siteConfig, updateSiteConfig, resetSiteConfig, setViewMode } = useStore();
  const [activeSubTab, setActiveSubTab] = useState('branding');
  const [saveToast, setSaveToast] = useState(false);

  const showSavedIndicator = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleChange = (field, value) => {
    updateSiteConfig({ [field]: value });
    showSavedIndicator();
  };

  const handleNestedChange = (parent, field, value) => {
    updateSiteConfig({
      [parent]: {
        ...siteConfig[parent],
        [field]: value
      }
    });
    showSavedIndicator();
  };

  const handleBenefitChange = (index, field, value) => {
    const updated = [...(siteConfig.benefits || [])];
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: value };
      updateSiteConfig({ benefits: updated });
      showSavedIndicator();
    }
  };

  const handleWhyChooseItemChange = (index, value) => {
    const updated = [...(siteConfig.whyChooseUsItems || [])];
    if (updated[index]) {
      updated[index] = { ...updated[index], title: value };
      updateSiteConfig({ whyChooseUsItems: updated });
      showSavedIndicator();
    }
  };

  const handlePaymentChange = (method, field, value) => {
    const updatedPayments = {
      ...(siteConfig.payments || {}),
      [method]: {
        ...(siteConfig.payments?.[method] || {}),
        [field]: value
      }
    };
    updateSiteConfig({ payments: updatedPayments });
    showSavedIndicator();
  };

  const subTabs = [
    { id: 'branding', label: '👑 Brand & Logo', icon: Sparkles },
    { id: 'announcement', label: '📢 Announcement Bar', icon: Megaphone },
    { id: 'hero', label: '⚡ Hero Section', icon: Layout },
    { id: 'benefits', label: '✨ Benefits Strip', icon: Layers },
    { id: 'promotions', label: '📦 Promo Banners', icon: Package },
    { id: 'story', label: '🌿 Story & Heritage', icon: Type },
    { id: 'payments', label: '💳 Payment Methods', icon: CreditCard },
    { id: 'logistics', label: '🚚 Delivery & Limits', icon: Truck },
    { id: 'footer', label: '🌐 Footer & Socials', icon: Share2 },
  ];

  const logoPresets = [
    {
      name: '👑 Royal Gold Crown Badge (New)',
      url: '/assets/brand/khandani_logo_badge.png',
      desc: 'High-contrast espresso cartouche with 24K gold crown'
    },
    {
      name: '✨ Royal Gold Crown Transparent',
      url: '/assets/brand/khandani_logo_clean.png',
      desc: 'Transparent background for dark surfaces & footer'
    },
    {
      name: '🛡️ Classic Scalloped Crest',
      url: '/assets/reference/logo_hd.png',
      desc: 'Traditional gold scalloped cartouche seal'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Customizer Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-400" />
            <span>Master Site Customizer (Live Control)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Yahan se website ka logo, titles, announcements, hero banner, CTAs, payment accounts aur text real-time update karein.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {saveToast && (
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 animate-pulse font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Saved Live!</span>
            </span>
          )}

          <button
            onClick={() => {
              if (window.confirm("Khandani Nimco ki tamam customizations ko factory defaults par reset karein?")) {
                resetSiteConfig();
                alert("Site configuration reset ho chuki hai!");
              }
            }}
            className="bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 border border-slate-700 text-slate-300 text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            onClick={() => setViewMode('store')}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </button>
        </div>
      </div>

      {/* Sub-tab Pills Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-[1.02]'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: 👑 BRAND & LOGO */}
      {activeSubTab === 'branding' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Brand Logo & Core Identity</span>
            </h3>
            <p className="text-xs text-slate-400">Select pre-designed luxury logos or provide your custom URL.</p>
          </div>

          {/* Logo Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 block">Active Website Logo Preset</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {logoPresets.map((preset) => {
                const isSelected = siteConfig.logoUrl === preset.url;
                return (
                  <div
                    key={preset.url}
                    onClick={() => handleChange('logoUrl', preset.url)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center gap-2 ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-400 ring-1 ring-amber-400'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-full h-16 bg-[#1C0A02] rounded-lg p-2 flex items-center justify-center border border-[#ECB85A]/30">
                      <img src={preset.url} alt={preset.name} className="h-full object-contain" />
                    </div>
                    <span className="text-xs font-bold text-white mt-1">{preset.name}</span>
                    <span className="text-[10px] text-slate-400">{preset.desc}</span>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1 mt-auto">
                        <CheckCircle2 className="w-3 h-3" /> Active on Website
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <label className="text-xs font-semibold text-slate-400 block mb-1">Custom Logo Image URL</label>
              <input
                type="text"
                value={siteConfig.logoUrl || ''}
                onChange={(e) => handleChange('logoUrl', e.target.value)}
                placeholder="/assets/brand/khandani_logo_badge.png ya koi external image URL"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Store Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Store Name</label>
              <input
                type="text"
                value={siteConfig.storeName || ''}
                onChange={(e) => handleChange('storeName', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Store Tagline / Slogan</label>
              <input
                type="text"
                value={siteConfig.storeTagline || ''}
                onChange={(e) => handleChange('storeTagline', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Official WhatsApp Number (Bina +, e.g. 923242478108)</label>
              <input
                type="text"
                value={siteConfig.whatsappNumber || ''}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Official Phone (Display Text)</label>
              <input
                type="text"
                value={siteConfig.phoneNumber || ''}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Support Email</label>
              <input
                type="email"
                value={siteConfig.supportEmail || ''}
                onChange={(e) => handleChange('supportEmail', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Kitchen / Outlet Address</label>
              <input
                type="text"
                value={siteConfig.storeAddress || ''}
                onChange={(e) => handleChange('storeAddress', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: 📢 ANNOUNCEMENT BAR */}
      {activeSubTab === 'announcement' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-amber-400" />
              <span>Top Announcement Bar Settings</span>
            </h3>
            <p className="text-xs text-slate-400">Header ke bilkul top par dark strip ka text customize karein.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Location Pill Text (Left Side)</label>
              <input
                type="text"
                value={siteConfig.announcementLocation || ''}
                onChange={(e) => handleChange('announcementLocation', e.target.value)}
                placeholder="e.g. Karachi, Pakistan"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Announcement Message (Center)</label>
              <input
                type="text"
                value={siteConfig.announcementText || ''}
                onChange={(e) => handleChange('announcementText', e.target.value)}
                placeholder="e.g. Nationwide Delivery | Bulk Orders | Export Orders"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Helpline Phone (Right Side)</label>
              <input
                type="text"
                value={siteConfig.announcementPhone || ''}
                onChange={(e) => handleChange('announcementPhone', e.target.value)}
                placeholder="+92 324 2478108"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Live Preview */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Live Preview:</span>
              <div className="bg-[#1C0A02] text-[#F9F3EC] p-2.5 rounded-xl border border-[#311A0A] flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-[#ECB85A]" />
                  {siteConfig.announcementLocation}
                </span>
                <span className="text-center font-medium">
                  {siteConfig.announcementText}
                </span>
                <span className="flex items-center gap-1 text-[#ECB85A]">
                  <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                  {siteConfig.announcementPhone}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ⚡ HERO SECTION */}
      {activeSubTab === 'hero' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layout className="w-4 h-4 text-amber-400" />
              <span>Homepage Hero Split Banner</span>
            </h3>
            <p className="text-xs text-slate-400">Headlines, value propositions, CTA buttons aur food photography image.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Eyebrow Badge (Golden Uppercase)</label>
              <input
                type="text"
                value={siteConfig.heroEyebrow || ''}
                onChange={(e) => handleChange('heroEyebrow', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Hero Main Title (Large Serif)</label>
              <input
                type="text"
                value={siteConfig.heroTitle || ''}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Hero Subtitle</label>
              <input
                type="text"
                value={siteConfig.heroSubtitle || ''}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Value Proposition Line (e.g. Authentic • Fresh)</label>
              <input
                type="text"
                value={siteConfig.heroTagline || ''}
                onChange={(e) => handleChange('heroTagline', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Primary CTA Button Text</label>
              <input
                type="text"
                value={siteConfig.heroPrimaryCtaText || ''}
                onChange={(e) => handleChange('heroPrimaryCtaText', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Secondary CTA Button Text</label>
              <input
                type="text"
                value={siteConfig.heroSecondaryCtaText || ''}
                onChange={(e) => handleChange('heroSecondaryCtaText', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Hero Food Photography Image URL</label>
            <input
              type="text"
              value={siteConfig.heroImageUrl || ''}
              onChange={(e) => handleChange('heroImageUrl', e.target.value)}
              placeholder="/assets/reference/hero_food.jpg"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      )}

      {/* SUB-TAB 4: ✨ BENEFITS STRIP */}
      {activeSubTab === 'benefits' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Trust & Service Benefits Strip (4 Blocks)</span>
            </h3>
            <p className="text-xs text-slate-400">Hero section ke foran baad aane walay 4 trust blocks ka content.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(siteConfig.benefits || []).map((b, idx) => (
              <div key={b.id || idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  Block #{idx + 1}
                </span>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Title</label>
                  <input
                    type="text"
                    value={b.title || ''}
                    onChange={(e) => handleBenefitChange(idx, 'title', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={b.subtitle || ''}
                    onChange={(e) => handleBenefitChange(idx, 'subtitle', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: 📦 PROMOTIONAL BANNERS */}
      {activeSubTab === 'promotions' && (
        <div className="space-y-6">
          {/* Wholesale Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>Wholesale Orders Banner</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Eyebrow</label>
                <input
                  type="text"
                  value={siteConfig.wholesaleBanner?.eyebrow || ''}
                  onChange={(e) => handleNestedChange('wholesaleBanner', 'eyebrow', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Title</label>
                <input
                  type="text"
                  value={siteConfig.wholesaleBanner?.title || ''}
                  onChange={(e) => handleNestedChange('wholesaleBanner', 'title', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Description</label>
              <textarea
                rows={2}
                value={siteConfig.wholesaleBanner?.description || ''}
                onChange={(e) => handleNestedChange('wholesaleBanner', 'description', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Button Text</label>
                <input
                  type="text"
                  value={siteConfig.wholesaleBanner?.ctaText || ''}
                  onChange={(e) => handleNestedChange('wholesaleBanner', 'ctaText', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Image URL</label>
                <input
                  type="text"
                  value={siteConfig.wholesaleBanner?.imageUrl || ''}
                  onChange={(e) => handleNestedChange('wholesaleBanner', 'imageUrl', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
            </div>
          </div>

          {/* Export Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>International Export Banner (Beyond Borders)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Eyebrow</label>
                <input
                  type="text"
                  value={siteConfig.exportBanner?.eyebrow || ''}
                  onChange={(e) => handleNestedChange('exportBanner', 'eyebrow', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Title</label>
                <input
                  type="text"
                  value={siteConfig.exportBanner?.title || ''}
                  onChange={(e) => handleNestedChange('exportBanner', 'title', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Description</label>
              <textarea
                rows={2}
                value={siteConfig.exportBanner?.description || ''}
                onChange={(e) => handleNestedChange('exportBanner', 'description', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Button Text</label>
                <input
                  type="text"
                  value={siteConfig.exportBanner?.ctaText || ''}
                  onChange={(e) => handleNestedChange('exportBanner', 'ctaText', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Image URL</label>
                <input
                  type="text"
                  value={siteConfig.exportBanner?.imageUrl || ''}
                  onChange={(e) => handleNestedChange('exportBanner', 'imageUrl', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: 🌿 STORY & HERITAGE */}
      {activeSubTab === 'story' && (
        <div className="space-y-6">
          {/* Why Choose Us 6 items */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>"Why Khandani Nimco?" Section Items</span>
            </h3>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Section Main Heading</label>
              <input
                type="text"
                value={siteConfig.whyChooseUsTitle || ''}
                onChange={(e) => handleChange('whyChooseUsTitle', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {(siteConfig.whyChooseUsItems || []).map((item, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg">
                  <label className="text-[10px] text-amber-400 block mb-1">Item #{idx + 1}</label>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleWhyChooseItemChange(idx, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Story Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Type className="w-4 h-4 text-amber-400" />
              <span>Brand Heritage & Story Section</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Story Eyebrow</label>
                <input
                  type="text"
                  value={siteConfig.storyEyebrow || ''}
                  onChange={(e) => handleChange('storyEyebrow', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Story Headline</label>
                <input
                  type="text"
                  value={siteConfig.storyTitle || ''}
                  onChange={(e) => handleChange('storyTitle', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold block mb-1">Story Paragraph</label>
              <textarea
                rows={3}
                value={siteConfig.storyDescription || ''}
                onChange={(e) => handleChange('storyDescription', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Calligraphic Seal Text</label>
                <input
                  type="text"
                  value={siteConfig.storyBadgeText || ''}
                  onChange={(e) => handleChange('storyBadgeText', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Button Text</label>
                <input
                  type="text"
                  value={siteConfig.storyCtaText || ''}
                  onChange={(e) => handleChange('storyCtaText', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Image URL</label>
                <input
                  type="text"
                  value={siteConfig.storyImageUrl || ''}
                  onChange={(e) => handleChange('storyImageUrl', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: 💳 PAYMENT METHODS */}
      {activeSubTab === 'payments' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>Checkout Payment Gateways & Accounts</span>
            </h3>
            <p className="text-xs text-slate-400">Checkout page par customer ko dikhane walay payment methods aur account details.</p>
          </div>

          <div className="space-y-4">
            {/* Cash on Delivery */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-white block">Cash on Delivery (COD)</span>
                <span className="text-xs text-slate-400">Rider ko cash ada karein jab parcel pohonch jaye</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={siteConfig.payments?.cod?.enabled ?? true}
                  onChange={(e) => handlePaymentChange('cod', 'enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {/* JazzCash */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-sm font-bold text-amber-400">JazzCash Mobile Account</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={siteConfig.payments?.jazzcash?.enabled ?? true}
                    onChange={(e) => handlePaymentChange('jazzcash', 'enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">JazzCash Account Number</label>
                  <input
                    type="text"
                    value={siteConfig.payments?.jazzcash?.accountNumber || ''}
                    onChange={(e) => handlePaymentChange('jazzcash', 'accountNumber', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">JazzCash Account Title</label>
                  <input
                    type="text"
                    value={siteConfig.payments?.jazzcash?.accountTitle || ''}
                    onChange={(e) => handlePaymentChange('jazzcash', 'accountTitle', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Easypaisa */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-sm font-bold text-emerald-400">Easypaisa Mobile Account</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={siteConfig.payments?.easypaisa?.enabled ?? true}
                    onChange={(e) => handlePaymentChange('easypaisa', 'enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Easypaisa Account Number</label>
                  <input
                    type="text"
                    value={siteConfig.payments?.easypaisa?.accountNumber || ''}
                    onChange={(e) => handlePaymentChange('easypaisa', 'accountNumber', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Easypaisa Account Title</label>
                  <input
                    type="text"
                    value={siteConfig.payments?.easypaisa?.accountTitle || ''}
                    onChange={(e) => handlePaymentChange('easypaisa', 'accountTitle', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Bank Transfer */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-sm font-bold text-sky-400">Direct Bank Transfer / IBAN</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={siteConfig.payments?.bankTransfer?.enabled ?? true}
                    onChange={(e) => handlePaymentChange('bankTransfer', 'enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={siteConfig.payments?.bankTransfer?.bankName || ''}
                    onChange={(e) => handlePaymentChange('bankTransfer', 'bankName', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Account Title</label>
                  <input
                    type="text"
                    value={siteConfig.payments?.bankTransfer?.accountTitle || ''}
                    onChange={(e) => handlePaymentChange('bankTransfer', 'accountTitle', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-400 block mb-1">IBAN / Account Number</label>
                  <input
                    type="text"
                    value={siteConfig.payments?.bankTransfer?.iban || ''}
                    onChange={(e) => handlePaymentChange('bankTransfer', 'iban', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 8: 🚚 DELIVERY & LIMITS */}
      {activeSubTab === 'logistics' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Delivery Charges & Minimum Order Limit</span>
            </h3>
            <p className="text-xs text-slate-400">Order placement restrictions aur delivery fee thresholds.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Minimum Order Limit (PKR)</label>
              <input
                type="number"
                value={siteConfig.minOrderLimit || 200}
                onChange={(e) => handleChange('minOrderLimit', Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
              <p className="text-[10px] text-slate-500 mt-1">Is se kam ke order par cart checkout block rahega</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Standard Delivery Fee (PKR)</label>
              <input
                type="number"
                value={siteConfig.standardDeliveryFee || 150}
                onChange={(e) => handleChange('standardDeliveryFee', Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
              <p className="text-[10px] text-slate-500 mt-1">Karachi & base city delivery charges</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Free Delivery Threshold (PKR)</label>
              <input
                type="number"
                value={siteConfig.freeShippingThreshold || 1500}
                onChange={(e) => handleChange('freeShippingThreshold', Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
              <p className="text-[10px] text-slate-500 mt-1">Is raqam se oper delivery automatic FREE ho jayegi</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 9: 🌐 FOOTER & SOCIALS */}
      {activeSubTab === 'footer' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Footer Links & Social Media Accounts</span>
            </h3>
            <p className="text-xs text-slate-400">Footer me dikhane walay links aur social profiles.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Facebook Page Link</label>
              <input
                type="text"
                value={siteConfig.socials?.facebook || ''}
                onChange={(e) => handleNestedChange('socials', 'facebook', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Instagram Profile Link</label>
              <input
                type="text"
                value={siteConfig.socials?.instagram || ''}
                onChange={(e) => handleNestedChange('socials', 'instagram', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">TikTok Account Link</label>
              <input
                type="text"
                value={siteConfig.socials?.tiktok || ''}
                onChange={(e) => handleNestedChange('socials', 'tiktok', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">YouTube Channel Link</label>
              <input
                type="text"
                value={siteConfig.socials?.youtube || ''}
                onChange={(e) => handleNestedChange('socials', 'youtube', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-slate-400 block mb-1">Copyright Footer Text</label>
              <input
                type="text"
                value={siteConfig.copyrightText || ''}
                onChange={(e) => handleChange('copyrightText', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
