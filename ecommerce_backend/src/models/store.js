/**
 * Simple in-memory store for demo purposes.
 * Replace with real database integration (e.g., Postgres/Mongo) using env configuration.
 */
const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');

const users = new Map(); // id -> user
const products = new Map(); // id -> product
const carts = new Map(); // userId -> { items: [{productId, qty}], updatedAt }
const orders = new Map(); // id -> order

// Seed demo products
const demoProducts = [
  {
    name: 'Pastel Pink Hoodie',
    description: 'Cozy pastel pink hoodie, soft and stylish.',
    price: 5900,
    currency: 'usd',
    imageUrl: 'https://images.unsplash.com/photo-1520975922284-9d7b27f8d84b?q=80&w=800&auto=format&fit=crop',
    tags: ['hoodie', 'pink', 'cozy']
  },
  {
    name: 'Mint Green T-Shirt',
    description: 'Breathable mint green tee, perfect for sunny days.',
    price: 2900,
    currency: 'usd',
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop',
    tags: ['tshirt', 'mint', 'light']
  },
  {
    name: 'Lavender Sweatpants',
    description: 'Relaxed fit lavender sweatpants for lounging.',
    price: 4900,
    currency: 'usd',
    imageUrl: 'https://images.unsplash.com/photo-1520975922284-9d7b27f8d84b?q=80&w=800&auto=format&fit=crop',
    tags: ['sweatpants', 'lavender', 'relaxed']
  }
];

demoProducts.forEach((p) => {
  const id = uuid();
  products.set(id, { id, stock: 50, ...p, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), active: true });
});

// Helpers
function findUserByEmail(email) {
  for (const u of users.values()) {
    if (u.email.toLowerCase() === email.toLowerCase()) return u;
  }
  return null;
}

async function createUser({ name, email, password }) {
  const existing = findUserByEmail(email);
  if (existing) throw new Error('Email already registered');
  const id = uuid();
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id, name, email, passwordHash, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  users.set(id, user);
  return { id, name, email, createdAt: user.createdAt };
}

module.exports = {
  users,
  products,
  carts,
  orders,
  findUserByEmail,
  createUser
};
