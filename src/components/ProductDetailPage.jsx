import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  Flame,
  Scale,
  Plus,
  Minus,
  Heart,
  Share2,
  CheckCircle2,
  PackageCheck,
  ChevronRight,
  MessageSquarePlus,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductDetailPage = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    generateWhatsAppLink,
    formatPrice,
    toggleWishlist,
    isWishlisted,
    navigateTo,
    openProductPage,
    setIsCheckoutOpen,
    initiateCheckout,
    selectedCity,
    currentCityInfo,
    addProductReview
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const weightOptions = product?.weightOptions || [
    { label: "250 Grams", value: 0.25, priceMultiplier: 1 },
    { label: "500 Grams", value: 0.5, priceMultiplier: 1.9 },
    { label: "1 KG Pack", value: 1.0, priceMultiplier: 3.6 }
  ];

  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'ingredients' | 'shipping' | 'reviews'
  const [addedToast, setAddedToast] = useState(false);

  // Review Form state
  const [reviewForm, setReviewForm] = useState({
    user: '',
    city: 'Karachi',
    rating: 5,
    comment: ''
  });
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    setSelectedWeight(weightOptions[0]);
    setQuantity(1);
    setActiveTab('description');
    setReviewSuccess(false);
  }, [product]);

  if (!product) return null;

  const unitPrice = Math.round(product.price * selectedWeight.priceMultiplier);
  const originalPrice = Math.round(unitPrice * 1.15); // 15% discount strikethrough for e-commerce feel
  const totalPrice = unitPrice * quantity;
  const isFav = isWishlisted(product.id);

  // Related products from same category or random
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isPopular))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, quantity);
    initiateCheckout();
  };

  const handleWhatsAppOrder = () => {
    const text = `Assalam-o-Alaikum! I want to order this snack from Khandani Nimco:\n\n*Product:* ${product.name}\n*Weight:* ${selectedWeight.label}\n*Quantity:* ${quantity}\n*Price:* ${formatPrice(totalPrice)}\n\nPlease confirm availability and delivery slot.`;
    window.open(generateWhatsAppLink(text), '_blank');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewForm.user.trim() || !reviewForm.comment.trim()) {
      alert('Please fill in your name and comments.');
      return;
    }
    addProductReview(product.id, reviewForm);
    setReviewSuccess(true);
    setReviewForm({ user: '', city: 'Karachi', rating: 5, comment: '' });
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="min-h-screen bg-[#fcf8f2] py-8 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-amber-800 font-medium">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-amber-950 hover:underline"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-amber-600" />
          <button
            onClick={() => navigateTo('shop')}
            className="hover:text-amber-950 hover:underline"
          >
            Shop Snacks
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-amber-900/60">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-amber-600" />
          <span className="font-bold text-amber-950 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100/70 hover:bg-amber-200/80 px-3.5 py-1.5 rounded-xl border border-amber-300/60 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Products</span>
        </button>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-amber-800/15 rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-amber-50 border border-amber-200/60 shadow-inner group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="bg-yellow-400 text-amber-950 font-black text-xs uppercase px-3 py-1 rounded-full shadow-md">
                    {product.badge}
                  </span>
                )}
                {product.spiceLevel && (
                  <span className="bg-amber-950/80 backdrop-blur-sm text-yellow-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
                    <Flame className="w-3.5 h-3.5 text-red-400" />
                    {product.spiceLevel}
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-lg transition-all ${
                  isFav
                    ? 'bg-rose-500 text-white scale-110'
                    : 'bg-white/80 hover:bg-white text-gray-700 hover:text-rose-500'
                }`}
                title="Add to wishlist"
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Freshness & Trust Features Strip */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-amber-50/80 border border-amber-200/60 p-3 rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="font-bold text-gray-900 block text-[11px]">100% Halal</span>
                <span className="text-[10px] text-gray-500">Pure Edible Oil</span>
              </div>
              <div className="bg-amber-50/80 border border-amber-200/60 p-3 rounded-2xl">
                <Sparkles className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                <span className="font-bold text-gray-900 block text-[11px]">Daily Fresh</span>
                <span className="text-[10px] text-gray-500">Nitrogen Sealed</span>
              </div>
              <div className="bg-amber-50/80 border border-amber-200/60 p-3 rounded-2xl">
                <Truck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <span className="font-bold text-gray-900 block text-[11px]">Fast Delivery</span>
                <span className="text-[10px] text-gray-500">All Pakistan</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Pricing, Quantity & Buying Options */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              {/* Category, Rating & SKU */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-amber-800">
                <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px]">
                  {product.category}
                </span>

                <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-gray-900 font-black">{product.rating}</span>
                  <span className="text-gray-500 text-[11px]">({product.reviewsCount} customer reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-black text-amber-950 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price Calculation */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-3xl sm:text-4xl font-black text-amber-900">
                  {formatPrice(unitPrice)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(originalPrice)}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full uppercase">
                  Save 15%
                </span>
              </div>

              {/* Short description */}
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>

              {/* Pack Weight Options */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-amber-700" />
                    Select Pack Size:
                  </span>
                  <span className="text-amber-800 font-bold">Selected: {selectedWeight.label}</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {weightOptions.map((opt) => {
                    const isSelected = selectedWeight.label === opt.label;
                    const optPrice = Math.round(product.price * opt.priceMultiplier);
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setSelectedWeight(opt)}
                        className={`p-3 rounded-2xl border-2 text-center transition-all ${
                          isSelected
                            ? 'bg-amber-900 text-yellow-300 border-amber-900 shadow-md transform -translate-y-0.5'
                            : 'bg-amber-50/50 text-gray-800 border-amber-200/80 hover:border-amber-400 hover:bg-white'
                        }`}
                      >
                        <span className="block font-bold text-xs">{opt.label}</span>
                        <span className={`block text-xs font-black mt-0.5 ${isSelected ? 'text-white' : 'text-amber-900'}`}>
                          {formatPrice(optPrice)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Counter & Stock Status */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-700">Quantity:</span>
                  <div className="flex items-center bg-gray-100 border border-gray-300 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-gray-600 hover:text-black hover:bg-gray-200"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3.5 text-xs font-black text-gray-900 min-w-[28px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-gray-600 hover:text-black hover:bg-gray-200"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  {isOutOfStock ? (
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                      Out of Stock
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      In Stock ({product.stock} packs left)
                    </span>
                  )}
                </div>
              </div>

              {/* Delivery Estimation Box for City */}
              <div className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-2xl text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-amber-950">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-800" />
                    Delivering to {selectedCity}:
                  </span>
                  <span className="text-emerald-700 font-extrabold">
                    {currentCityInfo?.deliveryEstimate || '24-48 Hours'}
                  </span>
                </div>
                <p className="text-gray-600 text-[11px]">
                  Order within next <strong className="text-amber-950">3 hours</strong> for same-day dispatch. Cash on Delivery available!
                </p>
              </div>

            </div>

            {/* CTAs / Purchase Buttons */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Add to Basket */}
                <button
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className={`py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                    isOutOfStock
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-amber-950'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedToast ? 'Added to Basket!' : `Add to Cart - ${formatPrice(totalPrice)}`}</span>
                </button>

                {/* Buy Now / Instant Checkout */}
                <button
                  disabled={isOutOfStock}
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm bg-amber-950 hover:bg-amber-900 text-yellow-300 flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <PackageCheck className="w-4 h-4 text-yellow-400" />
                  <span>Buy Now (Express)</span>
                </button>
              </div>

              {/* Direct WhatsApp Order */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 px-6 rounded-2xl font-bold text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Quick Order via WhatsApp Helpline</span>
              </button>

            </div>

          </div>

        </div>

        {/* Detailed Tabs & Accordion Section */}
        <div className="bg-white border border-amber-800/15 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
          
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200 gap-6 overflow-x-auto pb-1">
            {[
              { key: 'description', label: 'Taste Profile & Description' },
              { key: 'ingredients', label: 'Key Ingredients & Halal' },
              { key: 'shipping', label: 'Packaging & Express Shipping' },
              { key: 'reviews', label: `Verified Reviews (${product.reviewsCount || 0})` }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 text-xs sm:text-sm font-black whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.key
                    ? 'border-amber-800 text-amber-950'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'description' && (
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed max-w-3xl">
              <h3 className="text-lg font-black text-amber-950">
                Authentic Karachi Heritage Recipe
              </h3>
              <p>
                {product.description} Hand-crafted with centuries-old frying and spice-blending traditions perfected at Burns Road, Karachi.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-1">
                  <h4 className="font-bold text-xs text-amber-950">Crispness Retention</h4>
                  <p className="text-xs text-gray-600">
                    Nitrogen flushed sealed packets ensure the crunch stays intact for up to 90 days from the packaging date.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-1">
                  <h4 className="font-bold text-xs text-amber-950">Serving Suggestion</h4>
                  <p className="text-xs text-gray-600">
                    Pairs deliciously with evening Karak Chai, Kashmiri Pink Tea, or served as a welcoming snack for guests.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="space-y-4 text-sm text-gray-700 max-w-3xl">
              <h3 className="text-lg font-black text-amber-950">
                Clean, Natural & Halal Ingredients
              </h3>
              <p className="bg-amber-50 p-4 rounded-2xl border border-amber-200/80 font-mono text-xs text-amber-950">
                {product.ingredients || "Gram Flour (Besan), Spices, Himalayan Salt, Edible Vegetable Oil."}
              </p>
              <ul className="space-y-2 text-xs text-gray-600 list-disc list-inside">
                <li>100% Halal certified and prepared in a sanitized food-grade facility.</li>
                <li>Zero artificial chemical preservatives or synthetic coloring.</li>
                <li>Cooked in premium edible oil, tested daily for optimal hygiene.</li>
              </ul>
            </div>
          )}

          {/* Tab 3: Shipping */}
          {activeTab === 'shipping' && (
            <div className="space-y-4 text-sm text-gray-700 max-w-3xl">
              <h3 className="text-lg font-black text-amber-950">
                Nationwide Express Courier Dispatch
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl border border-gray-200 space-y-1">
                  <h4 className="font-bold text-gray-900">Karachi Orders:</h4>
                  <p className="text-gray-600">
                    Delivered via our in-house express dispatch riders within 24 to 48 hours directly to your doorstep.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-gray-200 space-y-1">
                  <h4 className="font-bold text-gray-900">Punjab, KPK, Balochistan:</h4>
                  <p className="text-gray-600">
                    Dispatched via TCS Air and Leopards Express. Standard delivery time is 2-3 business days.
                  </p>
                </div>
              </div>
              <p className="text-xs text-emerald-700 font-bold">
                🚚 Free shipping automatically applies on all orders totaling Rs. 1,500 or more!
              </p>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Reviews List */}
                <div className="md:col-span-7 space-y-3">
                  <h3 className="text-base font-black text-amber-950">
                    Customer Feedback & Ratings
                  </h3>

                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-1.5 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900">{rev.user} ({rev.city})</span>
                          <div className="flex text-amber-500">
                            {[...Array(rev.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed italic">
                          "{rev.comment}"
                        </p>
                        <span className="text-[10px] text-gray-400 block">{rev.date}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">
                      Be the first to share your experience with this delicious Nimco!
                    </p>
                  )}
                </div>

                {/* Submit Review Form */}
                <div className="md:col-span-5 bg-amber-50/80 border border-amber-200 p-5 rounded-3xl space-y-3 text-xs">
                  <h4 className="font-black text-amber-950 flex items-center gap-1.5">
                    <MessageSquarePlus className="w-4 h-4 text-amber-800" />
                    Write a Customer Review:
                  </h4>

                  {reviewSuccess && (
                    <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Review published successfully! Thank you.</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmitReview} className="space-y-3">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Your Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Tariq Mehmood"
                        value={reviewForm.user}
                        onChange={(e) => setReviewForm({ ...reviewForm, user: e.target.value })}
                        className="w-full bg-white border border-gray-300 rounded-xl p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold text-gray-700 block mb-1">City *</label>
                        <select
                          value={reviewForm.city}
                          onChange={(e) => setReviewForm({ ...reviewForm, city: e.target.value })}
                          className="w-full bg-white border border-gray-300 rounded-xl p-2.5 text-xs text-gray-900"
                        >
                          <option value="Karachi">Karachi</option>
                          <option value="Lahore">Lahore</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Multan">Multan</option>
                          <option value="Peshawar">Peshawar</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-gray-700 block mb-1">Rating</label>
                        <div className="flex items-center gap-1 py-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                              className="text-amber-400"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  star <= reviewForm.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Your Feedback *</label>
                      <textarea
                        required
                        rows={2}
                        placeholder="How was the crunch, aroma, and taste?"
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        className="w-full bg-white border border-gray-300 rounded-xl p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-900 hover:bg-amber-800 text-white font-black py-2.5 rounded-xl text-xs shadow transition-colors"
                    >
                      Post Review
                    </button>
                  </form>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-5 pt-4">
            <div className="flex items-center justify-between border-b border-amber-800/15 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
                  Frequently Paired Snacks
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-amber-950">
                  Customers Also Ordered
                </h3>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 underline"
              >
                View Full Shop ➔
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
