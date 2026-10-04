import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  id: String,
  url: String,
  caption: String
}, { _id: false });

const memorySchema = new mongoose.Schema({
  id: String,
  date: String,
  title: String,
  description: String
}, { _id: false });

const surpriseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  receiverName: { type: String, required: true },
  senderName: { type: String, required: true },
  relationship: { type: String, default: 'Friend' },
  message: { type: String, required: true },
  photos: [photoSchema],
  memories: [memorySchema],
  music: { type: String, default: 'acoustic-celebration' },
  theme: { type: String, default: 'Romantic' },
  colorPalette: { type: String, default: '#e11d48' },
  publicSlug: { type: String, required: true, unique: true },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  views: { type: Number, default: 0 },
  qrCodeUrl: { type: String },
  orderId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Surprise = mongoose.models.Surprise || mongoose.model('Surprise', surpriseSchema);
export default Surprise;
