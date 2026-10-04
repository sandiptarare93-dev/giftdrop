import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Gift, ArrowLeft, ShoppingBag, Eye, Heart } from 'lucide-react';
import { api } from '../../api/client';

export const PreviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [surprise, setSurprise] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const res = await api.getSurpriseById(id);
        if (res.success) setSurprise(res.surprise);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!surprise) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold font-serif text-slate-900">Surprise not found</h2>
        <Link to="/dashboard" className="mt-4 px-5 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white min-h-[85vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Navigation bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-2">
            <Link
              to={`/editor/${surprise.id}`}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
            >
              Edit Details
            </Link>
            <Link
              to={`/checkout/${surprise.id}`}
              className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/30"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Continue to Checkout</span>
            </Link>
          </div>
        </div>

        {/* Surprise Card Preview */}
        <div className="rounded-3xl p-8 bg-gradient-to-tr from-rose-600 to-rose-500 text-white text-center shadow-xl space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl">
            🎁
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest opacity-80">A digital surprise for</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif mt-1">
              {surprise.receiverName} ✨
            </h1>
            <p className="text-xs text-rose-100 mt-1">From {surprise.senderName}</p>
          </div>

          <div className="bg-white/95 text-slate-800 p-6 rounded-2xl shadow-lg max-w-lg mx-auto text-sm italic font-serif leading-relaxed">
            "{surprise.message}"
          </div>

          {surprise.photos?.length > 0 && (
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-3">Photo Memories</p>
              <div className="flex justify-center gap-3 overflow-x-auto pb-2">
                {surprise.photos.map((p: any) => (
                  <div key={p.id} className="w-24 h-24 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white/50">
                    <img src={p.url} alt="Memory" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
