import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Phone, MapPin, AlertCircle, Sparkles, KeyRound, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CITIES_LIST } from '../data/nimcoData';

export const AuthModal = () => {
  const {
    authModalMode,
    setAuthModalMode,
    authPromptMessage,
    sendEmailVerificationCode,
    verifyEmailOtp,
    loginUser,
    selectedCity
  } = useStore();

  const [authMethod, setAuthMethod] = useState('otp'); // 'otp' | 'password'
  const [step, setStep] = useState('request'); // 'request' | 'verify'

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(selectedCity || 'Karachi');
  const [otpCode, setOtpCode] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [lastGeneratedCode, setLastGeneratedCode] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  if (!authModalMode) return null;

  const handleSendOtp = (e) => {
    e?.preventDefault();
    setErrorMsg('');
    setInfoMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const res = sendEmailVerificationCode(email);
    if (!res.success) {
      setErrorMsg(res.error);
      return;
    }

    setLastGeneratedCode(res.code);
    setCooldown(60); // 60s cooldown to prevent spam
    setStep('verify');
    setInfoMsg(`A 6-digit verification code has been sent to ${email}. Check your primary inbox or Spam / Junk folder.`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!otpCode.trim() || otpCode.trim().length < 6) {
      setErrorMsg('Please enter the complete 6-digit verification code.');
      return;
    }

    const res = verifyEmailOtp(email, otpCode, { name, phone, city });
    if (!res.success) {
      setErrorMsg(res.error);
      return;
    }
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Please enter your email and password.');
      return;
    }
    loginUser(email, password);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#1c0f0a] border-2 border-[#a16207]/50 rounded-3xl overflow-hidden shadow-2xl text-[#eedfc8] my-6"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#241108] border-b border-[#3b1f13] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#d97706] to-[#e5a842] text-[#200e08] flex items-center justify-center font-black text-lg shadow-md font-serif">
                KN
              </div>
              <div>
                <h3 className="text-base font-black text-white font-serif">
                  Khandani Nimco Account
                </h3>
                <p className="text-[11px] text-amber-300">
                  {step === 'verify' ? 'Verify your 6-digit email code' : 'Sign in or register to complete your order'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setAuthModalMode(null);
                setErrorMsg('');
                setInfoMsg('');
              }}
              className="p-1.5 text-emerald-200 hover:text-white bg-emerald-900/80 rounded-full transition-colors border border-emerald-700/60"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-4 text-xs">
            
            {/* Order Checkout Prompt Alert */}
            {authPromptMessage && (
              <div className="p-3 bg-amber-400/20 border border-amber-400/40 rounded-2xl text-amber-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{authPromptMessage}</span>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-rose-950/80 border border-rose-500/80 rounded-2xl text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Info Message */}
            {infoMsg && (
              <div className="p-3 bg-emerald-900/80 border border-emerald-500/80 rounded-2xl text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{infoMsg}</span>
              </div>
            )}

            {/* Live Verification Code Banner for convenient testing */}
            {lastGeneratedCode && step === 'verify' && (
              <div className="bg-gradient-to-r from-amber-400/20 via-yellow-400/15 to-amber-400/20 border border-amber-400/60 p-3 rounded-2xl text-center space-y-1">
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                  Official Email OTP Sent
                </span>
                <span className="text-xl font-mono font-black text-amber-400 tracking-widest block">
                  {lastGeneratedCode}
                </span>
                <span className="text-[10px] text-emerald-300 block">
                  (Check your inbox or enter code above to verify)
                </span>
              </div>
            )}

            {/* Method Tabs: Email Code (OTP) vs Password */}
            <div className="flex bg-emerald-950 p-1 rounded-2xl border border-emerald-800">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('otp');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 rounded-xl font-bold text-center transition-all ${
                  authMethod === 'otp'
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-emerald-950 font-black shadow'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                Email Code (Fast & Safe)
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('password');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 rounded-xl font-bold text-center transition-all ${
                  authMethod === 'password'
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-emerald-950 font-black shadow'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                Password Sign In
              </button>
            </div>

            {authMethod === 'otp' ? (
              step === 'request' ? (
                /* Step 1: Request Code */
                <form onSubmit={handleSendOtp} className="space-y-3 pt-1">
                  <div>
                    <label className="text-emerald-200 font-bold block mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl py-2.5 pl-9 pr-3 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <Mail className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="text-emerald-200 font-bold block mb-1">
                      Full Name (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Asad Siddiqui"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl py-2.5 pl-9 pr-3 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <User className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-emerald-200 font-bold block mb-1">
                        WhatsApp Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="0300 1234567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl py-2.5 pl-9 pr-2 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                        />
                        <Phone className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="text-emerald-200 font-bold block mb-1">City</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl py-2.5 px-3 text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                      >
                        {CITIES_LIST.map((c) => (
                          <option key={c.name} value={c.name} className="bg-emerald-950">
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="p-2.5 bg-emerald-950/80 border border-emerald-800 rounded-xl text-[11px] text-emerald-300/90 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>
                      Anti-Spam Protection: 6-digit code will be sent to your email with a 60-second rate limit.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-black py-3 rounded-xl shadow-lg transition-all active:scale-95 text-xs flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send 6-Digit Verification Code</span>
                  </button>
                </form>
              ) : (
                /* Step 2: Verify Code */
                <form onSubmit={handleVerifyOtp} className="space-y-4 pt-1">
                  <div>
                    <label className="text-emerald-200 font-bold block mb-1">
                      Enter 6-Digit Code sent to: <span className="text-amber-300">{email}</span>
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full bg-emerald-900/80 border-2 border-amber-400/80 rounded-xl py-3 text-center text-xl font-mono font-black text-amber-300 tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950 border border-emerald-800 rounded-xl text-[11px] text-emerald-300 space-y-1">
                    <p className="font-semibold text-white">Inbox Notice:</p>
                    <p>
                      Agar code primary inbox mein na miley to barah-e-karam apna <strong>Spam / Junk / Promotions</strong> folder check karein.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-black py-3 rounded-xl shadow-lg transition-all active:scale-95 text-xs flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify Code & Sign In</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <button
                      type="button"
                      onClick={() => setStep('request')}
                      className="text-emerald-300 hover:text-white underline"
                    >
                      Change Email
                    </button>

                    <button
                      type="button"
                      disabled={cooldown > 0}
                      onClick={handleSendOtp}
                      className={`flex items-center gap-1 ${
                        cooldown > 0
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-amber-300 hover:text-white font-bold underline'
                      }`}
                    >
                      <RefreshCw className={`w-3 h-3 ${cooldown > 0 ? 'animate-spin' : ''}`} />
                      <span>{cooldown > 0 ? `Resend Code in ${cooldown}s` : 'Resend Code'}</span>
                    </button>
                  </div>
                </form>
              )
            ) : (
              /* Password Fallback Form */
              <form onSubmit={handlePasswordLogin} className="space-y-3 pt-1">
                <div>
                  <label className="text-emerald-200 font-bold block mb-1">Email *</label>
                  <div className="relative">
                    <input
                      required
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl py-2.5 pl-9 pr-3 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                    <Mail className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="text-emerald-200 font-bold block mb-1">Password *</label>
                  <div className="relative">
                    <input
                      required
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl py-2.5 pl-9 pr-3 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                    <KeyRound className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-black py-3 rounded-xl shadow-lg transition-all active:scale-95 text-xs flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Sign In with Password</span>
                </button>
              </form>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
