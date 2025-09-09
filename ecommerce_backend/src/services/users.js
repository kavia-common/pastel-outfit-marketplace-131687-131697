/**
 * User profile and order history service.
 */
const { users, orders } = require('../models/store');

// PUBLIC_INTERFACE
function getProfile(userId) {
  /** Return basic user profile. */
  const u = users.get(userId);
  if (!u) throw Object.assign(new Error('User not found'), { status: 404 });
  return { id: u.id, name: u.name, email: u.email, createdAt: u.createdAt };
}

// PUBLIC_INTERFACE
function getOrderHistory(userId) {
  /** Return orders for a user sorted by date desc. */
  const list = [];
  for (const o of orders.values()) {
    if (o.userId === userId) list.push(o);
  }
  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

module.exports = { getProfile, getOrderHistory };
