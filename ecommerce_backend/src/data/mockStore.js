'use strict';

/**
 * In-memory mock data store for the ecommerce app.
 * This simulates products, users, sessions, carts, and orders.
 * No external DB or third-party service is used.
 */

// PRODUCTS: Pastel outfits catalog
const products = [
  {
    id: 'p1',
    name: 'Pastel Pink Hoodie',
    description: 'Soft pastel pink hoodie with cozy fleece lining.',
    price: 49.99,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/pastel-hoodie-pink/800/600',
    color: 'Pink',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 42,
    tags: ['hoodie', 'pastel', 'unisex'],
  },
  {
    id: 'p2',
    name: 'Mint Green Sweater',
    description: 'Lightweight knit sweater in mint green.',
    price: 39.99,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/pastel-mint-sweater/800/600',
    color: 'Mint',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 30,
    tags: ['sweater', 'pastel'],
  },
  {
    id: 'p3',
    name: 'Lavender T-Shirt',
    description: 'Breathable cotton tee in soothing lavender.',
    price: 24.99,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/pastel-lavender-tee/800/600',
    color: 'Lavender',
    sizes: ['S', 'M', 'L'],
    stock: 65,
    tags: ['tshirt', 'pastel'],
  },
  {
    id: 'p4',
    name: 'Baby Blue Denim Jacket',
    description: 'Classic denim jacket in baby blue pastel wash.',
    price: 69.99,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/pastel-babyblue-denim/800/600',
    color: 'Baby Blue',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 18,
    tags: ['jacket', 'pastel', 'denim'],
  },
  {
    id: 'p5',
    name: 'Peach Skater Skirt',
    description: 'Flowy skater skirt in a peach pastel shade.',
    price: 34.99,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/pastel-peach-skirt/800/600',
    color: 'Peach',
    sizes: ['XS', 'S', 'M'],
    stock: 27,
    tags: ['skirt', 'pastel', 'women'],
  },
];

// USERS: Fake users with ultra-simple auth (passwords stored in plaintext for mock only)
const users = [
  { id: 'u1', email: 'demo@pastel.shop', password: 'password123', name: 'Demo User' },
];

// SESSIONS: token -> userId mapping for mock auth
const sessions = new Map(); // token => userId

// CARTS: userId -> cart items
// A cart item: { productId, quantity, size }
const carts = new Map(); // userId => [{ productId, quantity, size }]

// ORDERS: userId -> orders[]
// An order: { id, userId, items: [{productId, quantity, priceAtPurchase, size}], total, currency, createdAt, status }
const orders = new Map();

function genId(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

module.exports = {
  products,
  users,
  sessions,
  carts,
  orders,
  genId,
};
