import React, { useState } from 'react';
import { User, Mail, Phone, Tag, Copy, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const referralCode = user?.referralCode || 'GIFT50';
  const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif text-slate-900">Account Profile</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage your personal credentials and referral wallet</p>
      </div>

      {/* Referral & Credits Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-100 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Refer & Earn Program</span>
          </span>
          <h3 className="text-xl font-bold font-serif mt-1">Available Credits: ₹{user?.credits || 50}</h3>
          <p className="text-xs text-rose-100 mt-1 max-w-sm">
            Share your link with friends. They get 20% off their first surprise and you earn ₹50 gifting credit!
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md p-2 rounded-2xl border border-white/25">
          <span className="text-xs font-mono font-bold px-2">{referralCode}</span>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-white text-rose-600 rounded-xl text-xs font-bold shadow-sm hover:bg-rose-50 transition-colors"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4 pb-4 border-b border-slate-100">
            <img
              src={user?.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
              alt={user?.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-rose-50"
            />
            <div>
              <h3 className="text-sm font-bold text-slate-900">{user?.name}</h3>
              <p className="text-xs text-slate-400 capitalize">{user?.role} Account</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <input
              type="email"
              disabled
              value={user?.email}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
            >
              Save Profile Changes
            </button>
            {saved && (
              <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>Saved successfully!</span>
              </span>
            )}
          </div>
        </form>
      </div>

    </div>
  );
};
