/**
 * Order service for creation and retrieval.
 */
const { v4: uuid } = require('uuid');
const { orders, products, carts } = require('../models/store');

// PUBLIC_INTERFACE
function createOrderFromCart(userId, paymentInfo = {}) {
  /** Convert a cart into an order (after successful payment). */
  const cart = carts.get(userId);
  if (!cart || cart.items.length === 0) {
    throw Object.assign(new Error('Cart is empty'), { status: 400 });
  }
  const now = new Date().toISOString();
  const items = cart.items.map((i) => {
    const p = products.get(i.productId);
    if (!p || !p.active) {
      throw Object.assign(new Error('Product unavailable'), { status: 400 });
    }
    return {
      productId: p.id,
      name: p.name,
      price: p.price,
      qty: i.qty,
      currency: p.currency
    };
  });
  const total = items.reduce((sum, l) => sum + (l.price * l.qty), 0);
  const id = uuid();
  const order = {
    id,
    userId,
    items,
    currency: 'usd',
    total,
    payment: {
      status: paymentInfo.status || 'paid',
      provider: 'stripe',
      stripeSessionId: paymentInfo.stripeSessionId || null
    },
    status: 'processing',
    createdAt: now,
    updatedAt: now
  };
  orders.set(id, order);
  // clear cart
  carts.set(userId, { items: [], updatedAt: new Date().toISOString() });
  return order;
}

// PUBLIC_INTERFACE
function getById(userId, orderId) {
  /** Get an order by id (must belong to user). */
  const o = orders.get(orderId);
  if (!o) throw Object.assign(new Error('Order not found'), { status: 404 });
  if (o.userId !== userId) throw Object.assign(new Error('Forbidden'), { status: 403 });
  return o;
}

module.exports = { createOrderFromCart, getById };
