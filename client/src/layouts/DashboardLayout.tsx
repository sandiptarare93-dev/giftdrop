import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Gift,
  PlusCircle,
  ShoppingBag,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Share2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ReferralModal } from '../components/ReferralModal';

export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [referralOpen, setReferralOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Surprises', path: '/dashboard/surprises', icon: Gift },
    { name: 'Create Surprise', path: '/create', icon: PlusCircle },
    { name: 'Orders', path: '/dashboard/orders', icon: ShoppingBag },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white">
            <Gift className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 font-serif">
            Gift<span className="text-rose-600">Drop</span>
          </span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo Area */}
          <div className="p-6 border-b border-slate-100">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-serif">
                  Gift<span className="text-rose-600">Drop</span>
                </span>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Customer Portal</p>
              </div>
            </Link>
          </div>

          {/* User Profile Snippet */}
          <div className="p-4 mx-4 mt-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center space-x-3">
            <img
              src={user?.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-500/20"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{user?.name || 'Customer'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-rose-50 text-rose-600 font-semibold shadow-sm shadow-rose-100'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Referral Card & Logout */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          {/* Referral Card */}
          <div className="bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-pink-500/10 p-3.5 rounded-2xl border border-rose-100/60">
            <div className="flex items-center space-x-2 text-rose-700 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Earn ₹50 Credit</span>
            </div>
            <p className="text-[11px] text-slate-600 mb-2.5">
              Invite friends to GiftDrop and earn ₹50 gifting credit!
            </p>
            <button
              onClick={() => setReferralOpen(true)}
              className="w-full text-center text-xs font-semibold py-1.5 rounded-lg bg-white text-rose-600 shadow-sm border border-rose-200 hover:bg-rose-50"
            >
              Share Referral Link
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full">
        <Outlet />
      </main>

      {/* Referral Modal */}
      <ReferralModal isOpen={referralOpen} onClose={() => setReferralOpen(false)} />
    </div>
  );
};
