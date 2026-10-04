import express from 'express';
import { emailTemplates } from '../services/emailService.js';

const router = express.Router();

// Preview email template by name
router.get('/preview/:name', (req, res) => {
  const { name } = req.params;
  const templateFn = emailTemplates[name];
  if (!templateFn) {
    return res.status(404).json({ success: false, message: 'Template not found' });
  }

  const sampleData = {
    userName: 'Aarav Sharma',
    orderNumber: 'GD-2026-1001',
    productName: 'Birthday Memory',
    amount: 149,
    surpriseSlug: 'bday-priya',
    senderName: 'Aarav',
    receiverName: 'Priya',
    occasion: 'Birthday',
    editUrl: 'http://localhost:5173/editor/surp-1',
    surpriseUrl: 'http://localhost:5173/s/bday-priya',
    resetUrl: 'http://localhost:5173/reset-password'
  };

  const email = templateFn(sampleData);
  res.send(email.html);
});

export default router;
