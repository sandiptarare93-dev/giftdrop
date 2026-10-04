import React, { useState } from 'react';
import { X, Gift, Copy, Check, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferralModal: React.FC<ReferralModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const referralCode = user?.referralCode || 'GIFT50';
  const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! Create unforgettable digital surprises on GiftDrop. Use my link to get a special discount: ${referralLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
          <Gift className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">
          Invite Friends, Get <span className="text-rose-600">₹50 Credit</span>
        </h3>

        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          Share your referral link with friends. When they create their first surprise, they get 20% off and you get ₹50 GiftDrop credit!
        </p>

        {/* Link Field */}
        <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-2xl mb-4">
          <span className="text-xs font-mono text-slate-600 truncate max-w-[240px]">
            {referralLink}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-3 py-1.5 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 transition-colors shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* WhatsApp Share Button */}
        <button
          onClick={shareOnWhatsApp}
          className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-6 rounded-2xl shadow-md transition-all mb-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Share on WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
