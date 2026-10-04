import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Gift } from 'lucide-react';

export const StickyMobileCTA: React.FC = () => {
  const location = useLocation();

  // Hide on surprise editor, receiver page, checkout, and admin pages
  if (
    location.pathname.startsWith('/create') ||
    location.pathname.startsWith('/editor') ||
    location.pathname.startsWith('/s/') ||
    location.pathname.startsWith('/surprise/') ||
    location.pathname.startsWith('/checkout') ||
    location.pathname.startsWith('/admin')
  ) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-8px_20px_rgba(0,0,0,0.06)] animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 leading-tight">Instant Digital Gift</p>
            <p className="text-[11px] text-rose-600 font-medium">Starts from ₹199</p>
          </div>
        </div>
        <Link
          to="/create"
          className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-md shadow-rose-600/25 active:scale-98 transition-all text-center"
        >
          <Sparkles className="w-4 h-4" />
          <span>Create Your Surprise</span>
        </Link>
      </div>
    </div>
  );
};
