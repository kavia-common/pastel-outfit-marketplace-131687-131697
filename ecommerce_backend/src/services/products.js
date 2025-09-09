/**
 * Product catalog service.
 */
const { v4: uuid } = require('uuid');
const { products } = require('../models/store');

// PUBLIC_INTERFACE
function list({ q, tag, page = 1, pageSize = 20 }) {
  /** List products with optional query and tag filters and pagination. */
  const all = Array.from(products.values()).filter(p => p.active);
  let filtered = all;
  if (q) {
    const ql = q.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(ql) || (p.description || '').toLowerCase().includes(ql)
    );
  }
  if (tag) {
    filtered = filtered.filter(p => (p.tags || []).includes(tag));
  }
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);
  return { data, page, pageSize, total };
}

// PUBLIC_INTERFACE
function getById(id) {
  /** Get product by id. */
  const p = products.get(id);
  if (!p || !p.active) throw Object.assign(new Error('Product not found'), { status: 404 });
  return p;
}

// PUBLIC_INTERFACE
function create({ name, description, price, currency = 'usd', imageUrl, tags = [], stock = 0 }) {
  /** Create new product (admin). */
  const id = uuid();
  const now = new Date().toISOString();
  const prod = { id, name, description, price, currency, imageUrl, tags, stock, active: true, createdAt: now, updatedAt: now };
  products.set(id, prod);
  return prod;
}

// PUBLIC_INTERFACE
function update(id, patch) {
  /** Update product (admin). */
  const existing = products.get(id);
  if (!existing) throw Object.assign(new Error('Product not found'), { status: 404 });
  const updated = { ...existing, ...patch, updatedAt: new Date().toISOString() };
  products.set(id, updated);
  return updated;
}

// PUBLIC_INTERFACE
function remove(id) {
  /** Soft-delete product (admin). */
  const existing = products.get(id);
  if (!existing) throw Object.assign(new Error('Product not found'), { status: 404 });
  existing.active = false;
  existing.updatedAt = new Date().toISOString();
  products.set(id, existing);
  return { id, deleted: true };
}

module.exports = { list, getById, create, update, remove };
