import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Phone, AlertCircle, KeyRound, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
    setCooldown(60);
    setStep('verify');
    setInfoMsg(`Verification code sent to ${email}. Please check your inbox.`);
  };

  const handleVerifyOtp = (e) => {
    e?.preventDefault();
    setErrorMsg('');

    if (!otpCode.trim() || otpCode.length < 6) {
      setErrorMsg('Please enter the full 6-digit verification code.');
      return;
    }

    const res = verifyEmailOtp(email, otpCode.trim(), {
      name: name.trim() || email.split('@')[0],
      phone: phone.trim() || '03001234567',
      city: city || 'Karachi'
    });

    if (!res.success) {
      setErrorMsg(res.error);
      return;
    }

    setAuthModalMode(null);
    setStep('request');
    setOtpCode('');
  };

  const handlePasswordSubmit = (e) => {
    e?.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    loginUser({
      id: `usr_${Date.now()}`,
      email: email.trim(),
      name: name.trim() || email.split('@')[0],
      phone: phone.trim() || '03001234567',
      city: city || 'Karachi'
    });

    setAuthModalMode(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-white border border-[#D3C6B4] rounded-2xl overflow-hidden shadow-2xl text-[#311A0A] my-6"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#F9F3EC] border-b border-[#D3C6B4] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#311A0A] text-[#ECB85A] flex items-center justify-center font-bold text-sm shadow-sm font-serif">
                KN
              </div>
              <div>
                <h3 className="text-base font-bold font-serif text-[#311A0A]">
                  Khandani Nimco Account
                </h3>
                <p className="text-[11px] text-[#544333]">
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
              className="p-1.5 text-[#544333] hover:text-[#311A0A] bg-[#F0E3D1] hover:bg-[#D3C6B4] rounded-full transition-colors border border-[#D3C6B4]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-4 text-xs">
            
            {/* Prompt Alert */}
            {authPromptMessage && (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-amber-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{authPromptMessage}</span>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-300 rounded-lg text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Info Message */}
            {infoMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{infoMsg}</span>
              </div>
            )}

            {/* Live Verification Code Banner for convenient testing */}
            {lastGeneratedCode && step === 'verify' && (
              <div className="bg-[#F9F3EC] border border-[#ECB85A] p-3 rounded-xl text-center space-y-1">
                <span className="text-[10px] text-[#6A330E] font-bold uppercase tracking-wider block">
                  Email Verification Code
                </span>
                <span className="text-xl font-mono font-bold text-[#311A0A] tracking-widest block">
                  {lastGeneratedCode}
                </span>
                <span className="text-[10px] text-[#544333] block">
                  (Enter the code above or check your email)
                </span>
              </div>
            )}

            {/* Method Tabs */}
            <div className="flex bg-[#F0E3D1] p-1 rounded-lg border border-[#D3C6B4]">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('otp');
                  setErrorMsg('');
                }}
                className={`flex-1 py-1.5 rounded-md font-bold text-center transition-all ${
                  authMethod === 'otp'
                    ? 'bg-[#311A0A] text-[#F9F3EC] shadow-sm'
                    : 'text-[#544333] hover:text-[#311A0A]'
                }`}
              >
                Email Code (OTP)
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('password');
                  setErrorMsg('');
                }}
                className={`flex-1 py-1.5 rounded-md font-bold text-center transition-all ${
                  authMethod === 'password'
                    ? 'bg-[#311A0A] text-[#F9F3EC] shadow-sm'
                    : 'text-[#544333] hover:text-[#311A0A]'
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
                    <label className="text-[#311A0A] font-bold block mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg py-2.5 pl-9 pr-3 text-[#311A0A] placeholder-gray-400 focus:outline-none focus:border-[#311A0A]"
                      />
                      <Mail className="w-4 h-4 text-[#6A330E] absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[#311A0A] font-bold block mb-1">
                      Full Name (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Asad Siddiqui"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg py-2.5 pl-9 pr-3 text-[#311A0A] placeholder-gray-400 focus:outline-none focus:border-[#311A0A]"
                      />
                      <User className="w-4 h-4 text-[#6A330E] absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#311A0A] font-bold block mb-1">
                        WhatsApp Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="0324 2478108"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg py-2.5 pl-9 pr-2 text-[#311A0A] placeholder-gray-400 focus:outline-none focus:border-[#311A0A]"
                        />
                        <Phone className="w-4 h-4 text-[#6A330E] absolute left-3 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[#311A0A] font-bold block mb-1">City</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg py-2.5 px-3 text-[#311A0A] focus:outline-none focus:border-[#311A0A]"
                      >
                        {CITIES_LIST.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="p-2.5 bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg text-[11px] text-[#544333] flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#6A330E] shrink-0 mt-0.5" />
                    <span>
                      Anti-Spam Security: 6-digit verification code will be sent to your email with a 60-second cooldown.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ECB85A] hover:bg-[#DD8F25] text-[#1C0A02] font-black py-2.5 rounded-lg shadow-sm transition-all active:scale-95 text-xs flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-[#1C0A02]" />
                    <span>Send Verification Code</span>
                  </button>
                </form>
              ) : (
                /* Step 2: Verify Code */
                <form onSubmit={handleVerifyOtp} className="space-y-4 pt-1">
                  <div>
                    <label className="text-[#311A0A] font-bold block mb-1">
                      Enter 6-Digit Code sent to: <span className="text-[#6A330E]">{email}</span>
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full bg-[#F9F3EC] border-2 border-[#ECB85A] rounded-lg py-3 text-center text-xl font-mono font-bold text-[#311A0A] tracking-widest focus:outline-none focus:border-[#311A0A]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ECB85A] hover:bg-[#DD8F25] text-[#1C0A02] font-black py-2.5 rounded-lg shadow-sm transition-all active:scale-95 text-xs flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1C0A02]" />
                    <span>Verify Code & Sign In</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <button
                      type="button"
                      onClick={() => setStep('request')}
                      className="text-[#6A330E] hover:underline font-semibold"
                    >
                      ← Change Email
                    </button>

                    <button
                      type="button"
                      disabled={cooldown > 0}
                      onClick={handleSendOtp}
                      className={`font-semibold ${
                        cooldown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#6A330E] hover:underline'
                      }`}
                    >
                      {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend Code'}
                    </button>
                  </div>
                </form>
              )
            ) : (
              /* Password Sign In */
              <form onSubmit={handlePasswordSubmit} className="space-y-3 pt-1">
                <div>
                  <label className="text-[#311A0A] font-bold block mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg py-2.5 pl-9 pr-3 text-[#311A0A] placeholder-gray-400 focus:outline-none focus:border-[#311A0A]"
                    />
                    <Mail className="w-4 h-4 text-[#6A330E] absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="text-[#311A0A] font-bold block mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#F9F3EC] border border-[#D3C6B4] rounded-lg py-2.5 pl-9 pr-3 text-[#311A0A] placeholder-gray-400 focus:outline-none focus:border-[#311A0A]"
                    />
                    <KeyRound className="w-4 h-4 text-[#6A330E] absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ECB85A] hover:bg-[#DD8F25] text-[#1C0A02] font-black py-2.5 rounded-lg shadow-sm transition-all active:scale-95 text-xs flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4 text-[#1C0A02]" />
                  <span>Sign In</span>
                </button>
              </form>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
