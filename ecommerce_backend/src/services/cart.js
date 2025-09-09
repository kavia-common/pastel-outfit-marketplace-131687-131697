/**
 * Shopping cart service (per user).
 */
const { carts, products } = require('../models/store');

// PUBLIC_INTERFACE
function getCart(userId) {
  /** Get or create cart for user. */
  const cur = carts.get(userId) || { items: [], updatedAt: new Date().toISOString() };
  carts.set(userId, cur);
  return cur;
}

// PUBLIC_INTERFACE
function addItem(userId, productId, qty = 1) {
  /** Add item to cart; increments quantity. */
  const product = products.get(productId);
  if (!product || !product.active) throw Object.assign(new Error('Product not found'), { status: 404 });
  if (qty <= 0) throw Object.assign(new Error('Quantity must be positive'), { status: 400 });

  const cart = getCart(userId);
  const found = cart.items.find(i => i.productId === productId);
  if (found) {
    found.qty += qty;
  } else {
    cart.items.push({ productId, qty });
  }
  cart.updatedAt = new Date().toISOString();
  return cart;
}

// PUBLIC_INTERFACE
function updateItem(userId, productId, qty) {
  /** Set quantity for an item; remove if qty <= 0. */
  const cart = getCart(userId);
  const idx = cart.items.findIndex(i => i.productId === productId);
  if (idx < 0) throw Object.assign(new Error('Item not in cart'), { status: 404 });
  if (qty <= 0) {
    cart.items.splice(idx, 1);
  } else {
    cart.items[idx].qty = qty;
  }
  cart.updatedAt = new Date().toISOString();
  return cart;
}

// PUBLIC_INTERFACE
function removeItem(userId, productId) {
  /** Remove item from cart. */
  const cart = getCart(userId);
  cart.items = cart.items.filter(i => i.productId !== productId);
  cart.updatedAt = new Date().toISOString();
  return cart;
}

// PUBLIC_INTERFACE
function clearCart(userId) {
  /** Clear cart. */
  carts.set(userId, { items: [], updatedAt: new Date().toISOString() });
  return getCart(userId);
}

// PUBLIC_INTERFACE
function totals(userId) {
  /** Calculate total amount of the cart. */
  const cart = getCart(userId);
  let amount = 0;
  const detailed = cart.items.map((i) => {
    const p = products.get(i.productId);
    if (!p || !p.active) return null;
    const lineTotal = p.price * i.qty;
    amount += lineTotal;
    return {
      productId: i.productId,
      name: p.name,
      price: p.price,
      qty: i.qty,
      lineTotal
    };
  }).filter(Boolean);

  return { currency: 'usd', amount, items: detailed };
}

module.exports = { getCart, addItem, updateItem, removeItem, clearCart, totals };
