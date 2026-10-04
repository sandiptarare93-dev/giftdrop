import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Heart, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Gift className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-serif">
                Gift<span className="text-rose-500">Drop</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Don't just give a gift. Give them a moment they'll remember. GiftDrop creates interactive, personalized digital surprises for life’s most precious occasions.
            </p>
            <div className="flex items-center space-x-2 text-xs text-rose-400 font-medium pt-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Over 15,000+ digital moments delivered with love</span>
            </div>
          </div>

          {/* Occasions */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Occasions</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/explore?occasion=birthday" className="hover:text-rose-400 transition-colors">🎂 Birthday</Link></li>
              <li><Link to="/explore?occasion=anniversary" className="hover:text-rose-400 transition-colors">❤️ Anniversary</Link></li>
              <li><Link to="/explore?occasion=friendship" className="hover:text-rose-400 transition-colors">🫶 Friendship</Link></li>
              <li><Link to="/explore?occasion=proposal" className="hover:text-rose-400 transition-colors">💍 Proposal</Link></li>
              <li><Link to="/explore?occasion=graduation" className="hover:text-rose-400 transition-colors">🎓 Graduation</Link></li>
              <li><Link to="/explore?occasion=celebration" className="hover:text-rose-400 transition-colors">🎉 Celebration</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/explore" className="hover:text-rose-400 transition-colors">Explore Templates</Link></li>
              <li><Link to="/how-it-works" className="hover:text-rose-400 transition-colors">How It Works</Link></li>
              <li><Link to="/pricing" className="hover:text-rose-400 transition-colors">Pricing & Plans</Link></li>
              <li><Link to="/create" className="hover:text-rose-400 transition-colors">Create Surprise</Link></li>
              <li><Link to="/faq" className="hover:text-rose-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-rose-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-rose-400 transition-colors">Contact & Support</Link></li>
              <li><span className="text-slate-500 cursor-not-allowed">Terms of Service</span></li>
              <li><span className="text-slate-500 cursor-not-allowed">Privacy Policy</span></li>
              <li><span className="text-slate-500 cursor-not-allowed">Refund Policy</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-1">
            <span>© {new Date().getFullYear()} GiftDrop. Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
            <span>for heartfelt moments worldwide.</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Razorpay 256-bit SSL Secure</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-400">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant QR Delivery</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
