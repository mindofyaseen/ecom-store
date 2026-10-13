import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Search,
  MapPin,
  Menu,
  X,
  Phone,
  User,
  LogOut,
  ChevronDown,
  Lock,
  Truck,
  Heart,
  Store,
  ExternalLink
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { AdminPasswordModal } from './AdminPasswordModal';

export const Navbar = () => {
  const {
    totalCartCount,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    whatsappNumber,
    selectedCity,
    setSelectedCity,
    currentCityInfo,
    wishlist,
    showWishlistOnly,
    setShowWishlistOnly,
    currentPage,
    navigateTo,
    currentUser,
    setAuthModalMode,
    logoutUser,
    isAdminLoggedIn,
    products,
    openProductPage,
    formatPrice,
    siteConfig,
    openAdminPanel
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [adminAuthModalOpen, setAdminAuthModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const searchContainerRef = useRef(null);

  // Live matching products for instant search preview
  const searchResults = searchQuery.trim()
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 6)
    : [];

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (currentPage !== 'shop') {
      navigateTo('shop');
    }
    setSearchFocused(false);
    setSearchOpen(false);
  };

  const handleSelectSearchProduct = (productId) => {
    openProductPage(productId);
    setSearchFocused(false);
    setSearchOpen(false);
  };

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Our Products', page: 'shop' },
    { label: 'Bulk Orders', page: 'bulk-orders' },
    { label: 'Export', page: 'export' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <header className="w-full sticky top-0 z-40 shadow-sm bg-[#F9F3EC]">
      
      {/* 1. TOP ANNOUNCEMENT BAR (Exact Reference Styling) */}
      <div className="bg-[#1C0A02] text-[#F9F3EC] text-xs font-medium py-2 px-4 sm:px-8 border-b border-[#311A0A]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Location */}
          <div className="flex items-center gap-1.5 text-[#F9F3EC]/90 text-[11px] sm:text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#ECB85A]" />
            <span>{siteConfig?.announcementLocation || 'Karachi, Pakistan'}</span>
          </div>

          {/* Center: Nationwide Delivery & Bulk/Export */}
          <div className="hidden md:flex items-center gap-2 text-center text-[#F9F3EC]/95 tracking-wide text-[11px] sm:text-xs">
            <Truck className="w-3.5 h-3.5 text-[#ECB85A]" />
            <span>{siteConfig?.announcementText || 'Nationwide Delivery | Bulk Orders | Export Orders'}</span>
          </div>

          {/* Right: WhatsApp Contact */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig?.whatsappNumber || whatsappNumber}?text=Assalam-o-Alaikum!%20I%20want%20to%20order%20from%20${encodeURIComponent(siteConfig?.storeName || 'Khandani Nimco')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[#F9F3EC] hover:text-[#ECB85A] transition-colors text-[11px] sm:text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{siteConfig?.announcementPhone || siteConfig?.phoneNumber || '+92 324 2478108'}</span>
            </a>

            {/* Quick Admin Access Icon */}
            <button
              onClick={openAdminPanel}
              className="text-[#ECB85A] hover:text-[#DD8F25] transition-colors p-1 rounded hover:bg-white/10"
              title="Admin Panel"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <nav className="border-b border-[#D3C6B4]/80 px-4 sm:px-8 py-2 md:py-3 transition-colors bg-[#F9F3EC]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo (Left) */}
          <div className="flex items-center">
            <BrandLogo size="md" />
          </div>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => {
                    setShowWishlistOnly(false);
                    navigateTo(link.page);
                  }}
                  className={`relative py-2 text-[14px] font-semibold tracking-normal transition-colors ${
                    isActive 
                      ? 'text-[#311A0A] font-bold' 
                      : 'text-[#544333] hover:text-[#311A0A]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#311A0A] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Utility Icons */}
          <div className="flex items-center gap-3 sm:gap-4 text-[#311A0A]">
            
            {/* Search Icon / Toggle */}
            <div className="relative" ref={searchContainerRef}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-[#F0E3D1] rounded-full transition-colors text-[#311A0A]"
                aria-label="Search Nimco"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Expandable Search Input dropdown */}
              {searchOpen && (
                <div className="absolute right-0 top-12 w-72 sm:w-80 bg-white border border-[#D3C6B4] rounded-xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      placeholder="Search Mix Nimco, Gathiya, Sew..."
                      className="w-full pl-9 pr-4 py-2 text-sm bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg focus:outline-none focus:border-[#311A0A] text-[#311A0A]"
                      autoFocus
                    />
                    <Search className="w-4 h-4 text-[#6A330E] absolute left-3 top-2.5" />
                  </form>

                  {/* Instant Search Results Dropdown */}
                  {searchFocused && searchResults.length > 0 && (
                    <div className="mt-2 divide-y divide-[#F0E3D1] max-h-60 overflow-y-auto">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectSearchProduct(item.id)}
                          className="flex items-center gap-3 p-2 hover:bg-[#F9F3EC] cursor-pointer rounded-lg transition-colors"
                        >
                          <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded bg-[#F9F3EC]" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[#311A0A] truncate">{item.name}</p>
                            <p className="text-[11px] text-[#6A330E] font-medium">{formatPrice(item.price)}</p>
                          </div>
                        </div>
                      ))}
                      <div className="pt-2 text-center">
                        <button
                          onClick={handleSearchSubmit}
                          className="text-xs font-bold text-[#311A0A] hover:underline"
                        >
                          View all results in Shop →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Account Icon */}
            <div className="relative">
              <button
                onClick={() => {
                  if (currentUser) {
                    setUserDropdownOpen(!userDropdownOpen);
                  } else {
                    setAuthModalMode('login');
                  }
                }}
                className="p-2 hover:bg-[#F0E3D1] rounded-full transition-colors text-[#311A0A]"
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* User Dropdown Menu if logged in */}
              {userDropdownOpen && currentUser && (
                <div className="absolute right-0 top-12 w-56 bg-white border border-[#D3C6B4] rounded-xl shadow-xl p-3 z-50">
                  <div className="border-b border-[#F0E3D1] pb-2 mb-2">
                    <p className="text-xs font-bold text-[#311A0A] truncate">{currentUser.name || 'Valued Customer'}</p>
                    <p className="text-[11px] text-gray-500 truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigateTo('track-order');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left text-xs font-semibold py-1.5 px-2 hover:bg-[#F9F3EC] rounded text-[#311A0A]"
                  >
                    Track Orders
                  </button>
                  <button
                    onClick={() => {
                      setShowWishlistOnly(true);
                      navigateTo('shop');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left text-xs font-semibold py-1.5 px-2 hover:bg-[#F9F3EC] rounded text-[#311A0A] flex items-center justify-between"
                  >
                    <span>My Wishlist</span>
                    <span className="text-[10px] bg-[#ECB85A] text-[#1C0A02] font-bold px-1.5 py-0.5 rounded-full">{wishlist.length}</span>
                  </button>
                  <button
                    onClick={() => {
                      logoutUser();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left text-xs font-bold py-1.5 px-2 hover:bg-red-50 text-red-600 rounded mt-1 flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Cart Icon with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-[#F0E3D1] rounded-full transition-colors text-[#311A0A]"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 bg-[#311A0A] text-[#F9F3EC] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-[#F0E3D1] rounded-lg transition-colors text-[#311A0A]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#D3C6B4] pb-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => {
                    setShowWishlistOnly(false);
                    navigateTo(link.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive 
                      ? 'bg-[#311A0A] text-[#F9F3EC]' 
                      : 'text-[#311A0A] hover:bg-[#F0E3D1]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#ECB85A]" />}
                </button>
              );
            })}

            {/* Mobile Location & WhatsApp Info */}
            <div className="pt-3 mt-3 border-t border-[#D3C6B4]/60 px-4 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#544333]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#6A330E]" />
                  Karachi, Pakistan
                </span>
                <span className="text-emerald-700 font-bold">Express Available</span>
              </div>
              <a
                href={`https://wa.me/${siteConfig?.whatsappNumber || whatsappNumber || '923242478108'}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#25D366] text-white font-bold text-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp: {siteConfig?.phoneNumber || '+92 324 2478108'}</span>
              </a>
            </div>
          </div>
        )}

      </nav>
    </header>
  );
};
