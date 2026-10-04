import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Gift,
  Plus,
  Eye,
  Edit3,
  Trash2,
  Share2,
  Copy,
  Check,
  QrCode,
  ExternalLink
} from 'lucide-react';
import { api } from '../../api/client';

export const MySurprises: React.FC = () => {
  const [surprises, setSurprises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeQrModal, setActiveQrModal] = useState<any | null>(null);

  const fetchSurprises = async () => {
    try {
      const res = await api.getMySurprises();
      if (res.success) setSurprises(res.surprises);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurprises();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this surprise?')) {
      try {
        await api.deleteSurprise(id);
        fetchSurprises();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCopyLink = (slug: string, id: string) => {
    const url = `${window.location.origin}/s/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-900">My Surprises</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage, share, and track all your surprise experiences</p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Surprise</span>
        </Link>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400">Loading your surprises...</div>
      ) : surprises.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm space-y-4">
          <Gift className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold font-serif text-slate-800">No surprises yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You haven't created any surprise links yet. Start now and create something unforgettable!
          </p>
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Surprise</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surprises.map((s) => {
            const liveUrl = `${window.location.origin}/s/${s.publicSlug}`;
            const isPublished = s.status === 'published';
            return (
              <div
                key={s.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isPublished
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {s.status}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {s.views || 0} views
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    For {s.receiverName}
                  </h3>
                  <p className="text-xs text-rose-600 font-medium mt-0.5">
                    {s.relationship} • From {s.senderName}
                  </p>

                  <p className="text-xs text-slate-600 italic line-clamp-2 mt-3 font-serif bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    "{s.message}"
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopyLink(s.publicSlug, s.id)}
                      className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      {copiedId === s.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    {s.qrCodeUrl && (
                      <button
                        onClick={() => setActiveQrModal(s)}
                        className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                        title="View QR Code"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                    )}

                    <Link
                      to={`/s/${s.publicSlug}`}
                      target="_blank"
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                      title="Open Live"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <Link
                      to={`/editor/${s.id}`}
                      className="text-slate-600 hover:text-rose-600 font-medium flex items-center space-x-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>

                    {!isPublished && (
                      <Link
                        to={`/checkout/${s.id}`}
                        className="text-amber-600 hover:underline font-bold"
                      >
                        Complete Payment →
                      </Link>
                    )}

                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* QR Code Popup Modal */}
      {activeQrModal && (
        <div
          onClick={() => setActiveQrModal(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 border border-slate-200"
          >
            <h3 className="text-lg font-bold font-serif text-slate-900">
              QR for {activeQrModal.receiverName}
            </h3>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 inline-block">
              <img src={activeQrModal.qrCodeUrl} alt="QR Code" className="w-52 h-52 object-contain" />
            </div>
            <p className="text-xs text-slate-500">Scan using any smartphone camera to open the surprise link.</p>
            <button
              onClick={() => setActiveQrModal(null)}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
