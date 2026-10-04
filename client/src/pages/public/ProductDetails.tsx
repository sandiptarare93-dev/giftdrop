import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  CheckCircle2,
  Clock,
  Gift,
  ArrowRight,
  Share2,
  ShieldCheck,
  Music,
  Heart,
  Sparkles,
  QrCode,
  Smartphone
} from 'lucide-react';
import { api } from '../../api/client';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await api.getProductBySlug(slug);
        if (res.success) setProduct(res.product);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold font-serif text-slate-800">Template not found</h2>
        <Link to="/explore" className="mt-4 px-6 py-2.5 bg-rose-600 text-white rounded-xl font-semibold text-sm">
          Browse All Templates
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-400 mb-8 font-medium">
          <Link to="/" className="hover:text-rose-600">Home</Link>
          <span>/</span>
          <Link to="/explore" className="hover:text-rose-600">Surprises</Link>
          <span>/</span>
          <span className="text-slate-700 capitalize">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Large Preview & Photo Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[4/3] shadow-md group">
              <img
                src={product.images?.[activeImageIndex] || product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-slate-800 shadow-sm flex items-center space-x-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount} reviews)</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl text-white flex items-center justify-between">
                <div>
                  <p className="text-xs text-rose-300 font-semibold uppercase tracking-wider">Live Mock Preview</p>
                  <p className="text-sm font-serif font-bold">Interactive Audio & Visual Experience</p>
                </div>
                <Link
                  to="/s/bday-priya"
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  View Demo
                </Link>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex items-center space-x-3">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-rose-600 scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Mobile First Highlights Banner */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <Smartphone className="w-5 h-5 text-rose-600 mx-auto mb-1.5" />
                <p className="text-xs font-bold text-slate-900">Mobile-First</p>
                <p className="text-[11px] text-slate-500">Perfect on WhatsApp</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <Music className="w-5 h-5 text-amber-600 mx-auto mb-1.5" />
                <p className="text-xs font-bold text-slate-900">Music Included</p>
                <p className="text-[11px] text-slate-500">Soothing soundscape</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <QrCode className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
                <p className="text-xs font-bold text-slate-900">QR Code</p>
                <p className="text-[11px] text-slate-500">Print or share link</p>
              </div>
            </div>

          </div>

          {/* Right: Product Details & Primary CTA */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-600 mb-2">
                <span>{product.category}</span>
                <span>•</span>
                <span className="flex items-center space-x-1 text-slate-500 normal-case">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{product.estimatedTime}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
                {product.name}
              </h1>

              <p className="text-slate-600 text-base mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium block">One-time surprise price</span>
                <div className="flex items-baseline space-x-2 mt-0.5">
                  <span className="text-3xl font-extrabold text-slate-900 font-serif">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-base text-slate-400 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                Special Limited Offer
              </span>
            </div>

            {/* Primary Action Button */}
            <div className="space-y-3 pt-2">
              <Link
                to={`/create?product=${product.id}`}
                className="w-full flex items-center justify-center space-x-2.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white font-bold text-base py-4 px-6 rounded-2xl shadow-xl shadow-rose-600/30 hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-5 h-5" />
                <span>Create This Surprise Now</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
              <p className="text-center text-xs text-slate-400">
                You can customize everything before finalizing payment.
              </p>
            </div>

            {/* Included Features Checklist */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
                Everything Included:
              </h3>
              <div className="space-y-2.5">
                {product.features?.map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Customer Reviews
                </h3>
                <div className="space-y-3">
                  {product.reviews.map((rev: any, idx: number) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-slate-900">{rev.userName}</span>
                        <div className="flex text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 italic">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
