import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Lock, KeyRound, ArrowRight, X, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AdminPasswordModal = ({ isOpen, onClose }) => {
  const { verifyAdminPassword, setViewMode } = useStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleUnlock = (e) => {
    e.preventDefault();
    const success = verifyAdminPassword(pin);
    if (success) {
      setError(false);
      setViewMode('admin');
      onClose();
    } else {
      setError(true);
      setPin('');
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
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-lg font-black text-white">
              Admin Access Protected
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Enter authorized administrator password to manage store inventory, orders & settings.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-3">
            <div className="relative">
              <input
                required
                type="password"
                placeholder="Enter Admin Password..."
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                className={`w-full bg-slate-950 border rounded-2xl py-3 pl-10 pr-4 text-sm text-center font-mono tracking-widest text-white focus:outline-none transition-all ${
                  error
                    ? 'border-rose-500 ring-2 ring-rose-500/20'
                    : 'border-slate-700 focus:border-amber-500'
                }`}
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            {error && (
              <p className="text-xs text-rose-400 flex items-center justify-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                Incorrect password! Try: <strong>admin123</strong>
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
            Default credentials for demonstration: <code className="text-amber-400 font-mono">admin123</code>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
