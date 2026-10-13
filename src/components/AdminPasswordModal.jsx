import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, KeyRound, ArrowRight, X, AlertCircle, ShieldAlert } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AdminPasswordModal = ({ isOpen, onClose }) => {
  const { verifyAdminPassword, isAdminAuthModalOpen, setIsAdminAuthModalOpen, siteConfig } = useStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // If isOpen is explicitly passed as prop, use that; otherwise use global state
  const shouldShow = isOpen !== undefined ? isOpen : isAdminAuthModalOpen;

  // Countdown timer if locked out
  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const interval = setInterval(() => {
      setLockoutRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutRemaining]);

  if (!shouldShow) return null;

  const handleClose = () => {
    setIsAdminAuthModalOpen(false);
    setError(false);
    setPin('');
    if (onClose) onClose();
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (lockoutRemaining > 0) return;

    const success = verifyAdminPassword(pin.trim());
    if (success) {
      setError(false);
      setPin('');
      setFailedAttempts(0);
      setIsAdminAuthModalOpen(false);
      if (onClose) onClose();
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      setError(true);
      setPin('');

      // Anti brute-force lockout after 5 consecutive failures
      if (newAttempts >= 5) {
        setLockoutRemaining(60); // 60 seconds lockout
        setFailedAttempts(0);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-100 shadow-2xl space-y-5 text-center"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7 text-amber-400" />
          </div>

          <div>
            <h3 className="text-lg font-black text-white font-serif">
              {siteConfig?.storeName || 'Khandani Nimco'} Admin Panel
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Store inventory, live customizer & order management access ke liye password darj karein.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-3">
            <div className="relative">
              <input
                autoFocus
                required
                type="password"
                disabled={lockoutRemaining > 0}
                placeholder={lockoutRemaining > 0 ? `Locked for ${lockoutRemaining}s` : "Enter Admin Password..."}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                className={`w-full bg-slate-950 border rounded-2xl py-3 pl-10 pr-4 text-sm text-center font-mono tracking-widest text-white focus:outline-none transition-all ${
                  lockoutRemaining > 0
                    ? 'border-rose-900 opacity-60 cursor-not-allowed'
                    : error
                    ? 'border-rose-500 ring-2 ring-rose-500/20'
                    : 'border-slate-700 focus:border-amber-500'
                }`}
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            {lockoutRemaining > 0 ? (
              <p className="text-xs text-rose-400 flex items-center justify-center gap-1.5 font-medium">
                <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Security lockout active. Try again in {lockoutRemaining}s.</span>
              </p>
            ) : error ? (
              <p className="text-xs text-rose-400 flex items-center justify-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Incorrect password! Attempts: {failedAttempts}/5</span>
              </p>
            ) : null}

            <button
              type="submit"
              disabled={lockoutRemaining > 0}
              className={`w-full font-black py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                lockoutRemaining > 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 transform hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              <span>{lockoutRemaining > 0 ? `Please Wait (${lockoutRemaining}s)` : 'Unlock Admin Panel'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800 flex items-center justify-center gap-1.5">
            <span>🛡️ Protected by 60s Brute-Force Rate Limiter</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
