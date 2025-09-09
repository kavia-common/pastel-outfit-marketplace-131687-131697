'use strict';

const store = require('../data/mockStore');

function getUserCart(userId) {
  if (!store.carts.has(userId)) {
    store.carts.set(userId, []);
  }
  return store.carts.get(userId);
}

function getUserOrders(userId) {
  if (!store.orders.has(userId)) {
    store.orders.set(userId, []);
  }
  return store.orders.get(userId);
}

class OrdersController {
  // PUBLIC_INTERFACE
  /**
   * Checkout the current cart: creates an order, empties the cart (mock payment).
   * body: { paymentMethod } (ignored in mock)
   */
  checkout(req, res) {
    const userId = req.userId;
    const cart = getUserCart(userId);
    if (!cart.length) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Build order
    const items = cart.map((ci) => {
      const p = store.products.find((pp) => pp.id === ci.productId);
      const priceAtPurchase = p ? p.price : 0;
      return {
        productId: ci.productId,
        quantity: ci.quantity,
        size: ci.size,
        priceAtPurchase,
        currency: 'USD',
      };
    });

    const total = items.reduce((sum, it) => sum + it.priceAtPurchase * (it.quantity || 1), 0);

    const newOrder = {
      id: store.genId('o'),
      userId,
      items,
      total,
      currency: 'USD',
      createdAt: new Date().toISOString(),
      status: 'paid', // mock
    };

    const orders = getUserOrders(userId);
    orders.push(newOrder);

    // Clear cart
    store.carts.set(userId, []);

    return res.status(201).json({ message: 'Order created', order: newOrder });
  }

  // PUBLIC_INTERFACE
  /**
   * Get current user's orders
   */
  listOrders(req, res) {
    const userId = req.userId;
    const list = getUserOrders(userId);
    return res.status(200).json({ data: list, count: list.length });
  }
}

module.exports = new OrdersController();
