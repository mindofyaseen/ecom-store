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
  Share2,
  Download,
  UploadCloud,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Clock,
  Play
} from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

export const SiteCustomizerTab = () => {
  const { siteConfig, updateSiteConfig, resetSiteConfig, setViewMode, products, coupons, importStoreBackup } = useStore();
  const [activeSubTab, setActiveSubTab] = useState('branding');
  const [saveToast, setSaveToast] = useState(false);
  const backupFileInputRef = React.useRef(null);

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

  const handleExportBackup = () => {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      siteConfig,
      products,
      coupons
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `khandani-nimco-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackupFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const res = importStoreBackup(parsed);
        if (res.success) {
          alert('Zabardast! All customized products, images, and settings have been restored successfully!');
          showSavedIndicator();
        } else {
          alert('Backup file parhne mein masla aaya: ' + res.error);
        }
      } catch (err) {
        alert('Invalid JSON backup file. Bara-e-meharbani sahi backup file select karein.');
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  const currentHeroSlides = (siteConfig.heroSlides && siteConfig.heroSlides.length > 0)
    ? siteConfig.heroSlides
    : [
        {
          id: "slide-1",
          eyebrow: siteConfig.heroEyebrow || "TRADITIONAL PAKISTANI NIMCO",
          title: siteConfig.heroTitle || (siteConfig.storeName || "Khandani Nimco"),
          subtitle: siteConfig.heroSubtitle || "Made for Every Occasion",
          tagline: siteConfig.heroTagline || "Authentic taste • Premium quality • Freshly prepared",
          badge: "⭐ Burns Road Heritage",
          primaryCtaText: siteConfig.heroPrimaryCtaText || "Explore Collection",
          primaryCtaLink: siteConfig.heroPrimaryCtaLink || "shop",
          secondaryCtaText: siteConfig.heroSecondaryCtaText || "WhatsApp Us",
          secondaryCtaLink: siteConfig.heroSecondaryCtaLink || "whatsapp",
          imageUrl: siteConfig.heroImageUrl || "/assets/reference/hero_food.jpg"
        },
        {
          id: "slide-2",
          eyebrow: "FRESH CRUNCH EVERY DAY",
          title: "Wholesale & Event Packs",
          subtitle: "Weddings, Parties & Shops",
          tagline: "Custom batch roasting • Bulk discount pricing • Nationwide delivery",
          badge: "🎉 Event & Wholesale",
          primaryCtaText: "Bulk Order Karein",
          primaryCtaLink: "bulk-orders",
          secondaryCtaText: "Call Helpline",
          secondaryCtaLink: "tel",
          imageUrl: "/assets/reference/wholesale_food.jpg"
        },
        {
          id: "slide-3",
          eyebrow: "TAKING PAKISTANI NIMCO",
          title: "Beyond Borders",
          subtitle: "International Export Supply",
          tagline: "Vacuum-sealed freshness • Customs compliant • Worldwide cargo",
          badge: "✈️ Worldwide Shipping",
          primaryCtaText: "Export Inquiry",
          primaryCtaLink: "export",
          secondaryCtaText: "Chat on WhatsApp",
          secondaryCtaLink: "whatsapp",
          imageUrl: "/assets/reference/export_ship.jpg"
        }
      ];

  const handleAddSlide = () => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      eyebrow: "NEW SPECIAL ARRIVAL",
      title: "Special Karachi Nimco",
      subtitle: "Fresh Batch Just Prepared",
      tagline: "Crisp & Savory • Pure Spices • Fast Nationwide Delivery",
      badge: "🔥 New Arrival",
      primaryCtaText: "Order Now",
      primaryCtaLink: "shop",
      secondaryCtaText: "WhatsApp Us",
      secondaryCtaLink: "whatsapp",
      imageUrl: "/assets/reference/hero_food.jpg"
    };
    const updated = [...currentHeroSlides, newSlide];
    handleChange('heroSlides', updated);
  };

  const handleSlideChange = (index, field, value) => {
    const updated = [...currentHeroSlides];
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: value };
      const updates = { heroSlides: updated };
      if (index === 0) {
        if (field === 'title') updates.heroTitle = value;
        if (field === 'eyebrow') updates.heroEyebrow = value;
        if (field === 'subtitle') updates.heroSubtitle = value;
        if (field === 'tagline') updates.heroTagline = value;
        if (field === 'primaryCtaText') updates.heroPrimaryCtaText = value;
        if (field === 'primaryCtaLink') updates.heroPrimaryCtaLink = value;
        if (field === 'secondaryCtaText') updates.heroSecondaryCtaText = value;
        if (field === 'secondaryCtaLink') updates.heroSecondaryCtaLink = value;
        if (field === 'imageUrl') updates.heroImageUrl = value;
      }
      updateSiteConfig(updates);
      showSavedIndicator();
    }
  };

  const handleDeleteSlide = (index) => {
    if (currentHeroSlides.length <= 1) {
      alert("Kam az kam 1 slide ka hona zaroori hai.");
      return;
    }
    if (window.confirm(`Slide #${index + 1} ko delete karein?`)) {
      const updated = currentHeroSlides.filter((_, i) => i !== index);
      handleChange('heroSlides', updated);
    }
  };

  const handleMoveSlide = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= currentHeroSlides.length) return;
    const updated = [...currentHeroSlides];
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    handleChange('heroSlides', updated);
  };

  const subTabs = [
    { id: 'branding', label: '👑 Brand & Logo', icon: Sparkles },
    { id: 'announcement', label: '📢 Announcement Bar', icon: Megaphone },
    { id: 'hero', label: '🎠 Hero Carousel & Slides', icon: Layout },
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

          {/* Hidden Backup File Input */}
          <input
            ref={backupFileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportBackupFile}
            className="hidden"
          />

          <button
            onClick={handleExportBackup}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
            title="Download full backup JSON to share with other admins or devices"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export Backup</span>
          </button>

          <button
            onClick={() => backupFileInputRef.current?.click()}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
            title="Restore backup file from another admin or device"
          >
            <UploadCloud className="w-3.5 h-3.5 text-sky-400" />
            <span>Import Backup</span>
          </button>

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
              <ImageUploadField
                label="Custom Brand Logo"
                value={siteConfig.logoUrl || ''}
                onChange={(newUrl) => handleChange('logoUrl', newUrl)}
                maxDimension={500}
                placeholder="/assets/brand/khandani_logo_badge.png ya koi external image URL"
                helpText="Apne computer ya phone gallery se custom logo upload karein (PNG / JPG)."
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

      {/* SUB-TAB 3: 🎠 HERO CAROUSEL & SLIDES */}
      {activeSubTab === 'hero' && (
        <div className="space-y-6">
          
          {/* 1. Global Carousel Settings Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layout className="w-4 h-4 text-amber-400" />
                  <span>Homepage Hero Carousel Settings</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Carousel slider enable karein, autoplay speed set karein, aur slides customize karein.
                </p>
              </div>

              {/* Add New Slide Button */}
              <button
                type="button"
                onClick={handleAddSlide}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow transition-all transform hover:scale-[1.02] shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Slide</span>
              </button>
            </div>

            {/* Quick Carousel Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              {/* Carousel Enabled Toggle */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Carousel Mode</span>
                  <span className="text-[10px] text-slate-400">Multiple rotating slides</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange('carouselEnabled', siteConfig.carouselEnabled === false ? true : false)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors ${
                    siteConfig.carouselEnabled !== false
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {siteConfig.carouselEnabled !== false ? 'ON (Active)' : 'OFF (Single)'}
                </button>
              </div>

              {/* Autoplay Toggle */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Autoplay</span>
                  <span className="text-[10px] text-slate-400">Slides rotate automatically</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange('carouselAutoplay', siteConfig.carouselAutoplay === false ? true : false)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors ${
                    siteConfig.carouselAutoplay !== false
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {siteConfig.carouselAutoplay !== false ? 'Enabled' : 'Paused'}
                </button>
              </div>

              {/* Interval / Speed */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Slide Duration</span>
                  <span className="text-[10px] text-slate-400">Time per slide</span>
                </div>
                <select
                  value={siteConfig.carouselInterval || 5000}
                  onChange={(e) => handleChange('carouselInterval', Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value={3000}>3 Seconds</option>
                  <option value={5000}>5 Seconds (Normal)</option>
                  <option value={7000}>7 Seconds</option>
                  <option value={10000}>10 Seconds (Slow)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Slides List Manager */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Active Slides ({currentHeroSlides.length})
              </h4>
              <span className="text-[11px] text-slate-500">
                Arrows se slide order change karein ya photo upload karein
              </span>
            </div>

            {currentHeroSlides.map((slide, index) => (
              <div
                key={slide.id || index}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 space-y-4 transition-all shadow-md"
              >
                {/* Slide Header Strip */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 gap-2 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-black text-xs flex items-center justify-center">
                      #{index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">
                        {slide.title || `Slide ${index + 1}`}
                      </h4>
                      {slide.badge && (
                        <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          {slide.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions: Move Up, Move Down, Delete */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveSlide(index, -1)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 rounded-lg transition-colors"
                      title="Move Up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === currentHeroSlides.length - 1}
                      onClick={() => handleMoveSlide(index, 1)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 rounded-lg transition-colors"
                      title="Move Down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(index)}
                      className="p-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 rounded-lg border border-rose-800/60 transition-colors ml-1"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Slide Details Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Slide Badge (e.g. ⭐ Heritage)</label>
                    <input
                      type="text"
                      value={slide.badge || ''}
                      onChange={(e) => handleSlideChange(index, 'badge', e.target.value)}
                      placeholder="e.g. ⭐ Burns Road Heritage"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Eyebrow Headline (Gold text)</label>
                    <input
                      type="text"
                      value={slide.eyebrow || ''}
                      onChange={(e) => handleSlideChange(index, 'eyebrow', e.target.value)}
                      placeholder="e.g. TRADITIONAL PAKISTANI NIMCO"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Main Title Headline *</label>
                    <input
                      type="text"
                      value={slide.title || ''}
                      onChange={(e) => handleSlideChange(index, 'title', e.target.value)}
                      placeholder="e.g. Khandani Nimco"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Subtitle (Italic Serif)</label>
                    <input
                      type="text"
                      value={slide.subtitle || ''}
                      onChange={(e) => handleSlideChange(index, 'subtitle', e.target.value)}
                      placeholder="e.g. Made for Every Occasion"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-slate-400 font-semibold block mb-1">Tagline / Key Features</label>
                    <input
                      type="text"
                      value={slide.tagline || ''}
                      onChange={(e) => handleSlideChange(index, 'tagline', e.target.value)}
                      placeholder="e.g. Authentic taste • Premium quality • Freshly prepared"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Primary CTA */}
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Primary Button Text</label>
                    <input
                      type="text"
                      value={slide.primaryCtaText || ''}
                      onChange={(e) => handleSlideChange(index, 'primaryCtaText', e.target.value)}
                      placeholder="Explore Collection"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Primary Button Target</label>
                    <select
                      value={slide.primaryCtaLink || 'shop'}
                      onChange={(e) => handleSlideChange(index, 'primaryCtaLink', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="shop">Complete Shop Page</option>
                      <option value="bulk-orders">Bulk / Wholesale Orders</option>
                      <option value="export">Export Inquiry Page</option>
                      <option value="about">About Us Page</option>
                      <option value="contact">Contact Us Page</option>
                      <option value="whatsapp">Direct WhatsApp Chat</option>
                    </select>
                  </div>

                  {/* Secondary CTA */}
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Secondary Button Text</label>
                    <input
                      type="text"
                      value={slide.secondaryCtaText || ''}
                      onChange={(e) => handleSlideChange(index, 'secondaryCtaText', e.target.value)}
                      placeholder="WhatsApp Order"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Secondary Button Target</label>
                    <select
                      value={slide.secondaryCtaLink || 'whatsapp'}
                      onChange={(e) => handleSlideChange(index, 'secondaryCtaLink', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="whatsapp">Direct WhatsApp Chat</option>
                      <option value="tel">Phone Call Helpline</option>
                      <option value="bulk-orders">Bulk / Wholesale Orders</option>
                      <option value="shop">Complete Shop Page</option>
                      <option value="export">Export Inquiry Page</option>
                    </select>
                  </div>
                </div>

                {/* Direct Image Upload for this Slide */}
                <div className="pt-2 border-t border-slate-800">
                  <ImageUploadField
                    label={`Slide #${index + 1} Photo (Mobile / Laptop se Upload Karein)`}
                    value={slide.imageUrl || ''}
                    onChange={(newUrl) => handleSlideChange(index, 'imageUrl', newUrl)}
                    maxDimension={1200}
                    placeholder="/assets/reference/hero_food.jpg ya web image link"
                    helpText="Is slide ke liye apne device se photo select karein. System auto-compress kar ke laga dega."
                  />
                </div>
              </div>
            ))}

            {/* Bottom Add Slide Button */}
            <button
              type="button"
              onClick={handleAddSlide}
              className="w-full py-3 border-2 border-dashed border-slate-700 hover:border-amber-400 rounded-2xl text-xs font-bold text-slate-300 hover:text-amber-400 flex items-center justify-center gap-2 transition-colors bg-slate-950"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Slide (+ Nayi Slide Banayein)</span>
            </button>
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
              <div className="sm:col-span-2 pt-1">
                <ImageUploadField
                  label="Wholesale Banner Image"
                  value={siteConfig.wholesaleBanner?.imageUrl || ''}
                  onChange={(newUrl) => handleNestedChange('wholesaleBanner', 'imageUrl', newUrl)}
                  maxDimension={1000}
                  placeholder="/assets/reference/wholesale_food.jpg"
                  helpText="Wholesale orders banner ke liye photo upload karein."
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
              <div className="sm:col-span-2 pt-1">
                <ImageUploadField
                  label="Export Banner Image"
                  value={siteConfig.exportBanner?.imageUrl || ''}
                  onChange={(newUrl) => handleNestedChange('exportBanner', 'imageUrl', newUrl)}
                  maxDimension={1000}
                  placeholder="/assets/reference/export_ship.jpg"
                  helpText="International export banner ke liye cargo / packaging photo upload karein."
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
              <div className="sm:col-span-2 pt-1">
                <ImageUploadField
                  label="Story & Heritage Photo"
                  value={siteConfig.storyImageUrl || ''}
                  onChange={(newUrl) => handleChange('storyImageUrl', newUrl)}
                  maxDimension={1000}
                  placeholder="/assets/reference/story_food.jpg"
                  helpText="Burns Road heritage ya brand story ke liye photography upload karein."
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
