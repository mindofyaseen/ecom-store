import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { Search, Filter, ArrowUpDown, X, Sparkles, PackageSearch } from 'lucide-react';

export const ShopPage = () => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    showWishlistOnly,
    setShowWishlistOnly,
    wishlist
  } = useStore();

  const [selectedSpice, setSelectedSpice] = useState('All');
  const [maxPrice, setMaxPrice] = useState(3500);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [
    'All',
    'Mix Nimco',
    'Gathiya & Bhujia',
    'Sew (Sev)',
    'Dal Snacks',
    'Chewra & Papri',
    'Salted Nuts',
    'Nimco Hampers'
  ];

  const spiceLevels = ['All', 'Mild', 'Medium', 'Hot & Spicy', 'Chatpata', 'Sweet & Savory'];

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((p) => {
      if (showWishlistOnly) {
        return wishlist.includes(p.id);
      }

      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSpice = selectedSpice === 'All' || p.spiceLevel === selectedSpice;
      const matchesPrice = p.price <= maxPrice;

      return matchesCategory && matchesSearch && matchesSpice && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });

  return (
    <div className="min-h-screen bg-[#F9F3EC] text-[#311A0A]">
      
      {/* Category Pills Strip */}
      <CategoryFilter />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        
        {/* Page Title & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D3C6B4] pb-5">
          <div>
            <span className="text-xs font-bold text-[#6A330E] uppercase tracking-widest block font-serif">
              Authentic Pakistani Nimco Collection
            </span>
            <h1 className="text-2xl sm:text-4xl font-black font-serif text-[#311A0A]">
              {showWishlistOnly ? 'My Favorite Nimco' : activeCategory === 'All' ? 'Our Popular Nimco Catalog' : `${activeCategory} Collection`}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-4 py-2 bg-[#311A0A] text-[#F9F3EC] rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Filter className="w-4 h-4" />
              <span>Filters ({filteredProducts.length})</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-[#D3C6B4] rounded-lg px-3 py-1.5 text-xs shadow-sm">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#6A330E]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-[#311A0A] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Bar in Shop */}
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within pure nimco products..."
            className="w-full pl-9 pr-9 py-2 bg-white border border-[#D3C6B4] rounded-lg text-xs sm:text-sm text-[#311A0A] placeholder-[#544333]/60 focus:outline-none focus:border-[#311A0A]"
          />
          <Search className="w-4 h-4 text-[#6A330E] absolute left-3 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-[#544333] hover:text-[#311A0A]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Main Content Layout (Sidebar Filters + Products Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 bg-white border border-[#D3C6B4] rounded-xl p-5 shadow-sm sticky top-24">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-[#F0E3D1] pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#311A0A] font-serif">
                  Categories
                </h3>
                {(activeCategory !== 'All' || showWishlistOnly) && (
                  <button
                    onClick={() => {
                      setActiveCategory('All');
                      setShowWishlistOnly(false);
                    }}
                    className="text-[11px] font-bold text-[#6A330E] hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const count = cat === 'All' ? products.length : products.filter((p) => p.category === cat).length;
                  const active = activeCategory === cat && !showWishlistOnly;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setShowWishlistOnly(false);
                        setActiveCategory(cat);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-semibold flex items-center justify-between transition-colors ${
                        active
                          ? 'bg-[#311A0A] text-[#F9F3EC]'
                          : 'text-[#544333] hover:bg-[#F9F3EC] hover:text-[#311A0A]'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        active ? 'bg-[#ECB85A] text-[#1C0A02]' : 'bg-[#F9F3EC] text-[#544333]'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spice Filter */}
            <div className="border-t border-[#F0E3D1] pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#311A0A] font-serif mb-2.5">
                Spice Flavor
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {spiceLevels.map((spice) => (
                  <button
                    key={spice}
                    onClick={() => setSelectedSpice(spice)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                      selectedSpice === spice
                        ? 'bg-[#6A330E] text-[#F9F3EC]'
                        : 'bg-[#F9F3EC] text-[#544333] hover:bg-[#F0E3D1]'
                    }`}
                  >
                    {spice}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="border-t border-[#F0E3D1] pt-4">
              <div className="flex justify-between text-xs font-bold text-[#311A0A] mb-1">
                <span>Max Base Price</span>
                <span>Rs. {maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max="3500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#311A0A] cursor-pointer"
              />
            </div>
          </div>

          {/* Product Grid Area (9 cols) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#D3C6B4] rounded-2xl p-12 text-center space-y-3">
                <PackageSearch className="w-12 h-12 text-[#6A330E] mx-auto opacity-70" />
                <h3 className="text-lg font-bold font-serif text-[#311A0A]">No Nimco items match your filter</h3>
                <p className="text-xs text-[#544333] max-w-sm mx-auto">
                  Try adjusting your search keywords, category filter, or spice preferences.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setActiveCategory('All');
                      setSelectedSpice('All');
                      setMaxPrice(3500);
                      setSearchQuery('');
                      setShowWishlistOnly(false);
                    }}
                    className="bg-[#311A0A] text-[#F9F3EC] text-xs font-bold px-4 py-2 rounded-lg"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-3.5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
