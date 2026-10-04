import { dbStore } from '../models/dataStore.js';

export const getProducts = async (req, res) => {
  try {
    const { occasion, search, sort, minPrice, maxPrice, activeOnly } = req.query;
    let products = await dbStore.products.find();

    // Filter active products for public users unless specified
    if (activeOnly !== 'false') {
      products = products.filter(p => p.active !== false);
    }

    if (occasion && occasion !== 'all') {
      products = products.filter(p => p.occasion?.toLowerCase() === occasion.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (minPrice) {
      products = products.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      products = products.filter(p => p.price <= Number(maxPrice));
    }

    // Sorting
    if (sort === 'price-asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      products.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else {
      // default: popularity / rating
      products.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || (b.rating || 0) - (a.rating || 0));
    }

    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let product = await dbStore.products.findOne({ slug });
    if (!product) {
      product = await dbStore.products.findById(slug);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const reviews = await dbStore.reviews.find({ productId: product.id });

    res.json({
      success: true,
      product: {
        ...product,
        reviews
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, originalPrice, occasion, category, images, features, active } = req.body;
    if (!name || !price || !occasion) {
      return res.status(400).json({ success: false, message: 'Name, price, and occasion are required' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newProduct = await dbStore.products.create({
      name,
      slug: `${slug}-${Date.now().toString(36)}`,
      description: description || '',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Math.round(Number(price) * 1.5),
      occasion,
      category: category || occasion.charAt(0).toUpperCase() + occasion.slice(1),
      images: images && images.length ? images : ['https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'],
      features: features || ['Personalized link', 'Mobile optimized', 'Background music', 'Photo album'],
      rating: 5.0,
      reviewsCount: 1,
      active: active !== undefined ? active : true,
      popular: false,
      isNew: true
    });

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await dbStore.products.findByIdAndUpdate(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await dbStore.products.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOccasions = async (req, res) => {
  try {
    const occasions = await dbStore.occasions.find();
    res.json({ success: true, occasions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await dbStore.testimonials.find();
    res.json({ success: true, testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
