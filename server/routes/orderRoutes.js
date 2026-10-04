import express from 'express';
import {
  createCheckoutOrder,
  verifyAndCompletePayment,
  getMyOrders,
  getAllOrdersAdmin,
  getOrderById
} from '../controllers/orderController.js';
import { protect, optionalProtect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/checkout', optionalProtect, createCheckoutOrder);
router.post('/verify', optionalProtect, verifyAndCompletePayment);
router.get('/my', protect, getMyOrders);
router.get('/admin/all', protect, adminOnly, getAllOrdersAdmin);
router.get('/:id', getOrderById);

export default router;
