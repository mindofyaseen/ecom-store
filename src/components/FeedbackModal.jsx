import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MessageSquareHeart, CheckCircle2, Send, Phone, User, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FeedbackModal = () => {
  const { isFeedbackModalOpen, setIsFeedbackModalOpen, addCustomerFeedback, currentUser } = useStore();

  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('Taste & Crunch');
  const [comment, setComment] = useState('');
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [submitted, setSubmitted] = useState(false);

  if (!isFeedbackModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addCustomerFeedback({
      customerName: name || 'Valued Customer',
      phone: phone || 'N/A',
      rating,
      category,
      comment
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsFeedbackModalOpen(false);
      setComment('');
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#F9F3EC] border border-[#D3C6B4] rounded-2xl overflow-hidden shadow-2xl text-[#311A0A] my-6"
        >
          {/* Header */}
          <div className="p-5 bg-[#311A0A] border-b border-[#D3C6B4]/30 flex items-center justify-between text-[#F9F3EC]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#ECB85A] text-[#311A0A] rounded-lg font-bold">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-serif text-[#F9F3EC] flex items-center gap-2">
                  Customer Feedback & Suggestions
                </h3>
                <p className="text-[11px] text-[#ECB85A]">Aapki raye Khandani Nimco ke liye sabse ahem hai</p>
              </div>
            </div>

            <button
              onClick={() => setIsFeedbackModalOpen(false)}
              className="p-1.5 text-[#D3C6B4] hover:text-[#F9F3EC] bg-white/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4 text-xs">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-[#ECB85A]/20 text-[#DD8F25] border border-[#ECB85A]/40 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold font-serif text-[#311A0A]">Shukriya! Feedback Received</h4>
                <p className="text-xs text-[#544333] max-w-xs mx-auto">
                  Aapki raye humare chef aur management tak pohonch chuki hai. We appreciate your love for Khandani Nimco!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Star Rating Selector */}
                <div className="bg-[#F0E3D1] border border-[#D3C6B4] p-3.5 rounded-xl text-center space-y-1.5">
                  <span className="text-[11px] font-bold text-[#6A330E] uppercase tracking-wider block">
                    Overall Experience:
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 transition-transform hover:scale-125"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= rating
                              ? 'fill-[#DD8F25] text-[#DD8F25]'
                              : 'text-[#D3C6B4]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#311A0A]">
                    {rating === 5 ? '⭐⭐⭐⭐⭐ Zabardast & Super Crunchy!' : rating === 4 ? '⭐⭐⭐⭐ Bohot Acha' : 'Satisfactory'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#311A0A] font-semibold block mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Asad Siddiqui"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-[#D3C6B4] rounded-lg p-2.5 text-[#311A0A] placeholder-[#8C7A6B] focus:outline-none focus:border-[#ECB85A]"
                    />
                  </div>

                  <div>
                    <label className="text-[#311A0A] font-semibold block mb-1">WhatsApp Mobile</label>
                    <input
                      type="tel"
                      placeholder="0300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-[#D3C6B4] rounded-lg p-2.5 text-[#311A0A] placeholder-[#8C7A6B] focus:outline-none focus:border-[#ECB85A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#311A0A] font-semibold block mb-1">Feedback Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-[#D3C6B4] rounded-lg p-2.5 text-[#311A0A] focus:outline-none focus:border-[#ECB85A]"
                  >
                    <option value="Taste & Crunch">Taste & Crunch (Zaiqa aur Karakra-pan)</option>
                    <option value="Packaging & Delivery">Air-tight Nitrogen Packaging & Speed</option>
                    <option value="Website & Ordering">Website & Easy Checkout Experience</option>
                    <option value="New Snack Suggestion">New Snack Request (Nayi Nimco ki farmaish)</option>
                    <option value="General Suggestion">General Suggestion</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#311A0A] font-semibold block mb-1">Your Comments & Suggestions *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Apna qeemti feedback yahan likhein..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-white border border-[#D3C6B4] rounded-lg p-2.5 text-[#311A0A] placeholder-[#8C7A6B] focus:outline-none focus:border-[#ECB85A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ECB85A] hover:bg-[#DD8F25] text-[#311A0A] font-bold py-3 rounded-lg text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Khandani Feedback</span>
                </button>

              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
