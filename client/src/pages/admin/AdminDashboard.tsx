import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  ShoppingBag,
  IndianRupee,
  Gift,
  Eye,
  TrendingUp,
  Package,
  Tag,
  ArrowUpRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { api } from '../../api/client';

export const AdminDashboard: React.FC = () => {
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
  const timeline = data?.activityTimeline || [];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Platform Overview</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1">
            Admin Master Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Real-time revenue, orders, and surprise delivery metrics</p>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/admin/products"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            Manage Products
          </Link>
          <Link
            to="/admin/orders"
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-md shadow-rose-900/30"
          >
            View Orders
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold font-serif text-white mt-2">
            ₹{stats.totalRevenue ? stats.totalRevenue.toLocaleString() : '0'}
          </p>
          <span className="text-[10px] font-semibold text-emerald-400 flex items-center mt-1">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +24% this month
          </span>
        </div>

        <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold font-serif text-white mt-2">{stats.totalOrders || 0}</p>
          <span className="text-[10px] font-semibold text-slate-400 mt-1 block">Paid & completed</span>
        </div>

        <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Registered Users</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold font-serif text-white mt-2">{stats.totalUsers || 0}</p>
          <span className="text-[10px] font-semibold text-blue-400 mt-1 block">Active accounts</span>
        </div>

        <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Published Surprises</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Gift className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold font-serif text-white mt-2">{stats.activeSurprises || 0}</p>
          <span className="text-[10px] font-semibold text-amber-400 mt-1 block">Live links</span>
        </div>

        <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Surprise Views</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold font-serif text-white mt-2">{stats.totalSurpriseViews || 0}</p>
          <span className="text-[10px] font-semibold text-purple-400 mt-1 block">Receiver visits</span>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Revenue & Growth Trend Chart */}
        <div className="lg:col-span-8 bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-serif">Revenue & Sales Trajectory</h3>
              <p className="text-xs text-slate-400">Monthly revenue volume (₹ INR)</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Conversion: {stats.conversionRate || '4.8%'}
            </span>
          </div>

          {/* Clean Bar Visualization */}
          <div className="h-48 flex items-end justify-between gap-4 pt-4 border-b border-slate-800 pb-2">
            {revenueTrends.map((rt: any, i: number) => {
              const heightPercent = Math.round((rt.revenue / 40000) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    ₹{rt.revenue}
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-rose-600 to-amber-500 rounded-t-xl group-hover:brightness-110 transition-all cursor-pointer"
                    style={{ height: `${heightPercent}%` }}
                  ></div>
                  <span className="text-xs font-semibold text-slate-400">{rt.month}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
            <span>Avg Order Value: ₹285</span>
            <span>Total Completed Transactions: 520+</span>
          </div>
        </div>

        {/* Occasions Breakdown */}
        <div className="lg:col-span-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white font-serif">Occasions Breakdown</h3>
            <p className="text-xs text-slate-400">Most gifted occasion categories</p>
          </div>

          <div className="space-y-3 pt-2">
            {occasions.map((occ: any, i: number) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">{occ.name}</span>
                  <span className="font-mono text-slate-400 font-bold">{occ.count} surprises</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full"
                    style={{ width: `${Math.min(100, (occ.count / 5) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <Link
              to="/admin/analytics"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
            >
              <span>View In-Depth Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* Surprise Creation Timeline */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-serif">Weekly Creation & Engagement Activity</h3>
            <p className="text-xs text-slate-400">Surprises created vs receiver views across the week</p>
          </div>
          <span className="text-xs text-slate-400">Peak days: Friday & Saturday</span>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-2 text-center text-xs">
          {timeline.map((t: any, i: number) => (
            <div key={i} className="p-3 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-1">
              <span className="font-bold text-slate-300 block">{t.day}</span>
              <p className="text-rose-400 font-bold text-sm">+{t.surprises}</p>
              <span className="text-[10px] text-slate-500 block">{t.views} views</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
