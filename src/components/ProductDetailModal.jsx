import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  ShoppingBag,
  MessageCircle,
  Check,
  ShieldCheck,
  Flame,
  Scale,
  Sparkles,
  Heart,
  Plus,
  Minus,
  MessageSquarePlus,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductDetailModal = () => {
  const {
    selectedProductModal,
    setSelectedProductModal,
    addToCart,
    generateWhatsAppLink,
    formatPrice,
    toggleWishlist,
    isWishlisted,
    addProductReview
  } = useStore();

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const weightOptions = product.weightOptions || [
    { label: "250 Grams", value: 0.25, priceMultiplier: 1 },
    { label: "500 Grams", value: 0.5, priceMultiplier: 1.9 },
    { label: "1 KG Pack", value: 1.0, priceMultiplier: 3.6 }
  ];

  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'reviews'
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Review form state
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
    setActiveTab('details');
    setReviewSuccess(false);
  }, [product]);

  const unitPrice = Math.round(product.price * selectedWeight.priceMultiplier);
  const totalPrice = unitPrice * quantity;
  const isFav = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setSelectedProductModal(null);
    }, 900);
  };

  const handleWhatsAppDirect = () => {
    const text = `Assalam-o-Alaikum! I want to order from Khandani Nimco:\n\n*Product:* ${product.name}\n*Weight:* ${selectedWeight.label}\n*Quantity:* ${quantity}\n*Total:* ${formatPrice(totalPrice)}\n\nPlease confirm availability and delivery slot.`;
    window.open(generateWhatsAppLink(text), '_blank');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewForm.user.trim() || !reviewForm.comment.trim()) {
      alert('Please enter your name and review comments.');
      return;
    }

    addProductReview(product.id, reviewForm);
    setReviewSuccess(true);
    setReviewForm({ user: '', city: 'Karachi', rating: 5, comment: '' });
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#042f2e] border-2 border-emerald-700 rounded-3xl overflow-hidden shadow-2xl text-emerald-50 my-6"
        >
          {/* Top Bar with Wishlist and Close */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow ${
                isFav
                  ? 'bg-rose-500 text-white'
                  : 'bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 hover:text-white border border-emerald-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={() => setSelectedProductModal(null)}
              className="p-2 text-emerald-200 hover:text-white bg-emerald-900/80 hover:bg-emerald-800 rounded-full transition-colors border border-emerald-700 shadow"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
            
            {/* Product Image Showcase */}
            <div className="relative aspect-square md:aspect-auto bg-emerald-950 min-h-[280px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#042f2e] via-transparent to-transparent opacity-80" />
              
              {/* Badges on Image */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.badge && (
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-400 text-emerald-950 font-black text-xs uppercase px-3 py-1 rounded-full shadow-md">
                    {product.badge}
                  </span>
                )}
                {product.spiceLevel && (
                  <span className="bg-black/60 backdrop-blur-sm text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-700/50">
                    <Flame className="w-3 h-3 text-red-400" />
                    {product.spiceLevel}
                  </span>
                )}
              </div>

              {/* Freshness Tag bottom */}
              <div className="absolute bottom-4 left-4 right-4 bg-emerald-950/90 backdrop-blur-sm border border-emerald-700/80 p-3 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Nitrogen-Sealed Crispness</span>
                </div>
                <span className="text-amber-300 text-[11px] font-bold">100% Halal Food</span>
              </div>
            </div>

            {/* Details & Interactive Controls */}
            <div className="p-5 sm:p-6 flex flex-col justify-between space-y-4">
              
              <div className="space-y-3">
                {/* Category & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest bg-emerald-900/60 px-2.5 py-1 rounded-full border border-emerald-700">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{product.rating || '4.9'}</span>
                    <span className="text-emerald-400 text-[11px]">({product.reviewsCount || 12} reviews)</span>
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="text-lg sm:text-xl font-black text-white leading-snug font-serif">
                  {product.name}
                </h3>

                {/* Tab Navigation: Details vs Reviews */}
                <div className="flex border-b border-emerald-800 text-xs gap-4 pt-1">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 font-bold transition-all ${
                      activeTab === 'details'
                        ? 'text-amber-400 border-b-2 border-amber-400'
                        : 'text-emerald-300/70 hover:text-white'
                    }`}
                  >
                    Product Details
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2 font-bold transition-all ${
                      activeTab === 'reviews'
                        ? 'text-amber-400 border-b-2 border-amber-400'
                        : 'text-emerald-300/70 hover:text-white'
                    }`}
                  >
                    Reviews ({product.reviews?.length || product.reviewsCount || 0})
                  </button>
                </div>

                {activeTab === 'details' ? (
                  <div className="space-y-3">
                    <p className="text-xs text-emerald-200/90 leading-relaxed">
                      {product.description}
                    </p>

                    {product.ingredients && (
                      <div className="bg-emerald-950/60 border border-emerald-800 p-2.5 rounded-xl text-[11px] text-emerald-300">
                        <strong className="text-amber-300">Ingredients:</strong> {product.ingredients}
                      </div>
                    )}

                    {/* Weight Pack Size Selector */}
                    <div className="space-y-1.5 pt-1">
                      <label className="text-xs font-bold text-amber-300 flex items-center gap-1">
                        <Scale className="w-3.5 h-3.5" />
                        Select Pack Weight:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {weightOptions.map((opt) => {
                          const optPrice = Math.round(product.price * opt.priceMultiplier);
                          const isSelected = selectedWeight.label === opt.label;
                          return (
                            <button
                              key={opt.label}
                              type="button"
                              onClick={() => setSelectedWeight(opt)}
                              className={`p-2 rounded-xl text-center border text-xs transition-all ${
                                isSelected
                                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-emerald-950 font-black border-amber-300 shadow-md'
                                  : 'bg-emerald-900/50 border-emerald-800 text-emerald-200 hover:border-emerald-600'
                              }`}
                            >
                              <span className="block text-[11px] font-bold">{opt.label}</span>
                              <span className="block text-[10px] mt-0.5 opacity-90">{formatPrice(optPrice)}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quantity Counter */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-bold text-emerald-200">Quantity:</span>
                      <div className="flex items-center bg-emerald-900 border border-emerald-700 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-800"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-black text-white min-w-[28px] text-center font-mono">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-800"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* REVIEWS TAB */
                  <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                    {/* Existing reviews */}
                    <div className="space-y-2.5">
                      {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((rev) => (
                          <div
                            key={rev.id}
                            className="bg-emerald-900/40 border border-emerald-800 p-3 rounded-2xl text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">{rev.user} ({rev.city})</span>
                              <div className="flex items-center text-amber-400">
                                {[...Array(rev.rating || 5)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-emerald-200/90 text-[11px] leading-relaxed italic">
                              "{rev.comment}"
                            </p>
                            <span className="text-[10px] text-emerald-400/80 block">
                              {rev.date}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-emerald-300">No reviews yet. Be the first to review!</p>
                      )}
                    </div>

                    {/* Review Form */}
                    <form onSubmit={handleSubmitReview} className="bg-emerald-900/60 border border-emerald-700 p-3.5 rounded-2xl space-y-2.5">
                      <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1">
                        <MessageSquarePlus className="w-3.5 h-3.5" />
                        Leave a Review:
                      </h4>

                      {reviewSuccess && (
                        <div className="p-2 bg-emerald-600/30 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Review submitted successfully!</span>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Your Name (e.g. Asad)"
                          value={reviewForm.user}
                          onChange={(e) => setReviewForm({ ...reviewForm, user: e.target.value })}
                          className="bg-emerald-950 border border-emerald-700 rounded-xl p-2 text-xs text-emerald-100 placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                        />
                        <select
                          value={reviewForm.city}
                          onChange={(e) => setReviewForm({ ...reviewForm, city: e.target.value })}
                          className="bg-emerald-950 border border-emerald-700 rounded-xl p-2 text-xs text-emerald-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
                        >
                          <option value="Karachi">Karachi</option>
                          <option value="Lahore">Lahore</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Multan">Multan</option>
                          <option value="Other">Other City</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-emerald-200">
                        <span>Rating:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                              className="text-amber-400"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  star <= reviewForm.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-emerald-700'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Write your experience with this Nimco..."
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        className="w-full bg-emerald-950 border border-emerald-700 rounded-xl p-2 text-xs text-emerald-100 placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-emerald-950 font-bold py-2 rounded-xl text-xs shadow"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Price & Action Bottom Controls */}
              <div className="pt-3 border-t border-emerald-800 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-emerald-300 block">Total Amount:</span>
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <span className="text-xs text-emerald-300">
                    ({selectedWeight.label} x {quantity})
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                      addedAnimation
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-emerald-950'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleWhatsAppDirect}
                    className="py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-600"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order via WhatsApp</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
