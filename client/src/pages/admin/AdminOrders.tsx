import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, ExternalLink, Filter, CheckCircle, Clock } from 'lucide-react';
import { api } from '../../api/client';

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getAllOrdersAdmin();
        if (res.success) setOrders(res.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      (o.userName && o.userName.toLowerCase().includes(search.toLowerCase())) ||
      (o.userEmail && o.userEmail.toLowerCase().includes(search.toLowerCase())) ||
      (o.productName && o.productName.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || o.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-serif text-white">All Orders</h1>
        <p className="text-xs text-slate-400 mt-0.5">Track payments, customer purchases, and transaction states</p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID, customer name, email or product..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading all customer orders...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Product / Surprise</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Coupon</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300 font-medium">
                {filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-white">
                      {o.orderNumber}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-white">{o.userName || 'Customer'}</p>
                      <p className="text-[11px] text-slate-400">{o.userEmail}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-white font-medium">{o.productName}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{o.surpriseTitle}</p>
                    </td>
                    <td className="py-4 px-6 font-bold text-rose-400">
                      ₹{o.amount}
                      {o.discount > 0 && (
                        <span className="text-slate-500 font-normal text-[10px] block">
                          Disc: ₹{o.discount}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {o.couponCode ? (
                        <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-mono text-[10px] border border-rose-500/20">
                          {o.couponCode}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          o.paymentStatus === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-slate-400 text-[11px]">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
