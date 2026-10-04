import { dbStore } from '../models/dataStore.js';
import { createRazorpayOrder, verifyRazorpaySignature } from '../services/paymentService.js';
import { sendEmail } from '../services/emailService.js';
import { generateQRCode } from '../services/qrService.js';

export const createCheckoutOrder = async (req, res) => {
  try {
    const { surpriseId, couponCode } = req.body;
    const userId = req.user ? req.user.id : 'guest';
    const userName = req.user ? req.user.name : req.body.customerName || 'Customer';
    const userEmail = req.user ? req.user.email : req.body.customerEmail || 'customer@example.com';

    const surprise = await dbStore.surprises.findById(surpriseId);
    if (!surprise) {
      return res.status(404).json({ success: false, message: 'Surprise not found' });
    }

    const product = await dbStore.products.findById(surprise.productId);
    const originalAmount = product ? product.price : 199;
    let discount = 0;
    let appliedCoupon = null;

    if (couponCode) {
      const coupon = await dbStore.coupons.findOne({ code: couponCode.trim().toUpperCase(), active: true });
      if (coupon) {
        if (coupon.discountType === 'percentage') {
          discount = Math.round((originalAmount * coupon.discountValue) / 100);
        } else {
          discount = Math.min(coupon.discountValue, originalAmount);
        }
        appliedCoupon = coupon.code;
      }
    }

    const finalAmount = Math.max(0, originalAmount - discount);
    const orderNumber = `GD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // Create Razorpay / Gateway order
    const razorpayOrder = await createRazorpayOrder({
      amount: finalAmount,
      receipt: orderNumber,
      notes: { surpriseId, userId, coupon: appliedCoupon || 'none' }
    });

    const newOrder = await dbStore.orders.create({
      orderNumber,
      userId,
      userName,
      userEmail,
      surpriseId,
      surpriseTitle: `${product ? product.name : 'Surprise'} for ${surprise.receiverName}`,
      productId: surprise.productId,
      productName: product ? product.name : 'GiftDrop Surprise',
      amount: finalAmount,
      originalAmount,
      discount,
      couponCode: appliedCoupon,
      paymentStatus: 'pending',
      paymentMethod: 'Razorpay',
      razorpayOrderId: razorpayOrder.id
    });

    res.status(201).json({
      success: true,
      order: newOrder,
      razorpayOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyAndCompletePayment = async (req, res) => {
  try {
    const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature, mockSuccess } = req.body;

    const order = await dbStore.orders.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Verify signature or mock payment
    let verified = false;
    if (mockSuccess) {
      verified = true;
    } else {
      verified = verifyRazorpaySignature({
        orderId: razorpayOrderId || order.razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature
      });
    }

    if (!verified) {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    const paymentId = razorpayPaymentId || `pay_sim_${Date.now().toString(36)}`;

    // Update order status
    const updatedOrder = await dbStore.orders.findByIdAndUpdate(order.id, {
      paymentStatus: 'completed',
      paymentId,
      completedAt: new Date().toISOString()
    });

    // Publish the surprise and generate live QR
    const clientBaseUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const surprise = await dbStore.surprises.findById(order.surpriseId);
    if (surprise) {
      const publicUrl = `${clientBaseUrl}/s/${surprise.publicSlug}`;
      const qrCodeUrl = await generateQRCode(publicUrl);
      const surpriseUpdates = {
        status: 'published',
        qrCodeUrl,
        orderId: order.id
      };
      if (order.userId && order.userId !== 'guest') {
        surpriseUpdates.userId = order.userId;
      }
      await dbStore.surprises.findByIdAndUpdate(surprise.id, surpriseUpdates);
      surprise.status = 'published';
      surprise.qrCodeUrl = qrCodeUrl;
    }

    // Update coupon usage if applied
    if (order.couponCode) {
      const coupon = await dbStore.coupons.findOne({ code: order.couponCode });
      if (coupon) {
        await dbStore.coupons.findByIdAndUpdate(coupon.id, {
          usedCount: (coupon.usedCount || 0) + 1
        });
      }
    }

    // Send confirmation email
    try {
      await sendEmail({
        to: order.userEmail || 'customer@example.com',
        templateName: 'paymentSuccessful',
        data: {
          userName: order.userName || 'Valued Customer',
          orderNumber: order.orderNumber,
          productName: order.productName,
          amount: order.amount,
          surpriseSlug: surprise ? surprise.publicSlug : 'gift'
        }
      });
    } catch (e) {
      console.warn('Payment success email warning:', e.message);
    }

    res.json({
      success: true,
      message: 'Payment verified and surprise published!',
      order: updatedOrder,
      surprise
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await dbStore.orders.find({ userId });
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await dbStore.orders.find();
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    let order = await dbStore.orders.findById(id);
    if (!order) {
      order = await dbStore.orders.findOne({ orderNumber: id });
    }
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const surprise = await dbStore.surprises.findById(order.surpriseId);
    res.json({ success: true, order, surprise });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
