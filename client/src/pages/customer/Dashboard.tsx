import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Gift,
  CheckCircle,
  Clock,
  Eye,
  Plus,
  ArrowRight,
  ExternalLink,
  Edit3,
  Share2,
  Trash2
} from 'lucide-react';
import { api } from '../../api/client';
import { useAuth } from '../../context/AuthContext';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [surprises, setSurprises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const totalSurprises = surprises.length;
  const publishedSurprises = surprises.filter((s) => s.status === 'published').length;
  const draftSurprises = surprises.filter((s) => s.status === 'draft').length;
  const totalViews = surprises.reduce((sum, s) => sum + (s.views || 0), 0);

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-rose-600/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-100">Welcome Back</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1">
            Hi, {user?.name || 'Friend'} 👋
          </h1>
          <p className="text-rose-100 text-xs sm:text-sm mt-1 max-w-md">
            Manage your personalized surprises, track views in real-time, or craft a new moment today.
          </p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center space-x-2 bg-white text-rose-600 hover:bg-rose-50 font-bold text-xs px-5 py-3 rounded-2xl shadow-md transition-transform hover:scale-105 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Surprise</span>
        </Link>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Surprises</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-serif text-slate-900 mt-2">{totalSurprises}</p>
          <p className="text-[11px] text-slate-400 mt-1">All time created</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Published</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-serif text-slate-900 mt-2">{publishedSurprises}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Live & Shareable</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Drafts</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-serif text-slate-900 mt-2">{draftSurprises}</p>
          <p className="text-[11px] text-amber-600 font-semibold mt-1">Pending checkout</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Views</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-serif text-slate-900 mt-2">{totalViews}</p>
          <p className="text-[11px] text-blue-600 font-semibold mt-1">Receiver opens</p>
        </div>

      </div>

      {/* Recent Surprises Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-serif text-slate-900">Recent Surprises</h3>
            <p className="text-xs text-slate-500 mt-0.5">Your created experiences and links</p>
          </div>
          <Link
            to="/dashboard/surprises"
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading surprises...</div>
        ) : surprises.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Gift className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">You haven't created any surprises yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Create your first personalized digital experience for a friend, partner, or family member in under 5 minutes.
            </p>
            <div className="pt-2">
              <Link
                to="/create"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create a Surprise</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-6">Receiver</th>
                  <th className="py-3 px-6">Relationship</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Views</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {surprises.slice(0, 5).map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {s.receiverName}
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      {s.relationship}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          s.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono font-semibold">
                      {s.views || 0}
                    </td>
                    <td className="py-4 px-6 text-slate-400 text-[11px]">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link
                        to={`/s/${s.publicSlug}`}
                        target="_blank"
                        className="inline-flex p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="View Live Surprise"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to={`/editor/${s.id}`}
                        className="inline-flex p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                        title="Edit Details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="inline-flex p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
