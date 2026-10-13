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
        <div className="mb-3 w-80 bg-[#F9F3EC] border border-[#D3C6B4] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 text-[#311A0A]">
          
          <div className="bg-[#25D366] p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#1b9e4b] flex items-center justify-center font-bold text-white">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-white rounded-full border border-[#25D366]" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-serif">Khandani Nimco Helpline</h4>
                <p className="text-[10px] text-white/90">Direct WhatsApp Support</p>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-[#F0E3D1]/60 space-y-3">
            <div className="bg-white border border-[#D3C6B4] p-3 rounded-xl text-xs space-y-1">
              <p className="font-medium text-[#311A0A]">
                Assalam-o-Alaikum! Welcome to Khandani Nimco. How can we help you with bulk orders or delivery today?
              </p>
              <span className="text-[9px] text-[#AF7F47] block text-right font-semibold">Just now</span>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Apna sawal ya order yahan likhein..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full bg-white border border-[#D3C6B4] rounded-lg px-3 py-2 text-xs text-[#311A0A] placeholder-[#8C7A6B] focus:outline-none focus:border-[#25D366]"
              />

              <button
                onClick={handleSend}
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow"
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
