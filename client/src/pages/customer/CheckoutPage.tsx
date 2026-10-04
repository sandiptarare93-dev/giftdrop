import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Tag,
  CreditCard,
  Lock,
  ArrowRight,
  Gift,
  CheckCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { api } from '../../api/client';
import { useAuth } from '../../context/AuthContext';

export const CheckoutPage: React.FC = () => {
  const { surpriseId } = useParams<{ surpriseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [surprise, setSurprise] = useState<any | null>(null);
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Order Details
  const [couponCode, setCouponCode] = useState('WELCOME20');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!surpriseId) return;
      try {
        const res = await api.getSurpriseById(surpriseId);
        if (res.success) {
          setSurprise(res.surprise);
          setProduct(res.product);
          // Auto apply default coupon if applicable
          if (res.product?.price) {
            handleApplyCoupon('WELCOME20', res.product.price);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [surpriseId]);

  const handleApplyCoupon = async (codeToApply?: string, customAmount?: number) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (!code) return;
    const price = customAmount !== undefined ? customAmount : (product?.price || 199);

    try {
      const res = await api.validateCoupon(code, price);
      if (res.success && res.coupon) {
        setDiscount(res.coupon.discountAmount);
        setAppliedCoupon(code);
        setCouponMessage({ text: `Coupon ${code} applied! Saved ₹${res.coupon.discountAmount}`, error: false });
      }
    } catch (err: any) {
      setDiscount(0);
      setAppliedCoupon(null);
      setCouponMessage({ text: err.message || 'Invalid coupon', error: true });
    }
  };

  const handlePaySecurely = async () => {
    if (!customerEmail) {
      alert('Please enter your email to receive order confirmation and surprise link.');
      return;
    }
    setProcessing(true);

    try {
      // 1. Create order
      const checkoutRes = await api.createCheckout({
        surpriseId: surprise.id,
        couponCode: appliedCoupon,
        customerName: customerName || 'GiftDrop Customer',
        customerEmail: customerEmail
      });

      if (!checkoutRes.success) {
        throw new Error('Failed to create order');
      }

      const order = checkoutRes.order;

      // 2. Simulate Razorpay verification (or live Razorpay script if key configured)
      const verifyRes = await api.verifyPayment({
        orderId: order.id,
        razorpayOrderId: checkoutRes.razorpayOrder?.id,
        mockSuccess: true
      });

      if (verifyRes.success) {
        navigate(`/payment-success/${order.id}`);
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Payment processing error');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const basePrice = product?.price || 199;
  const finalPrice = Math.max(0, basePrice - discount);

  return (
    <div className="py-12 bg-[#FAFAFA] min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Secure 256-Bit SSL Checkout
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 font-serif mt-2">
            Complete Your Surprise
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Instantly receive your private shareable link & downloadable QR code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left: Customer Info & Payment Method */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Customer Details Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Delivery Email
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Email Address * <span className="text-slate-400 font-normal">(Receipt & link will be sent here)</span>
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
            </div>

            {/* Payment Method Selector (Razorpay Gateway Architecture) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Payment Method
                </h3>
                <span className="flex items-center space-x-1 text-xs font-semibold text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Razorpay Verified</span>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/80 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-rose-600 flex items-center justify-center shadow-sm">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">UPI / Cards / NetBanking / Wallets</p>
                    <p className="text-xs text-slate-500">Google Pay, PhonePe, Paytm, Visa, Mastercard, RuPay</p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border-4 border-rose-600 bg-white"></div>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center space-x-1 pt-1">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Your payment information is encrypted and never stored on our servers.</span>
              </div>
            </div>

          </div>

          {/* Right: Order Summary & Coupon */}
          <div className="md:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
                Order Summary
              </h3>

              {/* Product Info */}
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={product?.images?.[0] || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&q=80'}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{product?.name || 'GiftDrop Surprise'}</h4>
                  <p className="text-xs text-slate-500 truncate">For {surprise?.receiverName || 'Someone Special'}</p>
                  <p className="text-xs font-semibold text-rose-600">₹{basePrice}</p>
                </div>
              </div>

              {/* Coupon Field */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Coupon Code</label>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. WELCOME20"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono uppercase focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon()}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {couponMessage && (
                  <p className={`text-[11px] mt-1.5 font-medium ${couponMessage.error ? 'text-red-600' : 'text-emerald-600'}`}>
                    {couponMessage.text}
                  </p>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Product Price</span>
                  <span>₹{basePrice}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-semibold">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-slate-600">
                  <span>Hosting & QR Generation</span>
                  <span className="text-emerald-600 font-medium">FREE</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex items-baseline justify-between text-base font-bold text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-2xl font-serif font-extrabold text-rose-600">₹{finalPrice}</span>
                </div>
              </div>

              {/* Pay Securely Button */}
              <button
                type="button"
                onClick={handlePaySecurely}
                disabled={processing}
                className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {processing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay Securely ₹{finalPrice}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
