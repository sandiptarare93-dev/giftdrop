import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import { MainLayout } from './layouts/MainLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { Home } from './pages/public/Home';
import { Explore } from './pages/public/Explore';
import { Occasions } from './pages/public/Occasions';
import { ProductDetails } from './pages/public/ProductDetails';
import { HowItWorks } from './pages/public/HowItWorks';
import { Pricing } from './pages/public/Pricing';
import { About } from './pages/public/About';
import { Contact } from './pages/public/Contact';
import { FAQ } from './pages/public/FAQ';
import { Login } from './pages/public/Login';
import { Register } from './pages/public/Register';

// Customer Pages
import { SurpriseCreator } from './pages/customer/SurpriseCreator';
import { CustomerDashboard } from './pages/customer/Dashboard';
import { MySurprises } from './pages/customer/MySurprises';
import { OrdersPage } from './pages/customer/OrdersPage';
import { ProfilePage } from './pages/customer/ProfilePage';
import { SettingsPage } from './pages/customer/SettingsPage';
import { PreviewPage } from './pages/customer/PreviewPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { PaymentSuccessPage } from './pages/customer/PaymentSuccessPage';

// Receiver Page
import { ReceiverSurprisePage } from './pages/receiver/ReceiverSurprisePage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminCoupons } from './pages/admin/AdminCoupons';
import { AdminReviews } from './pages/admin/AdminReviews';
import { AdminSettings } from './pages/admin/AdminSettings';

// Route Guards
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          {/* Public Pages wrapped in MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/occasions" element={<Occasions />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Surprise creation and checkout */}
            <Route path="/create" element={<SurpriseCreator />} />
            <Route path="/editor/:id" element={<SurpriseCreator />} />
            <Route path="/preview/:id" element={<PreviewPage />} />
            <Route path="/checkout/:surpriseId" element={<CheckoutPage />} />
            <Route path="/payment-success/:orderId" element={<PaymentSuccessPage />} />
          </Route>

          {/* Customer Dashboard Portal */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CustomerDashboard />} />
            <Route path="surprises" element={<MySurprises />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Public Surprise Receiver Page (Standalone Cinematic View) */}
          <Route path="/s/:slug" element={<ReceiverSurprisePage />} />
          <Route path="/surprise/:slug" element={<ReceiverSurprisePage />} />

          {/* Admin Dashboard Portal */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 Catch-All */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
