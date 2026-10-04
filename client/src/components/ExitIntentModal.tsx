import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, Gift, Tag, ArrowRight, Check } from 'lucide-react';

export const ExitIntentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        const hasSeen = sessionStorage.getItem('giftdrop_exit_offer_seen');
        if (!hasSeen) {
          setIsOpen(true);
          sessionStorage.setItem('giftdrop_exit_offer_seen', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  if (!isOpen) return null;

  const handleCopyAndClaim = () => {
    navigator.clipboard.writeText('WELCOME20');
    setCopied(true);
    setTimeout(() => {
      setIsOpen(false);
      navigate('/create');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center border border-rose-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative Top Accent */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-rose-500/25">
          <Gift className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-600 font-bold text-xs uppercase tracking-wider mb-2 border border-rose-100">
          🎁 Special Limited Offer
        </span>

        <h3 className="text-2xl font-serif font-extrabold text-slate-900 mb-2">
          Wait! Get <span className="text-rose-600">20% OFF</span> your first surprise.
        </h3>

        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          Don't leave empty-handed. Create an emotional, unforgettable moment for someone you love with 20% off right now.
        </p>

        {/* Coupon Box */}
        <div className="flex items-center justify-between p-3.5 bg-rose-50/70 border border-dashed border-rose-300 rounded-2xl mb-6">
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-rose-600" />
            <span className="font-mono font-bold text-lg text-rose-700 tracking-wider">WELCOME20</span>
          </div>
          <button
            onClick={handleCopyAndClaim}
            className="flex items-center space-x-1 px-3 py-1.5 bg-white text-rose-600 font-semibold text-xs rounded-xl shadow-sm border border-rose-200 hover:bg-rose-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <span>Copy Code</span>
            )}
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={handleCopyAndClaim}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4" />
          <span>Claim 20% Off & Create Surprise</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-slate-400 mt-4">
          Valid on all birthday, anniversary, and celebration templates.
        </p>
      </div>
    </div>
  );
};
