import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  Copy,
  Check,
  Share2,
  Download,
  Eye,
  Gift,
  ArrowRight,
  Sparkles,
  QrCode
} from 'lucide-react';
import { api } from '../../api/client';

export const PaymentSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any | null>(null);
  const [surprise, setSurprise] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fire celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const load = async () => {
      if (!orderId) return;
      try {
        const res = await api.getOrderById(orderId);
        if (res.success) {
          setOrder(res.order);
          setSurprise(res.surprise);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const slug = surprise?.publicSlug || 'gift-preview';
  const surpriseUrl = `${window.location.origin}/s/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(surpriseUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey ${surprise?.receiverName || ''}! I created something special just for you. Open your surprise here: ${surpriseUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleDownloadQR = () => {
    if (surprise?.qrCodeUrl) {
      const a = document.createElement('a');
      a.href = surprise.qrCodeUrl;
      a.download = `giftdrop-qr-${slug}.png`;
      a.click();
    }
  };

  return (
    <div className="py-12 bg-[#FAFAFA] min-h-[85vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-8">
        
        {/* Celebration Header */}
        <div className="space-y-3">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
            <CheckCircle className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Order Confirmed • #{order?.orderNumber}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Your surprise is ready! 🎉
          </h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            Your personalized surprise for <strong className="text-slate-900">{surprise?.receiverName}</strong> has been published and is ready to share.
          </p>
        </div>

        {/* QR Code & Share Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
          
          {/* QR Code Image */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-md">
              {surprise?.qrCodeUrl ? (
                <img
                  src={surprise.qrCodeUrl}
                  alt="Surprise QR Code"
                  className="w-48 h-48 rounded-xl object-contain mx-auto"
                />
              ) : (
                <div className="w-48 h-48 rounded-xl bg-slate-100 flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-slate-400" />
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Scan with camera to open instantly</p>
          </div>

          {/* Shareable Link Box */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <span className="text-xs font-mono text-slate-700 truncate max-w-[280px] sm:max-w-md">
              {surpriseUrl}
            </span>
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shrink-0 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </button>

            {surprise?.qrCodeUrl && (
              <button
                onClick={handleDownloadQR}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-sm transition-all"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Download QR Code</span>
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to={`/s/${slug}`}
              target="_blank"
              className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>View Surprise Receiver Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* Dashboard Link */}
        <div>
          <Link
            to="/dashboard/surprises"
            className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors"
          >
            ← Return to My Surprises Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
};
