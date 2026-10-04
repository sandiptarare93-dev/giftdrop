import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  userName: { type: String },
  userEmail: { type: String },
  surpriseId: { type: String, required: true },
  surpriseTitle: { type: String },
  productId: { type: String, required: true },
  productName: { type: String },
  amount: { type: Number, required: true },
  originalAmount: { type: Number },
  discount: { type: Number, default: 0 },
  couponCode: { type: String },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  paymentMethod: { type: String, default: 'Razorpay' },
  paymentId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
