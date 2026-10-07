import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhatsAppButton = () => {
  const { generateWhatsAppLink } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleSend = () => {
    const text = customMsg.trim() || "Assalam-o-Alaikum! I have a question about ordering Nimco.";
    window.open(generateWhatsAppLink(text), '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Popover Chat Box */}
      {isOpen && (
        <div className="mb-3 w-80 bg-amber-950 border border-emerald-600/60 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 text-amber-50">
          
          <div className="bg-emerald-700 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-emerald-900 flex items-center justify-center font-bold text-white">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-300 rounded-full border border-emerald-700" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-serif">Khandani Nimco WhatsApp Helpline</h4>
                <p className="text-[10px] text-emerald-100">Live agent usually replies instantly</p>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} className="text-emerald-100 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-[#042f2e] space-y-3">
            <div className="bg-[#022c22] border border-emerald-700 p-3 rounded-2xl text-xs space-y-1">
              <p className="font-medium text-emerald-100">
                👋 Assalam-o-Alaikum! Welcome to Khandani Nimco - Asli Karachi Ka Zaiqa. How can we help you order fresh snacks today?
              </p>
              <span className="text-[9px] text-amber-400 block text-right">Just now</span>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Apna sawal ya order yahan likhein..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full bg-emerald-950 border border-emerald-700 rounded-xl px-3 py-2 text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:border-amber-400"
              />

              <button
                onClick={handleSend}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start WhatsApp Chat</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Floating Circle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 border-2 border-emerald-300/40"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white/10" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-yellow-400 rounded-full border-2 border-amber-950 animate-pulse" />
      </button>

    </div>
  );
};
