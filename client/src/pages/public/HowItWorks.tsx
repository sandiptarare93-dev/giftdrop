import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Gift, Heart, ArrowRight, Share2, Music, Camera, Palette, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Intuitive & Magical
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-serif mt-3">
            Create a surprise in 3 simple steps.
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            GiftDrop transforms your favorite memories, personal jokes, and heartfelt notes into an interactive digital card that plays music and reveals emotional chapters.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="space-y-12 max-w-5xl mx-auto">
          
          {/* Step 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="md:col-span-4 text-center md:text-left">
              <span className="text-4xl font-extrabold text-rose-600 font-serif">01</span>
              <h3 className="text-2xl font-bold font-serif text-slate-900 mt-2">Choose</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Browse by occasion — Birthday, Anniversary, Friendship, Proposal, or Celebration. Select a layout and aesthetic that best matches their personality.
              </p>
            </div>
            <div className="md:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-rose-50 text-rose-700 font-semibold text-xs rounded-xl border border-rose-100">🎂 Birthday Memory</span>
              <span className="px-4 py-2 bg-pink-50 text-pink-700 font-semibold text-xs rounded-xl border border-pink-100">❤️ Our Story</span>
              <span className="px-4 py-2 bg-amber-50 text-amber-700 font-semibold text-xs rounded-xl border border-amber-100">🫶 Friendship Forever</span>
              <span className="px-4 py-2 bg-purple-50 text-purple-700 font-semibold text-xs rounded-xl border border-purple-100">💍 Proposal Experience</span>
              <span className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold text-xs rounded-xl border border-blue-100">🎓 Graduation Memories</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="md:col-span-4 text-center md:text-left">
              <span className="text-4xl font-extrabold text-amber-600 font-serif">02</span>
              <h3 className="text-2xl font-bold font-serif text-slate-900 mt-2">Personalize</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Add receiver and sender names, upload cherished photos, write personal messages with character counters, add date-stamped memory milestones, and pick ambient music.
              </p>
            </div>
            <div className="md:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl text-center">
                <Camera className="w-5 h-5 text-rose-500 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-800">Photo Uploads</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-center">
                <Music className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-800">Background Music</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-center">
                <Palette className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-800">Color Themes</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="md:col-span-4 text-center md:text-left">
              <span className="text-4xl font-extrabold text-emerald-600 font-serif">03</span>
              <h3 className="text-2xl font-bold font-serif text-slate-900 mt-2">Send</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Complete secure checkout and instantly receive your live link: <code className="text-rose-600 font-mono text-xs">gift-drop.com/s/your-link</code> plus a printable QR code to send via WhatsApp, Instagram, or slip into a gift box!
              </p>
            </div>
            <div className="md:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-900">Instant Delivery Available 24/7</p>
                <p className="text-xs text-slate-500">Perfect for midnight surprises & long-distance gifts.</p>
              </div>
              <Link
                to="/create"
                className="px-6 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors shrink-0"
              >
                Create Your First Surprise
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
