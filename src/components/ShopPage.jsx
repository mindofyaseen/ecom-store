import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, Sparkles, PackageSearch, X } from 'lucide-react';

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

  const spiceLevels = ['All', 'Mild', 'Medium', 'Hot & Spicy', 'Extra Spicy', 'Sweet'];

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
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
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
    <div className="min-h-screen bg-[#faf7f2] py-8 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Page Title & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#eaddcb] pb-4">
          <div>
            <span className="text-xs font-bold text-[#a16207] uppercase tracking-widest block font-serif">
              Khandani Nimco Official Store Catalog - Asli Karachi Ka Zaiqa
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-[#200e08] font-serif">
              {showWishlistOnly ? 'My Favorite Nimco' : activeCategory === 'All' ? 'All Traditional Snacks & Sweets' : `${activeCategory} Collection`}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-4 py-2 bg-amber-900 text-yellow-300 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Filter className="w-4 h-4" />
              <span>Filters ({filteredProducts.length})</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-amber-200/80 rounded-2xl px-3 py-1.5 text-xs shadow-sm">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-800" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-amber-950 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Layout: Filter Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className={`lg:col-span-3 bg-white border border-amber-800/15 rounded-3xl p-5 space-y-6 shadow-md ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}>
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-sm text-amber-950 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-700" />
                Filter Options
              </h3>
              {(activeCategory !== 'All' || selectedSpice !== 'All' || searchQuery !== '') && (
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setSelectedSpice('All');
                    setSearchQuery('');
                    setMaxPrice(3500);
                  }}
                  className="text-[11px] text-rose-600 hover:underline font-bold"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">Search by keyword:</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Kaju, Moth, Papri..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-amber-50/50 border border-amber-200 rounded-xl py-2 pl-8 pr-3 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <Search className="w-3.5 h-3.5 text-amber-600 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-xs font-black text-amber-950 uppercase tracking-wider block">
                Categories:
              </label>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const isSelected = !showWishlistOnly && activeCategory === cat;
                  const count = cat === 'All' ? products.length : products.filter((p) => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setShowWishlistOnly(false);
                        setActiveCategory(cat);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-amber-900 text-yellow-300 shadow-sm'
                          : 'text-gray-700 hover:bg-amber-50'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                        isSelected ? 'bg-yellow-400 text-amber-950' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spice Levels */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs font-black text-amber-950 uppercase tracking-wider block">
                Spice Preference:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {spiceLevels.map((spice) => (
                  <button
                    key={spice}
                    onClick={() => setSelectedSpice(spice)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                      selectedSpice === spice
                        ? 'bg-amber-950 text-yellow-300 border-amber-950'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    {spice}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs">
                <span className="font-black text-amber-950 uppercase tracking-wider">Max Price:</span>
                <span className="font-black text-amber-900">Rs. {maxPrice}</span>
              </div>
              <input
                type="range"
                min="200"
                max="3500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
                <span>Rs. 200</span>
                <span>Rs. 3,500</span>
              </div>
            </div>

          </aside>

          {/* Products Grid Column */}
          <div className="lg:col-span-9 space-y-4">
            
            <div className="flex items-center justify-between text-xs text-gray-600 bg-white p-3 rounded-2xl border border-[#eaddcb] shadow-sm">
              <span>
                Showing <strong className="text-[#200e08] font-black">{filteredProducts.length}</strong> items matching your selection
              </span>
              <span className="text-[11px] text-[#16a34a] font-bold">
                ⚡ Express Delivery across Pakistan
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-amber-800/20 rounded-3xl p-16 text-center space-y-4 shadow-sm">
                <PackageSearch className="w-14 h-14 text-amber-700 mx-auto" />
                <h3 className="text-lg font-bold text-amber-950">No snacks match your filters</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Try clearing the search query or adjusting your price and spice preferences.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setSelectedSpice('All');
                    setSearchQuery('');
                    setMaxPrice(3500);
                  }}
                  className="bg-yellow-400 text-amber-950 font-black px-6 py-2.5 rounded-xl text-xs shadow hover:bg-yellow-300"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
