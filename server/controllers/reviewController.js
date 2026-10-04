import { dbStore } from '../models/dataStore.js';

export const getReviews = async (req, res) => {
  try {
    const { productId } = req.query;
    let reviews = await dbStore.reviews.find();
    if (productId) {
      reviews = reviews.filter(r => r.productId === productId);
    }
    reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    if (!productId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Product ID, rating, and comment are required' });
    }

    const newReview = await dbStore.reviews.create({
      productId,
      userId: req.user.id,
      userName: req.user.name,
      rating: Number(rating),
      comment
    });

    res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await dbStore.reviews.findByIdAndDelete(id);
    res.json({ success: true, message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
