'use strict';

const store = require('../data/mockStore');

function getUserCart(userId) {
  if (!store.carts.has(userId)) {
    store.carts.set(userId, []);
  }
  return store.carts.get(userId);
}

class CartController {
  // PUBLIC_INTERFACE
  /**
   * Get current user's cart
   */
  getCart(req, res) {
    const userId = req.userId;
    const cart = getUserCart(userId);

    // Expand items with product data for convenience
    const items = cart.map((ci) => {
      const product = store.products.find((p) => p.id === ci.productId);
      return {
        ...ci,
        product: product
          ? {
              id: product.id,
              name: product.name,
              price: product.price,
              currency: product.currency,
              imageUrl: product.imageUrl,
            }
          : null,
      };
    });

    const total = items.reduce((sum, it) => {
      const price = it.product ? it.product.price : 0;
      return sum + price * (it.quantity || 1);
    }, 0);

    return res.status(200).json({ items, total, currency: 'USD' });
  }

  // PUBLIC_INTERFACE
  /**
   * Add item to cart
   * body: { productId, quantity, size }
   */
  addToCart(req, res) {
    const userId = req.userId;
    const { productId, quantity = 1, size } = req.body || {};

    const product = store.products.find((p) => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const cart = getUserCart(userId);
    const existing = cart.find((i) => i.productId === productId && i.size === size);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ productId, quantity, size });
    }
    return res.status(201).json({ message: 'Added to cart', cart });
  }

  // PUBLIC_INTERFACE
  /**
   * Remove item from cart
   * body: { productId, size }
   */
  removeFromCart(req, res) {
    const userId = req.userId;
    const { productId, size } = req.body || {};
    const cart = getUserCart(userId);
    const before = cart.length;
    const filtered = cart.filter((i) => !(i.productId === productId && i.size === size));
    store.carts.set(userId, filtered);
    const removed = before - filtered.length;
    return res.status(200).json({ message: removed > 0 ? 'Removed from cart' : 'No matching item', cart: filtered });
  }
}

module.exports = new CartController();
