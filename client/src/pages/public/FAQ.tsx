import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [query, setQuery] = useState('');

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

  const filteredFaqs = faqs.filter(
    (f) => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="py-16 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Help & Knowledge Base
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 font-serif mt-3">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Find answers to commonly asked questions about GiftDrop surprise experiences.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions (e.g., photos, music, WhatsApp, payment)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 shadow-sm"
          />
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 hover:text-rose-600 transition-colors"
                >
                  <span className="text-base font-serif">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transform transition-transform duration-200 ${
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

        {/* Bottom Help Prompt */}
        <div className="mt-16 p-8 rounded-3xl bg-white border border-slate-200 text-center">
          <h3 className="text-lg font-bold font-serif text-slate-900">Still have a question?</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">We are always happy to help you make your surprise extraordinary.</p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            <span>Contact Support</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
