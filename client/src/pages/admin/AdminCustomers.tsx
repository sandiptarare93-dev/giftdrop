import React, { useState, useEffect } from 'react';
import { Users, Search, Shield, UserCheck, Mail, Calendar } from 'lucide-react';
const initialDemoUsers = [
  { id: 'user-admin', name: 'GiftDrop Administrator', email: 'admin@giftdrop.com', role: 'admin', referralCode: 'ADMINVIP', createdAt: '2026-01-10T00:00:00.000Z', profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' },
  { id: 'user-1', name: 'Aarav Sharma', email: 'user@giftdrop.com', role: 'customer', referralCode: 'AARAV20', createdAt: '2026-01-15T10:30:00.000Z', profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' },
  { id: 'user-2', name: 'Aditi Rao', email: 'aditi@example.com', role: 'customer', referralCode: 'ADITI50', createdAt: '2026-01-20T14:15:00.000Z', profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
  { id: 'user-3', name: 'Rahul Verma', email: 'rahul@example.com', role: 'customer', referralCode: 'RAHUL99', createdAt: '2026-02-01T09:45:00.000Z', profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  { id: 'user-4', name: 'Sneha Nair', email: 'sneha@example.com', role: 'customer', referralCode: 'SNEHA10', createdAt: '2026-02-05T12:00:00.000Z', profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  { id: 'user-5', name: 'Karan Patel', email: 'karan@example.com', role: 'customer', referralCode: 'KARAN77', createdAt: '2026-02-12T16:20:00.000Z', profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { id: 'user-6', name: 'Ananya Roy', email: 'ananya@example.com', role: 'customer', referralCode: 'ANANYA', createdAt: '2026-02-18T18:00:00.000Z', profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' },
  { id: 'user-7', name: 'Vikram Joshi', email: 'vikram@example.com', role: 'customer', referralCode: 'VIKRAM', createdAt: '2026-02-22T11:10:00.000Z', profileImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80' },
  { id: 'user-8', name: 'Priya Singhania', email: 'priya@example.com', role: 'customer', referralCode: 'PRIYAS', createdAt: '2026-03-01T15:30:00.000Z', profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
  { id: 'user-9', name: 'Tanvi Deshmukh', email: 'tanvi@example.com', role: 'customer', referralCode: 'TANVID', createdAt: '2026-03-08T08:50:00.000Z', profileImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80' }
];

export const AdminCustomers: React.FC = () => {
  const [users, setUsers] = useState<any[]>(initialDemoUsers);
  const [search, setSearch] = useState('');

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-serif text-white">Registered Customers</h1>
        <p className="text-xs text-slate-400 mt-0.5">Manage user accounts, roles, and registration dates</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer name or email..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500"
        />
      </div>

      {/* Users Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Email</th>
                <th className="py-3.5 px-6">Role</th>
                <th className="py-3.5 px-6">Referral Code</th>
                <th className="py-3.5 px-6 text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300 font-medium">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-4 px-6 flex items-center space-x-3">
                    <img
                      src={u.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                      alt={u.name}
                      className="w-9 h-9 rounded-full object-cover bg-slate-800 shrink-0 ring-1 ring-slate-700"
                    />
                    <span className="font-bold text-white text-sm">{u.name}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    {u.email}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        u.role === 'admin'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {u.role === 'admin' ? <Shield className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                      <span>{u.role}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono text-[11px] text-slate-400">
                    {u.referralCode || 'GIFTNOW'}
                  </td>
                  <td className="py-4 px-6 text-right text-slate-400 text-[11px]">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
