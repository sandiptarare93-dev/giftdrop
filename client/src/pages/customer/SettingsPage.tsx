import React, { useState } from 'react';
import { Settings, Bell, Lock, Mail, Eye, Shield, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState('welcome');
  const [saved, setSaved] = useState(false);

  const emailTemplates = [
    { id: 'welcome', name: 'Welcome Email' },
    { id: 'paymentSuccessful', name: 'Payment Successful' },
    { id: 'surpriseCreated', name: 'Surprise Created' },
    { id: 'surpriseLink', name: 'Surprise Link Delivery' },
    { id: 'passwordReset', name: 'Password Reset' }
  ];

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif text-slate-900">Settings & Notifications</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage preferences and preview email architectures</p>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
          <Bell className="w-4 h-4 text-rose-600" />
          <span>Delivery & Activity Notifications</span>
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-900">Email Notifications</p>
              <p className="text-[11px] text-slate-500">Receive receipts, order confirmations, and link copies</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-5 h-5 accent-rose-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-900">WhatsApp Status Updates</p>
              <p className="text-[11px] text-slate-500">Receive instant alerts when the recipient views your surprise</p>
            </div>
            <input
              type="checkbox"
              checked={whatsappAlerts}
              onChange={(e) => setWhatsappAlerts(e.target.checked)}
              className="w-5 h-5 accent-rose-600 rounded cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
        >
          {saved ? 'Preferences Saved!' : 'Save Notification Preferences'}
        </button>
      </div>

      {/* Email-Ready Architecture Live Previewer */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
              <Mail className="w-4 h-4 text-amber-600" />
              <span>Email-Ready Architecture & Templates</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Preview live transactional email formats prepared for deployment
            </p>
          </div>

          <select
            value={selectedEmailTemplate}
            onChange={(e) => setSelectedEmailTemplate(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none"
          >
            {emailTemplates.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Embedded Iframe Preview */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 h-[420px]">
          <iframe
            src={`http://localhost:5000/api/email/preview/${selectedEmailTemplate}`}
            title="Email Preview"
            className="w-full h-full border-0"
          ></iframe>
        </div>
      </div>

    </div>
  );
};
