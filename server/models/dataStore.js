import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import {
  occasionsData,
  productsData,
  testimonialsData,
  demoUsers,
  demoSurprises,
  demoOrders,
  demoCoupons,
  demoReviews
} from '../data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, '../data/local_db.json');

// In-Memory store
let store = {
  users: [...demoUsers],
  products: [...productsData],
  surprises: [...demoSurprises],
  orders: [...demoOrders],
  coupons: [...demoCoupons],
  reviews: [...demoReviews],
  testimonials: [...testimonialsData],
  occasions: [...occasionsData]
};

// Load saved local store if exists
try {
  if (fs.existsSync(dbFilePath)) {
    const raw = fs.readFileSync(dbFilePath, 'utf-8');
    const parsed = JSON.parse(raw);
    store = { ...store, ...parsed };
  }
} catch (e) {
  console.warn('[DataStore] Notice: using default in-memory seed store');
}

const persistLocalStore = () => {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('[DataStore] Failed to write local_db.json:', err.message);
  }
};

export const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Generic Collection helper for in-memory operations
class InMemoryCollection {
  constructor(key) {
    this.key = key;
  }

  async find(query = {}) {
    let items = store[this.key] || [];
    return items.filter(item => {
      for (const k in query) {
        if (query[k] !== undefined && item[k] !== query[k]) {
          return false;
        }
      }
      return true;
    });
  }

  async findOne(query = {}) {
    const items = await this.find(query);
    return items[0] || null;
  }

  async findById(id) {
    const items = store[this.key] || [];
    return items.find(item => item.id === id || item._id === id) || null;
  }

  async create(data) {
    const newItem = {
      id: data.id || `${this.key.slice(0, 3)}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      ...data
    };
    if (!store[this.key]) store[this.key] = [];
    store[this.key].push(newItem);
    persistLocalStore();
    return newItem;
  }

  async findByIdAndUpdate(id, updates) {
    const items = store[this.key] || [];
    const index = items.findIndex(item => item.id === id || item._id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
    persistLocalStore();
    return items[index];
  }

  async findByIdAndDelete(id) {
    const items = store[this.key] || [];
    const index = items.findIndex(item => item.id === id || item._id === id);
    if (index === -1) return null;
    const removed = items.splice(index, 1)[0];
    persistLocalStore();
    return removed;
  }

  async countDocuments(query = {}) {
    const items = await this.find(query);
    return items.length;
  }
}

export const dbStore = {
  users: new InMemoryCollection('users'),
  products: new InMemoryCollection('products'),
  surprises: new InMemoryCollection('surprises'),
  orders: new InMemoryCollection('orders'),
  coupons: new InMemoryCollection('coupons'),
  reviews: new InMemoryCollection('reviews'),
  testimonials: new InMemoryCollection('testimonials'),
  occasions: new InMemoryCollection('occasions'),
  resetToDefault: () => {
    store = {
      users: [...demoUsers],
      products: [...productsData],
      surprises: [...demoSurprises],
      orders: [...demoOrders],
      coupons: [...demoCoupons],
      reviews: [...demoReviews],
      testimonials: [...testimonialsData],
      occasions: [...occasionsData]
    };
    persistLocalStore();
  }
};
