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
          className="relative w-full max-w-lg bg-emerald-950 border border-emerald-800 rounded-3xl overflow-hidden shadow-2xl text-emerald-50 my-6"
        >
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-emerald-900 via-emerald-950 to-emerald-900 border-b border-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-400 text-emerald-950 rounded-xl font-black">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  Customer Feedback & Suggestions
                </h3>
                <p className="text-[11px] text-amber-300">Aapki raye Khandani Nimco ke liye sabse ahem hai</p>
              </div>
            </div>

            <button
              onClick={() => setIsFeedbackModalOpen(false)}
              className="p-1.5 text-emerald-300 hover:text-white bg-emerald-900/80 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4 text-xs">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-white">Shukriya! Feedback Received</h4>
                <p className="text-xs text-emerald-300 max-w-xs mx-auto">
                  Aapki raye humare chef aur management tak pohonch chuki hai. We appreciate your love for Khandani Nimco!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Star Rating Selector */}
                <div className="bg-emerald-900/40 border border-emerald-800 p-3.5 rounded-2xl text-center space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
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
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-emerald-800'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white">
                    {rating === 5 ? '⭐⭐⭐⭐⭐ Zabardast & Super Crunchy!' : rating === 4 ? '⭐⭐⭐⭐ Bohot Acha' : 'Satisfactory'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-emerald-300 font-bold block mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Asad Siddiqui"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl p-2.5 text-white placeholder-emerald-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-emerald-300 font-bold block mb-1">WhatsApp Mobile</label>
                    <input
                      type="tel"
                      placeholder="0300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl p-2.5 text-white placeholder-emerald-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-emerald-300 font-bold block mb-1">Feedback Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl p-2.5 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="Taste & Crunch">Taste & Crunch (Zaiqa aur Karakra-pan)</option>
                    <option value="Packaging & Delivery">Air-tight Nitrogen Packaging & Speed</option>
                    <option value="Website & Ordering">Website & Easy Checkout Experience</option>
                    <option value="New Snack Suggestion">New Snack Request (Nayi Nimco ki farmaish)</option>
                    <option value="General Suggestion">General Suggestion</option>
                  </select>
                </div>

                <div>
                  <label className="text-emerald-300 font-bold block mb-1">Your Comments & Suggestions *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Apna qeemti feedback yahan likhein..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl p-2.5 text-white placeholder-emerald-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-black py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
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
