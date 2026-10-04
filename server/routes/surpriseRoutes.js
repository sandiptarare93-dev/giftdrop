import express from 'express';
import {
  createSurprise,
  getSurpriseById,
  getSurpriseBySlug,
  updateSurprise,
  deleteSurprise,
  getMySurprises,
  getAllSurprisesAdmin
} from '../controllers/surpriseController.js';
import { protect, optionalProtect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public receiver route
router.get('/public/:slug', getSurpriseBySlug);

// User and authenticated routes
router.post('/', optionalProtect, createSurprise); // Can be created by guests or logged-in users
router.get('/my', protect, getMySurprises);
router.get('/admin/all', protect, adminOnly, getAllSurprisesAdmin);
router.get('/:id', getSurpriseById);
router.put('/:id', updateSurprise);
router.delete('/:id', protect, deleteSurprise);

export default router;
