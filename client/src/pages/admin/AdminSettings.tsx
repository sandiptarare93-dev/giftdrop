import React, { useState } from 'react';
import { Settings, Shield, Key, Database, RefreshCw, Check, Cloud } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [razorpayKeyId, setRazorpayKeyId] = useState('rzp_test_mock_mode');
  const [testMode, setTestMode] = useState(true);
  const [cloudinaryName, setCloudinaryName] = useState('giftdrop-cloud');
  const [googleClientId, setGoogleClientId] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-8 text-white">
      <div>
        <h1 className="text-2xl font-bold font-serif">Platform & Gateway Settings</h1>
        <p className="text-xs text-slate-400 mt-0.5">Manage external integrations, payment keys, and storage configurations</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Razorpay Gateway */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Key className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Razorpay Payment Gateway (India)</h3>
            </div>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Active Integration
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Razorpay Key ID</label>
              <input
                type="text"
                value={razorpayKeyId}
                onChange={(e) => setRazorpayKeyId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Razorpay Secret Key</label>
              <input
                type="password"
                value="••••••••••••••••••••••••"
                readOnly
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-500 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
            <div>
              <p className="font-bold text-slate-200">Sandbox Test Mode Simulation</p>
              <p className="text-slate-500 text-[11px]">Allows seamless 1-click test payments without incurring charges</p>
            </div>
            <input
              type="checkbox"
              checked={testMode}
              onChange={(e) => setTestMode(e.target.checked)}
              className="w-5 h-5 accent-rose-600 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Cloudinary Architecture */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Cloud className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Cloudinary Media Storage</h3>
            </div>
            <span className="text-xs text-blue-400 font-bold bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
              Cloudinary Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Cloud Name</label>
              <input
                type="text"
                value={cloudinaryName}
                onChange={(e) => setCloudinaryName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Fallback Storage</label>
              <input
                type="text"
                disabled
                value="Local Disk + Base64 Upload Cache"
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Google OAuth Ready */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Shield className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider">Google OAuth 2.0 Prepared Architecture</h3>
          </div>
          <div className="text-xs">
            <label className="block text-slate-400 font-semibold mb-1">Google Client ID</label>
            <input
              type="text"
              value={googleClientId}
              onChange={(e) => setGoogleClientId(e.target.value)}
              placeholder="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-rose-600 hover:bg-rose-700 rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-900/40"
          >
            Save Gateway Settings
          </button>
          {saved && (
            <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
              <Check className="w-4 h-4" />
              <span>Settings successfully updated!</span>
            </span>
          )}
        </div>

      </form>
    </div>
  );
};
