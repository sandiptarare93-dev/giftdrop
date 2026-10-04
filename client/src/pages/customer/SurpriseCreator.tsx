import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useParams, Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  User,
  Heart,
  MessageSquare,
  Camera,
  Calendar,
  Music,
  Palette,
  Eye,
  Trash2,
  Plus,
  Play,
  Pause,
  Upload,
  CheckCircle,
  HelpCircle,
  ShoppingBag
} from 'lucide-react';
import { api } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { audioSynthesizer } from '../../utils/audioSynthesizer';

export const SurpriseCreator: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { id: editId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [playingMusic, setPlayingMusic] = useState<string | null>(null);

  // Form State
  const [selectedProductId, setSelectedProductId] = useState(searchParams.get('product') || 'prod-1');
  const [receiverName, setReceiverName] = useState('');
  const [senderName, setSenderName] = useState(user?.name || '');
  const [relationship, setRelationship] = useState('Friend');
  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState<Array<{ id: string; url: string; caption?: string }>>([
    {
      id: 'p1',
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80',
      caption: 'Our magical starlit night'
    },
    {
      id: 'p2',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
      caption: 'The day we laughed until our stomachs hurt'
    }
  ]);
  const [memories, setMemories] = useState<Array<{ id: string; date: string; title: string; description: string }>>([
    {
      id: 'm1',
      date: '14 Feb 2024',
      title: 'The First Spark',
      description: 'A cozy evening coffee that turned into a four-hour conversation.'
    }
  ]);
  const [music, setMusic] = useState('acoustic-celebration');
  const [theme, setTheme] = useState('Romantic');
  const [colorPalette, setColorPalette] = useState('#e11d48');
  const [savedSurpriseId, setSavedSurpriseId] = useState<string | null>(editId || null);

  // Load products & existing surprise if editId
  useEffect(() => {
    const init = async () => {
      try {
        const prodRes = await api.getProducts();
        if (prodRes.success) setProducts(prodRes.products);

        if (editId) {
          const surpRes = await api.getSurpriseById(editId);
          if (surpRes.success && surpRes.surprise) {
            const s = surpRes.surprise;
            setSelectedProductId(s.productId);
            setReceiverName(s.receiverName);
            setSenderName(s.senderName);
            setRelationship(s.relationship);
            setMessage(s.message);
            if (s.photos) setPhotos(s.photos);
            if (s.memories) setMemories(s.memories);
            if (s.music) setMusic(s.music);
            if (s.theme) setTheme(s.theme);
            if (s.colorPalette) setColorPalette(s.colorPalette);
            setSavedSurpriseId(s.id);
          }
        }
      } catch (err) {
        console.error('Creator load error:', err);
      }
    };
    init();

    return () => {
      audioSynthesizer.stop();
    };
  }, [editId]);

  // Audio preview toggle
  const togglePlayMusic = (track: string) => {
    if (playingMusic === track) {
      audioSynthesizer.stop();
      setPlayingMusic(null);
    } else {
      audioSynthesizer.playTrack(track);
      setPlayingMusic(track);
    }
  };

  // Add Photo Mock / Upload
  const handleAddSamplePhoto = () => {
    const samples = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80'
    ];
    const randomUrl = samples[Math.floor(Math.random() * samples.length)];
    setPhotos([
      ...photos,
      { id: `p-${Date.now()}`, url: randomUrl, caption: 'A precious captured moment' }
    ]);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos([
          ...photos,
          { id: `p-${Date.now()}`, url: reader.result as string, caption: file.name.split('.')[0] }
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleMovePhoto = (from: number, to: number) => {
    if (to < 0 || to >= photos.length) return;
    const updated = [...photos];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setPhotos(updated);
  };

  // Add Memory
  const handleAddMemory = () => {
    setMemories([
      ...memories,
      {
        id: `m-${Date.now()}`,
        date: 'Today',
        title: 'New Memory Milestone',
        description: 'Describe this memorable moment...'
      }
    ]);
  };

  const handleUpdateMemory = (index: number, field: string, val: string) => {
    const updated = [...memories];
    updated[index] = { ...updated[index], [field]: val };
    setMemories(updated);
  };

  const handleRemoveMemory = (index: number) => {
    setMemories(memories.filter((_, i) => i !== index));
  };

  // Save or Update Surprise
  const handleSaveSurprise = async () => {
    setSubmitting(true);
    try {
      const payload = {
        productId: selectedProductId,
        receiverName: receiverName || 'Someone Special',
        senderName: senderName || 'Someone who loves you',
        relationship,
        message: message || 'You make the world brighter just by being in it!',
        photos,
        memories,
        music,
        theme,
        colorPalette
      };

      let surpriseId = savedSurpriseId;
      if (surpriseId) {
        await api.updateSurprise(surpriseId, payload);
      } else {
        const res = await api.createSurprise(payload);
        if (res.success && res.surprise) {
          surpriseId = res.surprise.id;
          setSavedSurpriseId(surpriseId);
        }
      }
      return surpriseId;
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to save surprise');
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  const handleProceedToCheckout = async () => {
    const sId = await handleSaveSurprise();
    if (sId) {
      navigate(`/checkout/${sId}`);
    }
  };

  const stepsList = [
    { num: 1, title: 'Receiver', icon: User },
    { num: 2, title: 'Message', icon: MessageSquare },
    { num: 3, title: 'Photos', icon: Camera },
    { num: 4, title: 'Memories', icon: Calendar },
    { num: 5, title: 'Music', icon: Music },
    { num: 6, title: 'Theme', icon: Palette },
    { num: 7, title: 'Preview', icon: Eye }
  ];

  const themeOptions = [
    { name: 'Romantic', color: '#e11d48', desc: 'Blushing roses, love notes & gentle passion' },
    { name: 'Elegant', color: '#0f172a', desc: 'Gold trims, timeless editorial typography' },
    { name: 'Minimal', color: '#475569', desc: 'Clean aesthetics, soft shadows, modern clarity' },
    { name: 'Dreamy', color: '#9333ea', desc: 'Pastel purple skies and starry shimmer' },
    { name: 'Celebration', color: '#f59e0b', desc: 'Confetti bursts, vibrant energy and party vibes' },
    { name: 'Dark', color: '#1e1b4b', desc: 'Sleek midnight neon for late-night surprises' }
  ];

  const musicTracks = [
    { id: 'acoustic-celebration', name: 'Acoustic Celebration', desc: 'Upbeat gentle guitar strums' },
    { id: 'gentle-piano', name: 'Gentle Piano Love', desc: 'Emotional piano arpeggios' },
    { id: 'indie-acoustic', name: 'Indie Nostalgia', desc: 'Warm heartfelt coffeehouse vibe' },
    { id: 'orchestral-strings', name: 'Orchestral Strings', desc: 'Cinematic romance & crescendo' }
  ];

  return (
    <div className="py-8 bg-[#FAFAFA] min-h-[90vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Progress Tracker */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                Step {step} of 7
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-1">
                {stepsList[step - 1].title} Details
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Back</span>
                </button>
              )}
              {step < 7 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="flex items-center space-x-1 px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  disabled={submitting}
                  className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Continue to Checkout</span>
                </button>
              )}
            </div>
          </div>

          {/* Stepper Pills */}
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-none">
            {stepsList.map((s) => {
              const Icon = s.icon;
              const isCurrent = step === s.num;
              const isPassed = step > s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => setStep(s.num)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isCurrent
                      ? 'bg-rose-600 text-white shadow-sm'
                      : isPassed
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{s.num}. {s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP CONTENT CONTAINER */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
          
          {/* STEP 1: RECEIVER */}
          {step === 1 && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold font-serif text-slate-900">Who is this surprise for?</h3>
                <p className="text-xs text-slate-500 mt-1">We'll personalize their experience name and intro reveal.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Receiver's Name *
                </label>
                <input
                  type="text"
                  required
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  placeholder="e.g. Priya"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Your Name (Sender) *
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Aarav"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Your Relationship
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {['Friend', 'Partner', 'Family', 'Best Friend', 'Other'].map((rel) => (
                    <button
                      key={rel}
                      type="button"
                      onClick={() => setRelationship(rel)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        relationship === rel
                          ? 'border-rose-600 bg-rose-50 text-rose-700 shadow-sm'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {rel}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: MESSAGE */}
          {step === 2 && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold font-serif text-slate-900">Your Personal Message</h3>
                <p className="text-xs text-slate-500 mt-1">This will unfold as an interactive love letter or tribute note.</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Personalized Message
                  </label>
                  <span className={`text-xs font-mono ${message.length > 500 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                    {message.length} / 800 characters
                  </span>
                </div>
                <textarea
                  rows={6}
                  maxLength={800}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your personal message... (e.g. Happy Birthday to the most incredible soul I know! Every day with you is a gift...)"
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 leading-relaxed font-sans"
                ></textarea>
              </div>

              {/* Inspiration Presets */}
              <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 space-y-2">
                <p className="text-xs font-bold text-rose-800 uppercase tracking-wide">💡 Quick Inspiration Presets</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setMessage("Happy Birthday to the most special person in my life! You bring endless laughter, kindness, and warmth into every single day. I hope this year brings you everything your beautiful heart desires. Love you always!")}
                    className="text-[11px] font-medium bg-white px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50"
                  >
                    Birthday Love
                  </button>
                  <button
                    type="button"
                    onClick={() => setMessage("Happy Anniversary! Reliving these memories reminds me why I fell in love with you in the first place. You are my home, my best friend, and my greatest adventure.")}
                    className="text-[11px] font-medium bg-white px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50"
                  >
                    Anniversary Romantic
                  </button>
                  <button
                    type="button"
                    onClick={() => setMessage("To the truest friend anyone could ask for: thank you for standing by me through every wild idea, late night crisis, and celebration. Here is to our unstoppable bond!")}
                    className="text-[11px] font-medium bg-white px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50"
                  >
                    True Friendship
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PHOTOS */}
          {step === 3 && (
            <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">Photo Memories Gallery</h3>
                  <p className="text-xs text-slate-500 mt-1">Upload personal pictures to showcase in their interactive photo album.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="cursor-pointer flex items-center space-x-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  <button
                    type="button"
                    onClick={handleAddSamplePhoto}
                    className="flex items-center space-x-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Sample</span>
                  </button>
                </div>
              </div>

              {/* Photo Cards Grid */}
              {photos.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl p-6">
                  <Camera className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700">No photos uploaded yet</p>
                  <p className="text-xs text-slate-400 mt-1">Upload pictures or click 'Add Sample' to preview.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((p, idx) => (
                    <div key={p.id} className="relative bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden group">
                      <div className="h-40 overflow-hidden relative">
                        <img src={p.url} alt="Uploaded memory" className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold">
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="p-3">
                        <input
                          type="text"
                          value={p.caption || ''}
                          onChange={(e) => {
                            const updated = [...photos];
                            updated[idx].caption = e.target.value;
                            setPhotos(updated);
                          }}
                          placeholder="Add memory caption..."
                          className="w-full text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-rose-500"
                        />
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-xs">
                          <div className="flex space-x-1">
                            <button
                              type="button"
                              onClick={() => handleMovePhoto(idx, idx - 1)}
                              disabled={idx === 0}
                              className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 disabled:opacity-30"
                            >
                              ←
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMovePhoto(idx, idx + 1)}
                              disabled={idx === photos.length - 1}
                              className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 disabled:opacity-30"
                            >
                              →
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(idx)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: MEMORIES TIMELINE */}
          {step === 4 && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">Memory Timeline</h3>
                  <p className="text-xs text-slate-500 mt-1">Add milestone dates celebrating your story together.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddMemory}
                  className="flex items-center space-x-1 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Milestone</span>
                </button>
              </div>

              <div className="space-y-4">
                {memories.map((m, idx) => (
                  <div key={m.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-600 uppercase">Milestone #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMemory(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Date</label>
                        <input
                          type="text"
                          value={m.date}
                          onChange={(e) => handleUpdateMemory(idx, 'date', e.target.value)}
                          placeholder="e.g. 15 Oct 2023"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Title</label>
                        <input
                          type="text"
                          value={m.title}
                          onChange={(e) => handleUpdateMemory(idx, 'title', e.target.value)}
                          placeholder="e.g. Our First Road Trip"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={m.description}
                        onChange={(e) => handleUpdateMemory(idx, 'description', e.target.value)}
                        placeholder="What made this memory so unforgettable..."
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: MUSIC */}
          {step === 5 && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold font-serif text-slate-900">Background Soundtrack</h3>
                <p className="text-xs text-slate-500 mt-1">Soothing ambient audio that accompanies the opening reveal.</p>
              </div>

              <div className="space-y-3">
                {musicTracks.map((track) => {
                  const isSelected = music === track.id;
                  const isAudioActive = playingMusic === track.id;
                  return (
                    <div
                      key={track.id}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <button
                          type="button"
                          onClick={() => togglePlayMusic(track.id)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            isAudioActive
                              ? 'bg-rose-600 text-white animate-pulse'
                              : 'bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-600'
                          }`}
                        >
                          {isAudioActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{track.name}</h4>
                          <p className="text-xs text-slate-500">{track.desc}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setMusic(track.id)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: THEME */}
          {step === 6 && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold font-serif text-slate-900">Atmosphere & Color Theme</h3>
                <p className="text-xs text-slate-500 mt-1">Pick the mood and visual styling for their reveal page.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-3">Theme Style</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {themeOptions.map((th) => {
                    const isSelected = theme === th.name;
                    return (
                      <div
                        key={th.name}
                        onClick={() => {
                          setTheme(th.name);
                          setColorPalette(th.color);
                        }}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-rose-600 bg-rose-50/40 shadow-md ring-2 ring-rose-500/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-sm text-slate-900">{th.name}</span>
                          <span
                            className="w-4 h-4 rounded-full border border-white shadow-sm"
                            style={{ backgroundColor: th.color }}
                          ></span>
                        </div>
                        <p className="text-xs text-slate-500">{th.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Accent Color Palette</label>
                <div className="flex items-center space-x-3">
                  {['#e11d48', '#be123c', '#9333ea', '#2563eb', '#059669', '#d97706', '#0f172a'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColorPalette(c)}
                      className={`w-9 h-9 rounded-full border-2 transition-all ${
                        colorPalette === c ? 'border-slate-900 scale-110 shadow-md' : 'border-white'
                      }`}
                      style={{ backgroundColor: c }}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: PREVIEW */}
          {step === 7 && (
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
              <div className="text-center pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                  Live Interactive Mockup
                </span>
                <h3 className="text-2xl font-serif font-extrabold text-slate-900 mt-2">
                  Preview Your Surprise Experience
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  This is how the recipient will experience your surprise on their phone or computer!
                </p>
              </div>

              {/* Simulated Receiver Card */}
              <div
                className="rounded-3xl p-6 sm:p-8 text-center text-white relative overflow-hidden shadow-2xl transition-all"
                style={{
                  background:
                    theme === 'Dark'
                      ? 'linear-gradient(135deg, #090d16, #1e1b4b)'
                      : theme === 'Celebration'
                      ? 'linear-gradient(135deg, #f59e0b, #e11d48)'
                      : theme === 'Dreamy'
                      ? 'linear-gradient(135deg, #7c3aed, #ec4899)'
                      : 'linear-gradient(135deg, #e11d48, #fb7185)'
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
                  🎁
                </div>

                <span className="text-xs font-bold uppercase tracking-widest opacity-80">A digital surprise for</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-serif mt-1 mb-4">
                  {receiverName || 'Someone Special'} ✨
                </h2>

                {/* Love Note */}
                <div className="max-w-lg mx-auto bg-white/95 text-slate-800 p-5 rounded-2xl shadow-lg text-sm italic font-serif leading-relaxed my-6">
                  "{message || 'You make the world brighter just by being in it!'}"
                  <p className="text-right text-xs font-bold text-rose-600 not-italic mt-3">
                    — With love, {senderName || 'Your Friend'}
                  </p>
                </div>

                {/* Photos mini reel */}
                {photos.length > 0 && (
                  <div className="pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-3">Photo Memories</p>
                    <div className="flex justify-center gap-3 overflow-x-auto pb-2">
                      {photos.map((p) => (
                        <div key={p.id} className="w-24 h-24 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white/50">
                          <img src={p.url} alt="Memory" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Memories timeline snippet */}
                {memories.length > 0 && (
                  <div className="pt-6 max-w-md mx-auto text-left">
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-3 text-center">Memory Timeline</p>
                    <div className="space-y-2">
                      {memories.map((m) => (
                        <div key={m.id} className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-xs">
                          <span className="font-mono text-amber-300 font-bold block">{m.date}</span>
                          <span className="font-bold text-white block">{m.title}</span>
                          <span className="text-white/80 text-[11px]">{m.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  Edit Surprise Details
                </button>
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  disabled={submitting}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Continue to Checkout</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
