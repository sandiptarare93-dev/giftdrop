import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, ShoppingBag, Eye, IndianRupee, ArrowUpRight } from 'lucide-react';
import { api } from '../../api/client';

export const AdminAnalytics: React.FC = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getAdminAnalytics();
        if (res.success) setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const stats = data?.stats || {};
  const occasions = data?.occasionBreakdown || [];
  const revenueTrends = data?.revenueTrends || [];

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold font-serif text-white">Business Analytics & Growth</h1>
        <p className="text-xs text-slate-400 mt-0.5">Comprehensive tracking of gifting behavior and acquisition channels</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
          <p className="text-xs font-semibold text-slate-400">Total Surprise Views</p>
          <p className="text-3xl font-extrabold font-serif text-white mt-2">{stats.totalSurpriseViews || 0}</p>
          <span className="text-[11px] text-purple-400 mt-1 block">Receiver engagement rate: 94%</span>
        </div>

        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
          <p className="text-xs font-semibold text-slate-400">Average Order Value</p>
          <p className="text-3xl font-extrabold font-serif text-white mt-2">₹285</p>
          <span className="text-[11px] text-emerald-400 mt-1 block">+12% vs last month</span>
        </div>

        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
          <p className="text-xs font-semibold text-slate-400">Checkout Conversion</p>
          <p className="text-3xl font-extrabold font-serif text-white mt-2">{stats.conversionRate || '4.8%'}</p>
          <span className="text-[11px] text-amber-400 mt-1 block">Industry standard: 2.5%</span>
        </div>

        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
          <p className="text-xs font-semibold text-slate-400">WhatsApp Shares</p>
          <p className="text-3xl font-extrabold font-serif text-white mt-2">1,420</p>
          <span className="text-[11px] text-emerald-400 mt-1 block">Viral sharing coefficient: 1.8</span>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-serif text-white">Monthly Revenue Progression</h3>
            <p className="text-xs text-slate-400">Past 6 months comparison</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Current Run-rate: ₹45,000 / mo
          </span>
        </div>

        <div className="space-y-4 pt-2">
          {revenueTrends.map((rt: any, i: number) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-300 font-bold">{rt.month}</span>
                <span className="font-mono text-white">₹{rt.revenue.toLocaleString()} ({rt.orders} orders)</span>
              </div>
              <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"
                  style={{ width: `${Math.round((rt.revenue / 40000) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
