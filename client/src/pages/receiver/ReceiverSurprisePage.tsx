import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Gift,
  Heart,
  Music,
  Volume2,
  VolumeX,
  Sparkles,
  Calendar,
  Camera,
  Share2,
  ArrowRight,
  Maximize2,
  X
} from 'lucide-react';
import { api } from '../../api/client';
import { audioSynthesizer } from '../../utils/audioSynthesizer';

export const ReceiverSurprisePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [surprise, setSurprise] = useState<any | null>(null);
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      try {
        const res = await api.getSurpriseBySlug(slug);
        if (res.success) {
          setSurprise(res.surprise);
          setProduct(res.product);
        }
      } catch (err) {
        console.error('Surprise load error:', err);
      } finally {
        setLoading(false);
      }
    };
    load();

    return () => {
      audioSynthesizer.stop();
    };
  }, [slug]);

  // Trigger celebration confetti
  const fireConfetti = () => {
    // Left cannon
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6, x: 0.2 },
      colors: ['#e11d48', '#fb7185', '#f59e0b', '#ec4899', '#ffffff']
    });
    // Right cannon
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6, x: 0.8 },
      colors: ['#e11d48', '#fb7185', '#f59e0b', '#ec4899', '#ffffff']
    });
  };

  const handleOpenSurprise = () => {
    setIsOpened(true);
    fireConfetti();

    // Start background ambient music
    if (surprise?.music) {
      audioSynthesizer.playTrack(surprise.music);
    } else {
      audioSynthesizer.playTrack('acoustic-celebration');
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      if (surprise?.music) audioSynthesizer.playTrack(surprise.music);
      setIsMuted(false);
    } else {
      audioSynthesizer.stop();
      setIsMuted(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-serif tracking-widest uppercase text-rose-300">Unwrapping surprise...</p>
        </div>
      </div>
    );
  }

  if (!surprise) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
        <Gift className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="text-3xl font-serif font-bold">Surprise Not Found</h2>
        <p className="text-slate-400 text-sm mt-2 max-w-sm">
          This surprise link may have expired or was typed incorrectly.
        </p>
        <Link to="/" className="mt-6 px-6 py-2.5 bg-rose-600 rounded-xl font-bold text-sm">
          Visit GiftDrop
        </Link>
      </div>
    );
  }

  // CINEMATIC OPENING SCREEN (Before Clicking Open)
  if (!isOpened) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white flex flex-col items-center justify-between p-6 sm:p-12 relative overflow-hidden select-none">
        
        {/* Ambient floating lights */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-600/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Top Branding Pill */}
        <div className="pt-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-rose-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>A Special Gift is Waiting for You</span>
          </div>
        </div>

        {/* Central Opening Box Card */}
        <div className="text-center max-w-md mx-auto space-y-6 my-auto">
          
          {/* Animated Pulsing Gift Box Icon */}
          <div className="relative inline-block cursor-pointer group" onClick={handleOpenSurprise}>
            <div className="absolute -inset-4 bg-gradient-to-tr from-rose-500 to-amber-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 active:scale-95 transition-transform duration-300">
              <Gift className="w-14 h-14 animate-bounce" style={{ animationDuration: '2s' }} />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight text-white">
              Someone has a surprise for you…
            </h1>
            <p className="text-slate-300 text-sm font-medium">
              Turn your sound on and tap below to reveal your personal moment.
            </p>
          </div>

          {/* Open Button CTA */}
          <div className="pt-4">
            <button
              onClick={handleOpenSurprise}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-700 text-white font-extrabold text-base py-4 px-10 rounded-full shadow-2xl shadow-rose-600/50 transform hover:scale-105 active:scale-95 transition-all"
            >
              <span>Open Your Surprise 🎁</span>
            </button>
          </div>

        </div>

        {/* Footer Brand watermark */}
        <div className="text-xs text-slate-500 flex items-center space-x-1.5 pb-2">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>using GiftDrop</span>
        </div>

      </div>
    );
  }

  // CINEMATIC REVEAL EXPERIENCE (After Clicking Open)
  const theme = surprise.theme || 'Romantic';
  const color = surprise.colorPalette || '#e11d48';

  return (
    <div
      className="min-h-screen text-slate-900 relative transition-colors duration-700 pb-24"
      style={{
        background:
          theme === 'Dark'
            ? '#090d16'
            : theme === 'Celebration'
            ? '#fffbeb'
            : theme === 'Dreamy'
            ? '#faf5ff'
            : '#fff1f2'
      }}
    >
      {/* Floating Audio Controller */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={toggleMute}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-white transition-all"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-red-500" />
              <span>Unmute Music</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>Playing Music</span>
            </>
          )}
        </button>
      </div>

      {/* Main Surprise Story Container */}
      <div className="max-w-2xl mx-auto px-4 pt-16 sm:pt-20 space-y-12">
        
        {/* 1. Header & Receiver Name */}
        <div className="text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-xl flex items-center justify-center text-3xl">
            🎉
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-white/80 px-3.5 py-1 rounded-full shadow-sm">
            A Moment for You
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight text-slate-900">
            For {surprise.receiverName} ✨
          </h1>
          <p className="text-sm font-semibold text-slate-600">
            Sent with heartfelt love from <span className="text-rose-600 font-bold">{surprise.senderName}</span>
          </p>
        </div>

        {/* 2. Unfolded Letter / Love Note */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-rose-100/80 relative overflow-hidden animate-in slide-in-from-bottom duration-700">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500"></div>
          
          <div className="flex items-center space-x-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-6">
            <Heart className="w-4 h-4 fill-rose-500" />
            <span>Personal Note</span>
          </div>

          <div className="text-slate-800 text-lg sm:text-xl font-serif italic leading-relaxed whitespace-pre-line">
            "{surprise.message}"
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>{surprise.relationship}</span>
            <span className="font-bold text-rose-600 font-serif text-sm">— {surprise.senderName}</span>
          </div>
        </div>

        {/* 3. Photo Memories Gallery */}
        {surprise.photos && surprise.photos.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Captured Chapters</span>
              <h2 className="text-2xl font-bold font-serif text-slate-900 mt-1">Our Favorite Memories</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {surprise.photos.map((photo: any, idx: number) => (
                <div
                  key={photo.id || idx}
                  onClick={() => setActivePhotoModal(photo.url)}
                  className="bg-white p-3 rounded-2xl shadow-md border border-slate-100 group cursor-pointer hover:shadow-xl transition-all"
                >
                  <div className="relative h-64 rounded-xl overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.caption || 'Memory'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Maximize2 className="w-6 h-6" />
                    </div>
                  </div>
                  {photo.caption && (
                    <p className="text-xs font-serif italic text-slate-700 text-center mt-3 px-2 line-clamp-2">
                      "{photo.caption}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Memory Milestones Timeline */}
        {surprise.memories && surprise.memories.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Our Timeline</span>
              <h2 className="text-2xl font-bold font-serif text-slate-900 mt-1">Milestones & Moments</h2>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-rose-200 space-y-6 ml-4">
              {surprise.memories.map((m: any, idx: number) => (
                <div key={m.id || idx} className="relative bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="absolute -left-[35px] sm:-left-[43px] top-4 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                    {idx + 1}
                  </div>
                  <span className="text-xs font-mono font-bold text-rose-600">{m.date}</span>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">{m.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Final Sentimental Signoff */}
        <div className="text-center pt-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mx-auto">
            <Heart className="w-6 h-6 fill-rose-600" />
          </div>
          <h3 className="text-xl font-serif font-bold text-slate-900">
            "Every second with you is a gift."
          </h3>
          <p className="text-xs text-slate-500 font-medium">Made with ❤️ using GiftDrop</p>
        </div>

        {/* 6. Viral CTA: Create a Surprise for Someone */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 text-center shadow-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Pay the love forward</span>
          <h3 className="text-2xl font-serif font-bold">Inspired by this surprise?</h3>
          <p className="text-slate-300 text-xs max-w-sm mx-auto leading-relaxed">
            Create an unforgettable personalized digital experience for your friends, family, or partner.
          </p>
          <div className="pt-2">
            <Link
              to="/create"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 text-white font-bold text-xs py-3.5 px-6 rounded-full shadow-lg transition-all"
            >
              <span>Create a Surprise for Someone</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      {/* Lightbox Photo Modal */}
      {activePhotoModal && (
        <div
          onClick={() => setActivePhotoModal(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <button
            onClick={() => setActivePhotoModal(null)}
            className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/20 hover:bg-white/30"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activePhotoModal}
            alt="Full memory preview"
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
          />
        </div>
      )}

    </div>
  );
};
