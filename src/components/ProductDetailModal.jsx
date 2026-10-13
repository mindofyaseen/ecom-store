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
  Heart,
  Plus,
  Minus
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
    whatsappNumber,
    siteConfig
  } = useStore();

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const weightOptions = product.weightOptions || [
    { label: "100 gm", value: 0.1, priceMultiplier: 1 },
    { label: "250 gm", value: 0.25, priceMultiplier: 2.2 },
    { label: "500 gm", value: 0.5, priceMultiplier: 4.2 }
  ];

  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    setSelectedWeight(weightOptions[0]);
    setQuantity(1);
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
    }, 800);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum! I want to order from Khandani Nimco:\n\n` +
      `*Product:* ${product.name}\n` +
      `*Weight:* ${selectedWeight.label}\n` +
      `*Quantity:* ${quantity}\n` +
      `*Total:* ${formatPrice(totalPrice)}\n\n` +
      `Please confirm delivery to my address.`
    );
    const activeWhatsapp = siteConfig?.whatsappNumber || whatsappNumber || '923242478108';
    window.open(`https://wa.me/${activeWhatsapp}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white border border-[#D3C6B4] rounded-2xl overflow-hidden shadow-2xl text-[#311A0A] my-6"
        >
          {/* Top Bar with Wishlist and Close */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-full transition-all shadow ${
                isFav
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 hover:bg-white text-[#544333] hover:text-rose-500 border border-[#D3C6B4]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={() => setSelectedProductModal(null)}
              className="p-2 text-[#311A0A] bg-white/90 hover:bg-[#F0E3D1] rounded-full transition-colors border border-[#D3C6B4] shadow"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Product Image Area */}
            <div className="relative aspect-square md:aspect-auto bg-[#F9F3EC] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#D3C6B4]">
              <img
                src={product.image}
                alt={product.name}
                className="w-4/5 h-4/5 object-contain"
              />
              
              {/* Badges on Image */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.badge && (
                  <span className="bg-[#ECB85A] text-[#1C0A02] font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                    {product.badge}
                  </span>
                )}
                {product.spiceLevel && (
                  <span className="bg-[#1C0A02]/85 text-[#ECB85A] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                    <Flame className="w-3 h-3 text-[#ECB85A]" />
                    {product.spiceLevel}
                  </span>
                )}
              </div>
            </div>

            {/* Details & Controls */}
            <div className="p-5 sm:p-6 flex flex-col justify-between space-y-4">
              
              <div className="space-y-3">
                {/* Category & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#6A330E] uppercase tracking-widest bg-[#F0E3D1] px-2.5 py-0.5 rounded-md border border-[#D3C6B4]">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#ECB85A]">
                    <Star className="w-3.5 h-3.5 fill-[#ECB85A]" />
                    <span className="font-bold text-[#311A0A]">{product.rating || '4.9'}</span>
                    <span className="text-[#544333] text-[11px]">({product.reviewsCount || 12})</span>
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold font-serif text-[#311A0A] leading-tight">
                  {product.name}
                </h3>

                {/* Price Display */}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#311A0A]">
                    {formatPrice(unitPrice)}
                  </span>
                  <span className="text-xs text-[#544333]">/ {selectedWeight.label}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#544333] leading-relaxed">
                  {product.description}
                </p>

                {/* Weight Options */}
                <div className="space-y-1.5 pt-2 border-t border-[#D3C6B4]/60">
                  <span className="text-[11px] font-bold text-[#311A0A] flex items-center gap-1 uppercase">
                    <Scale className="w-3.5 h-3.5 text-[#6A330E]" /> Pack Size:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {weightOptions.map((opt) => {
                      const isSelected = selectedWeight.label === opt.label;
                      const optPrice = Math.round(product.price * opt.priceMultiplier);
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => setSelectedWeight(opt)}
                          className={`p-2 rounded-lg border text-center transition-all ${
                            isSelected
                              ? 'bg-[#311A0A] text-[#F9F3EC] border-[#311A0A] shadow-sm'
                              : 'bg-[#F9F3EC] text-[#544333] border-[#D3C6B4] hover:border-[#6A330E]'
                          }`}
                        >
                          <span className="block text-[11px] font-bold">{opt.label}</span>
                          <span className={`block text-[10px] font-bold ${isSelected ? 'text-[#ECB85A]' : 'text-[#311A0A]'}`}>
                            {formatPrice(optPrice)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-[#544333]">Quantity:</span>
                  <div className="flex items-center bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 text-[#311A0A] hover:bg-[#F0E3D1]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-[#311A0A] min-w-[24px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1.5 text-[#311A0A] hover:bg-[#F0E3D1]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-[#D3C6B4]/60">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-2.5 px-4 rounded-lg font-black text-xs bg-[#ECB85A] hover:bg-[#DD8F25] text-[#1C0A02] flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#1C0A02]" />
                      <span>Add to Basket ({formatPrice(totalPrice)})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full py-2 px-4 rounded-lg font-bold text-xs bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
