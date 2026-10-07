import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Search,
  MapPin,
  Heart,
  Bike,
  Menu,
  X,
  Phone,
  User,
  LogOut,
  ChevronDown,
  Lock,
  Store,
  Crown,
  ArrowRight,
  Truck
} from 'lucide-react';
import { CITIES_LIST } from '../data/nimcoData';
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
    setIsFeedbackModalOpen,
    products,
    openProductPage,
    formatPrice
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [adminAuthModalOpen, setAdminAuthModalOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);

  const searchDropdownRef = useRef(null);
  const mobileSearchDropdownRef = useRef(null);

  // Live matching products for instant search preview
  const searchResults = searchQuery.trim()
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  // Close live search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const inDesktop = searchDropdownRef.current && searchDropdownRef.current.contains(e.target);
      const inMobile = mobileSearchDropdownRef.current && mobileSearchDropdownRef.current.contains(e.target);
      if (!inDesktop && !inMobile) {
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
    setDesktopSearchOpen(false);
  };

  const handleSelectSearchProduct = (productId) => {
    openProductPage(productId);
    setSearchFocused(false);
    setDesktopSearchOpen(false);
  };

  const handleAdminClick = () => {
    if (viewMode === 'admin') {
      setViewMode('store');
      return;
    }

    if (isAdminLoggedIn) {
      setViewMode('admin');
    } else {
      setAdminAuthModalOpen(true);
    }
  };

  const handleBulkOrdersClick = () => {
    if (currentPage !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        document.getElementById('bulk-orders-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById('bulk-orders-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExportClick = () => {
    if (currentPage !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        document.getElementById('export-orders-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById('export-orders-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // Non-sticky header: scrolls naturally off-screen on user scroll
    <header className="relative z-40 bg-[#fbf8f2] text-[#2b1810] shadow-sm border-b border-[#eaddcb]">
      
      {/* 1. Top Announcement Bar in Deep Espresso Brown */}
      <div className="bg-[#1c0f0a] text-[#eedfc8] text-xs py-2 px-4 font-medium border-b border-[#321910] flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: City Location Picker */}
        <div className="relative flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#e5a842]" />
          <button
            type="button"
            onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
            className="flex items-center gap-1 hover:text-white transition-colors text-[11px] font-semibold"
          >
            <span>{selectedCity}, Pakistan</span>
            <ChevronDown className="w-3 h-3 text-[#e5a842]" />
          </button>

          {/* City Dropdown Menu */}
          {cityDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-64 bg-[#23120b] border border-[#a16207]/40 rounded-2xl shadow-2xl p-2 z-50 text-left text-xs max-h-72 overflow-y-auto">
              <div className="px-2 py-1.5 text-[10px] uppercase font-bold text-[#e5a842] border-b border-[#3b1f13]">
                Delivery Destination:
              </div>
              {CITIES_LIST.map((city) => (
                <button
                  key={city.name}
                  onClick={() => {
                    setSelectedCity(city.name);
                    setCityDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between hover:bg-[#34180d] transition-colors ${
                    selectedCity === city.name ? 'bg-[#3b1f13] text-[#e5a842] font-bold' : 'text-[#eedfc8]'
                  }`}
                >
                  <span>{city.name}</span>
                  <span className="text-[10px] text-[#c8913c]">
                    {city.deliveryEstimate.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center: Nationwide Delivery | Bulk Orders | Export Orders */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] tracking-wide text-[#fdf5eb]/90">
          <Truck className="w-3.5 h-3.5 text-[#e5a842]" />
          <span>Nationwide Delivery</span>
          <span className="text-[#a16207]">|</span>
          <button onClick={handleBulkOrdersClick} className="hover:text-[#e5a842] transition-colors">
            Bulk Orders
          </button>
          <span className="text-[#a16207]">|</span>
          <button onClick={handleExportClick} className="hover:text-[#e5a842] transition-colors">
            Export Orders
          </button>
        </div>

        {/* Right: Phone Number */}
        <div className="flex items-center gap-3 text-[11px]">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[#eedfc8] hover:text-[#e5a842] transition-colors font-mono font-semibold"
          >
            <Phone className="w-3 h-3 text-[#25d366]" />
            <span>+{whatsappNumber}</span>
          </a>
        </div>

      </div>

      {/* 2. Main Navigation Bar in Warm Cream */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo: Vintage Scalloped Dark Brown Cartouche Badge with Golden Ribbon */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#2b1810] hover:text-[#78350f]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div 
              onClick={() => navigateTo('home')}
              className="cursor-pointer flex flex-col items-center group flex-shrink-0 select-none"
            >
              <div className="relative bg-[#200e08] border-2 border-[#c8913c] px-4 py-1.5 rounded-[1.25rem] shadow-md flex flex-col items-center text-center transform group-hover:scale-105 transition-transform">
                <Crown className="w-3.5 h-3.5 text-[#e5a842] fill-[#e5a842] -mb-0.5" />
                <span className="text-base sm:text-lg font-black tracking-tight text-[#fdf8f2] font-serif leading-tight">
                  Khandani
                </span>
                <span className="text-sm sm:text-base font-black tracking-tight text-[#f4caa0] font-serif -mt-1">
                  Nimco
                </span>
              </div>
              <div className="-mt-1.5 bg-gradient-to-r from-[#d97706] via-[#e5a842] to-[#d97706] text-[#200e08] px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm border border-[#b45309]/30">
                Asli Swad, Khandani Andaaz
              </div>
            </div>
          </div>

          {/* Desktop Navigation Pages Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-extrabold text-[#3a2014] tracking-wide">
            <button
              onClick={() => navigateTo('home')}
              className={`hover:text-[#a16207] transition-all pb-1 ${
                currentPage === 'home' && viewMode === 'store'
                  ? 'text-[#200e08] border-b-2 border-[#200e08]'
                  : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className={`hover:text-[#a16207] transition-all pb-1 ${
                currentPage === 'shop' && viewMode === 'store'
                  ? 'text-[#200e08] border-b-2 border-[#200e08]'
                  : ''
              }`}
            >
              Our Products
            </button>
            <button
              onClick={handleBulkOrdersClick}
              className="hover:text-[#a16207] transition-all pb-1"
            >
              Bulk Orders
            </button>
            <button
              onClick={handleExportClick}
              className="hover:text-[#a16207] transition-all pb-1"
            >
              Export
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`hover:text-[#a16207] transition-all pb-1 ${
                currentPage === 'about' && viewMode === 'store'
                  ? 'text-[#200e08] border-b-2 border-[#200e08]'
                  : ''
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`hover:text-[#a16207] transition-all pb-1 ${
                currentPage === 'contact' && viewMode === 'store'
                  ? 'text-[#200e08] border-b-2 border-[#200e08]'
                  : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Header Icons: Search, User, Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Button & Live Search Dropdown */}
            <div ref={searchDropdownRef} className="relative">
              <button
                onClick={() => setDesktopSearchOpen(!desktopSearchOpen)}
                className="p-2 rounded-full text-[#3a2014] hover:text-[#78350f] hover:bg-[#efe4d4] transition-colors"
                title="Search Snacks"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Desktop Expandable Search Input Dropdown */}
              {desktopSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-[#c8913c]/40 rounded-2xl shadow-2xl p-2.5 z-50">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search 50+ fresh Nimco snacks..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSearchFocused(true);
                      }}
                      onFocus={() => setSearchFocused(true)}
                      className="w-full bg-[#fbf8f2] border border-[#d8c3ad] rounded-xl py-2 pl-9 pr-8 text-xs text-[#2b1810] placeholder-[#8d715d] focus:outline-none focus:ring-2 focus:ring-[#c8913c]"
                    />
                    <Search className="w-4 h-4 text-[#a16207] absolute left-3 top-2.5" />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-2.5 text-[#8d715d] hover:text-[#2b1810]"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </form>

                  {/* Matching Products Preview */}
                  {searchFocused && searchQuery.trim() && (
                    <div className="mt-2 divide-y divide-[#ebdcc9] text-xs">
                      {searchResults.length > 0 ? (
                        searchResults.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleSelectSearchProduct(item.id)}
                            className="p-2 flex items-center gap-3 hover:bg-[#fcf8f2] rounded-xl cursor-pointer transition-colors"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-xl object-cover border border-[#ebdcc9] flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-[#2b1810] text-xs truncate">{item.name}</h4>
                              <span className="text-[10px] text-[#a16207]">{item.category}</span>
                            </div>
                            <span className="font-mono font-bold text-[#78350f] text-xs">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-center text-[#8d715d] text-xs">
                          No snacks matching "{searchQuery}".
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Account / Profile Button */}
            <div className="relative">
              {currentUser ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="p-1.5 rounded-full text-[#3a2014] hover:bg-[#efe4d4] flex items-center gap-1.5 transition-colors"
                    title={currentUser.name}
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-6 h-6 rounded-full object-cover border-2 border-[#c8913c]"
                    />
                    <ChevronDown className="w-3 h-3 text-[#a16207]" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-[#c8913c]/40 rounded-2xl shadow-2xl p-2 z-50 text-xs text-[#2b1810] space-y-1">
                      <div className="px-3 py-2 border-b border-[#ebdcc9]">
                        <strong className="block text-[#2b1810] truncate">{currentUser.name}</strong>
                        <span className="text-[10px] text-[#a16207] truncate block">{currentUser.email}</span>
                      </div>
                      <button
                        onClick={() => {
                          navigateTo('track-order');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#fcf8f2] flex items-center gap-2"
                      >
                        <Bike className="w-3.5 h-3.5 text-[#a16207]" />
                        <span>My Deliveries</span>
                      </button>
                      <button
                        onClick={() => {
                          logoutUser();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalMode('login')}
                  className="p-2 rounded-full text-[#3a2014] hover:text-[#78350f] hover:bg-[#efe4d4] transition-colors"
                  title="Sign In / Register"
                  aria-label="User Account"
                >
                  <User className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Shopping Cart Button */}
            {viewMode === 'store' && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full text-[#3a2014] hover:text-[#78350f] hover:bg-[#efe4d4] transition-colors"
                title="View Basket"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#200e08] text-[#e5a842] text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border border-[#e5a842] shadow-sm">
                    {totalCartCount}
                  </span>
                )}
              </button>
            )}

            {/* Admin Switcher Icon */}
            <button
              onClick={handleAdminClick}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'admin'
                  ? 'bg-[#c8913c] text-[#200e08]'
                  : 'text-[#8d715d] hover:text-[#200e08] hover:bg-[#efe4d4]'
              }`}
              title={viewMode === 'store' ? 'Admin Portal' : 'Back to Storefront'}
            >
              {viewMode === 'store' ? (
                <Lock className="w-4 h-4" />
              ) : (
                <Store className="w-4 h-4" />
              )}
            </button>

          </div>

        </div>

        {/* Dedicated Mobile Phone Search Bar */}
        {viewMode === 'store' && (
          <div ref={mobileSearchDropdownRef} className="md:hidden mt-3 relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search 50+ fresh Nimco snacks..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                className="w-full bg-white border border-[#d8c3ad] rounded-xl py-2.5 pl-9 pr-8 text-xs text-[#2b1810] placeholder-[#8d715d] focus:outline-none focus:ring-2 focus:ring-[#c8913c] shadow-sm"
              />
              <Search className="w-4 h-4 text-[#a16207] absolute left-3 top-3" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-[#8d715d]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Mobile Instant Live Search Dropdown */}
            {searchFocused && searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#c8913c]/60 rounded-2xl shadow-2xl overflow-hidden z-50 text-xs divide-y divide-[#ebdcc9]">
                <div className="p-2 bg-[#fcf8f2] flex items-center justify-between text-[11px] text-[#78350f] font-bold">
                  <span>Matching Items ({searchResults.length}):</span>
                  <button onClick={handleSearchSubmit} className="text-[#a16207] hover:underline flex items-center gap-0.5">
                    <span>View all</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectSearchProduct(item.id)}
                      className="p-2.5 flex items-center gap-3 hover:bg-[#faf5ec] cursor-pointer transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-xl object-cover border border-[#ebdcc9] flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#2b1810] text-xs truncate">{item.name}</h4>
                        <span className="text-[10px] text-[#a16207]">{item.category}</span>
                      </div>
                      <span className="font-mono font-bold text-[#78350f] text-xs">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-[#8d715d] text-xs">
                    No snacks matching "{searchQuery}". Try "Mix Nimco" or "Gathiya".
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#ebdcc9] space-y-2 text-xs font-bold">
            <button
              onClick={() => {
                navigateTo('home');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl bg-white text-[#2b1810] shadow-sm"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigateTo('shop');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl bg-white text-[#2b1810] shadow-sm"
            >
              Our Products (50+ Khandani Snacks)
            </button>
            <button
              onClick={() => {
                handleBulkOrdersClick();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl bg-white text-[#2b1810] shadow-sm"
            >
              Bulk Orders & Wholesale
            </button>
            <button
              onClick={() => {
                handleExportClick();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl bg-white text-[#2b1810] shadow-sm"
            >
              Export Orders (Worldwide)
            </button>
            <button
              onClick={() => {
                navigateTo('about');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl bg-white text-[#2b1810] shadow-sm"
            >
              About Us (Burns Road Legacy)
            </button>
            <button
              onClick={() => {
                navigateTo('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl bg-white text-[#2b1810] shadow-sm"
            >
              Contact & Outlets
            </button>
          </div>
        )}

      </div>

      {/* Admin Password Modal */}
      <AdminPasswordModal
        isOpen={adminAuthModalOpen}
        onClose={() => setAdminAuthModalOpen(false)}
        onSuccess={() => {
          setAdminAuthModalOpen(false);
          setViewMode('admin');
        }}
      />
    </header>
  );
};
