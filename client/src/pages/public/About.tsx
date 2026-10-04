import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Heart, Sparkles, Users, Award, ShieldCheck, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Our Mission
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-serif mt-3">
            We believe memories are the greatest gifts of all.
          </h1>
          <p className="text-slate-600 text-lg mt-4 leading-relaxed">
            In a world filled with generic greeting cards and impersonal Amazon deliveries, GiftDrop was founded to bring pure emotional intimacy back to gifting.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80"
                alt="Friends celebrating moments"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 bg-white rounded-2xl shadow-xl border border-rose-100 max-w-xs hidden sm:block">
              <p className="text-rose-600 font-serif font-bold text-2xl">15,000+</p>
              <p className="text-xs text-slate-500 font-medium">Smiles, happy tears, and unforgettable surprises unlocked.</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-extrabold font-serif text-slate-900">
              Why We Built GiftDrop
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We asked ourselves: when was the last time you remembered a gift you received three years ago? Most physical gifts lose novelty quickly. But an interactive story — hearing your favorite song, watching the throwback photos from that rainy trip, and reading a heartfelt letter — stays in your heart forever.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              GiftDrop is engineered like a modern SaaS platform with the emotional soul of a personalized love letter. Whether you are celebrating across the dining table or across oceans, GiftDrop delivers instant magic right to their phone.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Heart className="w-6 h-6 text-rose-600 mb-2" />
                <h4 className="text-sm font-bold text-slate-900">100% Emotion-Driven</h4>
                <p className="text-xs text-slate-500 mt-1">Designed to trigger genuine joy and connection.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Sparkles className="w-6 h-6 text-amber-500 mb-2" />
                <h4 className="text-sm font-bold text-slate-900">Cinematic Experience</h4>
                <p className="text-xs text-slate-500 mt-1">Animations, ambient audio, and smooth reveals.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-10 rounded-3xl bg-slate-900 text-white text-center max-w-4xl mx-auto space-y-4">
          <h3 className="text-2xl font-serif font-bold">Have an upcoming birthday or anniversary?</h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Take 5 minutes to create an experience they will cherish forever.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-full shadow-lg shadow-rose-600/30 transition-all"
          >
            <span>Create a Surprise</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
