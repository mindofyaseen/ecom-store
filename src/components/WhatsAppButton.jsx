import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';

// Authentic WhatsApp SVG Icon (Exact WhatsApp brand geometry)
const WhatsAppLogoSvg = ({ className = "w-6 h-6", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.405z" />
  </svg>
);

export const WhatsAppButton = () => {
  const { siteConfig, generateWhatsAppLink } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  // Customizable settings with fallback matching the user's reference image
  const agentName = siteConfig?.whatsappAgentName || "KKM Support";
  const widgetHeader = siteConfig?.whatsappWidgetHeader || "Start a Conversation";
  const widgetSubtext = siteConfig?.whatsappWidgetSubtext || `Hi! Click ${agentName} below to chat on WhatsApp`;
  const replyNotice = siteConfig?.whatsappReplyNotice || `${agentName} typically replies in a few minutes.`;
  const defaultMsg = siteConfig?.whatsappDefaultMsg || "Assalam-o-Alaikum! I want to inquire about ordering Nimco.";

  const handleStartChat = (messageToSend) => {
    const text = (messageToSend && messageToSend.trim()) ? messageToSend.trim() : defaultMsg;
    window.open(generateWhatsAppLink(text), '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none font-sans">
      
      {/* 1. Expandable Conversation Box matching User Reference Image */}
      {isOpen && (
        <div 
          className="mb-3.5 w-[330px] sm:w-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-5 zoom-in-95 duration-200 text-slate-800"
          style={{ boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.22), 0 0 1px 1px rgba(0,0,0,0.05)' }}
        >
          
          {/* Top Green Banner */}
          <div className="bg-[#20B038] p-4 sm:p-5 text-white flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
              <WhatsAppLogoSvg className="w-6 h-6" fill="#ffffff" />
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                {widgetHeader}
              </h3>
              <p className="text-xs text-white/95 mt-1 leading-relaxed">
                {widgetSubtext.includes('WhatsApp') ? (
                  <>
                    {widgetSubtext.split('WhatsApp')[0]}
                    <span className="font-bold">WhatsApp</span>
                    {widgetSubtext.split('WhatsApp')[1] || ''}
                  </>
                ) : (
                  widgetSubtext
                )}
              </p>
            </div>

            {/* Subtle top close button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-full hover:bg-black/10"
              title="Close"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* White Card Body */}
          <div className="p-4 sm:p-5 bg-white space-y-3.5">
            
            {/* Status / Reply Notice */}
            <p className="text-xs sm:text-[13px] text-slate-500 font-medium leading-normal">
              {replyNotice}
            </p>

            {/* Clickable Channel Card matching Reference */}
            <button
              onClick={() => handleStartChat(customMsg)}
              className="w-full text-left bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-3 group relative overflow-hidden"
              style={{ borderLeft: '4px solid #20B038' }}
            >
              {/* Left Circular Avatar with WhatsApp Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#20B038] text-white flex items-center justify-center shrink-0 ring-4 ring-[#20B038]/15 group-hover:scale-105 transition-transform shadow-sm">
                  <WhatsAppLogoSvg className="w-5 h-5" fill="#ffffff" />
                </div>

                <div>
                  <h4 className="text-sm sm:text-[15px] font-bold text-slate-900 group-hover:text-[#20B038] transition-colors leading-tight">
                    {agentName}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Online • Tap to chat
                  </span>
                </div>
              </div>

              {/* Right WhatsApp Outline Icon */}
              <div className="text-[#20B038] group-hover:translate-x-0.5 transition-transform pr-1">
                <WhatsAppLogoSvg className="w-5 h-5" fill="#20B038" />
              </div>
            </button>

            {/* Optional Custom Question Input */}
            <div className="pt-1">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Apna sawal ya order likhein..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleStartChat(customMsg)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#20B038] focus:bg-white transition-all shadow-inner"
                />
                <button
                  onClick={() => handleStartChat(customMsg)}
                  className="absolute right-2 text-[#20B038] hover:text-[#188c2b] p-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
                  title="Send message on WhatsApp"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Footer note */}
          <div className="bg-slate-50 border-t border-slate-100 px-4 py-2 text-center text-[10px] text-slate-400">
            Powered by Khandani WhatsApp Helpline • Instant Response
          </div>

        </div>
      )}

      {/* 2. Floating Circular Green Action Button matching Reference Screenshot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#20B038] hover:bg-[#1ca133] text-white shadow-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 focus:outline-none ring-4 ring-[#20B038]/20"
        style={{
          boxShadow: '0 8px 24px -2px rgba(32, 176, 56, 0.55), 0 4px 10px rgba(0, 0, 0, 0.15)'
        }}
        title={isOpen ? "Close chat" : "Chat on WhatsApp"}
        aria-label="Toggle WhatsApp chat"
      >
        {isOpen ? (
          // Crisp White 'X' Icon when open (Exact match to screenshot bottom right!)
          <X className="w-6 h-6 text-white stroke-[2.75]" />
        ) : (
          // WhatsApp Logo with notification dot when closed
          <div className="relative flex items-center justify-center">
            <WhatsAppLogoSvg className="w-7 h-7" fill="#ffffff" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-[#20B038] animate-pulse" />
          </div>
        )}
      </button>

    </div>
  );
};
