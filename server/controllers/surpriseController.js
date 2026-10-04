import { dbStore } from '../models/dataStore.js';
import { generateQRCode } from '../services/qrService.js';

export const createSurprise = async (req, res) => {
  try {
    const {
      productId,
      receiverName,
      senderName,
      relationship,
      message,
      photos,
      memories,
      music,
      theme,
      colorPalette
    } = req.body;

    if (!receiverName || !senderName) {
      return res.status(400).json({ success: false, message: 'Receiver name and your name are required' });
    }

    const cleanSlugBase = (receiverName || 'gift')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const publicSlug = `${cleanSlugBase}-${Math.random().toString(36).substring(2, 7)}`;
    const clientBaseUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const publicUrl = `${clientBaseUrl}/s/${publicSlug}`;
    const qrCodeUrl = await generateQRCode(publicUrl);

    const surprise = await dbStore.surprises.create({
      userId: req.user ? req.user.id : 'guest',
      productId: productId || 'prod-1',
      receiverName,
      senderName,
      relationship: relationship || 'Friend',
      message: message || 'Thinking of you on this special day!',
      photos: photos || [],
      memories: memories || [],
      music: music || 'acoustic-celebration',
      theme: theme || 'Romantic',
      colorPalette: colorPalette || '#e11d48',
      publicSlug,
      status: 'draft',
      views: 0,
      qrCodeUrl
    });

    res.status(201).json({
      success: true,
      surprise
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSurpriseById = async (req, res) => {
  try {
    const { id } = req.params;
    const surprise = await dbStore.surprises.findById(id);
    if (!surprise) {
      return res.status(404).json({ success: false, message: 'Surprise not found' });
    }
    const product = await dbStore.products.findById(surprise.productId);

    res.json({
      success: true,
      surprise,
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Receiver page lookup - increments view counter!
export const getSurpriseBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const surprise = await dbStore.surprises.findOne({ publicSlug: slug });
    if (!surprise) {
      return res.status(404).json({ success: false, message: 'Surprise not found or link has expired' });
    }

    // Increment views
    const newViews = (surprise.views || 0) + 1;
    await dbStore.surprises.findByIdAndUpdate(surprise.id, { views: newViews });
    surprise.views = newViews;

    const product = await dbStore.products.findById(surprise.productId);

    res.json({
      success: true,
      surprise,
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSurprise = async (req, res) => {
  try {
    const { id } = req.params;
    const surprise = await dbStore.surprises.findById(id);
    if (!surprise) {
      return res.status(404).json({ success: false, message: 'Surprise not found' });
    }

    // Check ownership if not admin
    if (req.user && req.user.role !== 'admin' && surprise.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this surprise' });
    }

    const updated = await dbStore.surprises.findByIdAndUpdate(id, req.body);
    res.json({ success: true, surprise: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSurprise = async (req, res) => {
  try {
    const { id } = req.params;
    const surprise = await dbStore.surprises.findById(id);
    if (!surprise) {
      return res.status(404).json({ success: false, message: 'Surprise not found' });
    }

    if (req.user && req.user.role !== 'admin' && surprise.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this surprise' });
    }

    await dbStore.surprises.findByIdAndDelete(id);
    res.json({ success: true, message: 'Surprise deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMySurprises = async (req, res) => {
  try {
    const userId = req.user.id;
    const surprises = await dbStore.surprises.find({ userId });
    surprises.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, count: surprises.length, surprises });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllSurprisesAdmin = async (req, res) => {
  try {
    const surprises = await dbStore.surprises.find();
    surprises.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, count: surprises.length, surprises });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
