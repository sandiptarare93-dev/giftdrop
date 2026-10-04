import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Gift,
  Heart,
  Star,
  Music,
  Camera,
  ChevronDown,
  ArrowRight,
  Eye,
  CheckCircle,
  Share2,
  ShieldCheck,
  Zap,
  Play
} from 'lucide-react';
import { api } from '../../api/client';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [occasions, setOccasions] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [previewProduct, setPreviewProduct] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, occRes, testRes] = await Promise.all([
          api.getProducts({ activeOnly: 'true' }),
          api.getOccasions(),
          api.getTestimonials()
        ]);
        if (prodRes.success) setProducts(prodRes.products.slice(0, 6));
        if (occRes.success) setOccasions(occRes.occasions);
        if (testRes.success) setTestimonials(testRes.testimonials);
      } catch (err) {
        console.error('Home load error:', err);
      }
    };
    fetchData();
  }, []);

  const faqs = [
    {
      q: "What is GiftDrop?",
      a: "GiftDrop is a personalized digital surprise and gifting platform. It lets you create interactive multimedia surprise experiences with photos, music, date-stamped memories, and love letters that can be unlocked via a unique link or QR code."
    },
    {
      q: "How does a surprise work?",
      a: "You pick an occasion, customize names, messages, photo memories, and background music in our intuitive 5-minute creator. Once complete, you receive a shareable link and custom QR code to send via WhatsApp, Instagram, or print on a card!"
    },
    {
      q: "Can I add my own photos?",
      a: "Yes! You can upload multiple personal photos from your phone or laptop, add custom captions, and arrange them in a cinematic photo album."
    },
    {
      q: "Can I add music?",
      a: "Absolutely. You can choose from our curated ambient soundtracks (romantic acoustic, gentle piano, birthday celebration fanfare, lo-fi indie) that automatically accompany the surprise reveal."
    },
    {
      q: "How long does the surprise remain available?",
      a: "All GiftDrop surprises include lifetime digital access. The recipient can reopen, relive, and cherish their surprise link at any time in the future."
    },
    {
      q: "Can I share it on WhatsApp?",
      a: "Yes! Right after creation or checkout, you get a 1-tap 'Share on WhatsApp' button with a pre-formatted message and personalized link preview."
    },
    {
      q: "Can I generate a QR code?",
      a: "Yes, every surprise comes with a high-resolution downloadable QR code. Many customers print it out and slip it inside flowers, gift boxes, or chocolate hampers!"
    },
    {
      q: "What payment methods are supported?",
      a: "We support all major Indian and international payment methods including UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, and Wallets via secure 256-bit encrypted checkout."
    },
    {
      q: "Can I edit my surprise after purchase?",
      a: "Yes, you can edit the receiver's name, message, photos, and theme anytime from your Customer Dashboard before or after sending."
    },
    {
      q: "Can I create multiple surprises?",
      a: "Yes! You can create and manage unlimited surprises for all your friends, family, and loved ones from your dashboard."
    }
  ];

  return (
    <div className="overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 bg-gradient-to-b from-rose-50/50 via-white to-[#FAFAFA]">
        {/* Subtle Decorative Floating Elements */}
        <div className="absolute top-16 left-8 text-rose-300 animate-float-slow opacity-60 hidden lg:block">
          <Heart className="w-8 h-8 fill-rose-200" />
        </div>
        <div className="absolute top-40 right-16 text-amber-400 animate-float-slow opacity-70 hidden lg:block" style={{ animationDelay: '1.5s' }}>
          <Sparkles className="w-9 h-9" />
        </div>
        <div className="absolute bottom-20 left-20 text-rose-400 animate-float-slow opacity-50 hidden lg:block" style={{ animationDelay: '3s' }}>
          <Star className="w-6 h-6 fill-amber-200 text-amber-300" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-100/70 text-rose-700 text-xs font-bold tracking-wide uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>Next-Gen Digital Gifting Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 font-serif tracking-tight leading-[1.15]">
                Don’t just give a gift.{' '}
                <span className="gradient-text block mt-1">
                  Give them a moment they’ll remember.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Create beautiful personalized surprise experiences for the people who matter most. Add photos, heartfelt notes, nostalgic soundtracks, and unlock it all with a single link.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/create"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-rose-600/30 hover:shadow-xl hover:shadow-rose-600/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <Gift className="w-5 h-5" />
                  <span>Create Your Surprise</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/explore"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base px-7 py-4 rounded-full border border-slate-200 shadow-sm hover:border-slate-300 transition-all"
                >
                  <Eye className="w-4 h-4 text-slate-500" />
                  <span>Explore Surprises</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Ready in under 5 minutes</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Instant WhatsApp & QR delivery</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Lifetime digital keepsake</span>
                </div>
              </div>

            </div>

            {/* Right Visual: Personalized Surprise Preview Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md">
                
                {/* Background Glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-rose-500/20 to-amber-500/20 rounded-3xl blur-2xl -z-10"></div>

                {/* Main Card Device Mockup */}
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 sm:p-5 relative overflow-hidden transition-all duration-300 hover:shadow-rose-500/10">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs text-slate-400">
                    <span className="font-mono">gift-drop.com/s/bday-priya</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-semibold text-[10px]">
                      LIVE PREVIEW
                    </span>
                  </div>

                  {/* Card Content Mockup */}
                  <div className="pt-4 space-y-3.5">
                    <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden group">
                      <img
                        src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80"
                        alt="Birthday surprise preview"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex flex-col justify-end p-4 text-white">
                        <span className="text-xs font-semibold uppercase tracking-wider text-rose-300">A special surprise for</span>
                        <h4 className="text-2xl font-serif font-bold">Priya Sharma ✨</h4>
                      </div>
                    </div>

                    {/* Small Love Note Card */}
                    <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-100/80 text-xs text-slate-700 leading-relaxed font-sans italic">
                      "Happy 24th Birthday Priya! Thank you for filling every single day with your sunshine and laughter..."
                    </div>

                    {/* Audio indicator pill */}
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <div className="flex items-center space-x-2 text-rose-600">
                        <Music className="w-4 h-4 animate-pulse" />
                        <span className="font-medium text-slate-700">Playing: Acoustic Melodies</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">01:42 / 03:15</span>
                    </div>

                    <Link
                      to="/s/bday-priya"
                      className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Experience Live Surprise Demo</span>
                    </Link>
                  </div>
                </div>

                {/* Floating Micro Badge: Heart */}
                <div className="absolute -top-4 -left-4 bg-white p-3 rounded-2xl shadow-xl border border-rose-100 flex items-center space-x-2 animate-bounce" style={{ animationDuration: '3s' }}>
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <span className="text-xs font-bold text-slate-800">Made with Love</span>
                </div>

                {/* Floating Micro Badge: QR Code */}
                <div className="absolute -bottom-5 -right-4 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-2 hidden sm:flex">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    QR
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 leading-tight">Instant Scan</p>
                    <p className="text-[10px] text-slate-400">Share anywhere</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OCCASION SECTION */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
              Personalized for Every Milestone
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif mt-3">
              Every moment deserves a surprise.
            </h2>
            <p className="text-slate-600 text-base mt-3">
              Select an occasion to explore handcrafted templates tuned specifically for the emotion of the moment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {occasions.map((occ) => (
              <div
                key={occ.id}
                className="group bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-100 hover:border-rose-100 hover:shadow-xl hover:shadow-rose-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-5">
                    <img
                      src={occ.image}
                      alt={occ.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-xl shadow-sm">
                      {occ.emoji}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    {occ.name}
                  </h3>
                  <p className="text-sm font-medium text-rose-500/90 mt-1">
                    {occ.tagline}
                  </p>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {occ.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <Link
                    to={`/explore?occasion=${occ.id}`}
                    className="inline-flex items-center space-x-1.5 text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors"
                  >
                    <span>Explore {occ.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to={`/create?occasion=${occ.id}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-colors"
                  >
                    Create
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
              Simple & Fast
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif mt-3">
              Create a surprise in 3 simple steps.
            </h2>
            <p className="text-slate-600 text-base mt-3">
              No technical skills required. Craft an unforgettable emotional experience in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-lg mb-6">
                01
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">Choose</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Select an occasion — Birthday, Anniversary, Friendship, Proposal, or Celebration — and pick your favorite interactive surprise template.
              </p>
              <div className="text-xs font-semibold text-rose-600 flex items-center space-x-1">
                <span>12+ handcrafted templates</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg mb-6">
                02
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">Personalize</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Add receiver names, upload favorite photos, write heartfelt letters, add date-stamped memory milestones, and pick background music.
              </p>
              <div className="text-xs font-semibold text-amber-600 flex items-center space-x-1">
                <span>Live interactive preview</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg mb-6">
                03
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">Send</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Purchase your surprise and immediately receive a unique shareable URL and downloadable QR code ready to send via WhatsApp or print.
              </p>
              <div className="text-xs font-semibold text-emerald-600 flex items-center space-x-1">
                <span>1-click WhatsApp share</span>
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <Link
              to="/create"
              className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all shadow-md"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. FEATURED SURPRISES (PRODUCT GRID) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                Most Loved Experiences
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif mt-3">
                Featured Surprises
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Select a template below to preview the interactive experience or start customizing immediately.
              </p>
            </div>
            <Link
              to="/explore"
              className="mt-4 sm:mt-0 inline-flex items-center space-x-1 text-sm font-bold text-rose-600 hover:text-rose-700"
            >
              <span>View all 12 templates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-rose-100 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={prod.images?.[0] || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-slate-800 shadow-sm flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{prod.rating}</span>
                      <span className="text-slate-400 text-[10px]">({prod.reviewsCount})</span>
                    </div>
                    {prod.popular && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                        Popular
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-rose-600 uppercase tracking-wide mb-1">
                      <span>{prod.category}</span>
                      <span>•</span>
                      <span className="text-slate-400 normal-case">{prod.estimatedTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Price */}
                    <div className="mt-4 flex items-baseline space-x-2">
                      <span className="text-2xl font-extrabold text-slate-900 font-serif">₹{prod.price}</span>
                      {prod.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">₹{prod.originalPrice}</span>
                      )}
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Save {Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                  <Link
                    to={`/product/${prod.slug}`}
                    className="text-center py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Details & Preview
                  </Link>
                  <Link
                    to={`/create?product=${prod.id}`}
                    className="text-center py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 text-white text-xs font-bold shadow-sm shadow-rose-600/20 transition-all hover:shadow-md"
                  >
                    Create Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS / SOCIAL PROOF */}
      <section className="py-20 bg-rose-50/40 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-100/70 px-3 py-1 rounded-full border border-rose-200">
              Emotional Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif mt-3">
              Real tears, real smiles, real moments.
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              See how GiftDrop turns everyday occasions into treasured lifelong memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 text-amber-400 mb-3">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-700 text-sm italic leading-relaxed mb-6 font-serif">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-100"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{test.name}</h4>
                    <p className="text-[11px] text-slate-400">{test.role} • {test.occasion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif mt-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Everything you need to know about creating and sending GiftDrop surprises.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 hover:text-rose-600 transition-colors"
                  >
                    <span className="text-base font-serif">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-rose-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. BOTTOM HIGH-CONVERTING CTA BANNER */}
      <section className="py-20 bg-gradient-to-tr from-slate-950 via-slate-900 to-rose-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Make Today Special</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight">
            Ready to give them a moment they’ll never forget?
          </h2>

          <p className="text-slate-300 max-w-xl mx-auto text-base sm:text-lg">
            Create an interactive surprise in 5 minutes. Deliver it instantly over WhatsApp or generate a custom QR code.
          </p>

          <div className="pt-2">
            <Link
              to="/create"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 text-white font-bold text-base px-9 py-4 rounded-full shadow-2xl shadow-rose-600/40 hover:scale-105 transition-all"
            >
              <Gift className="w-5 h-5" />
              <span>Create Your Surprise Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
