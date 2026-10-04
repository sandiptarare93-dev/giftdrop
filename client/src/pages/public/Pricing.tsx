import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

export const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      description: "Test drive GiftDrop and experience how interactive digital surprises work.",
      badge: null,
      features: [
        "Basic templates",
        "Limited customization",
        "Up to 2 photos",
        "Standard theme",
        "Watermarked preview link",
        "48-hour preview expiry"
      ],
      ctaText: "Try Free",
      ctaLink: "/create?plan=free",
      popular: false
    },
    {
      name: "Personal",
      price: "₹199 – ₹499",
      subtext: "per surprise (one-time)",
      description: "Our most popular tier. Perfect for birthdays, anniversaries, and romantic milestones.",
      badge: "Most Popular",
      features: [
        "All 12+ Premium templates",
        "Unlimited customization",
        "Up to 12 curated photos",
        "Royalty-free background music",
        "Date-stamped memory timeline",
        "Custom shareable link (gift-drop.com/s/...)",
        "Downloadable high-res QR code",
        "No watermark",
        "Lifetime digital access"
      ],
      ctaText: "Create Surprise",
      ctaLink: "/create",
      popular: true
    },
    {
      name: "Premium",
      price: "₹999",
      subtext: "deluxe milestone suite",
      description: "Designed for grand proposals, corporate milestones, and luxury weddings.",
      badge: "VIP Luxury",
      features: [
        "All Personal features included",
        "Cinematic video background loops",
        "Custom audio recording upload",
        "Interactive fireworks & particle effects",
        "Custom domain or vanity URL alias",
        "Password protection for surprises",
        "Priority VIP support & concierge styling"
      ],
      ctaText: "Get Premium",
      ctaLink: "/create?plan=premium",
      popular: false
    }
  ];

  return (
    <div className="py-16 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Simple, Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-serif mt-3">
            Affordable moments, priceless memories.
          </h1>
          <p className="text-slate-600 text-base mt-3">
            No subscriptions. Pay once per surprise with zero hidden fees and lifetime digital access.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'bg-white border-2 border-rose-500 shadow-xl shadow-rose-500/10 scale-105 z-10'
                  : 'bg-white border border-slate-200/80 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold font-serif text-slate-900">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[36px]">{plan.description}</p>

                <div className="mt-6 mb-8">
                  <span className="text-4xl font-extrabold text-slate-900 font-serif">{plan.price}</span>
                  {plan.subtext && (
                    <span className="text-xs text-slate-400 block mt-1">{plan.subtext}</span>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-900">What's included:</p>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link
                  to={plan.ctaLink}
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-center block transition-all shadow-sm ${
                    plan.popular
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Trust footnote */}
        <div className="mt-16 text-center text-xs text-slate-500">
          <p>Need custom corporate or bulk surprise packaging? <Link to="/contact" className="text-rose-600 font-semibold underline">Contact our gifting team</Link></p>
        </div>

      </div>
    </div>
  );
};
