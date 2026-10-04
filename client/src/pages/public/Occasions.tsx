import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { api } from '../../api/client';

export const Occasions: React.FC = () => {
  const [occasions, setOccasions] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getOccasions();
        if (res.success) setOccasions(res.occasions);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Life's Celebrations
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-serif mt-3">
            Every moment deserves a surprise.
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Browse our dedicated collections tailored to evoke deep joy, tears of happiness, and unforgettable excitement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {occasions.map((occ) => (
            <div
              key={occ.id}
              className="bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-100 hover:border-rose-100 hover:shadow-xl hover:shadow-rose-500/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
                  <img
                    src={occ.image}
                    alt={occ.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-md flex items-center justify-center text-2xl shadow-sm">
                    {occ.emoji}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-serif text-slate-900 group-hover:text-rose-600 transition-colors">
                    {occ.name}
                  </h3>
                  <p className="text-sm font-semibold text-rose-600">
                    {occ.tagline}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed pt-1">
                    {occ.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                <Link
                  to={`/explore?occasion=${occ.id}`}
                  className="inline-flex items-center space-x-1.5 text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors"
                >
                  <span>Explore {occ.name} Surprises</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to={`/create?occasion=${occ.id}`}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  Create
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
